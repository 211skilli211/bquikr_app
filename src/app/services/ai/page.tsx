'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const aiServices = [
  {
    id: 'marketing',
    title: 'AI Marketing',
    description: 'AI-powered marketing campaigns, content generation, and automated outreach.',
    icon: '📢',
    color: 'rose',
    href: '/services/ai/marketing',
  },
  {
    id: 'influencer',
    title: 'AI Digital Influencer',
    description: 'Create AI-powered influencers with authentic Caribbean accents.',
    icon: '🎭',
    color: 'violet',
    href: '/services/ai/influencer',
  },
  {
    id: 'mirofish',
    title: 'MiroFish AI',
    description: 'Crowd simulation and demographic analysis for events and locations.',
    icon: '🐟',
    color: 'teal',
    href: '/services/ai/mirofish',
  },
  {
    id: 'ask-maps',
    title: 'Ask Maps',
    description: 'AI-powered business Q&A using Google Maps data.',
    icon: '🗺️',
    color: 'blue',
    href: '/services/ai/ask-maps',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description: 'Custom AI chatbots for customer support.',
    icon: '💬',
    color: 'indigo',
    href: '/services/ai/chatbot',
  },
  {
    id: 'content',
    title: 'AI Content',
    description: 'Generate marketing content, descriptions, and copy.',
    icon: '✍️',
    color: 'amber',
    href: '/services/ai/content',
  },
];

export default function AIPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'ai',
      name: 'AI Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in AI services'
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
              <Link href="#contact" className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded-lg">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm mb-6">
            AI Solutions
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Intelligent AI
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Cutting-edge AI solutions for Caribbean businesses. From marketing automation to 
            crowd simulation - harness the power of AI for your business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service) => (
              <Link 
                key={service.id}
                href={service.href}
                className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-violet-500/50 transition-all group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <span className="text-violet-400 text-sm font-medium group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* White Label */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 rounded-3xl p-12 border border-violet-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">White Label AI Solutions</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              All our AI services are white-label ready. Partner with us to deliver 
              premium AI solutions under your brand. Reseller packages available.
            </p>
            <Link href="/services/pricing" className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Started with AI</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-violet-500" required />
            <button className="w-full px-6 py-4 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl">Request Demo</button>
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