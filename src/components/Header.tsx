import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'px-3 py-2 text-sm font-semibold transition-colors rounded-md',
    isActive ? 'text-brand-dark bg-white shadow-sm' : 'text-slate-600 hover:text-brand-dark',
  ].join(' ');

export const Header = () => (
  <header className="bg-white/80 backdrop-blur border-b border-slate-200">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <NavLink to="/" className="text-lg font-bold text-brand-dark tracking-tight">
        Recepty v Akci
      </NavLink>
      <nav className="flex items-center gap-2">
        <NavLink to="/" className={linkClass} end>
          Nejnovější recept
        </NavLink>
        <NavLink to="/recipes" className={linkClass}>
          Archiv receptů
        </NavLink>
      </nav>
    </div>
  </header>
);
