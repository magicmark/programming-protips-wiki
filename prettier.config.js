module.exports = {
  trailingComma: 'all',
  singleQuote: true,
  overrides: [
    {
      files: '*.njk',
      options: { parser: 'html' },
    },
  ],
};
