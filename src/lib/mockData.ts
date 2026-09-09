import { Requisition, CandidateProfile } from './types';

export const initialRequisitions: Requisition[] = [
  {
    id: 'REQ-MINT-01',
    title: 'Forward Deployed Engineer (FDE) — AI Systems & Workflows',
    department: 'Enterprise AI & Automation',
    seniority: 'Mid-Senior / High-Velocity Builder',
    targetCompensation: '₹50,000 / deliverable milestone',
    summary: 'Seeking an autonomous Forward Deployed Engineer capable of taking ambiguous enterprise client requirements and shipping production-grade full-stack AI applications in 10-14 day sprints. Must demonstrate verified evidence of shipping real-world systems, asynchronous backends, and multi-modal integrations.',
    mustHaveSkills: [
      'React.js / Next.js (App Router)',
      'FastAPI / Python (AsyncIO & Background Tasks)',
      'Relational Database Architecture (PostgreSQL / SQLite WAL)',
      'Containerization (Docker / Docker Compose)',
      'LLM Orchestration & Structured Output Engineering',
    ],
    niceToHaveSkills: [
      'Cloudflare Zero Trust / Edge Tunnels',
      'Real-time Audio / Speech-to-Speech (VAD, Neural TTS)',
      'WebSockets & Reverse Proxy Architecture',
      'Computer Vision (OpenCV / Multi-modal)',
    ],
    architecturalCompetencies: [
      'Resilient RESTful API design with low latency (<100ms)',
      'Client-side state caching with offline fallbacks',
      'Clean separation of concerns: routing, auth, business logic, DB',
    ],
    evidenceRubric: [
      { criterion: 'Production Shipped Systems', weight: 35, description: 'Candidate has verifiable live deployments or public repos with real users, not just tutorial clones.' },
      { criterion: 'Systems & Backend Depth', weight: 30, description: 'Deep understanding of concurrency, database locking, WAL mode, and container orchestration.' },
      { criterion: 'AI-Native Integration', weight: 20, description: 'Hands-on experience with LLMs, prompt engineering, structured JSON extraction, and RAG/VAD pipelines.' },
      { criterion: 'Builder Velocity & Ownership', weight: 15, description: 'Proven ability to execute end-to-end features solo under aggressive hackathon or client timelines.' },
    ],
    createdAt: '2026-09-09',
    status: 'active',
  },
  {
    id: 'REQ-MINT-02',
    title: 'AI Voice & Speech Systems Architect',
    department: 'Conversational Intelligence',
    seniority: 'Specialist Engineer',
    targetCompensation: '₹35,000 / milestone',
    summary: 'Architect sub-second latency voice-to-voice agents for student onboarding and learning re-engagement. Experience with PipeWire audio, continuous VAD, in-memory neural TTS, and speech barge-in interruption is essential.',
    mustHaveSkills: [
      'Python 3 & Low-latency Audio Buffering',
      'Voice Activity Detection (Silero / Web VAD)',
      'Neural TTS (Kokoro / KittenTTS / Orpheus)',
      'WebSocket Streaming Architecture',
    ],
    niceToHaveSkills: [
      'Linux PipeWire / ALSA audio routing',
      'Local Speech Server Daemonization (Systemd)',
      'FastAPI & Pydantic Validation',
    ],
    architecturalCompetencies: [
      'Sub-second glass-to-glass latency optimization',
      'Instant cancellation/barge-in when user speaks over audio',
    ],
    evidenceRubric: [
      { criterion: 'Audio Pipeline Latency', weight: 40, description: 'Understands memory-resident model loading and direct buffer streaming.' },
      { criterion: 'Interruption & VAD Tuning', weight: 35, description: 'Zero-lag speech interruption handling.' },
      { criterion: 'System Daemon Reliability', weight: 25, description: 'Production Linux audio service orchestration.' },
    ],
    createdAt: '2026-09-08',
    status: 'active',
  }
];

export const initialCandidates: CandidateProfile[] = [
  {
    id: 'CAND-001',
    name: 'Dhanush Shenoy H',
    role: 'Full-Stack & Systems Engineer',
    location: 'Mangaluru, Karnataka',
    experienceYears: 2,
    education: 'B.Tech CS (AI) — Yenepoya / NIAT (Student of the Year 2026, Campus Rank #1)',
    githubUrl: 'https://github.com/abbysallord',
    portfolioUrl: 'https://www.dshenoyh.in',
    rawBio: 'High-velocity systems builder specializing in React/Next.js frontends, asynchronous FastAPI microservices, and autonomous agents. National Finalist (Top 90 of 75k) at OpenAI Buildathon.',
    evidenceGraph: [
      {
        id: 'EV-01',
        category: 'outcome',
        label: 'OpenAI Buildathon National Finalist',
        detail: 'Selected among Top 90 teams nationwide out of ~75,000 for AgroNova edge-AI diagnosis platform.',
        confidence: 98,
        verifiedProofUrl: 'https://www.agronova.in',
        sourceContext: 'AgroNova (React + FastAPI + OpenCV leaf disease classification with <1.2s inference)',
      },
      {
        id: 'EV-02',
        category: 'architecture',
        label: 'SQLite WAL Mode & Multi-Threaded Crawlers',
        detail: 'Engineered Oppy with concurrent multi-source web crawlers, SQLite Write-Ahead Logging, and local ATS fuzzy skill boundary scoring.',
        confidence: 95,
        verifiedProofUrl: 'https://github.com/abbysallord/oppy',
        sourceContext: 'Oppy CLI (4 GitHub Stars, Rich TUI, Node.js CLI distribution wrapper)',
      },
      {
        id: 'EV-03',
        category: 'skill',
        label: 'AI Container & Cloud Validation',
        detail: 'Built checkDK (checkdk.app) to validate Docker Compose & Kubernetes configurations, parsing YAML AST to intercept port collisions and security risks with LLM diffs.',
        confidence: 92,
        verifiedProofUrl: 'https://checkdk.app',
        sourceContext: 'checkDK (AI Docker Compose validator)',
      },
      {
        id: 'EV-04',
        category: 'architecture',
        label: 'Sub-Second Voice Agent Suite',
        detail: 'Authored jarvis-voice-suite with persistent in-memory KittenTTS synthesis, continuous VAD, speech barge-in interruption, and PipeWire audio routing.',
        confidence: 96,
        verifiedProofUrl: 'https://github.com/abbysallord/jarvis-voice-suite',
        sourceContext: 'Jarvis Voice Suite (Linux PipeWire voice agent for AGY)',
      },
      {
        id: 'EV-05',
        category: 'public_signal',
        label: 'High GitHub Shipping Velocity',
        detail: '50+ public repositories, verified open-source maintainer, live production Vercel & self-hosted deployments.',
        confidence: 90,
        verifiedProofUrl: 'https://github.com/abbysallord',
        sourceContext: 'GitHub Profile abbysallord',
      },
    ],
    rawResumeText: `DHANUSH SHENOY H
Full-Stack & Systems Engineer | B.Tech Computer Science (AI)
Yenepoya School of Engineering & Technology (NIAT) — Student of the Year 2026 (Rank #1)
OpenAI Buildathon National Finalist (Top 90 / 75k)
Stack: React, Next.js, FastAPI, Python, PostgreSQL, SQLite (WAL), Docker, Cloudflare Zero Trust, Linux
Projects: AgroNova (agronova.in), Oppy (4 stars CLI), checkDK (checkdk.app), Jarvis Voice Suite`,
  },
  {
    id: 'CAND-002',
    name: 'Vikramaditya Rao',
    role: 'Senior Backend & Infrastructure Engineer',
    location: 'Bengaluru, Karnataka',
    experienceYears: 5,
    education: 'B.E. Information Technology — RVCE Bengaluru (2021)',
    githubUrl: 'https://github.com/vikram-systems',
    portfolioUrl: 'https://vikramrao.dev',
    rawBio: '5 years building distributed microservices in Go and Rust. Experienced with Kafka, Kubernetes clusters, and multi-region database replication.',
    evidenceGraph: [
      {
        id: 'EV-10',
        category: 'architecture',
        label: 'Distributed Kafka Event Pipeline',
        detail: 'Maintained high-throughput payment settlement pipelines processing 45,000 events/sec with strict idempotency.',
        confidence: 94,
        sourceContext: 'Payment Gateway Infrastructure at FinTech Corp',
      },
      {
        id: 'EV-11',
        category: 'skill',
        label: 'Go & Rust Systems Programming',
        detail: 'Authored custom database proxy in Go to pool PostgreSQL connections and enforce query throttling.',
        confidence: 92,
        sourceContext: 'Postgres Connection Multiplexer',
      },
      {
        id: 'EV-12',
        category: 'public_signal',
        label: 'Weak Frontend & AI Experience',
        detail: 'Limited exposure to React/Next.js and minimal hands-on LLM prompt/workflow orchestration.',
        confidence: 85,
        sourceContext: 'Resume & GitHub audit',
      },
    ],
    rawResumeText: `Vikramaditya Rao
Senior Backend Engineer (5 yrs)
Go, Rust, Kafka, Kubernetes, PostgreSQL, AWS
Strong backend scalability, but zero frontend UI experience and minimal LLM integration.`,
  },
  {
    id: 'CAND-003',
    name: 'Aarav Mehta',
    role: 'Junior Frontend Developer',
    location: 'Pune, Maharashtra',
    experienceYears: 0.5,
    education: 'B.Sc Computer Science — Pune University (2025)',
    githubUrl: 'https://github.com/aarav-coder',
    rawBio: 'Recent graduate passionate about web design and frontend components. Completed bootcamp courses on React and JavaScript.',
    evidenceGraph: [
      {
        id: 'EV-20',
        category: 'skill',
        label: 'Basic React & CSS Components',
        detail: 'Built basic responsive calculator, weather app, and static landing page clones from tutorial courses.',
        confidence: 60,
        sourceContext: 'Bootcamp portfolio repos',
      },
      {
        id: 'EV-21',
        category: 'outcome',
        label: 'Zero Production Deployments',
        detail: 'No verifiable live users, zero backend architecture (FastAPI/Node), and no database or container experience.',
        confidence: 90,
        sourceContext: 'GitHub Audit (no production backends)',
      },
    ],
    rawResumeText: `Aarav Mehta
Junior Frontend Dev
HTML, CSS, React basics, JavaScript
Looking for junior trainee role. No backend experience.`,
  }
];
