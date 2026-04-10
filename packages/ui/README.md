# @shared/ui

A React component library built with TypeScript, Tailwind CSS, and Storybook.

## Components

- **Button** - Customizable button with variants (primary, secondary, danger, ghost) and sizes
- **Input** - Text input with label, error state, and helper text support
- **Card** - Container component with composable Header, Body, and Footer sections
- **Modal** - Dialog component with backdrop, title, and configurable sizing

## Installation

```bash
pnpm install @shared/ui react react-dom tailwindcss
```

## Usage

```tsx
import { Button, Input, Card, Modal } from "@shared/ui";
import "@shared/ui/styles";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Content</Card.Body>
      </Card>
    </div>
  );
}
```

## Development

```bash
# Start Storybook documentation site
pnpm storybook

# Build components
pnpm build

# Type check
pnpm type-check
```

## Styling

The library uses Tailwind CSS for styling. Make sure Tailwind CSS is installed in your project:

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

Configure your `tailwind.config.js` to include content from this package:

```js
module.exports = {
  content: ["./node_modules/@shared/ui/dist/**/*.js"],
};
```

## Storybook

View component documentation at `http://localhost:6006` when running `pnpm storybook`.

## Build

The library is built with Vite and optimized for ESM distribution:

```bash
pnpm build
```

Output files:

- `dist/index.js` - Bundled component library
- `dist/index.d.ts` - TypeScript definitions
