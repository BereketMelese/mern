# MERN Monorepo

Production-ready monorepo with React, Express, Prisma, shared UI/utilities, Docker, Nginx, PM2, and CI.

## Stack

- `apps/web`: React 18 + Vite + React Query
- `apps/api`: Express + Prisma + SQLite + JWT auth
- `packages/shared`: Shared types and Zod validators
- `packages/ui`: Shared UI components

## Prerequisites

- Node.js 18 or newer
- pnpm 9 or newer
- Docker Desktop or Docker Engine with Compose

## Environment Variables

Copy [.env.example](.env.example) to [.env](.env) and adjust values for your machine or deployment target.

Key variables:

- `PORT`: API port in production
- `DATABASE_URL`: SQLite location used by Prisma
- `JWT_SECRET`: Signing secret for auth tokens
- `CORS_ORIGIN`: Allowed browser origins for direct API access
- `VITE_API_BASE_URL`: API base URL baked into the web build

## Local Development

Install dependencies and run the workspace:

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm type-check
pnpm test:unit
pnpm test:e2e
pnpm format:check
```

## Docker Development

The Compose stack runs three services:

- `api`: Express API with Prisma migrations and PM2 runtime
- `web`: Nginx-served static build of the React app
- `nginx`: Reverse proxy that routes `/api` to the API and `/` to the web app

Start the stack:

```bash
cp .env.example .env
pnpm docker:up
```

The app is available at `http://localhost:8080`.

Stop it:

```bash
pnpm docker:down
```

## Production Builds

Build the images manually:

```bash
pnpm docker:build
```

Or use the helper scripts:

```bash
./scripts/docker-build.sh
./scripts/deploy.sh
./scripts/docker-logs.sh
```

## Docker Layout

### API image

- Multi-stage build from Node 20
- Builds shared package first, then the API
- Runs Prisma migrations on startup
- Uses PM2 runtime for process management
- Exposes `/health` for Docker and Compose health checks

### Web image

- Multi-stage build from Node 20
- Compiles the Vite app with `VITE_API_BASE_URL=/api`
- Serves the SPA through Nginx with client-side routing fallback
- Exposes `/healthz` for health checks

### Reverse proxy

- Nginx routes `/api/*` to the API service
- Nginx routes everything else to the web service
- Logs to stdout and stderr for container log aggregation

## Production Process Manager

The API uses PM2 via [apps/api/ecosystem.config.cjs](apps/api/ecosystem.config.cjs) with:

- one forked instance
- merged logs
- production env defaults
- stdout/stderr log targets for containerized deployments

## Health Checks

- API: `GET /health`
- Web: `GET /healthz`
- Nginx: `GET /healthz`

Docker Compose waits for the API and web services to become healthy before starting the reverse proxy.

## Deployment Notes

- The API persists SQLite data in a named Docker volume.
- The web bundle is built with a production API base URL and does not depend on dev server proxying.
- For non-Docker deployments, use PM2 with the same ecosystem config and set the env variables from `.env.example`.

## Testing and Quality

- Unit tests: Vitest in `apps/web`, `apps/api`, and `packages/shared`
- API tests: Supertest with mocked Prisma
- E2E tests: Playwright for the auth flow
- Linting: ESLint + Prettier
- Git hooks: Husky + lint-staged
- CI: GitHub Actions in [.github/workflows/ci.yml](.github/workflows/ci.yml)

For Playwright locally, install the browser once:

```bash
pnpm --filter @mern/web exec playwright install chromium
```

## Notes on Monorepo Builds

Shared packages are built before app builds so workspace imports resolve cleanly in production images and CI.
