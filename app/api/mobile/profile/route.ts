import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAuthenticatedUserForRoute } from "@/lib/security/request-verification";

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUserForRoute(request);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();

    const [{ data: userRow }, { data: historyRows, error: historyError }] = await Promise.all([
      supabase
        .from("users")
        .select("id, email, total_xp, level, current_streak, longest_streak, total_quizzes")
        .eq("id", authUser.id)
        .maybeSingle(),
      supabase
        .from("quiz_history")
        .select("id, topic, score, total_questions, time_taken, completed_at")
        .eq("user_id", authUser.id)
        .order("completed_at", { ascending: false })
        .limit(20),
    ]);

    if (historyError) {
      return NextResponse.json({ error: "Failed to fetch profile history" }, { status: 500 });
    }

    return NextResponse.json({
      profile: {
        id: authUser.id,
        email: userRow?.email || authUser.email,
        total_xp: userRow?.total_xp ?? 0,
        level: userRow?.level ?? 1,
        current_streak: userRow?.current_streak ?? 0,
        longest_streak: userRow?.longest_streak ?? 0,
        total_quizzes: userRow?.total_quizzes ?? 0,
      },
      history: (historyRows || []).map((item) => ({
        id: item.id,
        topic: item.topic,
        score: item.score,
        total: item.total_questions,
        elapsedSeconds: Math.floor((item.time_taken || 0) / 1000),
        completedAt: item.completed_at,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
