import { useEffect, useRef } from "react";

// Batch all getBoundingClientRect reads in one rAF to avoid forced reflow
function checkInViewBatch(elements, onInView, onOutView) {
  requestAnimationFrame(() => {
    const h = window.innerHeight;
    const rects = elements.map((el) => el.getBoundingClientRect()); // read all first
    rects.forEach((rect, i) => {
      // then act
      if (rect.top < h && rect.bottom > 0) {
        onInView(elements[i]);
      } else {
        onOutView(elements[i]);
      }
    });
  });
}

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

    checkInViewBatch(
      reveals,
      (r) => r.classList.add("visible"),
      (r) => observer.observe(r),
    );

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function usePageReveal(triggerKey = "default") {
  useEffect(() => {
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

    const init = () => {
      Array.from(document.querySelectorAll(".reveal.visible")).forEach((el) =>
        el.classList.remove("visible"),
      );

      const all = Array.from(document.querySelectorAll(".reveal"));
      if (all.length === 0) return;

      checkInViewBatch(
        all,
        (el) => el.classList.add("visible"),
        (el) => observer.observe(el),
      );
    };

    // First pass — catches elements already in DOM
    const t1 = setTimeout(init, 120);

    // Second pass — catches lazy-loaded components that rendered after first pass
    const t2 = setTimeout(() => {
      const unobserved = Array.from(
        document.querySelectorAll(".reveal:not(.visible)"),
      );
      if (unobserved.length === 0) return;
      checkInViewBatch(
        unobserved,
        (el) => el.classList.add("visible"),
        (el) => observer.observe(el),
      );
    }, 600);

    // Third pass — for very slow connections / heavy components
    const t3 = setTimeout(() => {
      const unobserved = Array.from(
        document.querySelectorAll(".reveal:not(.visible)"),
      );
      if (unobserved.length === 0) return;
      checkInViewBatch(
        unobserved,
        (el) => el.classList.add("visible"),
        (el) => observer.observe(el),
      );
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
    };
  }, [triggerKey]);
}
