const Layout = () => import('@/pages/layout/index.vue')
const NotFound = () => import('@/pages/404.vue')
const Login = () => import('@/pages/login.vue')
// vue demo
const VueCompute = () => import('@/pages/vue/compute/index')
const VueStyle = () => import('@/pages/vue/style/index')
const VueEvent = () => import('@/pages/vue/event/index')
const VueForm = () => import('@/pages/vue/form/index')
const vueProp = () => import('@/pages/vue/prop/index')
const VueSelfDefineEvent = () => import('@/pages/vue/selfDefineEvent/index')
const VueScope = () => import('@/pages/vue/scope/index')
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
          index: 'demo00010001',
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
          index: 'demo00010002',
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
      },
      {
        path: '/vue/event',
        name: 'vueEvent',
        component: VueEvent,
        meta: {
          index: 'demo00010003',
          title: `event`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'event'
            }]
          }
        }
      },
      {
        path: '/vue/form',
        name: 'vueForm',
        component: VueForm,
        meta: {
          index: 'demo00010004',
          title: `表单输入绑定`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '表单输入绑定'
            }]
          }
        }
      },
      {
        path: '/vue/selfDefineEvent',
        name: 'vueSelfDefineEvent',
        component: VueSelfDefineEvent,
        meta: {
          index: 'demo00010006',
          title: `自定义事件`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '自定义事件'
            }]
          }
        }
      },
      {
        path: '/vue/scope',
        name: 'vueScope',
        component: VueScope,
        meta: {
          index: 'demo00010007',
          title: `插槽`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '插槽'
            }]
          }
        }
      },
      {
        path: '/vue/prop',
        name: 'vueProp',
        component: vueProp,
        meta: {
          index: 'demo00010005',
          title: `prop`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'prop'
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
