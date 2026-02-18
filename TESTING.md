# Testing Guide

## Manual Testing Checklist

### Authentication Flow

- [ ] Sign up with new email
- [ ] Verify email confirmation message
- [ ] Sign in with credentials
- [ ] Verify redirect to /console
- [ ] Sign out
- [ ] Verify redirect to /auth
- [ ] Test invalid credentials
- [ ] Test weak password rejection

### Console Processing

- [ ] Submit entry with each input mode
- [ ] Test each active lens
- [ ] Test all depth levels (1-4)
- [ ] Toggle brutal mode on/off
- [ ] Verify 6 sections render correctly
- [ ] Verify all 6 scores display
- [ ] Test with empty input (should be disabled)
- [ ] Test with very long input (10k chars)
- [ ] Test rate limiting (21+ requests in 1 minute)

### Dashboard

- [ ] Verify all 7 metrics display
- [ ] Check chart renders with data
- [ ] Verify chart shows last 30 entries
- [ ] Test with no entries (empty state)
- [ ] Verify metrics update after new entry

### History

- [ ] View list of past entries
- [ ] Click entry to view details
- [ ] Verify all 6 response sections display
- [ ] Test with 50+ entries (pagination)
- [ ] Verify chronological ordering

### Navigation

- [ ] Navigate between Console/Dashboard/History
- [ ] Verify auth protection on protected routes
- [ ] Test browser back/forward buttons
- [ ] Verify privacy page accessible

### Privacy & Security

- [ ] Verify RLS prevents cross-user access
- [ ] Check service role key not in client bundle
- [ ] Verify no console errors in production
- [ ] Test with multiple user accounts
- [ ] Verify data isolation between users

## AI Response Quality Tests

### Layer 1: Psychological Structure

Test input: "I'm so frustrated that my business isn't growing fast enough. Everyone else seems to be succeeding except me."

Expected detection:
- Catastrophizing
- Comparison distortion
- Timeline impatience
- High emotional intensity score
- Moderate distortion score

### Layer 2: Strategic Cognition

Test input: "Should I quit my job to pursue my startup idea? I have 6 months of savings."

Expected analysis:
- Opportunity cost evaluation
- Risk assessment
- Resource allocation analysis
- Leverage point identification
- Strategic implication section substantive

### Layer 3: Manifestation

Test input: "I keep visualizing wealth but nothing is changing. I need money so badly."

Expected detection:
- Excess importance (need/desperation)
- Living TOWARD vs FROM distinction
- State drift identification
- High excess importance score
- Assumption integrity assessment

### Layer 4: Archetypal

Test input: "I feel like I'm constantly battling against invisible forces holding me back."

Expected analysis:
- Shadow projection identification
- Archetypal pattern recognition
- Energetic signature analysis
- Hermetic correspondence

### Brutal Mode Tests

Test with brutal mode ON vs OFF:

Input: "I think I'm doing everything right but the universe isn't cooperating."

Expected differences:
- Brutal ON: Direct ego confrontation, shorter responses
- Brutal OFF: Balanced, more diplomatic framing

### Adaptive Intensity Tests

Test sequence:

1. Submit entry with high distortion
2. Verify confrontational response
3. Submit stable, coherent entry
4. Verify expansive, supportive response

## Pattern Metric Validation

### Impatience Index

Submit 3 entries with timeline frustration language:
- "Why isn't this working yet?"
- "When will I finally succeed?"
- "This is taking too long"

Verify impatience_index increases by ~15 points.

### Wealth-Identity Fusion

Submit entries with achievement-identity conflation:
- "I need money to be happy"
- "Without success I'm worthless"

Verify wealth_identity_fusion_score increases.

### Identity Stability Index

Submit 5 entries with:
- Consistent mode/lens
- High state stability scores
- Low excess importance
- Low ego defensiveness

Verify identity_stability_index increases.

## Performance Tests

- [ ] API response time < 10 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] History loads < 3 seconds
- [ ] Chart renders smoothly with 30 points
- [ ] No memory leaks on repeated submissions

## Error Handling Tests

- [ ] Network failure during submission
- [ ] OpenAI API timeout
- [ ] Invalid token/session expiry
- [ ] Database connection failure
- [ ] Malformed API responses
- [ ] Rate limit exceeded
- [ ] Invalid input validation

## Browser Compatibility

Test on:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (responsive)

## Deployment Tests

### Vercel

- [ ] Build succeeds
- [ ] Environment variables loaded
- [ ] API routes accessible
- [ ] Static pages render
- [ ] Authentication works in production
- [ ] Database connections succeed
- [ ] OpenAI API calls work

### Supabase

- [ ] RLS policies active
- [ ] Triggers functioning
- [ ] Indexes created
- [ ] Connection pooling stable
- [ ] No unauthorized access possible

## Security Audit

- [ ] No API keys in client bundle
- [ ] No console.log in production
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] Input sanitization working
- [ ] SQL injection prevention (via Supabase)
- [ ] XSS prevention (React default)

## Known Limitations

- Rate limit is in-memory (resets on server restart)
- No email verification enforcement (optional in Supabase)
- Chart limited to 30 most recent entries
- No real-time updates (requires manual refresh)
- No offline support

## Future Testing Needs

When adding features:

- Subscription tier enforcement
- Payment processing flow
- Premium feature access control
- Export functionality
- Data deletion requests
- Admin dashboard access
