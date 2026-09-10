'use client';

import React, { useState } from 'react';

export interface RadarDimension {
  axis: string;
  value: number; // 0 - 100
  benchmark?: number; // Role baseline
}

interface RadarChartProps {
  data: RadarDimension[];
  size?: number;
  className?: string;
  candidateName?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 320,
  className = '',
  candidateName = 'Candidate',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const radius = size * 0.38;
  const center = size / 2;
  const numAxes = data.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to convert polar to cartesian
  const getCoordinates = (value: number, index: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Candidate Polygon Path
  const candidatePoints = data
    .map((d, i) => {
      const { x, y } = getCoordinates(d.value, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Role Baseline Polygon Path (optional benchmark)
  const baselinePoints = data
    .map((d, i) => {
      const benchmarkVal = d.benchmark ?? 75;
      const { x, y } = getCoordinates(benchmarkVal, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric Grid Rings */}
          {levels.map((level, lvlIdx) => (
            <polygon
              key={lvlIdx}
              points={data
                .map((_, i) => {
                  const angle = angleSlice * i - Math.PI / 2;
                  const r = radius * level;
                  const x = center + r * Math.cos(angle);
                  const y = center + r * Math.sin(angle);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray={lvlIdx === levels.length - 1 ? 'none' : '2 3'}
            />
          ))}

          {/* Spokes / Axis Lines */}
          {data.map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            );
          })}

          {/* Role Baseline Overlay (Subtle Slate Polygon) */}
          <polygon
            points={baselinePoints}
            fill="rgba(148, 163, 184, 0.12)"
            stroke="#94a3b8"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {/* Candidate Competency Polygon (Vibrant Emerald) */}
          <polygon
            points={candidatePoints}
            fill="rgba(5, 150, 105, 0.22)"
            stroke="#059669"
            strokeWidth={2.5}
            className="transition-all duration-500 ease-out"
          />

          {/* Data Points / Interactive Nodes */}
          {data.map((d, i) => {
            const { x, y } = getCoordinates(d.value, i);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#059669"
                  strokeWidth={2.5}
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {data.map((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const labelRadius = radius + 24;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                dominantBaseline="central"
                className={`text-[11px] font-bold tracking-tight transition-colors ${
                  isHovered ? 'fill-emerald-600 font-extrabold' : 'fill-slate-600 font-medium'
                }`}
              >
                {d.axis} ({d.value}%)
              </text>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Node Hover */}
        {hoveredIndex !== null && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 pointer-events-none z-20 flex items-center space-x-2">
            <span className="font-bold">{data[hoveredIndex].axis}:</span>
            <span className="text-emerald-300 font-mono font-bold">{data[hoveredIndex].value}%</span>
            <span className="text-slate-400 text-2xs">(Benchmark: {data[hoveredIndex].benchmark ?? 75}%)</span>
          </div>
        )}
      </div>

      {/* Chart Legend */}
      <div className="flex items-center space-x-6 mt-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-md bg-emerald-600" />
          <span className="font-bold text-slate-800">{candidateName} Signals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 border-b border-dashed border-slate-400" />
          <span className="text-slate-500 font-medium">Requisition Baseline (75%)</span>
        </div>
      </div>
    </div>
  );
};
