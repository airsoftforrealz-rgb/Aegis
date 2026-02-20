# Aegis

Production-ready Next.js fantasy esports platform for Valorant tournaments.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS tokens + reusable components
- Prisma + PostgreSQL (Neon)
- Zod validation, TanStack Query
- Socket.IO live updates
- BullMQ jobs with Redis fallback
- Recharts for chart surfaces
- Playwright E2E

## Setup
1. Copy envs:
   ```bash
   cp .env.example .env
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Run Prisma:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```
4. Run app:
   ```bash
   npm run dev
   ```
5. Run e2e:
   ```bash
   npm run test:e2e
   ```

## Required routes implemented
- POST `/api/leagues`
- POST `/api/leagues/join`
- POST `/api/league-events`
- POST `/api/draft/:id/start`
- POST `/api/draft/:id/pause`
- POST `/api/draft/:id/pick`
- POST `/api/lineups/:leagueEventId/:periodId`
- GET `/api/leaderboards/:leagueEventId`
- GET `/api/events`
- POST `/api/admin/jobs/ingest`
- POST `/api/admin/jobs/score`
- POST `/api/admin/recalc`
- GET `/api/test-db`
