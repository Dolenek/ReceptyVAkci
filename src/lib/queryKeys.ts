export const queryKeys = {
  latestRecipe: ['recipes', 'latest'] as const,
  recipeArchive: (page: number) => ['recipes', 'archive', page] as const,
  recipeBySlug: (slug: string) => ['recipes', 'detail', slug] as const,
};
