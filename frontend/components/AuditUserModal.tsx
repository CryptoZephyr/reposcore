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

export function AuditUserModal({ onAuditComplete, children }: { onAuditComplete?: (username: string) => void, children?: React.ReactNode }) {
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
            if (onAuditComplete) onAuditComplete(username);
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
                {children || (
                    <button className="w-full md:w-[320px] bg-black/40 border border-white/5 hover:border-primary/40 px-4 py-2.5 rounded-lg flex items-center justify-between group transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary/70">Enter Github Username...</span>
                        <Search className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary" />
                    </button>
                )}
            </DialogTrigger>

            <DialogContent className="glass-widget border-2 border-primary/20 sm:max-w-[480px] overflow-hidden">
                {isEvaluating && <div className="animate-scan z-0" />}
                <DialogHeader className="relative z-10">
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Audit a developer
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Trigger an on-chain AI audit for a GitHub user.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative z-10">
                    {!isEvaluating ? (
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="github-username" className="text-sm font-medium">GitHub Username</Label>
                                <Input
                                    id="github-username"
                                    type="text"
                                    placeholder="e.g. torvalds"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-black/40 border-white/10"
                                    aria-describedby={formError ? "github-username-error" : undefined}
                                />
                                {formError && (
                                    <p id="github-username-error" role="alert" className="text-sm text-destructive mt-1">
                                        {formError}
                                    </p>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-primary text-white font-semibold">Start Audit</Button>
                        </form>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center space-y-8">
                            <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <div className="text-sm font-medium text-primary">Establishing Quorum...</div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}