const {colors} = require('./src/lib/colors');
const {fontSize} = require('./src/lib/fontSize');

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize,
      fontFamily: {
        regular: ['regular', 'sans-serif'],
        medium: ['medium', 'sans-serif'],
        bold: ['bold', 'sans-serif'],
      },
      colors: colors,
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
  plugins: [require('tailwindcss-animate')],
};
