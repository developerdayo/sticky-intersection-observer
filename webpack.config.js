var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/sticky-observer.js'),
    mode:'development',
    output: {
      filename: 'sticky-observer.js',
      path: path.resolve(__dirname, 'public')
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
};