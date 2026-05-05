/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        ceramicaLight: {
          "primary": "#1A1A1A",
          "secondary": "#757575",
          "accent": "#C5A059",
          "neutral": "#F9F9F9",
          "base-100": "#F9F9F9",
          "base-content": "#1A1A1A",
        },
      },
      {
        ceramicaDark: {
          "primary": "#F9F9F9",
          "secondary": "#757575",
          "accent": "#C5A059",
          "neutral": "#0D0D0D",
          "base-100": "#0D0D0D",
          "base-content": "#F9F9F9",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
