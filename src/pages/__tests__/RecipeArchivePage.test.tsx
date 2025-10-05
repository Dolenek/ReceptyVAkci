import { screen, waitFor } from '@testing-library/react';
import { RecipeArchivePage } from '@/pages/RecipeArchivePage';
import { renderWithProviders } from '@/test/testUtils';

describe('RecipeArchivePage', () => {
  it('lists recipes sorted by date with fallback data', async () => {
    renderWithProviders(<RecipeArchivePage />, { route: '/recipes' });

    await waitFor(() => {
      expect(screen.getByText(/Recepty podle data/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /Citrus Bundt Cake/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Smoked Paprika Goulash/i })).toBeInTheDocument();
  });
});
