import slugify from 'slugify';

const payloadRegex = /^data:text\/([\w-]+);(?:([\w\d]+),)?(.*)$/;

export function parseBase64(string) {
  return atob(string);
}

export function parsePayload(payload, format = null) {
  const match = payloadRegex.exec(payload);
  if (match && (!format || match[1] === format)) {
    if (match[2] === 'base64') {
      return parseBase64(match[3]);
    }
  }
  return null;
}

export function parseMarkdownPayload(payload) {
  return parsePayload(payload, 'x-markdown');
}

export function importAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

export function loadMarkdown(frontMatter, fileNames, sortFunc = undefined) {
  const files = frontMatter.map((e, i) => ({
    frontMatter: e,
    file: fileNames[i],
    loaded: false,
    isLoading: false,
    body: null,
  }))
    .filter(file => file.frontMatter.isValid)
    // sort by title so similar titles are slugified in order with proper titles
    .sort(sortFunc)
    .reduce((origFiles, file) => {
      const modifiedFiles = origFiles;
      const title = slugify(file.frontMatter.title.toLowerCase());
      if (title in modifiedFiles) {
        // Duplicate title ... append an integer instead of failing
        // Use slugified titles as keys as they must be unique (otherwise will fail to redirect)
        const titleRegex = new RegExp(`^${title}(-[\\d]+)?$`, 'i');
        const uniqueID = Object.keys(modifiedFiles).filter(key => titleRegex.test(key)).length;
        modifiedFiles[`${title}-${uniqueID}`] = file;
      } else {
        modifiedFiles[title] = file;
      }
      return modifiedFiles;
    }, {});
  return files;
}
