# Contributing Guidelines

## Code Standards

### TypeScript

- Strict mode enabled
- No `any` types without justification
- Explicit return types for functions
- Interface over type for object shapes

### React

- Functional components only
- Hooks for state management
- Client components marked with 'use client'
- Server components by default

### Styling

- TailwindCSS utility classes
- No custom CSS unless necessary
- Dark mode default
- Consistent spacing scale

### File Organization

```
app/                    # Next.js App Router pages
  api/                  # API routes
  console/              # Main processing interface
  dashboard/            # Metrics dashboard
  history/              # Entry history
  auth/                 # Authentication
  privacy/              # Privacy statement
lib/                    # Shared utilities
  ai/                   # AI synthesis engine
  supabase/             # Database clients
  hooks/                # React hooks
  utils/                # Helper functions
  types.ts              # TypeScript types
  constants.ts          # App constants
components/             # Reusable components
supabase/
  migrations/           # Database migrations
```

## Git Workflow

### Commit Messages

Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `docs`: Documentation
- `style`: Formatting
- `perf`: Performance improvement
- `test`: Testing
- `chore`: Maintenance

Examples:
- `feat: add brutal mode toggle`
- `fix: correct metric calculation in pattern analyzer`
- `refactor: extract response sections to component`

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `fix/*`: Bug fixes

## Testing Requirements

Before committing:

1. Test authentication flow
2. Test API endpoints with valid/invalid data
3. Verify RLS policies
4. Check console for errors
5. Test responsive layout
6. Verify TypeScript compilation

## Security Requirements

- Never commit `.env` files
- Never log sensitive data
- Always validate API inputs
- Always check authentication
- Always use RLS policies

## Performance Guidelines

- Minimize API calls
- Use React.memo for expensive components
- Lazy load heavy dependencies
- Optimize images
- Limit database query results

## AI Prompt Engineering

When modifying synthesis engine:

- Maintain 4-layer ontological structure
- Preserve adaptive response logic
- Keep response format consistent
- Test with diverse input types
- Verify JSON output parsing

## Database Changes

When modifying schema:

1. Create new migration file
2. Test migration locally
3. Document changes
4. Update TypeScript types
5. Update RLS policies if needed

## Documentation

Keep updated:
- README.md for setup
- ARCHITECTURE.md for system design
- TESTING.md for test procedures
- DEPLOYMENT.md for deployment steps

## Code Review Checklist

- [ ] TypeScript types correct
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Authentication checked
- [ ] RLS policies respected
- [ ] Rate limiting considered
- [ ] Input validation present
- [ ] Responsive design tested
- [ ] Dark mode compatible
- [ ] No hardcoded values
- [ ] Environment variables used
- [ ] Comments only for non-obvious logic

## Future Monetization Considerations

When adding features, consider:

- Can this be a premium feature?
- Does it need usage tracking?
- Should it be tier-gated?
- Does it affect billing logic?

Keep monetization hooks in mind but don't implement until needed.
