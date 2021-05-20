module.exports = {
  purge: {
    content: ['.eleventy.js', './src/**/*.html', './src/**/*.njk', './src/**/*.css'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
