/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bme-900": "#111111",
        "bme-800": "#333333",
        "bme-700": "#555555",
        "bme-600": "#999999",
        "bme-bg": "	#6699CC",
      },
    },
    fontFamily: {
      "bme-fontFamily": ["Fredoka", "sans-serif"],
    },
    screens: {
      xs: "0px",
      md: "768px",
      xl: "1060px",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
