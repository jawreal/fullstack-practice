/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], 
      },
      zIndex: {
        '1000': 1000, 
        '1010': 1010
      }, 
      transitionDelay: {
        '3000': '3000ms',
      }, 
    },
  },
  plugins: [],
}