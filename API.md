# API Documentation

## Authentication

All API endpoints require authentication via Bearer token.

```
Authorization: Bearer <supabase_access_token>
```

Get token from Supabase session after sign in.

## Endpoints

### POST /api/process

Process user input through multi-layer synthesis engine.

**Request Body:**

```json
{
  "input_text": "string (1-10000 chars)",
  "input_mode": "free_write|question|scenario|decision|emotional|identity",
  "active_lens": "adaptive|strategist|therapist|philosopher|shadow|non_dual|manifestation",
  "depth_level": 1|2|3|4,
  "brutal_mode": boolean
}
```

**Response:**

```json
{
  "entry_id": "uuid",
  "response": {
    "id": "uuid",
    "entry_id": "uuid",
    "created_at": "timestamp",
    "structural_analysis": "string",
    "manifestation_analysis": "string",
    "archetypal_analysis": "string",
    "strategic_analysis": "string",
    "corrective_action": "string",
    "forcing_question": "string"
  },
  "scores": {
    "emotional_intensity": 0-100,
    "identity_threat_score": 0-100,
    "distortion_score": 0-100,
    "excess_importance_score": 0-100,
    "assumption_strength_score": 0-100,
    "state_stability_score": 0-100
  }
}
```

**Error Responses:**

- `400`: Invalid request (validation error)
- `401`: Unauthorized (invalid/missing token)
- `429`: Rate limit exceeded
- `500`: Internal server error

**Rate Limit:**

- 20 requests per minute per user
- Headers include remaining count and reset time

### GET /api/metrics

Get user's pattern metrics and timeline data.

**Response:**

```json
{
  "metrics": {
    "user_id": "uuid",
    "impatience_index": 0-100,
    "wealth_identity_fusion_score": 0-100,
    "ego_defensiveness_score": 0-100,
    "narrative_coherence_score": 0-100,
    "state_drift_frequency": 0-100,
    "excess_importance_frequency": 0-100,
    "identity_stability_index": 0-100,
    "updated_at": "timestamp"
  },
  "timeline": [
    {
      "created_at": "timestamp",
      "emotional_intensity": 0-100,
      "state_stability_score": 0-100,
      "excess_importance_score": 0-100
    }
  ]
}
```

**Error Responses:**

- `401`: Unauthorized
- `500`: Internal server error

## Database Direct Access

All tables have Row Level Security enabled. Direct database access requires:

1. Valid Supabase session
2. Queries automatically filtered by `user_id`
3. Service role key for admin operations only

### Tables

**entries**
```sql
SELECT * FROM entries WHERE user_id = auth.uid();
```

**responses**
```sql
SELECT r.* FROM responses r
JOIN entries e ON e.id = r.entry_id
WHERE e.user_id = auth.uid();
```

**pattern_metrics**
```sql
SELECT * FROM pattern_metrics WHERE user_id = auth.uid();
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_ERROR` | Authentication failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `VALIDATION_ERROR` | Invalid input data |
| `SYNTHESIS_ERROR` | AI processing failed |
| `DATABASE_ERROR` | Database operation failed |

## Rate Limiting

Implementation: In-memory sliding window

- Window: 60 seconds
- Max requests: 20
- Identifier: user_id
- Reset: Automatic after window expires

Note: Rate limit state resets on server restart (serverless environment).

## Security

### Authentication Flow

1. Client signs in via Supabase Auth
2. Receives JWT access token
3. Includes token in Authorization header
4. Server validates token with Supabase
5. Extracts user_id from session
6. RLS policies enforce data access

### Data Protection

- Service role key never exposed to client
- All queries filtered by user_id via RLS
- Input validation with Zod
- No sensitive data in error messages
- No logging in production

## Performance

### Expected Response Times

- `/api/process`: 5-15 seconds (AI processing)
- `/api/metrics`: < 1 second (database query)

### Optimization Tips

- Use appropriate depth level (higher = slower)
- Batch multiple questions if possible
- Monitor rate limits
- Cache dashboard data client-side

## Future API Endpoints

Planned but not implemented:

- `POST /api/export`: Export user data
- `DELETE /api/account`: Delete account
- `GET /api/history`: Paginated entry history
- `POST /api/subscription`: Manage subscription
- `GET /api/usage`: Usage statistics
