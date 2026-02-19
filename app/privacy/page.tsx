'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Privacy Statement</h1>
        <button
          onClick={() => router.push('/console')}
          className="text-sm text-gray-400 hover:text-foreground"
        >
          Back to Console
        </button>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <section className="bg-primary border border-border rounded p-6">
          <h2 className="text-lg font-bold mb-4">Data Privacy</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              All user data is private and secured through Row Level Security (RLS) policies.
              Only you can access your entries, responses, and metrics.
            </p>
            <p>
              Your data is never shared with third parties, made public, or used for AI training purposes.
            </p>
            <p>
              Authentication is handled securely through Supabase Auth with encrypted password storage.
            </p>
          </div>
        </section>

        <section className="bg-primary border border-border rounded p-6">
          <h2 className="text-lg font-bold mb-4">Data Storage</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              Your entries and processing results are stored in a secure PostgreSQL database
              with encryption at rest.
            </p>
            <p>
              All database queries enforce user-level isolation through RLS policies,
              ensuring complete data separation between users.
            </p>
          </div>
        </section>

        <section className="bg-primary border border-border rounded p-6">
          <h2 className="text-lg font-bold mb-4">AI Processing</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              Your inputs are processed through OpenAI&apos;s API for cognitive analysis.
              OpenAI&apos;s data usage policies apply to API requests.
            </p>
            <p>
              No conversation history is retained by the AI provider beyond the processing session.
            </p>
          </div>
        </section>

        <section className="bg-primary border border-border rounded p-6">
          <h2 className="text-lg font-bold mb-4">Data Deletion</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              You can request complete account and data deletion by contacting support.
              All associated entries, responses, and metrics will be permanently deleted.
            </p>
          </div>
        </section>

        <section className="bg-primary border border-border rounded p-6">
          <h2 className="text-lg font-bold mb-4">No Public Profiles</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              This system has no social features, public profiles, or sharing capabilities.
              Your cognitive processing is entirely private.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
