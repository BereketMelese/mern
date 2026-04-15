# Web App

React + Vite web application for the MERN monorepo.

## Features

- Vite for fast development and optimized builds
- React Router for client-side routing
- Tailwind CSS for styling
- Axios for API calls
- Integration with @repo/ui components
- TypeScript for type safety
- Integrated with @shared/utils for shared types

## Available Routes

- `/` - Home page
- `/about` - About page
- `/dashboard` - Dashboard with users and products

## Development

```bash
pnpm --filter @mern/web run dev
```

Server runs on http://localhost:5173

## Build

```bash
pnpm --filter @mern/web run build
```

## Type Check

```bash
pnpm --filter @mern/web run type-check
```
