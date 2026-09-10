import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { recordInteractionLog } from "@/lib/audit";

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        evidenceNodes: true,
        evaluations: true,
        screeningSessions: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ candidates });
  } catch (error: any) {
    console.error("Fetch candidates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { candidateId, stage, status, recruiterNotes } = body;

    if (!candidateId) {
      return NextResponse.json({ error: "candidateId is required" }, { status: 400 });
    }

    const updated = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        ...(stage ? { stage } : {}),
        ...(status ? { status } : {}),
      },
      include: {
        evidenceNodes: true,
        evaluations: true,
        screeningSessions: true,
      },
    });

    await recordInteractionLog({
      eventType: "STAGE_TRANSITION",
      userId: user?.id,
      candidateId,
      details: { newStage: stage, newStatus: status, recruiterNotes },
    });

    return NextResponse.json({ success: true, candidate: updated });
  } catch (error: any) {
    console.error("Update candidate error:", error);
    return NextResponse.json(
      { error: "Failed to update candidate" },
      { status: 500 }
    );
  }
}
