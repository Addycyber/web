'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

export function QuoteForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pParam = searchParams.get('product')
  const indParam = searchParams.get('industry')

  const [step, setStep] = React.useState<number>(1)
  const [selectedProduct, setSelectedProduct] = React.useState<string>(() => pParam || 'stolift')
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>(() => indParam || 'automotive')
  const [prevParams, setPrevParams] = React.useState({ p: pParam, ind: indParam })

  const [companyName, setCompanyName] = React.useState('')
  const [contactName, setContactName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [city, setCity] = React.useState('')
  const [timeline, setTimeline] = React.useState('1-3-months')
  const [notes, setNotes] = React.useState(() => {
    const calcArea = searchParams.get('calc_area')
    const calcSkus = searchParams.get('calc_skus')
    if (calcArea || calcSkus) {
      return `Calculator Session Inputs: Floor Area = ${calcArea || 'N/A'} sq.ft, SKUs = ${calcSkus || 'N/A'}`
    }
    return ''
  })
  const [whatsappOptIn, setWhatsappOptIn] = React.useState(true)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  if (pParam !== prevParams.p || indParam !== prevParams.ind) {
    setPrevParams({ p: pParam, ind: indParam })
    if (pParam) setSelectedProduct(pParam)
    if (indParam) setSelectedIndustry(indParam)
  }

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
    } catch {
      setErrorMessage('Connection error. Please try calling our Pune office directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
      
      {/* Step Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
            step === 1 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
          }`}>
            1
          </span>
          <span className={step === 1 ? 'text-[var(--text)] font-bold' : 'text-[var(--text-muted)]'}>
            System &amp; Industry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
            step === 2 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
          }`}>
            2
          </span>
          <span className={step === 2 ? 'text-[var(--text)] font-bold' : 'text-[var(--text-muted)]'}>
            Facility &amp; Contact
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-[var(--danger)] text-[var(--danger)] text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: Product & Industry Selection */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[var(--accent)] font-bold block">
              1. Select Primary ASRS System Required:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <button
                  type="button"
                  key={p.slug}
                  onClick={() => setSelectedProduct(p.slug)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedProduct === p.slug
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text)]'
                      : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="font-mono text-sm font-bold flex items-center justify-between text-[var(--text)]">
                    <span>{p.name}</span>
                    {selectedProduct === p.slug && <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{p.summary}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[var(--accent)] font-bold block">
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
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                      : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
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
            className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span>Proceed to Contact Details &rarr;</span>
          </button>

        </div>
      )}

      {/* STEP 2: Contact & Facility Form (16px inputs to prevent iOS zoom) */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Company Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Tata Motors / Cipla Ltd."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Contact Person Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Mobile / Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Work Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Plant Location / City *</label>
              <input
                type="text"
                required
                placeholder="e.g. Chakan, Pune / Sanand, Gujarat"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text)] font-semibold block">Target Implementation Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              >
                <option value="immediate">Immediate (Within 30 Days)</option>
                <option value="1-3-months">1 – 3 Months</option>
                <option value="3-6-months">3 – 6 Months</option>
                <option value="exploratory">Budgetary / Exploratory</option>
              </select>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--text)] font-semibold block">Specific Requirements / SKU Specs (Optional)</label>
            <textarea
              rows={3}
              placeholder="Provide clear height, weight per tray, or special WMS integration needs..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wa"
              checked={whatsappOptIn}
              onChange={(e) => setWhatsappOptIn(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent)] rounded"
            />
            <label htmlFor="wa" className="text-xs font-mono text-[var(--text-secondary)]">
              Receive layout proposal &amp; quote copy via WhatsApp
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              &larr; Back to Selection
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Engineering Quote Request'}
            </button>
          </div>

        </form>
      )}

    </div>
  )
}
