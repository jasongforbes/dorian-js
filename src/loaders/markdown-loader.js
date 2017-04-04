const FrontMatter = require('front-matter');
const mkdown = require('markdown');

module.exports = function load(source) {
  const frontmatter = FrontMatter(source);
  return mkdown.markdown.toHTML(frontmatter.body);
};
