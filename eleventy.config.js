const tags = require("./_data/tags.js");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addCollection("allProjects", async () => {
    const projectsData = await require("./_data/projects.js")();
    return projectsData.projects;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
