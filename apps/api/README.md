# API

This is a minimal Express + TypeScript API for the monorepo.

Commands:

- Install deps (from repo root):

```bash
pnpm install
```

- Generate Prisma client:

```bash
pnpm --filter @mern/api run prisma:generate
```

- Create/migrate SQLite DB (dev):

```bash
pnpm --filter @mern/api run prisma:migrate:dev
```

- Start dev server (nodemon + ts-node):

```bash
pnpm --filter @mern/api run dev
```

Endpoints:

- GET / -> health
- GET /users -> list users
- POST /products -> create product

