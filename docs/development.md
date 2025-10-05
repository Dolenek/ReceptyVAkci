Local Development Guide
=======================

Prerequisites
- Node.js 18 or newer together with npm or pnpm.
- Supabase CLI if you plan to run a local instance, otherwise provide remote credentials.
- Modern browser for testing such as Chrome, Edge, or Firefox.

Install Dependencies
1. Copy .env.example to .env and fill Supabase URL and anon key when available.
2. Install packages with your preferred manager (example: npm install or pnpm install).
3. Start the development server using npm run dev.

Available Scripts
- npm run dev starts Vite with hot module replacement.
- npm run build performs a type check followed by a production build.
- npm run preview serves the build output locally for smoke testing.
- npm run lint lints TypeScript and React files with ESLint and Prettier rules.
- npm run test runs Vitest in CI mode, and npm run test:watch keeps Vitest open during development.

Supabase Setup Checklist
- Ensure a recipes table exists with jsonb columns for ingredients and steps.
- Grant select permissions to the anon key for the recipes table.
- Optional: add Row Level Security policies for fine grained control when you introduce auth.

Troubleshooting
- If data does not load, verify Supabase credentials. The UI automatically falls back to mock data but logs a warning.
- When Tailwind classes seem missing, restart the development server to rebuild the PostCSS pipeline.
- For stubborn test failures caused by cached queries, clear node_modules/.vite or run Vitest with the --runInBand flag for debugging.
