import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          
          {/* Header Section */}
          <div className="mb-10 sm:mb-16 md:mb-20 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
                PLATFORM FEATURES
              </p>
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight">
                EVERYTHING YOU NEED TO <br />
                <span className="text-[#fa6355]">IMPROVE YOUR COMMUNITY.</span>
              </h1>
            </div>
            <div>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#113320]/70">
                Civics Please connects everyday residents directly with municipal authorities. Built for speed, clarity, and transparency so reported problems actually get solved.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                01
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#f4ebd6] text-xl sm:text-2xl">
                📍
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Smart Location
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                Automatically pinpoints exact map coordinates and matches them with street addresses so repair crews never have trouble finding the issue.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                02
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-xl sm:text-2xl">
                📷
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Photo Uploads
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                Easily attach photos of potholes, broken streetlights, or garbage buildup straight from your phone or camera to show the exact damage.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                03
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#e2f9e1] text-xl sm:text-2xl">
                ⚡
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Live Tracking
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                Never wonder what happened to your report. Track its progress in real-time from review to in-progress and complete resolution.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                04
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#fa6355] text-xl sm:text-2xl text-white">
                🏛️
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Direct Routing
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                Admins can review submitted reports and dispatch them directly to the right municipal department, like sanitation or public works.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                05
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#f4ebd6] text-xl sm:text-2xl">
                🔒
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Protected Privacy
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                Your personal contact details stay hidden from the public. Only authorized administrators can view information needed to resolve issues.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] relative">
              <div className="absolute top-0 right-0 p-4 font-pixel text-sm text-[#113320]/20">
                06
              </div>
              <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-xl sm:text-2xl">
                📊
              </div>
              <h3 className="mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">
                Impact Scoreboard
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/70">
                See real numbers on the front page showing total reports filed and resolved, proving that speaking up creates visible change.
              </p>
            </div>

          </div>

          {/* Call to Action Banner */}
          <div className="mt-12 sm:mt-16 md:mt-20 border-2 sm:border-4 border-[#113320] bg-[#e2f9e1] p-6 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-retro">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left max-w-xl">
              <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[#113320] uppercase leading-snug sm:leading-tight">
                READY TO IMPROVE YOUR NEIGHBORHOOD?
              </h2>
              <p className="font-sans text-xs sm:text-sm font-bold text-[#113320]/80">
                File your first issue in less than two minutes and help make your city cleaner and safer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <Link 
                href="/report" 
                className="w-full md:w-auto text-center border-2 border-[#113320] bg-[#fa6355] text-white px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-[4px_4px_0px_#113320] hover:shadow-[6px_6px_0px_#113320] min-h-[44px]"
              >
                REPORT AN ISSUE →
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}