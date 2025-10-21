import { useState } from 'react';
import type { IngredientSection } from '@/types/recipe';

interface IngredientListProps {
  sections: IngredientSection[];
}

type IngredientItem = IngredientSection['items'][number];

export const IngredientList = ({ sections }: IngredientListProps) => {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="mx-auto h-fit w-full max-w-xs rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur lg:sticky lg:top-24 lg:mx-0">
      <header className="mb-6 text-center">
        <p className="text-lg font-bold uppercase tracking-wide text-slate-600">Ingredience</p>
      </header>
      <div className="space-y-6">
        {sections.map((section) => (
          <IngredientSectionView
            key={section.id}
            section={section}
            checkedMap={checkedMap}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </aside>
  );
};

interface IngredientSectionViewProps {
  section: IngredientSection;
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
}

const IngredientSectionView = ({ section, checkedMap, onToggle }: IngredientSectionViewProps) => (
  <section>
    {section.title ? (
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
        {section.title}
      </h3>
    ) : null}
    <ul className="space-y-2">
      {section.items.map((item, index) => {
        const key = section.id + '-' + index;
        return (
          <IngredientRow
            key={key}
            item={item}
            rowKey={key}
            isChecked={Boolean(checkedMap[key])}
            onToggle={onToggle}
          />
        );
      })}
    </ul>
  </section>
);

interface IngredientRowProps {
  item: IngredientItem;
  rowKey: string;
  isChecked: boolean;
  onToggle: (key: string) => void;
}

const IngredientRow = ({ item, rowKey, isChecked, onToggle }: IngredientRowProps) => {
  const details = [item.quantity, item.notes].filter(Boolean).join(' - ');

  return (
    <li>
      <label
        className={`flex w-full cursor-pointer select-none items-start gap-2 rounded-lg px-3 py-2 text-sm shadow-sm transition-all duration-200 ${
          isChecked ? 'bg-white/30 ring-1 ring-slate-200/70' : 'bg-white/60'
        }`}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => {
            event.stopPropagation();
            onToggle(rowKey);
          }}
          onClick={(event) => event.stopPropagation()}
          className={`mt-1 h-4 w-4 rounded border-slate-300 text-brand-dark transition-transform duration-150 ease-out focus:ring-brand-dark ${
            isChecked ? 'scale-90' : 'scale-100'
          }`}
        />
        <span className={`flex-1 leading-snug transition-colors duration-200 ${isChecked ? 'text-slate-400' : ''}`}>
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
        </span>
      </label>
    </li>
  );
};
