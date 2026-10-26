import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '@/lib/company'

export function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B2A4A] text-white transition-colors dark:bg-[#070D18]">
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Discuss your storage requirements
        </h2>
        <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-[#C9D7E8] sm:text-xl">
          {company.about}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
          <Link
            href="/get-a-quote"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-8 py-4 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#9A3412] sm:w-auto"
          >
            <span>Request a quote</span>
            <ArrowRight className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 font-mono text-xs text-[#A2B9D4]">
          <Phone className="h-4 w-4 text-[#FF8A4C]" aria-hidden="true" />
          <span>Call: {company.phones.join(' / ')}</span>
        </div>
      </div>
    </section>
  )
}
