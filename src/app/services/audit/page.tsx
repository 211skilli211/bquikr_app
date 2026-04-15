'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

interface AuditResult {
  domain: string;
  overallScore: number;
  seoScore: number;
  mapsScore: number;
  websiteScore: number;
  socialScore: number;
  grade: string;
  issues: string[];
  recommendations: string[];
}

const auditDimensions = [
  {
    id: 'seo',
    name: 'SEO Score',
    icon: '🔍',
    description: 'On-page SEO, technical SEO, content quality, backlinks',
    weight: 30,
    color: 'amber',
  },
  {
    id: 'maps',
    name: 'Google Maps',
    icon: '📍',
    description: 'Business listing, verification, reviews, info completeness',
    weight: 25,
    color: 'blue',
  },
  {
    id: 'website',
    name: 'Website Quality',
    icon: '🌐',
    description: 'Speed, mobile, security, content quality',
    weight: 25,
    color: 'emerald',
  },
  {
    id: 'social',
    name: 'Social Presence',
    icon: '📱',
    description: 'Facebook, Instagram, LinkedIn presence',
    weight: 20,
    color: 'rose',
  },
];

function ScoreCircle({ score, label, color }: { score: number; label: string; color: string }) {
  const getGrade = (s: number) => {
    if (s >= 90) return 'A';
    if (s >= 75) return 'B';
    if (s >= 60) return 'C';
    if (s >= 40) return 'D';
    return 'F';
  };

  const colors: Record<string, string> = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    cyan: 'text-cyan-400',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * score) / 100}
            className={`${colors[color]} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colors[color]}`}>{getGrade(score)}</span>
        </div>
      </div>
      <span className="text-sm text-slate-400 mt-2">{label}</span>
      <span className="text-xs text-slate-500">{score}/100</span>
    </div>
  );
}

export default function AuditPage() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResult({
        domain: domain,
        overallScore: 72,
        seoScore: 65,
        mapsScore: 78,
        websiteScore: 68,
        socialScore: 82,
        grade: 'C',
        issues: [
          'Missing meta descriptions on 3 pages',
          'No Google Business Profile found',
          'Slow load time (4.2s)',
          'No Instagram business account',
        ],
        recommendations: [
          'Claim and verify Google Business Profile',
          'Optimize images for web (use WebP)',
          'Add structured data markup',
          'Set up Instagram business account',
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitServiceInquiry({
      service_type: 'audit',
      name: 'Website Visitor',
      email: email,
      source: 'bquikr',
      message: 'Request for business audit service'
    });
    
    if (result.success) {
      setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    } else {
      setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    }
    setEmail('');
  };

  const getOverallGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/services" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
              <span className="text-sm text-slate-500 font-medium">Solutions</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services" className="text-sm text-slate-300 hover:text-white">Services</Link>
              <Link href="/services/audit" className="text-sm text-emerald-400">Audit</Link>
              <Link href="#pricing" className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded-lg">Start Audit</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6">
              Business Auditing
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Know Your Business
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Score
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive business scoring system - SEO analysis, Google Maps profile verification, 
              website quality audits, and social presence analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Audit Dimensions */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How We Grade Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditDimensions.map((dim) => (
              <div key={dim.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <div className="text-4xl mb-4">{dim.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{dim.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{dim.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Weight</span>
                  <span className="text-sm font-medium text-white">{dim.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analyze Form */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Analyze Your Business</h2>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Website or Business Name</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com or Business Name"
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Free Audit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="py-20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{result.domain}</h2>
                <div className="text-6xl font-bold text-white mb-2">{result.grade}</div>
                <p className="text-slate-400">Overall Score: {result.overallScore}/100</p>
              </div>

              <div className="flex justify-center gap-8 mb-8">
                <ScoreCircle score={result.seoScore} label="SEO" color="amber" />
                <ScoreCircle score={result.mapsScore} label="Maps" color="blue" />
                <ScoreCircle score={result.websiteScore} label="Website" color="emerald" />
                <ScoreCircle score={result.socialScore} label="Social" color="rose" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Issues Found</h3>
                  <ul className="space-y-2">
                    {result.issues.map((issue, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-center font-medium rounded-xl">
                  Download Full Report
                </button>
                <button className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 text-center font-medium rounded-xl">
                  Get Fix Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* For Businesses Without Websites */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-3xl p-8 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Don&apos;t Have a Website?</h2>
            <p className="text-slate-400 mb-6">
              Our audit can find businesses that don&apos;t have a web presence. We specialize in creating 
              professional websites for Caribbean businesses - from restaurants to tour operators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/web-dev" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium rounded-xl text-center">
                Get a Quote
              </Link>
              <button className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl">
                List My Business
              </button>
            </div>
          </div>
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