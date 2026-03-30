"use client";

type AssessmentType = "general" | "role";

interface TypeSelectorProps {
  onSelect: (type: AssessmentType) => void;
}

const cards: {
  type: AssessmentType;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  stats: string;
}[] = [
  {
    type: "general",
    titleEn: "General Assessment",
    titleEs: "Evaluación General",
    descEn: "How well are you using AI across your entire work life.",
    descEs: "Qué tan bien estás usando IA en toda tu vida laboral.",
    stats: "15 questions · ~5 min · YES / NO",
  },
  {
    type: "role",
    titleEn: "Role-Specific Assessment",
    titleEs: "Evaluación por Rol",
    descEn: "How well are you using AI in your specific discipline.",
    descEs: "Qué tan bien estás usando IA en tu disciplina específica.",
    stats: "33 questions · ~7 min · Confidence scale",
  },
];

export default function TypeSelector({ onSelect }: TypeSelectorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[600px] text-center">
        <h2 className="mb-2 font-sans text-base font-semibold text-[#1f36a9]">
          Choose your assessment
        </h2>
        <p className="mb-10 font-sans text-sm italic text-[#1f36a9]/60">
          Elige tu evaluación
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <button
              key={card.type}
              type="button"
              role="button"
              tabIndex={0}
              onClick={() => onSelect(card.type)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(card.type);
                }
              }}
              className="type-selector-card"
            >
              <p className="font-sans text-base font-semibold text-[#1f36a9]">
                {card.titleEn}
              </p>
              <p className="mt-0.5 font-sans text-[13px] italic text-[#1f36a9]/50">
                {card.titleEs}
              </p>
              <p className="mt-4 font-sans text-[13px] leading-[1.6] text-[#2a2a2a]/65">
                {card.descEn}
              </p>
              <p className="mt-1 font-sans text-[13px] italic leading-[1.6] text-[#2a2a2a]/45">
                {card.descEs}
              </p>
              <p className="mt-3 font-sans text-xs text-[#1f36a9]/40">
                {card.stats}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
