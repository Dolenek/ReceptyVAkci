import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeCard } from '@/components/RecipeCard';
import { useRecipeArchive } from '@/hooks/useRecipeArchive';

export const RecipeArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const { data, isLoading, isError } = useRecipeArchive(page);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.pageSize));
  }, [data]);

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(1, nextPage), totalPages);
    searchParams.set('page', safePage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-slate-500">Archiv</p>
        <h1 className="text-3xl font-bold text-slate-900">Recepty podle data</h1>
        <p className="text-base text-slate-600">
          Nejnovější recepty najdete zde, řazené od nejčerstvějších po starší. Kliknutím na kartu zobrazíte detail receptu.
        </p>
      </header>

      {isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h2 className="text-lg font-semibold">Nepodařilo se načíst archiv</h2>
          <p className="mt-2 text-sm">Zkuste načíst stránku znovu později.</p>
        </div>
      ) : null}

      <section aria-busy={isLoading}>
        {isLoading && !data ? (
          <ArchiveSkeleton />
        ) : data && data.items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Zatím zde nejsou žádné recepty. Přidejte je přes API nebo Supabase Studio.
          </p>
        )}
      </section>

      {data && data.total > data.pageSize ? (
        <nav className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="rounded-full px-4 py-2 font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true">←</span>
            <span className="ml-2">Novější</span>
          </button>
          <p className="text-slate-500">
            Strana {page} z {totalPages}
          </p>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="rounded-full px-4 py-2 font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="mr-2">Starší</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      ) : null}
    </div>
  );
};

const ArchiveSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-72 animate-pulse rounded-2xl bg-slate-200" />
    ))}
  </div>
);
