import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { supabase } from "../lib/supabase";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  tags: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  read_time: "5 min read",
  published: true,
};

export default function AdminPage() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(""); // '', 'saving', 'saved', 'error'
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    document.title = "Admin — Blog Management";
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  }

  const startNew = () => {
    setForm(emptyForm);
    setEditing("new");
    setStatus("");
    setPreview(false);
  };

  const startEdit = (post) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      tags: (post.tags || []).join(", "),
      content: post.content || "",
      date: post.date,
      read_time: post.read_time,
      published: post.published,
    });
    setEditing(post.id);
    setStatus("");
    setPreview(false);
  };

  const handleChange = (field, value) => {
    setForm((f) => {
      const updated = { ...f, [field]: value };
      if (field === "title" && editing === "new") {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    setStatus("saving");

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: form.content,
      date: form.date,
      read_time: form.read_time,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editing === "new") {
      ({ error } = await supabase.from("posts").insert(payload));
    } else {
      ({ error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", editing));
    }

    if (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("saved");
      await fetchPosts();
      setTimeout(() => {
        setStatus("");
        setEditing(null);
      }, 1200);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
    if (editing === id) setEditing(null);
  };

  const handleTogglePublish = async (post) => {
    await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    fetchPosts();
  };

  // Simple markdown preview
  const renderPreview = (md) => {
    return md
      .replace(/^### (.+)/gm, "<h3>$1</h3>")
      .replace(/^## (.+)/gm, "<h2>$1</h2>")
      .replace(/^# (.+)/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/^> (.+)/gm, "<blockquote>$1</blockquote>")
      .replace(/^- (.+)/gm, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[h|p|u|o|l|b|c])/gm, "");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <>
      <style>{`
        .admin-wrap { max-width: 960px; margin: 0 auto; padding: 6rem 2rem 4rem; }
        .admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
        .admin-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; }
        .post-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 1.25rem 0; border-bottom: 1px solid var(--border); gap: 1rem; }
        .post-row-info { flex: 1; }
        .post-row-title { font-family: var(--font-display); font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
        .post-row-meta { font-size: 0.78rem; color: var(--muted); }
        .post-row-actions { display: flex; gap: 0.5rem; flex-shrink: 0; align-items: center; }
        .btn-edit { background: var(--bg2); border: 1px solid var(--border); color: var(--text); padding: 0.4rem 0.85rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-family: inherit; transition: border-color 0.2s; }
        .btn-edit:hover { border-color: var(--accent); color: var(--accent); }
        .btn-del { background: none; border: 1px solid rgba(220,50,50,0.3); color: #e55; padding: 0.4rem 0.85rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-family: inherit; }
        .btn-del:hover { border-color: #e55; background: rgba(220,50,50,0.06); }
        .btn-publish { background: none; border: 1px solid var(--border); color: var(--muted); padding: 0.4rem 0.85rem; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-family: inherit; transition: all 0.2s; }
        .btn-publish.live { border-color: rgba(200,240,96,0.4); color: var(--accent); background: rgba(200,240,96,0.06); }
        .form-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .form-label { font-size: 0.75rem; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
        .form-hint { font-size: 0.72rem; color: var(--muted2); margin-top: 0.25rem; font-family: monospace; }
        .form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; align-items: center; flex-wrap: wrap; }
        .btn-save-main { background: var(--accent); color: #0a0a0a; border: none; padding: 0.7rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 700; font-family: inherit; font-size: 0.9rem; transition: opacity 0.2s; }
        .btn-save-main:hover { opacity: 0.85; }
        .btn-save-main:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-cancel { background: none; border: 1px solid var(--border); color: var(--muted); padding: 0.7rem 1.2rem; border-radius: 10px; cursor: pointer; font-family: inherit; font-size: 0.9rem; }
        .btn-preview { background: none; border: 1px solid var(--border2); color: var(--text); padding: 0.7rem 1.2rem; border-radius: 10px; cursor: pointer; font-family: inherit; font-size: 0.9rem; transition: border-color 0.2s; }
        .btn-preview:hover { border-color: var(--accent); color: var(--accent); }
        .status-msg { font-size: 0.82rem; font-weight: 500; }
        .status-saved { color: var(--accent); }
        .status-error { color: #e55; }
        .status-saving { color: var(--muted); }
        .md-ref { background: rgba(200,240,96,0.04); border: 1px solid rgba(200,240,96,0.12); border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; }
        .md-ref h4 { font-size: 0.78rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; font-weight: 600; }
        .md-ref-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.4rem; }
        .md-ref-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; color: var(--muted); }
        .md-ref-item code { background: var(--bg3,var(--bg2)); padding: 0.15rem 0.45rem; border-radius: 5px; font-size: 0.75rem; color: var(--accent); font-family: monospace; white-space: nowrap; }
        .md-ref-item span { color: var(--muted2); font-size: 0.75rem; }
        .preview-wrap { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 2rem; margin-top: 0; min-height: 200px; }
        .preview-wrap h1,.preview-wrap h2,.preview-wrap h3 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; margin: 1.5rem 0 0.75rem; color: var(--text); }
        .preview-wrap h1 { font-size: 1.8rem; }
        .preview-wrap h2 { font-size: 1.4rem; }
        .preview-wrap h3 { font-size: 1.1rem; }
        .preview-wrap p { color: var(--muted); line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }
        .preview-wrap strong { color: var(--text); font-weight: 600; }
        .preview-wrap em { font-style: italic; color: var(--muted); }
        .preview-wrap code { background: var(--bg2); color: var(--accent); padding: 0.15rem 0.45rem; border-radius: 5px; font-family: monospace; font-size: 0.85em; }
        .preview-wrap pre { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; overflow-x: auto; margin: 1rem 0; }
        .preview-wrap pre code { background: none; padding: 0; color: var(--text); }
        .preview-wrap blockquote { border-left: 3px solid var(--accent); padding-left: 1rem; margin: 1rem 0; color: var(--muted); font-style: italic; }
        .preview-wrap li { color: var(--muted); margin-left: 1.5rem; margin-bottom: 0.3rem; line-height: 1.7; }
        .tab-bar { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 0; }
        .tab-btn { background: none; border: none; border-bottom: 2px solid transparent; padding: 0.65rem 1.25rem; color: var(--muted); cursor: pointer; font-family: inherit; font-size: 0.85rem; font-weight: 500; margin-bottom: -1px; transition: color 0.2s, border-color 0.2s; }
        .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
        .published-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; font-weight: 500; }
        .published-badge.live { background: rgba(200,240,96,0.1); color: var(--accent); border: 1px solid rgba(200,240,96,0.25); }
        .published-badge.draft { background: rgba(255,255,255,0.04); color: var(--muted); border: 1px solid var(--border); }
        [data-theme="light"] .form-wrap { background: #fff; }
        [data-theme="light"] .preview-wrap { background: #f8f8f6; }
        [data-theme="light"] .md-ref { background: rgba(77,105,0,0.04); border-color: rgba(77,105,0,0.15); }
        @media(max-width: 600px) { .form-row { grid-template-columns: 1fr; } .admin-wrap { padding: 5rem 1.25rem 3rem; } .md-ref-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev admin
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to="/"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            ← Back to site
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              padding: "0.35rem 0.85rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.82rem",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e55";
              e.currentTarget.style.borderColor = "rgba(220,50,50,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="admin-wrap">
        {editing !== null ? (
          <>
            <div className="admin-header">
              <h1 className="admin-title">
                {editing === "new" ? "New Post" : "Edit Post"}
              </h1>
              <button className="btn-cancel" onClick={() => setEditing(null)}>
                ← Back
              </button>
            </div>

            {/* Markdown reference */}
            <div className="md-ref">
              <h4>Markdown Reference</h4>
              <div className="md-ref-grid">
                <div className="md-ref-item">
                  <code># Heading 1</code>
                  <span>H1 naslov</span>
                </div>
                <div className="md-ref-item">
                  <code>## Heading 2</code>
                  <span>H2 naslov</span>
                </div>
                <div className="md-ref-item">
                  <code>### Heading 3</code>
                  <span>H3 naslov</span>
                </div>
                <div className="md-ref-item">
                  <code>**bold text**</code>
                  <span>Bold</span>
                </div>
                <div className="md-ref-item">
                  <code>*italic text*</code>
                  <span>Italic</span>
                </div>
                <div className="md-ref-item">
                  <code>`inline code`</code>
                  <span>Inline kod</span>
                </div>
                <div className="md-ref-item">
                  <code>```js ... ```</code>
                  <span>Kod blok</span>
                </div>
                <div className="md-ref-item">
                  <code>{">"} quote</code>
                  <span>Blockquote</span>
                </div>
                <div className="md-ref-item">
                  <code>- item</code>
                  <span>Lista</span>
                </div>
                <div className="md-ref-item">
                  <code>1. item</code>
                  <span>Numisana lista</span>
                </div>
                <div className="md-ref-item">
                  <code>[text](url)</code>
                  <span>Link</span>
                </div>
                <div className="md-ref-item">
                  <code>---</code>
                  <span>Horizontalna linija</span>
                </div>
              </div>
            </div>

            <div className="form-wrap">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  style={inputStyle}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Post title..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Slug *</label>
                  <input
                    style={inputStyle}
                    value={form.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="my-post-slug"
                  />
                  <span className="form-hint">
                    adiss.dev/blog/{form.slug || "slug"}
                  </span>
                </div>
                <div className="form-group">
                  <label className="form-label">Read Time</label>
                  <input
                    style={inputStyle}
                    value={form.read_time}
                    onChange={(e) => handleChange("read_time", e.target.value)}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tags</label>
                  <input
                    style={inputStyle}
                    value={form.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                    placeholder="react, nextjs, tips"
                  />
                  <span className="form-hint">odvojeni zarezom</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Excerpt{" "}
                  <span
                    style={{
                      color: "var(--muted2)",
                      fontWeight: 300,
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    (prikazuje se u listingu — važno za SEO)
                  </span>
                </label>
                <textarea
                  style={{
                    ...inputStyle,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  value={form.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="Kratki opis posta, 1-2 rečenice..."
                />
              </div>

              <div className="form-group">
                <div className="tab-bar">
                  <button
                    className={`tab-btn${!preview ? " active" : ""}`}
                    onClick={() => setPreview(false)}
                  >
                    ✏️ Write
                  </button>
                  <button
                    className={`tab-btn${preview ? " active" : ""}`}
                    onClick={() => setPreview(true)}
                  >
                    👁 Preview
                  </button>
                </div>

                {!preview ? (
                  <>
                    <textarea
                      style={{
                        ...inputStyle,
                        minHeight: "400px",
                        resize: "vertical",
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        lineHeight: "1.6",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderTop: "none",
                      }}
                      value={form.content}
                      onChange={(e) => handleChange("content", e.target.value)}
                      placeholder={`# Naslov posta\n\nUvodni paragraf...\n\n## Sekcija\n\nTekst sa **bold** i *italic* riječima.\n\n\`\`\`js\nconst hello = "world";\nconsole.log(hello);\n\`\`\`\n\n> Ovo je quote\n\n- Stavka 1\n- Stavka 2`}
                    />
                  </>
                ) : (
                  <div
                    className="preview-wrap"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${renderPreview(form.content)}</p>`,
                    }}
                  />
                )}
              </div>

              <div
                className="form-group"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      handleChange("published", e.target.checked)
                    }
                    style={{ width: "auto", accentColor: "var(--accent)" }}
                  />
                  Objavi odmah (published)
                </label>
                <span style={{ fontSize: "0.75rem", color: "var(--muted2)" }}>
                  — ako isključiš, post je draft i neće biti vidljiv na blogu
                </span>
              </div>

              <div className="form-actions">
                <button
                  className="btn-save-main"
                  onClick={handleSave}
                  disabled={status === "saving"}
                >
                  {status === "saving" ? "Saving..." : "Save Post"}
                </button>
                <button className="btn-cancel" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                {status === "saved" && (
                  <span className="status-msg status-saved">✓ Saved!</span>
                )}
                {status === "error" && (
                  <span className="status-msg status-error">
                    ✗ Error — provjeri Supabase
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Blog Admin</h1>
              <button className="btn-save-main" onClick={startNew}>
                + New Post
              </button>
            </div>

            {loading ? (
              <p
                style={{
                  color: "var(--muted)",
                  padding: "3rem 0",
                  textAlign: "center",
                }}
              >
                Loading...
              </p>
            ) : posts.length === 0 ? (
              <p
                style={{
                  color: "var(--muted)",
                  fontWeight: 300,
                  padding: "3rem 0",
                  textAlign: "center",
                }}
              >
                No posts yet. Create your first one!
              </p>
            ) : (
              <div>
                {posts.map((post) => (
                  <div key={post.id} className="post-row">
                    <div className="post-row-info">
                      <div
                        className="post-row-title"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        {post.title}
                        <span
                          className={`published-badge ${post.published ? "live" : "draft"}`}
                        >
                          {post.published ? "● live" : "○ draft"}
                        </span>
                      </div>
                      <div className="post-row-meta">
                        {post.date} · {post.read_time}
                        {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                      </div>
                      {post.excerpt && (
                        <div
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--muted2)",
                            marginTop: "0.3rem",
                            maxWidth: "520px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                    <div className="post-row-actions">
                      <button
                        className={`btn-publish${post.published ? " live" : ""}`}
                        onClick={() => handleTogglePublish(post)}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => startEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-del"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
