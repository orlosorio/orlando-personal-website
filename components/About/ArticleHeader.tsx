import type { AboutContent } from "@/lib/about-content";

interface ArticleHeaderProps {
  meta: AboutContent["meta"];
  lang: "en" | "es";
  onLangChange: (lang: "en" | "es") => void;
}

export default function ArticleHeader({
  meta,
  lang,
  onLangChange,
}: ArticleHeaderProps) {
  return (
    <header className="about-header">
      <nav className="about-nav">
        <a href="/assessment" className="about-logo">
          ACCIONABLES
        </a>
        <div className="about-lang-toggle">
          <button
            type="button"
            aria-pressed={lang === "en"}
            onClick={() => onLangChange("en")}
            className={`about-lang-btn ${lang === "en" ? "about-lang-btn-active" : ""}`}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={lang === "es"}
            onClick={() => onLangChange("es")}
            className={`about-lang-btn ${lang === "es" ? "about-lang-btn-active" : ""}`}
          >
            ES
          </button>
        </div>
      </nav>

      <h1 className="about-title">{meta.title}</h1>
      <p className="about-subtitle">{meta.subtitle}</p>
      <p className="about-byline">
        {meta.author} &middot; {meta.authorHandle} &middot; {meta.readTime}
      </p>
    </header>
  );
}
