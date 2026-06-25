"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ScrollReveal({ children, className, delay = 0, once = true }: ScrollRevealProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasHydrated(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // If reduced motion is preferred, we bypass observing to save cycles
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // slightly lower threshold to trigger entry earlier
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [once]);

  // SSR: render fully visible (opacity-100).
  // Client: apply scroll-driven visual transitions, unless reduced motion is active.
  const showContent = !hasHydrated || prefersReducedMotion || isVisible;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-800 ease-[cubic-bezier(0.32,0.72,0,1)]",
        showContent ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-xs",
        className
      )}
      style={{ transitionDelay: `${hasHydrated && !prefersReducedMotion ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
}
