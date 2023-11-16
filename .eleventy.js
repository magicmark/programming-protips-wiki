const util = require("util");
const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("./src/css/styles.css");
  eleventyConfig.addPassthroughCopy("./src/css/dracula.css");
  eleventyConfig.addPassthroughCopy("./src/img");

  eleventyConfig.addCollection("protips", (collectionApi) => {
    // https://github.com/11ty/eleventy/issues/411#issuecomment-463146701
    return collectionApi
      .getFilteredByGlob("./src/protips/*.md")
      .sort((a, b) => {
        if (a.data.page.fileSlug > b.data.page.fileSlug) return 1;
        else if (a.data.page.fileSlug < b.data.page.fileSlug) return -1;
        else return 0;
      });
  });

  eleventyConfig.addFilter("inspect", function (value) {
    return util.inspect(value);
  });

  const markdownLib = markdownIt({
    html: true,
  })
    .use(markdownItContainer, "note", {
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const suffix = tokens[idx].info.replace(/\s*note\s*/, "");
          const heading = suffix === "" ? "📝 Note" : suffix;

          return /* HTML */ `
            <div
              class="note rounded-lg bg-yellow-100"
            >
              <div
                class="text-gray-600 text-sm font-bold pt-3 pl-3"
              >
                ${heading}
              </div>
              <div class="px-7 pb-2">
          `;
        } else {
          return "</div></div>";
        }
      },
    })
    .use(markdownItContainer, "good", {
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const override = tokens[idx].info.replace(/\s*good\s*/, '').replace(':::', '').trim();
          const label = override === '' ? 'Good' : override;
          return /* HTML */ `<p><strong><span class="mr-2">✅</span>${label}:</strong></p>`;
        }  else {
          return '';
        }
      },
    })
    .use(markdownItContainer, "bad", {
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const override = tokens[idx].info.replace(/\s*bad\s*/, '').replace(':::', '').trim();
          const label = override === '' ? 'Bad' : override;
          return /* HTML */ `<p><strong><span class="mr-2">❌</span>${label}:</strong></p>`;
        } else {
          return '';
        }
      },
    });

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
