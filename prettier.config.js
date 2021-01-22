module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  overrides: [
    {
      files: '*.njk',
      options: { parser: 'html' },
    },
  ],
};
