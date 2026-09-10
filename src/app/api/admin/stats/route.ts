import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCandidates,
      totalEvaluations,
      totalScreenings,
      candidates,
      evaluations,
      recentLogs,
      usersCount,
    ] = await Promise.all([
      prisma.candidate.count(),
      prisma.evaluation.count(),
      prisma.screeningSession.count(),
      prisma.candidate.findMany({
        select: { id: true, name: true, role: true, stage: true, status: true },
      }),
      prisma.evaluation.findMany({
        select: { fitScore: true, recommendation: true },
      }),
      prisma.interactionLog.findMany({
        take: 30,
        orderBy: { timestamp: "desc" },
        include: {
          user: { select: { name: true, email: true, role: true } },
          candidate: { select: { name: true, role: true } },
        },
      }),
      prisma.user.count(),
    ]);

    // Calculate stage distribution
    const stageCounts: Record<string, number> = {
      INTAKE: 0,
      EVIDENCE: 0,
      REASONING: 0,
      SCREENING: 0,
      SYNTHESIS: 0,
      OFFER: 0,
    };

    candidates.forEach((c) => {
      stageCounts[c.stage] = (stageCounts[c.stage] || 0) + 1;
    });

    // Calculate recommendation distribution & average fit score
    const recommendationCounts: Record<string, number> = {
      STRONG_HIRE: 0,
      HIRE: 0,
      LEAN_HIRE: 0,
      HOLD: 0,
      REJECT: 0,
    };

    let totalScore = 0;
    evaluations.forEach((e) => {
      totalScore += e.fitScore;
      recommendationCounts[e.recommendation] =
        (recommendationCounts[e.recommendation] || 0) + 1;
    });

    const averageFitScore =
      evaluations.length > 0 ? Math.round(totalScore / evaluations.length) : 0;

    return NextResponse.json({
      summary: {
        totalCandidates,
        totalEvaluations,
        totalScreenings,
        offersExtended: stageCounts["OFFER"] || 1,
        averageFitScore,
        activeRequisitions: 1,
        teamMembers: usersCount,
      },
      stageCounts,
      recommendationCounts,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        eventType: log.eventType,
        timestamp: log.timestamp,
        userName: log.user?.name || "Autonomous Pipeline",
        userEmail: log.user?.email || "system@talentgraph.io",
        candidateName: log.candidate?.name || null,
        candidateRole: log.candidate?.role || null,
        details: JSON.parse(log.details || "{}"),
      })),
    });
  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics statistics" },
      { status: 500 }
    );
  }
}
