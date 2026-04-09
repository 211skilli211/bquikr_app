'use client';

import { useState } from 'react';

const toolCategories = [
  {
    id: 'api-services',
    name: 'API Services',
    icon: '🔗',
    description: 'APIs for automation and integration',
    tools: [
      { id: 'pdf-gen', name: 'PDF Generation', description: 'Generate styled PDFs', href: '/api-services', icon: '📄' },
      { id: 'screenshot', name: 'Screenshot', description: 'Website screenshots', href: '/api-services', icon: '📸' },
      { id: 'email-verify', name: 'Email Verify', description: 'Verify email addresses', href: '/api-services', icon: '📧' },
    ],
  },
  {
    id: 'geospatial',
    name: 'Geospatial',
    icon: '🗺️',
    description: 'Location intelligence & mapping',
    tools: [
      { id: 'maps', name: '3D Maps', description: 'Interactive Caribbean maps', href: '/geospatial', icon: '🌎' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '🎭',
    description: 'AI-powered marketing tools',
    tools: [
      { id: 'avatar', name: 'AI Avatar', description: 'Create AI influencers', href: '/avatar', icon: '🤖' },
    ],
  },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('api-services');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Services</h1>
        <p className="text-slate-400 text-lg">Professional tools and APIs for modern enterprises</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2 sticky top-24">
            {toolCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 border border-cyan-500'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-200">{cat.name}</p>
                    <p className="text-xs text-slate-500">{cat.tools.length} tools</p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tools Grid */}
        <div className="lg:col-span-3">
          {toolCategories.map((cat) => (
            <div
              key={cat.id}
              className={activeCategory === cat.id ? 'block' : 'hidden'}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{cat.name}</h2>
                  <p className="text-slate-400">{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.tools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.href}
                    className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-slate-400">{tool.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}