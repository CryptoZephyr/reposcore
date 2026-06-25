"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EvaluationsTable } from "@/components/EvaluationsTable";
import { LandingHero } from "@/components/LandingHero";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductPreview } from "@/components/ProductPreview";
import { TechSection } from "@/components/TechSection";
import { CTASection } from "@/components/CTASection";
import { ReportDrawer } from "@/components/ReportDrawer";

// Note: the original code had the dashboard logic here, but for Phase 2 
// we will just show the landing page. The dashboard modal/overlay will be 
// restored/adjusted in later phases if needed, or we just rely on the leaderboard.
// Actually, Navbar already handles triggering audits and has the AccountPanel.
// So we just build the sections.

export default function HomePage() {
  const [activeUsername, setActiveUsername] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar onAuditTriggered={(name) => setActiveUsername(name)} />

      <main className="flex-grow">
        <LandingHero />
        <TrustBar />
        <HowItWorks />
        
        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Leaderboard</h2>
            </div>
            <EvaluationsTable onRowClick={(username) => setActiveUsername(username)} />
          </div>
        </section>

        <ProductPreview />
        <TechSection />
        <CTASection />
      </main>

      <Footer />

      {/* Slide-over Audit Report Details Drawer */}
      <ReportDrawer 
        username={activeUsername} 
        isOpen={activeUsername !== null} 
        onClose={() => setActiveUsername(null)} 
      />
    </div>
  );
}