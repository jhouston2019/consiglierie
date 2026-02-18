export const INPUT_MODES = [
  { value: 'free_write', label: 'Free Write' },
  { value: 'question', label: 'Question' },
  { value: 'scenario', label: 'Scenario' },
  { value: 'decision', label: 'Decision' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'identity', label: 'Identity' },
] as const;

export const ACTIVE_LENSES = [
  { value: 'adaptive', label: 'Adaptive', description: 'Balanced across all layers' },
  { value: 'strategist', label: 'Strategist', description: 'Strategic cognition focus' },
  { value: 'therapist', label: 'Therapist', description: 'Psychological structure focus' },
  { value: 'philosopher', label: 'Philosopher', description: 'Existential meaning focus' },
  { value: 'shadow', label: 'Shadow', description: 'Archetypal integration focus' },
  { value: 'non_dual', label: 'Non-Dual', description: 'Observer/observed collapse' },
  { value: 'manifestation', label: 'Manifestation', description: 'Assumption integrity focus' },
] as const;

export const DEPTH_LEVELS = [
  { value: 1, label: 'Surface', description: 'Brief, direct observations' },
  { value: 2, label: 'Moderate', description: 'Pattern identification' },
  { value: 3, label: 'Deep', description: 'Underlying structures' },
  { value: 4, label: 'Maximum', description: 'Full ontological stack' },
] as const;

export const METRIC_DESCRIPTIONS = {
  identity_stability_index: 'Overall coherence and emotional regulation',
  excess_importance_frequency: 'Over-attachment creating resistance',
  impatience_index: 'Timeline frustration and urgency patterns',
  narrative_coherence_score: 'Consistency across entries and modes',
  state_drift_frequency: 'Emotional regulation variance',
  wealth_identity_fusion_score: 'Achievement-identity conflation',
  ego_defensiveness_score: 'Resistance to challenge patterns',
} as const;

export const RATE_LIMIT = {
  MAX_REQUESTS: 20,
  WINDOW_MS: 60 * 1000,
} as const;

export const VALIDATION = {
  MIN_INPUT_LENGTH: 1,
  MAX_INPUT_LENGTH: 10000,
  MIN_PASSWORD_LENGTH: 6,
} as const;
