const Transparency = () => {
  return (
    <section
      id="transparency"
      className="relative w-full overflow-hidden bg-black py-16 lg:py-20"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">

        {/* HEADER */}

        <div className="max-w-3xl">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-green-400" />

            <p className="text-sm font-medium tracking-[0.2em] text-green-400">
              TRANSPARENCY
            </p>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Never wonder
            <br />

            <span className="text-white/40">
              what happened to your report.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
            Every report has a journey. Civics Please keeps you
            informed at every stage — from the moment you submit
            an issue until it gets resolved.
          </p>

        </div>


        {/* MAIN CONTENT */}

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

          {/* LEFT — STATUS TIMELINE */}

          <div className="border border-white/10 bg-white/[0.02] p-7 sm:p-9">

            <div className="flex items-center justify-between border-b border-white/10 pb-6">

              <div>
                <p className="text-xs tracking-[0.2em] text-white/30">
                  REPORT #CP-10482
                </p>

                <h3 className="mt-2 text-xl font-semibold text-white">
                  Broken Street Light
                </h3>
              </div>

              <span className="border border-green-400/20 bg-green-400/5 px-3 py-1.5 text-xs font-medium text-green-400">
                IN PROGRESS
              </span>

            </div>


            {/* Timeline */}

            <div className="mt-8">

              {/* Submitted */}

              <div className="relative flex gap-5 pb-10">

                <div className="relative">

                  <div className="flex h-8 w-8 items-center justify-center border border-green-400 bg-green-400 text-sm font-bold text-black">
                    ✓
                  </div>

                  <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-green-400/30" />

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    Report Submitted
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Your issue was successfully received.
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    Today · 09:42 AM
                  </p>

                </div>

              </div>


              {/* Reviewed */}

              <div className="relative flex gap-5 pb-10">

                <div className="relative">

                  <div className="flex h-8 w-8 items-center justify-center border border-green-400 bg-green-400 text-sm font-bold text-black">
                    ✓
                  </div>

                  <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-green-400/30" />

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    Report Reviewed
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    The issue has been verified.
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    Today · 11:18 AM
                  </p>

                </div>

              </div>


              {/* Assigned */}

              <div className="relative flex gap-5 pb-10">

                <div className="relative">

                  <div className="flex h-8 w-8 items-center justify-center border border-green-400 bg-green-400 text-sm font-bold text-black">
                    ✓
                  </div>

                  <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-white/10" />

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    Assigned
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    The issue has been assigned for resolution.
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    Today · 01:35 PM
                  </p>

                </div>

              </div>


              {/* Resolved */}

              <div className="relative flex gap-5">

                <div>

                  <div className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/[0.03] text-sm text-white/20">
                    4
                  </div>

                </div>

                <div>

                  <p className="text-sm font-semibold text-white/40">
                    Resolved
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Waiting for the issue to be resolved.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT — EXPLANATION */}

          <div>

            <div className="space-y-8">

              {/* Point 01 */}

              <div className="flex gap-5">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-xs font-semibold text-green-400">
                  01
                </span>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    Know what's happening
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/40">
                    See exactly where your report is in the
                    resolution process.
                  </p>

                </div>

              </div>


              {/* Point 02 */}

              <div className="flex gap-5">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-xs font-semibold text-green-400">
                  02
                </span>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    Get meaningful updates
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/40">
                    Receive updates when your report is reviewed,
                    assigned, or resolved.
                  </p>

                </div>

              </div>


              {/* Point 03 */}

              <div className="flex gap-5">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-xs font-semibold text-green-400">
                  03
                </span>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    Build trust
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/40">
                    Transparent progress creates accountability
                    between citizens and authorities.
                  </p>

                </div>

              </div>

            </div>


            {/* Quote / Statement */}

            <div className="mt-10 border-l border-green-400/50 pl-5">

              <p className="text-lg leading-8 text-white/60">
                "A report shouldn't disappear after you press
                submit."
              </p>

              <p className="mt-3 text-xs tracking-[0.15em] text-green-400">
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