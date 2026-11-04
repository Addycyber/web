import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { MapPin, Phone, Mail, ArrowRight, Linkedin as SiLinkedin } from 'lucide-react'
import { SiWhatsapp, SiYoutube } from '@icons-pack/react-simple-icons'
import { company } from '@/lib/company'

export function Footer({ showCustomerLink = false }: { showCustomerLink?: boolean }) {
  const currentYear = new Date().getFullYear()
  const whatsappUrl = SITE_CONFIG.whatsappUrl

  return (
    <footer className="bg-[#0B2A4A] dark:bg-[#070D18] text-[#C9D7E8] border-t border-white/10 pt-16 pb-24 lg:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 gap-10 pb-12 border-b border-white/10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1 & 2: Brand Profile & Plant Address */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-md bg-white border border-white/20">
                <Image
                  src="/SMlogo.png"
                  alt="Space Magnum Equipments Pvt. Ltd."
                  width={120}
                  height={40}
                  className="object-contain"
                  style={{ width: '120px', height: 'auto' }}
                />
              </div>
            </div>
            
            <p className="text-sm text-[#B0C4DE] max-w-sm leading-relaxed font-body">
              {company.about}
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans text-[#C9D7E8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF8A4C] shrink-0 mt-0.5" />
                <span>
                  {company.unit1}<br />{company.unit2}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF8A4C] shrink-0" />
                <span>{company.phones.join(' / ')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF8A4C] shrink-0" />
                <span>{company.emails.join(' / ')}</span>
              </div>
            </div>

            {/* Social & Channel Links */}
            <div className="flex items-center gap-3 pt-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Sales Channel"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#25D366] transition-colors hover:bg-white/15"
                >
                  <SiWhatsapp size={16} />
                </a>
              )}
              {SITE_CONFIG.linkedin && (
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Company Page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:bg-white/15"
                >
                  <SiLinkedin size={16} />
                </a>
              )}
              {SITE_CONFIG.youtube && (
                <a
                  href={SITE_CONFIG.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#FF0000] transition-colors hover:bg-white/15"
                >
                  <SiYoutube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Storage Systems */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Storage Systems
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/solutions" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/brochure" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Digital Brochure
                </Link>
              </li>
              {PRODUCTS.map(product => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-[#FF8A4C] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  All Products <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Resources & Tools
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/gallery" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Installation Gallery
                </Link>
              </li>
              {showCustomerLink && (
                <li>
                  <Link href="/customers" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                    Our Customers
                  </Link>
                </li>
              )}
              <li>
                <Link href="/tools/calculator" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Floor-Space Illustration
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  ASRS Simulation
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="text-[#FF8A4C] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                  Request Quotation <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Band */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8FA8C7]">
          <div className="space-y-1">
            &copy; {currentYear} {SITE_CONFIG.legalName}. All rights reserved. Pune, Maharashtra, India.
            <div className="text-[10px] tracking-wide text-[#A2B9D4]">{company.tagline}</div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookie Notice</Link>
            <a href="/ASSET-CREDITS.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Asset Credits</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
