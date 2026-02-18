'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Entry, Response } from '@/lib/types';

interface EntryWithResponse extends Entry {
  responses: Response[];
}

export default function HistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<EntryWithResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<EntryWithResponse | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
      return;
    }

    const { data, error } = await supabase
      .from('entries')
      .select(`
        *,
        responses (*)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setEntries(data as EntryWithResponse[]);
    }
    setLoading(false);
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
        <h1 className="text-xl font-bold">History</h1>
        <button
          onClick={() => router.push('/console')}
          className="text-sm text-gray-400 hover:text-foreground"
        >
          Back to Console
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`p-4 bg-primary border rounded cursor-pointer hover:border-gray-500 ${
                  selectedEntry?.id === entry.id ? 'border-gray-400' : 'border-border'
                }`}
              >
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(entry.created_at).toLocaleString()}
                </div>
                <div className="text-sm line-clamp-3">{entry.input_text}</div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded">
                    {entry.input_mode}
                  </span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded">
                    {entry.active_lens}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            {selectedEntry ? (
              <div className="space-y-6">
                <div className="bg-primary border border-border rounded p-6">
                  <div className="text-xs text-gray-500 mb-3">
                    {new Date(selectedEntry.created_at).toLocaleString()} • {selectedEntry.input_mode} • {selectedEntry.active_lens} • Depth {selectedEntry.depth_level}
                  </div>
                  <p className="text-foreground whitespace-pre-wrap">{selectedEntry.input_text}</p>
                </div>

                {selectedEntry.responses[0] && (
                  <>
                    <div className="bg-primary border border-border rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-gray-400">Structural Diagnosis</h3>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedEntry.responses[0].structural_analysis}
                      </p>
                    </div>

                    <div className="bg-primary border border-border rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-gray-400">Manifestation Layer</h3>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedEntry.responses[0].manifestation_analysis}
                      </p>
                    </div>

                    <div className="bg-primary border border-border rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-gray-400">Archetypal Interpretation</h3>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedEntry.responses[0].archetypal_analysis}
                      </p>
                    </div>

                    <div className="bg-primary border border-border rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-gray-400">Strategic Implication</h3>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedEntry.responses[0].strategic_analysis}
                      </p>
                    </div>

                    <div className="bg-primary border border-border rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-gray-400">Corrective Action</h3>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedEntry.responses[0].corrective_action}
                      </p>
                    </div>

                    <div className="bg-primary border border-red-900 border-2 rounded p-6">
                      <h3 className="text-sm font-bold mb-3 text-red-400">Forcing Question</h3>
                      <p className="text-foreground font-medium">
                        {selectedEntry.responses[0].forcing_question}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Select an entry to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
