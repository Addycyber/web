'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react'
import { haloOf, lineOnTop } from '@/components/asrs-figure/kit/iso-kit'
import { MOVING_PARTS, STATIC_PARTS, TOP_SEAMS, type SolidPart } from '@/components/asrs-figure/geometry'
import { HEIGHT, P, WIDTH } from '@/components/asrs-figure/view'

export interface AsrsAnatomyFigureProps {
  mode?: 'home' | 'interactive'
  className?: string
  initialArea?: number
}

const ANATOMY_PARTS = [
  { id: 'rack-left', number: 1, name: 'Left high-bay rack', desc: 'Six storage levels of bolted steel racking.' },
  { id: 'rack-right', number: 2, name: 'Right high-bay rack', desc: 'Parallel racking across the single aisle.' },
  { id: 'lift-carriage', number: 3, name: 'Stacker lift carriage', desc: 'Guided platform travelling the centre aisle.' },
  { id: 'tray-payload', number: 4, name: 'Carrier tray', desc: 'Material carrier with side walls and end stop.' },
  { id: 'io-station', number: 5, name: 'Operator I/O window', desc: 'Access opening at the operating face.' },
  { id: 'controls', number: 6, name: 'Control pedestal', desc: 'PLC control point with screen and stop.' },
] as const

type PartId = (typeof ANATOMY_PARTS)[number]['id']

const partOf = (id: string): PartId | null => {
  if (id.startsWith('bay-0')) return 'rack-left'
  if (id.startsWith('bay-1')) return 'rack-right'
  if (id.startsWith('moving-tray')) return 'tray-payload'
  if (id.startsWith('elevator-')) return 'lift-carriage'
  if (id.startsWith('operator-')) return 'io-station'
  if (id.startsWith('control-')) return 'controls'
  return null
}

const EXPLODE: Record<PartId, string> = {
  'rack-left': 'translate(-46px, 8px)',
  'rack-right': 'translate(46px, 8px)',
  'lift-carriage': 'translate(0px, -38px)',
  'tray-payload': 'translate(0px, -66px)',
  'io-station': 'translate(0px, 34px)',
  controls: 'translate(30px, 12px)',
}

function Solid({ part }: { part: SolidPart }) {
  return (
    <g className="iso-solid" data-lit={part.lit ? '' : undefined}>
      <path className="iso-fill" d={part.paths.fill} />
      {part.paths.shades.map((shade, index) =>
        shade ? <path key={index} className="iso-shade" data-shade={index} d={shade} /> : null,
      )}
      {part.paths.top ? <path className="iso-top" d={part.paths.top} /> : null}
      {part.paths.crease ? (
        <path className="iso-line iso-crease" data-tone="faint" d={part.paths.crease} />
      ) : null}
      <path className="iso-line iso-edge" data-tone={part.tone} d={part.paths.outline} />
    </g>
  )
}

const AISLE_MARKINGS = [
  lineOnTop([-11, -62], [-11, 62], 12, P),
  lineOnTop([11, -62], [11, 62], 12, P),
]

export function AsrsAnatomyFigure({
  mode = 'home',
  className = '',
  initialArea = 1000,
}: AsrsAnatomyFigureProps) {
  const [isExploded, setIsExploded] = React.useState(false)
  const [activePart, setActivePart] = React.useState<PartId | null>(null)
  const [selectedSystem, setSelectedSystem] = React.useState<'stomat' | 'stolift'>('stolift')
  const [floorAreaInput, setFloorAreaInput] = React.useState<string>(String(initialArea))

  const areaNumber = Math.max(0, Number(floorAreaInput) || 0)
  const SAVING_FRACTION = 0.4
  const savedArea = Math.round(areaNumber * SAVING_FRACTION)
  const asrsArea = Math.round(areaNumber * (1 - SAVING_FRACTION))

  const toggleExplode = () => setIsExploded((prev) => !prev)
  const activeName = activePart ? ANATOMY_PARTS.find((part) => part.id === activePart)?.name : null

  const group = (id: PartId) => {
    const parts =
      id === 'lift-carriage'
        ? MOVING_PARTS.filter((part) => !part.id.startsWith('moving-tray'))
        : id === 'tray-payload'
          ? MOVING_PARTS.filter((part) => part.id.startsWith('moving-tray'))
          : id === 'io-station'
            ? STATIC_PARTS.filter((part) => part.id.startsWith('operator-'))
            : STATIC_PARTS.filter((part) => partOf(part.id) === id)

    const isActive = activePart === id
    return (
      <g
        id={`part-${id}`}
        role="button"
        tabIndex={0}
        aria-label={`${ANATOMY_PARTS.find((part) => part.id === id)?.name}. Press Enter to ${isExploded ? 'assemble' : 'explode'}.`}
        aria-pressed={isActive}
        onMouseEnter={() => setActivePart(id)}
        onMouseLeave={() => setActivePart(null)}
        onFocus={() => setActivePart(id)}
        onBlur={() => setActivePart(null)}
        onClick={toggleExplode}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleExplode()
          }
        }}
        className="cursor-pointer outline-none transition-transform duration-500 ease-out"
        style={{ transform: isExploded ? EXPLODE[id] : 'none' }}
        data-active={isActive ? '' : undefined}
      >
        {parts.map((part) => (
          <Solid key={part.id} part={part} />
        ))}
        {isActive ? (
          <path
            d={parts.map((part) => part.paths.outline).join('')}
            fill="none"
            stroke="#FF6A1A"
            strokeWidth={1.6}
            pointerEvents="none"
          />
        ) : null}
      </g>
    )
  }

  const structural = STATIC_PARTS.filter((part) => partOf(part.id) === null)

  return (
    <div
      className={`anatomy-figure relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] text-white shadow-2xl ${className}`}
      data-theme="dark"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0F1B2D]/80 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Fig 1.0 · ASRS storage anatomy
          </span>
          <span className="hidden font-mono text-xs text-zinc-300 sm:inline">
            {selectedSystem === 'stolift' ? 'STOLIFT vertical shuttle' : 'STOMAT vertical carousel'}
          </span>
        </div>
        <button
          type="button"
          onClick={toggleExplode}
          aria-pressed={isExploded}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
            isExploded
              ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]'
              : 'border-white/20 bg-white/5 text-zinc-300 hover:border-white/40 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{isExploded ? 'Assembled view' : 'Exploded view'}</span>
        </button>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center p-4 sm:p-8">
        <div className="pointer-events-none absolute left-5 top-4 z-10 hidden sm:block">
          <span className="rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur-md">
            {isExploded ? 'Tap a part to assemble' : 'Tap a part to explode'}
          </span>
        </div>

        <div className="pointer-events-none absolute right-5 top-4 z-10">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs text-zinc-300 backdrop-blur-md">
            <span className="text-[var(--accent)]">●</span>
            <span>{activeName ?? 'Ready · 250 / 500 kg tray class'}</span>
          </div>
        </div>

        <div className="iso w-full max-w-3xl">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="iso-svg"
            role="img"
            aria-label="Isometric cutaway of an automated storage and retrieval system: two six-level rack rows, a guided lift carriage with a carrier tray, an operator input/output window, and a control pedestal."
            preserveAspectRatio="xMidYMid meet"
          >
            <path className="iso-halo" d={haloOf({ x: -116, y: -70, w: 232, d: 156, r: 8 }, -10, 8, P)} />
            {structural.map((part) => (
              <Solid key={part.id} part={part} />
            ))}
            {TOP_SEAMS.map((seam) => (
              <path key={seam.id} className="iso-line" data-tone="faint" d={seam.d} />
            ))}
            {AISLE_MARKINGS.map((d, index) => (
              <path key={index} className="iso-line" data-tone="red" data-dashed d={d} />
            ))}
            {group('rack-left')}
            {group('rack-right')}
            {group('io-station')}
            {group('controls')}
            {group('lift-carriage')}
            {group('tray-payload')}
          </svg>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid-cols-6">
          {ANATOMY_PARTS.map((part) => (
            <button
              key={part.id}
              type="button"
              onMouseEnter={() => setActivePart(part.id)}
              onMouseLeave={() => setActivePart(null)}
              onFocus={() => setActivePart(part.id)}
              onBlur={() => setActivePart(null)}
              onClick={() => setActivePart((current) => (current === part.id ? null : part.id))}
              aria-pressed={activePart === part.id}
              className={`flex flex-col rounded-lg border p-2.5 text-left transition-all ${
                activePart === part.id
                  ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-white'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--accent)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] text-white">
                  {part.number}
                </span>
                <span>Part 0{part.number}</span>
              </span>
              <span className="mt-1 line-clamp-1 text-xs font-semibold text-zinc-200">{part.name}</span>
            </button>
          ))}
        </div>
      </div>

      {mode === 'interactive' && (
        <div className="border-t border-white/10 bg-[#0F1B2D]/90 p-6 backdrop-blur-md sm:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  Stated 40% footprint comparison
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">Floor-space reclaim comparison</h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Illustration based on the brochure-stated 40% figure; site-specific layout needs assessment.
                </p>
              </div>

              <div>
                <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-400">
                  Storage system architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSystem('stolift')}
                    aria-pressed={selectedSystem === 'stolift'}
                    className={`rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
                      selectedSystem === 'stolift'
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-md'
                        : 'border-white/15 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    STOLIFT (vertical shuttle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSystem('stomat')}
                    aria-pressed={selectedSystem === 'stomat'}
                    className={`rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
                      selectedSystem === 'stomat'
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-md'
                        : 'border-white/15 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    STOMAT (vertical carousel)
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="area-input"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-400"
                >
                  Current conventional racking area (sq ft)
                </label>
                <div className="relative max-w-xs">
                  <input
                    id="area-input"
                    type="number"
                    min="100"
                    step="50"
                    value={floorAreaInput}
                    onChange={(event) => setFloorAreaInput(event.target.value)}
                    placeholder="1000"
                    className="w-full rounded-lg border border-white/20 bg-black/40 px-3.5 py-2.5 font-mono text-sm text-white focus:border-[var(--accent)] focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-2.5 font-mono text-xs text-zinc-500">sq ft</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-zinc-400">Conventional racking footprint:</span>
                <span className="font-mono text-sm font-bold text-white">
                  {areaNumber.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-zinc-400">Automated Space Magnum footprint:</span>
                <span className="font-mono text-sm font-bold text-[var(--accent)]">
                  {asrsArea.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-white">Stated floor area released:</span>
                </div>
                <span className="font-mono text-lg font-extrabold text-emerald-400">
                  {savedArea.toLocaleString()} sq ft (40%)
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href={`/get-a-quote?product=${selectedSystem}&area=${areaNumber}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  Request facility assessment <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'home' && (
        <div className="grid grid-cols-1 gap-6 border-t border-white/10 bg-[#0F1B2D]/80 p-6 sm:p-8 md:grid-cols-3">
          <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              01 · Vertical density
            </span>
            <h3 className="text-sm font-bold text-white">40% floor space reclaimed</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              The brochure states a 40% floor-space saving through use of available height. Site layouts need assessment.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              02 · Goods to person
            </span>
            <h3 className="text-sm font-bold text-white">Retrieval at the work window</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              A PLC-controlled platform brings the selected tray to the operating window at the operator face.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              03 · Tray classes
            </span>
            <h3 className="text-sm font-bold text-white">250 kg / 500 kg trays</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              STOLIFT tray load classes as listed in the company brochure. Final capacity depends on configuration.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
