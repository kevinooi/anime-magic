import { useEffect, useRef, useState } from "react";

type UseInfiniteScrollOptions = {
  offset?: string;
  shouldStop?: boolean;
  onLoadMore?: () => Promise<void> | void;
};

type UseInfiniteScrollReturn = {
  isLoading: boolean;
  containerRef: (container: HTMLElement | null) => void;
};

function useInfiniteScroll(options?: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const { offset = "0px", shouldStop = false, onLoadMore } = options ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(document.createElement("div"));

  const containerRef = (container: HTMLElement | null) => {
    if (container) {
      container.append(targetRef.current);
      container.style.position = "relative";
    }
  };

  useEffect(() => {
    const target = targetRef.current;
    target.toggleAttribute("data-infinite-scroll-detector", true);
    target.style.position = "absolute";
    target.style.bottom = offset;
    if (target.offsetTop < 0) target.style.bottom = "0px";
  }, [offset, isLoading]);

  useEffect(() => {
    if (observerRef?.current) observerRef.current.disconnect();

    const handler: IntersectionObserverCallback = async ([entry]) => {
      const { isIntersecting } = entry;
      if (isIntersecting && !isLoading && !shouldStop && typeof onLoadMore === "function") {
        setIsLoading(true);
        await onLoadMore();
        setIsLoading(false);
      }
    };

    observerRef.current = new IntersectionObserver(handler, { threshold: 0 });
    observerRef.current.observe(targetRef.current);

    return () => observerRef.current?.disconnect();
  }, [isLoading, onLoadMore, shouldStop]);

  return {
    isLoading,
    containerRef
  };
}

export default useInfiniteScroll;
