const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
    fontFamiliy: {},
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#000000",
            secondaryBG: "#B5B3D4",
            border: "#EAECF0",
            cards: "#E8E8E8",
          },
        },
        dark: {
          colors: {
            background: "#212123",
            foreground: "#E8E8E8",
            border: "#383940",
            secondaryBG: "#282828",
            cards: "#282828",
          },
        },
        blue: {
          colors: {
            background: "#041A42",
            foreground: "#86a8e2",
            secondaryBG: "#143f88",
            border: "#383940",
          },
        },
      },
    }),
  ],
};

export default config;
