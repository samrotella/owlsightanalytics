// https://stackoverflow.com/questions/34357489/calling-webpacked-code-from-outside-html-script-tag
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'EntryPoint'
  },
};
// can rename EntryPoint to owlsight