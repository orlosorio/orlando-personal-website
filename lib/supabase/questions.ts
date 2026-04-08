import { getSupabaseServer } from "./server";

/** Shape of a question row as returned from Supabase */
export interface DBQuestion {
  id: number;
  assessment_type_id: string;
  role_id: string | null;
  dimension_id: string | null;
  level: number;
  level_label_en: string;
  level_label_es: string;
  statement_en: string;
  statement_es: string;
  options: { value: number; label_en: string; label_es: string }[];
  sort_order: number;
  is_new: boolean;
  metadata: Record<string, unknown>;
}

/**
 * Fetch questions from Supabase server-side.
 * Returns null if the fetch fails (caller should fall back to TS data).
 */
export async function fetchQuestions(
  type: string,
  roleId?: string,
): Promise<DBQuestion[] | null> {
  try {
    const supabase = getSupabaseServer();

    let query = supabase
      .from("questions")
      .select(
        "id, assessment_type_id, role_id, dimension_id, level, level_label_en, level_label_es, statement_en, statement_es, options, sort_order, is_new, metadata",
      )
      .eq("assessment_type_id", type)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (type === "role" && roleId) {
      query = query.eq("role_id", roleId);
    } else if (type === "general" || type === "company") {
      query = query.is("role_id", null);
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchQuestions error:", error);
      return null;
    }

    return (data as DBQuestion[]) ?? null;
  } catch {
    return null;
  }
}
