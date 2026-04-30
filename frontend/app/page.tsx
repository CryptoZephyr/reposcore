"use client";

import { useState, useMemo } from "react"; // Added useMemo
import { Navbar } from "@/components/Navbar";
import { EvaluationsTable } from "@/components/EvaluationsTable";
import { useEvaluations } from "@/lib/hooks/useRepoScore";

export default function HomePage() {
  const { data: evaluations, isLoading } = useEvaluations();
  const [activeUsername, setActiveUsername] = useState<string | null>(null);

  // PERFORMANCE FIX: Memoize the search for the audit data so it doesn't run on every typing stroke
  const displayAudit = useMemo(() => {
    if (activeUsername && evaluations?.[activeUsername]) {
      return evaluations[activeUsername];
    }
    return null;
  }, [evaluations, activeUsername]);

  // PERFORMANCE FIX: Memoize the gauge offset calculation
  const dashOffset = useMemo(() => {
    const score = Number(displayAudit?.trust_score || 0);
    return 704 - (704 * score) / 100;
  }, [displayAudit?.trust_score]);

  const getActiveBars = (level: string) => {
    if (level === "high") return 8;
    if (level === "medium") return 5;
    return 2;
  };

  const languages = useMemo(() => {
    return displayAudit?.top_languages 
      ? displayAudit.top_languages.split(", ") 
      : ["N/A"];
  }, [displayAudit?.top_languages]);

  return (
    <div className="min-h-screen flex flex-col relative bg-background overflow-x-hidden">
      {/* PERFORMANCE FIX: Reduced blur to 60px to stop main-thread violations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[60px] pointer-events-none" />

      <Navbar onAuditTriggered={(name) => setActiveUsername(name)} />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* 1. MAIN DIAL WIDGET */}
            <div className="lg:col-span-7 glass-widget p-8 rounded-2xl dial-container min-h-[480px] flex flex-col items-center justify-center relative">
              <div className="absolute top-4 left-6 text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase opacity-40">
                {displayAudit ? `Profile: @${displayAudit.username}` : 'No Audit Data'}
              </div>
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_oklch(0.65_0.22_300/0.3)]">
                  <circle cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-white/5" />
                  <circle 
                    cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="14" fill="transparent" 
                    strokeDasharray="704" 
                    style={{ strokeDashoffset: dashOffset }}
                    strokeLinecap="round" 
                    className="text-primary transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-tighter uppercase mb-1">Trust Score</span>
                  <span className="text-8xl font-black font-mono tracking-tighter text-neon">
                    {displayAudit?.trust_score ? Number(displayAudit.trust_score) : '--'}
                  </span>
                  {displayAudit && (
                    <div className="mt-2 px-3 py-1 rounded-full border border-verified-teal/30 bg-verified-teal/10 text-verified-teal text-[10px] font-black uppercase tracking-[0.1em]">Verified</div>
                  )}
                </div>
              </div>

              <div className="mt-10 text-center space-y-1">
                <div className="text-xs font-mono tracking-[0.4em] uppercase text-primary animate-pulse">
                  {isLoading ? 'Establishing Quorum...' : 'System_Ready'}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {/* 2. CONSISTENCY WIDGET */}
              <div className="glass-widget p-6 rounded-2xl relative min-h-[227px]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1 opacity-50">Consistency</div>
                    <div className={`text-lg font-black font-mono tracking-tight uppercase ${
                       displayAudit?.consistency === 'high' ? 'text-matrix-green' : 'text-yellow-500'
                    }`}>
                        {displayAudit?.consistency || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-2 h-20 mb-4">
                  {[40, 55, 30, 80, 70, 95, 85, 100].map((h, i) => (
                    <div 
                        key={i} 
                        className={`bar-segment ${i < getActiveBars(displayAudit?.consistency || "") ? 'bar-segment-active' : ''}`} 
                        style={{ height: `${h}%` }} 
                    />
                  ))}
                </div>
              </div>

              {/* 3. COMMUNITY IMPACT */}
              <div className="glass-widget p-6 rounded-2xl relative min-h-[227px] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase opacity-50">Community Impact</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="w-16 h-16 text-verified-teal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-7xl font-black font-mono tracking-tighter text-verified-teal leading-none">
                        {displayAudit?.community_impact ? Number(displayAudit.community_impact) : '00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. TECH STACK */}
            <div className="lg:col-span-4 glass-widget p-6 rounded-2xl relative">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-5 opacity-50">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang: string) => (
                  <span key={lang} className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black font-mono tracking-[0.1em] text-primary uppercase">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. THE VERDICT */}
            <div className="lg:col-span-8 glass-widget p-6 rounded-2xl relative min-h-[120px] flex flex-col justify-center">
              <div className="absolute top-4 left-6 text-[10px] font-mono text-muted-foreground tracking-widest uppercase opacity-50">AI Verdict</div>
              <blockquote className="mt-4">
                <p className="text-xl md:text-2xl font-serif italic font-medium leading-tight text-foreground/90 tracking-tight">
                  &quot;{displayAudit?.verdict || 'Awaiting first target selection for on-chain evaluation...'}&quot;
                </p>
              </blockquote>
            </div>

            {/* 6. TECHNICAL LEADERBOARD */}
            <div className="lg:col-span-12 mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary" />
                <h2 className="text-[11px] font-mono font-bold tracking-[0.4em] uppercase text-muted-foreground">Technical Leaderboard</h2>
              </div>
              <EvaluationsTable />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}