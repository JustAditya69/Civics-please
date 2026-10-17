import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-10 sm:mb-16 border-b-2 border-[#113320] pb-6 sm:pb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#fa6355] uppercase mb-3 sm:mb-4">
                TRANSPARENCY FIRST
              </p>
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#113320] uppercase leading-snug sm:leading-tight">
                PRIVACY POLICY
              </h1>
            </div>
            <p className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-widest bg-white border-2 border-[#113320] px-4 py-2 shadow-[2px_2px_0px_#113320] w-fit mx-auto sm:mx-0">
              LAST UPDATED: AUGUST 2026
            </p>
          </div>

          {/* Grid Layout for Policy Points */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* 1. What We Collect */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] flex gap-4 sm:gap-6">
              <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#f4ebd6] text-[#113320]">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 sm:mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">1. WHAT WE COLLECT</h2>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80 font-medium">
                  When you report an issue, we only ask for what is absolutely necessary to fix it. This includes your name, email address, the location of the problem, and any photos you choose to upload.
                </p>
              </div>
            </div>

            {/* 2. Location */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] flex gap-4 sm:gap-6">
              <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#bce3c5] text-[#113320]">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M12 2L2 22h20L12 2z" />
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M12 16v.01" />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 sm:mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">2. YOUR LOCATION</h2>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80 font-medium">
                  We only check your location at the exact moment you submit a report so the city knows where to send the repair team. We do not track your phone or follow where you go.
                </p>
              </div>
            </div>

            {/* 3. Photos */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] flex gap-4 sm:gap-6">
              <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#e2f9e1] text-[#113320]">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 sm:mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">3. PHOTO UPLOADS</h2>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80 font-medium">
                  Any pictures you take or upload are securely stored. They are only shared with the city workers who need to see the problem in order to fix it safely and quickly.
                </p>
              </div>
            </div>

            {/* 4. Sharing */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] flex gap-4 sm:gap-6">
              <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#fa6355] text-white">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 sm:mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">4. WHO SEES YOUR DATA</h2>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80 font-medium">
                  We will never sell or make money off your personal information. Your report is only shared with the specific city departments (like Public Works or Sanitation) assigned to solve the issue.
                </p>
              </div>
            </div>

            {/* 5. Security */}
            <div className="border-2 border-[#113320] bg-white p-5 sm:p-8 shadow-[5px_5px_0px_#113320] sm:shadow-[8px_8px_0px_#113320] flex gap-4 sm:gap-6">
              <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border-2 border-[#113320] bg-[#113320] text-white">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 sm:mb-3 font-pixel text-base sm:text-lg text-[#113320] uppercase">5. KEEPING YOU SAFE</h2>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#113320]/80 font-medium">
                  All your information is locked and encrypted. Only verified city staff and system administrators can log in to see the details of who reported a problem. We take protecting your identity as seriously as we take fixing the community.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Contact Line */}
          <div className="mt-16 flex flex-col items-center justify-center text-center border-t-2 border-[#113320]/20 pt-10">
            <p className="font-sans text-sm font-bold text-[#113320]/70 mb-4">
              Still have questions about how we protect your privacy?
            </p>
            <a 
              href="/contact" 
              className="inline-block border-2 border-[#113320] bg-white px-8 py-3 font-sans text-xs font-bold text-[#113320] uppercase shadow-retro hover:shadow-retro-hover transition-shadow"
            >
              CONTACT US →
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}