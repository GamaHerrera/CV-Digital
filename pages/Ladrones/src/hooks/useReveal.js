import { useEffect, useRef } from 'react';

export function useReveal(options = { threshold: 0.1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('reveal-active');
        observer.unobserve(element); // Solo animar una vez
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold]);

  return ref;
}
