import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export const AppLayout = () => (
  <div className="min-h-screen bg-surface text-slate-800">
    <Header />
    <main className="mx-auto flex max-w-6xl flex-1 px-4 py-8">
      <Outlet />
    </main>
  </div>
);
