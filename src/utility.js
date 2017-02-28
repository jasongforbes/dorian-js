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
