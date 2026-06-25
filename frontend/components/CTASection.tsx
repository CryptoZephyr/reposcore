import { Button } from "./ui/button";
import { AuditUserModal } from "./AuditUserModal";
import { ScrollReveal } from "./ScrollReveal";

export function CTASection() {
  return (
    <section className="py-32 md:py-40 px-4 md:px-6 lg:px-8 bg-primary/[0.02] relative border-t border-primary/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.16_165/0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            Ready to verify your next hire?
          </h2>
          <AuditUserModal>
            <Button className="bg-primary text-white hover:brightness-110 active:scale-[0.98] px-8 py-6 h-auto text-base font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              Audit a developer
            </Button>
          </AuditUserModal>
        </ScrollReveal>
      </div>
    </section>
  );
}
