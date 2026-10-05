'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  User,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

export function QuoteForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<number>(1)
  const [selectedProduct, setSelectedProduct] = useState<string>('stolift')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('automotive')

  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [timeline, setTimeline] = useState('1-3-months')
  const [notes, setNotes] = useState('')
  const [whatsappOptIn, setWhatsappOptIn] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Pre-fill from URL params
  useEffect(() => {
    const p = searchParams.get('product')
    const ind = searchParams.get('industry')
    const calcArea = searchParams.get('calc_area')
    const calcSkus = searchParams.get('calc_skus')

    if (p) setSelectedProduct(p)
    if (ind) setSelectedIndustry(ind)
    if (calcArea || calcSkus) {
      setNotes(`Calculator Session Inputs: Floor Area = ${calcArea || 'N/A'} sq.ft, SKUs = ${calcSkus || 'N/A'}`)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const payload = {
        productId: selectedProduct,
        industryId: selectedIndustry,
        companyName,
        contactName,
        phone,
        email,
        city,
        timeline,
        notes,
        whatsappOptIn,
        sourceUrl: window.location.href,
        intentTag: 'high-intent:quote-form',
      }

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push(`/get-a-quote/thank-you?leadId=${data.leadId}`)
      } else {
        setErrorMessage(data.message || 'Please check all required fields and try again.')
      }
    } catch (err) {
      setErrorMessage('Connection error. Please try calling us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
      
      {/* Step Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-orange-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
            1
          </span>
          <span className={step === 1 ? 'text-zinc-100 font-bold' : 'text-zinc-400'}>System & Industry</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-orange-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
            2
          </span>
          <span className={step === 2 ? 'text-zinc-100 font-bold' : 'text-zinc-400'}>Facility & Contact</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: Product & Industry Selection */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-orange-400 font-bold block">
              1. Select Primary ASRS System Required:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedProduct === p.id
                      ? 'bg-orange-500/10 border-orange-500 text-zinc-100'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-mono text-sm font-bold flex items-center justify-between">
                    <span>{p.name}</span>
                    {selectedProduct === p.id && <CheckCircle2 className="w-4 h-4 text-orange-500" />}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{p.shortDesc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-orange-400 font-bold block">
              2. Select Your Industry Sector:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  type="button"
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`p-3 rounded-lg border font-mono text-xs font-semibold text-center transition-all ${
                    selectedIndustry === ind.id
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                  }`}
                >
                  {ind.shortName}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Proceed to Contact Details &rarr;</span>
          </button>

        </div>
      )}

      {/* STEP 2: Contact & Facility Form */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Company Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Tata Motors / Foxconn India"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Contact Person Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Mobile / Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Work Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Plant Location / City *</label>
              <input
                type="text"
                required
                placeholder="e.g. Chakan, Pune / Sanand, Gujarat"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">Target Implementation Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="immediate">Immediate (Within 30 Days)</option>
                <option value="1-3-months">1 – 3 Months</option>
                <option value="3-6-months">3 – 6 Months</option>
                <option value="exploratory">Budgetary / Exploratory</option>
              </select>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-300 font-semibold block">Specific Requirements / SKU Specs (Optional)</label>
            <textarea
              rows={3}
              placeholder="Provide floor height, weight per tray, or special integration needs..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wa"
              checked={whatsappOptIn}
              onChange={(e) => setWhatsappOptIn(e.target.checked)}
              className="w-4 h-4 accent-orange-500 rounded"
            />
            <label htmlFor="wa" className="text-xs font-mono text-zinc-300">
              Receive layout proposal & quote copy via WhatsApp
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white"
            >
              &larr; Back to Selection
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-mono text-xs font-extrabold shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Engineering Quote Request'}
            </button>
          </div>

        </form>
      )}

    </div>
  )
}
