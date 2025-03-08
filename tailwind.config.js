/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35", // A nice orange shade that complements medical themes
          light: "#FF8C61",
          dark: "#E85A2A"
        }
      }
    },
  },
  plugins: [require("daisyui")],
}

