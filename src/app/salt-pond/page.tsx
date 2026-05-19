'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroData {
    asset_url: string;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    cta2_text: string;
    cta2_link: string;
    overlay_color: string;
    overlay_opacity: number;
}

interface Product {
    id: number;
    name: string;
    description: string;
    weight: string;
    price_display: string;
    image_url: string;
    badge: string;
}

interface CMSData {
    hero: HeroData | null;
    content: any[];
    products: Product[];
}

export default function SaltPondPage() {
    const [data, setData] = useState<CMSData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/cms/salt-pond');
                const cmsData = await res.json();
                setData(cmsData);
            } catch (error) {
                console.error('Error fetching CMS data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-spin">⚙️</div>
                    <p className="text-amber-800">Loading...</p>
                </div>
            </div>
        );
    }

    const { hero, content, products } = data;
    const benefits = content.find(c => c.section_key === 'benefits')?.content || [];
    const story = content.find(c => c.section_key === 'story')?.content || {};
    const productsHeader = content.find(c => c.section_key === 'products_header')?.content || {};
    const footer = content.find(c => c.section_key === 'footer')?.content || {};

    return (
        <div className="min-h-screen bg-amber-50 text-slate-900">
            {/* Hero */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={hero?.asset_url || 'https://images.unsplash.com/photo-1505164294013-73197a9b8af6?w=1920&h=1080&fit=crop'}
                        alt="Salt pond aerial view"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/40 to-amber-900/70" />
                </div>
                <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
                    <div className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full text-amber-200 text-xs font-bold uppercase tracking-[0.3em] mb-6">
                        St. Kitts & Nevis, Caribbean
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                        {hero?.title || 'St. Kitts Salt Pond'}
                    </h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {hero?.subtitle || 'Premium natural sea salt from the Caribbean.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={hero?.cta_link || '#products'} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-xl transition-all shadow-lg">
                            {hero?.cta_text || 'Shop Our Salt'}
                        </a>
                        <a href={hero?.cta2_link || '#story'} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                            {hero?.cta2_text || 'Our Story'}
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            {benefits.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why St. Kitts Salt?</h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                                Our salt is more than a seasoning — it&apos;s a piece of Caribbean heritage, crafted by nature and tradition.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((b: any, i: number) => (
                                <div key={i} className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-100">
                                    {b.icon && <div className="text-3xl mb-3">{b.icon}</div>}
                                    <h3 className="text-lg font-bold text-amber-800 mb-2">{b.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Our Story */}
            <section id="story" className="py-20 bg-amber-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">{story.heading || 'Our Story'}</h2>
                            <div className="space-y-4 text-amber-100 leading-relaxed">
                                {(story.paragraphs || []).map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={story.image_url || 'https://images.unsplash.com/photo-1505164294013-73197a9b8af6?w=800&h=600&fit=crop'}
                                alt={story.image_alt || 'Salt pond landscape'}
                                className="rounded-3xl shadow-2xl w-full"
                            />
                            {story.highlight && (
                                <div className="absolute -bottom-6 -left-6 bg-amber-500 text-amber-900 p-6 rounded-2xl shadow-xl max-w-xs">
                                    <p className="font-bold text-lg">{story.highlight.text}</p>
                                    <p className="text-sm mt-1">{story.highlight.subtext}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section id="products" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            {productsHeader.heading || 'Our Products'}
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            {productsHeader.subheading || 'From coarse finishing salt to artisan smoked varieties.'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <div key={p.id} className="group bg-amber-50 rounded-2xl overflow-hidden border border-amber-100 hover:border-amber-300 transition-all hover:-translate-y-1 hover:shadow-xl">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={p.image_url}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {p.badge && (
                                        <span className="absolute top-3 right-3 bg-amber-500 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                                            {p.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h3 className="font-bold text-slate-900">{p.name}</h3>
                                        <span className="text-xs text-amber-600 font-medium">{p.weight}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{p.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black text-amber-700">{p.price_display}</span>
                                        <a
                                            href={`https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app/store/horizon-salt`}
                                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 text-sm font-bold rounded-lg transition-all"
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {products.length > 0 && (
                        <div className="text-center mt-12">
                            <a
                                href="https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app/store/horizon-salt"
                                className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-xl transition-all shadow-lg"
                            >
                                View All Products on IslandHub →
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-2xl font-black mb-4">
                                St. Kitts <span className="text-amber-400">Salt Pond</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{footer.tagline || 'Premium natural sea salt from the Caribbean.'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Contact</h4>
                            <div className="space-y-2 text-slate-400">
                                <p>📍 {footer.location || 'St. Kitts & Nevis, Caribbean'}</p>
                                <p>📧 {footer.email || 'info@saltpond.kn'}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="#products" className="block text-slate-400 hover:text-amber-400 transition-colors">Products</a>
                                <a href="#story" className="block text-slate-400 hover:text-amber-400 transition-colors">Our Story</a>
                                <a href="https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app/store/horizon-salt" className="block text-slate-400 hover:text-amber-400 transition-colors">Shop on IslandHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
                        <p>© 2026 St. Kitts Salt Pond. All rights reserved. A proud IBT Solutions partner.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
