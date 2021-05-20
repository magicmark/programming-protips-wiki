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

  const markdownIt = require('markdown-it');
  const markdownItContainer = require('markdown-it-container');
  const markdownLib = markdownIt({
    html: true,
  }).use(markdownItContainer, 'note', {
    render: (tokens, idx) => {
      console.log(tokens[idx])
      if (tokens[idx].type === 'container_note_open') {
        const suffix = tokens[idx].info.replace(/\s*note\s*/, '');
        const heading = suffix === '' ? '📝 Note' : suffix;
  
        return `
          <div class="note border-l-4 border-yellow-200 rounded-lg bg-yellow-100 p-4">
            <div class="text-gray-700 text-sm font-semibold -mb-2 pb-3 border-yellow-400 border-b">${heading}</div>
        `;
      } else {
        return '</div>';
      }
    },
  });

  eleventyConfig.setLibrary('md', markdownLib);

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
