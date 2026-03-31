interface AuthorSignoffProps {
  lang: "en" | "es";
}

export default function AuthorSignoff({ lang }: AuthorSignoffProps) {
  return (
    <div className="about-signoff">
      <p className="about-signoff-name">
        &mdash; Orlando Osorio &amp; Alberto Sade
      </p>
      <div className="about-signoff-links">
        <a
          href="https://x.com/orlandosorio_"
          target="_blank"
          rel="noopener noreferrer"
          className="about-signoff-link"
        >
          @orlandosorio_
        </a>
        <span className="about-signoff-separator">&middot;</span>
        <a
          href="https://x.com/aesadde"
          target="_blank"
          rel="noopener noreferrer"
          className="about-signoff-link"
        >
          @aesadde
        </a>
      </div>
    </div>
  );
}
