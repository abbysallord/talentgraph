import { NextResponse } from 'next/server';
import { askLLMJson } from '@/lib/groq';
import { Requisition } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `You are an elite Forward Deployed Engineering Recruiter and Requisition Architect.
Your job is to transform conversational hiring needs into a rigorous, calibrated technical job requisition.
You prioritize verifiable proof of work, architectural depth, and real shipping velocity over pedigree.
Respond in JSON with the exact following schema:
{
  "title": "Clear Technical Title",
  "department": "Engineering Department",
  "seniority": "Seniority Level",
  "targetCompensation": "Estimated compensation or milestone rate",
  "summary": "2-3 sentence executive role summary focusing on deliverables",
  "mustHaveSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "niceToHaveSkills": ["skill1", "skill2", "skill3"],
  "architecturalCompetencies": ["comp1", "comp2", "comp3"],
  "evidenceRubric": [
    { "criterion": "Criterion Name", "weight": 35, "description": "Specific evidence expectations" },
    { "criterion": "Criterion Name", "weight": 30, "description": "Specific evidence expectations" },
    { "criterion": "Criterion Name", "weight": 20, "description": "Specific evidence expectations" },
    { "criterion": "Criterion Name", "weight": 15, "description": "Specific evidence expectations" }
  ]
}`;

    const userPrompt = `Generate a calibrated job requisition based on this manager request: "${prompt}"`;

    const fallback: Partial<Requisition> = {
      title: 'Full-Stack Systems Engineer',
      department: 'Platform Architecture',
      seniority: 'Mid-Senior Builder',
      targetCompensation: '₹50,000 / milestone',
      summary: 'Autonomous engineer tasked with delivering end-to-end full-stack systems and high-throughput backends under sprint deadlines.',
      mustHaveSkills: ['React.js', 'FastAPI', 'PostgreSQL', 'Docker'],
      niceToHaveSkills: ['Cloudflare Tunnels', 'Redis', 'WebSockets'],
      architecturalCompetencies: ['Low-latency REST APIs', 'ACID transactions', 'Decoupled services'],
      evidenceRubric: [
        { criterion: 'Shipped Systems', weight: 40, description: 'Verifiable production deployments' },
        { criterion: 'Backend Reliability', weight: 35, description: 'PostgreSQL and FastAPI concurrency' },
        { criterion: 'Velocity', weight: 25, description: 'Independent execution capability' }
      ]
    };

    const result = await askLLMJson<any>(systemPrompt, userPrompt, fallback);

    const fullRequisition: Requisition = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      title: result.title || fallback.title!,
      department: result.department || fallback.department!,
      seniority: result.seniority || fallback.seniority!,
      targetCompensation: result.targetCompensation || fallback.targetCompensation!,
      summary: result.summary || fallback.summary!,
      mustHaveSkills: result.mustHaveSkills || fallback.mustHaveSkills!,
      niceToHaveSkills: result.niceToHaveSkills || fallback.niceToHaveSkills!,
      architecturalCompetencies: result.architecturalCompetencies || fallback.architecturalCompetencies!,
      evidenceRubric: result.evidenceRubric || fallback.evidenceRubric!,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    return NextResponse.json(fullRequisition);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
