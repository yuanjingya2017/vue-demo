/**
 * 临时保存某些信息
 * 只用于某些临时生成的变量
 */
import {
  assign
} from 'lodash'

const TMP = 'TMP'
const UPDATE_ISCOLLAPSE = 'UPDATE_ISCOLLAPSE'

const state = {
  isCollapse: false
}

const mutations = {
  [TMP] (state, payload) {
    assign(state, payload)
  },
  [UPDATE_ISCOLLAPSE] (state, data) {
    state.isCollapse = data === '1' ? false : !state.isCollapse
  }
}

export default {
  state,
  mutations
}
