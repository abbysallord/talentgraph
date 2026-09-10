'use client';

import React from 'react';

interface DotBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const DotBackground: React.FC<DotBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-[#F8FAFC] ${className}`}>
      {/* Dot Grid Layer */}
      <div 
        className="absolute inset-0 pointer-events-none [background-size:24px_24px] [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" 
      />
      {/* Subtle Indigo Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
