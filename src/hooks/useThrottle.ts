import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const lastExecuted = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecuted.current > delay) {
        callback(...args);
        lastExecuted.current = now;
      }
    },
    [callback, delay]
  );
}
