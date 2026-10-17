import React from "react";
import Link from "next/link";

interface HeroProps {
  stats?: {
    total: number;
    resolved: number;
    inProgress: number;
  };
}

const Hero = ({ stats }: HeroProps) => {
  const activeReports = stats?.inProgress || 12;

  return (
    <section className="relative w-full py-10 md:py-16 lg:py-24 z-10">
      <div className="mx-auto flex min-h-[60vh] md:min-h-[70vh] w-full max-w-7xl items-center px-4 sm:px-6">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:gap-16 lg:grid-cols-2">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="mb-6 md:mb-8 inline-flex items-center gap-2 border-2 border-[#113320] px-3 py-1.5 bg-[#e2f9e1] w-max shadow-retro">
              <span className="h-2.5 w-2.5 bg-[#fa6355] border border-[#113320]" />
              <p className="font-sans text-[10px] font-bold tracking-widest text-[#113320] uppercase">
                NETWORK ONLINE
              </p>
            </div>

            {/* Heading */}
            <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.3] text-[#113320] mb-6">
              YOUR CITY HAS <br className="hidden sm:block" /> A SIDE QUEST.
            </h1>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#113320]/80 max-w-lg mb-8 md:mb-10">
              Spot a problem. Drop the location. Upload proof. We route it to the right crew and keep you in the loop.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-10 md:mb-12">
              <Link
                href="/report"
                className="text-center border-2 border-[#113320] bg-[#fa6355] px-8 py-4 font-sans text-sm font-bold text-white uppercase tracking-wider shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all"
              >
                START REPORT →
              </Link>
              <Link
                href="/track"
                className="text-center border-2 border-[#113320] bg-[#e2f9e1] px-8 py-4 font-sans text-sm font-bold text-[#113320] uppercase tracking-wider shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all"
              >
                TRACK A CASE
              </Link>
            </div>

            {/* Features list */}
            <div className="flex flex-wrap items-center gap-8 font-sans text-xs font-bold text-[#113320] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="text-[#fa6355]">📍</span> Exact location
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#fa6355]">📷</span> Photo evidence
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#fa6355]">✓</span> Live updates
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-lg border-2 border-[#113320] bg-white p-2 shadow-[8px_8px_0px_#113320]">
              <div className="border-2 border-[#113320] bg-[#f4ebd6] p-4 relative overflow-hidden h-[300px] md:h-[400px]">
                {/* Map Header */}
                <div className="flex justify-between items-center mb-4 z-10 relative">
                  <span className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest">SECTOR MAP 04</span>
                  <span className="font-sans text-[10px] font-bold text-[#fa6355] uppercase tracking-widest">{activeReports} ACTIVE</span>
                </div>
                
                {/* Abstract Map Roads */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute top-[30%] left-0 w-full h-[60px] bg-[#bce3c5] border-y-2 border-[#113320]/10" />
                  <div className="absolute top-[65%] left-[10%] w-[90%] h-[40px] bg-[#bce3c5] border-y-2 border-[#113320]/10" />
                  <div className="absolute top-0 left-[25%] w-[50px] h-full bg-[#bce3c5] border-x-2 border-[#113320]/10" />
                  <div className="absolute top-[10%] left-[70%] w-[60px] h-full bg-[#bce3c5] border-x-2 border-[#113320]/10" />
                  
                  {/* Map Pin */}
                  <div className="absolute top-[45%] left-[45%] w-8 h-8 border-2 border-[#fa6355] flex items-center justify-center bg-white shadow-retro animate-pulse">
                    <div className="w-4 h-4 bg-[#fa6355]" />
                  </div>
                </div>

                {/* Coordinate Box */}
                <div className="absolute bottom-4 left-4 border-2 border-[#113320] bg-[#e2f9e1] px-3 py-1 z-10">
                  <span className="font-mono text-[10px] font-bold text-[#113320]">40.7128 N / 74.0060 W</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;