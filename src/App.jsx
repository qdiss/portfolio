import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider, useLang } from "./context/LangContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Currently from "./components/Currently";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Stack from "./components/Stack";
import Blog from "./components/Blog";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import HirePage from "./pages/HirePage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import AdminPage from "./pages/AdminPage";
import CookieManager from "./components/CookieManager";
import AdminGuard from "./pages/AdminGuard";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function Divider() {
  return <div className="divider" />;
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let val = 0;
    const speeds = [8, 5, 3, 2, 1];
    let speedIdx = 0;
    const targets = [25, 55, 75, 90, 100];

    const tick = () => {
      val += speeds[speedIdx] || 1;
      if (val >= targets[speedIdx]) speedIdx++;
      if (val >= 100) {
        setProgress(100);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 500);
        }, 250);
        return;
      }
      setProgress(val);
      setTimeout(tick, 18 + speedIdx * 8);
    };
    setTimeout(tick, 100);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.2rem",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          marginBottom: "2.5rem",
        }}
      >
        adiss<span style={{ color: "var(--accent)" }}>.</span>dev
      </div>
      <div
        style={{
          width: "160px",
          height: "2px",
          background: "var(--border)",
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--accent)",
            transition: "width 0.05s linear",
            borderRadius: "2px",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.72rem",
          color: "var(--muted)",
          letterSpacing: "0.1em",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setP(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: "3px",
        width: `${p}%`,
        background: "var(--accent)",
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }}
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 998,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--card-bg, var(--bg2))",
        border: "1px solid var(--border)",
        color: "var(--text)",
        cursor: "pointer",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        animation: "fadeInBtn 0.3s ease",
      }}
    >
      ↑
    </button>
  );
}

function HashScroller() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const tryScroll = (n = 0) => {
        const el = document.getElementById(id);
        if (el) {
          setTimeout(
            () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
            60,
          );
        } else if (n < 15) setTimeout(() => tryScroll(n + 1), 100);
      };
      tryScroll();
    }
  }, [location]);
  return null;
}

function PortfolioContent() {
  const { fading } = useLang();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    const observe = () =>
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    observe();
    const t = setTimeout(observe, 300);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInBtn { from { opacity:0;transform:translateY(10px); } to { opacity:1;transform:none; } }
        .lang-fade { transition: opacity 0.18s ease; }
        .lang-fade.fading { opacity: 0; }
      `}</style>
      <ScrollProgress />
      <BackToTop />
      <CookieManager />
      <Nav />
      <div className={`lang-fade${fading ? " fading" : ""}`}>
        <Hero />
        <Currently />
        <Divider />
        <About />
        <Divider />
        <Services />
        <Divider />
        <Projects />
        <Divider />
        <Testimonials />
        <Divider />
        <Stack />
        <Divider />
        <Blog />
        <Divider />
        <Process />
        <Divider />
        <FAQ />
        <Divider />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <BrowserRouter>
          <ThemeProvider>
            <LangProvider>
              <HashScroller />
              <Routes>
                <Route path="/" element={<PortfolioContent />} />
                <Route path="/hire" element={<HirePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<PostPage />} />
                <Route
                  path="/contents/projects/:slug"
                  element={<ProjectDetailPage />}
                />
                <Route
                  path="/admin"
                  element={
                    <AdminGuard>
                      <AdminPage />
                    </AdminGuard>
                  }
                />
              </Routes>
            </LangProvider>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}
