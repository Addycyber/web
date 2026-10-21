import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'
import { Phone, Mail, MapPin } from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'

export const metadata = constructMetadata({
  title: 'Contact Space Magnum Equipments — Pune ASRS Plant',
  description:
    'Contact Space Magnum Equipments Pvt. Ltd. in Pune, Maharashtra, India. Phone: +91 20 24352812, Email: enquire@spacemagnum.com.',
  path: '/contact',
})

export default function ContactPage() {
  const cleanWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`

  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Plant &amp; Sales Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Contact Space Magnum
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            Reach our application engineering desk directly for site survey requests, CAD layout options, or technical service enquiries.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">Registered Office &amp; Plant</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {SITE_CONFIG.legalName}<br />
              {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city} – {SITE_CONFIG.address.pincode}, {SITE_CONFIG.address.state}, {SITE_CONFIG.address.country}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">Phone Enquiries</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              Primary: {SITE_CONFIG.phonePrimary}<br />
              Secondary: {SITE_CONFIG.phoneSecondary}<br />
              Fax: {SITE_CONFIG.fax}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">Digital Desk</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              Email: {SITE_CONFIG.emailSales}<br />
              WhatsApp: +{SITE_CONFIG.whatsappNumber}
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:underline"
              >
                <SiWhatsapp size={14} />
                <span>Open WhatsApp Chat &rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
