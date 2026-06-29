import{u as $,j as e}from"./index-CkP4px7a.js";import{r as n,L as P}from"./vendor-react-DArxELLs.js";import{s as c}from"./supabase-DmiHtUJZ.js";import"./vendor-supabase-ClVc2H6D.js";function R(f){return f.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,60)}const w={title:"",slug:"",excerpt:"",tags:"",content:"",date:new Date().toISOString().slice(0,10),read_time:"5 min read",published:!0};function O(){const{t:f}=$(),[x,y]=n.useState([]),[l,d]=n.useState(null),[a,u]=n.useState(w),[m,o]=n.useState(""),[N,v]=n.useState(!0),[h,p]=n.useState(!1);n.useEffect(()=>{document.title="Admin - Blog Management",window.scrollTo(0,0),g()},[]);async function g(){v(!0);const{data:r,error:t}=await c.from("posts").select("*").order("date",{ascending:!1});t||y(r||[]),v(!1)}const k=()=>{u(w),d("new"),o(""),p(!1)},z=r=>{u({title:r.title,slug:r.slug,excerpt:r.excerpt||"",tags:(r.tags||[]).join(", "),content:r.content||"",date:r.date,read_time:r.read_time,published:r.published}),d(r.id),o(""),p(!1)},i=(r,t)=>{u(b=>{const j={...b,[r]:t};return r==="title"&&l==="new"&&(j.slug=R(t)),j})},S=async()=>{if(!a.title.trim()||!a.slug.trim())return;o("saving");const r={title:a.title.trim(),slug:a.slug.trim(),excerpt:a.excerpt.trim(),tags:a.tags.split(",").map(b=>b.trim()).filter(Boolean),content:a.content,date:a.date,read_time:a.read_time,published:a.published,updated_at:new Date().toISOString()};let t;l==="new"?{error:t}=await c.from("posts").insert(r):{error:t}=await c.from("posts").update(r).eq("id",l),t?(o("error"),setTimeout(()=>o(""),3e3)):(o("saved"),await g(),setTimeout(()=>{o(""),d(null)},1200))},C=async r=>{if(!window.confirm("Delete this post?"))return;const{error:t}=await c.from("posts").delete().eq("id",r);if(t){console.error("DELETE ERROR:",t),alert(t.message);return}await g(),l===r&&d(null)},T=async r=>{await c.from("posts").update({published:!r.published}).eq("id",r.id),g()},E=r=>r.replace(/^### (.+)/gm,"<h3>$1</h3>").replace(/^## (.+)/gm,"<h2>$1</h2>").replace(/^# (.+)/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/```[\w]*\n([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/^> (.+)/gm,"<blockquote>$1</blockquote>").replace(/^- (.+)/gm,"<li>$1</li>").replace(/\n\n/g,"</p><p>").replace(/^(?!<[h|p|u|o|l|b|c])/gm,""),s={width:"100%",padding:"0.75rem 1rem",borderRadius:"10px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"0.9rem",fontFamily:"inherit",boxSizing:"border-box",outline:"none"};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        .published-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; font-weight: 500; text-transform: capitalize; }
        .published-badge.live { background: rgba(200,240,96,0.1); color: var(--accent); border: 1px solid rgba(200,240,96,0.25); }
        .published-badge.draft { background: rgba(255,255,255,0.04); color: var(--muted); border: 1px solid var(--border); }
        [data-theme="light"] .form-wrap { background: #fff; }
        [data-theme="light"] .preview-wrap { background: #f8f8f6; }
        [data-theme="light"] .md-ref { background: rgba(77,105,0,0.04); border-color: rgba(77,105,0,0.15); }
        @media(max-width: 600px) {
  .admin-wrap {
    padding: 5rem 1rem 2rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-title {
    font-size: 1.4rem;
  }

  /* 🔥 POST ROW → vertikalni layout */
  .post-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .post-row-actions {
    width: 100%;
    justify-content: space-between;
  }

  .post-row-actions button {
    flex: 1;
    text-align: center;
    padding: 0.5rem;
  }

  /* 🔥 metadata wrap */
  .post-row-meta {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  /* 🔥 excerpt neka diše */
  .post-row-info div:last-child {
    white-space: normal !important;
  }

  /* 🔥 FORM */
  .form-wrap {
    padding: 1.25rem;
    border-radius: 14px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  /* 🔥 textarea kontrola */
  textarea {
    min-height: 250px !important;
  }

  /* 🔥 tab buttons */
  .tab-btn {
    flex: 1;
    text-align: center;
  }

  /* 🔥 markdown ref */
  .md-ref-grid {
    grid-template-columns: 1fr;
  }

  /* 🔥 preview padding */
  .preview-wrap {
    padding: 1.25rem;
  }

  /* 🔥 top bar */
  div[style*="position: fixed"] {
    padding: 0.75rem 1rem !important;
  }
}
      `}),e.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,background:"var(--bg)",borderBottom:"1px solid var(--border)",padding:"1rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:100},children:[e.jsxs("span",{style:{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1rem"},children:["adiss",e.jsx("span",{style:{color:"var(--accent)"},children:"."}),"dev admin"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx(P,{to:"/",style:{color:"var(--muted)",textDecoration:"none",fontSize:"0.85rem"},children:"← Back to site"}),e.jsx("button",{onClick:()=>c.auth.signOut(),style:{background:"none",border:"1px solid var(--border)",color:"var(--muted)",padding:"0.35rem 0.85rem",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem",transition:"color 0.2s, border-color 0.2s"},onMouseEnter:r=>{r.currentTarget.style.color="#e55",r.currentTarget.style.borderColor="rgba(220,50,50,0.4)"},onMouseLeave:r=>{r.currentTarget.style.color="var(--muted)",r.currentTarget.style.borderColor="var(--border)"},children:"Sign out"})]})]}),e.jsx("div",{className:"admin-wrap",children:l!==null?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"admin-header",children:[e.jsx("h1",{className:"admin-title",children:l==="new"?"New Post":"Edit Post"}),e.jsx("button",{className:"btn-cancel",onClick:()=>d(null),children:"← Back"})]}),e.jsxs("div",{className:"md-ref",children:[e.jsx("h4",{children:"Markdown Reference"}),e.jsxs("div",{className:"md-ref-grid",children:[e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"# Heading 1"}),e.jsx("span",{children:"H1 naslov"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"## Heading 2"}),e.jsx("span",{children:"H2 naslov"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"### Heading 3"}),e.jsx("span",{children:"H3 naslov"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"**bold text**"}),e.jsx("span",{children:"Bold"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"*italic text*"}),e.jsx("span",{children:"Italic"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"`inline code`"}),e.jsx("span",{children:"Inline kod"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"```js ... ```"}),e.jsx("span",{children:"Kod blok"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsxs("code",{children:[">"," quote"]}),e.jsx("span",{children:"Blockquote"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"- item"}),e.jsx("span",{children:"Lista"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"1. item"}),e.jsx("span",{children:"Numisana lista"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"[text](url)"}),e.jsx("span",{children:"Link"})]}),e.jsxs("div",{className:"md-ref-item",children:[e.jsx("code",{children:"---"}),e.jsx("span",{children:"Horizontalna linija"})]})]})]}),e.jsxs("div",{className:"form-wrap",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Title *"}),e.jsx("input",{style:s,value:a.title,onChange:r=>i("title",r.target.value),placeholder:"Post title..."})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Slug *"}),e.jsx("input",{style:s,value:a.slug,onChange:r=>i("slug",r.target.value),placeholder:"my-post-slug"}),e.jsxs("span",{className:"form-hint",children:["adiss.dev/blog/",a.slug||"slug"]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Read Time"}),e.jsx("input",{style:s,value:a.read_time,onChange:r=>i("read_time",r.target.value),placeholder:"5 min read"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",style:s,value:a.date,onChange:r=>i("date",r.target.value)})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tags"}),e.jsx("input",{style:s,value:a.tags,onChange:r=>i("tags",r.target.value),placeholder:"react, nextjs, tips"}),e.jsx("span",{className:"form-hint",children:"odvojeni zarezom"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Excerpt"," ",e.jsx("span",{style:{color:"var(--muted2)",fontWeight:300,textTransform:"none",letterSpacing:0},children:"(prikazuje se u listingu - važno za SEO)"})]}),e.jsx("textarea",{style:{...s,minHeight:"80px",resize:"vertical"},value:a.excerpt,onChange:r=>i("excerpt",r.target.value),placeholder:"Kratki opis posta, 1-2 rečenice..."})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"tab-bar",children:[e.jsx("button",{className:`tab-btn${h?"":" active"}`,onClick:()=>p(!1),children:"✏️ Write"}),e.jsx("button",{className:`tab-btn${h?" active":""}`,onClick:()=>p(!0),children:"👁 Preview"})]}),h?e.jsx("div",{className:"preview-wrap",dangerouslySetInnerHTML:{__html:`<p>${E(a.content)}</p>`}}):e.jsx(e.Fragment,{children:e.jsx("textarea",{style:{...s,minHeight:"400px",resize:"vertical",fontFamily:"monospace",fontSize:"0.85rem",lineHeight:"1.6",borderTopLeftRadius:0,borderTopRightRadius:0,borderTop:"none"},value:a.content,onChange:r=>i("content",r.target.value),placeholder:`# Naslov posta

Uvodni paragraf...

## Sekcija

Tekst sa **bold** i *italic* riječima.

\`\`\`js
const hello = "world";
console.log(hello);
\`\`\`

> Ovo je quote

- Stavka 1
- Stavka 2`})})]}),e.jsxs("div",{className:"form-group",style:{flexDirection:"row",alignItems:"center",gap:"0.75rem"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",fontSize:"0.88rem",color:"var(--muted)"},children:[e.jsx("input",{type:"checkbox",checked:a.published,onChange:r=>i("published",r.target.checked),style:{width:"auto",accentColor:"var(--accent)"}}),"Objavi odmah (published)"]}),e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--muted2)"},children:"- ako isključiš, post je draft i neće biti vidljiv na blogu"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-save-main",onClick:S,disabled:m==="saving",children:m==="saving"?"Saving...":"Save Post"}),e.jsx("button",{className:"btn-cancel",onClick:()=>d(null),children:"Cancel"}),m==="saved"&&e.jsx("span",{className:"status-msg status-saved",children:"✓ Saved!"}),m==="error"&&e.jsx("span",{className:"status-msg status-error",children:"✗ Error - provjeri Supabase"})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"admin-header",children:[e.jsx("h1",{className:"admin-title",children:"Blog Admin"}),e.jsx("button",{className:"btn-save-main",onClick:k,children:"+ New Post"})]}),N?e.jsx("p",{style:{color:"var(--muted)",padding:"3rem 0",textAlign:"center"},children:"Loading..."}):x.length===0?e.jsx("p",{style:{color:"var(--muted)",fontWeight:300,padding:"3rem 0",textAlign:"center"},children:"No posts yet. Create your first one!"}):e.jsx("div",{children:x.map(r=>{var t;return e.jsxs("div",{className:"post-row",children:[e.jsxs("div",{className:"post-row-info",children:[e.jsxs("div",{className:"post-row-title",style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[r.title,e.jsx("span",{className:`published-badge ${r.published?"live":"draft"}`,children:r.published?"● live":"○ draft"})]}),e.jsxs("div",{className:"post-row-meta",children:[r.date," · ",r.read_time,((t=r.tags)==null?void 0:t.length)>0&&` · ${r.tags.join(", ")}`]}),r.excerpt&&e.jsx("div",{style:{fontSize:"0.82rem",color:"var(--muted2)",marginTop:"0.3rem",maxWidth:"520px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:r.excerpt})]}),e.jsxs("div",{className:"post-row-actions",children:[e.jsx("button",{className:`btn-publish${r.published?" live":""}`,onClick:()=>T(r),children:r.published?"Unpublish":"Publish"}),e.jsx("button",{className:"btn-edit",onClick:()=>z(r),children:"Edit"}),e.jsx("button",{className:"btn-del",onClick:()=>C(r.id),children:"Delete"})]})]},r.id)})})]})})]})}export{O as default};
