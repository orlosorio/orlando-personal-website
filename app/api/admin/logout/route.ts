import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  if (token) {
    const supabase = getSupabaseAdmin();
    await supabase.from("admin_sessions").delete().eq("token", token);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
