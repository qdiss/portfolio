import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveals = Array.from(el.querySelectorAll(".reveal"));
    if (el.classList.contains("reveal")) reveals.push(el);

    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    reveals.forEach((r) => {
      // FIX: provjeri odmah je li element već u viewportu
      // (dešava se nakon language switcha ili hard refresha)
      const rect = r.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        // već vidljivo — dodaj klasu odmah bez čekanja observera
        r.classList.add("visible");
      } else {
        observer.observe(r);
      }
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
