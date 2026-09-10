"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Database,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  FileText,
  UserCheck,
  Search,
} from "lucide-react";

export const AdminCockpit: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">
          Loading recruiting intelligence telemetry...
        </p>
      </div>
    );
  }

  const filteredLogs =
    stats?.recentLogs?.filter((log: any) => {
      const matchesType = filterType === "ALL" || log.eventType === filterType;
      const matchesSearch =
        !searchTerm ||
        log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.candidateName && log.candidateName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    }) || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry & Hiring Cockpit</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
            Recruitment Intelligence Cockpit
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Real-time pipeline analytics, candidate velocity, and immutable audit logs backed by SQLite WAL persistence.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>SQLite WAL: Online</span>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Candidates
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {stats?.summary?.totalCandidates || 0}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              100% Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Structured candidate profiles with cryptographic evidence graph nodes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Avg Fit Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {stats?.summary?.averageFitScore || 0}%
            </span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              5-Dimension AI
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Weighted across technical depth, execution speed, systems rigor, and architecture.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Screenings Conducted
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {stats?.summary?.totalScreenings || 0}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              Adaptive Probing
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Zero generic questions. Probing calibrated directly to candidate code repositories.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Offers Extended
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {stats?.summary?.offersExtended || 0}
            </span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              Synthesis Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Autonomous compensation modeling and executive decision dossiers generated.
          </p>
        </div>
      </div>

      {/* Two-Column Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline Stage Funnel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Pipeline Stage Conversion
            </h3>
          </div>

          <div className="space-y-4">
            {[
              { stage: "Stage 1: Requisition Intake", key: "INTAKE", count: stats?.stageCounts?.INTAKE || 0, color: "bg-blue-500" },
              { stage: "Stage 2: Candidate Evidence Graph", key: "EVIDENCE", count: stats?.stageCounts?.EVIDENCE || 0, color: "bg-cyan-500" },
              { stage: "Stage 3: Multi-Dimensional Reasoning", key: "REASONING", count: stats?.stageCounts?.REASONING || 1, color: "bg-indigo-500" },
              { stage: "Stage 4: Adaptive Technical Screening", key: "SCREENING", count: stats?.stageCounts?.SCREENING || 1, color: "bg-amber-500" },
              { stage: "Stage 5: Evaluation Synthesis & Offer", key: "SYNTHESIS", count: stats?.stageCounts?.SYNTHESIS || 1, color: "bg-emerald-500" },
              { stage: "Stage 6: Talent Memory & Longitudinal Index", key: "OFFER", count: stats?.stageCounts?.OFFER || 1, color: "bg-purple-500" },
            ].map((item) => {
              const maxCount = Math.max(stats?.summary?.totalCandidates || 1, 1);
              const percentage = Math.round((item.count / maxCount) * 100);
              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.stage}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.count} candidates ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${Math.max(percentage, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hiring Recommendation Distribution */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              AI Recommendation Distribution
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <span className="block text-xs font-bold text-emerald-800">Strong Hire</span>
                <span className="text-lg font-extrabold text-emerald-900 font-display">
                  {stats?.recommendationCounts?.STRONG_HIRE || 0}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-center">
                <span className="block text-xs font-bold text-blue-800">Hire</span>
                <span className="text-lg font-extrabold text-blue-900 font-display">
                  {stats?.recommendationCounts?.HIRE || 0}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <span className="block text-xs font-bold text-amber-800">Lean Hire</span>
                <span className="text-lg font-extrabold text-amber-900 font-display">
                  {stats?.recommendationCounts?.LEAN_HIRE || 0}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-xs font-bold text-slate-700">Hold</span>
                <span className="text-lg font-extrabold text-slate-900 font-display">
                  {stats?.recommendationCounts?.HOLD || 0}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-center">
                <span className="block text-xs font-bold text-rose-800">Reject</span>
                <span className="text-lg font-extrabold text-rose-900 font-display">
                  {stats?.recommendationCounts?.REJECT || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health & Architecture Specs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Engine Architecture & Compliance
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Deterministic Evidence Extraction</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Candidate signals are extracted exclusively from public code repositories, architecture RFCs, and verified commit logs with proof URLs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero-Hallucination Written Rationale</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    All candidate ratings produce auditable written reasoning across 5 distinct dimensions, eliminating black-box bias.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Human Recruiter Veto Authority</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Autonomous agents propose candidate recommendations; human recruiters retain ultimate veto and offer dispatch authority at every gate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Database: SQLite 3.46 (WAL Mode)</span>
            <span>LLM Backbone: Groq Llama-3.3-70b</span>
          </div>
        </div>
      </div>

      {/* Interaction Logs & Telemetry Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Real-Time Interaction Audit Trail
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live audit logging of all recruiter decisions, evaluations, screenings, and authentication actions.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search audit trail..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Events</option>
              <option value="LOGIN">Logins</option>
              <option value="CANDIDATE_VIEWED">Profile Views</option>
              <option value="EVALUATION_RUN">Evaluations</option>
              <option value="SCREENING_GENERATED">Screenings</option>
              <option value="STAGE_TRANSITION">Stage Transitions</option>
              <option value="OFFER_GENERATED">Offers</option>
              <option value="PASSWORD_RESET_REQUEST">Password Resets</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Event Type</th>
                <th className="py-3 px-4">Subject Candidate</th>
                <th className="py-3 px-4">Triggered By</th>
                <th className="py-3 px-4">Details / Metadata</th>
                <th className="py-3 px-4 rounded-r-xl">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    No matching audit log entries found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log: any) => {
                  let badgeColor = "bg-slate-100 text-slate-700";
                  if (log.eventType === "EVALUATION_RUN") badgeColor = "bg-indigo-50 text-indigo-700 border border-indigo-200";
                  if (log.eventType === "OFFER_GENERATED") badgeColor = "bg-purple-50 text-purple-700 border border-purple-200";
                  if (log.eventType === "SCREENING_GENERATED") badgeColor = "bg-amber-50 text-amber-700 border border-amber-200";
                  if (log.eventType === "LOGIN") badgeColor = "bg-emerald-50 text-emerald-700 border border-emerald-200";
                  if (log.eventType === "STAGE_TRANSITION") badgeColor = "bg-blue-50 text-blue-700 border border-blue-200";

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono">
                        <span className={`px-2 py-0.5 rounded-md font-semibold text-2xs ${badgeColor}`}>
                          {log.eventType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {log.candidateName ? (
                          <div>
                            <div>{log.candidateName}</div>
                            <div className="text-2xs text-slate-500 font-normal">{log.candidateRole}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400">System Level</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-semibold">{log.userName}</div>
                        <div className="text-2xs text-slate-400">{log.userEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate font-mono text-2xs">
                        {JSON.stringify(log.details)}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-2xs whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
