"use client";

import { Code, ShieldCheck, AlertCircle, ExternalLink, Github } from "lucide-react";
import { useEvaluations, useRepoScoreContract } from "@/lib/hooks/useRepoScore";

export function EvaluationsTable({ onRowClick }: { onRowClick?: (username: string) => void }) {
    const contract = useRepoScoreContract();
    const { data: scoresMap, isLoading, isError } = useEvaluations();

    const evaluations = scoresMap
        ? Object.values(scoresMap).sort((a: any, b: any) => Number(b.trust_score) - Number(a.trust_score))
        : [];

    if (isLoading) {
        return (
            <div className="glass-widget rounded-xl overflow-hidden animate-pulse select-none" aria-busy="true" aria-label="Loading evaluations">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Rank</th>
                                <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Username</th>
                                <th className="px-6 py-4 text-center text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Trust Score</th>
                                <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Verdict</th>
                                <th className="px-6 py-4 text-right text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="bg-white/[0.01]">
                                    <td className="px-6 py-5">
                                        <div className="h-3.5 w-4 bg-white/10 rounded-sm" />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-white/10" />
                                            <div className="flex flex-col gap-1.5">
                                                <div className="h-3.5 w-24 bg-white/10 rounded-sm" />
                                                <div className="h-2 w-12 bg-white/5 rounded-sm" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="h-4 w-8 bg-white/10 rounded-sm mx-auto" />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="h-3.5 w-48 bg-white/10 rounded-sm" />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-end gap-1.5">
                                            <div className="h-3 w-8 bg-white/10 rounded-sm" />
                                            <div className="h-2 w-10 bg-white/5 rounded-sm" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (!contract) {
        return (
            <div className="glass-widget p-12 rounded-xl border-yellow-500/20 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-yellow-400 opacity-60 mb-4" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest">Configuration Error</h3>
                <p className="text-xs text-muted-foreground mt-2 font-mono">MISSING: NEXT_PUBLIC_CONTRACT_ADDRESS</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="glass-widget p-12 rounded-xl border-destructive/20 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-destructive opacity-60 mb-4" />
                <p className="text-xs font-mono text-destructive uppercase tracking-widest">Failed to load protocol state</p>
            </div>
        );
    }

    if (evaluations.length === 0) {
        return (
            <div className="glass-widget p-12 rounded-xl text-center opacity-60">
                <Code className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest">Protocol Ledger Empty</h3>
                <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-tighter">Submit a handle to initialize first audit</p>
            </div>
        );
    }

    return (
        <div className="glass-widget rounded-xl overflow-hidden border border-white/5 shadow-xl shadow-black/20">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] select-none">
                            <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Rank</th>
                            <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Username</th>
                            <th className="px-6 py-4 text-center text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Trust Score</th>
                            <th className="px-6 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Verdict</th>
                            <th className="px-6 py-4 text-right text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Impact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                        {evaluations.map((record: any, index: number) => (
                            <EvaluationRow
                                key={record.username}
                                record={record}
                                rank={index + 1}
                                onRowClick={onRowClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function EvaluationRow({ 
    record, 
    rank, 
    onRowClick 
}: { 
    record: any; 
    rank: number; 
    onRowClick?: (username: string) => void; 
}) {
    const score = Number(record.trust_score);

    return (
        <tr 
            onClick={() => onRowClick && onRowClick(record.username)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onRowClick && onRowClick(record.username);
                }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View detailed audit report for ${record.username}`}
            className="group hover:bg-white/[0.03] focus-visible:bg-white/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
            <td className="px-6 py-4 select-none">
                <span className="text-xs text-muted-foreground opacity-40 font-bold">{rank.toString().padStart(2, '0')}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                        <Github className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-foreground tracking-tight">{record.username}</span>
                        <div className="mt-0.5">
                            <a 
                                href={`https://github.com/${record.username}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-primary transition-all duration-300 hover:underline outline-none text-[10px] font-bold tracking-wider uppercase"
                                aria-label={`View GitHub profile for ${record.username}`}
                            >
                                View Profile
                                <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`text-sm font-black tracking-tighter px-2.5 py-1 rounded-md transition-all duration-300 ${
                    score >= 80 
                        ? 'text-primary bg-primary/10 border border-primary/20 shadow-[0_0_12px_oklch(0.72_0.16_165/0.15)] font-black' 
                        : score >= 50 
                            ? 'text-blue-400 bg-blue-400/10 border border-blue-400/20' 
                            : 'text-muted-foreground bg-white/5 border border-white/10'
                }`}>
                    {score}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="max-w-xs truncate">
                    <span className="text-[11px] text-muted-foreground leading-none group-hover:text-foreground/80 transition-colors">
                        {record.verdict}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex flex-col items-end">
                    <span className={`text-xs font-bold transition-colors ${
                        Number(record.community_impact) >= 70 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                        {record.community_impact || 0}
                    </span>
                    <span className="text-[8px] text-muted-foreground/40 uppercase tracking-tighter select-none">Impact</span>
                </div>
            </td>
        </tr>
    );
}