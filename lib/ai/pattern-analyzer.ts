import { Entry, PatternMetrics } from '@/lib/types';

interface MetricUpdates {
  impatience_index?: number;
  wealth_identity_fusion_score?: number;
  ego_defensiveness_score?: number;
  narrative_coherence_score?: number;
  state_drift_frequency?: number;
  excess_importance_frequency?: number;
  identity_stability_index?: number;
}

export function analyzePatterns(
  currentEntry: Entry,
  recentEntries: Entry[],
  currentMetrics: PatternMetrics
): MetricUpdates {
  const updates: MetricUpdates = {};
  
  const text = currentEntry.input_text.toLowerCase();
  
  const impatienceMarkers = [
    'why isn\'t', 'when will', 'still waiting', 'not happening',
    'frustrated', 'taking too long', 'should have', 'by now'
  ];
  const impatienceDetected = impatienceMarkers.some(marker => text.includes(marker));
  if (impatienceDetected) {
    updates.impatience_index = Math.min(100, currentMetrics.impatience_index + 5);
  } else if (currentMetrics.impatience_index > 0) {
    updates.impatience_index = Math.max(0, currentMetrics.impatience_index - 1);
  }
  
  const wealthIdentityMarkers = [
    'i need money to', 'without money i', 'if i had money',
    'money will make me', 'can\'t be happy until', 'success means'
  ];
  const wealthFusionDetected = wealthIdentityMarkers.some(marker => text.includes(marker));
  if (wealthFusionDetected) {
    updates.wealth_identity_fusion_score = Math.min(100, currentMetrics.wealth_identity_fusion_score + 5);
  } else if (currentMetrics.wealth_identity_fusion_score > 0) {
    updates.wealth_identity_fusion_score = Math.max(0, currentMetrics.wealth_identity_fusion_score - 1);
  }
  
  const egoDefenseMarkers = [
    'you don\'t understand', 'that\'s not true', 'but actually',
    'you\'re wrong', 'i\'m not', 'that\'s different'
  ];
  const defenseDetected = egoDefenseMarkers.some(marker => text.includes(marker));
  if (defenseDetected && currentEntry.distortion_score && currentEntry.distortion_score > 60) {
    updates.ego_defensiveness_score = Math.min(100, currentMetrics.ego_defensiveness_score + 7);
  } else if (currentMetrics.ego_defensiveness_score > 0) {
    updates.ego_defensiveness_score = Math.max(0, currentMetrics.ego_defensiveness_score - 2);
  }
  
  const narrativeCoherence = calculateNarrativeCoherence(currentEntry, recentEntries);
  updates.narrative_coherence_score = narrativeCoherence;
  
  if (currentEntry.excess_importance_score && currentEntry.excess_importance_score > 70) {
    updates.excess_importance_frequency = Math.min(100, currentMetrics.excess_importance_frequency + 4);
  } else if (currentMetrics.excess_importance_frequency > 0) {
    updates.excess_importance_frequency = Math.max(0, currentMetrics.excess_importance_frequency - 1);
  }
  
  const stateDrift = calculateStateDrift(currentEntry, recentEntries);
  updates.state_drift_frequency = stateDrift;
  
  const identityStability = calculateIdentityStability(
    currentEntry,
    currentMetrics,
    updates
  );
  updates.identity_stability_index = identityStability;
  
  return updates;
}

function calculateNarrativeCoherence(
  current: Entry,
  recent: Entry[]
): number {
  if (recent.length < 3) return 50;
  
  const modeConsistency = recent.filter(e => e.input_mode === current.input_mode).length / recent.length;
  const lensConsistency = recent.filter(e => e.active_lens === current.active_lens).length / recent.length;
  
  const avgStability = recent.reduce((sum, e) => sum + (e.state_stability_score || 50), 0) / recent.length;
  
  return Math.round((modeConsistency * 30) + (lensConsistency * 30) + (avgStability * 0.4));
}

function calculateStateDrift(
  current: Entry,
  recent: Entry[]
): number {
  if (recent.length < 5) return 0;
  
  const recentStability = recent.slice(-5).map(e => e.state_stability_score || 50);
  const variance = calculateVariance(recentStability);
  
  return Math.min(100, Math.round(variance / 2));
}

function calculateVariance(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculateIdentityStability(
  current: Entry,
  metrics: PatternMetrics,
  updates: MetricUpdates
): number {
  const coherence = updates.narrative_coherence_score || metrics.narrative_coherence_score;
  const stateDrift = updates.state_drift_frequency || metrics.state_drift_frequency;
  const excessImportance = updates.excess_importance_frequency || metrics.excess_importance_frequency;
  const egoDefense = updates.ego_defensiveness_score || metrics.ego_defensiveness_score;
  
  const stability = 100 - (
    (stateDrift * 0.3) +
    (excessImportance * 0.25) +
    (egoDefense * 0.25) +
    ((100 - coherence) * 0.2)
  );
  
  return Math.max(0, Math.min(100, Math.round(stability)));
}
