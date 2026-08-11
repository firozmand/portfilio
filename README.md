# Ali Firozmand - Portfolio

A Next.js 16 portfolio with a protected admin panel backed by PostgreSQL,
Prisma, and Auth.js.

## Local setup

1. Install the pinned package manager and dependencies:

   ```bash
   corepack enable
   pnpm install
   ```

2. Copy `.env.example` to `.env` and set a PostgreSQL `DATABASE_URL`,
   `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

3. Initialize and seed the database, then start the app:

   ```bash
   pnpm run db:deploy
   pnpm run db:seed
   pnpm run dev
   ```

Open <http://localhost:3000>. The admin panel is available at
<http://localhost:3000/admin>.

## Vercel setup

- Connect a serverless PostgreSQL database (for example Neon or Supabase) and
  expose its pooled connection string as `DATABASE_URL` in Production and
  Preview.
- Set `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in Vercel.
- Connect a Vercel Blob store if image or resume uploads are required. Vercel
  provides `BLOB_READ_WRITE_TOKEN` to the project automatically.
- Deploy once, then run `pnpm run db:seed` from a secure CI/admin environment
  to create the initial administrator. Do not seed on every deployment.

`vercel.json` runs Prisma generation and safe pending migrations before every
Vercel build. It never resets or reseeds the production database.

## Quality checks

```bash
pnpm run check
```

The public portfolio still renders its bundled fallback content when no
database is configured, but the admin panel requires PostgreSQL.
