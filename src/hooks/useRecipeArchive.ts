import { useQuery } from '@tanstack/react-query';
import { recipeQueries } from '@/lib/recipesApi';

export const useRecipeArchive = (page = 1) => useQuery(recipeQueries.archive(page));
