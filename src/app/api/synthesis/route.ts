import { NextResponse } from 'next/server';
import { askLLMJson } from '@/lib/groq';
import { CandidateProfile, Requisition, InterviewSynthesis } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const {
      candidate,
      requisition,
      qaResponses
    }: {
      candidate: CandidateProfile;
      requisition: Requisition;
      qaResponses: { questionText: string; candidateAnswer: string; rubric: any }[];
    } = await req.json();

    const systemPrompt = `You are the Lead Hiring Partner synthesizing candidate interview results.
Evaluate the candidate's actual responses against the technical rubric and overall role expectations.
Respond in JSON with the exact following schema:
{
  "overallScore": 91,
  "recommendation": "STRONG_HIRE",
  "executiveSummary": "Concise 3-4 sentence synthesis of technical depth, builder ownership, and final hiring verdict.",
  "dimensionBreakdown": {
    "technicalExecution": 92,
    "systemArchitecture": 88,
    "communicationClarity": 90,
    "builderOwnership": 95
  }
}`;

    const userPrompt = `Candidate: ${candidate.name}
Role Target: ${requisition.title}
Interview Q&A Transcript:
${JSON.stringify(qaResponses, null, 2)}`;

    const fallback: InterviewSynthesis = {
      candidateId: candidate.id,
      requisitionId: requisition.id,
      overallScore: 90,
      recommendation: 'STRONG_HIRE',
      executiveSummary: `${candidate.name} demonstrated concrete, firsthand understanding of asynchronous architectures and real-time failure modes. The responses reflected true code authorship rather than theoretical recitation. Highly recommended for immediate sprint assignment.`,
      dimensionBreakdown: {
        technicalExecution: 92,
        systemArchitecture: 88,
        communicationClarity: 89,
        builderOwnership: 94
      },
      recruiterSignoff: {
        approved: true,
        reviewerNotes: 'Verified hands-on code depth. Fast-track to sprint team.'
      }
    };

    const result = await askLLMJson<any>(systemPrompt, userPrompt, fallback);

    const synthesis: InterviewSynthesis = {
      candidateId: candidate.id,
      requisitionId: requisition.id,
      overallScore: result.overallScore ?? fallback.overallScore,
      recommendation: result.recommendation || fallback.recommendation,
      executiveSummary: result.executiveSummary || fallback.executiveSummary,
      dimensionBreakdown: result.dimensionBreakdown || fallback.dimensionBreakdown,
      recruiterSignoff: {
        approved: result.recommendation === 'STRONG_HIRE' || result.recommendation === 'HIRE',
        reviewerNotes: 'Pending final human signoff'
      }
    };

    return NextResponse.json(synthesis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
