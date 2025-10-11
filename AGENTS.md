AGENT HANDBOOK
==============

Purpose
-------
This document gives quick context for automation agents who need to extend or maintain the Recepty v Akci frontend.

Project Snapshot
- Framework: React 18 with Vite and TypeScript located under src/.
- Styling: Tailwind CSS, theme surface colors defined in tailwind.config.ts.
- Data: Supabase via src/lib/supabaseClient.ts, with mock fallbacks for offline work. Dev stack lives on `http://10.0.0.188:8000`.
- Routing: React Router with pages in src/pages/ and layout components in src/components/.
- Testing: Vitest and Testing Library; helper renderer lives in src/test/testUtils.tsx.

Golden Rules
1. Keep env safe: never commit secrets. Use .env.example as the template.
2. Preserve mock data behaviour so the UI works even when Supabase is unavailable.
3. Update query keys in src/lib/queryKeys.ts whenever new TanStack Query hooks are added.
4. Prefer ASCII in source unless there is a localisation requirement (Czech copy is intentional here).
5. When adding styles, favour Tailwind utilities over custom CSS to keep design consistent.

Workflow Tips
- Run npm run lint before shipping changes to maintain consistent formatting and catch regressions.
- Use npm run test for smoke coverage; add component level tests near the relevant page directory.
- New API calls should be centralised in src/lib/recipesApi.ts with Zod validation if payloads grow.
- For visual tweaks, inspect shared components like RecipeLayout and IngredientList so styles stay aligned.
- Restart `npm run dev` after editing `.env` so Vite reloads Supabase credentials. If keys in `/root/supabase-project/.env` change, run `docker compose down && docker compose up -d` on the host to propagate them.
- Frontend data pipeline: `src/lib/recipesApi.ts` routes all recipe fetches, falling back to `src/lib/mockData.ts` when `isSupabaseConfigured` is false. Hooks in `src/hooks` expose query configs used by pages under `src/pages`.

Supabase Ops Cheatsheet
- `.env.example` is pre-filled with the anon key `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYwMTI1ODQ2LCJleHAiOjIwNzU0ODU4NDZ9.teOAMH_LIRvjyjr2kzPnb1fX2StytrQCPwtD1aPKbro`; copy it to `.env` for local runs.
- Supabase Docker project lives in `/root/supabase-project` on the infra machine accessed via SSH MCP (`10.0.0.188`). Use `docker compose up -d` there to ensure Kong/PostgREST are running.
- `docs/supabase-schema.sql` contains the `recipes` table definition plus a seed for `garden-herb-focaccia`, which should appear on the site when the stack is healthy.
- The frontend logs `[recipesApi] Falling back to mock…` when Supabase is unreachable—watch the browser console to detect regressions quickly.

handover checklist
- Document new environment variables in README and docs/development.md.
- Extend mock data in src/lib/mockData.ts whenever schema changes are introduced.
- Keep AGENTS.md and docs/architecture.md in sync if architecture decisions evolve.
