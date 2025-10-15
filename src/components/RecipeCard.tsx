import { Link } from 'react-router-dom';
import type { RecipeListItem } from '@/types/recipe';

interface RecipeCardProps {
  recipe: RecipeListItem;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    {recipe.heroImageUrl ? (
      <img
        src={recipe.heroImageUrl}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />
    ) : null}
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </p>
          {recipe.linkClickable ? (
            <a
              href={recipe.linkClickable}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide text-brand-dark hover:underline"
            >
              letak
            </a>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{recipe.title}</h3>
        {recipe.summary ? <p className="text-sm text-slate-600">{recipe.summary}</p> : null}
      </div>
      <Link
        to={"/recipes/" + recipe.slug}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline"
      >
        Zobrazit recept
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </div>
  </article>
);
