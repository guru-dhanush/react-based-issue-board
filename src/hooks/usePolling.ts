import { useCallback, useEffect, useRef, useState } from "react";

interface PollingOptions {
  enabled?: boolean;
  immediate?: boolean;
}

export function usePolling(
  callback: () => void | Promise<void>,
  interval: number,
  options: PollingOptions = {}
) {
  const { enabled = true, immediate = false } = options;

  const callbackRef = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPolling, setIsPolling] = useState(enabled);

  // TO Keep latest callback reference (avoid stale closure)
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    setIsPolling(true);

    if (immediate) {
      callbackRef.current();
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, interval);
  }, [interval, immediate]);

  const pause = () => {
    setIsPolling(false);
    clear();
  };

  const resume = useCallback(() => {
    if (!isPolling) start();
  }, [isPolling, start]);

  useEffect(() => {
    if (enabled) start();
    else pause();

    return () => clear();
  }, [enabled, start, pause, clear]);

  return { pause, resume, isPolling };
}
