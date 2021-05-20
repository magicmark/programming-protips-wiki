const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcssimport = require('postcss-import');

const plugins = [postcssimport(), tailwindcss(), autoprefixer(), cssnano()];

module.exports = {
  plugins,
};
