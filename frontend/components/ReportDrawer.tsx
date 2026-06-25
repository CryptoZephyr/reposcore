"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { 
  X, 
  ShieldCheck, 
  Github, 
  Cpu, 
  Award, 
  Zap, 
  BarChart3, 
  Brain, 
  Code2, 
  AlertCircle, 
  RefreshCw, 
  Database,
  ExternalLink
} from "lucide-react";
import { useUserScore } from "@/lib/hooks/useRepoScore";
import { ScoreDial } from "./ScoreDial";
import { Button } from "./ui/button";

interface ReportDrawerProps {
  username: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportDrawer({ username, isOpen, onClose }: ReportDrawerProps) {
  // Query blockchain data for target username
  const { data: scoreRecord, isLoading, isError, refetch } = useUserScore(username);

  // Parse fields safely (handling nested MAP structures if returned from GenLayer client)
  const record = React.useMemo(() => {
    if (!scoreRecord) return null;
    let rec: any = scoreRecord;
    if (scoreRecord instanceof Map) {
      rec = Object.fromEntries(scoreRecord);
    }
    // Deep map normalization
    const normalized: any = {};
    for (const key of Object.keys(rec)) {
      const val = rec[key];
      normalized[key] = val instanceof Map ? Object.fromEntries(val) : val;
    }
    return normalized;
  }, [scoreRecord]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Overlay with smooth fade animation */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100" 
        />
        
        {/* Drawer content sliding in from right */}
        <DialogPrimitive.Content 
          className="fixed inset-y-0 right-0 z-50 h-full w-full max-w-md md:max-w-xl border-l border-white/10 bg-[oklch(0.09_0.005_240/0.95)] backdrop-blur-3xl shadow-2xl transition-transform duration-300 ease-in-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 outline-none flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 select-none shrink-0">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-primary drop-shadow-[0_0_8px_oklch(0.72_0.16_165/0.3)]" />
              <DialogPrimitive.Title className="text-sm font-mono font-bold uppercase tracking-widest text-foreground">
                Audit Report
              </DialogPrimitive.Title>
            </div>
            
            <DialogPrimitive.Close className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95 transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary">
              <X className="w-4 h-4" />
              <span className="sr-only">Close Report</span>
            </DialogPrimitive.Close>
          </div>

          {/* Scrollable Container */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
            
            {/* Loading State */}
            {isLoading && (
              <div className="space-y-8 py-4 animate-pulse">
                {/* Score Dial Skeleton */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-44 h-44 rounded-full border-8 border-white/5 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/5" />
                  </div>
                  <div className="h-4 w-32 bg-white/10 rounded-sm" />
                </div>
                
                {/* Verdict Section Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-white/10 rounded-sm" />
                  <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl space-y-2.5">
                    <div className="h-4 w-full bg-white/10 rounded-sm" />
                    <div className="h-4 w-5/6 bg-white/10 rounded-sm" />
                    <div className="h-4 w-2/3 bg-white/10 rounded-sm" />
                  </div>
                </div>

                {/* Score Breakdown Skeleton */}
                <div className="space-y-4">
                  <div className="h-3 w-28 bg-white/10 rounded-sm" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xl h-24" />
                    <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xl h-24" />
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="py-12 text-center space-y-6">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto opacity-70" />
                <div className="space-y-2">
                  <h3 className="text-base font-mono font-bold uppercase tracking-widest text-destructive">Fetch Failed</h3>
                  <p className="text-sm text-muted-foreground max-w-[32ch] mx-auto">
                    Could not query contract details for @{username} from GenLayer Studionet.
                  </p>
                </div>
                <Button 
                  onClick={() => refetch()} 
                  variant="outline" 
                  className="mx-auto flex items-center gap-2 border-white/10 hover:bg-white/5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Query
                </Button>
              </div>
            )}

            {/* Empty State (Data not populated) */}
            {!isLoading && !isError && (!record || !record.username) && (
              <div className="py-16 text-center space-y-6">
                <Database className="w-12 h-12 text-muted-foreground mx-auto opacity-40" />
                <div className="space-y-2">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Report Not Found</h3>
                  <p className="text-xs text-muted-foreground/60 max-w-[34ch] mx-auto">
                    The requested audit details for @{username} are missing or indexing is delayed.
                  </p>
                </div>
              </div>
            )}

            {/* Content loaded successfully */}
            {!isLoading && !isError && record && record.username && (
              <div className="space-y-8 animate-fade-in-up">
                
                {/* Developer Profile Info card */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Github className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black font-mono text-foreground leading-tight">@{record.username}</h4>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Verified Contributor</p>
                    </div>
                  </div>
                  <a 
                    href={`https://github.com/${record.username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-white/5 hover:border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    title="View GitHub profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Score Dial Wrapper */}
                <div className="py-4 select-none">
                  <ScoreDial score={Number(record.trust_score)} size="md" />
                </div>

                {/* Consensus Reasoning */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-primary/60" />
                    Consensus Verdict
                  </h4>
                  <div className="p-5 rounded-2xl border border-primary/20 bg-primary/[0.01] shadow-[inset_0_1px_1px_oklch(1_0_0/0.03)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,oklch(0.72_0.16_165/0.05)_0%,transparent_70%)] pointer-events-none" />
                    <p className="text-sm font-medium leading-relaxed italic text-foreground/90 pl-3 border-l-2 border-primary">
                      "{record.verdict || "No verdict description was recorded on-chain."}"
                    </p>
                  </div>
                </div>

                {/* Trust and Performance Metrics */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-primary/60" />
                    Trust Metrics
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Contribution Score */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Contribution Quality</span>
                        <span className="text-2xl font-black font-mono text-foreground block mt-1">{record.contribution_score || 0}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_oklch(0.72_0.16_165/0.4)]"
                          style={{ width: `${record.contribution_score || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Community Impact */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Community Impact</span>
                        <span className="text-2xl font-black font-mono text-foreground block mt-1">{record.community_impact || 0}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_oklch(0.72_0.16_165/0.4)]"
                          style={{ width: `${record.community_impact || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consistency Breakdown */}
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary/60" />
                      Consistency Rating
                    </h5>
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border ${
                      String(record.consistency).toLowerCase() === "high"
                        ? "text-success bg-success/10 border-success/20"
                        : String(record.consistency).toLowerCase() === "medium"
                          ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
                          : "text-muted-foreground bg-white/5 border-white/10"
                    }`}>
                      {record.consistency || "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/80 leading-normal">
                    Reflects the frequency and stability of commits, pull requests, and activity distributions across active open-source repositories.
                  </p>
                </div>

                {/* Top Technologies */}
                {record.top_languages && record.top_languages.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-primary/60" />
                      Top Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {record.top_languages.map((lang: string) => (
                        <span 
                          key={lang} 
                          className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold font-mono tracking-wider text-primary uppercase select-none hover:bg-primary/10 transition-colors"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blockchain Proof Footer */}
                <div className="pt-6 border-t border-white/5 space-y-2 select-none">
                  <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/50">
                    <span className="uppercase tracking-wider">Protocol Ledger</span>
                    <span className="text-foreground/40 break-all font-bold">GenLayer Studionet</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/50">
                    <span className="uppercase tracking-wider">Execution Context</span>
                    <span className="text-foreground/40 break-all font-bold">AI Quorum Consensus</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
