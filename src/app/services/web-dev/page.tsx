'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const webServices = [
  {
    id: 'new-site',
    title: 'New Website Build',
    description: 'Complete professional website built from scratch.',
    price: 'From $499',
    features: ['Custom design', 'Mobile responsive', 'SEO ready', 'Contact forms', 'Social integration'],
    popular: true,
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    description: 'Modernize your existing website with fresh design.',
    price: 'From $299',
    features: ['New design system', 'Speed optimization', 'Mobile-first', 'Content refresh', 'Analytics setup'],
  },
  {
    id: 'optimize',
    title: 'SEO Optimization',
    description: 'Improve search rankings and organic traffic.',
    price: 'From $199',
    features: ['Keyword research', 'On-page SEO', 'Technical fixes', 'Link building', 'Monthly reports'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    description: 'Online store with payments and inventory.',
    price: 'From $799',
    features: ['Product catalog', 'Payment processing', 'Inventory mgmt', 'Order tracking', 'Staff accounts'],
  },
  {
    id: 'maintenance',
    title: 'Ongoing Maintenance',
    description: 'Monthly care for your website.',
    price: '$99/mo',
    features: ['Security updates', 'Content changes', 'Backups', 'Uptime monitoring', 'Support'],
  },
  {
    id: 'reseller',
    title: 'White Label Partner',
    description: 'Resell website services under your brand.',
    price: 'Partner',
    features: ['White label', 'Partner pricing', 'Dedicated support', 'Client portal', 'API access'],
  },
];

export default function WebDevPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'web-dev',
      name: 'Website Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in website development services'
    });
    
    setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/services" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services" className="text-sm text-slate-300">Services</Link>
              <Link href="/services/audit" className="text-sm text-slate-300">Audit</Link>
              <Link href="#pricing" className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded-lg">Get Quote</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
            Website Development
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Build or Refine Your
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Online Presence
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Professional websites for Caribbean businesses. From new builds to SEO optimization - 
            we help you stand out online.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webServices.map((service) => (
              <div key={service.id} className={`bg-slate-900 rounded-3xl p-6 border ${service.popular ? 'border-emerald-500/50' : 'border-slate-800'} relative`}>
                {service.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-slate-900 text-xs font-bold rounded-full">
                    POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-white mb-4">{service.price}</div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-medium ${service.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discovery', desc: 'We learn about your business and goals' },
              { step: '2', title: 'Design', desc: 'We create mockups for your approval' },
              { step: '3', title: 'Build', desc: 'We develop your website' },
              { step: '4', title: 'Launch', desc: 'We go live and train you' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-white font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
            <textarea placeholder="Tell us about your project" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white h-32 focus:outline-none focus:border-emerald-500" />
            <button className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl">Send Inquiry</button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>

      <footer className="py-12 border-t border-slate-800 text-center text-slate-500">
        <p>© 2025 IBT Solutions</p>
      </footer>
    </div>
  );
}