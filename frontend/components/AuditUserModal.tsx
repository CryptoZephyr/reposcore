"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Github, ShieldAlert, Terminal, Cpu } from "lucide-react";
import { useEvaluateUser } from "@/lib/hooks/useRepoScore";
import { useWallet } from "@/lib/genlayer/wallet";
import { error } from "@/lib/utils/toast";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AuditUserModal({ onAuditComplete }: { onAuditComplete: (username: string) => void }) {
    const { isConnected, address, isLoading: isWalletLoading } = useWallet();
    const { evaluateUser, isEvaluating, isSuccess, reset } = useEvaluateUser();

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || !address) {
            error("Please connect your wallet first");
            return;
        }
        if (!username.trim()) {
            setFormError("GitHub username is required");
            return;
        }
        evaluateUser(username.trim());
    };

    useEffect(() => {
        if (isSuccess && username && isOpen) {
            onAuditComplete(username);
            setIsOpen(false);
            setUsername("");
            setFormError("");
            reset();
        }
    }, [isSuccess]);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setUsername("");
            setFormError("");
            reset();
        }
        setIsOpen(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button className="w-full md:w-[320px] bg-black/40 border border-white/5 hover:border-primary/40 px-4 py-2.5 rounded-lg flex items-center justify-between group transition-all">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary/70">Enter Github Username...</span>
                    <Search className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary" />
                </button>
            </DialogTrigger>

            <DialogContent className="glass-widget border-2 border-primary/20 sm:max-w-[480px] overflow-hidden">
                {isEvaluating && <div className="animate-scan z-0" />}
                <DialogHeader className="relative z-10">
                    <DialogTitle className="text-xl font-mono font-black uppercase tracking-tight flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-primary" /> Initiate_Audit.exe
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Trigger an on-chain AI audit for a GitHub user.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative z-10">
                    {!isEvaluating ? (
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">Target_Handle</Label>
                                <Input
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="font-mono bg-black/40 border-white/10"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-primary uppercase font-mono text-[10px]">Run_AI_Audit</Button>
                        </form>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center space-y-8">
                            <div className="w-20 h-20 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <div className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase">Establishing Quorum...</div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}