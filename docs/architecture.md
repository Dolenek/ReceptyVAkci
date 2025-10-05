Architecture Overview
=====================

Stack Summary
- UI built with React 18 and TypeScript, bootstrapped via Vite.
- Data fetching handled by TanStack Query with Zod validation entry points ready in the API layer.
- Styling powered by Tailwind CSS with a light surface theme inspired by the provided mockup.
- Routing provided by React Router with BrowserRouter, offering landing, archive, and detail views.
- Supabase client wrapper centralises configuration and falls back to local mock data when env vars are missing.
Routes
- Root path shows the latest recipe with split layout for ingredients and steps.
- Recipes path lists all recipes sorted by created date with pagination helpers.
- Recipes detail path loads any recipe by slug while reusing the same layout component.
- Non matching URLs fall back to a not found page with navigation shortcuts.

Data Flow
- Hooks in src/hooks wrap shared TanStack Query configs from src/lib/recipesApi.
- When Supabase env vars are present the client fetches live data from the recipes table.
- Without Supabase the API layer returns structured mock data so pages remain functional offline.
- Query keys are defined in src/lib/queryKeys to keep cache keys consistent across hooks.
Supabase Expectations
- Database schema uses a recipes table with columns id, title, slug, summary, hero_image_url, created_at, updated_at, meta, ingredients, steps.
- Ingredients and steps are stored as jsonb arrays that mirror the TypeScript types defined in src/types/recipe.ts.
- Slug must be unique to guarantee stable lookups for the detail route and API caching.

Component Composition
- AppLayout renders the header and outlet shell with responsive container constraints.
- RecipeLayout pairs IngredientList and RecipeSteps to reproduce the provided UI reference.
- IngredientList manages local checkbox state and optional serving multiplier for quick shopping prep.
- RecipeCard summarises a recipe inside the archive grid and links to the detail route.

Testing Strategy
- Vitest with Testing Library renders pages using renderWithProviders helper under src/test/testUtils.tsx.
- Smoke tests cover landing and archive pages to ensure mock fallback keeps rendering stable when backend is offline.
