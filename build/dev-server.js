import chalk from 'chalk'
import opn from 'opn'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import proxyMiddleware from 'nb-http-proxy'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import wpDevMiddleware from 'webpack-dev-middleware'
import wpHotMiddleware from 'webpack-hot-middleware'
import {
  isEqual,
  range
} from 'lodash'
import createDebug from 'debug'
import url from 'url'

import hot from 'node-hot-require'
import filewatcher from 'filewatcher'

const utils = require('./utils')

const resolve = dir => path.join(__dirname, '..', dir)

let readyPromise = null
let server = null

const printBlankSpace = n => {
  let spaces = []
  range(n).forEach(r=> {
    spaces.push(' ')
  })
  return spaces.join('')
}

const InitServer = async (options) => {
  // Print NewBanker logo
  let text = await utils.drawNb()
  console.log(chalk.green(text))
  console.log()

  const watcher = filewatcher()
  watcher.add(resolve('config'))

  // import config from '../config'
  const wpProdConf = require('./webpack.prod.conf')
  const wpDevConf = require('./webpack.dev.conf')
  let config = hot.require('../config/index.js')

  const checkVersions = require('./check-versions')
  checkVersions()

  const debugRequest = createDebug('request')
  const debugProxy = createDebug('proxy')

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }

  let webpackConfig = process.env.NODE_ENV === 'testing'
    ? wpProdConf
    : wpDevConf

  // default port where dev server listens for incoming traffic
  let port = process.env.PORT || config.dev.port
  // automatically open browser, if not set will be false
  let autoOpenBrowser = !!config.dev.autoOpenBrowser
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  let proxyTable = config.dev.proxyTable
  // let PROXY_TABLE =

  // proxy api requests
  let decPrint = false
  let cacheTime = 0
  let timerOffset = 2000
  let timer = null
  const createProxy = (app, compiler) => {
    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }

      options.updateProxyTable = (req, ctx, pathRewriter) => {
        let cacheProxyTable = config.dev.proxyTable[ctx]
        let rewriteUrl = pathRewriter ? pathRewriter(req.url, req) : null

        if (process.env.DEBUG_DETAIL && rewriteUrl) {
          if (!decPrint) {
            decPrint = true
            console.log(chalk.cyan.bold(`  A:`), chalk.gray(`after proxy`))
            console.log(chalk.cyan.bold(`  B:`), chalk.gray(`before proxy`))
            console.log()
          }
          debugRequest(
            chalk.green(req.method + printBlankSpace(6 - req.method.length)),
            chalk.cyan(`B`),
            chalk.gray(url.parse(cacheProxyTable.target).host + req._parsedUrl.pathname)
          )
          console.log(
            printBlankSpace(16),
            chalk.cyan(`A`),
            chalk.cyan.dim(url.parse(cacheProxyTable.target).host + rewriteUrl)
          )
        } else {
          debugRequest(
            chalk.green(req.method + printBlankSpace(6 - req.method.length)),
            rewriteUrl
              ? chalk.gray(url.parse(cacheProxyTable.target).host + utils.splitUrl(rewriteUrl))
              : chalk.gray(url.parse(cacheProxyTable.target).host + req._parsedUrl.pathname)
          )
        }

        debugProxy('%O ', cacheProxyTable.target)
        let now = Date.now()
        if (cacheTime > 0 && now - cacheTime < timerOffset) {
          timer && clearTimeout(timer)
        }
        cacheTime = now
        timer = setTimeout(() => {
          console.log()
        }, timerOffset)
        return cacheProxyTable
      }

      app.use(proxyMiddleware(options.filter || context, options))
    })
  }

  const startNb = async function () {
    const app = express()
    const compiler = webpack(webpackConfig)

    createProxy(app, compiler)
    console.log()

    // handle fallback for HTML5 history API
    app.use(connectHistoryApiFallback())

    const devMiddleware = wpDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    })

    const hotMiddleware = wpHotMiddleware(compiler, {
      log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })
    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)

    // serve pure static assets
    const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    app.use(staticPath, express.static('./static'))

    const uri = 'http://localhost:' + port

    let _resolve
    readyPromise = new Promise(resolve => {
      _resolve = resolve
    })


    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + uri + '\n')
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
      _resolve()
    })

    server = app.listen(port)

    watcher.on('change', file => {
      let cacheDevConfig = config.dev
      hot.reloadAll()
      if (JSON.stringify(cacheDevConfig) != JSON.stringify(config.dev)) {
        console.log()
        console.log(chalk.cyan('config file updated:'))
        let isSame = isEqual(
          JSON.stringify(cacheDevConfig.proxyTable),
          JSON.stringify(config.dev.proxyTable)
        )
        let consoleObj = isSame
          ? config.dev
          : config.dev.proxyTable
        console.log(JSON.stringify(consoleObj, null, '    '))
        console.log()
      }
    });
  }
  startNb()
}
InitServer()

export default {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
