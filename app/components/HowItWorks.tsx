const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-black py-20 lg:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-green-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-green-400" />

            <p className="text-sm font-medium tracking-[0.2em] text-green-400">
              HOW IT WORKS
            </p>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            From everyday problems
            <br />

            <span className="text-white/40">
              to real change.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
            Civics Please makes it simple to report problems in your
            community, follow their progress, and make sure your voice
            leads to action.
          </p>

        </div>


        {/* STEPS */}

        <div className="relative mt-14">

          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-10 hidden lg:block">

            <div className="h-px w-full bg-white/10" />

            {/* Animated Bold Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 animate-[moveArrow_6s_linear_infinite]">
              <div className="h-4 w-4 rotate-45 border-r-4 border-t-4 border-green-400" />
            </div>

          </div>


          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* STEP 01 */}

            <div className="group relative">

              <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center border border-green-400/30 bg-black text-xl font-semibold text-green-400 transition-all duration-300 group-hover:border-green-400 group-hover:bg-green-400 group-hover:text-black">
                01
              </div>

              <p className="text-xs font-medium tracking-[0.2em] text-white/30">
                SPOT IT
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                See a problem?
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">
                Notice a pothole, broken street light, overflowing
                garbage, water leak, or another civic issue?
              </p>

            </div>


            {/* STEP 02 */}

            <div className="group relative">

              <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center border border-green-400/30 bg-black text-xl font-semibold text-green-400 transition-all duration-300 group-hover:border-green-400 group-hover:bg-green-400 group-hover:text-black">
                02
              </div>

              <p className="text-xs font-medium tracking-[0.2em] text-white/30">
                REPORT IT
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                Tell us about it.
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">
                Upload a photo, describe the issue, and share its
                location. Reporting should take less than a minute.
              </p>

            </div>


            {/* STEP 03 */}

            <div className="group relative">

              <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center border border-green-400/30 bg-black text-xl font-semibold text-green-400 transition-all duration-300 group-hover:border-green-400 group-hover:bg-green-400 group-hover:text-black">
                03
              </div>

              <p className="text-xs font-medium tracking-[0.2em] text-white/30">
                TRACK IT
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                Follow the progress.
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">
                Get updates as your report moves from submitted to
                reviewed, assigned, and eventually resolved.
              </p>

            </div>


            {/* STEP 04 */}

            <div className="group relative">

              <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center border border-green-400/30 bg-black text-xl font-semibold text-green-400 transition-all duration-300 group-hover:border-green-400 group-hover:bg-green-400 group-hover:text-black">
                04
              </div>

              <p className="text-xs font-medium tracking-[0.2em] text-white/30">
                MAKE AN IMPACT
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                See the difference.
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">
                When an issue gets fixed, everyone benefits. Your
                report becomes a small step toward a better community.
              </p>

            </div>

          </div>

        </div>


        {/* CTA */}

        <div className="mt-16 border border-white/10 bg-white/[0.03] px-8 py-8 backdrop-blur-md md:flex md:items-center md:justify-between">

          <div>

            <p className="text-sm font-medium text-green-400">
              READY TO MAKE A DIFFERENCE?
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Your next report could make a difference.
            </h3>

          </div>

          <a
            href="/report"
            className="mt-5 inline-flex border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black md:mt-0"
          >
            Report an Issue
            <span className="ml-2">
              →
            </span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;