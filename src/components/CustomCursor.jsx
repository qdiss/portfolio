import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      if (!dot.current) return;
      dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onEnter = () => {
      if (!dot.current) return;
      dot.current.style.transform += " scale(2.5)";
      dot.current.style.background = "transparent";
      dot.current.style.border = "1.5px solid var(--accent)";
    };

    const onLeave = () => {
      if (!dot.current) return;
      dot.current.style.background = "var(--accent)";
      dot.current.style.border = "none";
    };

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label",
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  )
    return null;

  return (
    <div
      ref={dot}
      style={{
        width: "8px",
        height: "8px",
        background: "var(--accent)",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    />
  );
}
