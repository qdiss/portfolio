import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0,
      y = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!dot.current) return;
      dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (!visible) setVisible(true);
    };

    const onEnter = () => {
      if (!dot.current) return;
      dot.current.style.width = "32px";
      dot.current.style.height = "32px";
      dot.current.style.background = "transparent";
      dot.current.style.border = "1.5px solid var(--accent)";
    };

    const onLeave = () => {
      if (!dot.current) return;
      dot.current.style.width = "8px";
      dot.current.style.height = "8px";
      dot.current.style.background = "var(--accent)";
      dot.current.style.border = "none";
    };

    window.addEventListener("mousemove", onMove);

    // Use event delegation instead of attaching to each element
    document.addEventListener("mouseover", (e) => {
      if (
        e.target.closest(
          "a, button, [role='button'], input, textarea, select, label",
        )
      ) {
        onEnter();
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (
        e.target.closest(
          "a, button, [role='button'], input, textarea, select, label",
        )
      ) {
        onLeave();
      }
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

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
        transition:
          "width 0.15s ease, height 0.15s ease, background 0.15s ease",
        display:
          typeof window !== "undefined" &&
          window.matchMedia("(pointer: coarse)").matches
            ? "none"
            : "block",
      }}
    />
  );
}
