module.exports = {
  trailingComma: 'all',
  printWidth: 120,
  singleQuote: true,
  overrides: [
    {
      files: '*.njk',
      options: { parser: 'html' },
    },
  ],
};
