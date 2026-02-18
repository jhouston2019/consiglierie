# Quickstart Guide

Get Cognitive Console running in 10 minutes.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- OpenAI API key with credits

## Step 1: Install (2 minutes)

```bash
# Clone and install
git clone https://github.com/jhouston2019/consiglierie.git
cd consiglierie
npm install
```

## Step 2: Supabase Setup (3 minutes)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name it (e.g., "cognitive-console")
4. Set database password
5. Wait for initialization (~2 minutes)

## Step 3: Run Migration (1 minute)

1. In Supabase dashboard, go to SQL Editor
2. Click "New Query"
3. Open `supabase/migrations/001_initial_schema.sql` in your editor
4. Copy entire contents
5. Paste in Supabase SQL Editor
6. Click "Run"
7. Verify "Success" message

## Step 4: Get Credentials (2 minutes)

In Supabase dashboard:

1. Go to Settings → API
2. Copy **Project URL**
3. Copy **anon public** key
4. Copy **service_role** key (keep secret!)

Get OpenAI key:

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy key (starts with `sk-`)

## Step 5: Configure Environment (1 minute)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run (1 minute)

```bash
npm run dev
```

Open http://localhost:3000

## Step 7: First Use

1. Click "Sign Up"
2. Enter email and password
3. Sign in
4. Write something in the console
5. Select mode and lens
6. Submit
7. Review 6-section analysis

## That's It!

You're now running Cognitive Console locally.

## Next Steps

- Read [GETTING_STARTED.md](GETTING_STARTED.md) for usage guide
- Review [EXAMPLES.md](EXAMPLES.md) for sample entries
- Check [FAQ.md](FAQ.md) for common questions

## Deploy to Production

When ready:

```bash
# Push to GitHub
git push -u origin main

# Deploy on Vercel
# 1. Import GitHub repo
# 2. Add environment variables
# 3. Deploy
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## Troubleshooting

### "Unauthorized" error
→ Check `.env.local` has correct Supabase credentials

### "Failed to generate synthesis"
→ Check OpenAI API key valid and has credits

### "Database error"
→ Verify migration ran successfully in Supabase

### Build errors
→ Run `rm -rf node_modules .next && npm install`

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help.

## Support

- 📖 [Full Documentation](DOCS_INDEX.md)
- 🔧 [Troubleshooting](TROUBLESHOOTING.md)
- ❓ [FAQ](FAQ.md)
- 🏗️ [Architecture](ARCHITECTURE.md)
