import { useState } from "react";

// Promijeni ovu lozinku u svoju
const ADMIN_PASSWORD = "adiss2026";

export default function AdminGuard({ children }) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_auth") === "1",
  );
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  if (authed) return children;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      setAuthed(true);
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "2.5rem",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontWeight: 800,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev admin
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              borderRadius: "10px",
              border: `1px solid ${error ? "#e55" : "var(--border)"}`,
              background: "var(--bg)",
              color: "var(--text)",
              fontSize: "0.95rem",
              fontFamily: "inherit",
              boxSizing: "border-box",
              marginBottom: "1rem",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p
              style={{
                color: "#e55",
                fontSize: "0.82rem",
                marginBottom: "0.75rem",
              }}
            >
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.85rem",
              background: "var(--accent)",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.95rem",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
