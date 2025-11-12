import { useEffect, useRef, useState, useCallback } from "react";

interface UsePollingOptions {
  enabled?: boolean;
  immediate?: boolean;
}

export function usePolling(
  callback: () => Promise<void> | void,
  interval: number,
  options: UsePollingOptions = {}
) {
  const { enabled = true, immediate = true } = options;

  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(enabled);

  const savedCallback = useRef(callback);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExecutingRef = useRef(false);
  const mountedRef = useRef(true);
  const manualPauseRef = useRef(false);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsPolling(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }

  }, [enabled]);

  useEffect(() => {
    if (!isPolling || !enabled) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      return;
    }

    const tick = async () => {
      if (isExecutingRef.current) {
        console.warn(
          "[usePolling] Skipping tick — previous request still running"
        );
        return;
      }

      isExecutingRef.current = true;
      try {
        await savedCallback.current();
        if (mountedRef.current) setLastSync(new Date());
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[usePolling] Error during polling:", error);
        }
      } finally {
        isExecutingRef.current = false;
        if (mountedRef.current && isPolling && enabled) {
          timeoutIdRef.current = setTimeout(tick, interval);
        }
      }
    };

    if (immediate) tick();
    else timeoutIdRef.current = setTimeout(tick, interval);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [interval, isPolling, immediate, enabled]);

  const pause = useCallback(() => {
    if (!enabled) return;
    manualPauseRef.current = true;
    setIsPolling(false);
  }, [enabled]);

  const resume = useCallback(() => {
    if (!enabled) return;
    manualPauseRef.current = false;
    setIsPolling(true);
  }, [enabled]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else if (!manualPauseRef.current) {
        resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pause, resume]);

  return { lastSync, pause, resume, isPolling };
}
