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
-- insert into public.recipes (title, slug, summary, hero_image_url, ingredients, steps, meta) values (...);

-- seeded development recipe for reference
insert into public.recipes (id, title, slug, summary, hero_image_url, created_at, ingredients, steps, meta)
values (
  '21dfec83-1d85-4f23-b872-5f05a8b1c5c1',
  'Garden Herb Focaccia',
  'garden-herb-focaccia',
  'Airy focaccia topped with rosemary, thyme, and flaked salt.',
  'https://images.unsplash.com/photo-1604908177729-88468b23f888?auto=format&fit=crop&w=1200&q=80',
  '2024-07-05T10:00:00Z',
  '[
    {
      "id": "dough",
      "title": "Těsto",
      "items": [
        {"name": "Hladká mouka", "quantity": "500 g"},
        {"name": "Vlažná voda", "quantity": "360 ml"},
        {"name": "Sušené droždí", "quantity": "7 g"},
        {"name": "Extra panenský olivový olej", "quantity": "60 ml"},
        {"name": "Sůl", "quantity": "2 lžičky"}
      ]
    },
    {
      "id": "topping",
      "title": "Dokončení",
      "items": [
        {"name": "Olivový olej", "quantity": "2 lžíce"},
        {"name": "Čerstvý rozmarýn", "quantity": "2 snítky", "notes": "Nadrobno nasekaný"},
        {"name": "Čerstvý tymián", "quantity": "2 snítky"},
        {"name": "Vločková sůl", "quantity": "podle chuti"}
      ]
    }
  ]'::jsonb,
  '[
    {"order": 1, "text": "Smíchejte vodu s droždím a lžící mouky, nechte 5 minut stát."},
    {"order": 2, "text": "V míse promíchejte mouku se solí, přidejte kvásek a olej a vypracujte hladké těsto."},
    {"order": 3, "text": "Těsto dejte do mísy vymazané olejem, přikryjte a nechte kynout 1 hodinu."},
    {"order": 4, "text": "Přesuňte těsto na plech, prsty vytvořte důlky, pokapejte olejem a posypte bylinkami."},
    {"order": 5, "text": "Pečte při 220 °C 20 minut dozlatova a podávejte teplé."}
  ]'::jsonb,
  '{"prepTimeMinutes": 20, "totalTimeMinutes": 80, "servings": 8}'::jsonb
)
on conflict (id) do nothing;
