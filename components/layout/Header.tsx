'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Calculator, 
  Play, 
  ArrowRight,
  Boxes,
  FileText,
  Image as ImageIcon,
} from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { CommandSearch } from '@/components/layout/CommandSearch'

type NavDropdownProps = {
  id: string
  label: string
  expanded: boolean
  linkClassName: string
  onOpen: () => void
  onToggle: () => void
  onClose: () => void
  children: React.ReactNode
}

function NavDropdown({
  id,
  label,
  expanded,
  linkClassName,
  onOpen,
  onToggle,
  onClose,
  children,
}: NavDropdownProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const closeTimer = React.useRef<number | null>(null)
  const [focusedWithin, setFocusedWithin] = React.useState(false)

  React.useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
  }, [])

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        clearCloseTimer()
        closeTimer.current = window.setTimeout(onOpen, 120)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return
        if (focusedWithin) return
        clearCloseTimer()
        closeTimer.current = window.setTimeout(onClose, 150)
      }}
      onFocusCapture={() => setFocusedWithin(true)}
      onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setFocusedWithin(false)
          onClose()
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        clearCloseTimer()
        onClose()
        buttonRef.current?.focus()
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          clearCloseTimer()
          onToggle()
        }}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return
          event.preventDefault()
          clearCloseTimer()
          onOpen()
          window.requestAnimationFrame(() => {
            wrapperRef.current
              ?.querySelector<HTMLElement>(`#${id} a, #${id} button, #${id} [tabindex]:not([tabindex="-1"])`)
              ?.focus()
          })
        }}
        aria-expanded={expanded}
        aria-controls={expanded ? id : undefined}
        className={`flex items-center gap-1.5 ${linkClassName}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180 text-[var(--accent)]' : ''}`} />
      </button>
      {expanded && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div id={id} onClick={onClose}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export function Header({ showCustomerLink = false }: { showCustomerLink?: boolean }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuState, setMobileMenuState] = React.useState({ pathname, open: false })
  const [dropdownState, setDropdownState] = React.useState<{ pathname: string; value: string | null }>({
    pathname,
    value: null,
  })
  const mobileMenuOpen = mobileMenuState.pathname === pathname && mobileMenuState.open
  const activeDropdown = dropdownState.pathname === pathname ? dropdownState.value : null
  const setMobileMenuOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (value) => setMobileMenuState((previous) => ({
      pathname,
      open: typeof value === 'function'
        ? value(previous.pathname === pathname ? previous.open : false)
        : value,
    })),
    [pathname],
  )
  const setActiveDropdown = React.useCallback<React.Dispatch<React.SetStateAction<string | null>>>(
    (value) => setDropdownState((previous) => ({
      pathname,
      value: typeof value === 'function'
        ? value(previous.pathname === pathname ? previous.value : null)
        : value,
    })),
    [pathname],
  )
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const isSolidHeader = isScrolled || !isHome
  const navLinkClass = `rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${
    isSolidHeader
      ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'
      : 'text-zinc-300 hover:bg-white/10 hover:text-white'
  }`

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  // Close an open dropdown when clicking outside the desktop nav
  React.useEffect(() => {
    if (!activeDropdown) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setActiveDropdown(null)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeDropdown, setActiveDropdown])

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

  const whatsappUrl = SITE_CONFIG.whatsappUrl

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolidHeader
            ? 'bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] py-2.5 shadow-lg text-[var(--text)]'
            : 'bg-transparent border-b border-transparent py-3 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo without boxed outline */}
            <Link 
              href="/" 
              className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] rounded-lg"
            >
              <div className="transition-opacity group-hover:opacity-90">
                <Image
                  src="/SMlogo.png"
                  alt="Space Magnum Equipments Pvt. Ltd. Logo"
                  width={128}
                  height={64}
                  className="object-contain drop-shadow-sm brightness-110"
                  style={{ width: 128, height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className={`font-heading font-bold text-sm tracking-tight ${isSolidHeader ? 'text-[var(--text)]' : 'text-white'}`}>
                  Space Magnum
                </span>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${isSolidHeader ? 'text-[var(--text-muted)]' : 'text-zinc-400'}`}>
                  Automated Storage Systems
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-1">
              
              {/* Products Dropdown */}
              <NavDropdown
                id="products-menu"
                label="Products"
                expanded={activeDropdown === 'products'}
                linkClassName={navLinkClass}
                onOpen={() => setActiveDropdown('products')}
                onToggle={() => setActiveDropdown((current) => current === 'products' ? null : 'products')}
                onClose={() => setActiveDropdown((current) => current === 'products' ? null : current)}
              >
                <div className="w-96 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3 shadow-xl grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 border-b border-[var(--border)] flex justify-between items-center">
                      <span>ASRS & Storage Systems</span>
                      <Link href="/products" className="text-[var(--accent)] hover:underline">View All &rarr;</Link>
                    </div>
                    {PRODUCTS.map(product => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {product.slug.substring(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                            {product.name}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] line-clamp-1">{product.summary}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </NavDropdown>

              <Link
                href="/solutions"
                className={navLinkClass}
              >
                Solutions
              </Link>

              {/* Resources Dropdown */}
              <NavDropdown
                id="resources-menu"
                label="Resources"
                expanded={activeDropdown === 'resources'}
                linkClassName={navLinkClass}
                onOpen={() => setActiveDropdown('resources')}
                onToggle={() => setActiveDropdown((current) => current === 'resources' ? null : 'resources')}
                onClose={() => setActiveDropdown((current) => current === 'resources' ? null : current)}
              >
                <div className="w-80 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3 shadow-xl grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
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
                        <p className="text-xs text-[var(--text-muted)]">Product imagery and installation videos</p>
                      </div>
                    </Link>

                    <Link
                      href="/brochure"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <FileText className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Digital Brochure
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
                          Floor-Space Illustration
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Brochure-based calculation</p>
                      </div>
                    </Link>

                    <Link
                      href="/simulator"
                      className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-3 group/item"
                    >
                      <Play className="w-5 h-5 text-[var(--accent)]" />
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          ASRS Simulation
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Interactive storage crane</p>
                      </div>
                    </Link>

                </div>
              </NavDropdown>

              {/* About Link */}
              <Link 
                href="/about" 
                className={navLinkClass}
              >
                About
              </Link>

              {/* Contact Link */}
              <Link 
                href="/contact" 
                className={navLinkClass}
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
                className={`hidden sm:inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${
                  isSolidHeader
                    ? 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                    : 'border-white/20 bg-black/30 text-zinc-300 hover:border-white/40 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Search...</span>
                <kbd className="rounded border border-white/15 bg-black/30 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              {/* WhatsApp direct */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Space Magnum on WhatsApp"
                  className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[#25D366] transition-colors hover:bg-[#25D366]/10 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] md:inline-flex"
                >
                  <SiWhatsapp size={17} />
                </a>
              )}

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
                ref={mobileMenuButtonRef}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuOpen ? 'mobile-navigation' : undefined}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] lg:hidden ${
                  isSolidHeader
                    ? 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]'
                    : 'border-white/20 bg-black/30 text-white'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            onKeyDown={(event) => {
              if (event.key !== 'Escape') return
              setMobileMenuOpen(false)
              mobileMenuButtonRef.current?.focus()
            }}
            className="absolute inset-x-0 top-full max-h-[80vh] space-y-4 overflow-y-auto border-b border-[var(--border)] bg-[var(--bg)] p-4 shadow-2xl animate-in slide-in-from-top-4 duration-150 lg:hidden"
          >
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1">
                Products
              </div>
              {PRODUCTS.map(product => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
                >
                  {product.name}
                </Link>
              ))}
            </div>

            <Link
              href="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
            >
              Solutions
            </Link>

            <div className="space-y-1 border-t border-[var(--border)] pt-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-1">
                Resources & Tools
              </div>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <ImageIcon className="w-4 h-4 text-[var(--accent)]" />
                <span>Installation Gallery</span>
              </Link>
              {showCustomerLink && (
                <Link
                  href="/customers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
                >
                  <Boxes className="w-4 h-4 text-[var(--accent)]" />
                  <span>Our Customers</span>
                </Link>
              )}
              <Link
                href="/brochure"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                <span>Digital Brochure</span>
              </Link>
              <Link
                href="/tools/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <Calculator className="w-4 h-4 text-[var(--accent)]" />
                <span>Floor-Space Illustration</span>
              </Link>
              <Link
                href="/simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)]"
              >
                <Play className="w-4 h-4 text-[var(--accent)]" />
                <span>ASRS Simulation</span>
              </Link>
            </div>

            <div className="space-y-1 border-t border-[var(--border)] pt-3">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 text-sm font-semibold text-[var(--text)]"
              >
                About Space Magnum
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 text-sm font-semibold text-[var(--text)]"
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
          </nav>
        )}
      </header>

      {/* Command Search Palette */}
      <CommandSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
