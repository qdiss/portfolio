import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate, getAllPosts, findPost } from "../content/posts/index.js";
import { useLang } from "../context/LangContext";
import Nav from "../components/Nav.jsx";

export default function BlogPage() {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog — Adis Klobodanovic";

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const allPosts = getAllPosts();

  return (
    <>
      <style>{`
        .blog-page { max-width: 900px; margin: 0 auto; padding: 8rem 2.5rem 5rem; }
        .post-card { display: block; padding: 2rem 0; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; transition: opacity 0.2s; }
        .post-card:first-of-type { border-top: 1px solid var(--border); }
        .post-card:hover .post-title { color: var(--accent); }
        .post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .post-date { font-size: 0.78rem; color: var(--muted); font-weight: 300; }
        .post-read-time { font-size: 0.78rem; color: var(--muted2); }
        .post-tags { display: flex; gap: 0.4rem; }
        .post-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.025em; line-height: 1.25; margin-bottom: 0.6rem; transition: color 0.2s; }
        .post-excerpt { color: var(--muted); font-size: 0.9rem; font-weight: 300; line-height: 1.75; }
        .post-read-link { display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.85rem; font-size: 0.8rem; color: var(--accent); font-weight: 500; }
        @media(max-width: 600px) { .blog-page { padding: 7rem 1.5rem 4rem; } }
      `}</style>

      <Nav />

      <div className="blog-page">
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

        <div>
          {allPosts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`post-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="post-meta">
                <span className="post-date">{formatDate(post.date)}</span>
                <span className="post-read-time">{post.readTime}</span>
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <span className="post-read-link">{t.blog_read}</span>
            </Link>
          ))}
        </div>
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
          adis<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>
        <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          {t.blog_back}
        </Link>
      </div>
    </>
  );
}
