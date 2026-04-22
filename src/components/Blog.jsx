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

export default function Blog() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title, excerpt, date, read_time, tags")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data?.length ? data : localPosts));
  }, []);

  return (
    <section id="blog" style={{ background: "var(--bg2)" }}>
      <div className="section-label reveal">{t.blog_label}</div>
      <h2 className="section-title reveal">{t.blog_title}</h2>
      <p className="section-sub reveal">{t.blog_sub}</p>
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
