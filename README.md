# MERN Monorepo

A monorepo using pnpm workspaces for managing multiple applications and shared packages.

## Structure

```
.
├── apps/
│   ├── api/          # Node.js/Express backend API
│   └── web/          # React/Next.js frontend application
├── packages/
│   ├── shared/       # Shared utilities and types
│   └── ui/           # Shared UI components library
└── root configs
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Installation

```bash
# Install pnpm globally if not already installed
npm install -g pnpm

# Install dependencies across all workspaces
pnpm install
```

## Development

```bash
# Run dev servers for all apps in parallel
pnpm dev

# Run build for all packages and apps (packages first)
pnpm build

# Lint all packages
pnpm lint

# Type check all packages
pnpm type-check

# Format all code
pnpm format

# Clean all dependencies and build outputs
pnpm clean
```

## Workspaces

### Apps

- **web**: React/Next.js frontend application
- **api**: Node.js/Express backend API

### Packages

- **shared**: Shared utilities, types, and constants
- **ui**: Shared React UI components

## Adding Dependencies

### Add to a specific workspace

```bash
pnpm add -w @shared/utils       # Use workspace package
pnpm add -w axios --save-peer   # Add to web app
```

### Add to root (dev dependencies)

```bash
pnpm add -D -w typescript
```

## Dependency Management

- Packages should depend on other packages using workspace protocol: `"@shared/utils": "workspace:*"`
- Avoid circular dependencies between workspaces
- Keep shared packages in `packages/`
- Application-specific code stays in `apps/`

## TypeScript

The root `tsconfig.json` provides base configuration for all workspaces. Each workspace can extend it:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

## License

MIT
