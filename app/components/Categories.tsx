import Link from "next/link";

const Categories = () => {
  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-black py-20 lg:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[350px] w-[350px] rounded-full bg-green-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-green-400" />
            <p className="text-sm font-medium tracking-[0.2em] text-green-400">
              WHAT CAN YOU REPORT?
            </p>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Every problem
            <br />
            <span className="text-white/40">
              deserves attention.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
            From broken roads to overflowing garbage bins, report the
            everyday problems that affect your community.
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* 01 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Roads & Potholes' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                🛣️
              </div>
              <span className="text-xs tracking-widest text-white/20">
                01
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Roads & Potholes
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report potholes, damaged roads, broken sidewalks,
              and unsafe pathways.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* 02 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Street Lights' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                💡
              </div>
              <span className="text-xs tracking-widest text-white/20">
                02
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Street Lights
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report broken, damaged, or non-functional street
              lights in your area.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* 03 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Garbage & Waste' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                🗑️
              </div>
              <span className="text-xs tracking-widest text-white/20">
                03
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Garbage & Waste
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report overflowing bins, illegal dumping, and
              uncollected waste.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* 04 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Water & Drainage' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                💧
              </div>
              <span className="text-xs tracking-widest text-white/20">
                04
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Water & Drainage
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report water leaks, blocked drains, flooding, and
              drainage problems.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* 05 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Parks & Public Spaces' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                🌳
              </div>
              <span className="text-xs tracking-widest text-white/20">
                05
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Parks & Public Spaces
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report damaged benches, playgrounds, parks, and
              other public spaces.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* 06 */}
          <Link
            href={{ pathname: '/report', query: { category: 'Traffic & Signals' } }}
            className="group block border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.04] text-2xl transition-all duration-300 group-hover:border-green-400/30 group-hover:bg-green-400/10">
                🚦
              </div>
              <span className="text-xs tracking-widest text-white/20">
                06
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-white">
              Traffic & Signals
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/40">
              Report damaged traffic signals, signs, crossings,
              and other road safety issues.
            </p>
            <div className="mt-6 flex items-center text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Report an issue
              <span className="ml-2">→</span>
            </div>
          </Link>

        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            Don't see your issue?
            <span className="ml-1 text-white/70">
              You can still report it.
            </span>
          </p>
          <a
            href="/report"
            className="w-fit border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            Report an Issue
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Categories;