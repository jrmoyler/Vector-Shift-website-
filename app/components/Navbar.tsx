'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { VectorShiftLogo } from './VectorShiftLogo'

const navLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Missions', href: '/missions' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Routes', href: '/routes' },
  { label: 'Analytics', href: '/analytics' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 nav-glass transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-black/40' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <VectorShiftLogo size="sm" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${
                  isActive
                    ? 'text-silver'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-silver" />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm py-2 px-5">Sign In</button>
          <button className="btn-secondary text-sm py-2 px-5">Request Access</button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-silver"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
          <div className={`h-0.5 bg-current transition-all ${mobileOpen ? 'w-5' : 'w-3'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-void/98 border-t border-border-dark px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium py-2 border-b border-border-dark/50 transition-colors ${
                pathname === href ? 'text-silver' : 'text-text-secondary'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="btn-ghost text-sm py-2 px-5 flex-1">Sign In</button>
            <button className="btn-secondary text-sm py-2 px-5 flex-1">Request Access</button>
          </div>
        </div>
      )}
    </nav>
  )
}
