export type InputMode = 
  | 'free_write'
  | 'question'
  | 'scenario'
  | 'decision'
  | 'emotional'
  | 'identity';

export type ActiveLens = 
  | 'adaptive'
  | 'strategist'
  | 'therapist'
  | 'philosopher'
  | 'shadow'
  | 'non_dual'
  | 'manifestation';

export interface Entry {
  id: string;
  user_id: string;
  created_at: string;
  input_text: string;
  input_mode: InputMode;
  active_lens: ActiveLens;
  depth_level: number;
  emotional_intensity: number | null;
  identity_threat_score: number | null;
  distortion_score: number | null;
  excess_importance_score: number | null;
  assumption_strength_score: number | null;
  state_stability_score: number | null;
}

export interface Response {
  id: string;
  entry_id: string;
  created_at: string;
  structural_analysis: string;
  manifestation_analysis: string;
  archetypal_analysis: string;
  strategic_analysis: string;
  corrective_action: string;
  forcing_question: string;
}

export interface PatternMetrics {
  user_id: string;
  impatience_index: number;
  wealth_identity_fusion_score: number;
  ego_defensiveness_score: number;
  narrative_coherence_score: number;
  state_drift_frequency: number;
  excess_importance_frequency: number;
  identity_stability_index: number;
  updated_at: string;
}

export interface ProcessingRequest {
  input_text: string;
  input_mode: InputMode;
  active_lens: ActiveLens;
  depth_level: number;
  brutal_mode: boolean;
}

export interface ProcessingResponse {
  entry_id: string;
  response: Response;
  scores: {
    emotional_intensity: number;
    identity_threat_score: number;
    distortion_score: number;
    excess_importance_score: number;
    assumption_strength_score: number;
    state_stability_score: number;
  };
}
