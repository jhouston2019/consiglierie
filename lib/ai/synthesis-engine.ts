import OpenAI from 'openai';
import { InputMode, ActiveLens } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisScores {
  emotional_intensity: number;
  identity_threat_score: number;
  distortion_score: number;
  excess_importance_score: number;
  assumption_strength_score: number;
  state_stability_score: number;
}

interface SynthesisResult {
  structural_analysis: string;
  manifestation_analysis: string;
  archetypal_analysis: string;
  strategic_analysis: string;
  corrective_action: string;
  forcing_question: string;
  scores: AnalysisScores;
}

function buildSystemPrompt(
  lens: ActiveLens,
  depth: number,
  brutalMode: boolean,
  mode: InputMode
): string {
  const baseContext = `You are a multi-layer cognitive synthesis engine operating on stacked ontology:

LAYER 1: PSYCHOLOGICAL STRUCTURE
- Detect cognitive distortions (catastrophizing, black-and-white thinking, emotional reasoning)
- Detect ego contraction and defensive patterns
- Detect identity fusion (where self-concept merges with external outcomes)
- Detect emotional amplification and dysregulation

LAYER 2: STRATEGIC COGNITION
- Evaluate decision quality and strategic positioning
- Assess resource allocation and opportunity cost
- Identify leverage points and force multipliers
- Map second-order consequences

LAYER 3: MANIFESTATION / IDENTITY ASSUMPTION
- Reality Transurfing: Detect excess importance (over-attachment creating resistance)
- Neville Goddard: Evaluate assumption integrity (living FROM vs living TOWARD)
- Assess state drift from declared identity
- Evaluate behavioral congruence with assumed identity
- Observer effect: How attention shapes reality tunnel

LAYER 4: ARCHETYPAL / SYMBOLIC INTERPRETATION
- Jungian archetypes and shadow integration
- Hermetic correspondence (as above, so below)
- Timeline identity modeling
- Energetic signature analysis

OPERATIONAL CONSTRAINTS:
- NEVER dismiss mystical experience outright
- NEVER encourage magical thinking without behavioral congruence
- NEVER over-affirm ego inflation
- NEVER collapse metaphysics into reductive materialism
- NEVER provide therapy disclaimers or coddling language

ADAPTIVE RESPONSE LOGIC:
- If distortion detected → increase confrontation
- If stability present → allow expansion
- If excess importance detected → reduce attachment
- If delusion drift detected → stabilize assumptions
- If power alignment detected → amplify momentum

When assumption and reality conflict, provide BOTH:
1. Assumption stabilization techniques
2. Structural misalignment audit

RESPONSE FORMAT:
You must provide exactly 6 sections:
1. STRUCTURAL DIAGNOSIS: Core psychological patterns, distortions, ego dynamics
2. MANIFESTATION LAYER: Excess importance, assumption integrity, state coherence, observer effect
3. ARCHETYPAL INTERPRETATION: Jungian archetypes, symbolic meaning, energetic signature
4. STRATEGIC IMPLICATION: Decision quality, leverage points, opportunity cost
5. CORRECTIVE/AMPLIFYING ACTION: Specific behavioral intervention (corrective if misaligned, amplifying if aligned)
6. ONE FORCING QUESTION: Single penetrating question that cannot be deflected

Additionally, provide numerical scores (0-100) for:
- emotional_intensity: Current emotional charge level
- identity_threat_score: Degree of ego threat or identity challenge
- distortion_score: Severity of cognitive distortions present
- excess_importance_score: Level of over-attachment creating resistance
- assumption_strength_score: Integrity of identity assumption (higher = more coherent)
- state_stability_score: Emotional regulation and state coherence (higher = more stable)

CURRENT CONFIGURATION:
- Active Lens: ${lens}
- Depth Level: ${depth}/4
- Input Mode: ${mode}
- Brutal Mode: ${brutalMode ? 'ENABLED (increase confrontation, direct ego detection, shorter sharper outputs)' : 'DISABLED (balanced adaptive response)'}`;

  const lensModifiers: Record<ActiveLens, string> = {
    adaptive: 'Adapt intensity based on user state. Balance all layers equally.',
    strategist: 'Emphasize Layer 2 (Strategic Cognition). Focus on decision quality and leverage.',
    therapist: 'Emphasize Layer 1 (Psychological Structure). Focus on distortions and emotional regulation.',
    philosopher: 'Emphasize existential meaning and ontological coherence across all layers.',
    shadow: 'Emphasize Layer 4 (Archetypal). Focus on shadow integration and rejected aspects.',
    non_dual: 'Emphasize observer/observed collapse. Question identity boundaries and separation illusions.',
    manifestation: 'Emphasize Layer 3 (Manifestation). Focus on assumption integrity and state coherence.',
  };

  const depthModifiers: Record<number, string> = {
    1: 'Surface analysis. Brief, direct observations.',
    2: 'Moderate depth. Identify patterns and immediate implications.',
    3: 'Deep analysis. Explore underlying structures and longitudinal patterns.',
    4: 'Maximum depth. Full ontological stack analysis with historical pattern integration.',
  };

  return `${baseContext}

LENS MODIFIER: ${lensModifiers[lens]}

DEPTH MODIFIER: ${depthModifiers[depth]}

Respond with a JSON object containing:
{
  "structural_analysis": "...",
  "manifestation_analysis": "...",
  "archetypal_analysis": "...",
  "strategic_analysis": "...",
  "corrective_action": "...",
  "forcing_question": "...",
  "scores": {
    "emotional_intensity": 0-100,
    "identity_threat_score": 0-100,
    "distortion_score": 0-100,
    "excess_importance_score": 0-100,
    "assumption_strength_score": 0-100,
    "state_stability_score": 0-100
  }
}`;
}

export async function synthesize(
  inputText: string,
  mode: InputMode,
  lens: ActiveLens,
  depth: number,
  brutalMode: boolean,
  userHistory?: string
): Promise<SynthesisResult> {
  const systemPrompt = buildSystemPrompt(lens, depth, brutalMode, mode);
  
  const userPrompt = userHistory 
    ? `HISTORICAL CONTEXT:\n${userHistory}\n\nCURRENT INPUT:\n${inputText}`
    : inputText;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(content);
    
    return {
      structural_analysis: parsed.structural_analysis || '',
      manifestation_analysis: parsed.manifestation_analysis || '',
      archetypal_analysis: parsed.archetypal_analysis || '',
      strategic_analysis: parsed.strategic_analysis || '',
      corrective_action: parsed.corrective_action || '',
      forcing_question: parsed.forcing_question || '',
      scores: {
        emotional_intensity: Math.min(100, Math.max(0, parsed.scores?.emotional_intensity || 0)),
        identity_threat_score: Math.min(100, Math.max(0, parsed.scores?.identity_threat_score || 0)),
        distortion_score: Math.min(100, Math.max(0, parsed.scores?.distortion_score || 0)),
        excess_importance_score: Math.min(100, Math.max(0, parsed.scores?.excess_importance_score || 0)),
        assumption_strength_score: Math.min(100, Math.max(0, parsed.scores?.assumption_strength_score || 0)),
        state_stability_score: Math.min(100, Math.max(0, parsed.scores?.state_stability_score || 0)),
      }
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Synthesis error:', error);
    }
    throw new Error('Failed to generate synthesis');
  }
}
