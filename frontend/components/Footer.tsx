import { LogoMark } from "./Logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-5xl mx-auto pt-16 pb-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LogoMark size="sm" className="text-primary" />
            <span className="font-semibold text-base">RepoScore</span>
          </div>
          <p className="text-sm text-muted-foreground/60 max-w-[280px]">
            AI-powered developer trust scores on GenLayer blockchain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xs font-medium text-foreground/30 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-sm text-foreground/50 hover:text-foreground transition-colors">How it works</Link></li>
              <li><Link href="#leaderboard" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium text-foreground/30 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="https://github.com" target="_blank" className="text-sm text-foreground/50 hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="https://docs.genlayer.com" target="_blank" className="text-sm text-foreground/50 hover:text-foreground transition-colors">GenLayer Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium text-foreground/30 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-foreground/30">
          © {new Date().getFullYear()} RepoScore · Powered by GenLayer
        </p>
      </div>
    </footer>
  );
}
