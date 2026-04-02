import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

const STORAGE_KEY = "admin_posts";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  tags: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
};

export default function AdminPage() {
  const { t } = useLang();
  const [posts, setPosts] = useState(loadPosts);
  const [editing, setEditing] = useState(null); // null = list, 'new' = new, id = editing
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.title = "Admin — Blog Management";
    window.scrollTo(0, 0);
  }, []);

  const startNew = () => {
    setForm(emptyForm);
    setEditing("new");
    setSaved(false);
  };

  const startEdit = (post) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      tags: post.tags.join(", "),
      content: post.content || "",
      date: post.date,
      readTime: post.readTime,
    });
    setEditing(post.id);
    setSaved(false);
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

  const handleSave = () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    const post = {
      id: editing === "new" ? Date.now().toString() : editing,
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      content: form.content,
      date: form.date,
      readTime: form.readTime,
      updatedAt: new Date().toISOString(),
    };
    let updated;
    if (editing === "new") {
      updated = [post, ...posts];
    } else {
      updated = posts.map((p) => (p.id === editing ? post : p));
    }
    savePosts(updated);
    setPosts(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    if (!window.confirm(t.admin_confirm_delete || "Delete this post?")) return;
    const updated = posts.filter((p) => p.id !== id);
    savePosts(updated);
    setPosts(updated);
    if (editing === id) setEditing(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--bg2)",
    color: "var(--text)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>{`
        .admin-wrap { max-width: 900px; margin: 0 auto; padding: 6rem 2rem 4rem; }
        .admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
        .admin-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; }
        .post-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 1.25rem 0; border-bottom: 1px solid var(--border); gap: 1rem; }
        .post-row-info { flex: 1; }
        .post-row-title { font-family: var(--font-display); font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
        .post-row-meta { font-size: 0.78rem; color: var(--muted); }
        .post-row-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .btn-edit { background: var(--bg3, var(--bg2)); border: 1px solid var(--border); color: var(--text); padding: 0.4rem 0.85rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-family: inherit; transition: border-color 0.2s; }
        .btn-edit:hover { border-color: var(--accent); }
        .btn-del { background: none; border: 1px solid rgba(220,50,50,0.3); color: #e55; padding: 0.4rem 0.85rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-family: inherit; transition: border-color 0.2s; }
        .btn-del:hover { border-color: #e55; }
        .form-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .form-label { font-size: 0.78rem; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
        .form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; align-items: center; }
        .saved-msg { color: var(--accent); font-size: 0.82rem; font-weight: 500; }
        .btn-save-main { background: var(--accent); color: #0a0a0a; border: none; padding: 0.7rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 700; font-family: inherit; font-size: 0.9rem; }
        .btn-cancel { background: none; border: 1px solid var(--border); color: var(--muted); padding: 0.7rem 1.2rem; border-radius: 10px; cursor: pointer; font-family: inherit; font-size: 0.9rem; }
        [data-theme="light"] .form-wrap { background: #fff; }
        [data-theme="light"] .form-wrap input, [data-theme="light"] .form-wrap select, [data-theme="light"] .form-wrap textarea { background: #f8f8f8; color: #111; }
        @media(max-width: 600px) { .form-row { grid-template-columns: 1fr; } .admin-wrap { padding: 5rem 1.25rem 3rem; } }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev admin
        </span>
        <Link to="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem" }}>
          {t.admin_back || "← Back to site"}
        </Link>
      </div>

      <div className="admin-wrap">
        {editing !== null ? (
          <>
            <div className="admin-header">
              <h1 className="admin-title">{editing === "new" ? t.admin_new : t.admin_edit}</h1>
              <button className="btn-cancel" onClick={() => setEditing(null)}>{t.admin_cancel}</button>
            </div>

            <div className="form-wrap">
              <div className="form-group">
                <label className="form-label">{t.admin_post_title}</label>
                <input style={inputStyle} value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder={t.admin_post_title} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input style={inputStyle} value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder={t.admin_post_slug} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.admin_read_time}</label>
                  <input style={inputStyle} value={form.readTime} onChange={(e) => handleChange("readTime", e.target.value)} placeholder="5 min read" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.admin_post_date}</label>
                  <input type="date" style={inputStyle} value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tags</label>
                  <input style={inputStyle} value={form.tags} onChange={(e) => handleChange("tags", e.target.value)} placeholder={t.admin_post_tags} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} placeholder={t.admin_post_excerpt} />
              </div>

              <div className="form-group">
                <label className="form-label">Content (Markdown supported: ##, **bold**, `code`)</label>
                <textarea style={{ ...inputStyle, minHeight: "320px", resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }} value={form.content} onChange={(e) => handleChange("content", e.target.value)} placeholder={t.admin_post_content} />
              </div>

              <div className="form-actions">
                <button className="btn-save-main" onClick={handleSave}>{t.admin_save}</button>
                <button className="btn-cancel" onClick={() => setEditing(null)}>{t.admin_cancel}</button>
                {saved && <span className="saved-msg">✓ Saved</span>}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="admin-header">
              <h1 className="admin-title">{t.admin_title}</h1>
              <button className="btn-save-main" onClick={startNew} style={{ background: "var(--accent)", color: "#0a0a0a", border: "none", padding: "0.65rem 1.25rem", borderRadius: "10px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit", fontSize: "0.88rem" }}>
                + {t.admin_new}
              </button>
            </div>

            {posts.length === 0 ? (
              <p style={{ color: "var(--muted)", fontWeight: 300, padding: "3rem 0", textAlign: "center" }}>{t.admin_no_posts}</p>
            ) : (
              <div>
                {posts.map((post) => (
                  <div key={post.id} className="post-row">
                    <div className="post-row-info">
                      <div className="post-row-title">{post.title}</div>
                      <div className="post-row-meta">
                        {post.date} · {post.readTime}
                        {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                      </div>
                      {post.excerpt && (
                        <div style={{ fontSize: "0.82rem", color: "var(--muted2)", marginTop: "0.3rem", maxWidth: "520px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                    <div className="post-row-actions">
                      <button className="btn-edit" onClick={() => startEdit(post)}>{t.admin_edit}</button>
                      <button className="btn-del" onClick={() => handleDelete(post.id)}>{t.admin_delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(200,240,96,0.04)", border: "1px solid rgba(200,240,96,0.12)", borderRadius: "14px" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: 300, lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text)" }}>Note:</strong> Posts created here are stored in localStorage for now. To publish them to the live blog, export the post data and add it to <code style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.8em" }}>src/content/posts/</code>.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
