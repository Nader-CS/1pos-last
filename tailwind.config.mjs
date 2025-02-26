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
        montserrat: ['Montserrat'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
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
