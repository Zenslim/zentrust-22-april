# ZenTrust Backend Setup (Supabase + Postgres)

## How this works

- `docker-compose up` will start:
  - Postgres database
  - Supabase GoTrue Auth service

## Fly.io Deployment
You can deploy this directly to Fly.io by setting:
- Postgres service
- Supabase Auth service
- Storage service (later)

## Local Testing
- Install Docker
- `cd backend`
- `docker-compose up`

## Next steps
- Add Realtime server (optional)
- Add Storage server (optional)
- Connect frontend to this backend
