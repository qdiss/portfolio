import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";
import { supabase } from "../lib/supabase";
import Nav from "../components/Nav.jsx";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: t.blog_seo_title || "Blog — Adis Klobodanović | Web Development Articles",
    description:
      t.blog_seo_desc || "Articles on React, Next.js, Node.js, web performance, and freelance development. Real-world experience, no fluff.",
    canonical: "https://adiss.dev/blog",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://adiss.dev/blog#blog",
      name: "Adis Klobodanovic — Blog",
      url: "https://adiss.dev/blog",
      description:
        "Articles on React, Next.js, Node.js, web performance, and freelance development.",
      author: {
        "@type": "Person",
        name: "Adis Klobodanovic",
        url: "https://adiss.dev",
      },
      publisher: {
        "@type": "Person",
        name: "Adis Klobodanovic",
        url: "https://adiss.dev",
      },
      inLanguage: "en-US",
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://adiss.dev",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://adiss.dev/blog",
        },
      ],
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 50);
    return () => observer.disconnect();
  }, [loading]);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("slug, title, excerpt, date, read_time, tags")
      .eq("published", true)
      .order("date", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <style>{`
        .blog-page { max-width: 900px; margin: 0 auto; padding: 8rem 2.5rem 5rem; }
        .post-card { display: block; padding: 2rem 0; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; }
        .post-card:first-of-type { border-top: 1px solid var(--border); }
        .post-card:hover .post-title { color: var(--accent); }
        .post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .post-date { font-size: 0.78rem; color: var(--muted); font-weight: 300; }
        .post-read-time { font-size: 0.78rem; color: var(--muted2); }
        .post-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .post-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.025em; line-height: 1.25; margin-bottom: 0.6rem; transition: color 0.2s; }
        .post-excerpt { color: var(--muted); font-size: 0.9rem; font-weight: 300; line-height: 1.75; }
        .post-read-link { display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.85rem; font-size: 0.8rem; color: var(--accent); font-weight: 500; }
        @media(max-width: 600px) { .blog-page { padding: 7rem 1.5rem 4rem; } }
      `}</style>

      <Nav />

      <div className="blog-page" style={{ flex: 1 }}>
        <div className="section-label reveal">{t.blog_page_label}</div>
        <h1
          className="section-title reveal"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.5rem" }}
        >
          {t.blog_page_title}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: "3rem",
            fontSize: "0.95rem",
          }}
          className="reveal"
        >
          {t.blog_page_sub}
        </p>

        {loading ? (
          <p
            style={{
              color: "var(--muted)",
              padding: "4rem 0",
              textAlign: "center",
            }}
          >
            Loading...
          </p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`post-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="post-meta">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="post-read-time">{post.read_time}</span>
                  <div className="post-tags">
                    {(post.tags || []).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <span className="post-read-link">{t.blog_read} →</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--muted)",
          fontSize: "0.8rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>
        <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          {t.blog_back}
        </Link>
      </div>
    </div>
  );
}