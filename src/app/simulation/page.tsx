'use client';

import { useState } from 'react';

interface SimulationConfig {
  agentCount: number;
  scenario: string;
  demographics: string[];
}

export default function SimulationPage() {
  const [config, setConfig] = useState<SimulationConfig>({
    agentCount: 10000,
    scenario: 'vendor fee increase',
    demographics: ['Caribbean', 'South America'],
  });
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runSimulation = () => {
    setRunning(true);
    setResults(null);
    
    setTimeout(() => {
      setRunning(false);
      setResults({
        opinionLeaders: ['Maria Santos', 'John Brown', 'Carlos Rodriguez'],
        backlash: 'Moderate - 23% oppose',
        sentiment: {
          positive: 45,
          neutral: 32,
          negative: 23,
        },
        recommendations: [
          'Phase in fees over 3 months',
          'Add value bundle for Caribbean vendors',
          'Launch feedback campaign',
        ],
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Simulation & Analytics</h1>
        <p className="text-slate-400">Test marketplace strategies with Mirofish crowd simulation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Simulation Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agent Count
                </label>
                <select
                  value={config.agentCount}
                  onChange={(e) => setConfig({ ...config, agentCount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                >
                  <option value={1000}>1,000 agents (Quick test)</option>
                  <option value={10000}>10,000 agents (Standard)</option>
                  <option value={100000}>100,000 agents (Detailed)</option>
                  <option value={1000000}>1,000,000 agents (Full scale)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Test Scenario
                </label>
                <select
                  value={config.scenario}
                  onChange={(e) => setConfig({ ...config, scenario: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                >
                  <option value="vendor fee increase">Vendor Fee Increase</option>
                  <option value="new category launch">New Category Launch</option>
                  <option value="shipping policy change">Shipping Policy Change</option>
                  <option value="marketing campaign">Marketing Campaign</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Demographics
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['Caribbean', 'South America', 'North America', 'Europe'].map((demo) => (
                    <label key={demo} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.demographics.includes(demo)}
                        onChange={(e) => {
                          const newDemos = e.target.checked
                            ? [...config.demographics, demo]
                            : config.demographics.filter(d => d !== demo);
                          setConfig({ ...config, demographics: newDemos });
                        }}
                        className="w-4 h-4 rounded bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">{demo}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={runSimulation}
                disabled={running}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                {running ? 'Running Simulation...' : 'Run Simulation'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {results ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-4">Results</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-300 mb-2">Opinion Leaders Identified</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.opinionLeaders.map((leader: string) => (
                      <span key={leader} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                        {leader}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-300 mb-2">Sentiment Analysis</h4>
                  <div className="flex gap-2">
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{results.sentiment.positive}%</div>
                      <div className="text-xs text-slate-500">Positive</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-slate-400">{results.sentiment.neutral}%</div>
                      <div className="text-xs text-slate-500">Neutral</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-red-400">{results.sentiment.negative}%</div>
                      <div className="text-xs text-slate-500">Negative</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-900/20 border border-amber-800 rounded-lg">
                  <h4 className="font-medium text-amber-400 mb-2">{results.backlash}</h4>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-300 mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-cyan-400">→</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-12 text-center">
              <p className="text-4xl mb-4">🎲</p>
              <p className="text-slate-400">Configure and run a simulation to see results</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-900/20 border border-amber-800 rounded-xl">
        <p className="text-sm text-amber-400">
          ⚠️ Full Mirofish implementation requires Python 3.11, GPU access (Kaggle), and LLM API keys.
          This is a demo interface. See ARCHITECTURE.md for full setup.
        </p>
      </div>
    </div>
  );
}