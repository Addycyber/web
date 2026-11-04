import { AsrsAnatomyFigure } from '@/components/anatomy'
import { getProduct } from '@/lib/company'

export function AsrsInMotionSection() {
  const stopick = getProduct('stopick')
  if (!stopick) throw new Error('Company data must include STOPICK.')

  return (
    <section data-theme="dark" className="w-full border-b border-white/10 bg-[#070D18] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              AS/RS · Anatomy
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Inside the high bay
          </h2>
          <p className="text-base font-normal leading-relaxed text-zinc-400 sm:text-lg">
            {stopick.summary}
          </p>
        </div>

        <AsrsAnatomyFigure mode="home" />
      </div>
    </section>
  )
}
