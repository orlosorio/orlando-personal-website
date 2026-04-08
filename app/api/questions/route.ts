import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const type = params.get("type");
    const roleId = params.get("roleId");

    if (!type) {
      return NextResponse.json(
        { error: "Missing 'type' parameter" },
        { status: 400 },
      );
    }

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
      console.error("Questions query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 },
      );
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Questions route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
