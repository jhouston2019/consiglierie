# Project Structure

```
cognitive-console/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── process/
│   │   │   └── route.ts         # Main processing endpoint
│   │   └── metrics/
│   │       └── route.ts         # Metrics endpoint
│   ├── auth/
│   │   └── page.tsx             # Authentication page
│   ├── console/
│   │   └── page.tsx             # Main processing interface
│   ├── dashboard/
│   │   └── page.tsx             # Metrics dashboard
│   ├── history/
│   │   └── page.tsx             # Entry history browser
│   ├── privacy/
│   │   └── page.tsx             # Privacy statement
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root redirect
│   ├── globals.css              # Global styles
│   └── manifest.json            # PWA manifest
│
├── components/                   # Reusable components
│   ├── Footer.tsx               # Footer with shortcuts
│   ├── LoadingSpinner.tsx       # Loading indicator
│   ├── MetricCard.tsx           # Metric display card
│   ├── Navigation.tsx           # Navigation bar
│   └── ResponseSection.tsx      # Response section display
│
├── lib/                          # Shared utilities
│   ├── ai/                       # AI processing
│   │   ├── synthesis-engine.ts  # Multi-layer AI synthesis
│   │   ├── pattern-analyzer.ts  # Pattern metric calculation
│   │   └── rate-limiter.ts      # Rate limiting logic
│   ├── supabase/                 # Database clients
│   │   ├── client.ts            # Client-side Supabase
│   │   └── server.ts            # Server-side Supabase
│   ├── hooks/                    # React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   └── useKeyboardShortcuts.ts  # Keyboard shortcuts
│   ├── utils/                    # Helper functions
│   │   ├── errors.ts            # Error classes
│   │   ├── format.ts            # Formatting utilities
│   │   └── validation.ts        # Input validation
│   ├── types.ts                  # TypeScript types
│   └── constants.ts              # App constants
│
├── supabase/                     # Supabase configuration
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
│
├── public/                       # Static assets
│   └── robots.txt               # SEO configuration
│
├── docs/                         # Documentation
│   ├── README.md                # Main documentation
│   ├── ARCHITECTURE.md          # System architecture
│   ├── DEPLOYMENT.md            # Deployment guide
│   ├── TESTING.md               # Testing procedures
│   ├── CONTRIBUTING.md          # Contribution guidelines
│   ├── SETUP.md                 # Setup instructions
│   ├── FAQ.md                   # Frequently asked questions
│   ├── API.md                   # API documentation
│   ├── SHORTCUTS.md             # Keyboard shortcuts
│   └── CHANGELOG.md             # Version history
│
├── .env.example                  # Environment template
├── .env.local.example           # Local environment template
├── .gitignore                   # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .prettierignore              # Prettier ignore rules
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.mjs           # PostCSS configuration
├── next.config.js               # Next.js configuration
├── vercel.json                  # Vercel configuration
├── middleware.ts                # Next.js middleware
└── LICENSE                      # License file
```

## Key Files

### Core Application

- `app/console/page.tsx`: Main processing interface
- `app/api/process/route.ts`: Processing API endpoint
- `lib/ai/synthesis-engine.ts`: AI synthesis logic

### Configuration

- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: Styling configuration
- `.env.example`: Environment variable template

### Database

- `supabase/migrations/001_initial_schema.sql`: Complete database schema
- `lib/types.ts`: TypeScript type definitions
- `lib/supabase/client.ts`: Client-side database access

### Documentation

- `README.md`: Project overview and setup
- `ARCHITECTURE.md`: System design and principles
- `API.md`: API endpoint documentation

## Component Hierarchy

```
RootLayout
├── AuthPage
├── ConsolePage
│   ├── Navigation
│   ├── Form (input controls)
│   ├── ResponseSection (x6)
│   └── Footer
├── DashboardPage
│   ├── Navigation
│   ├── MetricCard (x7)
│   └── LineChart
└── HistoryPage
    ├── Navigation
    ├── EntryList
    └── EntryDetail
```

## Data Flow

### Entry Processing

1. User submits input via `/console`
2. Client sends POST to `/api/process`
3. Server validates authentication
4. Server checks rate limit
5. Server fetches user history
6. Server calls OpenAI synthesis engine
7. Server stores entry in database
8. Server stores response in database
9. Server updates pattern metrics
10. Server returns response to client
11. Client displays 6-section analysis

### Metrics Dashboard

1. User navigates to `/dashboard`
2. Client sends GET to `/api/metrics`
3. Server validates authentication
4. Server fetches pattern_metrics
5. Server fetches recent entries for chart
6. Server returns data
7. Client renders metrics and chart

## Environment Variables

### Required

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (server-only)
- `OPENAI_API_KEY`: OpenAI API key (server-only)

### Optional

- `NEXT_PUBLIC_APP_URL`: Application URL (defaults to localhost)
- `NODE_ENV`: Environment (development/production)

## Build Output

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
│   ├── app/           # App routes
│   └── chunks/        # Code chunks
└── static/            # Static assets
```

## Deployment Structure

### Vercel

- API routes → Serverless functions
- Pages → Static or SSR
- Middleware → Edge functions
- Environment variables → Vercel dashboard

### Supabase

- Database → Managed Postgres
- Auth → Managed authentication
- Storage → (not used)
- Edge Functions → (not used)

## Scalability Considerations

### Current Architecture

- Optimized for single power user
- In-memory rate limiting
- Direct database queries
- No caching layer

### Future Scaling

When adding multi-user scale:

1. Move rate limiter to Redis
2. Add database connection pooling
3. Implement query result caching
4. Add CDN for static assets
5. Optimize database indexes
6. Add background job processing
7. Implement usage analytics
8. Add monitoring/alerting
