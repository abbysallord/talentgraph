'use client';

import React from 'react';

export interface FunnelStage {
  name: string;
  count: number;
  color: string;
}

interface PipelineFunnelChartProps {
  stages: FunnelStage[];
  className?: string;
}

export const PipelineFunnelChart: React.FC<PipelineFunnelChartProps> = ({
  stages,
  className = '',
}) => {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <div className={`space-y-3.5 ${className}`}>
      {stages.map((stage, idx) => {
        const percentage = Math.round((stage.count / maxCount) * 100);
        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">{stage.name}</span>
              <div className="flex items-center space-x-2 font-mono">
                <span className="font-extrabold text-slate-900">{stage.count} candidates</span>
                <span className="text-slate-400 text-2xs">({percentage}%)</span>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${stage.color}`}
                style={{ width: `${Math.max(percentage, 8)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
