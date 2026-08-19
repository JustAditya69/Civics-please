import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white selection:bg-green-400 selection:text-black">
      <Navbar />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        {/* Ambient Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[160px]" />

        <div className="relative z-10">
          
          {/* Header Section */}
          <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-green-400" />
                <p className="text-xs font-semibold tracking-[0.25em] text-green-400 uppercase">
                  Platform Features
                </p>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Everything you need to <br />
                <span className="text-white/40">improve your community.</span>
              </h1>
            </div>
            <div>
              <p className="text-base leading-relaxed text-white/60">
                Civics Please connects everyday residents directly with municipal authorities. Built for speed, clarity, and transparency so reported problems actually get solved.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                01
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                📍
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Smart Location Mapping
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Automatically pinpoints exact map coordinates and matches them with street addresses so repair crews never have trouble finding the issue.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                02
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                📷
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Instant Photo Uploads
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Easily attach photos of potholes, broken streetlights, or garbage buildup straight from your phone or camera to show the exact damage.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                03
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                ⚡
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Live Status Tracking
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Never wonder what happened to your report. Track its progress in real-time from review to in-progress and complete resolution.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                04
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                🏛️
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Direct Department Routing
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Admins can review submitted reports and dispatch them directly to the right municipal department, like sanitation or public works.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                05
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                🔒
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Protected Privacy
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Your personal contact details stay hidden from the public. Only authorized administrators can view information needed to resolve issues.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative border border-white/10 bg-[#0b110d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-white/20 group-hover:text-green-400 transition-colors">
                06
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-black text-2xl group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-all">
                📊
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Community Impact Scoreboard
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                See real numbers on the front page showing total reports filed and resolved, proving that speaking up creates visible change.
              </p>
            </div>

          </div>

          {/* Call to Action Banner */}
          <div className="mt-20 relative border border-green-400/20 bg-gradient-to-r from-green-400/10 via-[#0b110d] to-black p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to improve your neighborhood?
              </h2>
              <p className="text-white/60 text-sm max-w-xl">
                File your first issue in less than two minutes and help make your city cleaner and safer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/report" 
                className="bg-green-400 text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:bg-green-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] whitespace-nowrap"
              >
                Report an Issue
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}