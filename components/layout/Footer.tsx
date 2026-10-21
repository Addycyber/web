import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import { MapPin, Phone, Mail, Award, ShieldCheck, ArrowRight, Linkedin as SiLinkedin } from 'lucide-react'
import { SiWhatsapp, SiYoutube } from '@icons-pack/react-simple-icons'

export function Footer({ showCustomerLink = false }: { showCustomerLink?: boolean }) {
  const currentYear = new Date().getFullYear()
  const cleanWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`

  return (
    <footer className="bg-[#0B2A4A] dark:bg-[#070D18] text-[#C9D7E8] border-t border-white/10 pt-16 pb-24 lg:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Profile & Plant Address */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-md bg-white border border-white/20">
                <Image
                  src="/SMlogo.png"
                  alt="Space Magnum Equipments Pvt. Ltd."
                  width={120}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-[#B0C4DE] max-w-sm leading-relaxed font-body">
              {SITE_CONFIG.legalName} manufactures automated vertical lift modules, high-density order carousels, and heavy-duty industrial storage systems engineered for maximum space reclamation.
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans text-[#C9D7E8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF8A4C] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city} – {SITE_CONFIG.address.pincode}, {SITE_CONFIG.address.state}, {SITE_CONFIG.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF8A4C] shrink-0" />
                <span>{SITE_CONFIG.phonePrimary} / {SITE_CONFIG.phoneSecondary}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF8A4C] shrink-0" />
                <span>{SITE_CONFIG.emailSales}</span>
              </div>
            </div>

            {/* TÜV Austria ISO Certification Chip */}
            <div className="pt-2 flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/12 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF8A4C]" />
                <div>
                  <div className="text-[11px] font-mono text-white font-bold uppercase tracking-wider">
                    TÜV Austria Certified
                  </div>
                  <div className="text-[10px] text-[#A6BCD6]">ISO 9001:2015 Management</div>
                </div>
              </div>
            </div>

            {/* Social & Channel Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Sales Channel"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-[#25D366] flex items-center justify-center transition-colors"
              >
                <SiWhatsapp size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Company Page"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              >
                <SiLinkedin size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-[#FF0000] flex items-center justify-center transition-colors"
              >
                <SiYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Col 3: Storage Systems */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Storage Systems
            </div>
            <ul className="space-y-2 text-xs">
              {PRODUCTS.map(product => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
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

          {/* Col 4: Industry Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Industry Verticals
            </div>
            <ul className="space-y-2 text-xs">
              {INDUSTRIES.map(industry => (
                <li key={industry.id}>
                  <Link
                    href={`/industries/${industry.id}`}
                    className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Tools & Resources */}
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
                <Link href="/resources/downloads" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Downloads Centre
                </Link>
              </li>
              <li>
                <Link href="/tools/calculator" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  Warehouse ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/simulator" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  3D ASRS Crane Simulator
                </Link>
              </li>
              <li>
                <Link href="/proof" className="text-[#C9D7E8] hover:text-[#FF8A4C] transition-colors">
                  ISO & Proof Records
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
          <div>
            &copy; {currentYear} {SITE_CONFIG.legalName}. All rights reserved. Pune, Maharashtra, India.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookie Notice</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
