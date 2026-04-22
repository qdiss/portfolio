import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLang } from "../context/LangContext";
import { MailIcon } from "../components/Icons";

export default function AdminGuard({ children }) {
  const { t } = useLang();
  const [session, setSession] = useState(undefined); // undefined = loading
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const ALLOWED_EMAIL = import.meta.env.VITE_ADMIN_ALLOWED_EMAIL || "";

  useEffect(() => {
    // Provjeri trenutnu sesiju
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Slušaj promjene (magic link callback)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== ALLOWED_EMAIL) {
      setError(t.admin_access_denied || "Access denied.");
      return;
    }
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setSending(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Loading
  if (session === undefined)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          color: "var(--muted)",
        }}
      >
        {t.admin_loading || "Loading..."}
      </div>
    );

  // Ulogovan ali nije tvoj email — ne bi se trebalo desiti zbog RLS, ali kao extra zaštita
  if (session && session.user.email !== ALLOWED_EMAIL) {
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
        <div style={{ textAlign: "center", color: "var(--muted)" }}>
          <p>{t.admin_access_denied || "Access denied."}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              color: "var(--accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {t.admin_sign_out || "Sign out"}
          </button>
        </div>
      </div>
    );
  }

  // Ulogovan i autorizovan
  if (session) return children;

  // Login forma
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

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MailIcon size={28} />
            </div>
            <p
              style={{
                color: "var(--text)",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              {t.admin_check_email || "Check your email"}
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}
            >
              {t.admin_magic_link_sent || "We've sent a magic link to"}
              <br />
              <strong style={{ color: "var(--accent)" }}>{email}</strong>
            </p>
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              style={{
                marginTop: "1.5rem",
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.82rem",
              }}
            >
              {t.admin_try_again || "Try again"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder={t.admin_email_placeholder || "your@email.com"}
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
                marginBottom: "0.75rem",
                outline: "none",
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
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
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
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending
                ? t.admin_sending || "Sending..."
                : t.admin_send_link || "Send magic link →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
