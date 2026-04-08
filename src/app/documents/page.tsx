'use client';

import { useState } from 'react';

type AgentRole = 'troubleshooter' | 'data-scientist' | 'engineer' | 'marketing';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function DocumentsPage() {
  const [activeRole, setActiveRole] = useState<AgentRole>('troubleshooter');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Documents - the orchestrator. I can help you as a troubleshooter, data scientist, engineer, or marketing agent. What do you need?',
      timestamp: new Date(),
    },
  ]);
  const [processing, setProcessing] = useState(false);

  const roles = [
    { id: 'troubleshooter', name: 'Troubleshooter', icon: '🔧', description: 'Diagnose and fix issues' },
    { id: 'data-scientist', name: 'Data Scientist', icon: '📊', description: 'Analyze patterns and data' },
    { id: 'engineer', name: 'Engineer', icon: '⚙️', description: 'Build and automate workflows' },
    { id: 'marketing', name: 'Marketing', icon: '📢', description: 'Create and manage campaigns' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setProcessing(true);

    setTimeout(() => {
      const responses: Record<AgentRole, string[]> = {
        'troubleshooter': [
          'I\'ve diagnosed the issue. The problem appears to be related to the API response timeout. Here\'s the fix:',
          'Analyzing the error logs... Found 3 potential causes. Let me run diagnostics.',
          'Issue identified: Database connection pool exhaustion. Recommend increasing pool size.',
        ],
        'data-scientist': [
          'Running statistical analysis on your data... Found significant trends in Q4 performance.',
          'Processing dataset... Insights: 23% increase in Caribbean transactions, 15% churn reduction.',
          'Analysis complete. Key finding: Customer segmentation reveals 3 distinct groups.',
        ],
        'engineer': [
          'Building automated workflow... Created new pipeline for data processing.',
          'Executing code generation... Generated 450 lines of TypeScript code.',
          'Automation complete: New scheduled task created for daily reports.',
        ],
        'marketing': [
          'Creating marketing campaign... Generated 5 content variants for review.',
          'Analyzing campaign performance... Best performing: Video content, 34% engagement.',
          'Campaign deployed. Projected reach: 50K users across Caribbean region.',
        ],
      };

      const randomResponse = responses[activeRole][Math.floor(Math.random() * responses[activeRole].length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Documents</h1>
        <p className="text-slate-400">The orchestrator - troubleshooter, data scientist, engineer, marketing agent</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Selector */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sticky top-24">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Select Role</h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id as AgentRole)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    activeRole === role.id
                      ? 'bg-cyan-500/20 border border-cyan-500'
                      : 'bg-slate-800/50 border border-transparent hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{role.icon}</span>
                    <div>
                      <p className="font-medium text-slate-200">{role.name}</p>
                      <p className="text-xs text-slate-500">{role.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-slate-800/30">
              <h3 className="text-sm font-medium text-slate-300 mb-2">File Processing</h3>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Files
              </a>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-slate-600' : 'text-slate-500'}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {processing && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-4 rounded-xl">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask the ${roles.find(r => r.id === activeRole)?.name}...`}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || processing}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-medium rounded-xl transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}