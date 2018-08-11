var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'moment',
      'vue',
      'vue-router',
      'vue-resource',
      'vuex',
      'element-ui'
    ]
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new ProgressBarPlugin({
      format: chalk.cyan('Createing Dll file') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      sourceMap: true
    })
  ]
}
