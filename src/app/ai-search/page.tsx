'use client';

import { useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  type: 'document' | 'image' | 'video' | 'audio';
  relevance: number;
}

export default function AISearchPage() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<'all' | 'document' | 'image' | 'video'>('all');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);

    try {
      const response = await fetch('/api/ai-search/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, type: searchType }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">AI Search & Knowledge</h1>
        <p className="text-slate-400">Semantic search across documents, images, video, and audio</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for? (e.g., 'Caribbean business regulations')"
              className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 text-lg focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!query.trim() || searching}
              className="absolute right-3 top-3 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg transition-colors"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'document', 'image', 'video'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSearchType(type)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  searchType === type
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">{results.length} results found</p>
          {results.map((result) => (
            <div
              key={result.id}
              className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(result.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-slate-100">{result.title}</h3>
                    <span className="text-sm text-cyan-400">
                      {Math.round(result.relevance * 100)}% match
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{result.snippet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!searching && results.length === 0 && query && (
        <div className="text-center py-12 text-slate-500">
          No results found. Try different keywords.
        </div>
      )}

      {!query && (
        <div className="mt-8 p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Example searches:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Caribbean trade regulations',
              'South America market trends',
              'Business permits Jamaica',
              'Export documentation Brazil',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-sm rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}