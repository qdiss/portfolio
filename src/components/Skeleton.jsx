import "./Skeleton.css";

export function SkeletonLine({ width = "100%", height = "1rem", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: "6px", ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        padding: "1.5rem",
        border: "1px solid var(--border)",
        borderRadius: "16px",
      }}
    >
      <SkeletonLine
        width="60%"
        height="1.2rem"
        style={{ marginBottom: "0.75rem" }}
      />
      <SkeletonLine width="100%" style={{ marginBottom: "0.4rem" }} />
      <SkeletonLine width="80%" style={{ marginBottom: "0.4rem" }} />
      <SkeletonLine
        width="40%"
        height="0.75rem"
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
}
