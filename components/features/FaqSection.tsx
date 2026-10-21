'use client'

import * as React from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  title?: string
  subtitle?: string
  faqs: FaqItem[]
  className?: string
}

export function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about Space Magnum ASRS commissioning, site requirements, and integration.',
  faqs,
  className = '',
}: FaqSectionProps) {
  const [openIndices, setOpenIndices] = React.useState<number[]>([0])

  const toggleIndex = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  // Generate FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className={`py-16 md:py-20 bg-[var(--bg-subtle)] border-t border-[var(--border)] transition-colors ${className}`}>
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Operational FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx)

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--text)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--accent)]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
