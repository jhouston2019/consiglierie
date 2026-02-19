# Netlify Deployment Fix

## Issue

"Page not found" error on https://consigliereai.netlify.app/

## Cause

Next.js App Router requires specific Netlify configuration that wasn't present initially.

## Solution

I've added the necessary configuration files:

1. ✅ `netlify.toml` - Netlify build configuration
2. ✅ `@netlify/plugin-nextjs` - Next.js plugin for Netlify
3. ✅ Updated `next.config.js` - Removed incompatible settings

## Steps to Fix

### Option 1: Automatic (Recommended)

Netlify will automatically redeploy when it detects the new configuration:

1. Wait 1-2 minutes for Netlify to detect the push
2. Check Netlify dashboard for new deploy
3. Once build completes, site should work

### Option 2: Manual Trigger

If automatic deploy doesn't start:

1. Go to https://app.netlify.com
2. Select your site (consigliereai)
3. Click "Deploys" tab
4. Click "Trigger deploy" → "Clear cache and deploy site"
5. Wait for build to complete (~2-3 minutes)

## Verify Fix

After deployment completes:

1. Visit https://consigliereai.netlify.app/
2. Should redirect to `/auth`
3. Test sign up/sign in
4. Verify console works
5. Check API endpoints working

## What Changed

### netlify.toml (New)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This tells Netlify:
- How to build Next.js
- Where to find build output
- To use Next.js plugin for routing

### package.json (Updated)

Added `@netlify/plugin-nextjs` to devDependencies.

## Build Settings in Netlify

Verify in Netlify dashboard (Site settings → Build & deploy):

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (auto-configured by plugin)

## Environment Variables

Make sure these are set in Netlify (Site settings → Environment variables):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
NEXT_PUBLIC_APP_URL=https://consigliereai.netlify.app
```

## If Still Not Working

### Check Build Logs

1. Go to Deploys tab
2. Click latest deploy
3. Expand build log
4. Look for errors

Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies
- Plugin not installed

### Clear Cache and Redeploy

1. Site settings → Build & deploy
2. Click "Clear cache and deploy site"
3. Wait for fresh build

### Check Function Logs

1. Go to Functions tab
2. Check if API routes deployed
3. Look for runtime errors

## Expected Build Output

Successful build should show:

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                   
├ ○ /api/health
├ ○ /api/metrics
├ ○ /api/process
├ ○ /auth
├ ○ /console
├ ○ /dashboard
├ ○ /history
└ ○ /privacy
```

## Testing After Deployment

1. **Authentication**: Sign up and sign in
2. **Console**: Submit test entry
3. **API**: Verify processing works
4. **Dashboard**: Check metrics load
5. **History**: Verify entries display

## Performance Notes

Netlify Functions have:
- 10-second timeout (free tier)
- 1024 MB memory (free tier)

OpenAI synthesis may take 5-15 seconds, which is within limits.

## Support

If issues persist:

1. Check Netlify build logs
2. Check Netlify function logs
3. Verify environment variables
4. Test locally first: `npm run build && npm start`
5. Contact Netlify support if needed

## Alternative: Deploy to Vercel

If Netlify continues to have issues, Vercel is optimized for Next.js:

1. Go to https://vercel.com
2. Import GitHub repository
3. Add environment variables
4. Deploy

Vercel is built by the Next.js team and has better Next.js support.

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel instructions.
