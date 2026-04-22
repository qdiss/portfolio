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
      // Remove visible from all, then re-check in batch
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

    const timer = setTimeout(init, 120);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [triggerKey]);
}
