import {merge} from 'lodash'

const LAYOUT = 'LAYOUT'
const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION'
const TOGGLE_SEARCH = 'TOGGLE_SEARCH'
const TOGGLE_FEED = 'TOGGLE_FEED'

const state = {
  layout: {
    loading: true,
    header: true,
    navigation: true,
    miniNavigation: false,
    breadcrumb: null,
    search: false,
    footer: true,
    miniFeed: false
  }
}

const mutations = {
  [LAYOUT] (state, payload) {
    merge(state.layout, payload)
  }
}

const actions = {
  [TOGGLE_NAVIGATION] ({commit, state}, force = null) {
    let miniNavigation = force === null ? !state.layout.miniNavigation : force
    commit('LAYOUT', {miniNavigation})
  },

  [TOGGLE_SEARCH] ({commit, state}) {
    let search = !state.layout.search
    commit('LAYOUT', {search})
  },

  [TOGGLE_FEED] ({commit, state}, force = null) {
    let miniFeed = force === null ? !state.layout.miniFeed : force
    commit('LAYOUT', {miniFeed})
  }
}

export default {
  state,
  mutations,
  actions
}
