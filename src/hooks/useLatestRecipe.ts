import { useQuery } from '@tanstack/react-query';
import { recipeQueries } from '@/lib/recipesApi';

export const useLatestRecipe = () => useQuery(recipeQueries.latest());
