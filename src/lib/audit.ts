import prisma from "./prisma";

export type AuditEventType =
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER"
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_RESET_COMPLETE"
  | "CANDIDATE_VIEWED"
  | "EVALUATION_RUN"
  | "SCREENING_GENERATED"
  | "STAGE_TRANSITION"
  | "RECRUITER_OVERRIDE"
  | "OFFER_GENERATED"
  | "REQUISITION_CREATED";

export async function recordInteractionLog(params: {
  eventType: AuditEventType;
  userId?: string | null;
  candidateId?: string | null;
  details?: Record<string, unknown>;
}) {
  try {
    return await prisma.interactionLog.create({
      data: {
        eventType: params.eventType,
        userId: params.userId ?? null,
        candidateId: params.candidateId ?? null,
        details: JSON.stringify(params.details ?? {}),
      },
    });
  } catch (error) {
    console.error("Failed to record interaction log:", error);
    return null;
  }
}
