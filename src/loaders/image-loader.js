const loaderUtils = require('loader-utils');
const jimp = require('jimp');


module.exports = function load(source) {
  const query = loaderUtils.getOptions(this) || {};

  const path = query.path || '';

  const context = this.options.context;
  const content = {
    context,
    source,
    regExp: '',
  };

  const url = loaderUtils.interpolateName(this, `${path}[name].[ext]`, content);
  const filePaths = {
    baseUrl: url,
    width: {},
    placeholder: '',
  };

  if (query.placeholder) {
    jimp.read(source, (err, image) => {
      if (err) throw err;
      image.resize(40, jimp.AUTO)
                .blur(1)
                .getBuffer(jimp.AUTO, (error, buffer) => {
                  if (error) throw error;
                  filePaths.placeholder = loaderUtils.interpolateName(this, `${path}[name]-placeholder.[ext]`, content);
                  this.emitFile(filePaths.placeholder, buffer);
                });
    });
  }
  if (query.resizeWidth) {
    query.resizeWidth.forEach((w) => {
      jimp.read(source, (err, image) => {
        if (err) throw err;
        image.resize(parseInt(w, 10), jimp.AUTO)
                    .getBuffer(jimp.AUTO, (error, buffer) => {
                      if (error) throw err;
                      const imagePath = loaderUtils.interpolateName(this, `${path}[name]-w${w}px.[ext]`, content);
                      filePaths[`w${w}px`] = imagePath;
                      this.emitFile(imagePath, buffer);
                    });
      });
    });
  }

  this.emitFile(filePaths.baseUrl, source);
  return JSON.stringify(filePaths);
};

module.exports.raw = true;
