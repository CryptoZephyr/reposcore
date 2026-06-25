export function TrustBar() {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h3 className="text-sm text-foreground/40 tracking-wide mb-12">
          Built for teams that hire from open source
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Direct hover states for trust indicators */}
            <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="h-6 opacity-30 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer select-none" />
            <img src="https://cdn.simpleicons.org/gitlab/white" alt="GitLab" className="h-6 opacity-30 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer select-none" />
            <img src="https://cdn.simpleicons.org/vercel/white" alt="Vercel" className="h-6 opacity-30 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer select-none" />
            <img src="https://cdn.simpleicons.org/supabase/white" alt="Supabase" className="h-6 opacity-30 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer select-none" />
            <img src="https://cdn.simpleicons.org/linear/white" alt="Linear" className="h-6 opacity-30 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer select-none" />
        </div>
      </div>
    </section>
  );
}
