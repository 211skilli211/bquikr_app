'use client';

import { useState, useEffect, useCallback } from 'react';
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
    style_config: any;
}

interface ContentSection {
    id: number;
    section_key: string;
    content_type: string;
    content: any;
    sort_order: number;
    is_visible: boolean;
}

interface Product {
    id: number;
    name: string;
    description: string;
    weight: string;
    price: number;
    price_display: string;
    image_url: string;
    badge: string;
    sort_order: number;
    is_visible: boolean;
}

export default function SaltPondCMS() {
    const [hero, setHero] = useState<HeroData | null>(null);
    const [content, setContent] = useState<ContentSection[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'content' | 'products' | 'preview'>('hero');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/cms/salt-pond');
            const data = await res.json();
            setHero(data.hero);
            setContent(data.content || []);
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching CMS data:', error);
            setMessage({ type: 'error', text: 'Failed to load data' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const saveChanges = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/cms/salt-pond', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hero, content, products }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Changes saved successfully!' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save changes' });
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Delete this product?')) return;
        try {
            await fetch(`/api/cms/salt-pond?productId=${id}`, { method: 'DELETE' });
            setProducts(products.filter(p => p.id !== id));
            setMessage({ type: 'success', text: 'Product deleted' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to delete product' });
        }
    };

    const addNewProduct = () => {
        setEditingProduct({
            id: 0,
            name: '',
            description: '',
            weight: '',
            price: 0,
            price_display: '',
            image_url: '',
            badge: '',
            sort_order: products.length,
            is_visible: true,
        });
        setShowProductModal(true);
    };

    const saveProduct = () => {
        if (!editingProduct) return;
        if (editingProduct.id) {
            setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        } else {
            setProducts([...products, { ...editingProduct, id: Date.now() }]);
        }
        setShowProductModal(false);
        setEditingProduct(null);
    };

    const updateContentSection = (sectionKey: string, newContent: any) => {
        setContent(content.map(c =>
            c.section_key === sectionKey ? { ...c, content: newContent } : c
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-spin">⚙️</div>
                    <p className="text-slate-400">Loading CMS...</p>
                </div>
            </div>
        );
    }

    const benefitsSection = content.find(c => c.section_key === 'benefits');
    const storySection = content.find(c => c.section_key === 'story');
    const productsHeaderSection = content.find(c => c.section_key === 'products_header');
    const footerSection = content.find(c => c.section_key === 'footer');

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">← Back to Admin</Link>
                        <div>
                            <h1 className="text-xl font-bold">Salt Pond CMS</h1>
                            <p className="text-sm text-slate-400">Manage hero, content, and products</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/salt-pond" target="_blank" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">View Page</a>
                        <button onClick={saveChanges} disabled={saving} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg transition-colors disabled:opacity-50">
                            {saving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`mx-6 mt-4 max-w-7xl lg:mx-auto px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 mt-6">
                <div className="flex gap-2 border-b border-slate-800 pb-2">
                    {(['hero', 'content', 'products'] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-t-lg font-medium transition-colors capitalize ${activeTab === tab ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'}`}>
                            {tab === 'hero' ? '🖼️ Hero' : tab === 'content' ? '📝 Content' : '🛍️ Products'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* HERO TAB */}
                {activeTab === 'hero' && hero && (
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                            <h2 className="text-lg font-bold mb-4">Hero Section</h2>
                            
                            {/* Preview */}
                            <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                                <img src={hero.asset_url} alt="Hero preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/40 to-amber-900/70" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-white">{hero.title}</h3>
                                        <p className="text-amber-200 text-sm mt-1 max-w-md">{hero.subtitle?.substring(0, 80)}...</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Hero Image URL</label>
                                    <input type="text" value={hero.asset_url || ''} onChange={e => setHero({ ...hero, asset_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Title</label>
                                    <input type="text" value={hero.title || ''} onChange={e => setHero({ ...hero, title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-slate-400 mb-1">Subtitle</label>
                                    <textarea value={hero.subtitle || ''} onChange={e => setHero({ ...hero, subtitle: e.target.value })} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">CTA Button Text</label>
                                    <input type="text" value={hero.cta_text || ''} onChange={e => setHero({ ...hero, cta_text: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">CTA Link</label>
                                    <input type="text" value={hero.cta_link || ''} onChange={e => setHero({ ...hero, cta_link: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Secondary CTA Text</label>
                                    <input type="text" value={hero.cta2_text || ''} onChange={e => setHero({ ...hero, cta2_text: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Secondary CTA Link</label>
                                    <input type="text" value={hero.cta2_link || ''} onChange={e => setHero({ ...hero, cta2_link: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Overlay Color</label>
                                    <input type="color" value={hero.overlay_color || '#78350f'} onChange={e => setHero({ ...hero, overlay_color: e.target.value })} className="w-full h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Overlay Opacity: {hero.overlay_opacity}</label>
                                    <input type="range" min="0" max="1" step="0.1" value={hero.overlay_opacity || 0.6} onChange={e => setHero({ ...hero, overlay_opacity: parseFloat(e.target.value) })} className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTENT TAB */}
                {activeTab === 'content' && (
                    <div className="space-y-6">
                        {/* Benefits */}
                        {benefitsSection && (
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h2 className="text-lg font-bold mb-4">🌿 Benefits Section</h2>
                                <div className="space-y-3">
                                    {(Array.isArray(benefitsSection.content) ? benefitsSection.content : []).map((b: any, i: number) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-800 rounded-lg p-3">
                                            <input type="text" value={b.icon || ''} onChange={e => {
                                                const updated = [...benefitsSection.content];
                                                updated[i] = { ...b, icon: e.target.value };
                                                updateContentSection('benefits', updated);
                                            }} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-center focus:border-amber-500 outline-none" placeholder="Icon (emoji)" />
                                            <input type="text" value={b.title || ''} onChange={e => {
                                                const updated = [...benefitsSection.content];
                                                updated[i] = { ...b, title: e.target.value };
                                                updateContentSection('benefits', updated);
                                            }} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm focus:border-amber-500 outline-none" placeholder="Title" />
                                            <input type="text" value={b.desc || ''} onChange={e => {
                                                const updated = [...benefitsSection.content];
                                                updated[i] = { ...b, desc: e.target.value };
                                                updateContentSection('benefits', updated);
                                            }} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm focus:border-amber-500 outline-none" placeholder="Description" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Story */}
                        {storySection && (
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h2 className="text-lg font-bold mb-4">📖 Our Story</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Heading</label>
                                        <input type="text" value={storySection.content?.heading || ''} onChange={e => updateContentSection('story', { ...storySection.content, heading: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Paragraphs (one per line)</label>
                                        <textarea
                                            value={(storySection.content?.paragraphs || []).join('\n\n')}
                                            onChange={e => updateContentSection('story', { ...storySection.content, paragraphs: e.target.value.split('\n\n').filter(Boolean) })}
                                            rows={6}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Story Image URL</label>
                                            <input type="text" value={storySection.content?.image_url || ''} onChange={e => updateContentSection('story', { ...storySection.content, image_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Highlight Text</label>
                                            <input type="text" value={storySection.content?.highlight?.text || ''} onChange={e => updateContentSection('story', { ...storySection.content, highlight: { ...storySection.content?.highlight, text: e.target.value } })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products Header */}
                        {productsHeaderSection && (
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h2 className="text-lg font-bold mb-4">🛍️ Products Section Header</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Heading</label>
                                        <input type="text" value={productsHeaderSection.content?.heading || ''} onChange={e => updateContentSection('products_header', { ...productsHeaderSection.content, heading: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Subheading</label>
                                        <input type="text" value={productsHeaderSection.content?.subheading || ''} onChange={e => updateContentSection('products_header', { ...productsHeaderSection.content, subheading: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        {footerSection && (
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h2 className="text-lg font-bold mb-4">📋 Footer</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Tagline</label>
                                        <input type="text" value={footerSection.content?.tagline || ''} onChange={e => updateContentSection('footer', { ...footerSection.content, tagline: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Location</label>
                                        <input type="text" value={footerSection.content?.location || ''} onChange={e => updateContentSection('footer', { ...footerSection.content, location: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Email</label>
                                        <input type="text" value={footerSection.content?.email || ''} onChange={e => updateContentSection('footer', { ...footerSection.content, email: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Products ({products.length})</h2>
                                <button onClick={addNewProduct} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg text-sm transition-colors">+ Add Product</button>
                            </div>
                            <div className="space-y-3">
                                {products.map(product => (
                                    <div key={product.id} className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                                        {product.image_url && (
                                            <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold truncate">{product.name}</h3>
                                                {product.badge && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">{product.badge}</span>}
                                            </div>
                                            <p className="text-sm text-slate-400 truncate">{product.description}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-amber-400 font-bold">{product.price_display}</span>
                                                <span className="text-slate-500 text-xs">{product.weight}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => { setEditingProduct(product); setShowProductModal(true); }} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors">Edit</button>
                                            <button onClick={() => deleteProduct(product.id)} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900 text-red-300 rounded text-sm transition-colors">Delete</button>
                                        </div>
                                    </div>
                                ))}
                                {products.length === 0 && (
                                    <div className="text-center py-8 text-slate-500">
                                        <p>No products yet. Click "Add Product" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Edit Modal */}
            {showProductModal && editingProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Product Name *</label>
                                <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Description</label>
                                <textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Weight/Size</label>
                                    <input type="text" value={editingProduct.weight} onChange={e => setEditingProduct({ ...editingProduct, weight: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" placeholder="e.g. 500g" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Price (XCD)</label>
                                    <input type="number" step="0.01" value={editingProduct.price} onChange={e => {
                                        const val = parseFloat(e.target.value) || 0;
                                        setEditingProduct({ ...editingProduct, price: val, price_display: `$${val.toFixed(2)}` });
                                    }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Price Display</label>
                                <input type="text" value={editingProduct.price_display} onChange={e => setEditingProduct({ ...editingProduct, price_display: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" placeholder="e.g. $15.00" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Image URL</label>
                                <input type="text" value={editingProduct.image_url} onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Badge (optional)</label>
                                <input type="text" value={editingProduct.badge} onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none" placeholder="e.g. New, Sale, Artisan" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={editingProduct.is_visible} onChange={e => setEditingProduct({ ...editingProduct, is_visible: e.target.checked })} className="rounded" />
                                <label className="text-sm text-slate-400">Visible on page</label>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => { setShowProductModal(false); setEditingProduct(null); }} className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
                            <button onClick={saveProduct} className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg transition-colors">Save Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
