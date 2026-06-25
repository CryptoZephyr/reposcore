import { ScrollReveal } from "./ScrollReveal";
import { Search, Cpu, Lock } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16">How it works</h2>
        </ScrollReveal>
        
        <div className="space-y-0">
          {/* Step 1 */}
          <ScrollReveal delay={0}>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-mono text-sm text-primary font-medium">1</span>
                </div>
                <div className="w-px h-16 bg-white/10 my-2" />
              </div>
              <div className="pt-2 pb-10">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
                  Submit a GitHub username
                </h3>
                <p className="text-sm text-foreground/50 max-w-[45ch] leading-relaxed">
                  Enter any public GitHub profile to begin an AI-powered evaluation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 2 */}
          <ScrollReveal delay={100}>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-mono text-sm text-primary font-medium">2</span>
                </div>
                <div className="w-px h-16 bg-white/10 my-2" />
              </div>
              <div className="pt-2 pb-10">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
                  AI consensus evaluates
                </h3>
                <p className="text-sm text-foreground/50 max-w-[45ch] leading-relaxed">
                  Multiple AI validators independently analyze contribution quality, consistency, and impact.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 3 */}
          <ScrollReveal delay={200}>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-mono text-sm text-primary font-medium">3</span>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
                  Score recorded on-chain
                </h3>
                <p className="text-sm text-foreground/50 max-w-[45ch] leading-relaxed">
                  The trust score is permanently stored on GenLayer — tamper-proof and publicly verifiable.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
