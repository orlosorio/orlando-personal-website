"use client";

import { useState, useEffect } from "react";
import { ABOUT_CONTENT } from "@/lib/about-content";
import ArticleHeader from "@/components/About/ArticleHeader";
import ArticleSection from "@/components/About/ArticleSection";
import CitationCard from "@/components/About/CitationCard";
import AuthorSignoff from "@/components/About/AuthorSignoff";
import StickyAssessmentBar from "@/components/About/StickyAssessmentBar";

type Lang = "en" | "es";

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("accionables_about_lang");
    if (saved === "en" || saved === "es") return saved;
    if (navigator.language.startsWith("es")) return "es";
  }
  return "en";
}

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(getInitialLang());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("accionables_about_lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const content = ABOUT_CONTENT[lang];
  const citationAfterIndex = 1;

  return (
    <>
      <ReadingProgress />
      <div className="about-container">
        <ArticleHeader
          meta={content.meta}
          lang={lang}
          onLangChange={setLang}
        />

        {content.sections.map((section, i) => (
          <div key={section.id}>
            <ArticleSection heading={section.heading} body={section.body} />
            {i === citationAfterIndex && (
              <CitationCard citation={content.citation} />
            )}
            {i < content.sections.length - 1 && <hr className="about-divider" />}
          </div>
        ))}

        <AuthorSignoff lang={lang} />
      </div>
      <StickyAssessmentBar lang={lang} />
    </>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.round(pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="about-progress-bar"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
