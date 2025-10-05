import { useState } from 'react';
import type { RecipeStep } from '@/types/recipe';

interface RecipeStepsProps {
  steps: RecipeStep[];
}

export const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const toggleStep = (order: number) => {
    setCompleted((prev) => ({ ...prev, [order]: !prev[order] }));
  };

  return (
    <ol className="space-y-4">
      {steps.map((step) => (
        <li key={step.order} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light font-semibold text-brand-dark">
              {step.order}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-base leading-relaxed text-slate-800">{step.text}</p>
              {step.resource ? (
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <span aria-hidden="true">ℹ</span>
                  <span>{step.resource.label}</span>
                </p>
              ) : null}
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-500">
              <input
                type="checkbox"
                checked={Boolean(completed[step.order])}
                onChange={() => toggleStep(step.order)}
                className="h-4 w-4 rounded border-slate-300 text-brand-dark focus:ring-brand-dark"
              />
              Hotovo
            </label>
          </div>
        </li>
      ))}
    </ol>
  );
};
