/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rethink: ['"Rethink Sans"', "sans-serif"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        "brand-red": "#BC2032",
        "brand-green": "#368841",
        "brand-brown": "#995524",
        "brand-blue": "#255099",
        "brand-pink": "#FFC4CB",
        "brand-light-green": "#B2FFBD",
        "brand-light-orange": "#FFE9D9",
        "brand-light-border-pink": "#FFF8F7",
        "brand-light-border-green": "#F2FFF4",
        "brand-text-color": "#1A1A1A",
        "brand-light-text-color": "#524342",
        "brand-title-color": "#262437",
      },
    },
  },
  plugins: [],
};
