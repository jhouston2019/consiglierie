'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { PatternMetrics } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface TimelineEntry {
  created_at: string;
  emotional_intensity: number;
  state_stability_score: number;
  excess_importance_score: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<PatternMetrics | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
      return;
    }

    try {
      const res = await fetch('/api/metrics', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to load metrics');

      const data = await res.json();
      setMetrics(data.metrics);
      setTimeline(data.timeline);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const chartData = timeline.map((entry) => ({
    date: new Date(entry.created_at).toLocaleDateString(),
    emotional: entry.emotional_intensity,
    stability: entry.state_stability_score,
    excess: entry.excess_importance_score,
  }));

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/console')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Console
          </button>
          <button
            onClick={() => router.push('/privacy')}
            className="text-sm text-gray-400 hover:text-foreground"
          >
            Privacy
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {metrics && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Pattern Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Identity Stability Index</div>
                  <div className="text-3xl font-bold text-green-400">{metrics.identity_stability_index.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Overall coherence and regulation</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Excess Importance Frequency</div>
                  <div className="text-3xl font-bold text-yellow-400">{metrics.excess_importance_frequency.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Over-attachment patterns</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Impatience Index</div>
                  <div className="text-3xl font-bold text-orange-400">{metrics.impatience_index.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Timeline frustration markers</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Narrative Coherence</div>
                  <div className="text-3xl font-bold text-blue-400">{metrics.narrative_coherence_score.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Consistency across entries</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">State Drift Frequency</div>
                  <div className="text-3xl font-bold text-purple-400">{metrics.state_drift_frequency.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Emotional regulation variance</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Wealth-Identity Fusion</div>
                  <div className="text-3xl font-bold text-red-400">{metrics.wealth_identity_fusion_score.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Achievement-identity conflation</div>
                </div>

                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-sm text-gray-500 mb-2">Ego Defensiveness</div>
                  <div className="text-3xl font-bold text-pink-400">{metrics.ego_defensiveness_score.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 mt-2">Resistance to challenge</div>
                </div>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="bg-primary border border-border rounded p-6">
                <h2 className="text-lg font-bold mb-6">Longitudinal Tracking</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '4px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="emotional"
                      stroke="#ef4444"
                      name="Emotional Intensity"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="stability"
                      stroke="#22c55e"
                      name="State Stability"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="excess"
                      stroke="#f59e0b"
                      name="Excess Importance"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
