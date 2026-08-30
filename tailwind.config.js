/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        star: {
          blue: '#1769AA',
          deepBlue: '#0B2E4F',
          darkNavy: '#071E34',
          green: '#2E9B4B',
          deepGreen: '#1E7E34',
          white: '#FFFFFF',
          offWhite: '#F7F8F6',
          lightGrey: '#EEF1EF',
          darkText: '#111111',
          mutedText: '#4A5568',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
