'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CalculatorInputs,
  CalculatorResults,
  calculateResults,
  encodeCalculatorInputs,
  decodeCalculatorInputs,
  StorageType,
  DailyPicksBand,
} from '@/config/calculator'
import { INDUSTRIES, IndustryId } from '@/config/industries'
import { Confirm } from '@/components/confirm/Confirm'
import {
  Calculator as CalcIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Share2,
  Copy,
  Mail,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-react'

const DEFAULT_INPUTS: CalculatorInputs = {
  industry: 'automotive',
  floorAreaSqFt: 5000,
  ceilingHeightFt: 20,
  skuCount: 5000,
  storageType: 'static-racking',
  dailyPicks: '200-500',
  staffCount: 4,
  rentPerSqFtMonthly: 75,
}

export function CalculatorWizard() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<number>(1)
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [copiedShareLink, setCopiedShareLink] = useState(false)
  const [isUnitMetric, setIsUnitMetric] = useState(false)

  // Restore inputs from base64 query string if present
  useEffect(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      const decoded = decodeCalculatorInputs(dataParam)
      if (decoded) {
        setInputs(decoded)
        setStep(9) // Jump straight to results view
      }
    }
  }, [searchParams])

  // Recalculate results whenever inputs change
  useEffect(() => {
    setResults(calculateResults(inputs))
  }, [inputs])

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const handleShare = () => {
    const encoded = encodeCalculatorInputs(inputs)
    const shareUrl = `${window.location.origin}/tools/calculator?data=${encoded}`
    navigator.clipboard.writeText(shareUrl)
    setCopiedShareLink(true)
    setTimeout(() => setCopiedShareLink(false), 3000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Wizard Progress Bar */}
      {step < 9 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>Step {step} of 8</span>
            <span className="text-orange-400 font-bold">
              {Math.round((step / 8) * 100)}% Completed
            </span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Industry Picker */}
      {step === 1 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 1</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Select Your Industry Sector</h2>
            <p className="text-xs text-zinc-400">Pre-configures storage density presets for your sector</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => {
                  updateInput('industry', ind.id)
                  updateInput('floorAreaSqFt', ind.calculatorPreset.suggestedFloorArea)
                  updateInput('ceilingHeightFt', ind.calculatorPreset.suggestedCeilingHeight)
                  setStep(2)
                }}
                className={`p-5 rounded-xl border text-left transition-all ${
                  inputs.industry === ind.id
                    ? 'bg-orange-500/10 border-orange-500 text-zinc-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="font-mono text-sm font-bold">{ind.name}</div>
                <div className="text-xs text-zinc-400 mt-1">{ind.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Floor Area Input */}
      {step === 2 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 2</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Current Storage Floor Footprint</h2>
            <p className="text-xs text-zinc-400">Enter total floor area currently allocated to static storage & aisles</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-300 font-medium">Floor Area:</label>
              <div className="font-mono text-2xl font-bold text-orange-400">
                {inputs.floorAreaSqFt.toLocaleString()} sq.ft
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={inputs.floorAreaSqFt}
              onChange={(e) => updateInput('floorAreaSqFt', Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-lg bg-orange-500 text-zinc-950 font-mono text-xs font-bold">
              Next Step &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Ceiling Height */}
      {step === 3 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 3</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Clear Ceiling Height</h2>
            <p className="text-xs text-zinc-400">Higher clear height maximizes STOLIFT / STOMAT vertical space savings</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-300 font-medium">Ceiling Height:</label>
              <div className="font-mono text-2xl font-bold text-orange-400">
                {inputs.ceilingHeightFt} ft ({Math.round(inputs.ceilingHeightFt * 0.3048 * 10) / 10} m)
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={inputs.ceilingHeightFt}
              onChange={(e) => updateInput('ceilingHeightFt', Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
            <button onClick={() => setStep(4)} className="px-6 py-2.5 rounded-lg bg-orange-500 text-zinc-950 font-mono text-xs font-bold">
              Next Step &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SKU Count */}
      {step === 4 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 4</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Estimated Active SKU Count</h2>
            <p className="text-xs text-zinc-400">Total distinct part numbers or items stored in this facility</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-300 font-medium">Active SKUs:</label>
              <div className="font-mono text-2xl font-bold text-orange-400">
                {inputs.skuCount.toLocaleString()} SKUs
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="30000"
              step="250"
              value={inputs.skuCount}
              onChange={(e) => updateInput('skuCount', Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(3)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
            <button onClick={() => setStep(5)} className="px-6 py-2.5 rounded-lg bg-orange-500 text-zinc-950 font-mono text-xs font-bold">
              Next Step &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Storage Type */}
      {step === 5 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 5</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Current Storage Method</h2>
            <p className="text-xs text-zinc-400">How is inventory stored today?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'static-racking', label: 'Static Pallet Racking', desc: 'Fixed aisles with forklifts' },
              { id: 'open-shelving', label: 'Open Metal Shelving', desc: 'Manual bin walking' },
              { id: 'floor-stacking', label: 'Floor Pallet Stacking', desc: 'Sprawling floor footprint' },
              { id: 'other', label: 'Mixed / Other', desc: 'Combination storage' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  updateInput('storageType', st.id as StorageType)
                  setStep(6)
                }}
                className={`p-5 rounded-xl border text-left transition-all ${
                  inputs.storageType === st.id
                    ? 'bg-orange-500/10 border-orange-500 text-zinc-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="font-mono text-sm font-bold">{st.label}</div>
                <div className="text-xs text-zinc-400 mt-1">{st.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(4)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Daily Picks */}
      {step === 6 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 6</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Daily Retrieval / Pick Volume</h2>
            <p className="text-xs text-zinc-400">Average number of item picks per day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'under-50', label: '< 50 picks/day' },
              { id: '50-200', label: '50 – 200 picks/day' },
              { id: '200-500', label: '200 – 500 picks/day' },
              { id: '500-1000', label: '500 – 1,000 picks/day' },
              { id: 'over-1000', label: '1,000+ picks/day' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  updateInput('dailyPicks', p.id as DailyPicksBand)
                  setStep(7)
                }}
                className={`p-4 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                  inputs.dailyPicks === p.id
                    ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(5)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Staff Count */}
      {step === 7 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 7</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Stores Staff Count</h2>
            <p className="text-xs text-zinc-400">Number of full-time operators currently assigned to picking and putaway</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-300 font-medium">Operators:</label>
              <div className="font-mono text-2xl font-bold text-orange-400">
                {inputs.staffCount} Staff Members
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={inputs.staffCount}
              onChange={(e) => updateInput('staffCount', Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(6)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
            <button onClick={() => setStep(8)} className="px-6 py-2.5 rounded-lg bg-orange-500 text-zinc-950 font-mono text-xs font-bold">
              Next Step &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: Floor Rent Cost (Optional) */}
      {step === 8 && (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Step 8</span>
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Estimated Floor Cost (Optional)</h2>
            <p className="text-xs text-zinc-400">Monthly facility rent or opportunity cost per sq.ft (INR)</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-300 font-medium">Rent / sq.ft / Month:</label>
              <div className="font-mono text-2xl font-bold text-orange-400">
                ₹{inputs.rentPerSqFtMonthly || 75}
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={inputs.rentPerSqFtMonthly || 75}
              onChange={(e) => updateInput('rentPerSqFtMonthly', Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(7)} className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white">
              &larr; Back
            </button>
            <button onClick={() => setStep(9)} className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-mono text-xs font-extrabold shadow-xl">
              Calculate Reclaim Results &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 9: RESULTS DASHBOARD */}
      {step >= 9 && results && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Bar with Reset & Share */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="font-mono text-sm font-bold text-zinc-100">
                Space Reclaim Calculation Report
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold flex items-center gap-1.5"
              >
                {copiedShareLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedShareLink ? 'Link Copied!' : 'Share Results Link'}</span>
              </button>

              <button
                onClick={() => setStep(1)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recalculate</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Reclaimed Floor Area */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">
                Floor Space Reclaimed
              </span>
              <div className="font-mono text-3xl font-extrabold text-emerald-400">
                {results.spaceReclaimedSqFt.min.toLocaleString()} – {results.spaceReclaimedSqFt.max.toLocaleString()} <span className="text-sm font-normal text-zinc-400">sq.ft</span>
              </div>
              <p className="text-xs text-emerald-500 font-mono">
                {results.spaceReclaimedPct.min}% – {results.spaceReclaimedPct.max}% reduction in required floor area
              </p>
            </div>

            {/* Card 2: Annual Rent Savings */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">
                Est. Annual Rent Saved
              </span>
              <div className="font-mono text-3xl font-extrabold text-orange-400">
                ₹{((results.annualRentSavingsINR.min) / 100000).toFixed(2)} – {((results.annualRentSavingsINR.max) / 100000).toFixed(2)} <span className="text-sm font-normal text-zinc-400">Lakhs</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Based on ₹{inputs.rentPerSqFtMonthly || 75}/sq.ft monthly opportunity cost
              </p>
            </div>

            {/* Card 3: Labour Reduction */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">
                Stores Staff Redeployment
              </span>
              <div className="font-mono text-3xl font-extrabold text-amber-400">
                {results.labourReductionFte.min} – {results.labourReductionFte.max} <span className="text-sm font-normal text-zinc-400">Operators</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Travel-free picking reduces required staff hours
              </p>
            </div>

          </div>

          {/* Recommended ASRS System */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">
                Recommended ASRS Solution
              </span>
              <h3 className="font-mono text-2xl font-bold text-zinc-100">
                STOLIFT Vertical Lift Module + STOMAT Carousel
              </h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
              Based on your input of {inputs.floorAreaSqFt.toLocaleString()} sq.ft storage area with {inputs.ceilingHeightFt}ft clear ceiling height and {inputs.skuCount.toLocaleString()} SKUs.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/get-a-quote?calc_area=${inputs.floorAreaSqFt}&calc_skus=${inputs.skuCount}&calc_industry=${inputs.industry}`}
                className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <span>Request Custom Quote & Engineering Layout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-zinc-500">
            * All figures are indicative estimates. Final space savings confirmed via Pune engineering site survey.
          </div>

        </div>
      )}

    </div>
  )
}
