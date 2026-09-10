'use client';

import React from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent bg-[linear-gradient(110deg,#047857,45%,#34d399,55%,#047857)] bg-[length:250%_100%] animate-shine ${className}`}
      style={{
        animation: 'shine 3.5s linear infinite',
      }}
    >
      {children}
    </span>
  );
};
