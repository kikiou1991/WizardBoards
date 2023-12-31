// tailwind.config.js
import { nextui } from "@nextui-org/react";



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
    fontFamiliy: {

    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#101828",
            svgColor: "#101828",
            secondaryBG: "#F8FBFF",
            thirty: "#F2F8FF",
            border: "#EAECF0",
            svgOnSecondary: "#263238",
            topBar: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            background: "#212123",
            foreground: "#E8E8E8",
            svgColor: "#E8E8E8",
            secondaryBG: "#282828",
            thirty: "#131315",
            border: "#383940",
            svgOnSecondary: "#585858",
            topBar: "#212123",
          },
        },

      },
    }),
  ],
}

export default config;
