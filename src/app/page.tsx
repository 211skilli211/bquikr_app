'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900 to-slate-950 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm text-cyan-400">Intelligent Caribbean Solutions</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-100 mb-6">
                Powerful Tools for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Modern Business
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 max-w-lg mb-8">
                API services, geospatial intelligence, AI-powered tools. 
                Everything Caribbean enterprises need to scale in the digital economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/tools"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Explore Tools
                </a>
                <a
                  href="https://islandhub.app"
                  target="_blank"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-300 border border-slate-700 hover:border-slate-600 rounded-xl transition-all"
                >
                  Visit IslandHub →
                </a>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">API-First</div>
                  <div className="text-sm text-slate-500">Architecture</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">Global</div>
                  <div className="text-sm text-slate-500">Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">24/7</div>
                  <div className="text-sm text-slate-500">Automation</div>
                </div>
              </div>
            </div>

            {/* Hero Visual - Caribbean Business Theme */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1569020586994-57e06169d5c9?w=800&h=800&fit=crop" 
                  alt="Caribbean business district"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-slate-100 font-medium">[Caribbean Business Hub Image]</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm mb-8">POWERING BUSINESSES ACROSS THE CARIBBEAN</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['IBT Solutions', 'IslandHub', 'Graphic Trends', 'CTC Marketplace', 'Partners'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-slate-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Tools & Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Professional-grade tools for modern Caribbean enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'API Services',
                description: 'PDF generation, email verification, screenshots for automation',
                icon: '🔗',
                image: 'https://images.unsplash.com/photo-1551288049-beb4b4c8ab04?w=400&h=300&fit=crop',
                href: '/api-services',
              },
              {
                title: 'Geospatial Intelligence',
                description: '3D mapping, location analytics for Caribbean region',
                icon: '🗺️',
                image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop',
                href: '/geospatial',
              },
              {
                title: 'AI Avatar Tools',
                description: 'Create AI influencers for marketing & brand promotion',
                icon: '🎭',
                image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=400&h=300&fit=crop',
                href: '/avatar',
              },
            ].map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/tools" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium">
              View all services →
            </a>
          </div>
        </div>
      </section>

      {/* Partner Platforms */}
      <section className="py-24 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Our Ecosystem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Connected platforms powering Caribbean commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IslandHub */}
            <a href="https://islandhub.app" target="_blank" className="group relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7f?w=800&h=400&fit=crop" 
                alt="IslandHub Marketplace"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm mb-3">Marketplace</span>
                <h3 className="text-2xl font-bold text-white mb-2">IslandHub</h3>
                <p className="text-slate-300 mb-4">B2B marketplace for Caribbean trade. Connect with suppliers and vendors across the region.</p>
                <span className="text-emerald-400 font-medium group-hover:underline">Visit IslandHub →</span>
              </div>
            </a>

            {/* CTC Marketplace */}
            <a href="#" className="group relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop" 
                alt="CTC Marketplace"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm mb-3">Marketplace</span>
                <h3 className="text-2xl font-bold text-white mb-2">CTC Marketplace</h3>
                <p className="text-slate-300 mb-4">Agricultural & marine marketplace with AI-powered arbitrage capabilities.</p>
                <span className="text-amber-400 font-medium">Coming Soon →</span>
              </div>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h4 className="font-semibold text-slate-200">Graphic Trends</h4>
              <p className="text-sm text-slate-400 mt-2">Manufacturing & digital creation</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
              <div className="text-3xl mb-3">💳</div>
              <h4 className="font-semibold text-slate-200">IBT Financial</h4>
              <p className="text-sm text-slate-400 mt-2">Fintech & digital payments</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-semibold text-slate-200">Family Co-op</h4>
              <p className="text-sm text-slate-400 mt-2">Community ownership initiative</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">Ready to scale your business?</h2>
          <p className="text-lg text-slate-400 mb-8">
            Join the network of Caribbean enterprises using intelligent infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}