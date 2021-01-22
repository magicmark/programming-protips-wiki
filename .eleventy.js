const util = require('util');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy('./src/css/styles.css');
  eleventyConfig.addPassthroughCopy('./src/css/dracula.css');
  eleventyConfig.addPassthroughCopy('./src/img');

  eleventyConfig.addCollection('protips', (collectionApi) => {
    // https://github.com/11ty/eleventy/issues/411#issuecomment-463146701
    return collectionApi.getFilteredByGlob('./src/protips/*.md').sort((a, b) => {
      if (a.data.page.fileSlug > b.data.page.fileSlug) return 1;
      else if (a.data.page.fileSlug < b.data.page.fileSlug) return -1;
      else return 0;
    });
  });

  eleventyConfig.addFilter('inspect', function (value) {
    return util.inspect(value);
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
