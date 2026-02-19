'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/console');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Cognitive Console</h1>
        <p className="text-gray-400 mb-8">High-intelligence reflective processing system</p>
        <div className="text-gray-500">Loading...</div>
      </div>
    </div>
  );
}
