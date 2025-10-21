import { isDateWithinWindow } from '@/lib/dateUtils';
import { mockLatestRecipe, mockRecipeArchive } from '@/lib/mockData';
import { queryKeys } from '@/lib/queryKeys';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { IngredientSection, Recipe, RecipeListItem, RecipeStep } from '@/types/recipe';

const PAGE_SIZE = 12;

export interface RecipeArchiveResponse {
  items: RecipeListItem[];
  total: number;
  page: number;
  pageSize: number;
}

type RecipeRow = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  hero_image_url?: string | null;
  created_at: string;
  updated_at?: string | null;
  start_akce?: string | null;
  konec_akce?: string | null;
  link_clickable?: string | null;
  ingredients: IngredientSection[] | null;
  steps: RecipeStep[] | null;
  meta?: Recipe['meta'];
};

const toRecipe = (row: RecipeRow): Recipe => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  summary: row.summary ?? undefined,
  heroImageUrl: row.hero_image_url ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at ?? undefined,
  promotionStartDate: row.start_akce ?? undefined,
  promotionEndDate: row.konec_akce ?? undefined,
  linkClickable: row.link_clickable ?? undefined,
  ingredients: enrichSections(row.ingredients ?? []),
  steps: normaliseSteps(row.steps ?? []),
  meta: row.meta,
});

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const enrichSections = (sections: IngredientSection[]): IngredientSection[] =>
  sections.map((section, index) => {
    const fallbackId = section.title ? slugify(section.title) : 'section-' + index;
    return {
      id: section.id ?? fallbackId,
      title: section.title,
      items: section.items ?? [],
    };
  });

const normaliseSteps = (steps: RecipeStep[]): RecipeStep[] =>
  [...steps].sort((a, b) => a.order - b.order);

const pickRandom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const selectRandomActiveRecipe = (recipes: Recipe[], referenceDate: Date): Recipe | null => {
  const activeRecipes = recipes.filter((recipe) =>
    isDateWithinWindow(referenceDate, recipe.promotionStartDate, recipe.promotionEndDate),
  );

  if (activeRecipes.length === 0) {
    return null;
  }

  return pickRandom(activeRecipes);
};

export const fetchLatestRecipe = async (): Promise<Recipe> => {
  const referenceDate = new Date();

  if (!isSupabaseConfigured || !supabase) {
    return selectRandomActiveRecipe(mockRecipeArchive, referenceDate) ?? mockLatestRecipe;
  }

  const nowIso = referenceDate.toISOString();

  const { data: activeData, error: activeError } = await supabase
    .from('recipes')
    .select('*')
    .lte('start_akce', nowIso)
    .gte('konec_akce', nowIso)
    .not('start_akce', 'is', null)
    .not('konec_akce', 'is', null)
    .returns<RecipeRow[]>();

  if (activeError) {
    console.warn('[recipesApi] Failed to load active promotion recipes', activeError);
  }

  const activeRecipe = selectRandomActiveRecipe(
    (activeData ?? []).map(toRecipe),
    referenceDate,
  );

  if (activeRecipe) {
    return activeRecipe;
  }

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<RecipeRow>();

  if (error || !data) {
    console.warn('[recipesApi] Falling back to mock latest recipe', error);
    return selectRandomActiveRecipe(mockRecipeArchive, referenceDate) ?? mockLatestRecipe;
  }

  return toRecipe(data);
};

export const fetchRecipeArchive = async (page = 1): Promise<RecipeArchiveResponse> => {
  if (!isSupabaseConfigured || !supabase) {
    return fetchRecipeArchiveFromMock(page);
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const query = supabase
    .from('recipes')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  const { data, count, error } = await query.returns<RecipeRow[]>();

  if (error || !data) {
    console.warn('[recipesApi] Falling back to mock archive', error);
    return fetchRecipeArchiveFromMock(page);
  }

  const total = typeof count === 'number' ? count : data.length;

  return {
    items: data.map((row) => {
      const recipe = toRecipe(row);
      const listItem: RecipeListItem = {
        id: recipe.id,
        title: recipe.title,
        slug: recipe.slug,
        summary: recipe.summary,
        heroImageUrl: recipe.heroImageUrl,
        createdAt: recipe.createdAt,
        promotionStartDate: recipe.promotionStartDate,
        promotionEndDate: recipe.promotionEndDate,
        linkClickable: recipe.linkClickable,
      };
      return listItem;
    }),
    total,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const fetchRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  if (!slug) {
    return null;
  }

  if (!isSupabaseConfigured || !supabase) {
    const fallback = mockRecipeArchive.find((recipe) => recipe.slug === slug);
    return fallback ?? null;
  }

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<RecipeRow>();

  if (error || !data) {
    console.warn('[recipesApi] Could not load recipe by slug', slug, error);
    const fallback = mockRecipeArchive.find((recipe) => recipe.slug === slug);
    return fallback ?? null;
  }

  return toRecipe(data);
};

const fetchRecipeArchiveFromMock = (page: number): RecipeArchiveResponse => {
  const sorted = [...mockRecipeArchive].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return {
    items: sorted,
    total: sorted.length,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const recipeQueries = {
  latest: () => ({
    queryKey: queryKeys.latestRecipe,
    queryFn: fetchLatestRecipe,
  }),
  archive: (page = 1) => ({
    queryKey: queryKeys.recipeArchive(page),
    queryFn: () => fetchRecipeArchive(page),
    keepPreviousData: true,
  }),
  bySlug: (slug: string) => ({
    queryKey: queryKeys.recipeBySlug(slug),
    queryFn: () => fetchRecipeBySlug(slug),
    enabled: Boolean(slug),
  }),
};
