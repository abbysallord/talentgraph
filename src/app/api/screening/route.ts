import { NextResponse } from 'next/server';
import { askLLMJson } from '@/lib/groq';
import { CandidateProfile, Requisition, AdaptiveQuestion } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { candidate, requisition }: { candidate: CandidateProfile; requisition: Requisition } = await req.json();

    const systemPrompt = `You are an elite Forward Deployed Engineering Technical Interviewer.
Your task is to generate 3 deeply specific, adaptive technical interview questions for a candidate.
RULES:
1. NEVER ask generic LeetCode/textbook trivia (e.g. "What is a closure?", "How does virtual DOM work?").
2. TARGET the candidate's declared projects and architectural claims directly.
3. PROBE edge-cases, failure modes, trade-offs, and true authorship.
Respond in JSON with the exact following schema:
{
  "questions": [
    {
      "id": "Q-01",
      "projectTargeted": "Name of Candidate Project",
      "technicalConcept": "Concept being probed (e.g., SQLite WAL vs Concurrency)",
      "questionText": "In-depth, direct technical question asking how they solved a concrete problem in that project.",
      "probingRationale": "Why this question tests true authorship and architectural mastery.",
      "evaluationRubric": {
        "poor": "Signs of a superficial or tutorial-level answer",
        "acceptable": "Understands the basic mechanics",
        "exceptional": "Explains edge cases, memory trade-offs, and production failure modes"
      }
    }
  ]
}`;

    const userPrompt = `Candidate Evidence Graph:
${JSON.stringify(candidate.evidenceGraph, null, 2)}

Target Role Requisition:
Title: ${requisition.title}
Must-Haves: ${requisition.mustHaveSkills.join(', ')}
Architectural Competencies: ${requisition.architecturalCompetencies.join(', ')}`;

    const fallback = {
      questions: [
        {
          id: 'Q-01',
          projectTargeted: candidate.evidenceGraph[0]?.sourceContext || 'Featured Project',
          technicalConcept: 'State Synchronization & Latency Optimization',
          questionText: `In your project (${candidate.evidenceGraph[0]?.label}), how did you manage client-side state latency during high-frequency network spikes, and what fallback mechanisms were implemented?`,
          probingRationale: 'Evaluates whether the candidate truly built the caching layer or used an off-the-shelf tutorial.',
          evaluationRubric: {
            poor: 'Gives textbook definition without discussing actual code implementation.',
            acceptable: 'Explains basic try/catch or polling mechanisms.',
            exceptional: 'Discusses optimistic updates, offline SQLite caching, and exponential backoff.'
          }
        },
        {
          id: 'Q-02',
          projectTargeted: candidate.evidenceGraph[1]?.sourceContext || 'Backend Microservice',
          technicalConcept: 'Database Locking & Concurrency Control',
          questionText: `When multiple workers write simultaneously to your datastore, how did you prevent database lock contention and ensure idempotent transaction commits?`,
          probingRationale: 'Tests understanding of ACID properties, WAL mode, and connection pool exhaustion.',
          evaluationRubric: {
            poor: 'Unaware of write locks or claims SQLite handles unlimited parallel writes.',
            acceptable: 'Mentions database transactions or single-writer queues.',
            exceptional: 'Details Write-Ahead Logging (WAL), connection timeout tuning, and retry decorators.'
          }
        },
        {
          id: 'Q-03',
          projectTargeted: 'Containerization & Cloud Edge',
          technicalConcept: 'Container Security & Zero-Downtime Networking',
          questionText: `How did you configure your reverse proxy and ingress tunnels to route incoming traffic securely without exposing internal service ports to the public internet?`,
          probingRationale: 'Validates real cloud/edge infrastructure security mindset.',
          evaluationRubric: {
            poor: 'Confuses port forwarding with encrypted tunnels.',
            acceptable: 'Explains basic Nginx or Docker port mapping.',
            exceptional: 'Articulates Cloudflare Zero Trust tunnel architecture, service token authentication, and Docker network isolation.'
          }
        }
      ]
    };

    const result = await askLLMJson<{ questions: AdaptiveQuestion[] }>(systemPrompt, userPrompt, fallback);

    return NextResponse.json(result.questions || fallback.questions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
