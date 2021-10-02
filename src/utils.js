function unescape(html) {
  return html.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

module.exports = {
  unescape,
};
