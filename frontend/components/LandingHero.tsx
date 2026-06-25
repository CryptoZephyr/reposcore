"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AuditUserModal } from "./AuditUserModal";
import { ScoreDial } from "./ScoreDial";

export function LandingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check user settings for prefers-reduced-motion
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setMounted(true);
      return;
    }

    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-4 md:px-6 lg:px-8 max-w-6xl mx-auto pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(0.72_0.16_165/0.12)_0%,transparent_50%)] pointer-events-none -z-10" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Copy - Left Side */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Hero Eyebrow Badge */}
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${
            mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-xs"
          }`}>
            <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-primary border border-primary/20 bg-primary/5 select-none">
              ON-CHAIN REPUTATION
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-balance transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-200 ${
            mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-xs"
          }`}>
            Developer reputation, verified.
          </h1>
          
          <p className={`text-lg md:text-xl text-foreground/60 max-w-[50ch] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-300 ${
            mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-xs"
          }`}>
            AI-powered trust scores for GitHub developers. On-chain. Permanent.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-400 ${
            mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-xs"
          }`}>
            <AuditUserModal>
              <Button 
                className="bg-primary text-white hover:brightness-110 active:scale-[0.98] px-8 py-6 h-auto text-base font-semibold rounded-xl shadow-lg shadow-primary/20 w-full sm:w-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                Audit a developer
              </Button>
            </AuditUserModal>
            
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium text-foreground/50 hover:text-foreground flex items-center transition-colors group py-2"
            >
              See how it works 
              <ArrowDown className="w-3.5 h-3.5 ml-1.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Product Visual - Right Side */}
        <div className={`lg:col-span-5 relative mt-8 lg:mt-0 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] delay-550 ${
          mounted ? "translate-y-0 opacity-100 scale-100 rotate-1" : "translate-y-12 opacity-0 scale-95 rotate-0"
        }`}>
          <div className="glass-widget rounded-2xl p-8 shadow-[0_20px_40px_oklch(0.72_0.16_165/0.08)] border border-primary/20 bg-card/80 hover:scale-[1.02] hover:rotate-0 hover:shadow-[0_25px_50px_oklch(0.72_0.16_165/0.12)] hover:border-primary/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group select-none">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs font-bold text-foreground">@torvalds</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono font-bold tracking-wider">VERIFIED</span>
            </div>
            
            {/* Animated Score Dial */}
            <div className="mb-8">
              <ScoreDial score={87} size="md" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium italic text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3">
                "Exceptional contributor with deep systems programming expertise."
              </p>
              <div className="flex gap-2">
                {['C', 'Linux', 'Git'].map(lang => (
                  <span 
                    key={lang} 
                    className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors duration-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
