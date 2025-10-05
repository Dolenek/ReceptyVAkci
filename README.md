Kuchar v Akci
============

React and TypeScript web app that highlights the newest recipe and keeps an archive sorted by publish date. The layout mirrors the ingredient list and step flow from the provided reference image and connects to Supabase for data.

Quick start
1. Duplicate the env example file and create a file called dot-env with your Supabase URL and anon key.
2. Install dependencies with npm install (or any Node package manager you prefer).
3. Run npm run dev to start the Vite development server.

Highlights
- Tailwind driven split layout for ingredients and preparation steps.
- Supabase client with automatic fallback to local mock data when credentials are missing.
- Archive grid view with pagination and a dedicated detail route per slug.
- Vitest plus Testing Library already configured with sample smoke tests.

Further reading
- Open docs/architecture.md for structural decisions.
- Open docs/development.md for workflow guidance.
- Open docs/supabase-schema.sql for the expected database table definition.
- Review AGENTS.md for automation specific conventions.
