# Cognitive Console

> A high-intelligence reflective processing system for structured cognitive analysis

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

## What This Is

A structured cognitive + identity + manifestation processing system with multi-layer AI analysis and longitudinal pattern tracking.

**This is NOT:**
- A generic journaling app
- A therapy chatbot
- A manifestation affirmation engine

**This IS:**
- A high-agency cognitive instrument
- A multi-layer synthesis engine
- A longitudinal pattern tracker
- A structured identity processing system

## Core Architecture

### Four Ontological Layers

1. **Psychological Structure**
   - Cognitive distortion detection
   - Ego contraction patterns
   - Identity fusion markers
   - Emotional regulation analysis

2. **Strategic Cognition**
   - Decision quality assessment
   - Leverage point identification
   - Opportunity cost analysis
   - Second-order consequence mapping

3. **Manifestation / Identity Assumption**
   - Reality Transurfing: Excess importance detection
   - Neville Goddard: Assumption integrity evaluation
   - State drift from declared identity
   - Behavioral congruence assessment

4. **Archetypal / Symbolic Interpretation**
   - Jungian archetypal patterns
   - Hermetic correspondence
   - Timeline identity modeling
   - Energetic signature analysis

## Key Features

### Processing System

- **6 Input Modes**: Free write, question, scenario, decision, emotional, identity
- **7 Active Lenses**: Adaptive, strategist, therapist, philosopher, shadow, non-dual, manifestation
- **4 Depth Levels**: Surface → Moderate → Deep → Maximum
- **Brutal Mode**: Optional high-confrontation processing
- **6-Section Output**: Structural, manifestation, archetypal, strategic, corrective, forcing question

### Pattern Metrics

Longitudinal tracking of:
- Identity Stability Index
- Excess Importance Frequency
- Impatience Index
- Narrative Coherence Score
- State Drift Frequency
- Wealth-Identity Fusion Score
- Ego Defensiveness Score

### Privacy & Security

- Row Level Security on all data
- No public profiles or sharing
- No AI training data usage
- Encrypted storage
- Rate limiting (20 req/min)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (Strict) |
| Styling | TailwindCSS |
| Database | Supabase (Postgres + Auth) |
| AI | OpenAI GPT-4 Turbo |
| Charts | Recharts |
| Deployment | Vercel |
| Validation | Zod |

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- OpenAI API key

### Installation

```bash
# Clone repository
git clone https://github.com/jhouston2019/consiglierie.git
cd consiglierie

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run migration in Supabase SQL Editor
# (copy contents of supabase/migrations/001_initial_schema.sql)

# Start development server
npm run dev
```

Open http://localhost:3000

### Detailed Setup

See [SETUP.md](SETUP.md) for comprehensive setup instructions.

## Documentation

| Document | Description |
|----------|-------------|
| [SETUP.md](SETUP.md) | Quick start and setup instructions |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design and principles |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [API.md](API.md) | API endpoint documentation |
| [TESTING.md](TESTING.md) | Testing procedures |
| [FAQ.md](FAQ.md) | Frequently asked questions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Code standards and workflow |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | File organization |
| [SHORTCUTS.md](SHORTCUTS.md) | Keyboard shortcuts |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

## Usage

### Main Console

1. Sign in at `/auth`
2. Navigate to `/console`
3. Select input mode and lens
4. Adjust depth level (1-4)
5. Toggle brutal mode if desired
6. Write input and submit
7. Review 6-section analysis

### Dashboard

View longitudinal metrics at `/dashboard`:
- Identity Stability Index
- Pattern frequency scores
- Timeline visualization

### History

Browse past entries at `/history`:
- Chronological entry list
- Full response review
- Pattern analysis over time

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main

# Deploy via Vercel dashboard
# Add environment variables
# Deploy
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## System Design

### Adaptive Intelligence

Response intensity adjusts based on detected patterns:

```
IF distortion → increase confrontation
IF stability → allow expansion  
IF excess importance → reduce attachment
IF delusion drift → stabilize assumptions
IF power alignment → amplify momentum
```

### Manifestation Frameworks

- **Neville Goddard**: Assumption integrity, living FROM vs TOWARD
- **Reality Transurfing**: Excess importance, pendulum awareness
- **Hermetic Principles**: Correspondence, observer effect
- **Jungian Psychology**: Archetypal patterns, shadow integration

### Response Format

Every submission generates 6 sections:

1. **Structural Diagnosis**: Core psychological patterns
2. **Manifestation Layer**: Assumption integrity and state coherence
3. **Archetypal Interpretation**: Symbolic meaning and energetic signature
4. **Strategic Implication**: Decision quality and leverage points
5. **Corrective/Amplifying Action**: Specific behavioral intervention
6. **One Forcing Question**: Penetrating question that cannot be deflected

## Project Structure

```
app/              # Next.js pages and API routes
lib/              # Shared utilities and AI engine
components/       # Reusable React components
supabase/         # Database migrations
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed file organization.

## Monetization Ready

Architecture supports future features:
- Subscription tiers
- Stripe integration
- Premium lens gating
- Advanced analytics

Not yet implemented.

## Security

- Row Level Security enforced
- Rate limiting (20 req/min)
- Encrypted password storage
- No production logging
- Private data only

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for code standards and workflow.

## License

Private. All rights reserved. See [LICENSE](LICENSE) for details.

## Support

- Check [FAQ.md](FAQ.md) for common questions
- Review [TESTING.md](TESTING.md) for troubleshooting
- See [API.md](API.md) for endpoint documentation
