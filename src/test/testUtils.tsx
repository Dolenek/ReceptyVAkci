import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';

type ProvidersOptions = {
  route?: string;
  client?: QueryClient;
} & Omit<RenderOptions, 'wrapper'>;

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const Providers = ({ children, client, route = '/' }: { children: ReactNode; client?: QueryClient; route?: string }) => {
  const queryClient = client ?? createTestClient();
  return (
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

export const renderWithProviders = (ui: ReactElement, options: ProvidersOptions = {}): RenderResult => {
  const { route, client, ...renderOptions } = options;
  return render(ui, {
    wrapper: ({ children }) => (
      <Providers route={route} client={client}>
        {children}
      </Providers>
    ),
    ...renderOptions,
  });
};
