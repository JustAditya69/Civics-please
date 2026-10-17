const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative w-full py-10 sm:py-16 lg:py-24 z-10 border-t-2 border-b-2 border-[#113320]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          
          {/* STEP 01 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-lg text-[#fa6355]">01</span>
              <span className="text-2xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="square">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] uppercase">
              PIN THE SPOT
            </h3>
            <p className="font-sans text-sm text-[#113320]/70">
              Use your location or place the marker yourself.
            </p>
          </div>

          {/* STEP 02 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-lg text-[#fa6355]">02</span>
              <span className="text-2xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="square">
                  <rect x="3" y="8" width="18" height="14" rx="2" ry="2"></rect>
                  <path d="M7 8v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                  <circle cx="12" cy="14" r="3"></circle>
                </svg>
              </span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] uppercase">
              ADD EVIDENCE
            </h3>
            <p className="font-sans text-sm text-[#113320]/70">
              A clear photo helps the crew prepare.
            </p>
          </div>

          {/* STEP 03 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-lg text-[#fa6355]">03</span>
              <span className="text-2xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="square">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] uppercase">
              FOLLOW THE FIX
            </h3>
            <p className="font-sans text-sm text-[#113320]/70">
              Save your reference and watch the status change.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;