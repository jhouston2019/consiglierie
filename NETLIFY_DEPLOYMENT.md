# Netlify Deployment Guide

## Prerequisites

- Netlify account
- GitHub repository pushed
- Supabase project set up
- OpenAI API key

## Netlify Configuration

The project includes `netlify.toml` for automatic configuration.

### Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

## Deployment Steps

### 1. Connect Repository

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select repository: `jhouston2019/consiglierie`
5. Netlify will auto-detect Next.js

### 2. Configure Build Settings

Netlify should auto-detect from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave empty, handled by plugin)

### 3. Add Environment Variables

Go to Site settings → Environment variables → Add variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

### 4. Deploy

1. Click "Deploy site"
2. Wait for build to complete (~2-3 minutes)
3. Site will be live at `https://your-site-name.netlify.app`

### 5. Custom Domain (Optional)

1. Go to Domain settings
2. Add custom domain
3. Configure DNS
4. Enable HTTPS (automatic)

## Netlify-Specific Configuration

### Next.js Plugin

The `@netlify/plugin-nextjs` plugin is required for:
- API routes as Netlify Functions
- Server-side rendering
- Middleware support
- Image optimization

### Environment Variables

Must be set in Netlify dashboard:
- Cannot use `.env.local` in production
- Variables must be added before deployment
- Redeploy after adding/changing variables

## Troubleshooting

### "Page Not Found" Error

**Cause**: Next.js routing not configured properly

**Solution**:
1. Verify `netlify.toml` exists in root
2. Check `@netlify/plugin-nextjs` in package.json devDependencies
3. Redeploy site
4. Clear Netlify cache: Site settings → Build & deploy → Clear cache and deploy

### Build Fails

**Check**:
1. Build logs in Netlify dashboard
2. Verify all dependencies in package.json
3. Check Node version (should be 18+)
4. Verify TypeScript compiles locally: `npx tsc --noEmit`

### API Routes Not Working

**Check**:
1. Environment variables set in Netlify
2. `@netlify/plugin-nextjs` installed
3. API routes in `app/api/` directory
4. Check Netlify Functions logs

### Environment Variables Not Loading

**Solutions**:
1. Verify variables set in Netlify dashboard (not .env file)
2. Variable names must match exactly
3. Redeploy after adding variables
4. Check for typos in variable names

## Performance Optimization

### Netlify Specific

1. Enable Asset Optimization:
   - Go to Site settings → Build & deploy → Post processing
   - Enable "Bundle CSS" and "Minify JS"

2. Enable Netlify CDN (automatic)

3. Configure caching headers (optional)

## Monitoring

### Netlify Analytics

1. Go to Site settings → Analytics
2. Enable Netlify Analytics (paid feature)
3. Monitor traffic and performance

### Function Logs

1. Go to Functions tab
2. View logs for API routes
3. Monitor errors and performance

### Build Logs

1. Go to Deploys tab
2. Click on any deploy
3. View build logs
4. Check for warnings or errors

## Continuous Deployment

### Automatic Deploys

Netlify automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "your changes"
git push
```

Netlify will:
1. Detect push
2. Start build
3. Run tests (if configured)
4. Deploy to production

### Deploy Previews

- Pull requests get preview URLs
- Test changes before merging
- Automatic cleanup after merge

## Cost Considerations

### Netlify Free Tier

Includes:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- HTTPS included

### Paid Features

- Netlify Analytics
- Background Functions (longer timeout)
- High-performance Edge
- Priority support

## Comparison: Netlify vs Vercel

### Netlify Advantages
- Generous free tier
- Good for static sites
- Built-in form handling

### Vercel Advantages
- Built by Next.js creators
- Better Next.js integration
- Edge functions
- Better performance for Next.js

**Recommendation**: Vercel is better optimized for Next.js, but Netlify works fine with proper configuration.

## Migration to Vercel

If you want to switch to Vercel later:

1. Go to https://vercel.com
2. Import same GitHub repository
3. Add environment variables
4. Deploy
5. Update domain DNS if using custom domain

## Support

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/
- Plugin Docs: https://github.com/netlify/netlify-plugin-nextjs
