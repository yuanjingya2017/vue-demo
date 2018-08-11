const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const {size, filter, map, each, uniq} = require('lodash')
const fs = require('fs')
const rm = require('rimraf')

function resolve (dir) {
  return path.join(__dirname, '..', dir || '')
}

const isProd = process.env.NODE_ENV === 'production'

const getNbPrefixModules = () => {
  let dirs = fs.readdirSync(resolve() + '/node_modules')
  let count = 0
  let nbModules = []
  dirs.forEach(dir => {
    if (/^nb-/.test(dir)) {
      count++
      nbModules.push(dir)
    }
  })
  return new RegExp(`(${nbModules.join('|')})`)
}

// 清理dev-modules中的缓存模块
const clearHotModuleCache = (moduleName, root) => {
  let mpath = root + `/node_modules`
  let dirs = fs.readdirSync(mpath)
  each(dirs, dir => {
    let reg = new RegExp(`^_${moduleName}\@`)
    if (reg.test(dir)) {
      // 找到缓存的依赖包，删除掉
      try {
        rm.sync(`${mpath}/${moduleName}`)
        rm.sync(`${mpath}/${dir}`)
      } catch (e) {}
      return false
    }
  })
}

// 预处理热开发模块，设置别名
const genHotModulesAlias = () => {
  let modules = null
  let alias = {}

  let modulesPath = resolve(`src`)

  try {
    modules = require(`${modulesPath}/dev-modules/local.js`)
  } catch (e) {
    // console.log(chalk.bold.red('Not found dev-modules/local.js'))
    // console.log()
  }

  if (!modules) modules = {}

  if (size(filter(map(modules), o => o))) {
    console.log(chalk.cyan(`Load Hot Modules:`), `\n`)
  }
  for (let moduleName in modules) {
    let isEnable = modules[moduleName]
    if (isEnable) {
      clearHotModuleCache(moduleName, resolve())
    }
    console.log(
      `  `,
      chalk.bold.green(moduleName),
      utils.printBlankSpace(40 - moduleName.length),
      isEnable ? chalk.white(isEnable) : chalk.gray(isEnable)
    )
  }
  console.log()
  console.log()

  return alias
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['vue', 'vuex', 'vue-router', 'vue-resource', 'moment', 'lodash']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'vendor2',
      minChunks: (module, count) => (
        count >= 2
      ),
    }),
    /*
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor-manifest.json'),
    }),
    */
    new ProgressBarPlugin({
      format: chalk.cyan('Compileing') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', '.less', '.css'],
    alias: merge(
      {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      },
      genHotModulesAlias()
    )
  },
  module: {
    // noParse: /node_modules\/(@nb\/element\.js)/,
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: /(node_modules|src\/assets\/js)/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [
          resolve('src'),
          resolve('test'),
          getNbPrefixModules()
        ],
        // element-ui本身已经转成了ES5，所以不再需要babel-loader处理
        exclude: /(node_modules\/element-ui)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
