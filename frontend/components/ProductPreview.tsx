import { ScrollReveal } from "./ScrollReveal";
import { ScoreDial } from "./ScoreDial";

export function ProductPreview() {
  return (
    <section id="features" className="py-24 md:py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16">What you get</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ScrollReveal className="lg:col-span-7" delay={0}>
            <div className="glass-widget rounded-2xl p-10 flex flex-col items-center justify-center h-full min-h-[360px] relative hover:border-primary/25 hover:shadow-[0_20px_45px_oklch(0.72_0.16_165/0.06)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] select-none">
              <div className="absolute top-6 left-8 text-[10px] font-mono text-muted-foreground tracking-widest uppercase opacity-50">
                TRUST SCORE
              </div>
              <div className="mt-4">
                <ScoreDial score={87} size="lg" />
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-6">
            <ScrollReveal className="col-span-1 lg:col-span-1" delay={100}>
              <div className="glass-widget rounded-2xl p-6 h-full min-h-[160px] hover:border-primary/20 hover:shadow-[0_15px_30px_oklch(0.72_0.16_165/0.05)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group select-none">
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1 opacity-50">Consistency</div>
                <div className="text-lg font-black font-mono tracking-tight uppercase text-success mb-6">High</div>
                <div className="flex items-end gap-1.5 h-12">
                  {[40, 55, 30, 80, 70, 95, 85, 100].map((h, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-full rounded-sm ${i < 6 ? 'bg-success shadow-[0_0_8px_oklch(0.68_0.14_155/0.4)]' : 'bg-white/10'} group-hover:scale-y-105 origin-bottom transition-all duration-300`} 
                      style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }} 
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="col-span-1 lg:col-span-1" delay={200}>
              <div className="glass-widget rounded-2xl p-6 h-full min-h-[160px] flex flex-col justify-between hover:border-primary/20 hover:shadow-[0_15px_30px_oklch(0.72_0.16_165/0.05)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group select-none">
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase opacity-50">Community Impact</div>
                <div className="flex items-end justify-between mt-4">
                  <svg 
                    className="w-8 h-8 text-primary/60 mb-1 group-hover:scale-110 group-hover:text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                  </svg>
                  <span className="text-5xl font-black font-mono tracking-tighter text-primary leading-none group-hover:translate-x-[-2px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">74</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:col-span-7" delay={100}>
            <div className="glass-widget rounded-2xl p-8 min-h-[140px] flex flex-col justify-center relative hover:border-primary/20 hover:shadow-[0_15px_30px_oklch(0.72_0.16_165/0.05)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] select-none">
              <div className="absolute top-6 left-8 text-[10px] font-mono text-muted-foreground tracking-widest uppercase opacity-50">AI Verdict</div>
              <blockquote className="mt-6">
                <p className="text-xl font-medium leading-tight text-foreground/90 tracking-tight italic">
                  "Exceptional contributor with deep systems programming expertise and consistent code quality."
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={200}>
            <div className="glass-widget rounded-2xl p-6 min-h-[140px] hover:border-primary/20 hover:shadow-[0_15px_30px_oklch(0.72_0.16_165/0.05)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group select-none">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4 opacity-50">Tech Stack</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {['C', 'Python', 'Shell', 'Makefile'].map((lang) => (
                  <span 
                    key={lang} 
                    className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold font-mono tracking-wider text-primary uppercase group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors duration-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
