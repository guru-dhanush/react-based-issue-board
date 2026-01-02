import { useCallback, useRef, useState } from "react";

type VirtualListOptions = {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
};

export function useVirtualList<T>(items: T[], options: VirtualListOptions) {
  const { itemHeight, containerHeight, overscan = 5 } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overscan, 0);

  const endIndex = Math.min(
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback(() => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
  }, []);

  return {
    containerRef,
    totalHeight,
    visibleItems,
    offsetY,
    onScroll,
  };
}
