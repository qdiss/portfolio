import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

// ── Markdown → React renderer ─────────────────────────────────────────
function renderInline(text, keyPrefix = "") {
  const parts = [];
  let last = 0;
  const combined =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let m;
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last)
      parts.push({ type: "text", val: text.slice(last, m.index) });
    if (m[1] != null) parts.push({ type: "link", label: m[1], href: m[2] });
    else if (m[3] != null) parts.push({ type: "bold", val: m[3] });
    else if (m[4] != null) parts.push({ type: "italic", val: m[4] });
    else if (m[5] != null) parts.push({ type: "code", val: m[5] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", val: text.slice(last) });

  return parts.map((p, i) => {
    const k = `${keyPrefix}-${i}`;
    if (p.type === "bold")
      return (
        <strong key={k} style={{ color: "var(--text)", fontWeight: 600 }}>
          {p.val}
        </strong>
      );
    if (p.type === "italic")
      return (
        <em key={k} style={{ fontStyle: "italic", color: "var(--muted)" }}>
          {p.val}
        </em>
      );
    if (p.type === "code")
      return (
        <code
          key={k}
          style={{
            fontFamily: "monospace",
            fontSize: "0.88em",
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "0.1em 0.4em",
            color: "var(--accent)",
          }}
        >
          {p.val}
        </code>
      );
    if (p.type === "link")
      return (
        <a
          key={k}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {p.label}
        </a>
      );
    return <span key={k}>{p.val}</span>;
  });
}

function renderContent(raw) {
  if (!raw) return null;

  // Normalize line endings
  const normalized = raw.replace(/\r\n/g, "\n");

  // Extract fenced code blocks FIRST before splitting into blocks
  const segments = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(normalized)) !== null) {
    // Everything before this code block
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: normalized.slice(lastIndex, match.index),
      });
    }
    segments.push({ type: "code", lang: match[1], content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < normalized.length) {
    segments.push({ type: "text", content: normalized.slice(lastIndex) });
  }

  const elements = [];
  let keyCounter = 0;

  segments.forEach((seg) => {
    if (seg.type === "code") {
      const k = keyCounter++;
      elements.push(
        <div key={`code-${k}`} style={{ margin: "1.75rem 0" }}>
          {seg.lang && (
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderBottom: "none",
                borderRadius: "10px 10px 0 0",
                padding: "0.4rem 1rem",
                fontFamily: "monospace",
                letterSpacing: "0.04em",
              }}
            >
              {seg.lang}
            </div>
          )}
          <pre
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: seg.lang ? "0 0 10px 10px" : "10px",
              padding: "1.25rem",
              overflowX: "auto",
              margin: 0,
            }}
          >
            <code
              style={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "var(--text)",
                lineHeight: 1.65,
                whiteSpace: "pre",
              }}
            >
              {seg.content}
            </code>
          </pre>
        </div>,
      );
    } else {
      // Split text segments into blocks by double newline
      const blocks = seg.content.split(/\n\n+/);
      blocks.forEach((block) => {
        const k = keyCounter++;
        const t = block.trim();
        if (!t) return;

        if (t === "---") {
          elements.push(
            <hr
              key={k}
              style={{
                border: "none",
                borderTop: "1px solid var(--border)",
                margin: "2.5rem 0",
              }}
            />,
          );
          return;
        }
        if (t.startsWith("# ")) {
          elements.push(
            <h2
              key={k}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "3rem 0 1rem",
                lineHeight: 1.2,
              }}
            >
              {renderInline(t.slice(2), `h2-${k}`)}
            </h2>,
          );
          return;
        }
        if (t.startsWith("## ")) {
          elements.push(
            <h3
              key={k}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                margin: "2.5rem 0 0.85rem",
                lineHeight: 1.25,
                borderBottom: "1px solid var(--border)",
                paddingBottom: "0.5rem",
              }}
            >
              {renderInline(t.slice(3), `h3-${k}`)}
            </h3>,
          );
          return;
        }
        if (t.startsWith("### ")) {
          elements.push(
            <h4
              key={k}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: "2rem 0 0.65rem",
                lineHeight: 1.3,
              }}
            >
              {renderInline(t.slice(4), `h4-${k}`)}
            </h4>,
          );
          return;
        }
        if (t.startsWith("> ")) {
          elements.push(
            <blockquote
              key={k}
              style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1.25rem",
                margin: "1.5rem 0",
                color: "var(--muted)",
                fontStyle: "italic",
                lineHeight: 1.8,
              }}
            >
              {renderInline(t.slice(2), `bq-${k}`)}
            </blockquote>,
          );
          return;
        }

        const lines = t.split("\n");

        // Unordered list
        if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
          elements.push(
            <ul
              key={k}
              style={{
                margin: "1rem 0 1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {lines.map((li, j) => (
                <li
                  key={j}
                  style={{
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    fontSize: "1.025rem",
                  }}
                >
                  {renderInline(li.replace(/^[-*] /, ""), `ul-${k}-${j}`)}
                </li>
              ))}
            </ul>,
          );
          return;
        }

        // Ordered list
        if (lines.every((l) => /^\d+\. /.test(l))) {
          elements.push(
            <ol
              key={k}
              style={{
                margin: "1rem 0 1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {lines.map((li, j) => (
                <li
                  key={j}
                  style={{
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    fontSize: "1.025rem",
                  }}
                >
                  {renderInline(li.replace(/^\d+\. /, ""), `ol-${k}-${j}`)}
                </li>
              ))}
            </ol>,
          );
          return;
        }

        // Paragraph
        elements.push(
          <p
            key={k}
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
                {renderInline(line, `p-${k}-${li}`)}
              </span>
            ))}
          </p>,
        );
      });
    }
  });

  return elements;
}

// ── Related posts ─────────────────────────────────────────────────────
function RelatedPosts({ currentSlug, t, allPosts }) {
  const related = allPosts.filter((p) => p.slug !== currentSlug).slice(0, 2);
  if (!related.length) return null;
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
        {t.post_more || "More posts"}
      </div>
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
            {formatDate(post.date)} · {post.read_time}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  );
}

// ── SEO meta tag helper ───────────────────────────────────────────────
function setMeta(name, content, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// ── Main component ────────────────────────────────────────────────────
export default function PostPage() {
  const { slug } = useParams();
  const { t } = useLang();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── SEO via hook (updates whenever post changes) ───────────────────
  useSEO(
    post
      ? {
          title: `${post.title} — Adis Klobodanovic`,
          description: post.excerpt || "",
          canonical: `https://adiss.dev/blog/${post.slug}`,
          ogType: "article",
          ogImage: post.og_image || "https://adiss.dev/og-image.png",
          ogImageAlt: post.title,
          articleDate: post.date,
          articleModified: post.updated_at || post.date,
          articleTags: post.tags || [],
          jsonLdId: "post-jsonld",
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `https://adiss.dev/blog/${post.slug}#article`,
            headline: post.title,
            name: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.updated_at || post.date,
            url: `https://adiss.dev/blog/${post.slug}`,
            image: post.og_image || "https://adiss.dev/og-image.png",
            inLanguage: "en-US",
            keywords: (post.tags || []).join(", "),
            wordCount: post.content
              ? post.content.split(/\s+/).length
              : undefined,
            timeRequired: post.read_time || undefined,
            author: {
              "@type": "Person",
              "@id": "https://adiss.dev/#person",
              name: "Adis Klobodanovic",
              url: "https://adiss.dev",
            },
            publisher: {
              "@type": "Person",
              "@id": "https://adiss.dev/#person",
              name: "Adis Klobodanovic",
              url: "https://adiss.dev",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://adiss.dev/blog/${post.slug}`,
            },
            isPartOf: {
              "@type": "Blog",
              "@id": "https://adiss.dev/blog#blog",
              name: "Adis Klobodanovic — Blog",
              url: "https://adiss.dev/blog",
            },
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
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://adiss.dev/blog/${post.slug}`,
              },
            ],
          },
        }
      : {
          title: "Blog — Adis Klobodanovic",
          description:
            "Articles on React, Next.js, Node.js and web development.",
          canonical: "https://adiss.dev/blog",
        },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
    fetchAllPosts();
  }, [slug]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      navigate("/blog", { replace: true });
      return;
    }

    setPost(data);
    setLoading(false);
  }

  async function fetchAllPosts() {
    const { data } = await supabase
      .from("posts")
      .select("slug, title, date, read_time")
      .eq("published", true)
      .order("date", { ascending: false });
    setAllPosts(data || []);
  }

  // Cleanup meta kad se napusti stranica
  useEffect(() => {
    return () => {
      document.title = "Adis Klobodanovic — Full-Stack Developer";
      const jsonLd = document.getElementById("post-jsonld");
      if (jsonLd) jsonLd.remove();
    };
  }, []);

  if (loading)
    return (
      <>
        <Nav />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
          }}
        >
          Loading...
        </div>
      </>
    );

  if (!post) return null;

  return (
    <>
      <style>{`
        .post-page { max-width: 720px; margin: 0 auto; padding: 8rem 2.5rem 5rem; }
        @media(max-width: 600px) { .post-page { padding: 7rem 1.5rem 4rem; } }
      `}</style>

      <Nav />

      <article
        className="post-page"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Post header */}
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
            <time
              dateTime={post.date}
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                fontWeight: 300,
              }}
              itemProp="datePublished"
            >
              {formatDate(post.date)}
            </time>
            <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>
              ·
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--muted2)" }}>
              {post.read_time}
            </span>
            {(post.tags || []).map((tag) => (
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
            itemProp="headline"
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
            itemProp="description"
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

        {/* Post content */}
        <div itemProp="articleBody">{renderContent(post.content)}</div>

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
            {t.post_building}
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
            {t.post_building_sub}
          </p>
          <Link
            to="/hire"
            className="btn-primary"
            style={{ fontSize: "0.85rem" }}
          >
            {t.post_hire_link}
          </Link>
        </div>

        <RelatedPosts currentSlug={slug} t={t} allPosts={allPosts} />
      </article>

      {/* Footer */}
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
        <Link
          to="/blog"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          {t.post_back}
        </Link>
      </div>
    </>
  );
}
