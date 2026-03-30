"use client";

import { useState } from "react";
import type { Language } from "@/lib/content";
import { SCALE_LABELS } from "@/lib/scaleLabels";

interface ScaleButtonsProps {
  onChange: (value: number) => void;
  language: Language;
}

export default function ScaleButtons({ onChange, language }: ScaleButtonsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered;
  const displayLabel =
    displayValue !== null ? SCALE_LABELS[displayValue]?.[language] ?? "" : "";

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex gap-3 scale-btn-row">
        {[0, 1, 2, 3, 4].map((val) => (
          <button
            key={val}
            type="button"
            aria-label={`Score ${val}: ${SCALE_LABELS[val]?.[language] ?? ""}`}
            onClick={() => onChange(val)}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(val)}
            onBlur={() => setHovered(null)}
            className="scale-btn"
          >
            {val}
          </button>
        ))}
      </div>
      <div
        className="scale-label"
        aria-live="polite"
      >
        {displayLabel}
      </div>
    </div>
  );
}
