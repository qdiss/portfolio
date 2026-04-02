import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import CookieManager from "./components/CookieManager";

function Divider() {
  return <div className="divider" />;
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: "3px",
        width: `${progress}%`,
        background: "var(--accent)",
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Back to Top ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        color: "var(--fg)",
        cursor: "pointer",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        transition: "opacity 0.2s, transform 0.2s",
        animation: "fadeInBtn 0.3s ease",
      }}
    >
      ↑
    </button>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────
function PortfolioContent() {
  const { fading } = useLang();

  // Global IntersectionObserver for all .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );

    const observe = () => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    };

    observe();
    const timer = setTimeout(observe, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInBtn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
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
  return (
    <HashRouter>
      <ThemeProvider>
        <LangProvider>
          <Routes>
            <Route path="/" element={<PortfolioContent />} />
            <Route path="/hire" element={<HirePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<PostPage />} />
          </Routes>
        </LangProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
