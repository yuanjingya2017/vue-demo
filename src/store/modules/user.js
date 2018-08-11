// 登录用户信息
import Vue from 'vue'
import md5 from 'md5'
import {
  isEqual
} from 'lodash'
import {
  COOKIE
} from '@/common/const'

const USER = 'USER'
const LOGOUT = 'LOGOUT'
const LOGIN = 'LOGIN'
const UPDATE_USER = 'UPDATE_USER'

const state = {
  account: null,
  token: null,
  memberList: null,
  // 个人中心用户详情(一般是指当前登录用户的信息)
  profile: null,
  list: null
}
const MOCK_TOKEN = md5('test-access-token-for-demo')
const MOCK_USER = {
  id: '696D63A2-5D3D-4BF2-91E5-CAE02C53C5CE',
  mobile: '13088888888',
  username: 'demo',
  password: '1',
  name: '呆小萌',
  email: 'demo@newbanker.cn'
}
const mutations = {
  [USER] (state, user) {
    state.account = user
  },

  [UPDATE_USER] (state, pa) {
    state.account = pa.user
    state.token = pa.token
    state.permission = pa.permission
  }
}

const actions = {
  [LOGIN] ({commit, dispatch}, user) {
    return new Promise((resolve) => {
      if (
        isEqual(user.username, MOCK_USER.username) &&
        isEqual(user.password, MOCK_USER.password)
      ) {
        setTimeout(() => {
          commit(UPDATE_USER, {
            success: true,
            user: MOCK_USER,
            token: MOCK_TOKEN
          })
          Vue.cookie.set(COOKIE.KEY_USER, MOCK_USER, {
            maxAge: COOKIE.MAX_AGE
          })
          Vue.cookie.set(COOKIE.KEY_TOKEN, MOCK_TOKEN, {
            maxAge: COOKIE.MAX_AGE
          })
          resolve({
            user: MOCK_USER,
            success: true
          })
        }, 1000)
      } else {
        setTimeout(() => {
          resolve(null)
        }, 500)
      }
    })
  },

  [LOGOUT] ({commit}) {
    // 置空USER状态
    commit('UPDATE_USER', {
      user: null,
      token: null,
      permission: null
    })
    // 清除本地临时存储
    Vue.cookie.remove(COOKIE.KEY_TOKEN)
    Vue.cookie.remove(COOKIE.KEY_USER)
    Vue.cookie.remove(COOKIE.KEY_PERMISSION)
  }
}

export default {
  state,
  mutations,
  actions
}
