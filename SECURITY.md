# Security Documentation

## Overview

Cognitive Console implements multiple layers of security to protect user data and prevent unauthorized access.

## Authentication

### Supabase Auth

- Industry-standard JWT-based authentication
- Bcrypt password hashing
- Secure session management
- Automatic token refresh
- Email verification (optional)

### Token Handling

- Access tokens stored in secure cookies
- Tokens validated on every API request
- Service role key never exposed to client
- Token expiration enforced

## Authorization

### Row Level Security (RLS)

All database tables enforce user-level isolation:

```sql
-- Users can only access their own data
CREATE POLICY "Users can view own entries"
  ON public.entries FOR SELECT
  USING (auth.uid() = user_id);
```

Policies cover:
- SELECT: View own data only
- INSERT: Create own data only
- UPDATE: Modify own data only
- DELETE: Delete own data only

### API Authorization

Every API endpoint:
1. Validates Bearer token
2. Extracts user_id from session
3. Enforces RLS at database level
4. Returns 401 for invalid/missing auth

## Data Protection

### Encryption

- Passwords: Bcrypt hashed by Supabase
- Data at rest: Encrypted by Supabase (AES-256)
- Data in transit: HTTPS/TLS 1.3
- Database connections: SSL enforced

### Data Isolation

- RLS policies prevent cross-user access
- Service role queries still respect RLS
- No shared data between users
- No public data exposure

### Sensitive Data

- Service role key: Server-side only, never in client bundle
- OpenAI API key: Server-side only, never exposed
- User passwords: Never stored in plaintext
- Session tokens: Secure cookie storage

## Rate Limiting

### Implementation

- In-memory sliding window
- 20 requests per minute per user
- Identifier: user_id
- Automatic reset after window

### Purpose

- Prevent API abuse
- Protect OpenAI costs
- Ensure fair usage
- Prevent DoS attacks

### Limitations

- State resets on server restart (serverless)
- No distributed rate limiting (yet)
- No IP-based limiting (yet)

## Input Validation

### Zod Schema Validation

All API inputs validated:

```typescript
{
  input_text: string (1-10000 chars)
  input_mode: enum (6 options)
  active_lens: enum (7 options)
  depth_level: number (1-4)
  brutal_mode: boolean
}
```

### SQL Injection Prevention

- Supabase client uses parameterized queries
- No raw SQL from user input
- All queries through ORM layer

### XSS Prevention

- React escapes output by default
- No dangerouslySetInnerHTML used
- User input sanitized by React

## API Security

### Endpoint Protection

- All endpoints require authentication
- Rate limiting on processing endpoint
- Input validation on all requests
- Error messages don't leak sensitive data

### CORS Configuration

- Same-origin by default
- No cross-origin requests allowed
- API routes not publicly accessible

### Error Handling

- Generic error messages in production
- No stack traces exposed
- No sensitive data in errors
- Detailed errors only in development

## Database Security

### Connection Security

- SSL/TLS enforced
- Connection pooling managed by Supabase
- Service role key required for admin access
- Anon key for client access (RLS enforced)

### Query Security

- All queries filtered by user_id via RLS
- No direct table access from client
- Prepared statements prevent injection
- Foreign key constraints enforced

### Backup & Recovery

- Managed by Supabase
- Point-in-time recovery available
- Automatic backups
- Disaster recovery procedures

## Privacy

### Data Usage

- User data NEVER used for AI training
- No analytics tracking
- No third-party data sharing
- No public profiles

### Data Retention

- Data retained indefinitely unless deleted
- User can request account deletion
- Cascade delete removes all associated data

### Compliance

- GDPR-ready architecture
- Data export capability (planned)
- Right to deletion supported
- Privacy by design

## Monitoring & Logging

### Production Logging

- No sensitive data logged
- Error logging only
- No user input logged
- No API keys in logs

### Development Logging

- Detailed error messages
- Request/response logging
- Performance metrics
- Debug information

### Audit Trail

- Entry creation timestamps
- Metric update timestamps
- Authentication events (via Supabase)

## Threat Model

### Threats Mitigated

✅ SQL Injection (parameterized queries)  
✅ XSS (React escaping)  
✅ CSRF (SameSite cookies)  
✅ Unauthorized data access (RLS)  
✅ API abuse (rate limiting)  
✅ Password attacks (Bcrypt, min length)  
✅ Session hijacking (secure cookies, HTTPS)  

### Threats Not Yet Mitigated

⚠️ Distributed DoS (no CDN/WAF yet)  
⚠️ Advanced persistent threats (no IDS)  
⚠️ Social engineering (user responsibility)  
⚠️ Credential stuffing (no 2FA yet)  

## Security Checklist

### Deployment

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Service role key not in client bundle
- [ ] RLS policies active
- [ ] Rate limiting functional
- [ ] Error messages sanitized
- [ ] Logging disabled in production
- [ ] CORS configured correctly

### Code Review

- [ ] No hardcoded secrets
- [ ] No console.log in production code
- [ ] Input validation on all endpoints
- [ ] Authentication checked on all routes
- [ ] Error handling implemented
- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities

### Testing

- [ ] RLS policies tested
- [ ] Authentication flow tested
- [ ] Rate limiting tested
- [ ] Input validation tested
- [ ] Error handling tested
- [ ] Cross-user access blocked

## Incident Response

### If Breach Suspected

1. Rotate all API keys immediately
2. Review Supabase audit logs
3. Check for unauthorized access patterns
4. Notify affected users if confirmed
5. Document incident
6. Implement additional controls

### If API Key Exposed

1. Revoke key immediately
2. Generate new key
3. Update environment variables
4. Redeploy application
5. Monitor for unauthorized usage

## Best Practices

### For Developers

- Never commit `.env` files
- Use service role key only server-side
- Always validate inputs
- Always check authentication
- Log errors, not data
- Review RLS policies regularly

### For Users

- Use strong passwords (12+ chars)
- Don't share credentials
- Sign out on shared devices
- Review privacy statement
- Report suspicious activity

## Future Security Enhancements

Planned:
- Two-factor authentication
- IP-based rate limiting
- Distributed rate limiter (Redis)
- Advanced threat detection
- Audit log viewer
- Security headers (CSP, HSTS)
- Automated security scanning

## Reporting Security Issues

If you discover a security vulnerability:

1. Do NOT open a public issue
2. Email security contact (to be added)
3. Include detailed description
4. Allow time for fix before disclosure

## Compliance

### GDPR Readiness

- Right to access: User can view all data
- Right to deletion: Account deletion available
- Right to portability: Export planned
- Privacy by design: RLS enforced
- Data minimization: Only necessary data collected

### Security Standards

- OWASP Top 10 considerations
- Secure development lifecycle
- Regular dependency updates
- Security-first architecture
