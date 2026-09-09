export interface Requisition {
  id: string;
  title: string;
  department: string;
  seniority: string;
  targetCompensation: string;
  summary: string;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  architecturalCompetencies: string[];
  evidenceRubric: {
    criterion: string;
    weight: number;
    description: string;
  }[];
  createdAt: string;
  status: 'draft' | 'active' | 'closed';
}

export interface EvidenceNode {
  id: string;
  category: 'skill' | 'architecture' | 'outcome' | 'public_signal';
  label: string;
  detail: string;
  confidence: number; // 0 - 100
  verifiedProofUrl?: string;
  sourceContext: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  experienceYears: number;
  education: string;
  githubUrl: string;
  portfolioUrl?: string;
  rawBio: string;
  evidenceGraph: EvidenceNode[];
  rawResumeText: string;
}

export interface EvaluationRationale {
  candidateId: string;
  requisitionId: string;
  overallFitScore: number; // 0 - 100
  dimensionScores: {
    coreSkills: number;
    architecturalDepth: number;
    productionVelocity: number;
    domainProblemSolving: number;
  };
  writtenRationale: string;
  verifiedStrengths: string[];
  criticalGaps: string[];
  interviewWatchouts: string[];
  evaluatedAt: string;
}

export interface AdaptiveQuestion {
  id: string;
  projectTargeted: string;
  technicalConcept: string;
  questionText: string;
  probingRationale: string;
  evaluationRubric: {
    poor: string;
    acceptable: string;
    exceptional: string;
  };
}

export interface InterviewSynthesis {
  candidateId: string;
  requisitionId: string;
  overallScore: number;
  recommendation: 'STRONG_HIRE' | 'HIRE' | 'RE_EVALUATE' | 'REJECT';
  executiveSummary: string;
  dimensionBreakdown: {
    technicalExecution: number;
    systemArchitecture: number;
    communicationClarity: number;
    builderOwnership: number;
  };
  recruiterSignoff: {
    approved: boolean;
    reviewerNotes: string;
    timestamp?: string;
  };
}
