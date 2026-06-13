import { useEffect, useRef, useState } from 'react';

/** Activate loading only when the element is near the viewport. */
export function useInViewLoad<T extends Element>(rootMargin = '80% 0px') {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [active, rootMargin]);

  return { ref, active, activate: () => setActive(true) };
}
