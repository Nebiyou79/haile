import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enables dark mode class utility (can also use 'media' if you prefer)
  theme: {
    extend: {
      colors: {
        primary: 'var(--foreground)',
        secondary: 'var(--background)',
      },
    },
  },
  plugins: [],
};

export default config;
