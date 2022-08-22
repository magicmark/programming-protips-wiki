module.exports = {
  content: ['.eleventy.js', './src/**/*.html', './src/**/*.njk', './src/**/*.css'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
