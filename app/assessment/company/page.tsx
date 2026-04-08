import type { Metadata } from "next";
import type { Language } from "@/lib/content";
import CompanyQuiz from "@/components/CompanyQuiz";
import { fetchQuestions } from "@/lib/supabase/questions";
import { toCompanyQuestions, toQuestionIdMap } from "@/lib/supabase/transformQuestions";

export const metadata: Metadata = {
  title: "Company AI Readiness Assessment | Accionables",
  description:
    "35 questions across 7 dimensions to evaluate your organization's AI adoption readiness.",
  robots: { index: false, follow: false },
};

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const initialLanguage: Language | null =
    lang === "en" ? "en" : lang === "es" ? "es" : null;

  const dbQuestions = await fetchQuestions("company");
  const questions = dbQuestions ? toCompanyQuestions(dbQuestions) : undefined;
  const questionIds = dbQuestions ? toQuestionIdMap(dbQuestions) : undefined;

  return (
    <CompanyQuiz
      initialLanguage={initialLanguage}
      dbQuestions={questions}
      questionIds={questionIds}
    />
  );
}
