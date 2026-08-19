// app/components/Impact.tsx
import React from "react";

// Define the shape of the data we expect from the server
interface ImpactStats {
  total: number;
  resolved: number;
  inProgress: number;
  thisMonthTotal: number;
  thisMonthResolved: number;
  thisMonthInProgress: number;
  categories: {
    roads: number;
    garbage: number;
    lights: number;
    water: number;
  };
}

const Impact = ({ stats }: { stats: ImpactStats }) => {
  // Helper math to calculate percentages safely (avoid dividing by zero)
  const resolutionRate = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;
  
  const getCategoryPercent = (categoryCount: number) => {
    return stats.total > 0 ? Math.round((categoryCount / stats.total) * 100) : 0;
  };

  const roadPct = getCategoryPercent(stats.categories.roads);
  const garbagePct = getCategoryPercent(stats.categories.garbage);
  const lightPct = getCategoryPercent(stats.categories.lights);
  const waterPct = getCategoryPercent(stats.categories.water);

  return (
    <section id="impact" className="relative w-full overflow-hidden bg-black py-20 lg:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-green-500/5 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-green-400" />
            <p className="text-sm font-medium tracking-[0.2em] text-green-400">OUR IMPACT</p>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Small reports.
            <br />
            <span className="text-white/40">Big difference.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
            Every report is a step toward a cleaner, safer, and better community.
          </p>
        </div>

        {/* TOP STATS GRID */}
        <div className="mt-14 grid grid-cols-1 border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-white/10 p-7 transition-all duration-300 hover:bg-white/[0.03] sm:border-r">
            <p className="text-sm tracking-widest text-white/30">REPORTS</p>
            <h3 className="mt-5 text-5xl font-bold tracking-tight text-white">
              {stats.total.toLocaleString()}
            </h3>
            <p className="mt-3 text-sm text-white/40">Civic issues reported.</p>
          </div>

          <div className="border-b border-white/10 p-7 transition-all duration-300 hover:bg-white/[0.03] lg:border-r">
            <p className="text-sm tracking-widest text-white/30">RESOLVED</p>
            <h3 className="mt-5 text-5xl font-bold tracking-tight text-white">
              {stats.resolved.toLocaleString()}
            </h3>
            <p className="mt-3 text-sm text-white/40">Problems successfully resolved.</p>
          </div>

          <div className="border-b border-white/10 p-7 transition-all duration-300 hover:bg-white/[0.03] sm:border-r lg:border-r">
            <p className="text-sm tracking-widest text-white/30">ACTIVE DISTRICTS</p>
            <h3 className="mt-5 text-5xl font-bold tracking-tight text-white">
              1<span className="text-green-400">+</span>
            </h3>
            <p className="mt-3 text-sm text-white/40">Communities participating.</p>
          </div>

          <div className="border-b border-white/10 p-7 transition-all duration-300 hover:bg-white/[0.03]">
            <p className="text-sm tracking-widest text-white/30">RESOLUTION RATE</p>
            <h3 className="mt-5 text-5xl font-bold tracking-tight text-green-400">
              {resolutionRate}%
            </h3>
            <p className="mt-3 text-sm text-white/40">Overall issues resolved.</p>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
          
          {/* Category Activity Progress Bars */}
          <div className="bg-black p-7 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] text-white/30">COMMUNITY ACTIVITY</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Category Breakdown</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                LIVE
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {/* Road */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/60">Roads & Potholes</span>
                  <span className="text-white/30">{roadPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10">
                  <div className="h-full bg-green-400 transition-all duration-1000" style={{ width: `${roadPct}%` }} />
                </div>
              </div>

              {/* Garbage */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/60">Garbage & Waste</span>
                  <span className="text-white/30">{garbagePct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10">
                  <div className="h-full bg-green-400 transition-all duration-1000" style={{ width: `${garbagePct}%` }} />
                </div>
              </div>

              {/* Lights */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/60">Street Lights</span>
                  <span className="text-white/30">{lightPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10">
                  <div className="h-full bg-green-400 transition-all duration-1000" style={{ width: `${lightPct}%` }} />
                </div>
              </div>

              {/* Water */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/60">Water & Drainage</span>
                  <span className="text-white/30">{waterPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10">
                  <div className="h-full bg-green-400 transition-all duration-1000" style={{ width: `${waterPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Stats Sidebar */}
          <div className="bg-white/[0.02] p-7">
            <p className="text-xs tracking-[0.2em] text-white/30">THIS MONTH</p>
            <div className="mt-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/50">Reports Filed</span>
                <span className="font-semibold text-white">{stats.thisMonthTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/50">Resolved</span>
                <span className="font-semibold text-green-400">{stats.thisMonthResolved.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/50">In Progress</span>
                <span className="font-semibold text-white">{stats.thisMonthInProgress.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-10 border border-green-400/20 bg-green-400/5 p-5">
              <p className="text-sm font-medium text-green-400">COMMUNITY IMPACT</p>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Your reports help identify the problems that matter most to your community.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mt-16 text-center">
          <p className="text-sm tracking-[0.15em] text-white/30">EVERY REPORT COUNTS</p>
          <h3 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Better communities start with people who
            <span className="text-green-400"> speak up.</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Impact;