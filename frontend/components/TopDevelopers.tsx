"use client";

import { Trophy, Star, Github, Loader2, AlertCircle } from "lucide-react";
import { useEvaluations } from "@/lib/hooks/useRepoScore";

export function TopDevelopers() {
    const { data: scoresMap, isLoading, isError } = useEvaluations();

    const topDevs = scoresMap
        ? Object.values(scoresMap)
            .sort((a: any, b: any) => Number(b.trust_score) - Number(a.trust_score))
            .slice(0, 5)
        : [];

    if (isLoading) {
        return (
            <div className="brand-card p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Ranking developers...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="brand-card p-6 border-destructive/20">
                <div className="flex items-center gap-2 text-destructive mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <h2 className="font-bold">Error</h2>
                </div>
                <p className="text-sm text-muted-foreground">Failed to load leaderboard.</p>
            </div>
        );
    }

    return (
        <div className="brand-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Top 5 Auditors
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-1 rounded">
                    On-Chain Verified
                </span>
            </div>

            <div className="space-y-4">
                {topDevs.length > 0 ? (
                    topDevs.map((dev: any, index) => (
                        <div
                            key={dev.username}
                            className="relative flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-accent/30 transition-all group"
                        >
                            <div className="flex-shrink-0 w-6 text-center font-mono text-sm text-muted-foreground">
                                0{index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-bold truncate">@{dev.username}</span>
                                </div>
                                <div className="flex gap-1 mt-1">
                                    {(typeof dev.top_languages === "string" ? dev.top_languages.split(", ") : dev.top_languages).slice(0, 2).map((lang: string) => (
                                        <span key={lang} className="text-[10px] text-muted-foreground">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end">
                                    <span className="text-lg font-black text-accent">{Number(dev.trust_score)}</span>
                                    <Star className="w-3 h-3 fill-accent text-accent" />
                                </div>
                                <p className="text-[9px] text-muted-foreground uppercase">Trust Score</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <Github className="w-12 h-12 mx-auto text-muted-foreground/20 mb-3" />
                        <p className="text-sm text-muted-foreground">No audits recorded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}