import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quikr Solutions | AI-Powered Business Platform",
  description: "AI-powered solutions for Caribbean and South America economies",
};

const services = [
  {
    id: "ai-search",
    title: "AI Search & Knowledge",
    description: "Multimodal semantic search across video, audio, text, and images using OpenClaw + Gemini Embeddings",
    icon: "🔍",
  },
  {
    id: "document-processing",
    title: "Document Processing",
    description: "Extract data from PDFs and spreadsheets locally with Light Parse - privacy-first, no API costs",
    icon: "📄",
  },
  {
    id: "api-services",
    title: "API Services",
    description: "PDF generation, screenshot APIs, email verification and retrieval for automation workflows",
    icon: "🔗",
  },
  {
    id: "paperclip",
    title: "AI Company",
    description: "Autonomous AI agents that run your business 24/7 using Paperclip framework",
    icon: "🤖",
  },
  {
    id: "geospatial",
    title: "Geospatial Intelligence",
    description: "3D mapping dashboard with real-time flight, satellite, and traffic data for Caribbean & South America",
    icon: "🗺️",
  },
  {
    id: "avatar",
    title: "AI Avatar & Influencer",
    description: "Create consistent AI influencers using Google Flow with Room 11 monetization",
    icon: "🎭",
  },
  {
    id: "simulation",
    title: "Simulation & Analytics",
    description: "Mirofish crowd simulation (up to 1M agents) to test marketplace strategies before launch",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-950 pointer-events-none" />
      
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Quikr Solutions
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            AI-powered business platform for Caribbean & South America economies. 
            Building the future of commerce with intelligent tools and services.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100">Our Services</h2>
            <p className="mt-4 text-slate-400">
              Comprehensive AI solutions tailored for regional business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <a
                key={service.id}
                href={
                  service.id === 'document-processing' ? '/documents' :
                  service.id === 'ai-search' ? '/ai-search' :
                  service.id === 'geospatial' ? '/geospatial' :
                  service.id === 'avatar' ? '/avatar' :
                  service.id === 'simulation' ? '/simulation' :
                  service.id === 'api-services' ? '/api-services' :
                  service.id === 'paperclip' ? '/paperclip' :
                  `#${service.id}`
                }
                className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 block"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="py-24 border-t border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">
                Built for the Region
              </h2>
              <p className="text-slate-400 mb-6">
                Quikr Solutions combines cutting-edge AI technology with deep understanding 
                of Caribbean and South American markets.
              </p>
              <ul className="space-y-3">
                {[
                  "Directus-powered backend with PostgreSQL",
                  "OpenClaw AI agents for workflow automation",
                  "Hybrid memory system for persistent context",
                  "Local document processing - no data leaves your infrastructure",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="font-mono text-sm text-slate-400 space-y-2">
                <div><span className="text-cyan-400">Architecture</span>: Next.js 16 + TypeScript</div>
                <div><span className="text-cyan-400">Backend</span>: Directus CMS</div>
                <div><span className="text-cyan-400">AI Stack</span>: OpenClaw + Gemini 2</div>
                <div><span className="text-cyan-400">Data</span>: PostgreSQL + Vector Store</div>
                <div className="pt-4 border-t border-slate-700 mt-4">
                  <span className="text-emerald-400">Phase 1</span>: AI Search, Document Processing, APIs
                </div>
                <div>
                  <span className="text-amber-400">Phase 2</span>: Avatar Tools, Geospatial Dashboard
                </div>
                <div>
                  <span className="text-slate-500">Phase 3</span>: Full Intelligence + Mirofish Simulation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Ready to Build?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join us in building the future of Caribbean and South America business technology.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Currently in Phase 1 - MVP Development
          </div>
        </div>
      </section>
    </div>
  );
}