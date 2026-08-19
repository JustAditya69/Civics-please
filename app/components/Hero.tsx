import React from "react";

// Define the shape of the data we expect from the page
interface HeroProps {
  stats?: {
    total: number;
    resolved: number;
    inProgress: number;
  };
}

const Hero = ({ stats }: HeroProps) => {
  // Safe fallbacks and percentage math
  const total = stats?.total || 0;
  const resolved = stats?.resolved || 0;
  const activeReports = stats?.inProgress || 0;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <section
      id="impact"
      className="relative w-full overflow-hidden bg-black py-16 lg:py-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

      {/* Green Ambient Glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-green-500/10 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <p className="text-sm font-medium tracking-[0.2em] text-green-400">
                BUILT FOR BETTER COMMUNITIES
              </p>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Voice.
              <br />
              <span className="text-white/60">Your City.</span>
              <br />
              <span className="text-green-400">Your Impact.</span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
              Report civic issues, track their progress, and help
              make your community cleaner, safer, and better.
              Together, we can turn everyday problems into real change.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="/report"
                className="border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
              >
                Report an Issue
                <span className="ml-2">→</span>
              </a>

              <a
                href="#how-it-works"
                className="border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                How It Works
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
              <p className="text-sm text-white/40">
                Making civic participation easier for everyone
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative hidden items-center justify-center lg:flex">
            {/* Civic Activity Card */}
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 -z-10 bg-green-500/10 blur-[100px]" />

              {/* Main Card */}
              <div className="border border-white/15 bg-black/40 p-6 shadow-2xl backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                      Civic Activity
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Your Community
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    LIVE
                  </div>
                </div>

                {/* Issue 1 */}
                <div className="border-b border-white/10 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-lg">
                        🛣️
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Damaged Road</h4>
                        <p className="mt-1 text-sm text-white/40">Main Street</p>
                      </div>
                    </div>
                    <span className="border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-xs text-yellow-400">
                      Open
                    </span>
                  </div>
                </div>

                {/* Issue 2 */}
                <div className="border-b border-white/10 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-lg">
                        💡
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Street Light</h4>
                        <p className="mt-1 text-sm text-white/40">Park Avenue</p>
                      </div>
                    </div>
                    <span className="border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-xs text-green-400">
                      Fixed
                    </span>
                  </div>
                </div>

                {/* Issue 3 */}
                <div className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-lg">
                        🗑️
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Garbage Collection</h4>
                        <p className="mt-1 text-sm text-white/40">Green Park</p>
                      </div>
                    </div>
                    <span className="border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-400">
                      In Progress
                    </span>
                  </div>
                </div>

                {/* Statistics (DYNAMICALLY UPDATED) */}
                <div className="mt-2 grid grid-cols-3 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {total.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-white/40">Reported</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-white">
                      {resolved.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-white/40">Resolved</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-green-400">
                      {resolutionRate}%
                    </p>
                    <p className="mt-1 text-xs text-white/40">Resolution</p>
                  </div>
                </div>
              </div>

              {/* Floating Resolved Notification */}
              <div className="absolute -right-6 -top-6 border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center bg-green-400/10 text-green-400">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-medium text-white">Issue Resolved</p>
                    <p className="text-[11px] text-white/40">Just now</p>
                  </div>
                </div>
              </div>

              {/* Floating Location (DYNAMIC ACTIVE REPORTS) */}
              <div className="absolute -bottom-6 -left-6 border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-xs font-medium text-white">Your Area</p>
                    <p className="text-[11px] text-white/40">
                      {activeReports} active reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;