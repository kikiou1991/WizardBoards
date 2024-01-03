const {nextui} = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */

const config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  theme: {
    extend: {},
    fontFamiliy: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#101828',
            secondaryBg: '#FAFAFA',
            border: '#EAECF0',
          },
        },
        dark: {
          colors: {
            background: '#212123',
            foreground: '#E8E8E8',
            border: '#383940',
            secondaryBG: '#282828',
          },
        },
      },
    }),
  ],
};

export default config;
