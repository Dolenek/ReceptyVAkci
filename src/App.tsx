import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { LatestRecipePage } from '@/pages/LatestRecipePage';
import { RecipeArchivePage } from '@/pages/RecipeArchivePage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<LatestRecipePage />} />
      <Route path="recipes" element={<RecipeArchivePage />} />
      <Route path="recipes/:slug" element={<RecipeDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
