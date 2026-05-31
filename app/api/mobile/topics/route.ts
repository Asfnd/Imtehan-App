import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("quizzes")
      .select("topic")
      .not("topic", "is", null)
      .order("topic", { ascending: true })
      .limit(500);

    if (error) {
      return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }

    const topics = Array.from(
      new Set(
        (data || [])
          .map((row) => (row.topic || "").trim())
          .filter((topic) => topic.length > 0)
      )
    );

    return NextResponse.json({ topics });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
