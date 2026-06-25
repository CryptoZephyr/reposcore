"use client";

import { useState, useEffect, useRef } from "react";

interface ScoreDialProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function ScoreDial({ score, size = "md", label = "SCORE" }: ScoreDialProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // SVG circle calculations
  const radius = 112;
  const circumference = 2 * Math.PI * radius; // ~703.717

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setCurrentScore(score);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTimestamp: number | null = null;
          const duration = 1200; // 1.2s count up

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing out quad
            const easedProgress = progress * (2 - progress);
            
            setCurrentScore(Math.floor(easedProgress * score));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCurrentScore(score);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [score, hasAnimated]);

  // Circumference calculations for dash offset
  const targetOffset = circumference * (1 - (hasAnimated ? score : 0) / 100);

  const sizeClasses = {
    sm: { container: "w-32 h-32", text: "text-3xl", labelText: "text-[8px]", badgeText: "text-[8px]" },
    md: { container: "w-48 h-48", text: "text-6xl", labelText: "text-[10px]", badgeText: "text-[9px]" },
    lg: { container: "w-64 h-64", text: "text-[72px]", labelText: "text-[10px]", badgeText: "text-[10px]" },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      ref={ref}
      className={`relative ${currentSize.container} mx-auto flex items-center justify-center`}
      role="img"
      aria-label={`Circular progress dial displaying RepoScore of ${score}`}
    >
      <svg className="w-full h-full -rotate-90" viewBox="0 0 256 256">
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${currentSize.labelText} font-mono text-muted-foreground tracking-widest uppercase mb-1`}>
          {label}
        </span>
        <span className={`${currentSize.text} font-black font-mono tracking-tighter text-white leading-none`}>
          {currentScore}
        </span>
        {size === "lg" && (
          <div className="mt-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono font-bold tracking-[0.1em] transition-all duration-500 delay-500 opacity-100">
            VERIFIED
          </div>
        )}
      </div>
    </div>
  );
}
