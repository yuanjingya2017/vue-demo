const Layout = () => import('@/pages/layout/index.vue')
const NotFound = () => import('@/pages/404.vue')
const Login = () => import('@/pages/login.vue')
// vue demo
const VueCompute = () => import('@/pages/vue/compute/index')
const VueStyle = () => import('@/pages/vue/style/index')
// vuex demo
const VuexBase = () => import('@/pages/vuex/base/index')
const VuexPlugin = () => import('@/pages/vuex/plugin/index')

export default [
  {
    path: '/',
    redirect: '/vue/compute'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: `登录`, needLogin: false }
  },
  {
    path: '/vue',
    component: Layout,
    children: [
      {
        path: '/vue/compute',
        name: 'vueCompute',
        component: VueCompute,
        meta: {
          index: 'demo0001',
          title: `compute`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'compute'
            }]
          }
        }
      },
      {
        path: '/vue/style',
        name: 'vueStyle',
        component: VueStyle,
        meta: {
          index: 'demo0001',
          title: `style`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'style'
            }]
          }
        }
      }
    ]
  },
  {
    path: '/vuex',
    component: Layout,
    children: [
      {
        path: '/vuex/base',
        name: 'vuexBase',
        component: VuexBase,
        meta: {
          index: 'demo0002',
          title: `base`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'base'
            }]
          }
        }
      },
      {
        path: '/vuex/plugin',
        name: 'vuexPlugin',
        component: VuexPlugin,
        meta: {
          index: 'demo0002',
          title: `plugin`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'plugin'
            }]
          }
        }
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: NotFound,
    meta: { title: '您访问的页面找不到', needLogin: false }
  }
]
