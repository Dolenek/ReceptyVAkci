import { IngredientList } from '@/components/IngredientList';
import { RecipeSteps } from '@/components/RecipeSteps';
import { formatPromotionWindowLabel } from '@/lib/dateUtils';
import type { Recipe } from '@/types/recipe';

interface RecipeLayoutProps {
  recipe: Recipe;
}

export const RecipeLayout = ({ recipe }: RecipeLayoutProps) => {
  const promotionWindowLabel =
    formatPromotionWindowLabel({
      start: recipe.promotionStartDate,
      end: recipe.promotionEndDate,
      fallback: recipe.createdAt,
    }) ?? '–';

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row">
      <div className="lg:w-72 xl:w-80">
        <IngredientList sections={recipe.ingredients} />
      </div>
      <article className="flex-1 space-y-6">
        <header className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-wide text-slate-500">
                {promotionWindowLabel}
              </p>
              {recipe.linkClickable ? (
                <a
                  href={recipe.linkClickable}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold uppercase tracking-wide text-brand-dark hover:underline"
                >
                  letak
                </a>
              ) : null}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{recipe.title}</h1>
            {recipe.summary ? (
              <p className="text-lg text-slate-600">{recipe.summary}</p>
            ) : null}
          </div>
          {recipe.heroImageUrl ? (
            <div className="mx-auto flex w-fit justify-center overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
              <img
                src={recipe.heroImageUrl}
                alt={recipe.title}
                className="max-h-80 max-w-full object-contain"
              />
            </div>
          ) : null}
          {recipe.meta ? <RecipeMeta meta={recipe.meta} /> : null}
        </header>
        <section aria-label="Preparation steps">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Postup přípravy</h2>
          <RecipeSteps steps={recipe.steps} />
        </section>
      </article>
    </div>
  );
};

interface RecipeMetaProps {
  meta: NonNullable<Recipe['meta']>;
}

const RecipeMeta = ({ meta }: RecipeMetaProps) => {
  const items = [
    meta.prepTimeMinutes ? { label: 'Příprava', value: meta.prepTimeMinutes + ' min' } : null,
    meta.cookTimeMinutes ? { label: 'Vaření', value: meta.cookTimeMinutes + ' min' } : null,
    meta.totalTimeMinutes ? { label: 'Celkem', value: meta.totalTimeMinutes + ' min' } : null,
    meta.servings ? { label: 'Porce', value: meta.servings.toString() } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  if (items.length === 0) {
    return null;
  }

  return (
    <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
          <dd className="text-base text-slate-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};
