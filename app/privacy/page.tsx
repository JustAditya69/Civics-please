import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <Navbar />
      
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        {/* Ambient Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-500/5 blur-[120px]" />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-16 border-b border-white/10 pb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center justify-center sm:justify-start gap-3">
                <span className="h-px w-10 bg-green-400" />
                <p className="text-sm font-medium tracking-[0.2em] text-green-400 uppercase">
                  Transparency First
                </p>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest bg-white/[0.03] border border-white/10 px-4 py-2">
              Last Updated: August 2026
            </p>
          </div>

          {/* Grid Layout for Policy Points */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            
            {/* 1. What We Collect */}
            <div className="group border border-white/10 bg-[#0b110d] p-8 transition-all hover:border-green-400/30 hover:bg-white/[0.02]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">1. What Information We Collect</h2>
              <p className="text-sm leading-relaxed text-white/60">
                When you report an issue, we only ask for what is absolutely necessary to fix it. This includes your name, email address, the location of the problem, and any photos you choose to upload.
              </p>
            </div>

            {/* 2. Location */}
            <div className="group border border-white/10 bg-[#0b110d] p-8 transition-all hover:border-green-400/30 hover:bg-white/[0.02]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">2. How We Use Your Location</h2>
              <p className="text-sm leading-relaxed text-white/60">
                We only check your location at the exact moment you submit a report so the city knows where to send the repair team. We do not track your phone or follow where you go.
              </p>
            </div>

            {/* 3. Photos */}
            <div className="group border border-white/10 bg-[#0b110d] p-8 transition-all hover:border-green-400/30 hover:bg-white/[0.02]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">3. Your Photos</h2>
              <p className="text-sm leading-relaxed text-white/60">
                Any pictures you take or upload are securely stored. They are only shared with the city workers who need to see the problem in order to fix it safely and quickly.
              </p>
            </div>

            {/* 4. Sharing */}
            <div className="group border border-white/10 bg-[#0b110d] p-8 transition-all hover:border-green-400/30 hover:bg-white/[0.02]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">4. Who Sees Your Data</h2>
              <p className="text-sm leading-relaxed text-white/60">
                We will never sell or make money off your personal information. Your report is only shared with the specific city departments (like Public Works or Sanitation) assigned to solve the issue.
              </p>
            </div>

            {/* 5. Security (Full Width at bottom) */}
            <div className="group border border-white/10 bg-[#0b110d] p-8 transition-all hover:border-green-400/30 hover:bg-white/[0.02] md:col-span-2">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-green-400 transition-colors group-hover:border-green-400/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">5. Keeping Your Information Safe</h2>
              <p className="text-sm leading-relaxed text-white/60 max-w-3xl">
                All your information is locked and encrypted. Only verified city staff and system administrators can log in to see the details of who reported a problem. We take protecting your identity as seriously as we take fixing the community.
              </p>
            </div>
            
          </div>

          {/* Footer Contact Line */}
          <div className="mt-16 flex flex-col items-center justify-center text-center border-t border-white/10 pt-10">
            <p className="text-sm text-white/50 mb-3">
              Still have questions about how we protect your privacy?
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
            >
              Contact US
              <span className="text-lg leading-none">→</span>
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}