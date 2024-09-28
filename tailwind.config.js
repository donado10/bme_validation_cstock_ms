/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bme-900": "#003C43",
        "bme-800": "#135D66",
        "bme-700": "#77B0AA",
        "bme-600": "#E3FEF7",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
