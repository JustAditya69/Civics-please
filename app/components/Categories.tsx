import Link from "next/link";

const Categories = () => {
  return (
    <section id="categories" className="relative w-full py-12 sm:py-16 lg:py-20 z-10 border-t-2 border-[#113320]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
              CHOOSE YOUR MISSION
            </p>
            <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#113320] uppercase leading-snug sm:leading-tight">
              WHAT NEEDS FIXING?
            </h2>
          </div>
          <Link href="/report" className="font-sans text-xs font-bold text-[#113320] uppercase tracking-widest mt-4 md:mt-0 hover:text-[#fa6355] transition-colors">
            VIEW ALL CATEGORIES →
          </Link>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* 01 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Roads & Potholes' } }}
            className="group block border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro transition-all hover:shadow-retro-hover"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fa6355" strokeWidth="2" strokeLinecap="square">
                  <path d="M12 2L2 22h20L12 2z"></path>
                  <path d="M12 16v.01"></path>
                  <path d="M12 8v4"></path>
                </svg>
              </div>
              <span className="font-mono text-xs text-[#113320]">01</span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] mb-3 uppercase">
              POTHOLE
            </h3>
            <p className="font-sans text-xs text-[#113320]/70">
              Road damage and unsafe surfaces
            </p>
          </Link>

          {/* 02 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Street Lights' } }}
            className="group block border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro transition-all hover:shadow-retro-hover"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fa6355" strokeWidth="2" strokeLinecap="square">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <span className="font-mono text-xs text-[#113320]">02</span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] mb-3 uppercase">
              STREETLIGHT
            </h3>
            <p className="font-sans text-xs text-[#113320]/70">
              Dark, damaged or flickering lights
            </p>
          </Link>

          {/* 03 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Traffic & Signals' } }}
            className="group block border-2 border-[#113320] bg-[#f4ebd6] p-6 shadow-retro transition-all hover:shadow-retro-hover"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fa6355" strokeWidth="2" strokeLinecap="square">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <span className="font-mono text-xs text-[#113320]">03</span>
            </div>
            <h3 className="font-pixel text-lg text-[#113320] mb-3 uppercase">
              TRAFFIC SIGNAL
            </h3>
            <p className="font-sans text-xs text-[#113320]/70">
              Faulty signals and crossings
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;