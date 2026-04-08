'use client';

import { useState } from 'react';

interface ParseResult {
  content: string;
  format: string;
  metadata: {
    pageCount?: number;
    title?: string;
    extractedAt: string;
  };
}

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState('');
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    try {
      const response = await fetch('/api/documents/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parsed-document.${result.format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Document Processing</h1>
        <p className="text-slate-400">Extract data from PDFs and spreadsheets using Light Parse</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Upload Document
            </label>
            <input
              type="file"
              accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-slate-900 file:font-medium file:cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Output Format
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="markdown"
                  checked={format === 'markdown'}
                  onChange={() => setFormat('markdown')}
                  className="w-4 h-4 text-cyan-400"
                />
                <span className="text-slate-300">Markdown</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={format === 'json'}
                  onChange={() => setFormat('json')}
                  className="w-4 h-4 text-cyan-400"
                />
                <span className="text-slate-300">JSON</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Processing...' : 'Extract Data'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-100">Result</h2>
            <button
              onClick={downloadResult}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium rounded-lg transition-colors"
            >
              Download
            </button>
          </div>
          
          <div className="mb-4 text-sm text-slate-400">
            {result.metadata.pageCount && <span>Pages: {result.metadata.pageCount} | </span>}
            <span>Extracted: {new Date(result.metadata.extractedAt).toLocaleString()}</span>
          </div>

          <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 max-h-96 overflow-y-auto">
            {result.content.substring(0, 5000)}
            {result.content.length > 5000 && '...'}
          </pre>
        </div>
      )}
    </div>
  );
}