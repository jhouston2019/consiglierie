# Setup Instructions

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/jhouston2019/consiglierie.git
cd consiglierie
npm install
```

### 2. Supabase Setup

#### Create Project

1. Go to https://supabase.com
2. Click "New Project"
3. Choose organization and project name
4. Set database password (save it)
5. Wait for project to initialize

#### Run Migration

1. Open Supabase dashboard
2. Go to SQL Editor
3. Click "New Query"
4. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste and click "Run"
6. Verify success message

#### Get Credentials

1. Go to Settings → API
2. Copy Project URL
3. Copy `anon` `public` key
4. Copy `service_role` key (keep secret!)

### 3. OpenAI Setup

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Ensure billing is set up

### 4. Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 6. Create Account

1. Click "Sign Up"
2. Enter email and password (min 6 chars)
3. Check email for confirmation (if enabled)
4. Sign in

## Verification Steps

### Database Verification

Run in Supabase SQL Editor:

```sql
-- Check tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check trigger exists
SELECT trigger_name FROM information_schema.triggers 
WHERE trigger_schema = 'public';
```

### API Verification

Test the processing endpoint:

```bash
# Get session token from browser DevTools → Application → Cookies
curl -X POST http://localhost:3000/api/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "input_text": "Test input",
    "input_mode": "free_write",
    "active_lens": "adaptive",
    "depth_level": 2,
    "brutal_mode": false
  }'
```

### Frontend Verification

1. Sign in successfully
2. Submit test entry
3. Verify 6 sections render
4. Check scores display
5. Navigate to Dashboard
6. Verify metrics display
7. Navigate to History
8. Verify entries list

## Troubleshooting

### "Unauthorized" Error

- Check `.env.local` exists and has correct values
- Verify Supabase URL and keys are correct
- Check if signed in (session valid)
- Clear browser cookies and sign in again

### "Failed to generate synthesis"

- Verify OpenAI API key is valid
- Check OpenAI account has credits
- Check API key has correct permissions
- Check network connectivity

### Database Connection Errors

- Verify Supabase project is active
- Check database password is correct
- Verify migration ran successfully
- Check RLS policies are enabled

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript compilation
npx tsc --noEmit
```

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel deployment instructions.

## Support

For issues:
1. Check TESTING.md for test procedures
2. Review ARCHITECTURE.md for system design
3. Check Supabase logs for database errors
4. Check Vercel logs for API errors
5. Check browser console for client errors
