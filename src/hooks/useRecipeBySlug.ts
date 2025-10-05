import { useQuery } from '@tanstack/react-query';
import { recipeQueries } from '@/lib/recipesApi';

export const useRecipeBySlug = (slug: string) => {
  const queryConfig = recipeQueries.bySlug(slug);
  return useQuery({ ...queryConfig, enabled: Boolean(slug) });
};
