/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          sans: ["Montserrat_400Regular", "Arial", "sans-serif"],
          // serif: ["montserrat-regular", "Georgia", "serif"],
          // mono: ["montserrat-regular", "Courier New", "monospace"],
          // "sans-bold": ["montserrat-bold", "Arial", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
