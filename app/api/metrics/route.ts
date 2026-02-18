import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: metrics, error: metricsError } = await supabase
      .from('pattern_metrics')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (metricsError) {
      return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
    }

    const { data: entries, error: entriesError } = await supabase
      .from('entries')
      .select('created_at, emotional_intensity, state_stability_score, excess_importance_score')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(30);

    if (entriesError) {
      return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }

    return NextResponse.json({
      metrics,
      timeline: entries || [],
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Metrics error:', error);
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
