import { screen, waitFor } from '@testing-library/react';
import { LatestRecipePage } from '@/pages/LatestRecipePage';
import { renderWithProviders } from '@/test/testUtils';

describe('LatestRecipePage', () => {
  it('renders the recipe title from the mocked API', async () => {
    renderWithProviders(<LatestRecipePage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: /Citrus Bundt Cake/i }),
    ).toBeInTheDocument();
  });
});
