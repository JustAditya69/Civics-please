// app/components/Impact.tsx
import React from "react";

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
  const resolutionRate = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;
  
  const getCategoryPercent = (categoryCount: number) => {
    return stats.total > 0 ? Math.round((categoryCount / stats.total) * 100) : 0;
  };

  const roadPct = getCategoryPercent(stats.categories.roads);
  const garbagePct = getCategoryPercent(stats.categories.garbage);
  const lightPct = getCategoryPercent(stats.categories.lights);
  const waterPct = getCategoryPercent(stats.categories.water);

  return (
    <section id="impact" className="relative w-full py-12 sm:py-16 lg:py-24 z-10 border-t-2 border-[#113320]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
            OUR IMPACT
          </p>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight">
            SMALL REPORTS. <br />
            <span className="text-[#fa6355]">BIG DIFFERENCE.</span>
          </h2>
          <p className="mt-4 sm:mt-5 max-w-2xl font-sans text-sm sm:text-lg text-[#113320]/80">
            Every report is a step toward a cleaner, safer, and better community.
          </p>
        </div>

        {/* TOP STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="border-2 border-[#113320] bg-white p-4 sm:p-6 shadow-[3px_3px_0px_#113320] sm:shadow-[4px_4px_0px_#113320]">
            <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-[#113320]/60 uppercase mb-1 sm:mb-2">REPORTS</p>
            <h3 className="font-pixel text-xl sm:text-3xl lg:text-4xl text-[#113320]">
              {stats.total.toLocaleString()}
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#113320]/70 mt-1 sm:mt-2">Civic issues reported.</p>
          </div>

          <div className="border-2 border-[#113320] bg-[#f4ebd6] p-4 sm:p-6 shadow-[3px_3px_0px_#113320] sm:shadow-[4px_4px_0px_#113320]">
            <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-[#113320]/60 uppercase mb-1 sm:mb-2">RESOLVED</p>
            <h3 className="font-pixel text-xl sm:text-3xl lg:text-4xl text-[#fa6355]">
              {stats.resolved.toLocaleString()}
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#113320]/70 mt-1 sm:mt-2">Problems resolved.</p>
          </div>

          <div className="border-2 border-[#113320] bg-white p-4 sm:p-6 shadow-[3px_3px_0px_#113320] sm:shadow-[4px_4px_0px_#113320]">
            <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-[#113320]/60 uppercase mb-1 sm:mb-2">ACTIVE DISTRICTS</p>
            <h3 className="font-pixel text-xl sm:text-3xl lg:text-4xl text-[#113320]">
              1<span className="text-[#fa6355]">+</span>
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#113320]/70 mt-1 sm:mt-2">Communities active.</p>
          </div>

          <div className="border-2 border-[#113320] bg-[#bce3c5] p-4 sm:p-6 shadow-[3px_3px_0px_#113320] sm:shadow-[4px_4px_0px_#113320]">
            <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-[#113320]/60 uppercase mb-1 sm:mb-2">RESOLUTION RATE</p>
            <h3 className="font-pixel text-xl sm:text-3xl lg:text-4xl text-[#113320]">
              {resolutionRate}%
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#113320]/70 mt-1 sm:mt-2">Issues resolved.</p>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Category Activity Progress Bars */}
          <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] lg:col-span-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10">
              <div>
                <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase mb-1">COMMUNITY ACTIVITY</p>
                <h3 className="font-pixel text-lg sm:text-xl text-[#113320] uppercase">Category Breakdown</h3>
              </div>
              <div className="flex items-center gap-2 font-sans text-xs font-bold text-[#fa6355] uppercase">
                <span className="h-2 w-2 animate-pulse bg-[#fa6355]" />
                LIVE
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6 relative z-10">
              {/* Road */}
              <div>
                <div className="mb-2 flex justify-between font-sans text-xs font-bold uppercase text-[#113320]">
                  <span>Roads & Potholes</span>
                  <span>{roadPct}%</span>
                </div>
                <div className="h-4 w-full border-2 border-[#113320] bg-[#e2f9e1]">
                  <div className="h-full bg-[#fa6355] border-r-2 border-[#113320]" style={{ width: `${roadPct}%` }} />
                </div>
              </div>

              {/* Garbage */}
              <div>
                <div className="mb-2 flex justify-between font-sans text-xs font-bold uppercase text-[#113320]">
                  <span>Garbage & Waste</span>
                  <span>{garbagePct}%</span>
                </div>
                <div className="h-4 w-full border-2 border-[#113320] bg-[#e2f9e1]">
                  <div className="h-full bg-[#fa6355] border-r-2 border-[#113320]" style={{ width: `${garbagePct}%` }} />
                </div>
              </div>

              {/* Lights */}
              <div>
                <div className="mb-2 flex justify-between font-sans text-xs font-bold uppercase text-[#113320]">
                  <span>Street Lights</span>
                  <span>{lightPct}%</span>
                </div>
                <div className="h-4 w-full border-2 border-[#113320] bg-[#e2f9e1]">
                  <div className="h-full bg-[#fa6355] border-r-2 border-[#113320]" style={{ width: `${lightPct}%` }} />
                </div>
              </div>

              {/* Water */}
              <div>
                <div className="mb-2 flex justify-between font-sans text-xs font-bold uppercase text-[#113320]">
                  <span>Water & Drainage</span>
                  <span>{waterPct}%</span>
                </div>
                <div className="h-4 w-full border-2 border-[#113320] bg-[#e2f9e1]">
                  <div className="h-full bg-[#fa6355] border-r-2 border-[#113320]" style={{ width: `${waterPct}%` }} />
                </div>
              </div>
            </div>
            {/* Grid graphic inside card */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,51,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,51,32,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </div>

          {/* Monthly Stats Sidebar */}
          <div className="border-2 border-[#113320] bg-[#f4ebd6] p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
            <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase mb-4 sm:mb-6">THIS MONTH</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#113320]/20 pb-3 sm:pb-4">
                <span className="font-sans text-xs sm:text-sm font-bold text-[#113320] uppercase">Reports Filed</span>
                <span className="font-pixel text-base sm:text-lg text-[#113320]">{stats.thisMonthTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-[#113320]/20 pb-3 sm:pb-4">
                <span className="font-sans text-xs sm:text-sm font-bold text-[#113320] uppercase">Resolved</span>
                <span className="font-pixel text-base sm:text-lg text-[#fa6355]">{stats.thisMonthResolved.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-[#113320]/20 pb-3 sm:pb-4">
                <span className="font-sans text-xs sm:text-sm font-bold text-[#113320] uppercase">In Progress</span>
                <span className="font-pixel text-base sm:text-lg text-[#113320]">{stats.thisMonthInProgress.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 border-2 border-[#113320] bg-white p-3 sm:p-4">
              <p className="font-sans text-[10px] sm:text-xs font-bold text-[#fa6355] uppercase mb-1 sm:mb-2">COMMUNITY IMPACT</p>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]">
                Your reports help identify the problems that matter most to your community.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Impact;