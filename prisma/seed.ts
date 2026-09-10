import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.interactionLog.deleteMany();
  await prisma.screeningSession.deleteMany();
  await prisma.evaluation.deleteMany();
  await prisma.evidenceNode.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.requisition.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // Create Recruiter / Admin User
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      email: "recruiter@talentgraph.io",
      name: "Sarah Jenkins",
      role: "ADMIN",
      passwordHash,
    },
  });

  console.log("Created user:", user.email);

  // Create Requisition
  const requisition = await prisma.requisition.create({
    data: {
      id: "req-dist-sys-01",
      title: "Founding Distributed Systems & AI Platform Engineer",
      department: "Core Systems Architecture",
      seniority: "Staff / Principal",
      targetCompensation: "$195,000 - $245,000 + 0.75% Equity",
      summary:
        "Architecting our next-generation fault-tolerant distributed inference orchestrator and high-throughput vector ingestion backbone. Requires proven rigor in Raft/Paxos consensus, kernel I/O profiling, and production distributed state machines.",
      skills: JSON.stringify([
        "Go / Rust",
        "Distributed Raft Consensus",
        "Next.js / TypeScript",
        "Kafka / Event Sourcing",
        "Postgres WAL & SQLite Engine",
        "High Concurrency Profiling",
        "gRPC / Protobuf",
        "Kubernetes & eBPF",
      ]),
      competencies: JSON.stringify([
        "Systems Scalability & Sharding",
        "Algorithmic Precision under Load",
        "Empirical Verification & Chaos Testing",
        "Production Failure Diagnostics",
      ]),
      rubric: JSON.stringify({
        technicalDepth: "Deep understanding of lock-free concurrency, memory layouts, and OS syscall limits.",
        executionSpeed: "History of shipping foundational primitives from zero to production within compressed horizons.",
        systemsArchitecture: "Proven ability to decompose complex monolithic pipelines into deterministic distributed graphs.",
        algorithmicRigor: "Mathematical reasoning over time/space complexity, distributed consistency models (CAP/PACELC).",
        communication: "Clear architectural RFC authoring and empathetic cross-functional engineering mentorship.",
      }),
      status: "ACTIVE",
      createdById: user.id,
    },
  });

  console.log("Created requisition:", requisition.title);

  // Candidate 1: Marcus Vance
  const marcus = await prisma.candidate.create({
    data: {
      id: "cand-marcus-01",
      name: "Marcus Vance",
      role: "Staff Distributed Systems Engineer",
      location: "San Francisco, CA (Open to Remote)",
      githubUrl: "https://github.com/marcusvance",
      portfolioUrl: "https://marcusvance.systems",
      rawBio:
        "Ex-Cloudflare, ex-Cockroach Labs. 8+ years designing high-throughput Paxos/Raft consensus engines and LSM-tree storage backends. Authored zero-allocation Go ring buffers and Rust eBPF network telemetry probes.",
      education: "B.S. in Computer Engineering, UC Berkeley (2017)",
      yearsExperience: 8,
      stage: "OFFER",
      status: "ACTIVE",
    },
  });

  await prisma.evidenceNode.createMany({
    data: [
      {
        candidateId: marcus.id,
        category: "SystemArchitecture",
        label: "Raft Consensus Cluster Engine",
        detail: "Implemented leader election and log compaction handling 1.2M writes/sec with p99 latency < 2.4ms under simulated 15% network packet loss.",
        confidence: 96,
        verifiedProofUrl: "https://github.com/marcusvance/raft-core-rs",
      },
      {
        candidateId: marcus.id,
        category: "Codebase",
        label: "Zero-Allocation Ring Buffer",
        detail: "Reduced GC pause cycles by 84% on distributed event pipelines by migrating hot paths to off-heap memory arena buffers.",
        confidence: 94,
        verifiedProofUrl: "https://github.com/marcusvance/go-ringbuffer",
      },
      {
        candidateId: marcus.id,
        category: "ProductionImpact",
        label: "CockroachDB Query Scheduler Contributor",
        detail: "Merged 14 pull requests improving vector execution plan parallelization across multi-region distributed nodes.",
        confidence: 98,
        verifiedProofUrl: "https://github.com/cockroachdb/cockroach/pulls?q=author%3Amarcusvance",
      },
      {
        candidateId: marcus.id,
        category: "Algorithmic",
        label: "Vector Ingestion Pipeline Optimization",
        detail: "Designed SIMD-accelerated cosine similarity search kernels yielding 4.2x throughput over baseline AVX-512 routines.",
        confidence: 91,
        verifiedProofUrl: "https://github.com/marcusvance/simd-vector-ops",
      },
    ],
  });

  await prisma.evaluation.create({
    data: {
      candidateId: marcus.id,
      requisitionId: requisition.id,
      fitScore: 94,
      recommendation: "STRONG_HIRE",
      dimensionScores: JSON.stringify({
        technicalDepth: 96,
        executionSpeed: 91,
        systemsArchitecture: 98,
        algorithmicRigor: 93,
        communication: 90,
      }),
      writtenRationale:
        "Marcus is a rare Tier-1 infrastructure talent with direct open-source verification in distributed consensus engines and zero-allocation memory architectures. His production contributions to multi-region storage systems map 1:1 to our core inference platform objectives. Minimal ramp-up required.",
      strengths: JSON.stringify([
        "Production-proven distributed consensus (Raft/Paxos) authorship",
        "Deep lock-free concurrency and memory arena optimization",
        "Strong systems debugging under simulated network partition conditions",
      ]),
      riskFactors: JSON.stringify([
        "High market competition from tier-1 infrastructure startups; requires competitive equity grant.",
      ]),
    },
  });

  await prisma.screeningSession.create({
    data: {
      candidateId: marcus.id,
      status: "COMPLETED",
      notes: "Exceptional technical clarity during architectural deep-dive. Accurately explained split-brain resolution mechanisms and Jepsen verification tests.",
      questions: JSON.stringify([
        {
          id: "q1",
          concept: "Raft Log Compaction & Snapshotting",
          question: "When taking a snapshot of the state machine in a live cluster, how do you handle incoming write transactions without locking the log reader?",
          rubric: "Expects explanation of copy-on-write (COW) or read-only view isolation and log index boundaries.",
          candidateAnswer: "We utilize memory-mapped copy-on-write snapshotting where the state machine maintains an immutable checkpoint pointer. The raft log continues accepting monotonic entries past the snapshot index without blocking in-flight client RPCs.",
          score: 95,
        },
        {
          id: "q2",
          concept: "Network Partition Split-Brain Mitigation",
          question: "Under an asymmetric network partition where a majority node can receive but not send heartbeats, how does your consensus layer avoid livelock election churn?",
          rubric: "Must cover pre-vote phase before term incrementation to prevent election disruption.",
          candidateAnswer: "We implement the Pre-Vote algorithm (Ongaro thesis). Before initiating a formal election and bumping the cluster term, a candidate node sends speculative PreVote RPCs to confirm quorum connectivity.",
          score: 98,
        },
      ]),
    },
  });

  // Candidate 2: Elena Rostova
  const elena = await prisma.candidate.create({
    data: {
      id: "cand-elena-02",
      name: "Elena Rostova",
      role: "Principal AI & Low-Latency Engineer",
      location: "New York, NY (Hybrid / Remote)",
      githubUrl: "https://github.com/erostova-ai",
      portfolioUrl: "https://elenarostova.dev",
      rawBio:
        "Specialist in GPU inference optimization, vLLM continuous batching kernels, and low-latency C++ trading infrastructure. 7 years experience bridging high-performance systems and modern LLM serving architectures.",
      education: "M.S. in Computer Science, Columbia University (2018)",
      yearsExperience: 7,
      stage: "SYNTHESIS",
      status: "ACTIVE",
    },
  });

  await prisma.evidenceNode.createMany({
    data: [
      {
        candidateId: elena.id,
        category: "SystemArchitecture",
        label: "PagedAttention Kernel Customization",
        detail: "Engineered customized Triton kernels for speculative decoding that slashed time-to-first-token by 38% across 70B parameter models.",
        confidence: 95,
        verifiedProofUrl: "https://github.com/erostova-ai/speculative-kernels",
      },
      {
        candidateId: elena.id,
        category: "ProductionImpact",
        label: "Sub-Millisecond Inference Server",
        detail: "Deployed production model server supporting 45,000 req/sec at p99 < 8ms using CUDA Graph captures and shared memory IPC.",
        confidence: 93,
        verifiedProofUrl: "https://github.com/erostova-ai/cuda-ipc-server",
      },
      {
        candidateId: elena.id,
        category: "Algorithmic",
        label: "Quantization & FP8 Kernel Benchmarking",
        detail: "Implemented custom FP8 matrix multiplication pipelines preserving 99.4% perplexity accuracy while doubling batch density.",
        confidence: 92,
        verifiedProofUrl: "https://github.com/erostova-ai/fp8-benchmark",
      },
    ],
  });

  await prisma.evaluation.create({
    data: {
      candidateId: elena.id,
      requisitionId: requisition.id,
      fitScore: 91,
      recommendation: "STRONG_HIRE",
      dimensionScores: JSON.stringify({
        technicalDepth: 97,
        executionSpeed: 89,
        systemsArchitecture: 91,
        algorithmicRigor: 96,
        communication: 86,
      }),
      writtenRationale:
        "Elena possesses world-class expertise in GPU-accelerated inference serving and low-latency kernel programming. Her background uniquely complements Marcus by addressing the model serving throughput frontier.",
      strengths: JSON.stringify([
        "CUDA, Triton, and C++ inference engine architecture",
        "Deep understanding of KV cache management and continuous batching",
        "Empirically validated latency reduction benchmarks",
      ]),
      riskFactors: JSON.stringify([
        "Prefers pure systems/ML engineering over frontend/fullstack product collaboration.",
      ]),
    },
  });

  // Candidate 3: Priya Sharma
  const priya = await prisma.candidate.create({
    data: {
      id: "cand-priya-03",
      name: "Priya Sharma",
      role: "Staff Platform & Full-Stack Architect",
      location: "Seattle, WA (Remote)",
      githubUrl: "https://github.com/priyasharma-eng",
      portfolioUrl: "https://priyasharma.io",
      rawBio:
        "Staff architect with 9 years of experience leading engineering teams across microservices, Next.js/React enterprise platforms, and event-driven data streaming. Expert in building developer ergonomics and highly reliable web consoles.",
      education: "B.Tech in Computer Science, IIT Bombay (2016)",
      yearsExperience: 9,
      stage: "SCREENING",
      status: "ACTIVE",
    },
  });

  await prisma.evidenceNode.createMany({
    data: [
      {
        candidateId: priya.id,
        category: "SystemArchitecture",
        label: "Enterprise Multi-Tenant Design System",
        detail: "Built component architecture and state caching layer utilized by 120+ internal engineers across 14 decoupled SaaS products.",
        confidence: 94,
        verifiedProofUrl: "https://github.com/priyasharma-eng/tenant-orchestrator",
      },
      {
        candidateId: priya.id,
        category: "ProductionImpact",
        label: "Kafka Stream Ingestion Platform",
        detail: "Architected event-driven ingestion pipeline processing 250M events/day with end-to-end replayability and strict exactly-once semantics.",
        confidence: 90,
        verifiedProofUrl: "https://github.com/priyasharma-eng/kafka-replicator",
      },
    ],
  });

  await prisma.evaluation.create({
    data: {
      candidateId: priya.id,
      requisitionId: requisition.id,
      fitScore: 86,
      recommendation: "HIRE",
      dimensionScores: JSON.stringify({
        technicalDepth: 84,
        executionSpeed: 93,
        systemsArchitecture: 90,
        algorithmicRigor: 81,
        communication: 95,
      }),
      writtenRationale:
        "Priya is an exceptional engineering leader with end-to-end architectural grasp. While her primary focus has been on application platform infrastructure rather than low-level consensus engines, she provides outstanding systems velocity and cross-functional leadership.",
      strengths: JSON.stringify([
        "Flawless engineering communication and system modularity",
        "Broad full-stack expertise spanning high-scale web and streaming brokers",
        "Mentorship track record and design system ownership",
      ]),
      riskFactors: JSON.stringify([
        "Less direct experience with low-level C++/Rust kernel primitives compared to Marcus or Elena.",
      ]),
    },
  });

  // Candidate 4: David Chen
  const david = await prisma.candidate.create({
    data: {
      id: "cand-david-04",
      name: "David Chen",
      role: "Senior ML Infrastructure Engineer",
      location: "Austin, TX (Hybrid)",
      githubUrl: "https://github.com/davidchen-ml",
      portfolioUrl: "https://davidchen.ai",
      rawBio:
        "5 years building Kubernetes orchestration operators for distributed ML training clusters and Ray clusters at scale. Specialized in spot-instance fault tolerance and model checkpointing.",
      education: "B.S. in Computer Science, UT Austin (2020)",
      yearsExperience: 5,
      stage: "REASONING",
      status: "ACTIVE",
    },
  });

  await prisma.evidenceNode.createMany({
    data: [
      {
        candidateId: david.id,
        category: "SystemArchitecture",
        label: "Kubernetes ML Cluster Auto-Scaler",
        detail: "Developed custom CRD controller saving 42% on cloud compute by preempting spot node terminations and snapshotting gradient buffers.",
        confidence: 91,
        verifiedProofUrl: "https://github.com/davidchen-ml/spot-preempt-operator",
      },
    ],
  });

  await prisma.evaluation.create({
    data: {
      candidateId: david.id,
      requisitionId: requisition.id,
      fitScore: 82,
      recommendation: "LEAN_HIRE",
      dimensionScores: JSON.stringify({
        technicalDepth: 83,
        executionSpeed: 87,
        systemsArchitecture: 81,
        algorithmicRigor: 78,
        communication: 82,
      }),
      writtenRationale:
        "Solid Kubernetes and ML orchestration background. Great candidate for operational cluster management, though slightly below the Staff seniority threshold for low-level protocol design.",
      strengths: [
        "Strong hands-on Kubernetes operator design",
        "Cost-optimization mindset in GPU infrastructure",
      ].toString(),
      riskFactors: [
        "Limited experience with custom network protocols and Raft consensus.",
      ].toString(),
    },
  });

  // Seed Interaction Logs for the Analytics Cockpit
  const now = Date.now();
  const oneHour = 3600 * 1000;
  const oneDay = 24 * oneHour;

  await prisma.interactionLog.createMany({
    data: [
      {
        eventType: "LOGIN",
        userId: user.id,
        details: JSON.stringify({ ip: "127.0.0.1", userAgent: "Firefox / Linux x86_64", authMethod: "password" }),
        timestamp: new Date(now - 3 * oneDay),
      },
      {
        eventType: "CANDIDATE_VIEWED",
        userId: user.id,
        candidateId: marcus.id,
        details: JSON.stringify({ tab: "evidence_graph", candidateName: "Marcus Vance" }),
        timestamp: new Date(now - 2 * oneDay - 4 * oneHour),
      },
      {
        eventType: "EVALUATION_RUN",
        userId: user.id,
        candidateId: marcus.id,
        details: JSON.stringify({ fitScore: 94, recommendation: "STRONG_HIRE", engine: "Groq Llama-3.3-70b-versatile" }),
        timestamp: new Date(now - 2 * oneDay - 2 * oneHour),
      },
      {
        eventType: "SCREENING_GENERATED",
        userId: user.id,
        candidateId: marcus.id,
        details: JSON.stringify({ questionCount: 2, targetedConcepts: ["Raft Log Compaction", "Split-Brain Mitigation"] }),
        timestamp: new Date(now - 1 * oneDay - 6 * oneHour),
      },
      {
        eventType: "STAGE_TRANSITION",
        userId: user.id,
        candidateId: marcus.id,
        details: JSON.stringify({ from: "SCREENING", to: "SYNTHESIS", rationale: "Unanimous technical pass on consensus questions" }),
        timestamp: new Date(now - 1 * oneDay - 3 * oneHour),
      },
      {
        eventType: "OFFER_GENERATED",
        userId: user.id,
        candidateId: marcus.id,
        details: JSON.stringify({ baseSalary: 235000, equityPct: 0.85, signOnBonus: 25000, title: "Staff Distributed Systems Engineer" }),
        timestamp: new Date(now - 1 * oneDay),
      },
      {
        eventType: "CANDIDATE_VIEWED",
        userId: user.id,
        candidateId: elena.id,
        details: JSON.stringify({ tab: "evidence_graph", candidateName: "Elena Rostova" }),
        timestamp: new Date(now - 18 * oneHour),
      },
      {
        eventType: "EVALUATION_RUN",
        userId: user.id,
        candidateId: elena.id,
        details: JSON.stringify({ fitScore: 91, recommendation: "STRONG_HIRE", engine: "Groq Llama-3.3-70b-versatile" }),
        timestamp: new Date(now - 12 * oneHour),
      },
      {
        eventType: "STAGE_TRANSITION",
        userId: user.id,
        candidateId: elena.id,
        details: JSON.stringify({ from: "REASONING", to: "SYNTHESIS", rationale: "Outstanding CUDA benchmark proof validated" }),
        timestamp: new Date(now - 8 * oneHour),
      },
      {
        eventType: "CANDIDATE_VIEWED",
        userId: user.id,
        candidateId: priya.id,
        details: JSON.stringify({ tab: "evidence_graph", candidateName: "Priya Sharma" }),
        timestamp: new Date(now - 4 * oneHour),
      },
      {
        eventType: "EVALUATION_RUN",
        userId: user.id,
        candidateId: priya.id,
        details: JSON.stringify({ fitScore: 86, recommendation: "HIRE", engine: "Groq Llama-3.3-70b-versatile" }),
        timestamp: new Date(now - 2 * oneHour),
      },
      {
        eventType: "CANDIDATE_VIEWED",
        userId: user.id,
        candidateId: david.id,
        details: JSON.stringify({ tab: "evidence_graph", candidateName: "David Chen" }),
        timestamp: new Date(now - 30 * 60 * 1000),
      },
    ],
  });

  console.log("Database seeded successfully with 4 candidates, evaluations, and telemetry logs!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
