import Link from 'next'
import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Contact Space Magnum Equipments — Pune ASRS Plant',
  description:
    'Contact Space Magnum Equipments Pvt. Ltd. in Pune, Maharashtra, India. Phone: +91 20 24352812, Email: enquire@spacemagnum.com.',
  path: '/contact',
})

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`

  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Direct Plant & Sales Contact</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Space Magnum
          </h1>
          <p className="font-sans text-zinc-400 text-lg leading-relaxed">
            Reach our application engineering desk directly for site survey requests, CAD layout options, or technical service enquiries.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <MapPin className="w-6 h-6 text-orange-500" />
            <h3 className="font-mono text-lg font-bold text-zinc-100">Registered Office & Plant</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {SITE_CONFIG.legalName}<br />
              {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city} – {SITE_CONFIG.address.pincode}, {SITE_CONFIG.address.state}, {SITE_CONFIG.address.country}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <Phone className="w-6 h-6 text-orange-500" />
            <h3 className="font-mono text-lg font-bold text-zinc-100">Phone Enquiries</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Primary: {SITE_CONFIG.phonePrimary}<br />
              Secondary: {SITE_CONFIG.phoneSecondary}<br />
              Fax: {SITE_CONFIG.fax}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <Mail className="w-6 h-6 text-orange-500" />
            <h3 className="font-mono text-lg font-bold text-zinc-100">Digital Desk</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Email: {SITE_CONFIG.emailSales}<br />
              WhatsApp: +{SITE_CONFIG.whatsappNumber}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline pt-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Start WhatsApp Chat &rarr;
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
