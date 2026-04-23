import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { posts as localPosts } from "../content/posts/index";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Normalize post — Supabase uses read_time, local uses readTime
function normalizePost(post) {
  return {
    ...post,
    read_time: post.read_time || post.readTime || "",
  };
}

function BlogSkeleton() {
  return (
    <div className="blog-grid" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="blog-card"
          style={{
            opacity: 0.4,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height: "0.75rem",
              width: "40%",
              borderRadius: 6,
              background: "var(--border2)",
              marginBottom: "0.85rem",
            }}
          />
          <div
            style={{
              height: "1.1rem",
              width: "80%",
              borderRadius: 6,
              background: "var(--border2)",
              marginBottom: "0.5rem",
            }}
          />
          <div
            style={{
              height: "0.9rem",
              width: "60%",
              borderRadius: 6,
              background: "var(--border2)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Blog() {
  const { t } = useLang();
  const [posts, setPosts] = useState(null); // null = loading

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title, excerpt, date, read_time, tags")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        const result = data?.length ? data : localPosts;
        setPosts(result.map(normalizePost));
      })
      .catch(() => {
        setPosts(localPosts.map(normalizePost));
      });
  }, []);

  return (
    <section id="blog" style={{ background: "var(--bg2)" }}>
      <div className="section-label reveal">{t.blog_label}</div>
      <h2 className="section-title reveal">{t.blog_title}</h2>
      <p className="section-sub reveal">{t.blog_sub}</p>

      {posts === null ? (
        <BlogSkeleton />
      ) : (
        <div className="blog-grid">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`blog-card reveal reveal-delay-${i + 1}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div className="blog-date">
                {formatDate(post.date)} · {post.read_time}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-read">{t.blog_read}</div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          to="/blog"
          className="btn-secondary"
          style={{ fontSize: "0.85rem" }}
        >
          {t.blog_all_posts}
        </Link>
      </div>
    </section>
  );
}
