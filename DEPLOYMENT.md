# Deployment Guide

## Supabase Setup

1. Create a new Supabase project at https://supabase.com

2. Run the migration:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL

3. Get your credentials:
   - Project URL: Settings → API → Project URL
   - Anon key: Settings → API → Project API keys → anon public
   - Service role key: Settings → API → Project API keys → service_role (keep secret!)

## OpenAI Setup

1. Get API key from https://platform.openai.com/api-keys
2. Ensure you have credits/billing set up

## Vercel Deployment

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit: Cognitive Console"
git push -u origin main
```

2. Import project in Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)

4. Deploy

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Fill in `.env` with your credentials

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Production Checklist

- [ ] Supabase RLS policies enabled
- [ ] Environment variables configured
- [ ] OpenAI API key valid and funded
- [ ] Rate limiting tested
- [ ] Authentication flow tested
- [ ] Dashboard metrics displaying
- [ ] All 6 response sections rendering
- [ ] Pattern tracking updating correctly
- [ ] Privacy page accessible

## Monitoring

- Check Supabase logs for database errors
- Monitor OpenAI usage dashboard
- Check Vercel function logs for API errors
- Monitor rate limit effectiveness

## Security Notes

- Service role key must NEVER be exposed to client
- All API routes validate authentication
- RLS policies enforce data isolation
- Rate limiting prevents abuse
- No user data used for AI training
