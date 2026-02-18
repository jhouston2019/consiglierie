# Cognitive Console Architecture

## System Overview

Cognitive Console is a multi-layer cognitive processing system built on a stacked ontological framework. It combines psychological analysis, strategic cognition, manifestation principles, and archetypal interpretation.

## Architectural Principles

### 1. Privacy-First Design

- Row Level Security (RLS) on all database tables
- User data isolation enforced at database level
- No public profiles or social features
- No AI training data usage
- Service role key never exposed to client

### 2. Adaptive Intelligence

The system dynamically adjusts response intensity based on:

- Detected cognitive distortions
- Emotional stability markers
- Identity threat levels
- Excess importance patterns
- Historical pattern analysis

### 3. Longitudinal Pattern Tracking

Continuous metric updates across:

- Identity stability
- Excess importance frequency
- Impatience index
- Narrative coherence
- State drift frequency
- Wealth-identity fusion
- Ego defensiveness

## Technology Stack

### Frontend

- **Next.js 14**: App Router for modern React architecture
- **TypeScript**: Type safety across the application
- **TailwindCSS**: Utility-first styling with dark mode default
- **Recharts**: Lightweight charting for metrics visualization

### Backend

- **Next.js API Routes**: Serverless API endpoints
- **Supabase**: PostgreSQL database with built-in auth and RLS
- **OpenAI GPT-4**: Multi-layer synthesis engine
- **Zod**: Runtime validation for API requests

### Infrastructure

- **Vercel**: Serverless deployment platform
- **Supabase Cloud**: Managed PostgreSQL with auth
- **OpenAI API**: AI processing service

## Database Schema

### Core Tables

**users**
- Extends Supabase auth.users
- Automatically created on signup via trigger

**entries**
- User inputs with configuration (mode, lens, depth)
- Computed scores from AI analysis
- Foreign key to users with cascade delete

**responses**
- 6-section AI analysis output
- Foreign key to entries with cascade delete

**pattern_metrics**
- Longitudinal tracking metrics
- One record per user
- Updated after each entry processing

### RLS Policies

All tables enforce user-level isolation:
- Users can only SELECT/INSERT/UPDATE/DELETE their own data
- Responses accessible only through owned entries
- Pattern metrics tied to user_id

## AI Synthesis Engine

### Multi-Layer Analysis

**Layer 1: Psychological Structure**
- Cognitive distortion detection
- Ego contraction patterns
- Identity fusion markers
- Emotional dysregulation

**Layer 2: Strategic Cognition**
- Decision quality assessment
- Leverage point identification
- Opportunity cost analysis
- Second-order consequence mapping

**Layer 3: Manifestation / Identity Assumption**
- Reality Transurfing: Excess importance detection
- Neville Goddard: Assumption integrity evaluation
- State drift from declared identity
- Behavioral congruence assessment

**Layer 4: Archetypal / Symbolic Interpretation**
- Jungian archetypal patterns
- Hermetic correspondence
- Timeline identity modeling
- Energetic signature analysis

### Adaptive Response Logic

```
IF distortion_detected THEN increase_confrontation
IF stability_present THEN allow_expansion
IF excess_importance THEN reduce_attachment
IF delusion_drift THEN stabilize_assumptions
IF power_alignment THEN amplify_momentum
```

### Lens System

- **Adaptive**: Balanced across all layers
- **Strategist**: Emphasizes Layer 2 (strategic cognition)
- **Therapist**: Emphasizes Layer 1 (psychological structure)
- **Philosopher**: Existential meaning and ontological coherence
- **Shadow**: Emphasizes Layer 4 (archetypal, shadow integration)
- **Non-Dual**: Observer/observed collapse, identity boundaries
- **Manifestation**: Emphasizes Layer 3 (assumption integrity)

### Depth Levels

1. Surface analysis, brief observations
2. Moderate depth, pattern identification
3. Deep analysis, underlying structures
4. Maximum depth, full ontological stack

### Brutal Mode

When enabled:
- Increased confrontation level
- Direct ego detection language
- Shorter, sharper outputs
- Reduced diplomatic framing

## Pattern Analysis System

### Real-Time Metric Updates

After each entry, the system:

1. Analyzes text for linguistic markers
2. Compares with historical patterns
3. Updates relevant metrics
4. Calculates composite scores

### Metric Calculation

**Impatience Index**
- Detects timeline frustration markers
- Increments on impatience language
- Decrements gradually when absent

**Wealth-Identity Fusion Score**
- Detects achievement-identity conflation
- Tracks "money = self-worth" patterns
- Monitors external validation dependency

**Ego Defensiveness Score**
- Detects resistance to feedback
- Correlates with high distortion scores
- Tracks defensive language patterns

**Narrative Coherence Score**
- Measures consistency across entries
- Evaluates mode and lens stability
- Assesses state stability variance

**State Drift Frequency**
- Calculates emotional regulation variance
- Tracks stability score fluctuations
- Higher = more instability

**Excess Importance Frequency**
- Tracks over-attachment patterns
- Reality Transurfing framework
- Monitors resistance-creating importance

**Identity Stability Index**
- Composite score from all metrics
- Weighted calculation:
  - 30% state drift (inverted)
  - 25% excess importance (inverted)
  - 25% ego defensiveness (inverted)
  - 20% narrative coherence

## API Architecture

### Rate Limiting

- In-memory rate limiter
- 20 requests per minute per user
- Sliding window implementation
- Returns remaining count and reset time

### Error Handling

- Zod validation for all inputs
- Structured error responses
- No sensitive data in error messages
- Proper HTTP status codes

### Authentication Flow

1. Client requests with Bearer token
2. Server validates token with Supabase
3. User ID extracted from session
4. RLS policies enforce data access

## Security Considerations

### Authentication

- Supabase Auth handles password hashing
- JWT tokens for session management
- Secure cookie storage
- Automatic token refresh

### Data Protection

- RLS enforces user isolation
- Service role key server-side only
- No direct database access from client
- Encrypted storage at rest

### API Security

- Rate limiting prevents abuse
- Input validation with Zod
- Authentication required for all routes
- No sensitive data logging

## Scalability Architecture

### Current: Single User Focus

- Optimized for individual power user
- No multi-tenancy complexity
- Direct database queries

### Future: Multi-User Scale

Prepared for:
- Subscription tier system
- Stripe payment integration
- Premium feature gating
- Advanced analytics tiers

Code structure supports:
- Feature flags for premium lenses
- Metric access control
- Usage-based billing hooks
- Admin dashboard addition

## Deployment

### Vercel Configuration

- Automatic builds on push
- Environment variables via dashboard
- Serverless functions for API routes
- Edge middleware for auth

### Database Migrations

- SQL migration files in `supabase/migrations/`
- Run manually in Supabase dashboard
- Version controlled for reproducibility

## Performance Considerations

- Server-side rendering for auth pages
- Client-side rendering for interactive console
- Optimistic UI updates where possible
- Lazy loading for history/dashboard
- Chart data limited to 30 recent entries

## Monitoring & Observability

Recommended monitoring:

- Supabase dashboard for database metrics
- Vercel analytics for function performance
- OpenAI usage dashboard for API costs
- Custom logging for pattern metric updates

## Future Enhancements

Architectural support for:

- Subscription management
- Payment processing (Stripe)
- Premium lens gating
- Advanced analytics dashboard
- Export functionality
- Mobile responsive optimization
- Progressive Web App features
