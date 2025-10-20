AGENT HANDBOOK
==============

## file_length_and_structure

Never allow a file to exceed 500 lines.
If a file approaches 400 lines, break it up immediately.
Treat 1000 lines as unacceptable, even temporarily.
Use folders and naming conventions to keep small files logically grouped. 

## function and class size

Keep functions under 30–40 lines.
If a class is over 200 lines, assess splitting into smaller helper classes.

## naming and readability

All class, method, and variable names must be descriptive and intention-revealing.
Avoid vague names like data, info, helper, or temp. 

## documentation discipline

Whenever an agent adds a feature or significant refactor, they must document the change in `documentation.md` (or the relevant docs file) before finishing the task.

## scalability mindset 

Always code as if someone else will scale this.
Include extension points (e.g., protocol conformance, dependency injection) from day one.

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
- Supabase Docker project lives in `/root/supabase-project` on the infra machine accessed via SSH MCP. Use `docker compose up -d` there to ensure Kong/PostgREST are running.
- `docs/supabase-schema.sql` contains the `recipes` table definition plus a seed for `garden-herb-focaccia`, which should appear on the site when the stack is healthy.
- The frontend logs `[recipesApi] Falling back to mock…` when Supabase is unreachable—watch the browser console to detect regressions quickly.

handover checklist
- Document new environment variables in README and docs/development.md.
- Extend mock data in src/lib/mockData.ts whenever schema changes are introduced.
- Keep AGENTS.md and docs/architecture.md in sync if architecture decisions evolve.
