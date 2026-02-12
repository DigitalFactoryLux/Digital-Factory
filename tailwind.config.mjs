/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f0fdfa',
          100: '#e0f7f1',
          200: '#b2f0e1',
          300: '#7de8cf',
          400: '#4dd9b4',
          500: '#2cc295',
          600: '#20a37e',
        },
        cyan: {
          light: '#d4f7f0',
          DEFAULT: '#5ce0c8',
          dark: '#2fb8a0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
