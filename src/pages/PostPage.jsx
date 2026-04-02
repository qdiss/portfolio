import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { posts, getPost, formatDate } from "../content/posts/index.js";
import { useTheme } from "../context/ThemeContext";
import Nav from "../components/Nav.jsx";

// ─── Simple Markdown-ish renderer ─────────────────────────────────────────────
// Handles: ## headings, **bold**, `code`, --- dividers, paragraphs
function renderContent(raw) {
  const blocks = raw.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Horizontal rule
    if (trimmed === "---") {
      return (
        <hr
          key={i}
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            margin: "2.5rem 0",
          }}
        />
      );
    }

    // ## Heading
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "2.5rem 0 1rem",
            lineHeight: 1.25,
          }}
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    // Paragraph — inline formatting
    const lines = trimmed.split("\n");
    return (
      <p
        key={i}
        style={{
          color: "var(--muted)",
          fontWeight: 300,
          lineHeight: 1.9,
          fontSize: "1.025rem",
          marginBottom: "1.25rem",
        }}
      >
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {renderInline(line)}
          </span>
        ))}
      </p>
    );
  });
}

function renderInline(text) {
  // Split on **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--text)", fontWeight: 500 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          style={{
            fontFamily: "monospace",
            fontSize: "0.88em",
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.1em 0.35em",
            color: "var(--accent)",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Handle [text](url) links
    return part
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "__LINK__")
      .split("__LINK__")
      .map((seg, j) => {
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/g);
        if (j > 0 && linkMatch) {
          const m = linkMatch[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
          return (
            <a
              key={j}
              href={m[2]}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              {m[1]}
            </a>
          );
        }
        return <span key={j}>{seg}</span>;
      });
  });
}

// Content loader — lazy imports each post file
const contentModules = {
  "why-your-landing-page-is-slow": () =>
    import("../content/posts/why-your-landing-page-is-slow.js"),
  "first-client-project": () =>
    import("../content/posts/first-client-project.js"),
  "nextjs-app-router-honest-thoughts": () =>
    import("../content/posts/nextjs-app-router-honest-thoughts.js"),
};

// ─── Related posts ────────────────────────────────────────────────────────────
function RelatedPosts({ currentSlug }) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 2);
  return (
    <div
      style={{
        marginTop: "4rem",
        paddingTop: "2.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "1.5rem",
        }}
      >
        More posts
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{
              display: "block",
              padding: "1.25rem 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginBottom: "0.35rem",
              }}
            >
              {formatDate(post.date)} · {post.readTime}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text)")}
            >
              {post.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) return;
    document.title = `${post.title} — Adis Klobodanovic`;

    const loader = contentModules[slug];
    if (loader) {
      loader().then((mod) => {
        setContent(mod.content);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug, post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <style>{`
        .post-page { max-width: 680px; margin: 0 auto; padding: 8rem 2.5rem 5rem; }
        @media(max-width: 600px) { .post-page { padding: 7rem 1.5rem 4rem; } }
      `}</style>

      <Nav />

      <article className="post-page">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                fontWeight: 300,
              }}
            >
              {formatDate(post.date)}
            </span>
            <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>
              ·
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--muted2)" }}>
              {post.readTime}
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem,4vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.8,
              borderLeft: "2px solid rgba(200,240,96,0.3)",
              paddingLeft: "1rem",
            }}
          >
            {post.excerpt}
          </p>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            marginBottom: "2.5rem",
          }}
        />

        {/* Body */}
        {loading ? (
          <div
            style={{
              color: "var(--muted)",
              fontWeight: 300,
              padding: "2rem 0",
            }}
          >
            Loading...
          </div>
        ) : content ? (
          <div>{renderContent(content)}</div>
        ) : (
          <p style={{ color: "var(--muted)" }}>Content not found.</p>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            background: "rgba(200,240,96,0.04)",
            border: "1px solid rgba(200,240,96,0.15)",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "0.45rem",
            }}
          >
            Building something?
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "1.25rem",
            }}
          >
            If this was useful, you might like working together. I take on a few
            projects a month — mostly web apps, landing pages, and SaaS
            products.
          </p>
          <Link
            to="/hire"
            className="btn-primary"
            style={{ fontSize: "0.85rem" }}
          >
            See how to hire me →
          </Link>
        </div>

        <RelatedPosts currentSlug={slug} />
      </article>

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
        <Link
          to="/blog"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          ← Back to blog
        </Link>
      </div>
    </>
  );
}
