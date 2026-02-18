-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create input_mode enum
CREATE TYPE input_mode AS ENUM (
  'free_write',
  'question',
  'scenario',
  'decision',
  'emotional',
  'identity'
);

-- Create active_lens enum
CREATE TYPE active_lens AS ENUM (
  'adaptive',
  'strategist',
  'therapist',
  'philosopher',
  'shadow',
  'non_dual',
  'manifestation'
);

-- Create entries table
CREATE TABLE IF NOT EXISTS public.entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  input_text TEXT NOT NULL,
  input_mode input_mode NOT NULL,
  active_lens active_lens NOT NULL,
  depth_level INTEGER NOT NULL CHECK (depth_level >= 1 AND depth_level <= 4),
  emotional_intensity INTEGER CHECK (emotional_intensity >= 0 AND emotional_intensity <= 100),
  identity_threat_score INTEGER CHECK (identity_threat_score >= 0 AND identity_threat_score <= 100),
  distortion_score INTEGER CHECK (distortion_score >= 0 AND distortion_score <= 100),
  excess_importance_score INTEGER CHECK (excess_importance_score >= 0 AND excess_importance_score <= 100),
  assumption_strength_score INTEGER CHECK (assumption_strength_score >= 0 AND assumption_strength_score <= 100),
  state_stability_score INTEGER CHECK (state_stability_score >= 0 AND state_stability_score <= 100)
);

-- Create responses table
CREATE TABLE IF NOT EXISTS public.responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID NOT NULL REFERENCES public.entries(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  structural_analysis TEXT NOT NULL,
  manifestation_analysis TEXT NOT NULL,
  archetypal_analysis TEXT NOT NULL,
  strategic_analysis TEXT NOT NULL,
  corrective_action TEXT NOT NULL,
  forcing_question TEXT NOT NULL
);

-- Create pattern_metrics table
CREATE TABLE IF NOT EXISTS public.pattern_metrics (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  impatience_index DECIMAL(5,2) DEFAULT 0.0,
  wealth_identity_fusion_score DECIMAL(5,2) DEFAULT 0.0,
  ego_defensiveness_score DECIMAL(5,2) DEFAULT 0.0,
  narrative_coherence_score DECIMAL(5,2) DEFAULT 0.0,
  state_drift_frequency DECIMAL(5,2) DEFAULT 0.0,
  excess_importance_frequency DECIMAL(5,2) DEFAULT 0.0,
  identity_stability_index DECIMAL(5,2) DEFAULT 0.0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pattern_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for entries
CREATE POLICY "Users can view own entries"
  ON public.entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON public.entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON public.entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON public.entries FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for responses
CREATE POLICY "Users can view own responses"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.entries
      WHERE entries.id = responses.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own responses"
  ON public.responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.entries
      WHERE entries.id = responses.entry_id
      AND entries.user_id = auth.uid()
    )
  );

-- RLS Policies for pattern_metrics
CREATE POLICY "Users can view own metrics"
  ON public.pattern_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON public.pattern_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON public.pattern_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_entries_user_id ON public.entries(user_id);
CREATE INDEX idx_entries_created_at ON public.entries(created_at DESC);
CREATE INDEX idx_responses_entry_id ON public.responses(entry_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, created_at)
  VALUES (NEW.id, NOW());
  
  INSERT INTO public.pattern_metrics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
