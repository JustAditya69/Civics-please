import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          
          {/* Header */}
          <div className="text-center border-b-2 border-[#113320] pb-6 sm:pb-8 mb-8 sm:mb-12">
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
              WHO WE ARE
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight mb-4">
              ABOUT CIVICS PLEASE
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#113320]/70 max-w-2xl mx-auto">
              Connecting everyday residents directly with city workers to get neighborhood problems fixed faster.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
              <h2 className="font-pixel text-lg sm:text-xl text-[#113320] mb-3 sm:mb-4 uppercase">
                <span className="text-[#fa6355]">01.</span> OUR MISSION
              </h2>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80">
                Our goal is to give you an easy way to speak up about issues in your neighborhood. Instead of dealing with endless phone calls or complicated paperwork, our platform lets you report problems in seconds and track them until they are completely solved.
              </p>
            </div>

            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320]">
              <h2 className="font-pixel text-lg sm:text-xl text-[#113320] mb-3 sm:mb-4 uppercase">
                <span className="text-[#fa6355]">02.</span> HOW IT WORKS
              </h2>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80">
                We use your phone's location and camera to capture the exact details of a problem. Once submitted, our system automatically organizes your report and sends it straight to the correct city department so repair teams know exactly where to go.
              </p>
            </div>
          </div>

          {/* Origin Section */}
          <div className="border-2 border-[#113320] bg-[#f4ebd6] p-6 sm:p-10 text-center shadow-retro relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-4 sm:mb-6">
                WHY WE BUILT THIS
              </h2>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#113320] max-w-2xl mx-auto font-bold">
                Civics Please was created to bridge the gap between people and local authorities. We believe that keeping a city clean, safe, and well-maintained should be simple, transparent, and driven by community action.
              </p>
            </div>
            {/* Retro grid background for this block */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,51,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,51,32,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}