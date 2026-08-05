/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#edfcf2',
          100: '#d5f6e0',
          200: '#aeedc5',
          300: '#6fdf9a',
          400: '#3ecd72',
          500: '#22b558',
          800: '#15803d',
          900: '#14532d',
        },
        harvest: {
          400: '#f3be53',
          500: '#e5a93c',
          600: '#c78a22',
        },
        terracotta: {
          500: '#c86d4b',
          600: '#a85031',
        },
        earth: {
          100: '#f8f7f2',
          200: '#ebe8dc',
          800: '#2c2923',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
