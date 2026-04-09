'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Services' },
  { href: '/api-services', label: 'APIs' },
  { href: '/geospatial', label: 'Maps' },
  { href: '/avatar', label: 'Avatar' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              IBT
            </span>
            <span className="text-sm text-slate-500 font-medium">Solutions</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="https://islandhub.app" 
              target="_blank"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              IslandHub →
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-slate-800 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-300 hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="https://islandhub.app" 
              target="_blank"
              className="block py-2 text-emerald-400 font-medium"
            >
              IslandHub →
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}