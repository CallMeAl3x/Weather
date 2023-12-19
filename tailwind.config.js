/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue':'#4E80EE',
        'gray': "#20293A",
        'almost-white': '#F2F5F9',
        'almost-black': '#030616',
        'light-gray': '#97A3B6',
      }
    },
  },
  plugins: [],
}