import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { synthesize } from '@/lib/ai/synthesis-engine';
import { analyzePatterns } from '@/lib/ai/pattern-analyzer';
import { checkRateLimit } from '@/lib/ai/rate-limiter';
import { Entry, PatternMetrics } from '@/lib/types';
import { validateProcessingRequest } from '@/lib/utils/validation';
import { AuthError, RateLimitError } from '@/lib/utils/errors';
import { z } from 'zod';

export async function POST(request: NextRequest) {
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
      throw new AuthError();
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new AuthError();
    }

    const rateLimit = checkRateLimit(user.id);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', resetAt: rateLimit.resetAt },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = validateProcessingRequest(body);

    const { data: recentEntries } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: currentMetrics } = await supabase
      .from('pattern_metrics')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const historyContext = recentEntries && recentEntries.length > 0
      ? `Recent pattern summary: ${recentEntries.length} entries analyzed. Latest themes and patterns inform current analysis.`
      : undefined;

    const synthesis = await synthesize(
      validated.input_text,
      validated.input_mode,
      validated.active_lens,
      validated.depth_level,
      validated.brutal_mode,
      historyContext
    );

    const { data: entry, error: entryError } = await supabase
      .from('entries')
      .insert({
        user_id: user.id,
        input_text: validated.input_text,
        input_mode: validated.input_mode,
        active_lens: validated.active_lens,
        depth_level: validated.depth_level,
        emotional_intensity: synthesis.scores.emotional_intensity,
        identity_threat_score: synthesis.scores.identity_threat_score,
        distortion_score: synthesis.scores.distortion_score,
        excess_importance_score: synthesis.scores.excess_importance_score,
        assumption_strength_score: synthesis.scores.assumption_strength_score,
        state_stability_score: synthesis.scores.state_stability_score,
      })
      .select()
      .single();

    if (entryError || !entry) {
      throw new Error('Failed to create entry');
    }

    const { data: response, error: responseError } = await supabase
      .from('responses')
      .insert({
        entry_id: entry.id,
        structural_analysis: synthesis.structural_analysis,
        manifestation_analysis: synthesis.manifestation_analysis,
        archetypal_analysis: synthesis.archetypal_analysis,
        strategic_analysis: synthesis.strategic_analysis,
        corrective_action: synthesis.corrective_action,
        forcing_question: synthesis.forcing_question,
      })
      .select()
      .single();

    if (responseError || !response) {
      throw new Error('Failed to create response');
    }

    if (currentMetrics && recentEntries) {
      const metricUpdates = analyzePatterns(
        entry as Entry,
        recentEntries as Entry[],
        currentMetrics as PatternMetrics
      );

      await supabase
        .from('pattern_metrics')
        .update({
          ...metricUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    }

    return NextResponse.json({
      entry_id: entry.id,
      response,
      scores: synthesis.scores,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Processing error:', error);
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
