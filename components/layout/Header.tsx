'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import { Confirm } from '@/components/confirm/Confirm'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Calculator, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-bold text-zinc-950 text-xl tracking-tighter shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              SM
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold tracking-tight text-zinc-100 group-hover:text-orange-400 transition-colors uppercase">
                  Space Magnum
                </span>
                <Confirm id="LOGO_HIGH_RES" label="Vector Logo" compact />
              </div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 -mt-1">
                Automated Storage Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60">
                Products
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 w-96 p-4 rounded-xl bg-zinc-900/95 border border-zinc-800 backdrop-blur-xl shadow-2xl shadow-black/80 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2 pb-1 border-b border-zinc-800 flex justify-between items-center">
                    <span>ASRS & Storage Systems</span>
                    <Link href="/products" className="text-orange-400 hover:underline">View All &rarr;</Link>
                  </div>
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group/item flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-800/60 transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-mono font-bold text-orange-400 group-hover/item:border-orange-500/50 group-hover/item:bg-orange-500/10">
                        {product.id.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-200 group-hover/item:text-orange-400 flex items-center gap-2">
                          {product.name}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">{product.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60">
                Industries
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'industries' ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {activeDropdown === 'industries' && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-xl bg-zinc-900/95 border border-zinc-800 backdrop-blur-xl shadow-2xl shadow-black/80 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2 pb-1 border-b border-zinc-800">
                    Industrial Solutions
                  </div>
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/industries/${ind.id}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800/60 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors group"
                    >
                      <span>{ind.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-orange-500" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Tools */}
            <Link 
              href="/tools/calculator"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60"
            >
              <Calculator className="w-4 h-4 text-orange-500" />
              <span>Space Calculator</span>
            </Link>

            <Link 
              href="/tools/simulator"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60"
            >
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Live Simulator</span>
            </Link>

            <Link 
              href="/proof"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Engineering & Proof</span>
            </Link>

            <Link 
              href="/about"
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors rounded-md hover:bg-zinc-900/60"
            >
              About
            </Link>
          </nav>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href={`tel:${SITE_CONFIG.phonePrimary}`}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{SITE_CONFIG.phonePrimary}</span>
            </a>

            <Link
              href="/get-a-quote"
              className="px-4 py-2 text-sm font-semibold text-zinc-950 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95"
            >
              Get Engineering Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/get-a-quote"
              className="px-3 py-1.5 text-xs font-bold text-zinc-950 bg-orange-500 rounded-md"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 p-6 space-y-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-5 duration-200">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-orange-500 font-bold tracking-wider">Products</div>
            <div className="grid gap-2 pl-2">
              {PRODUCTS.map(p => (
                <Link 
                  key={p.id} 
                  href={`/products/${p.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-orange-400 py-1"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-orange-500 font-bold tracking-wider">Industries</div>
            <div className="grid gap-2 pl-2">
              {INDUSTRIES.map(i => (
                <Link 
                  key={i.id} 
                  href={`/industries/${i.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-orange-400 py-1"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            <Link 
              href="/tools/calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-orange-400 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20"
            >
              <Calculator className="w-4 h-4" />
              <span>Space Reclaim Calculator</span>
            </Link>
            <Link 
              href="/tools/simulator" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20"
            >
              <Cpu className="w-4 h-4" />
              <span>Live ASRS Simulator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
