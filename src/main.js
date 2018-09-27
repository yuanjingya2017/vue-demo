import Vue from 'vue'
import InitRouter, {router} from '@/router'
import Filters from '@/common/filter'
import Directive from '@/common/directive'
import NbRequest from 'nb-vue-request'
import {
  Logger,
  Util,
  Auth,
  Cookie,
  Element
} from '@/plugin'
import {
  COOKIE
} from '@/common/const'

Vue.config.productionTip = false
Vue.config.keyCodes = {
  v: 67,
  ReturnKey: 88
}

Vue.use(Filters)
Vue.use(Directive)
Vue.use(Util)
Vue.use(Cookie)
Vue.use(Logger)
Vue.use(Auth)
Vue.use(NbRequest, {
  COOKIE,
  router,
  TENANT: '',
  redirect: '',
  startPage: 0,
  logger: false,
  // 不会自动添加TENANT标识的页面
  excludeRewrite: [],
  // 路由rewrite 没有可不设置
  urlRewrite: (req) => {
    req.url = req.url.replace('/api/v1/', `/api/v1/`)
  },
  authorization: () => {
    Vue.http.headers.common['X-Authorization'] = 'Bearer ' + Vue.cookie.get(COOKIE.KEY_TOKEN)
    Vue.http.options.emulateJSON = true
  }
})
Element(Vue)

InitRouter()
