import { IngredientList } from '@/components/IngredientList';
import { RecipeSteps } from '@/components/RecipeSteps';
import type { Recipe } from '@/types/recipe';

interface RecipeLayoutProps {
  recipe: Recipe;
}

export const RecipeLayout = ({ recipe }: RecipeLayoutProps) => (
  <div className="flex w-full flex-col gap-8 lg:flex-row">
    <div className="lg:w-72 xl:w-80">
      <IngredientList sections={recipe.ingredients} servings={recipe.meta?.servings} />
    </div>
    <article className="flex-1 space-y-6">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{recipe.title}</h1>
          {recipe.summary ? (
            <p className="text-lg text-slate-600">{recipe.summary}</p>
          ) : null}
        </div>
        {recipe.heroImageUrl ? (
          <img
            src={recipe.heroImageUrl}
            alt={recipe.title}
            className="h-72 w-full rounded-3xl object-cover shadow-lg"
          />
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
