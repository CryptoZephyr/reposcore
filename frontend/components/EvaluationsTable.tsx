"use client";

import { Loader2, Code, ShieldCheck, AlertCircle, ExternalLink, Zap, Github } from "lucide-react";
import { useEvaluations, useRepoScoreContract } from "@/lib/hooks/useRepoScore";

export function EvaluationsTable() {
    const contract = useRepoScoreContract();
    const { data: scoresMap, isLoading, isError } = useEvaluations();

    const evaluations = scoresMap
        ? Object.values(scoresMap).sort((a: any, b: any) => Number(b.trust_score) - Number(a.trust_score))
        : [];

    if (isLoading) {
        return (
            <div className="glass-widget p-12 rounded-xl flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">Fetching_OnChain_ledger...</p>
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
        <div className="glass-widget rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function EvaluationRow({ record, rank }: { record: any, rank: number }) {
    const score = Number(record.trust_score);

    return (
        <tr className="group hover:bg-white/[0.04] transition-all duration-200">
            <td className="px-6 py-4">
                <span className="text-xs text-muted-foreground opacity-40 font-bold">{rank.toString().padStart(2, '0')}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 transition-colors">
                        <Github className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-foreground tracking-tight">{record.username}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] text-primary uppercase font-bold tracking-widest">View Profile</span>
                            <ExternalLink className="w-2 h-2 text-primary" />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`text-sm font-black tracking-tighter ${score >= 80 ? 'text-neon text-primary' :
                        score >= 50 ? 'text-blue-400' : 'text-muted-foreground'
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
                    <span className={`text-xs font-bold ${Number(record.community_impact) >= 70 ? 'text-verified-teal' : 'text-muted-foreground'
                        }`}>
                        {record.community_impact || 0}
                    </span>
                    <span className="text-[8px] text-muted-foreground/40 uppercase tracking-tighter">Impact_Val</span>
                </div>
            </td>
        </tr>
    );
}