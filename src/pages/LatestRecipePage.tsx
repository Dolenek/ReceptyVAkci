import { RecipeLayout } from '@/components/RecipeLayout';
import { useLatestRecipe } from '@/hooks/useLatestRecipe';

export const LatestRecipePage = () => {
  const { data, isLoading, isError, error } = useLatestRecipe();

  if (isLoading) {
    return <RecipeSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <h2 className="text-lg font-semibold">Nepodařilo se načíst recept</h2>
        <p className="mt-2 text-sm">{error instanceof Error ? error.message : 'Zkuste to prosím znovu.'}</p>
      </div>
    );
  }

  return <RecipeLayout recipe={data} />;
};

const RecipeSkeleton = () => (
  <div className="flex w-full animate-pulse flex-col gap-8 lg:flex-row">
    <div className="hidden h-96 w-72 rounded-2xl bg-slate-200 lg:block" />
    <div className="flex-1 space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="h-10 w-3/4 rounded bg-slate-200" />
        <div className="h-6 w-2/3 rounded bg-slate-200" />
      </div>
      <div className="h-72 w-full rounded-3xl bg-slate-200" />
      <div className="space-y-3">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-20 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
