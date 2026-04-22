import { lazy, Suspense, useEffect, useState, Component } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider, useLang } from "./context/LangContext";
import { usePageReveal } from "./hooks/useReveal";

class ErrorBoundaryInner extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      const { msg, link } = this.props;
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            background: "var(--bg, #0a0a0a)",
            color: "var(--text, #f0f0f0)",
          }}
        >
          <div style={{ fontSize: "2rem" }}>⚠</div>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
              opacity: 0.6,
            }}
          >
            {msg}{" "}
            <a href="/" style={{ color: "var(--accent, #c8f060)" }}>
              {link}
            </a>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function ErrorBoundary({ children }) {
  const { t } = useLang();
  return (
    <ErrorBoundaryInner
      msg={t.error_boundary_msg || "Something went wrong."}
      link={t.error_boundary_link || "Back to home"}
    >
      {children}
    </ErrorBoundaryInner>
  );
}

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg, #0a0a0a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "2px solid rgba(200,240,96,0.2)",
          borderTop: "2px solid #c8f060",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

import Nav from "./components/Nav";
import Hero from "./components/Hero";

const Currently = lazy(() => import("./components/Currently"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const PricingPreview = lazy(() => import("./components/PricingPreview"));
const Projects = lazy(() => import("./components/Projects"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Stack = lazy(() => import("./components/Stack"));
const Blog = lazy(() => import("./components/Blog"));
const Process = lazy(() => import("./components/Process"));
const FAQ = lazy(() => import("./components/FAQ"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));

const HirePage = lazy(() => import("./pages/HirePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const UsesPage = lazy(() => import("./pages/UsesPage"));
const ProjectsListingPage = lazy(() => import("./pages/ProjectsListingPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminGuard = lazy(() => import("./pages/AdminGuard"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));

const CursorWrapper = lazy(() => import("./components/CursorWrapper"));

function Divider() {
  return <div className="divider" />;
}

function HashScroller() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
      }
    }
  }, [location]);
  return null;
}

function GlobalReveal() {
  const location = useLocation();
  usePageReveal(location.pathname);
  return null;
}

function PortfolioContent() {
  const [enableExtras, setEnableExtras] = useState(false);

  useEffect(() => {
    setEnableExtras(true);
  }, []);

  return (
    <>
      <Nav />
      <Hero />

      <Suspense
        fallback={
          <div style={{ height: 200, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Currently />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 200, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <About />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 200, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Services />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Projects />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Testimonials />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Stack />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Blog />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Process />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <FAQ />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 300, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <CTA />
      </Suspense>
      <Divider />

      <Suspense
        fallback={
          <div style={{ height: 200, background: "var(--bg, #0a0a0a)" }} />
        }
      >
        <Footer />
      </Suspense>
    </>
  );
}

function GlobalExtras() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <CursorWrapper />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <GlobalReveal />
          <HashScroller />
          <GlobalExtras />
          <main>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<PortfolioContent />} />
                  <Route path="/hire" element={<HirePage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<PostPage />} />
                  <Route path="/uses" element={<UsesPage />} />
                  <Route
                    path="/contents/projects"
                    element={<ProjectsListingPage />}
                  />
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
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
