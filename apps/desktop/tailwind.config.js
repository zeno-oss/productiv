/** @type {import('tailwindcss').Config} */

const colors = require("../../colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Raleway", "sans-serif"],
    },
    extend: {
      colors,
    },
  },
  plugins: [],
};
