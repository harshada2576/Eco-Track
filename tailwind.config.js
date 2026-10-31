/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core editorial design system tokens
        'deep-forest': '#183D32',
        'moss': '#315B45',
        'muted-sage': '#A6B49A',
        'warm-paper': '#F3F0E7',
        'soft-cream': '#FAF9F5',
        'light-sage': '#E3E7DD',
        'terracotta': '#B76E4B',
        'charcoal': '#292D29',
        'muted-text': '#74786F',
        'subtle-border': '#DCDDD3',

        forest: {
          50: '#f4f6f4',
          100: '#e5eae6',
          200: '#ccd8cf',
          300: '#a6b49a',
          400: '#6d8a77',
          500: '#487158',
          600: '#315B45', // Moss Green
          700: '#274b39',
          800: '#1e3d2f',
          900: '#183D32', // Deep Forest
          950: '#0e241d',
        },
        sage: {
          50: '#FAF9F5', // Soft cream
          100: '#F3F0E7', // Warm paper
          200: '#E3E7DD', // Light sage surface
          300: '#DCDDD3', // Subtle border
          400: '#A6B49A', // Muted sage
          500: '#7d8e6f',
          600: '#627156',
          700: '#4e5a45',
          800: '#373e32',
          900: '#292D29', // Charcoal
        },
        offwhite: {
          50: '#FAF9F5', // Soft Cream
          100: '#F3F0E7', // Warm Paper
          200: '#EAE6DB',
          300: '#E3E7DD',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'subtle': '6px',
        'card': '10px',
        'panel': '14px',
      }
    },
  },
  plugins: [],
}
