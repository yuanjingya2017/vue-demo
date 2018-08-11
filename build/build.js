require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var figlet = require('figlet')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var shell = require('shelljs')

var spinner = ora('building for production...')
spinner.start()

/*
try {
  shell.mkdir('dist')
} catch (e) {}

var cp = shell.cp('build/dll/vendor.dll.js', 'dist')
if (cp.stderr) {
  // error
}
*/

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()

    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.magenta(
      '  Push the dist folder to NewBanker HTTP server.\n' +
      '  Or push it to NewBanker CDN server.\n'
    ))

		figlet('NewBanker', function (err, data) {
      if (err) {
        return
      }
      console.log(chalk.green(data))
    })

  })
})
