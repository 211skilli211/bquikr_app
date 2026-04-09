'use client';

import { useState } from 'react';

const toolCategories = [
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    icon: '📊',
    description: 'Analyze data and forecast trends',
    tools: [
      { id: 'simulation', name: 'Simulation', description: 'Crowd simulation for testing strategies', href: '/simulation', icon: '🎲' },
      { id: 'ai-search', name: 'AI Search', description: 'Semantic knowledge search', href: '/ai-search', icon: '🔍' },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: '🔧',
    description: 'Business operations and automation',
    tools: [
      { id: 'documents', name: 'Documents', description: 'AI orchestrator - data, engineer, marketing', href: '/documents', icon: '📄' },
      { id: 'api-services', name: 'API Services', description: 'PDF, email, screenshot APIs', href: '/api-services', icon: '🔗' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📢',
    description: 'Marketing and content tools',
    tools: [
      { id: 'avatar', name: 'AI Avatar', description: 'Create AI influencers', href: '/avatar', icon: '🎭' },
      { id: 'campaigns', name: 'Campaigns', description: 'Manage campaigns', href: '#', icon: '📣' },
    ],
  },
  {
    id: 'geospatial',
    name: 'Geospatial',
    icon: '🗺️',
    description: 'Maps and location data',
    tools: [
      { id: 'maps', name: 'Maps Dashboard', description: '3D geospatial intelligence', href: '/geospatial', icon: '🌎' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    icon: '🤖',
    description: 'Custom AI agent infrastructure',
    tools: [
      { id: 'hermes', name: 'Hermes Agent', description: 'Build custom agents', external: true, icon: '⚡' },
      { id: 'fine-tuning', name: 'Unsloth', description: 'Fine-tune LLM models', external: true, icon: '🧠' },
      { id: 'paperclip', name: 'Paperclip', description: 'AI company (VPS)', external: true, icon: '🏢' },
    ],
  },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('data-analytics');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Tools</h1>
        <p className="text-slate-400 text-lg">Categorized tools for business operations and customers</p>
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
                  tool.external ? (
                    <div
                      key={tool.id}
                      className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 opacity-75"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{tool.icon}</span>
                          <div>
                            <h3 className="font-semibold text-slate-200">{tool.name}</h3>
                            <p className="text-sm text-slate-400">{tool.description}</p>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">Setup Required</span>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={tool.id}
                      href={tool.href}
                      className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{tool.icon}</span>
                          <div>
                            <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-slate-400">{tool.description}</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </a>
                  )
                ))}
              </div>

              {/* Info box for external tools */}
              {cat.id === 'ai-agents' && (
                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-800 rounded-xl">
                  <h4 className="font-medium text-amber-400 mb-2">AI Agents Setup</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    These tools require separate setup on your local machine or VPS. Refer to official documentation for installation.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a href="https://hermesagent.com" target="_blank" className="text-cyan-400 hover:underline">Hermes Agent →</a>
                    <a href="https://unsloth.ai" target="_blank" className="text-cyan-400 hover:underline">Unsloth →</a>
                    <a href="https://paperclipai.ai" target="_blank" className="text-cyan-400 hover:underline">Paperclip →</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}