"use client";

import { useState, useEffect, useRef } from "react";
import { AccountPanel } from "./AccountPanel";
import { AuditUserModal } from "./AuditUserModal";
import { LogoMark } from "./Logo";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Navbar({ onAuditTriggered }: { onAuditTriggered: (username: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Section Observer for active links
  useEffect(() => {
    const sections = ["how-it-works", "leaderboard", "features", "protocol"];
    
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-30% 0px -50% 0px", // Trigger when section is in the middle of screen
        }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Keyboard accessibility and focus trap for mobile overlay menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (!menuRef.current) return;
    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]'
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  const navLinks = [
    { name: "How it Works", href: "#how-it-works", id: "how-it-works" },
    { name: "Leaderboard", href: "#leaderboard", id: "leaderboard" },
    { name: "Features", href: "#features", id: "features" },
    { name: "Protocol", href: "#protocol", id: "protocol" },
    { name: "Docs", href: "https://docs.genlayer.com", id: "docs", external: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none w-full">
        <div 
          className="pointer-events-auto mt-4 md:mt-6 mx-4 w-full md:max-w-5xl h-16 rounded-full glass-widget px-4 md:px-6 flex items-center justify-between gap-4 transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.4)] border border-white/10"
        >
          {/* Logo / Brand Mark */}
          <Link href="#" className="flex items-center gap-2 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="RepoScore Homepage">
            <LogoMark size="sm" className="text-primary drop-shadow-[0_0_8px_oklch(0.72_0.16_165/0.4)]" />
            <span className="text-xl font-black font-mono tracking-[-0.08em] leading-none uppercase select-none">RepoScore</span>
          </Link>

          {/* Desktop Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-foreground/60 hover:text-foreground hover:bg-white/5 transition-all duration-200 flex items-center gap-1 focus:outline-none focus-visible:bg-white/10 focus-visible:text-foreground"
                >
                  {link.name}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20 shadow-[0_0_12px_oklch(0.72_0.16_165/0.15)] font-semibold"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <AuditUserModal onAuditComplete={onAuditTriggered} />
            <AccountPanel />
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-overlay"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span
                className={`absolute h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isOpen ? "w-5 rotate-45" : "w-5 -translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isOpen ? "w-0 opacity-0" : "w-5 opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isOpen ? "w-5 -rotate-45" : "w-5 translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        id="mobile-nav-overlay"
        ref={menuRef}
        onKeyDown={handleTabKey}
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl flex flex-col justify-between p-6 pt-28 transition-all duration-300 ease-in-out lg:hidden outline-none ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 w-full max-w-md mx-auto">
          <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-2 px-4 select-none">Navigation</p>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-xl font-semibold text-foreground/60 hover:text-foreground flex items-center justify-between rounded-xl hover:bg-white/5 transition-all outline-none focus-visible:bg-white/10"
              >
                {link.name}
                <ExternalLink className="w-5 h-5 opacity-60" />
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 text-xl font-semibold rounded-xl transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20 shadow-[0_0_12px_oklch(0.72_0.16_165/0.1)]"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Actions / Panel */}
        <div className="w-full max-w-md mx-auto border-t border-white/5 pt-8 pb-4 flex flex-col gap-4">
          <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase px-4 select-none">Auditor Center</p>
          <div className="px-4">
            <AuditUserModal onAuditComplete={(username) => {
              onAuditTriggered(username);
              setIsOpen(false);
            }} />
          </div>
          <div className="px-4 flex justify-center">
            <AccountPanel />
          </div>
        </div>
      </div>
    </>
  );
}