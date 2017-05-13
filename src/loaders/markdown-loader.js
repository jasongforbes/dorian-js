const FrontMatter = require('front-matter');
const mkdown = require('marked');

module.exports = function load(source) {
  const frontmatter = FrontMatter(source);
  return mkdown(frontmatter.body);
};
