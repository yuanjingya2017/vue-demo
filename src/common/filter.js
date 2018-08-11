import moment from 'moment'
import numeral from 'numeral'
import {
  isNull,
  isNumber,
  round
} from 'lodash'
import {
  maskmobile,
  maskIdNumber,
  num2str,
  img,
  currency
} from '@/common/utils'

export default {
  install (Vue, options) {
    Vue.filter('isNull', (value, str) => {
      return isNull(value) ? '-' : (str || value)
    })

    Vue.filter('toString', (str) => {
      return str.toString()
    })

    // ["name", "name2"] => "name/name2"
    Vue.filter('toAppointString', (arr) => {
      if (arr) {
        if (arr.length) {
          return arr.toString().split(',').join('/')
        } else {
          return '-'
        }
      } else {
        return '-'
      }
    })

    Vue.filter('reverse', (value) => {
      return value.split('').reverse().join('')
    })

    Vue.filter('moment', (value, pattern = 'YYYY-MM-DD HH:mm') => {
      if (!value || value === '') return ''
      return moment(value).format(pattern)
    })

    Vue.filter('maskMobile', (mobile) => {
      return maskmobile(mobile)
    })

    Vue.filter('maskIdNumber', (id) => {
      return maskIdNumber(id)
    })

    Vue.filter('formatDivider', (str, display = ' ', divider = '|') => {
      if (str === null || str === undefined || str === '') {
        return
      }
      return str.split(divider).join(display)
    })

    Vue.filter('currency', (value, prefix = '￥', suffix = '') => {
      if (isNumber(value)) {
        return prefix + numeral(round(value, 2)).format('0,0.00') + suffix
      } else {
        return value
      }
    })

    Vue.filter('money', (value, prefix = null) => {
      return currency(value, prefix)
    })

    Vue.filter('percent', (value) => {
      if (!value) return null
      if (value <= 1) {
        return `${value * 100} %`
      }
      if (value > 1) {
        return `${value} %`
      }
      return value
    })

    Vue.filter('num2str', num => {
      return num2str(num)
    })

    Vue.filter('img', img)

    Vue.filter('none', (val, placeholder = '-') => {
      return val && val !== '' ? val : placeholder
    })

    Vue.filter('everTime', val => {
      if (!val) return val
      if (val === '-1') {
        return '永续'
      } else {
        return val
      }
    })
  }
}
