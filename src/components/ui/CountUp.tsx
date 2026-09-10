'use client';

import React, { useEffect, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(from + (to - from) * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(to);
      }
    };

    window.requestAnimationFrame(step);
  }, [to, from, duration]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
};
