import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'

export const metadata = constructMetadata({
  title: 'Privacy Policy — Space Magnum Equipments',
  description: 'Privacy policy and data protection notice for Space Magnum Equipments Pvt. Ltd. compliant with India DPDP Act 2023.',
  path: '/legal/privacy',
})

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
        <h1 className="font-mono text-3xl font-bold text-zinc-100">Privacy Policy & DPDP Compliance</h1>
        <p>
          {SITE_CONFIG.legalName} ("Space Magnum", "we", "our") is committed to protecting your privacy in compliance with India's Digital Personal Data Protection (DPDP) Act 2023.
        </p>

        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">1. Data Collected</h2>
        <p>
          We collect personal data that you voluntarily provide when submitting engineering quote requests, calculator inputs, or contacting us directly via email or WhatsApp. This includes your name, company name, phone number, email address, and storage facility location.
        </p>

        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">2. Use of Information</h2>
        <p>
          Your data is strictly used for preparing ASRS layout designs, providing commercial quotations, responding to technical queries, and fulfilling legal/contractual obligations. We do not sell or monetize personal data to third parties.
        </p>

        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">3. Data Security & Storage</h2>
        <p>
          All contact details and quote requests are processed securely. You have the right to request deletion or update of your contact record at any time by emailing <span className="font-mono text-orange-400">{SITE_CONFIG.emailSales}</span>.
        </p>
      </div>
    </div>
  )
}
