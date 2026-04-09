'use client';

import { useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-950 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-400">Building the future of Caribbean business</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Quikr Solutions
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
            AI-powered business platform for Caribbean & South America. 
            Intelligent tools that work for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Explore Tools
            </a>
            <a
              href="/documents"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 border border-slate-700 hover:border-slate-600 rounded-xl transition-all"
            >
              Start with Documents
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-sm text-slate-500">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">∞</div>
              <div className="text-sm text-slate-500">Data Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">100K+</div>
              <div className="text-sm text-slate-500">Simulated Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">The Platform</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Internal tools for business operations and external services for customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Internal Tools */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Internal Tools</h3>
                  <p className="text-sm text-slate-400">For business operations</p>
                </div>
              </div>

              <div className="space-y-3">
                <a href="/documents" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-slate-200">Documents</p>
                    <p className="text-xs text-slate-500">Orchestrator & Troubleshooter</p>
                  </div>
                </a>
                <a href="/simulation" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-medium text-slate-200">Simulation</p>
                    <p className="text-xs text-slate-500">Test strategies before launch</p>
                  </div>
                </a>
                <a href="/ai-search" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <p className="font-medium text-slate-200">AI Knowledge</p>
                    <p className="text-xs text-slate-500">Internal knowledge base</p>
                  </div>
                </a>
                <a href="/paperclip" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-medium text-slate-200">AI Company</p>
                    <p className="text-xs text-slate-500">Autonomous agents</p>
                  </div>
                </a>
              </div>
            </div>

            {/* External Tools */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">External Services</h3>
                  <p className="text-sm text-slate-400">For customers</p>
                </div>
              </div>

              <div className="space-y-3">
                <a href="/api-services" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🔗</span>
                  <div>
                    <p className="font-medium text-slate-200">API Services</p>
                    <p className="text-xs text-slate-500">Email, PDF, Screenshot APIs</p>
                  </div>
                </a>
                <a href="/geospatial" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <p className="font-medium text-slate-200">Geospatial</p>
                    <p className="text-xs text-slate-500">Regional mapping</p>
                  </div>
                </a>
                <a href="/ai-search" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <p className="font-medium text-slate-200">Public Search</p>
                    <p className="text-xs text-slate-500">Public knowledge base</p>
                  </div>
                </a>
                <a href="/avatar" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <p className="font-medium text-slate-200">AI Avatar</p>
                    <p className="text-xs text-slate-500">Influencer creation</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-24 border-t border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm mb-4">
                Core Platform
              </div>
              <h2 className="text-4xl font-bold text-slate-100 mb-4">Documents</h2>
              <h3 className="text-xl text-cyan-400 mb-6">The Orchestrator</h3>
              <p className="text-slate-400 mb-6">
                The central AI agent that coordinates all operations. 
                Acts as troubleshooter, data scientist, engineer, and marketing agent.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl mb-2">🔧</div>
                  <h4 className="font-medium text-slate-200">Troubleshooter</h4>
                  <p className="text-xs text-slate-500">Diagnose and fix issues</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-medium text-slate-200">Data Scientist</h4>
                  <p className="text-xs text-slate-500">Analyze patterns</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl mb-2">⚙️</div>
                  <h4 className="font-medium text-slate-200">Engineer</h4>
                  <p className="text-xs text-slate-500">Build & automate</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl mb-2">📢</div>
                  <h4 className="font-medium text-slate-200">Marketing Agent</h4>
                  <p className="text-xs text-slate-500">Promote & engage</p>
                </div>
              </div>

              <a
                href="/documents"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Open Documents
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <div className="font-mono text-sm text-slate-400 space-y-3">
                <div className="flex gap-2">
                  <span className="text-emerald-400">❯</span>
                  <span>Documents: Analyze our sales data</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cyan-400">◐</span>
                  <span>Processing query...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-400">◉</span>
                  <span>Running data analysis</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cyan-400">◐</span>
                  <span>Generated: Q1 Sales Report.pdf</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cyan-400">◐</span>
                  <span>Insight: 23% revenue increase</span>
                </div>
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <div className="flex gap-2">
                    <span className="text-emerald-400">❯</span>
                    <span>Documents: Create marketing campaign</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyan-400">◐</span>
                    <span>Generating content variants...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Ready to transform your business?</h2>
          <p className="text-slate-400 mb-8">
            Start with Documents - the orchestrator that coordinates everything.
          </p>
          <a
            href="/documents"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}