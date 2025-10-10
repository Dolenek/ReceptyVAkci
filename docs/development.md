Local Development Guide
=======================

Prerequisites
- Node.js 18 or newer together with npm or pnpm.
- Access to the self-hosted Supabase stack running via Docker on `10.0.0.188` (contact the infra owner if containers are stopped).
- Modern browser for testing such as Chrome, Edge, or Firefox.

Install Dependencies
1. Copy `.env.example` to `.env`. The sample already contains the development Supabase URL and anon key; adjust only if you spin up your own instance.
2. Install packages with your preferred manager (example: `npm install` or `pnpm install`).
3. Start the development server using `npm run dev`. Restart the server whenever you modify environment variables so Vite reloads them.

Available Scripts
- npm run dev starts Vite with hot module replacement.
- npm run build performs a type check followed by a production build.
- npm run preview serves the build output locally for smoke testing.
- npm run lint lints TypeScript and React files with ESLint and Prettier rules.
- npm run test runs Vitest in CI mode, and npm run test:watch keeps Vitest open during development.

Supabase Setup Checklist
- Ensure the Docker stack in `/root/supabase-project` is running (`docker compose up -d`). Restart it after editing `.env` in that directory so Kong/PostgREST re-read the keys.
- Confirm the `recipes` table exists with JSONB columns for `ingredients` and `steps` (see `docs/supabase-schema.sql`).
- Grant select permissions to the anon key for the `recipes` table (already configured in the shared dev stack).
- Optional: add Row Level Security policies for fine grained control when you introduce auth.

Troubleshooting
- If data does not load, verify the Supabase stack is reachable on `http://10.0.0.188:8000` and that `.env` contains the matching anon key. The UI automatically falls back to mock data but logs a warning (`[recipesApi] Falling back to mock…`).
- When Tailwind classes seem missing, restart the development server to rebuild the PostCSS pipeline.
- For stubborn test failures caused by cached queries, clear node_modules/.vite or run Vitest with the --runInBand flag for debugging.

Live data checklist
- API layer lives in `src/lib/recipesApi.ts`; every fetch first checks `isSupabaseConfigured`. Missing env vars or network failures trigger the mock fallback.
- Query keys reside in `src/lib/queryKeys.ts` and are referenced by hooks under `src/hooks/` such as `useLatestRecipe`, `useRecipeArchive`, and `useRecipeBySlug`.
- UI entry points: `src/pages/LatestRecipePage.tsx` renders the latest recipe via `RecipeLayout`, while `src/pages/RecipeArchivePage.tsx` and `src/pages/RecipeDetailPage.tsx` surface the archive grid and slug-based details.
- Use `curl "http://10.0.0.188:8000/rest/v1/recipes?select=title,slug" -H "apikey: $VITE_SUPABASE_ANON_KEY"` to confirm the Supabase REST layer responds before debugging the frontend.
