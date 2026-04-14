'use client';

import { useState } from 'react';
import Link from 'next/link';

const marketingFeatures = [
  {
    id: 'campaigns',
    title: 'AI Campaigns',
    description: 'Create and manage marketing campaigns with AI assistance.',
    icon: '📢',
  },
  {
    id: 'content',
    title: 'Content Generation',
    description: 'Generate marketing copy, descriptions, and social posts.',
    icon: '✍️',
  },
  {
    id: 'audience',
    title: 'Audience Analysis',
    description: 'Understand your audience with AI-driven insights.',
    icon: '👥',
  },
  {
    id: 'scheduler',
    title: 'Smart Scheduling',
    description: 'Post at optimal times automatically.',
    icon: '⏰',
  },
];

export default function AIMarketingPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <Link href="/services/ai" className="text-sm text-emerald-400">AI Solutions</Link>
              <Link href="#pricing" className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded-lg">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm mb-6">
            AI Marketing
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Smart Marketing
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            AI-powered marketing campaigns, content generation, and automated outreach. 
            Let AI handle the heavy lifting while you focus on your business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingFeatures.map((feature) => (
              <div key={feature.id} className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-rose-500/50 transition-all group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
                <button className="mt-4 text-rose-400 text-sm font-medium group-hover:underline">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Connect', desc: 'Connect your social accounts and website' },
              { step: '2', title: 'AI Analysis', desc: 'Our AI analyzes your audience and competitors' },
              { step: '3', title: 'Create', desc: 'Generate content tailored to your brand' },
              { step: '4', title: 'Automate', desc: 'Schedule and publish automatically' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl">
                <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 font-bold">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-medium text-white">{s.title}</h4>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Flow */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-3xl p-12 border border-rose-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Automation Flows</h2>
            <p className="text-slate-400 mb-6">
              Set up automated marketing flows with triggers and actions:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New signup → Welcome email + Social follow',
                'Purchase → Thank you + Upsell suggestion',
                'Inactivity → Re-engagement campaign',
                'Review received → Social share request',
                'Blog post → Content distribution',
              ].map((flow, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300">
                  <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {flow}
                </li>
              ))}
            </ul>
            <Link href="#pricing" className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-medium rounded-xl inline-block">
              Set Up Automation
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Started with AI Marketing</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500" required />
            <button className="w-full px-6 py-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl">Request Demo</button>
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