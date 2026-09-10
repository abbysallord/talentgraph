import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { recordInteractionLog } from "@/lib/audit";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = forgotSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Return ambiguous message for security, but allow testing
      return NextResponse.json({
        success: true,
        message: "If that email exists, a password reset token has been dispatched.",
      });
    }

    // Invalidate prior unused tokens
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    await recordInteractionLog({
      eventType: "PASSWORD_RESET_REQUEST",
      userId: user.id,
      details: { email: user.email },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link and security token dispatched successfully.",
      resetToken: token, // Exposed for local dev / interactive verification
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to initiate password reset" },
      { status: 500 }
    );
  }
}
