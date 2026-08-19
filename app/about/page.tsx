import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <Navbar />
      
      <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[120px]" />

        <div className="relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <p className="text-sm font-medium tracking-[0.2em] text-green-400 uppercase">
                Who We Are
              </p>
              <span className="h-px w-10 bg-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
              About Civics Please
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/60 max-w-2xl mx-auto">
              Connecting everyday residents directly with city workers to get neighborhood problems fixed faster.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <div className="border border-white/10 bg-[#0b110d] p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">01.</span> Our Mission
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Our goal is to give you an easy way to speak up about issues in your neighborhood. Instead of dealing with endless phone calls or complicated paperwork, our platform lets you report problems in seconds and track them until they are completely solved.
              </p>
            </div>

            <div className="border border-white/10 bg-[#0b110d] p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">02.</span> How It Works
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                We use your phone's location and camera to capture the exact details of a problem. Once submitted, our system automatically organizes your report and sends it straight to the correct city department so repair teams know exactly where to go.
              </p>
            </div>
          </div>

          {/* Origin Section */}
          <div className="border border-green-400/20 bg-green-400/5 p-8 sm:p-12 text-center">
            <h2 className="text-sm font-mono tracking-[0.2em] text-green-400 mb-6 uppercase">
              Why We Built This
            </h2>
            <p className="text-base leading-relaxed text-white/80 max-w-3xl mx-auto">
              Civics Please was created to bridge the gap between people and local authorities. We believe that keeping a city clean, safe, and well-maintained should be simple, transparent, and driven by community action.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}