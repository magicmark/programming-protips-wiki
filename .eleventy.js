const util = require("util");

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy("./src/css/styles.css");
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addCollection("protips", (collectionApi) => {
        return collectionApi.getFilteredByGlob("./src/protips/**/*.md");
    });

    eleventyConfig.addFilter("inspect", function (value) {
        return util.inspect(value);
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
