const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcssimport = require('postcss-import');

const plugins = [postcssimport(), tailwindcss(), autoprefixer()];

if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnano());
}

module.exports = {
  plugins,
};
