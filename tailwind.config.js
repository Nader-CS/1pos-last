const {fontSizes} = require('./src/utils/fontSizes.js');
const {colors} = require('./src/utils/colors.js');
const {nextui} = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ...colors,
      },
      fontSize: fontSizes,
      animation: {
        continuousFadeInOut: 'continuousFadeInOut 2s infinite forwards',
      },
      keyframes: {
        continuousFadeInOut: {
          '0%, 100%': {opacity: '0.2'},
          '50%': {opacity: '1'},
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
