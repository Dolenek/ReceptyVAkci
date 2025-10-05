import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center">
    <p className="text-sm uppercase tracking-wide text-slate-400">404</p>
    <h1 className="text-3xl font-bold text-slate-900">Tato stránka neexistuje</h1>
    <p className="text-sm text-slate-600">
      Omlouváme se, ale hledaná stránka nebyla nalezena. Vraťte se na hlavní stránku nebo do archivu receptů.
    </p>
    <div className="flex flex-col gap-2 sm:flex-row">
      <Link to="/" className="rounded-full bg-brand-dark px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand">
        Nejnovější recept
      </Link>
      <Link to="/recipes" className="rounded-full border border-brand-dark px-5 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light/30">
        Archiv receptů
      </Link>
    </div>
  </div>
);
