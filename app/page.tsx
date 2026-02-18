import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export default async function Home() {
  redirect('/auth');
}
