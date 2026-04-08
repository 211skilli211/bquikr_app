'use client';

import { useState } from 'react';

const demoLocations = [
  { name: 'Kingston, Jamaica', lat: 17.9714, lng: -76.7936 },
  { name: 'Port of Spain, Trinidad', lat: 10.6918, lng: -61.5615 },
  { name: 'Bridgetown, Barbados', lat: 13.1132, lng: -59.5988 },
  { name: 'Georgetown, Guyana', lat: 6.8013, lng: -58.1551 },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'Bogotá, Colombia', lat: 4.7110, lng: -74.0721 },
];

export default function GeospatialPage() {
  const [selectedLocation, setSelectedLocation] = useState(demoLocations[0]);
  const [viewMode, setViewMode] = useState<'standard' | 'crt' | 'nvg' | 'flir'>('standard');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Geospatial Intelligence</h1>
        <p className="text-slate-400">3D mapping dashboard for Caribbean & South America</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Map View</h2>
            <div className="flex gap-2">
              {(['standard', 'crt', 'nvg', 'flir'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm rounded ${
                    viewMode === mode
                      ? 'bg-cyan-500 text-slate-900'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className={`aspect-video rounded-lg flex items-center justify-center ${
            viewMode === 'crt' ? 'bg-green-900/30' :
            viewMode === 'nvg' ? 'bg-green-800/50' :
            viewMode === 'flir' ? 'bg-red-900/50' :
            'bg-slate-800'
          }`}>
            <div className="text-center">
              <p className="text-4xl mb-2">🗺️</p>
              <p className="text-slate-400">
                {viewMode === 'standard' && 'Google 3D Tiles - Standard View'}
                {viewMode === 'crt' && 'CRT Mode - Retro Display'}
                {viewMode === 'nvg' && 'Night Vision (NVG) Mode'}
                {viewMode === 'flir' && 'Thermal (FLIR) Mode'}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {selectedLocation.name} ({selectedLocation.lat}, {selectedLocation.lng})
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <p className="text-xs text-slate-500">Flights</p>
              <p className="text-lg font-semibold text-cyan-400">247</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <p className="text-xs text-slate-500">Satellites</p>
              <p className="text-lg font-semibold text-cyan-400">12</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <p className="text-xs text-slate-500">CCTV Feeds</p>
              <p className="text-lg font-semibold text-cyan-400">89</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <p className="text-xs text-slate-500">Seismic</p>
              <p className="text-lg font-semibold text-cyan-400">0</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <h3 className="font-semibold text-slate-200 mb-3">Points of Interest</h3>
            <div className="space-y-2">
              {demoLocations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full p-2 text-left rounded ${
                    selectedLocation.name === loc.name
                      ? 'bg-cyan-500/20 border border-cyan-500'
                      : 'bg-slate-800/50 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-sm text-slate-200">{loc.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
            <h3 className="font-medium text-slate-200 mb-2">Keyboard Controls</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p><span className="text-cyan-400">Q/W/E/R/T</span> - Jump to POI</p>
              <p><span className="text-cyan-400">1/2/3/4</span> - Switch view mode</p>
              <p><span className="text-cyan-400">Scroll</span> - Zoom</p>
              <p><span className="text-cyan-400">Drag</span> - Pan camera</p>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-800 rounded-xl p-4">
            <p className="text-sm text-amber-400">
              ⚠️ Full implementation requires Google 3D Tiles API, OpenSky API, and OSM integration. 
              See ARCHITECTURE.md for setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}