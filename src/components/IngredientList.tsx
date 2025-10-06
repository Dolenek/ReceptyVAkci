import { useState } from 'react';
import type { IngredientSection } from '@/types/recipe';

interface IngredientListProps {
  sections: IngredientSection[];
  servings?: number;
}

export const IngredientList = ({ sections, servings }: IngredientListProps) => {
  const [portionCount, setPortionCount] = useState<number>(servings ?? 1);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const adjustPortion = (delta: number) => {
    setPortionCount((prev) => Math.max(1, prev + delta));
  };

  const toggleItem = (key: string) => {
    setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="sticky top-24 h-fit w-full max-w-xs rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-wide text-slate-500">Ingredients</p>
        {servings ? (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-surface px-3 py-2">
            <button
              type="button"
              onClick={() => adjustPortion(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-600 shadow"
              aria-label="Decrease servings"
            >
              -
            </button>
            <div className="text-center">
              <p className="text-xs uppercase text-slate-500">Servings</p>
              <p className="text-base font-semibold text-slate-800">{portionCount}</p>
            </div>
            <button
              type="button"
              onClick={() => adjustPortion(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-600 shadow"
              aria-label="Increase servings"
            >
              +
            </button>
          </div>
        ) : null}
      </header>
      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.id}>
            {section.title ? (
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
                {section.title}
              </h3>
            ) : null}
            <ul className="space-y-2">
              {section.items.map((item, index) => {
                const key = section.id + '-' + index;
                const isChecked = Boolean(checkedMap[key]);
                const details = [item.quantity, item.notes].filter(Boolean).join(' - ');
                return (
                  <li
                    key={key}
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm shadow-sm transition-all duration-200 ${
                      isChecked ? 'bg-white/30 ring-1 ring-slate-200/70' : 'bg-white/60'
                    }`}
                  >
                    <input
                      id={key}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(key)}
                      className={`mt-1 h-4 w-4 rounded border-slate-300 text-brand-dark transition-transform duration-150 ease-out focus:ring-brand-dark ${
                        isChecked ? 'scale-90' : 'scale-100'
                      }`}
                    />
                    <label
                      htmlFor={key}
                      className={`flex-1 leading-snug transition-colors duration-200 ${
                        isChecked ? 'text-slate-400' : ''
                      }`}
                    >
                      <span
                        className={`block font-medium transition-all duration-200 ${
                          isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {item.name}
                      </span>
                      {details ? (
                        <span
                          className={`block text-xs transition-colors duration-200 ${
                            isChecked ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {details}
                        </span>
                      ) : null}
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
};
