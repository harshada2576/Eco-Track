/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f4',
          100: '#e1efe4',
          200: '#c5e0cd',
          300: '#9cc9ab',
          400: '#6fa983',
          500: '#4c8c63',
          600: '#39704d',
          700: '#2e593f',
          800: '#274734',
          900: '#1e3829',
          950: '#0d1f16',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e9ece4',
          200: '#d5dbce',
          300: '#b8c3ad',
          400: '#99a88b',
          500: '#7d8e6f',
          600: '#627156',
          700: '#4e5a45',
          800: '#404939',
          900: '#373e32',
        },
        offwhite: {
          50: '#fdfdfb',
          100: '#fafaf6',
          200: '#f4f5ed',
          300: '#ebeee0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
