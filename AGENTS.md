AGENT HANDBOOK
==============

Purpose
-------
This document gives quick context for automation agents who need to extend or maintain the Kuchar v Akci frontend.

Project Snapshot
- Framework: React 18 with Vite and TypeScript located under src/.
- Styling: Tailwind CSS, theme surface colors defined in tailwind.config.ts.
- Data: Supabase via src/lib/supabaseClient.ts, with mock fallbacks for offline work.
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

handover checklist
- Document new environment variables in README and docs/development.md.
- Extend mock data in src/lib/mockData.ts whenever schema changes are introduced.
- Keep AGENTS.md and docs/architecture.md in sync if architecture decisions evolve.
