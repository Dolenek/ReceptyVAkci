-- Supabase schema for Kuchar v Akci recipes
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  hero_image_url text,
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  meta jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- example of inserting a recipe (replace json payloads via Supabase Studio or API)
-- insert into public.recipes (title, slug, summary, ingredients, steps) values (...);
