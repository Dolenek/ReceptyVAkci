import { Link, useParams } from 'react-router-dom';
import { RecipeLayout } from '@/components/RecipeLayout';
import { useRecipeBySlug } from '@/hooks/useRecipeBySlug';

export const RecipeDetailPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useRecipeBySlug(slug);

  if (!slug) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700">
        <p className="font-semibold">Chybí identifikátor receptu.</p>
        <p className="mt-2 text-sm">Vyberte recept z archivu.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Načítám recept…</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h2 className="text-lg font-semibold">Recept se nepodařilo najít</h2>
          <p className="mt-2 text-sm">Zkontrolujte adresu nebo vyberte jiný recept.</p>
        </div>
        <Link to="/recipes" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
          <span aria-hidden="true">←</span>
          <span>Zpět do archivu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Link to="/recipes" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline">
        <span aria-hidden="true">←</span>
        <span>Zpět do archivu</span>
      </Link>
      <RecipeLayout recipe={data} />
    </div>
  );
};
