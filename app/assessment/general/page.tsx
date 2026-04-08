import type { Metadata } from "next";
import type { Language } from "@/lib/content";
import GeneralQuiz from "@/components/GeneralQuiz";
import { fetchQuestions } from "@/lib/supabase/questions";
import { toGeneralQuestions, toQuestionIdMap } from "@/lib/supabase/transformQuestions";

export const metadata: Metadata = {
  title: "General AI Assessment | Accionables",
  description:
    "15 yes/no questions to discover your real AI adoption level at work.",
  robots: { index: false, follow: false },
};

export default async function GeneralPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const language: Language = lang === "en" ? "en" : "es";

  // Fetch questions from DB server-side (falls back to TS in component)
  const dbQuestions = await fetchQuestions("general");
  const questions = dbQuestions ? toGeneralQuestions(dbQuestions) : undefined;
  const questionIds = dbQuestions ? toQuestionIdMap(dbQuestions) : undefined;

  return (
    <GeneralQuiz
      initialLanguage={language}
      dbQuestions={questions}
      questionIds={questionIds}
    />
  );
}
