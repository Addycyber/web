'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Phone, 
  Calculator, 
  Play, 
  ArrowRight,
  Boxes,
  FileText,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { CommandSearch } from '@/components/layout/CommandSearch'

export function Header({ showCustomerLink = false }: { showCustomerLink?: boolean }) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Global Cmd+K / Ctrl+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const cleanWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] py-2.5 shadow-sm'
            : 'bg-[var(--bg)]/80 backdrop-blur-sm border-b border-[var(--border)]/50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo with Dark-Mode Chip */}
            <Link 
              href="/" 
              className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] rounded-lg p-1"
            >
              <div className="p-1 rounded-md bg-white border border-[var(--border)] shadow-xs transition-opacity group-hover:opacity-95">
                <Image
                  src="/SMlogo.png"
                  alt="Space Magnum Equipments Pvt. Ltd. Logo"
                  width={110}
                  height={36}
                  className="h-8 sm:h-9 w-auto object-contain"
                  priority
                />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="font-heading font-bold text-sm tracking-tight text-[var(--brand)]">
                  Space Magnum
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
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
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'products' ? 'rotate-180 text-[var(--accent)]' : ''}`} />
                </button>

                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 w-96 p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-xl grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 border-b border-[var(--border)] flex justify-between items-center">
                      <span>ASRS & Storage Systems</span>
                      <Link href="/products" className="text-[var(--accent)] hover:underline">View All &rarr;</Link>
                    </div>
                    {PRODUCTS.map(product => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {product.id.substring(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                            {product.name}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] line-clamp-1">{product.shortDesc}</p>
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
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Industries
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'industries' ? 'rotate-180 text-[var(--accent)]' : ''}`} />
                </button>

                {activeDropdown === 'industries' && (
                  <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-xl grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 border-b border-[var(--border)]">
                      Industry Applications
                    </div>
                    {INDUSTRIES.map(ind => (
                      <Link
                        key={ind.id}
                        href={`/industries/${ind.id}`}
                        className="group/ind p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors block"
                      >
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/ind:text-[var(--accent)]">
                          {ind.name}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">{ind.tagline}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'resources' ? 'rotate-180 text-[var(--accent)]' : ''}`} />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-xl grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 border-b border-[var(--border)]">
                      Technical Tools & Media
                    </div>
                    {showCustomerLink && (
                      <Link
                        href="/customers"
                        className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                      >
                        <Boxes className="w-5 h-5 text-[var(--accent)]" />
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                            Our Customers
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">Customer organisations by sector</p>
                        </div>
                      </Link>
                    )}

                    <Link
                      href="/gallery"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <ImageIcon className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Installation Gallery
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Verified photos & videos</p>
                      </div>
                    </Link>

                    <Link
                      href="/resources/downloads"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <FileText className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Downloads Centre
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Brochures & spec sheets</p>
                      </div>
                    </Link>

                    <Link
                      href="/tools/calculator"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <Calculator className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Warehouse ROI Calculator
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Calculate space reclaimed</p>
                      </div>
                    </Link>

                    <Link
                      href="/tools/simulator"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <Play className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          3D ASRS Crane Simulator
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Interactive storage crane</p>
                      </div>
                    </Link>

                    <Link
                      href="/proof"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Proof & Certifications
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">TÜV Austria & ISO 9001</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* About Link */}
              <Link 
                href="/about" 
                className="px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                About
              </Link>

              {/* Contact Link */}
              <Link 
                href="/contact" 
                className="px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Contact
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Command-K Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search site (Press Command + K)"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Search className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with engineer on WhatsApp"
                className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[#25D366] hover:bg-[#25D366]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <SiWhatsapp size={17} />
              </a>

              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Primary CTA: Get a Quote */}
              <Link
                href="/get-a-quote"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[var(--bg)] border-b border-[var(--border)] shadow-2xl p-4 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-4 duration-150">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1">
                Products
              </div>
              {PRODUCTS.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] rounded-lg hover:bg-[var(--bg-subtle)]"
                >
                  {product.name}
                </Link>
              ))}
            </div>

            <div className="space-y-1 border-t border-[var(--border)] pt-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1">
                Resources & Tools
              </div>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <ImageIcon className="w-4 h-4 text-[var(--accent)]" />
                <span>Installation Gallery</span>
              </Link>
              {showCustomerLink && (
                <Link
                  href="/customers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
                >
                  <Boxes className="w-4 h-4 text-[var(--accent)]" />
                  <span>Our Customers</span>
                </Link>
              )}
              <Link
                href="/resources/downloads"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                <span>Downloads Centre</span>
              </Link>
              <Link
                href="/tools/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <Calculator className="w-4 h-4 text-[var(--accent)]" />
                <span>Warehouse ROI Calculator</span>
              </Link>
              <Link
                href="/tools/simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <Play className="w-4 h-4 text-[var(--accent)]" />
                <span>3D ASRS Crane Simulator</span>
              </Link>
            </div>

            <div className="space-y-1 border-t border-[var(--border)] pt-3">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-[var(--text)]"
              >
                About Space Magnum
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-[var(--text)]"
              >
                Contact Pune Office
              </Link>
            </div>

            <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">Theme Preference</span>
              <ThemeToggle />
            </div>

            <div className="pt-2">
              <Link
                href="/get-a-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-white text-center font-bold text-sm block shadow-sm"
              >
                Request Quotation
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Search Palette */}
      <CommandSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
