"use client";

import { useState, useEffect } from "react";
import { AccountPanel } from "./AccountPanel";
import { AuditUserModal } from "./AuditUserModal";
import { LogoMark } from "./Logo";

// Added prop type
export function Navbar({ onAuditTriggered }: { onAuditTriggered: (username: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <LogoMark size="sm" className="text-primary drop-shadow-[0_0_8px_oklch(0.65_0.22_300/0.5)]" />
              <h1 className="text-3xl md:text-4xl font-black font-mono tracking-[-0.08em] leading-none uppercase">RepoScore</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AuditUserModal onAuditComplete={onAuditTriggered} />
            <AccountPanel />
          </div>
        </div>
      </div>
    </header>
  );
}