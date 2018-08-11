var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// proxyTable可对应多条代理规则
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: 8080,
  autoOpenBrowser: true,
  proxyTable: {
    '/api': {
      target: 'http://g1-fac.nb.cn/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
    '/geneapi': {
      target: 'https://dev-gene-api.newbanker.cn/api',
      changeOrigin: true,
      pathRewrite: {
        '^/geneapi': ''
      }
    },
    '/gene': {
      target: 'https://dev-gene.newbanker.cn/api',
      changeOrigin: true,
      pathRewrite: {
        '^/gene': ''
      }
    }
  }
})
