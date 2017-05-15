const FrontMatter = require('front-matter');
const mkdown = require('marked');
const highlight = require('highlight.js');

module.exports = function load(source) {
  const frontmatter = FrontMatter(source);
  mkdown.setOptions({
    highlight: function hlight(code) {
      return highlight.highlightAuto(code).value;
    },
  });
  return mkdown(frontmatter.body);
};
