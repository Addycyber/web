'use client'

import { Confirm } from '@/components/confirm/Confirm'
import { ShieldCheck, Award, Factory, Users } from 'lucide-react'

export function ProofStrip() {
  return (
    <section className="py-16 bg-zinc-900/80 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
              Engineering Proof & Quality Certification
            </span>
            <h3 className="font-mono text-xl font-bold text-zinc-100">
              Trusted Across Indian Industry
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <Award className="w-5 h-5 text-amber-400" />
              <div className="text-xs font-mono font-bold text-zinc-200">ISO 9001:2015</div>
              <div className="text-[10px] text-zinc-400">TÜV Austria Certified</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <Factory className="w-5 h-5 text-orange-400" />
              <div className="text-xs font-mono font-bold text-zinc-200">Pune Plant</div>
              <div className="text-[10px] text-zinc-400">In-House Manufacturing</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-mono font-bold text-zinc-200">Safety Interlocks</div>
              <div className="text-[10px] text-zinc-400">Photo-electric Light Curtains</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <Users className="w-5 h-5 text-blue-400" />
              <div className="text-xs font-mono font-bold text-zinc-200">Client Roster</div>
              <Confirm id="CLIENT_LOGO_ROSTER" label="Verified Client Logos" compact />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
