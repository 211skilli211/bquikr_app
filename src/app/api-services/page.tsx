'use client';

import { useState } from 'react';

const apiServices = [
  {
    id: 'pdf-gen',
    name: 'PDF Generation',
    description: 'Generate styled PDFs from data - invoices, reports, receipts',
    endpoint: '/api/services/pdf',
    method: 'POST',
    example: { template: 'invoice', data: { amount: 100, currency: 'USD' } },
  },
  {
    id: 'screenshot',
    name: 'Website Screenshot',
    description: 'Capture any webpage as a high-quality image',
    endpoint: '/api/services/screenshot',
    method: 'POST',
    example: { url: 'https://example.com', width: 1920, height: 1080 },
  },
  {
    id: 'email-verify',
    name: 'Email Verification',
    description: 'Check if an email address is valid and deliverable',
    endpoint: '/api/services/email/verify',
    method: 'POST',
    example: { email: 'user@example.com' },
  },
  {
    id: 'email-retrieve',
    name: 'Email Retrieval',
    description: 'Get employee emails from a company domain',
    endpoint: '/api/services/email/retrieve',
    method: 'POST',
    example: { domain: 'company.com', limit: 10 },
  },
  {
    id: 'poi',
    name: 'POI Discovery',
    description: 'Find points of interest - beaches, waterfalls, restaurants',
    endpoint: '/api/services/poi',
    method: 'GET',
    example: { island: 'Jamaica', category: 'beach' },
  },
  {
    id: 'marine',
    name: 'Marine Conditions',
    description: 'Get beach water temperature, wave height, safety flags',
    endpoint: '/api/services/marine',
    method: 'GET',
    example: { lat: 18.2208, lng: -66.5901 },
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Real-time Caribbean weather data with caching',
    endpoint: '/api/services/weather',
    method: 'GET',
    example: { lat: 18.2208, lng: -66.5901 },
  },
];

export default function APIServicesPage() {
  const [selectedService, setSelectedService] = useState(apiServices[0]);
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testEndpoint = async () => {
    if (!apiKey) {
      setResponse('Please enter an API key to test');
      return;
    }

    setLoading(true);
    setResponse('Testing...');

    try {
      const options: RequestInit = {
        method: selectedService.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      };

      if (selectedService.method !== 'GET') {
        options.body = JSON.stringify(selectedService.example);
      } else {
        const params = new URLSearchParams();
        Object.entries(selectedService.example).forEach(([key, value]) => {
          params.append(key, value as string);
        });
        selectedService.endpoint = `${selectedService.endpoint}?${params.toString()}`;
      }

      const res = await fetch(selectedService.endpoint, options);

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : 'Failed to test endpoint'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">API Services</h1>
        <p className="text-slate-400">Ready-to-use APIs for automation workflows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Available Services</h2>
          <div className="space-y-3">
            {apiServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full p-4 text-left rounded-xl border transition-all ${
                  selectedService.id === service.id
                    ? 'bg-cyan-500/10 border-cyan-500'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-100">{service.name}</span>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">{service.method}</span>
                </div>
                <p className="text-sm text-slate-400">{service.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h3 className="font-semibold text-slate-200 mb-3">Test Endpoint</h3>
            <div className="space-y-3">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-sm"
              />
              <button
                onClick={testEndpoint}
                disabled={loading}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-900 font-medium rounded-lg transition-colors"
              >
                {loading ? 'Testing...' : 'Test API'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Endpoint Details</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="mb-4">
              <span className={`text-xs px-2 py-1 rounded ${
                selectedService.method === 'GET' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}>{selectedService.method}</span>
              <code className="ml-2 text-cyan-400 text-sm">{selectedService.endpoint.split('?')[0]}</code>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Request Body:</h4>
              <pre className="p-3 bg-slate-950 rounded-lg text-sm text-slate-300 overflow-x-auto">
                {JSON.stringify(selectedService.example, null, 2)}
              </pre>
            </div>

            {response && (
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Response:</h4>
                <pre className="p-3 bg-slate-950 rounded-lg text-sm text-slate-300 overflow-x-auto max-h-64">
                  {response}
                </pre>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <h3 className="font-semibold text-slate-200 mb-2">Usage & Pricing</h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Free tier: 100 requests/month</li>
              <li>• Pro tier: $29/month - 10,000 requests</li>
              <li>• Enterprise: Custom limits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}