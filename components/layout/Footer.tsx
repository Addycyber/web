import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import { Confirm } from '@/components/confirm/Confirm'
import { MapPin, Phone, Mail, Award, ShieldCheck } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0A0D14] text-[#6B7FA0] border-t border-white/6 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Company Profile & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/SMlogo.png"
                alt="Space Magnum Equipments Pvt. Ltd."
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <p className="text-sm text-[#6B7FA0] max-w-sm leading-relaxed font-body">
              {SITE_CONFIG.positioningLine}
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city} – {SITE_CONFIG.address.pincode}, {SITE_CONFIG.address.state}, {SITE_CONFIG.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{SITE_CONFIG.phonePrimary} / {SITE_CONFIG.phoneSecondary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{SITE_CONFIG.emailSales}</span>
              </div>
            </div>

            {/* Certifications Badge */}
            <div className="pt-4 flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-[#151B25] border border-white/8 flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-[11px] font-mono text-white font-semibold uppercase">
                    TÜV Austria Certified
                  </div>
                  <div className="text-[10px] text-[#6B7FA0]">ISO 9001:2015 Management</div>
                </div>
              </div>
              <Confirm id="TUV_SCOPE_CERT" label="Cert Number & Scope" compact />
            </div>
          </div>

          {/* Col 2: Product Systems */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-medium">
              ASRS Systems
            </h3>
            <ul className="space-y-2 text-sm">
              {PRODUCTS.map(p => (
                <li key={p.id}>
                  <Link 
                    href={`/products/${p.id}`}
                    className="hover:text-orange-400 transition-colors text-[#6B7FA0] hover:text-orange-400"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-xs text-orange-500 hover:underline">
                  All Systems &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry Applications */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-medium">
              Industries
            </h3>
            <ul className="space-y-2 text-sm">
              {INDUSTRIES.map(i => (
                <li key={i.id}>
                  <Link 
                    href={`/industries/${i.id}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Interactive Tools & Corporate */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold">
              Tools & Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/calculator" className="hover:text-orange-400 transition-colors">
                  Space Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/simulator" className="hover:text-orange-400 transition-colors">
                  Live ASRS Simulator
                </Link>
              </li>
              <li>
                <Link href="/proof" className="hover:text-orange-400 transition-colors">
                  Engineering Proof
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="text-orange-400 font-semibold hover:underline">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7FA0] font-mono">
          <div>
            &copy; {currentYear} {SITE_CONFIG.legalName}. All rights reserved. Manufactured in Pune, Maharashtra, India.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-zinc-400 transition-colors">
              Terms of Business
            </Link>
            <Link href="/legal/cookies" className="hover:text-zinc-400 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
