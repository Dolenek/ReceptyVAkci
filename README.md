Recepty v Akci
============

React and TypeScript web app that highlights the newest recipe and keeps an archive sorted by publish date. The layout mirrors the ingredient list and step flow from the provided reference image and connects to Supabase for data.

Quick start
1. Copy `.env.example` to `.env`. The example is pre-populated with the self-hosted Supabase instance at `http://10.0.0.188:8000`; keep those values unless you run your own stack.
2. Install dependencies with `npm install` (or any Node package manager you prefer).
3. Run `npm run dev` to start the Vite development server. If env vars change, restart the server so Vite picks them up.

Highlights
- Tailwind driven split layout for ingredients and preparation steps.
- Supabase client with automatic fallback to local mock data when credentials are missing.
- Archive grid view with pagination and a dedicated detail route per slug.
- Vitest plus Testing Library already configured with sample smoke tests.

Further reading
- Open `docs/architecture.md` for structural decisions and the Supabase data flow.
- Open `docs/development.md` for workflow guidance including how to restart the Supabase Docker stack.
- Open `docs/supabase-schema.sql` for the expected database table definition and seeding hints.
- Review `AGENTS.md` for automation specific conventions and environment details.
