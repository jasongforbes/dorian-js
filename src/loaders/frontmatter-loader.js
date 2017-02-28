const FrontMatter = require('front-matter');
const loaderUtils = require('loader-utils');

module.exports = function load(source) {
  const frontmatter = FrontMatter(source);
  const query = loaderUtils.getOptions(this);
  frontmatter.attributes.isValid = true;
  if (query.expected) {
    const missingAttributes = query.expected.filter(attrib => !(attrib in frontmatter.attributes));
    if (missingAttributes.length > 0) {
      frontmatter.attributes.warning = `Post ${this.resourcePath} missing required fields: ${missingAttributes.join(', ')}`;
      frontmatter.attributes.isValid = false;
    }
  }
  return JSON.stringify(frontmatter.attributes);
};
