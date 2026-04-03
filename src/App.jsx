import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";

import Nav from "./components/Nav";
import Hero from "./components/Hero";

// lazy sekcije (ispod folda)
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

// pages
const HirePage = lazy(() => import("./pages/HirePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const UsesPage = lazy(() => import("./pages/UsesPage"));
const ProjectsListingPage = lazy(() => import("./pages/ProjectsListingPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminGuard = lazy(() => import("./pages/AdminGuard"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// defer heavy stuff
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const CookieManager = lazy(() => import("./components/CookieManager"));

function Divider() {
  return <div className="divider" />;
}

// mount kad uđe u viewport
function LazySection({ children }) {
  const [visible, setVisible] = useState(false);
  const ref = (el) => {
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
  };

  return <div ref={ref}>{visible ? children : null}</div>;
}

function HashScroller() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 60);
      }
    }
  }, [location]);

  return null;
}

function PortfolioContent() {
  const [enableExtras, setEnableExtras] = useState(false);

  // defer non-critical (cursor, cookies)
  useEffect(() => {
    const t = setTimeout(() => setEnableExtras(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Nav />

      {/* HERO = instant render */}
      <Hero />

      <Suspense fallback={null}>
        <LazySection>
          <Currently />
        </LazySection>

        <Divider />

        <LazySection>
          <About />
        </LazySection>

        <Divider />

        <LazySection>
          <Services />
        </LazySection>

        <Divider />

        <LazySection>
          <Projects />
        </LazySection>

        <Divider />

        <LazySection>
          <Testimonials />
        </LazySection>

        <Divider />

        <LazySection>
          <Stack />
        </LazySection>

        <Divider />

        <LazySection>
          <Blog />
        </LazySection>

        <Divider />

        <LazySection>
          <Process />
        </LazySection>

        <Divider />

        <LazySection>
          <FAQ />
        </LazySection>

        <Divider />

        <LazySection>
          <CTA />
        </LazySection>

        <LazySection>
          <Footer />
        </LazySection>
      </Suspense>

      {/* defer after load */}
      <Suspense fallback={null}>
        {enableExtras && <CustomCursor />}
        {enableExtras && <CookieManager />}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <HashScroller />

          <main>
            <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
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
