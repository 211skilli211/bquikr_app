'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const tourismAPIs = [
  {
    id: 'currency',
    name: 'Currency Exchange API',
    description: 'Real-time Caribbean and international currency exchange rates with historical data.',
    price: 'From $29/mo',
    features: ['Real-time rates', 'Historical data', '150+ currencies', 'WebSocket updates'],
    docsLink: '/docs/currency-api',
  },
  {
    id: 'events',
    name: 'Caribbean Events API',
    description: 'Comprehensive Caribbean events database - festivals, concerts, sports, and more.',
    price: 'From $49/mo',
    features: ['10,000+ events', 'Filters by location', 'Categories', 'iCal export'],
    docsLink: '/docs/events-api',
  },
  {
    id: 'geospatial',
    name: 'Geospatial Mapping API',
    description: 'Interactive maps and location intelligence for Caribbean tourism businesses.',
    price: 'From $79/mo',
    features: ['Custom maps', '5 view modes', 'POI data', 'Route optimization'],
    docsLink: '/docs/geospatial-api',
  },
  {
    id: 'places',
    name: 'Places Discovery API',
    description: 'Discover Caribbean restaurants, attractions, beaches, and hidden gems.',
    price: 'From $39/mo',
    features: ['5000+ places', 'Reviews', 'Photos', 'Ratings'],
    docsLink: '/docs/places-api',
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Marine and land weather forecasts for the Caribbean region.',
    price: 'From $29/mo',
    features: ['7-day forecast', 'Marine weather', 'Alerts', 'Historical'],
    docsLink: '/docs/weather-api',
  },
  {
    id: 'transport',
    name: 'Transport API',
    description: 'Public transport schedules, ferry times, and taxi services across the Caribbean.',
    price: 'From $49/mo',
    features: ['Real-time updates', 'Schedules', 'Route planning', 'Fare estimates'],
    docsLink: '/docs/transport-api',
  },
];

export default function TourismPage() {
  const [activeAPI, setActiveAPI] = useState(tourismAPIs[0]);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'tourism-api',
      name: 'API Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in Tourism APIs'
    });
    
    setFormStatus('Thanks! Check your email for API access.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/services" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
              <span className="text-sm text-slate-500 font-medium">Solutions</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services" className="text-sm text-slate-300 hover:text-white">Services</Link>
              <Link href="/services/tourism" className="text-sm text-emerald-400">Tourism</Link>
              <Link href="#pricing" className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded-lg">Get API Key</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
              Tourism APIs
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Power Your Tourism
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Business
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Purpose-built APIs for Caribbean tourism. From currency exchange to geospatial mapping - 
              everything you need to build exceptional tourism experiences.
            </p>
          </div>
        </div>
      </section>

      {/* APIs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar - API List */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Available APIs</h3>
                <div className="space-y-2">
                  {tourismAPIs.map((api) => (
                    <button
                      key={api.id}
                      onClick={() => setActiveAPI(api)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeAPI.id === api.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                          : 'bg-slate-800/50 border border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-medium">{api.name}</div>
                      <div className="text-sm text-slate-500">{api.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main - API Details */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{activeAPI.name}</h2>
                    <p className="text-slate-400">{activeAPI.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{activeAPI.price}</div>
                    <div className="text-sm text-slate-500">per month</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {activeAPI.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={activeAPI.docsLink} className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-center font-medium rounded-xl transition-colors">
                    View Docs
                  </Link>
                  <button className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-center font-medium rounded-xl transition-colors">
                    Get API Key
                  </button>
                </div>
              </div>

              {/* Code Example */}
              <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Quick Start</h3>
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`curl -X GET "https://api.ibtsolutions.co/${activeAPI.id}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to integrate?</h2>
          <p className="text-slate-400 mb-8">Get your API key and start building in minutes.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              required
            />
            <button type="submit" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl">
              Get Key
            </button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>

      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>© 2025 IBT Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}