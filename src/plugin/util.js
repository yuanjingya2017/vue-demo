// global util plugin
import {
  each,
  clone,
  merge
} from 'lodash'
import {
  isEmpty
} from '@/common/utils'
import {router} from '@/router'
import {CF} from '@/common/const'

let Utils = () => {}

// merge router query & search form data
Utils.prototype.build = (paramsObj, size, page) => {
  paramsObj = paramsObj || {}
  let obj = {}
  each(clone(merge(paramsObj, router.currentRoute.query)), (v, k) => {
    if (!(v === '' || v === 'null')) {
      obj[k] = v
    }
  })
  if (page) {
    obj.page = page
  } else {
    if (isEmpty(obj.page) && !router.currentRoute.query.page) {
      obj.page = 1
    }
  }

  if (size) {
    obj.size = size
  } else {
    if (isEmpty(obj.size) && !router.currentRoute.query.size) {
      obj.size = size || CF.PAGE_SIZE
    }
  }

  return obj
}

// diff between tow objects
Utils.prototype.diff = (oa, ob) => {
  let _diff = (a, b) => {
    let arr = []
    each(a, (v, k) => {
      if (v !== b[k]) {
        arr.push({k: k, ov: v, nv: b[k] || null})
      }
    })
    return arr
  }
  return _diff(oa, ob)
}

let util = new Utils()

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  Vue.$util = util

  Object.defineProperties(Vue.prototype, {
    $util: {
      get () {
        return util
      }
    },
    $build: {
      get () {
        return util.build
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
