const PROOF_STATS = [
  {
    targetNum: 40,
    suffix: '%',
    label: 'Floor-Space Saving',
    detail: 'STOMAT & STOLIFT brochure statement',
  },
  {
    staticVal: '250 / 500 kg',
    label: 'Tray Load Classes',
    detail: 'STOLIFT tray load classes',
  },
  {
    staticVal: 'Up to 16 m',
    label: 'Machine Height',
    detail: 'STOPICK AS/RS machine height',
  },
  {
    staticVal: 'Up to 25 m',
    label: 'Storage Height',
    detail: 'STOLONG high-bay storage height',
  },
] as const

export function ProofStrip() {
  return (
    <section
      data-theme="dark"
      className="w-full border-y border-white/10 bg-[#070D18] py-8 text-white sm:py-10"
      aria-label="Brochure-stated product specifications"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Source badge header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Brochure-stated figures
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            Source: Space Magnum Product Catalogue
          </span>
        </div>

        {/* Single Full-Width Row with Hairline Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {PROOF_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-4 sm:py-2 ${
                idx === 0
                  ? 'sm:pr-6 lg:pr-8'
                  : idx === 3
                  ? 'sm:pl-6 lg:pl-8'
                  : 'sm:px-6 lg:px-8'
              }`}
            >
              <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {'targetNum' in stat ? `${stat.targetNum}${stat.suffix}` : stat.staticVal}
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-200">
                {stat.label}
              </div>
              <div className="mt-0.5 font-mono text-xs text-zinc-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
