import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'

// 导入自定义的模块
import tmp from './modules/tmp'
import app from './modules/app'
import user from './modules/user'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tmp,
    app,
    user
  },
  strict: debug,
  plugins: debug ? [logger()] : []
})
