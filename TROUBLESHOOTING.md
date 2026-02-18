# Troubleshooting Guide

## Common Issues

### Authentication Problems

#### "Unauthorized" Error

**Symptoms:**
- Cannot access console
- API returns 401
- Redirected to auth page

**Solutions:**
1. Sign out and sign in again
2. Clear browser cookies
3. Check `.env.local` has correct Supabase credentials
4. Verify Supabase project is active
5. Check browser console for errors

#### "Invalid credentials"

**Solutions:**
1. Verify email/password correct
2. Check if email confirmed (if verification enabled)
3. Try password reset
4. Check Supabase Auth logs

#### Stuck on "Check your email"

**Solutions:**
1. Check spam folder
2. Verify email address correct
3. Check Supabase email settings
4. Disable email confirmation in Supabase (development only)

### Processing Issues

#### "Failed to generate synthesis"

**Symptoms:**
- Submit button completes but shows error
- No response displayed
- Error message about synthesis

**Solutions:**
1. Check OpenAI API key is valid
2. Verify OpenAI account has credits
3. Check OpenAI API status
4. Review API key permissions
5. Check browser console for details
6. Try shorter input text

#### "Rate limit exceeded"

**Symptoms:**
- Error after multiple submissions
- 429 status code
- Message about rate limit

**Solutions:**
1. Wait 60 seconds
2. Check if multiple tabs open
3. Review rate limit settings if too restrictive
4. Check for accidental loops/automation

#### Processing Takes Too Long

**Symptoms:**
- Submission hangs
- Takes > 30 seconds
- Times out

**Solutions:**
1. Reduce depth level
2. Shorten input text
3. Check OpenAI API status
4. Check network connection
5. Try again (may be temporary)

### Dashboard Issues

#### Metrics Not Updating

**Symptoms:**
- Dashboard shows old data
- Metrics don't change after entries
- Chart not updating

**Solutions:**
1. Refresh page
2. Check if entries actually submitted
3. Verify pattern_metrics table exists
4. Check Supabase logs for errors
5. Verify RLS policies correct

#### Chart Not Rendering

**Symptoms:**
- Empty chart area
- Chart shows error
- No data displayed

**Solutions:**
1. Submit at least 2 entries
2. Check browser console for errors
3. Verify recharts installed
4. Check if data fetched (Network tab)
5. Try different browser

### Database Issues

#### "Failed to create entry"

**Symptoms:**
- Submission fails
- Database error message
- Entry not saved

**Solutions:**
1. Check Supabase project active
2. Verify RLS policies enabled
3. Check database connection
4. Review Supabase logs
5. Verify migration ran successfully

#### "Failed to fetch metrics"

**Symptoms:**
- Dashboard empty
- Error loading metrics
- API returns 500

**Solutions:**
1. Verify pattern_metrics table exists
2. Check RLS policies on pattern_metrics
3. Verify user record exists in users table
4. Check Supabase logs
5. Try signing out and back in

## Development Issues

### Build Errors

#### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit

# Common fixes
rm -rf node_modules .next
npm install
```

#### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
```

#### Environment Variable Not Found

**Solutions:**
1. Verify `.env.local` exists
2. Check variable names match exactly
3. Restart dev server after changes
4. Check for typos in variable names

### Runtime Errors

#### "Cannot read property of undefined"

**Solutions:**
1. Check data structure in API response
2. Add null checks
3. Verify database schema matches types
4. Check if data exists before accessing

#### "Network request failed"

**Solutions:**
1. Check if dev server running
2. Verify API route exists
3. Check network tab in DevTools
4. Verify correct API endpoint URL

## Production Issues

### Deployment Failures

#### Vercel Build Failed

**Solutions:**
1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Check TypeScript compilation locally
4. Verify environment variables set
5. Check for missing files

#### Environment Variables Not Working

**Solutions:**
1. Verify variables set in Vercel dashboard
2. Check variable names match code
3. Redeploy after adding variables
4. Check for NEXT_PUBLIC_ prefix on client vars

### Performance Issues

#### Slow API Responses

**Solutions:**
1. Check OpenAI API latency
2. Review database query performance
3. Check function timeout settings
4. Optimize query patterns
5. Consider caching

#### High Memory Usage

**Solutions:**
1. Check for memory leaks
2. Optimize data structures
3. Limit query result sizes
4. Increase function memory in Vercel

## Browser-Specific Issues

### Safari

- Clear cache if styles not loading
- Check for WebKit-specific issues
- Verify localStorage working

### Firefox

- Check console for CSP errors
- Verify cookie settings
- Test in private window

### Chrome/Edge

- Clear cache and cookies
- Disable extensions
- Check DevTools console

## Data Issues

### Missing Entries

**Solutions:**
1. Check if submission actually succeeded
2. Verify RLS policies allow SELECT
3. Check user_id matches
4. Review Supabase logs
5. Check if accidentally deleted

### Incorrect Metrics

**Solutions:**
1. Verify pattern analyzer logic
2. Check metric calculation formulas
3. Review recent entries for patterns
4. Check if metrics initialized (should be on signup)

## Getting Help

### Before Asking

1. Check this troubleshooting guide
2. Review relevant documentation
3. Check browser console for errors
4. Review Supabase logs
5. Check Vercel function logs

### Information to Provide

- Error message (exact text)
- Steps to reproduce
- Browser and version
- Environment (dev/production)
- Recent changes made
- Relevant logs

### Debug Checklist

- [ ] Error message captured
- [ ] Browser console checked
- [ ] Network tab reviewed
- [ ] Supabase logs checked
- [ ] Vercel logs reviewed
- [ ] Environment variables verified
- [ ] Recent changes documented

## Emergency Procedures

### System Down

1. Check Vercel status
2. Check Supabase status
3. Check OpenAI status
4. Review recent deployments
5. Rollback if needed

### Data Loss

1. Check Supabase backups
2. Identify scope of loss
3. Restore from backup
4. Verify data integrity
5. Document incident

### Security Breach

1. Rotate all keys immediately
2. Review access logs
3. Identify breach vector
4. Patch vulnerability
5. Notify affected users
6. Document and learn

## Prevention

### Best Practices

- Regular backups verified
- Dependencies kept updated
- Security patches applied promptly
- Monitoring alerts configured
- Documentation kept current
- Testing procedures followed

### Monitoring Setup

Recommended:
- Vercel analytics
- Supabase monitoring
- OpenAI usage alerts
- Custom error tracking (Sentry, etc.)
- Uptime monitoring

## Resources

- [SETUP.md](SETUP.md) - Setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](SECURITY.md) - Security documentation
- [API.md](API.md) - API documentation
- [FAQ.md](FAQ.md) - Common questions
