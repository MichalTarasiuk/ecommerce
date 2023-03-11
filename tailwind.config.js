const {fontFamily} = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(218, 19%, 77%)',
        secondary: 'hsl(220, 10%, 58%)',
        active: 'hsl(223, 18%, 27%)',
        error: 'hsl(0, 39%, 53%)',
        'snow-white': 'hsl(0, 0%, 98%)',
      },
      fontFamily: {
        sans: ['var(--font-inconsolata)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
