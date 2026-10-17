const Transparency = () => {
  return (
    <section id="transparency" className="relative w-full py-12 sm:py-16 lg:py-24 z-10 border-t-2 border-[#113320]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
            TRANSPARENCY
          </p>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight mb-4">
            NEVER WONDER <br />
            <span className="text-[#fa6355]">WHAT HAPPENED.</span>
          </h2>
          <p className="font-sans text-sm sm:text-lg text-[#113320]/80">
            Every report has a journey. Civics Please keeps you informed at every stage — from the moment you submit an issue until it gets resolved.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">

          {/* LEFT — STATUS TIMELINE */}
          <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#113320] pb-4 sm:pb-6 mb-6 sm:mb-8">
              <div>
                <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase mb-1">
                  REPORT #CP-10482
                </p>
                <h3 className="font-pixel text-lg sm:text-xl text-[#113320] uppercase">
                  BROKEN STREET LIGHT
                </h3>
              </div>
              <span className="mt-3 sm:mt-0 border-2 border-[#113320] bg-[#f4ebd6] px-3 py-1 font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest shadow-[2px_2px_0px_#113320]">
                IN PROGRESS
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              
              {/* Submitted */}
              <div className="relative flex gap-6 pb-12">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-sm font-bold text-[#113320] z-10 shadow-[2px_2px_0px_#113320]">
                    ✓
                  </div>
                  <div className="absolute top-8 bottom-[-12px] w-1 bg-[#113320]" />
                </div>
                <div>
                  <p className="font-pixel text-sm text-[#113320] uppercase mb-1">Report Submitted</p>
                  <p className="font-sans text-xs text-[#113320]/70 mb-2">Your issue was successfully received.</p>
                  <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase">Today · 09:42 AM</p>
                </div>
              </div>

              {/* Reviewed */}
              <div className="relative flex gap-6 pb-12">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-sm font-bold text-[#113320] z-10 shadow-[2px_2px_0px_#113320]">
                    ✓
                  </div>
                  <div className="absolute top-8 bottom-[-12px] w-1 bg-[#113320]" />
                </div>
                <div>
                  <p className="font-pixel text-sm text-[#113320] uppercase mb-1">Report Reviewed</p>
                  <p className="font-sans text-xs text-[#113320]/70 mb-2">The issue has been verified.</p>
                  <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase">Today · 11:18 AM</p>
                </div>
              </div>

              {/* Assigned */}
              <div className="relative flex gap-6 pb-12">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-sm font-bold text-[#113320] z-10 shadow-[2px_2px_0px_#113320]">
                    ✓
                  </div>
                  <div className="absolute top-8 bottom-[-12px] w-1 bg-[#113320]/20" />
                </div>
                <div>
                  <p className="font-pixel text-sm text-[#113320] uppercase mb-1">Assigned</p>
                  <p className="font-sans text-xs text-[#113320]/70 mb-2">The issue has been assigned for resolution.</p>
                  <p className="font-sans text-[10px] font-bold tracking-widest text-[#fa6355] uppercase">Today · 01:35 PM</p>
                </div>
              </div>

              {/* Resolved */}
              <div className="relative flex gap-6">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-[#113320] bg-white text-sm font-bold text-[#113320]/40 z-10">
                    4
                  </div>
                </div>
                <div>
                  <p className="font-pixel text-sm text-[#113320]/40 uppercase mb-1">Resolved</p>
                  <p className="font-sans text-xs text-[#113320]/50">Waiting for the issue to be resolved.</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — EXPLANATION */}
          <div className="flex flex-col justify-center">
            <div className="space-y-10">
              {/* Point 01 */}
              <div className="flex gap-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] font-pixel text-sm text-white shadow-[2px_2px_0px_#113320]">
                  1
                </span>
                <div>
                  <h3 className="font-pixel text-sm text-[#113320] uppercase mb-2">Know what's happening</h3>
                  <p className="font-sans text-sm text-[#113320]/70 leading-relaxed">See exactly where your report is in the resolution process.</p>
                </div>
              </div>

              {/* Point 02 */}
              <div className="flex gap-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] font-pixel text-sm text-white shadow-[2px_2px_0px_#113320]">
                  2
                </span>
                <div>
                  <h3 className="font-pixel text-sm text-[#113320] uppercase mb-2">Get meaningful updates</h3>
                  <p className="font-sans text-sm text-[#113320]/70 leading-relaxed">Receive updates when your report is reviewed, assigned, or resolved.</p>
                </div>
              </div>

              {/* Point 03 */}
              <div className="flex gap-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] font-pixel text-sm text-white shadow-[2px_2px_0px_#113320]">
                  3
                </span>
                <div>
                  <h3 className="font-pixel text-sm text-[#113320] uppercase mb-2">Build trust</h3>
                  <p className="font-sans text-sm text-[#113320]/70 leading-relaxed">Transparent progress creates accountability between citizens and authorities.</p>
                </div>
              </div>
            </div>

            {/* Quote / Statement */}
            <div className="mt-12 border-l-4 border-[#fa6355] pl-6 py-2">
              <p className="font-sans text-lg font-bold italic text-[#113320]">
                "A report shouldn't disappear after you press submit."
              </p>
              <p className="mt-3 font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase">
                CIVICS PLEASE
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Transparency;