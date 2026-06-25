import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TechSection() {
  return (
    <section id="protocol" className="py-24 md:py-32 px-4 md:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <ScrollReveal delay={0}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">Powered by GenLayer</h2>
          <p className="text-base text-foreground/60 leading-relaxed mb-6 max-w-[40ch]">
            RepoScore uses AI consensus on GenLayer's blockchain. Multiple validators independently evaluate each developer, then reach consensus on a single trust score.
          </p>
          <Link href="https://docs.genlayer.com" target="_blank" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            Learn more <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100} className="flex justify-center md:justify-end">
          <div className="flex flex-col items-center">
            <div className="flex gap-6 mb-8">
              {['V1', 'V2', 'V3'].map((v) => (
                <div key={v} className="flex flex-col items-center relative">
                  <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center font-mono text-primary font-bold text-sm">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative w-full h-16 flex justify-center mb-2">
              <svg className="absolute inset-0 w-full h-full text-primary/30" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path d="M 40 0 L 100 60" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                <path d="M 100 0 L 100 60" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                <path d="M 160 0 L 100 60" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              </svg>
            </div>
            
            <div className="px-6 py-3 rounded-xl border border-primary/40 bg-primary/10 shadow-[0_0_20px_oklch(0.72_0.16_165/0.15)] font-mono text-sm font-bold text-primary tracking-widest uppercase">
              CONSENSUS
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
