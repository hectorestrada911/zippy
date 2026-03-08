/** Apple-style "Performance" block: big headline with gradient + central graphic */
export default function SpeedBlock() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] px-4 py-24 md:py-32" style={{ backgroundColor: "#050506" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
          Less chasing, more closing
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Get paid{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-cyan-400 bg-clip-text text-transparent">
            faster.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
          <strong className="text-white">Resolution follow-ups</strong> at the right time.{" "}
          <strong className="text-white">One-click pay links</strong> in every email.{" "}
          <strong className="text-white">Questions in one place.</strong> So you spend less time in your inbox and more time on work that matters.
        </p>
        {/* Central graphic: lightning in a glow frame */}
        <div className="mt-16 flex justify-center">
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-2xl md:h-48 md:w-48"
            style={{
              boxShadow: "0 0 0 1px rgba(34, 211, 238, 0.3), 0 0 60px rgba(34, 211, 238, 0.15)",
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.06) 0%, transparent 50%)",
            }}
          >
            <svg
              className="h-20 w-20 text-[var(--accent)] md:h-24 md:w-24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <div
              className="absolute inset-0 rounded-2xl opacity-40"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2), transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
