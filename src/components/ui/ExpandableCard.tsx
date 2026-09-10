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
  detail?: string;
  sourceContext?: string;
  verifiedProofUrl?: string;
  defaultExpanded?: boolean;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  badge,
  confidence,
  summary,
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
          : 'border-zinc-200/90 hover:border-zinc-300 shadow-2xs'
      }`}
    >
      {/* Compact Card Header */}
      <div className="p-4 sm:p-4.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center space-x-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${badge.color}`}
            >
              <BadgeIcon className="w-3 h-3" />
              <span>{badge.label}</span>
            </span>
            <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{confidence}% Verified</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {verifiedProofUrl && (
              <a
                href={verifiedProofUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-semibold text-zinc-700 hover:text-zinc-950 px-2 py-1 rounded-md bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition-colors"
              >
                <span>Artifact</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            )}

            {sourceContext && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-1 rounded-md text-zinc-400 hover:text-zinc-800 transition-transform duration-200 cursor-pointer ${
                  isExpanded ? 'rotate-180 text-zinc-900 bg-zinc-100' : 'hover:bg-zinc-50'
                }`}
                title={isExpanded ? 'Hide context' : 'Show context'}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-bold text-zinc-950 font-display leading-tight">
            {title}
          </h4>
          <p className="text-xs text-zinc-600 mt-1 leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
      </div>

      {/* Expandable Technical Context (Zero Text Duplication) */}
      <AnimatePresence>
        {isExpanded && sourceContext && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-3.5 pt-0 border-t border-zinc-100 bg-zinc-50/70 text-xs">
              <div className="pt-2.5 flex items-start space-x-2 text-zinc-600 font-mono text-2xs">
                <span className="text-zinc-400 shrink-0 uppercase tracking-wider font-bold">Provenance:</span>
                <span className="text-zinc-700 leading-relaxed font-normal">{sourceContext}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
