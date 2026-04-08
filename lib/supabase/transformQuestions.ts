import type { DBQuestion } from "./questions";
import type { Question } from "@/lib/content";
import type { CompanyQuestion, DimensionId } from "@/lib/companyAssessment";
import type { RoleQuestion } from "@/lib/roles";

/** DB question → General quiz shape */
export function toGeneralQuestions(dbRows: DBQuestion[]): Question[] {
  return dbRows.map((q) => ({
    level: q.level,
    es: q.statement_es,
    en: q.statement_en,
  }));
}

/** DB question → Company quiz shape */
export function toCompanyQuestions(dbRows: DBQuestion[]): CompanyQuestion[] {
  return dbRows.map((q) => ({
    level: q.level as 0 | 1 | 2 | 3 | 4,
    levelLabel: { en: q.level_label_en, es: q.level_label_es },
    statement: { en: q.statement_en, es: q.statement_es },
    dimension: q.dimension_id as DimensionId,
  }));
}

/** DB question → Role quiz shape */
export function toRoleQuestions(dbRows: DBQuestion[]): RoleQuestion[] {
  return dbRows.map((q) => ({
    level: q.level as 0 | 1 | 2 | 3 | 4,
    levelLabel: { en: q.level_label_en, es: q.level_label_es },
    statement: { en: q.statement_en, es: q.statement_es },
    isNew: q.is_new || undefined,
  }));
}

/** Extract question IDs for submission (maps sort_order → DB id) */
export function toQuestionIdMap(dbRows: DBQuestion[]): number[] {
  return dbRows.map((q) => q.id);
}
