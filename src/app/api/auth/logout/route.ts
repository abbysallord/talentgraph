import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser, AUTH_COOKIE } from "@/lib/auth";
import { recordInteractionLog } from "@/lib/audit";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) {
      await recordInteractionLog({
        eventType: "LOGOUT",
        userId: user.id,
        details: { email: user.email },
      });
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE.name, "", {
      ...AUTH_COOKIE.options,
      maxAge: 0,
    });

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error during logout" },
      { status: 500 }
    );
  }
}
