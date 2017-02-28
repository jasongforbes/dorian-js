const FrontMatter = require('front-matter');
const { markdown } = require('markdown');

module.exports = function load(source) {
  const frontmatter = FrontMatter(source);
  return JSON.stringify(markdown.toHTML(frontmatter.body));
};
