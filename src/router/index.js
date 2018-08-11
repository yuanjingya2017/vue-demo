import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import App from '@/App.vue'
import store from '@/store'
import {
  isNull,
  each
} from 'lodash'
import {
  COOKIE
} from '@/common/const'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Vue.cookie.get(COOKIE.KEY_USER)
  let token = Vue.cookie.get(COOKIE.KEY_TOKEN)
  let permission = Vue.cookie.get(COOKIE.KEY_PERMISSION)

  if (Vue.PASSPORT && isNull(store.state.user.token)) {
    store.commit('UPDATE_USER', {
      user: user,
      token: token,
      permission: permission || null
    })
  }

  if (to.meta.needLogin && (!token || !user)) {
    if (!Vue.cookie.get(COOKIE.KEY_REDIRECT)) {
      Vue.cookie.set(COOKIE.KEY_REDIRECT, to.fullPath)
    }
    return next({name: 'login'})
  }
  next()
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.crumbs) {
    router.app.$nextTick(() => {
      store.commit('LAYOUT', {
        breadcrumb: to.meta.crumbs
      })
    })
  }

  // auto remove animated class
  router.app.$nextTick(() => {
    each(document.getElementsByClassName('wrapper-content'), node => {
      if (node) {
        setTimeout(() => {
          node.className = node.className.replace('animated', '')
        }, 800)
      }
    })
  })
})

window.onfocus = () => {
  // 页面重新获取焦点后检测登录情况
  // TODO
}

export {router}
export default () => {
  new Vue({
    render (h) {
      return h(App)
    },
    store,
    router
  }).$mount('#app')
}
