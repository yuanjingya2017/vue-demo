import Vue from 'vue'

Vue.config.productionTip = false

// require all test file_admin (file_admin that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src file_admin except main.js for coverage.
// you can also change this to match only the subset of file_admin that
// you want coverage for.
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
const srcContext = require.context('../../src', true, /\.vue$/)
srcContext.keys().forEach(srcContext)
