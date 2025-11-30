# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Firmansyah Yanuar's personal website built with Next.js, TypeScript, and Tailwind CSS. It features a portfolio, blog functionality, work experience timeline, and contact information.

## Development Commands

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Type checking
yarn check-types

# Build for production
yarn build

# Start production server
yarn start

# Linting
yarn lint
yarn lint:fix

# Testing
yarn test

# Clean build artifacts
yarn clean

# Pre-push validation
yarn pre-push

# Deploy to Vercel
yarn deploy:preview  # Preview deployment
yarn deploy:prod    # Production deployment
```

## Architecture Overview

### Core Technologies
- **Framework**: Next.js 13 with Pages Router
- **Styling**: Tailwind CSS + SCSS modules + Styled Components
- **State Management**: React Query (@tanstack/react-query)
- **Dark Mode**: next-dark-mode with CSS custom properties
- **Analytics**: Vercel Analytics + Google Tag Manager
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

### Project Structure
- `src/pages/`: Next.js pages with file-based routing
- `src/components/`: Reusable components organized by atomic design principles
  - `ui/`: Basic UI components (buttons, inputs, etc.)
  - `molecules/`: Combined UI components 
  - `organism/`: Complex component compositions
  - `template/`: Layout and page-level components
  - `pages/`: Page-specific components
- `src/services/`: API service layer for external calls
- `src/utils/`: Utility functions and helpers
- `src/hooks/`: Custom React hooks
- `src/styles/`: Global styles and SCSS modules
- `src/interfaces/`: TypeScript type definitions
- `content/`: Markdown blog content
- `src/data/`: Static JSON data (projects, etc.)

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Dark/Light Mode**: Theme switching with CSS custom properties
- **Blog System**: MDX-based blog with syntax highlighting
- **Firebase Integration**: For analytics and data collection
- **External API Integration**: Backend API for blog interactions and GitHub contributions
- **Work Experience Timeline**: Interactive career progression display
- **Project Portfolio**: Dynamic project showcase from JSON data

### Path Aliases
The project uses TypeScript path aliases:
- `~/`: Points to `src/`
- `@assets/`: Points to `src/assets/`
- `@components/`: Points to `src/components/`
- `@pages/`: Points to `src/pages/`
- `@styles/`: Points to `src/styles/`
- `@utils/`: Points to `src/utils/`

### Environment Configuration
Required environment variables (see `.env.example`):
- Firebase configuration for analytics
- Backend API URL for blog interactions
- Google Tag Manager settings
- Phone number for contact functionality
- Feature flags for A/B testing

### Styling System
- **Tailwind CSS**: Utility-first CSS with custom theme extensions
- **CSS Custom Properties**: For dynamic theming (dark/light mode)
- **SCSS Modules**: Component-scoped styles
- **Styled Components**: For dynamic styling needs
- **Typography Plugin**: Enhanced text styling with @tailwindcss/typography

### Testing Strategy
- Jest configuration with Next.js integration
- Custom module name mapping for path aliases
- React Testing Library for component testing
- Test files located in `src/__tests__/`

### Build & Deployment
- Next.js static export capability
- Bundle analyzer available with `ANALYZE=true`
- Vercel deployment with preview and production environments
- Husky pre-commit hooks for code quality

### Content Management
- **Blog**: Markdown files in `content/blogs/` and `content/archived-blogs/`
- **Projects**: JSON data in `src/data/projects.json`
- **Static Assets**: Located in `public/` directory

## Development Notes

### Component Organization
Components follow atomic design principles and are organized by complexity level. Use the existing component structure when adding new UI elements.

### Theming
The project uses CSS custom properties for theming. Define theme-related styles in the Tailwind config and reference CSS variables for consistent color usage across light/dark modes.

### API Integration
External API calls are centralized in the `src/services/` directory. The backend URL is configurable via environment variables.

### Responsive Behavior
The project uses a mobile-first approach. The `useResponsive` hook provides device-specific logic, and Tailwind responsive utilities handle styling breakpoints.

### Performance Considerations
- React.memo is used for component optimization
- Bundle analyzer is available for monitoring build size
- Next.js automatic code splitting is leveraged
- Vercel Analytics provides performance insights