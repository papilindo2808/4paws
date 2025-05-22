/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bubblegum: ['Bubblegum Sans', 'cursive'],
        cabin: ['Cabin Sketch', 'cursive'],
        indie: ['Indie Flower', 'cursive'],
      },
    },
  },
  plugins: [],
} 