'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { sql } from '@/lib/db';

interface Location {
  location_id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  is_public: boolean;
}

interface POI {
  poi_id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: string;
  island: string;
}

type ViewMode = 'standard' | 'commerce' | 'eco-alert' | 'night' | 'flir';

const CARIBBEAN_CENTER = { lat: 18.2208, lng: -66.5901 };

export default function GeospatialPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [locResult, poiResult] = await Promise.all([
          sql`SELECT * FROM ibt_locations WHERE is_public = true LIMIT 100`,
          sql`SELECT * FROM ibt_pois LIMIT 100`
        ]);
        
        setLocations(locResult as Location[]);
        setPois(poiResult as POI[]);
        
        const cats = [...new Set(locResult.map(l => l.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load geospatial data:', err);
        setError('Database connection issue. Some features may be limited.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const viewModeStyles = {
    standard: {
      background: 'bg-slate-900',
      accent: 'text-cyan-400',
      border: 'border-slate-700'
    },
    commerce: {
      background: 'bg-slate-900',
      accent: 'text-emerald-400',
      border: 'border-emerald-700'
    },
    'eco-alert': {
      background: 'bg-green-950',
      accent: 'text-green-400',
      border: 'border-green-700'
    },
    night: {
      background: 'bg-black',
      accent: 'text-green-400',
      border: 'border-green-900'
    },
    flir: {
      background: 'bg-red-950',
      accent: 'text-red-400',
      border: 'border-red-800'
    }
  };

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(l => l.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Geospatial Intelligence</h1>
              <p className="text-sm text-slate-400">Caribbean & Regional Dashboard</p>
            </div>
            
            {/* View Mode Selector */}
            <div className="flex gap-2">
              {(['standard', 'commerce', 'eco-alert', 'night', 'flir'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === mode
                      ? 'bg-cyan-500 text-slate-900'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {mode === 'standard' ? '☀️ Standard' :
                   mode === 'commerce' ? '🏪 Commerce' :
                   mode === 'eco-alert' ? '🌿 Eco-Alert' :
                   mode === 'night' ? '🌙 Night' :
                   '🌡️ FLIR'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700 rounded-xl text-amber-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl overflow-hidden border ${viewModeStyles[viewMode].border} relative`}>
              {/* Map Placeholder - Cesium would go here */}
              <div className={`aspect-[16/9] ${viewModeStyles[viewMode].background} relative`}>
                {/* Simulated map grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-600" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Caribbean region marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-64 h-32 rounded-full ${viewModeStyles[viewMode].accent} opacity-20 animate-pulse`} />
                </div>

                {/* Location markers (simulated) */}
                {filteredLocations.map((loc, idx) => {
                  const x = 20 + (idx * 15) + Math.random() * 10;
                  const y = 30 + (idx * 10) + Math.random() * 10;
                  return (
                    <button
                      key={loc.location_id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`absolute w-4 h-4 rounded-full ${viewModeStyles[viewMode].accent} bg-current animate-ping`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    />
                  );
                })}

                {/* View mode overlay effects */}
                {viewMode === 'night' && (
                  <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay pointer-events-none" />
                )}
                {viewMode === 'flir' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-red-600/20 mix-blend-overlay pointer-events-none" />
                )}
                {viewMode === 'eco-alert' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-teal-900/20 pointer-events-none" />
                )}

                {/* Center info */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg">
                  <p className="text-sm text-slate-300">
                    🗺️ Caribbean Region • {viewMode.toUpperCase()} Mode
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${viewModeStyles[viewMode].background} border ${viewModeStyles[viewMode].border}`}>
                <p className="text-xs text-slate-500">Vendors</p>
                <p className={`text-2xl font-bold ${viewModeStyles[viewMode].accent}`}>{locations.length}</p>
              </div>
              <div className={`p-4 rounded-xl ${viewModeStyles[viewMode].background} border ${viewModeStyles[viewMode].border}`}>
                <p className="text-xs text-slate-500">POIs</p>
                <p className={`text-2xl font-bold ${viewModeStyles[viewMode].accent}`}>{pois.length}</p>
              </div>
              <div className={`p-4 rounded-xl ${viewModeStyles[viewMode].background} border ${viewModeStyles[viewMode].border}`}>
                <p className="text-xs text-slate-500">Islands</p>
                <p className={`text-2xl font-bold ${viewModeStyles[viewMode].accent}`}>
                  {[...new Set(pois.map(p => p.island))].length || 0}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${viewModeStyles[viewMode].background} border ${viewModeStyles[viewMode].border}`}>
                <p className="text-xs text-slate-500">Categories</p>
                <p className={`text-2xl font-bold ${viewModeStyles[viewMode].accent}`}>{categories.length}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Categories</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Vendor Locations */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Vendor Locations</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {loading ? (
                  <p className="text-slate-500 text-sm">Loading...</p>
                ) : filteredLocations.length === 0 ? (
                  <p className="text-slate-500 text-sm">No vendors yet. Vendors from IslandHub will appear here.</p>
                ) : (
                  filteredLocations.map(loc => (
                    <button
                      key={loc.location_id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`w-full p-2 text-left rounded-lg transition-all ${
                        selectedLocation?.location_id === loc.location_id
                          ? 'bg-cyan-500/20 border border-cyan-500'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      <p className="text-sm text-white font-medium">{loc.name}</p>
                      <p className="text-xs text-slate-400">{loc.category}</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* POIs */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Points of Interest</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pois.length === 0 ? (
                  <p className="text-slate-500 text-sm">No POIs yet. Add tourism points of interest to populate.</p>
                ) : (
                  pois.slice(0, 10).map(poi => (
                    <button
                      key={poi.poi_id}
                      className="w-full p-2 text-left rounded-lg bg-slate-800 hover:bg-slate-700"
                    >
                      <p className="text-sm text-white font-medium">{poi.name}</p>
                      <p className="text-xs text-slate-400">{poi.category} • {poi.island}</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h3 className="font-medium text-slate-200 mb-2">Controls</h3>
              <div className="text-xs text-slate-400 space-y-1">
                <p><span className="text-cyan-400">1-5</span> - Switch view mode</p>
                <p><span className="text-cyan-400">Scroll</span> - Zoom in/out</p>
                <p><span className="text-cyan-400">Drag</span> - Pan map</p>
              </div>
            </div>

            {error && (
              <div className="bg-amber-900/20 border border-amber-800 rounded-xl p-4">
                <p className="text-sm text-amber-400">
                  ℹ️ Connect your database to see vendor locations from IslandHub.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}