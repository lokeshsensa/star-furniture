/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        ivory: {
          DEFAULT: '#FAF6F0',
          soft: '#F5EFE6',
        },
        walnut: {
          DEFAULT: '#2C221E',
          deep: '#1C1512',
          light: '#5A4A41',
          muted: '#8C7A6B',
        },
        champagne: {
          DEFAULT: '#C5A880',
          glow: '#F5E8C7',
        },
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}
