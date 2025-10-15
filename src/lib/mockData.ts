import { Recipe } from '@/types/recipe';

const MOCK_CREATED_AT = '2024-03-15T12:00:00Z';

export const mockLatestRecipe: Recipe = {
  id: 'mock-recipe-1',
  title: 'Citrus Bundt Cake',
  slug: 'citrus-bundt-cake',
  summary: 'Bright and fluffy bundt cake with hints of lemon and orange zest.',
  createdAt: MOCK_CREATED_AT,
  linkClickable: 'https://example.com/mock-letak-citrus-bundt-cake',
  ingredients: [
    {
      id: 'batter',
      title: 'Batter',
      items: [
        { name: 'Granulated sugar', quantity: '1 cup' },
        { name: 'Neutral oil', quantity: '1/2 cup' },
        { name: 'Eggs', quantity: '2 large' },
        { name: 'All-purpose flour', quantity: '2 cups' },
        { name: 'Whole milk', quantity: '1 cup' },
        { name: 'Baking powder', quantity: '1 packet' },
        { name: 'Vanilla sugar', quantity: '1 packet' },
        { name: 'Citrus zest', quantity: '1 lemon', notes: 'Finely grated' },
      ],
    },
    {
      id: 'finish',
      title: 'For greasing the pan',
      items: [
        { name: 'Soft butter', quantity: '2 tbsp' },
        { name: 'Breadcrumbs or semolina', quantity: '3 tbsp' },
      ],
    },
  ],
  steps: [
    {
      order: 1,
      text: 'Brush the bundt pan thoroughly with butter and dust with breadcrumbs so the cake releases cleanly.',
    },
    {
      order: 2,
      text: 'Whisk eggs with sugar until pale and airy. Add oil and milk, then fold in sifted flour with baking powder, vanilla sugar, and citrus zest.',
    },
    {
      order: 3,
      text: 'Pour batter into the prepared pan and bake at 170°C for 45 to 50 minutes until golden and set.',
    },
    {
      order: 4,
      text: 'Cool in the pan for 10 minutes, then invert onto a rack. Dust with powdered sugar to serve.',
    },
  ],
  meta: {
    servings: 12,
    totalTimeMinutes: 70,
  },
};

export const mockRecipeArchive: Recipe[] = [
  mockLatestRecipe,
  {
    id: 'mock-recipe-2',
    title: 'Smoked Paprika Goulash',
    slug: 'smoked-paprika-goulash',
    summary: 'Hearty beef goulash with layers of smoked paprika and caraway.',
    createdAt: '2024-02-28T09:30:00Z',
    linkClickable: 'https://example.com/mock-letak-smoked-paprika-goulash',
    ingredients: [
      {
        id: 'main',
        items: [
          { name: 'Beef chuck', quantity: '800 g', notes: 'Cut into cubes' },
          { name: 'Yellow onions', quantity: '2 large', notes: 'Thinly sliced' },
          { name: 'Smoked paprika', quantity: '2 tbsp' },
          { name: 'Tomato paste', quantity: '2 tbsp' },
          { name: 'Beef stock', quantity: '3 cups' },
          { name: 'Bay leaves', quantity: '2' },
          { name: 'Caraway seeds', quantity: '1 tsp' },
        ],
      },
    ],
    steps: [
      {
        order: 1,
        text: 'Brown beef cubes in batches, set aside, then caramelize onions in the same pot.',
      },
      {
        order: 2,
        text: 'Toast paprika and caraway with onions, stir in tomato paste, return beef, and cover with stock.',
      },
      {
        order: 3,
        text: 'Simmer gently for 90 minutes until beef is tender and sauce is silky.',
      },
    ],
  },
];
