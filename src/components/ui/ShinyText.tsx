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
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent bg-[linear-gradient(110deg,#4338ca,45%,#818cf8,55%,#4338ca)] bg-[length:250%_100%] animate-shine ${className}`}
      style={{
        animation: 'shine 3.5s linear infinite',
      }}
    >
      {children}
    </span>
  );
};
