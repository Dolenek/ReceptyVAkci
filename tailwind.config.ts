import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f59e0b',
          dark: '#b45309',
          light: '#fbbf24',
        },
        surface: '#f8f5f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
