# Frontend AI Agent Instructions

This document outlines the best practices, architecture, and agent instructions for the `esign-web` project. AI agents should read and follow these rules when contributing to the codebase.

---

## Code Quality & Documentation

- Write minimal comments only when component logic is complex or non-obvious
- Prioritize self-documenting code with clear component, function, and variable names
- Add JSDoc comments for complex utility functions and custom hooks
- Use TypeScript interfaces and types to document data structures

## Dependency Management

- Use `pnpm add <package>` for all dependency installations
- Use pnpm instead of npm or yarn package managers
- Update package.json dependencies through pnpm commands only
- Prefer exact versions for dependencies when possible

## Code Execution Policy

- Do NOT run build scripts or start development servers unless explicitly requested
- Exception: Use `pnpm lint` or `pnpm format` to check code quality
- Avoid any execution that could modify the build output or environment
- Use `tsc --noEmit` to type-check TypeScript code only

## Research & Implementation

- When you need to search docs, use `context7` MCP tools
- Review official React, TypeScript, and library docs before coding
- Understand component patterns and hooks thoroughly before implementation
- Follow established patterns from the existing codebase

## Code Formatting

- Always run `pnpm format && pnpm check` (Biome) as the final step after completing all tasks
- Ensure consistent code style across the project using Biome configuration
- Do not proceed to next task until formatting and linting are complete
- Avoid nested ternary operators or nested if-else statements as far as possible
- Prefer `Boolean(value)` over `!!value` for boolean checks
- For TanStack Query hooks usage, prefer `const anyData = useAnyData()` then `anyData.data`, `anyData.isLoading`, `anyData.error` over `const { data, isLoading, error } = useAnyData()`

## File Organization

Follow this established project structure:

**Key Rules:**

- Place all Zod schemas in the `lib/schemas/` folder
- Keep TypeScript types in `lib/types/` organized by domain
- Reusable UI components go in `components/ui/`
- API-related code in `services/` with Tanstack Query in `queries/`
- State management using Zustand in `stores/`
- Page components in `pages/` following route structure
- Use descriptive filenames that indicate the component/module purpose and use kebab-case

## Component Patterns

- Use functional components with hooks
- Implement proper TypeScript typing for all props and state
- Follow the established pattern of separating concerns:
  - UI components in `components/ui/`
  - Layout components in `components/layout/`
  - Common/shared components in `components/common/`
- Use `function fn()` syntax for normal functions and `const Component = () => {}` syntax for React components

## State Management

- Use Zustand for global state management
- Follow the established store patterns in `stores/{feature}-store.ts`
- Use TanStack Query for server state management
- Keep component state local when possible

## API Integration

- Use Axios for HTTP requests in `services/api.ts`
- Implement TanStack Query hooks in `services/queries/`
- Save the API routes name and TanStack Query key in `services/api-config.ts`
- Follow the established API configuration patterns
- Use proper error handling with the error utilities

## Styling

- Use Tailwind CSS for styling following the v4 configuration
- Utilize the established design system with CVA (Class Variance Authority)
- Follow the consistent spacing, colors, and typography patterns
- Use `cn` function from `@/lib/utils.ts` if need to conditionally apply classNames

## Form Handling

- Use React Hook Form with Zod validation
- Place form schemas in `lib/schemas/`
- Follow the established form field component patterns
- Implement proper error handling and validation feedback

## Routing

- Use TanStack Router following the established patterns
- Follow the page organization structure in `routes/`

## Prohibited Actions

- Never create example usage files or demo components unless explicitly requested
- Do not generate sample data or mock fixtures unless needed for development
- Avoid creating unnecessary boilerplate files
- Do not modify the build configuration without explicit instruction
- Never bypass the established TypeScript strict mode settings

## Performance Considerations

- Use React.memo() for expensive components when appropriate
- Implement proper key props for lists
- Follow the established lazy loading patterns
- Optimize images and assets appropriately

## Accessibility

- Follow WCAG guidelines for accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes when needed
- Ensure keyboard navigation support

---

## Agent Orchestration & Skills

When instructed to perform a task, leverage the specific skills in `.agents/skills/` to orchestrate your workflow efficiently:

- **`context7`**: Use when needing to look up documentation or code examples for external libraries.
- **`tanstack-router-best-practices`**: Use when working with React and TanStack Router for file-based routing, creating hooks, or updating component architecture.
- **`shadcn`**: Use to manage or add shadcn/ui components, work with `components.json`, or debug component styling.