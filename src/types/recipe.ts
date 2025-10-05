export interface IngredientItem {
  name: string;
  quantity?: string;
  notes?: string;
}

export interface IngredientSection {
  id: string;
  title?: string;
  items: IngredientItem[];
}

export interface RecipeStepResource {
  label: string;
  url: string;
}

export interface RecipeStep {
  order: number;
  text: string;
  resource?: RecipeStepResource;
}

export interface RecipeSummary {
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  totalTimeMinutes?: number;
  servings?: number;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  heroImageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  ingredients: IngredientSection[];
  steps: RecipeStep[];
  meta?: RecipeSummary;
}

export type RecipeListItem = Pick<Recipe, 'id' | 'title' | 'slug' | 'createdAt' | 'summary' | 'heroImageUrl'>;
