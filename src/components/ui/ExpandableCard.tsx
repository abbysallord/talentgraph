'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ExpandableCardProps {
  title: string;
  badge: {
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  confidence: number;
  summary: string;
  detail: string;
  sourceContext?: string;
  verifiedProofUrl?: string;
  defaultExpanded?: boolean;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  badge,
  confidence,
  summary,
  detail,
  sourceContext,
  verifiedProofUrl,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const BadgeIcon = badge.icon;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
        isExpanded
          ? 'border-zinc-900 shadow-sm'
          : 'border-zinc-200 hover:border-zinc-300 shadow-2xs'
      }`}
    >
      {/* Clickable Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none"
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${badge.color}`}
            >
              <BadgeIcon className="w-3 h-3" />
              <span>{badge.label}</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {confidence}% Confidence
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-900 font-display leading-snug">
            {title}
          </h4>
          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>

        <div
          className={`p-1.5 rounded-lg bg-zinc-50 text-zinc-400 transition-transform duration-200 shrink-0 ${
            isExpanded ? 'rotate-180 text-zinc-900 bg-zinc-100' : ''
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-zinc-100 space-y-3 bg-zinc-50/50 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 leading-relaxed font-medium">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Architectural Proof &amp; Verification Rationale:
                </span>
                {detail}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                {sourceContext && (
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Artifact: {sourceContext}
                  </span>
                )}
                {verifiedProofUrl && (
                  <a
                    href={verifiedProofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 font-bold text-emerald-600 hover:text-emerald-800 transition-colors ml-auto text-xs"
                  >
                    <span>Inspect Public Artifact</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
