import { useEffect } from "react";

interface UseIntersectionObserverParams {
  target: Element | null;
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = "200px 0px",
  threshold = 0,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    if (!enabled || !target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        onIntersect();
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, root, rootMargin, target, threshold]);
}
