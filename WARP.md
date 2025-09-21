# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React + TypeScript application built with Vite. It's a modern web application that uses:
- React 19 with TypeScript
- Vite as the build tool
- Firebase for backend services
- React Query for data fetching
- React Router for navigation
- Radix UI for components
- Tailwind CSS for styling
- Vitest for testing
- JSON Server for development API mocking

## Development Commands

### Core Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint code
pnpm lint

# Start mock API server (runs on port 3001)
pnpm api
```

### Testing
The project uses Vitest for testing. To run specific test files or test suites:
```bash
# Run specific test file
pnpm test path/to/test-file.test.ts

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## Architecture

### Key Directories
- `/src/hooks/` - Custom React hooks for shared functionality (auth, data tables, form submission, etc.)
- `/src/providers/` - React context providers (auth, theme, commands, confirmations)
- `/src/services/` - Service layer for external API interactions (auth, entity management)
- `/src/lib/` - Utility functions and shared helper code
- `/src/routes/` - Application routing configuration
- `/src/config/` - Configuration files (Firebase setup)
- `/src/constants/` - Application-wide constants

### Key Architectural Patterns
1. **Data Management**
   - Uses React Query (TanStack Query) for server state management
   - Custom hooks (`use-entity-query.ts`, `use-entity-mutation.ts`) abstract data fetching
   - Firebase integration for backend services

2. **Component Architecture**
   - Radix UI primitives for accessible components
   - Tailwind CSS for styling with class-variance-authority for variants
   - DND Kit integration for drag-and-drop functionality

3. **Form Handling**
   - React Hook Form with Zod schema validation
   - Custom `use-submit-form` hook for standardized form submissions

4. **Authentication**
   - Firebase Authentication
   - Protected routes with React Router
   - Custom `use-auth-hero` hook for auth state management

### Path Aliases
The codebase uses the '@' path alias to reference the src directory:
```typescript
import { something } from '@/components/something'
```

## Tooling Configuration

### TypeScript
The project uses three TypeScript configurations:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### ESLint
Uses a modern flat config with TypeScript integration. Key features:
- Type-aware lint rules
- React-specific linting via eslint-plugin-react-x
- Strict TypeScript checking enabled