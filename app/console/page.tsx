'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { InputMode, ActiveLens, ProcessingResponse } from '@/lib/types';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';

export default function ConsolePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>('free_write');
  const [activeLens, setActiveLens] = useState<ActiveLens>('adaptive');
  const [depthLevel, setDepthLevel] = useState(2);
  const [brutalMode, setBrutalMode] = useState(false);
  
  const [response, setResponse] = useState<ProcessingResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useKeyboardShortcuts({
    onSubmit: () => {
      if (inputText.trim() && !processing) {
        handleSubmit(new Event('submit') as any);
      }
    },
    onClear: () => {
      setInputText('');
      setResponse(null);
    },
    onEscape: () => {
      setResponse(null);
      setError('');
    },
  });

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
      return;
    }
    setUser(session.user);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setProcessing(true);
    setError('');
    setResponse(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const res = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          input_text: inputText,
          input_mode: inputMode,
          active_lens: activeLens,
          depth_level: depthLevel,
          brutal_mode: brutalMode,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const data = await res.json();
      setResponse(data);
      setInputText('');
    } catch (err: any) {
      setError(err.message || 'Failed to process input');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Cognitive Console</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/history')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            History
          </button>
          <button
            onClick={() => router.push('/privacy')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Privacy
          </button>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-400">Input Mode</label>
              <select
                value={inputMode}
                onChange={(e) => setInputMode(e.target.value as InputMode)}
                className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
              >
                <option value="free_write">Free Write</option>
                <option value="question">Question</option>
                <option value="scenario">Scenario</option>
                <option value="decision">Decision</option>
                <option value="emotional">Emotional</option>
                <option value="identity">Identity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-400">Active Lens</label>
              <select
                value={activeLens}
                onChange={(e) => setActiveLens(e.target.value as ActiveLens)}
                className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
              >
                <option value="adaptive">Adaptive</option>
                <option value="strategist">Strategist</option>
                <option value="therapist">Therapist</option>
                <option value="philosopher">Philosopher</option>
                <option value="shadow">Shadow</option>
                <option value="non_dual">Non-Dual</option>
                <option value="manifestation">Manifestation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-400">
                Depth Level: {depthLevel}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                value={depthLevel}
                onChange={(e) => setDepthLevel(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brutalMode}
                  onChange={(e) => setBrutalMode(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-400">Brutal Mode</span>
              </label>
            </div>
          </div>

          <div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your input..."
              className="w-full h-64 px-4 py-3 bg-secondary border border-border rounded text-foreground resize-none"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-950 border border-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={processing || !inputText.trim()}
            className="w-full py-3 bg-accent hover:bg-opacity-80 border border-border rounded font-medium disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {response && (
          <div className="mt-8 space-y-6">
            <div className="bg-primary border border-border rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-300">SECTION 1: Structural Diagnosis</h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{response.response.structural_analysis}</p>
            </div>

            <div className="bg-primary border border-border rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-300">SECTION 2: Manifestation Layer</h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{response.response.manifestation_analysis}</p>
            </div>

            <div className="bg-primary border border-border rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-300">SECTION 3: Archetypal / Energetic Interpretation</h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{response.response.archetypal_analysis}</p>
            </div>

            <div className="bg-primary border border-border rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-300">SECTION 4: Strategic Implication</h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{response.response.strategic_analysis}</p>
            </div>

            <div className="bg-primary border border-border rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-300">SECTION 5: Corrective / Amplifying Action</h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{response.response.corrective_action}</p>
            </div>

            <div className="bg-primary border border-red-900 border-2 rounded p-6">
              <h2 className="text-lg font-bold mb-3 text-red-400">SECTION 6: One Forcing Question</h2>
              <p className="text-foreground font-medium text-lg leading-relaxed">{response.response.forcing_question}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">Emotional Intensity</div>
                <div className="text-2xl font-bold">{response.scores.emotional_intensity}</div>
              </div>
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">Identity Threat</div>
                <div className="text-2xl font-bold">{response.scores.identity_threat_score}</div>
              </div>
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">Distortion</div>
                <div className="text-2xl font-bold">{response.scores.distortion_score}</div>
              </div>
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">Excess Importance</div>
                <div className="text-2xl font-bold">{response.scores.excess_importance_score}</div>
              </div>
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">Assumption Strength</div>
                <div className="text-2xl font-bold">{response.scores.assumption_strength_score}</div>
              </div>
              <div className="bg-secondary border border-border rounded p-4">
                <div className="text-xs text-gray-500 mb-1">State Stability</div>
                <div className="text-2xl font-bold">{response.scores.state_stability_score}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background px-6 py-3 text-center text-xs text-gray-600">
        <span className="mr-4">Cmd/Ctrl+Enter: Submit</span>
        <span className="mr-4">Cmd/Ctrl+K: Clear</span>
        <span>Esc: Reset</span>
      </div>
    </div>
  );
}
