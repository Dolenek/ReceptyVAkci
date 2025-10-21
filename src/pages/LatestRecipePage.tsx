import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLatestRecipe } from '@/hooks/useLatestRecipe';

export const LatestRecipePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useLatestRecipe();

  useEffect(() => {
    if (data?.slug) {
      navigate('/recipes/' + data.slug, { replace: true });
    }
  }, [data?.slug, navigate]);

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

  return <RedirectNotice />;
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

const RedirectNotice = () => (
  <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center">
    <p className="text-base font-semibold text-slate-700">Načítám překvapení…</p>
    <p className="mt-2 text-sm text-slate-500">Za malou chvilku vás přesměrujeme na vybraný recept.</p>
  </div>
);
