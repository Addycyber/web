'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { company } from '@/lib/company'

export function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#070D18] py-28 sm:py-36 text-white border-t border-white/10">
      {/* Full-Bleed Background Photo with Cinematic Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/img_asrs_13_1600w.webp"
          alt="High-bay ASRS automated storage installation in warehouse"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/85 to-[#070D18]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
            ENGINEERED IN PUNE · SINCE {company.founded}
          </span>
        </div>

        {/* Big Headline */}
        <h2 className="mx-auto max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          Ready to Reclaim 40% of Your Floor Space?
        </h2>

        {/* Supporting Copy */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal text-zinc-300 leading-relaxed">
          Talk to our senior application engineers in Pune to model an automated storage or mobile compactor solution tailored to your component dimensions and plant height.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/get-a-quote"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-[var(--accent-hover)] hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <span>Request a quote</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Real Phone & Email from Company Data */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <span>Call: {company.phones.join(' / ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <span>Email: {company.emails[1] || company.emails[0]}</span>
          </div>
        </div>

      </div>
    </section>
  )
}
