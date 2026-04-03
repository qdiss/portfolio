import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";

import Nav from "./components/Nav";
import Hero from "./components/Hero";

const Currently = lazy(() => import("./components/Currently"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
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

const CustomCursor = lazy(() => import("./components/CustomCursor"));
const CookieManager = lazy(() => import("./components/CookieManager"));

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

  useEffect(() => {
    const initReveal = () => {
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

      document.querySelectorAll(".reveal.visible").forEach((el) => {
        el.classList.remove("visible");
      });

      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
    };

    const timer = setTimeout(initReveal, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]); // ← ovo je ključna promjena

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

      <Suspense fallback={<div style={{ height: 200, background: "#111" }} />}>
        <Currently />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 200, background: "#111" }} />}>
        <About />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 200, background: "#111" }} />}>
        <Services />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <Projects />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <Testimonials />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <Stack />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <Blog />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <Process />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <FAQ />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 300, background: "#111" }} />}>
        <CTA />
      </Suspense>
      <Divider />

      <Suspense fallback={<div style={{ height: 200, background: "#111" }} />}>
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
      <CustomCursor />
      <CookieManager />
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
            <Suspense
              fallback={
                <div style={{ minHeight: "100vh", background: "#000" }} />
              }
            >
              <Routes>
                <Route path="/" element={<PortfolioContent />} />
                <Route path="/hire" element={<HirePage />} />
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
          </main>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
