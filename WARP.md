# WARP.md

This file provides guidance to Warp AI when working with code in this repository. Warp is an Agentic Development Environment designed to help developers ship faster with AI assistance.

## Project Overview

This is a modern React + TypeScript application built with Vite. The application demonstrates best practices for building scalable web applications with:

- **React 19** with TypeScript for the core framework
- **Vite** as the build tool and development server
- **Firebase** for backend services and authentication
- **TanStack Query** (React Query) for server state management
- **React Router DOM v7** for client-side routing
- **Radix UI** for accessible component primitives
- **Tailwind CSS v4** for styling with modern utility-first approach
- **Vitest** for unit and integration testing
- **JSON Server** for development API mocking
- **Motion** for animations and transitions
- **DND Kit** for drag-and-drop functionality

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

## Warp AI Integration

### Smart Conventional Commits
This project is configured to work with Warp's Smart Conventional Commits workflow. You can use the following Warp AI command to automatically analyze changes and create conventional commits:

```bash
# Analyze all git changes and create conventional commits
warp ai "Analyze all git changes in the repository and:
1. Group changes by Conventional Commit type (feat, fix, docs, style, refactor, test, chore).
2. Stage relevant changes and commit as <type>(<scope>): <description>.
   - Infer <scope> from the most relevant directory or component.
   - Split into atomic commits if multiple scopes are affected.
   - Keep descriptions imperative and ≤72 chars.
3. Push commits to the current branch."
```

### Development Workflow with Warp
- Use natural language prompts to have Warp write code, debug issues, or execute commands
- Warp automatically detects whether you're typing a command or a natural language prompt
- Multiple agents can run simultaneously with notification management
- All project documentation and context is available to Warp AI for enhanced assistance

## Architecture

### Key Directories
- `/src/components/ui/` - Base UI components built on Radix UI primitives
- `/src/components/common/` - Shared application components (breadcrumb, loading, etc.)
- `/src/components/form/` - Form-specific components (input, select)
- `/src/components/table/` - Data table components with sorting, filtering, pagination
- `/src/components/sidebar/` - Navigation and sidebar components
- `/src/hooks/` - Custom React hooks for shared functionality (auth, data tables, form submission, etc.)
- `/src/providers/` - React context providers (auth, theme, commands, confirmations)
- `/src/services/` - Service layer for external API interactions (auth, entity management)
- `/src/lib/` - Utility functions and shared helper code
- `/src/routes/` - Application routing configuration
- `/src/config/` - Configuration files (Firebase setup)
- `/src/constants/` - Application-wide constants
- `/src/assets/` - Static assets (fonts, images)

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