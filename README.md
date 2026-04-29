# esign-web

> E-signature platform web application.

## Tech Stack

- React 19 + TypeScript
- Vite
- TanStack Router
- TanStack Query
- Zustand
- Zod
- Tailwind CSS v4
- shadcn/ui

## Prerequisites

- Node.js 20+
- pnpm 10+

## Installation

### Clone the repository

```bash
git clone https://github.com/up2dul/esign-web.git

# or if use ssh
git clone git@github.com:up2dul/esign-web.git
```

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

And then open http://localhost:5173 in your browser.

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `format` - Format code with Biome
- `check` - Lint with Biome

## Project Structure

- `src/components/ui/` - UI components
- `src/components/layout/` - Layout components
- `src/routes/` - Page routes
- `src/services/` - API and queries
- `src/lib/schemas/` - Zod schemas
- `src/stores/` - Zustand stores