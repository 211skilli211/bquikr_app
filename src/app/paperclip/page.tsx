'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed';
  task?: string;
}

export default function PaperclipPage() {
  const [companyName, setCompanyName] = useState('');
  const [mission, setMission] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [heartbeatInterval, setHeartbeatInterval] = useState(60);
  const [agents, setAgents] = useState<Agent[]>([]);

  const initializeCompany = () => {
    if (!companyName || !mission) return;
    setIsInitialized(true);
    setAgents([
      { id: '1', name: 'CEO', role: 'Chief Executive Officer', status: 'idle' },
    ]);
  };

  const triggerHeartbeat = () => {
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: agent.id === '1' ? 'working' : agent.status,
      task: agent.id === '1' ? 'Checking employee status and assigning tasks...' : agent.task,
    })));

    setTimeout(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: 'completed',
        task: undefined,
      })));
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Paperclip AI Company</h1>
        <p className="text-slate-400">Autonomous AI agents that run your business 24/7</p>
      </div>

      {!isInitialized ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Initialize Your AI Company</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Quikr Operations"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mission
              </label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="e.g., Grow the Caribbean marketplace by automating vendor onboarding and content creation"
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <button
              onClick={initializeCompany}
              disabled={!companyName || !mission}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              Initialize Company
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-200">{companyName}</h2>
                <p className="text-slate-400 text-sm">{mission}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Heartbeat Interval</p>
                  <select
                    value={heartbeatInterval}
                    onChange={(e) => setHeartbeatInterval(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-sm"
                  >
                    <option value={10}>10 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
                <button
                  onClick={triggerHeartbeat}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium rounded-lg transition-colors"
                >
                  Trigger Heartbeat
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Organization Chart</h3>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      agent.status === 'idle' ? 'bg-slate-500' :
                      agent.status === 'working' ? 'bg-amber-500 animate-pulse' :
                      'bg-emerald-500'
                    }`} />
                    <div>
                      <p className="font-medium text-slate-100">{agent.name}</p>
                      <p className="text-sm text-slate-400">{agent.role}</p>
                    </div>
                  </div>
                  {agent.task && (
                    <p className="text-sm text-cyan-400">{agent.task}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
              <h4 className="font-medium text-slate-200 mb-2">CEO System Prompt</h4>
              <p className="text-sm text-slate-400">
                Act as the orchestrator of all agents. Check employee status every heartbeat and assign work to idle agents.
              </p>
            </div>
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
              <h4 className="font-medium text-slate-200 mb-2">VPS Setup Required</h4>
              <p className="text-sm text-slate-400">
                For 24/7 operation, deploy to a VPS with Docker. See ARCHITECTURE.md for setup instructions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}