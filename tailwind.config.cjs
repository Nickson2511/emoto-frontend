/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316", //orange(brand color)
        secondary: "#1f2937",// dark gray
        accent: "#e5e7eb" //light gray
      }
    },
  },
  plugins: [],
}
