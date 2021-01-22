module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.njk'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
