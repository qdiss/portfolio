import { useLang } from "../context/LangContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <p>© {new Date().getFullYear()} Adis Klobodanovic</p>
      <div className="footer-links">
        <a href="mailto:adis.klobodanovic@gmail.com">{t.footer_email}</a>
        <a href="https://github.com/qdiss" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/adis-klobodanovic"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <Link to="/hire" style={{ color: "var(--accent)" }}>
          Start a project
        </Link>
      </div>
    </footer>
  );
}
