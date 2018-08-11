import {
  isNumber as _isNumber,
  isInteger
} from 'lodash'

// 验证中文
export const isCN = str => {
  if (!str) return
  return str.match(/^([\u4E00-\u9FA5]+，?)+$/) !== null
}

// 验证手机号
export const isMobile = mobile => {
  if (!mobile) return
  // if (!('' + mobile).match(/^[1][3|5|7|8][0-9]{9}$/)) {
  if (!('' + mobile).match(/^[1][0-9]{10}$/)) {
    return false
  }
  return true
}

// 验证身份证
export const isIdNumber = str => {
  if (!str) return
  return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(str)
}

// 验证邮件
export const isEmail = email => {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
}

// 数字 (number)
// @force {Boolean} 是否强制验证类型
export const isNumber = (val, force = true) => {
  return force ? _isNumber(val) : !isNaN(val)
}

// 整数 (int)
export const isInt = (val, force = true) => {
  return force ? isInteger(val) : /^-?\d+$/.test(val)
}

// 是否是0
export const isZero = (val, force = true) => {
  return force ? val === 0 : /^[0]+$/.test(val)
}

// 正整数(含0)
export const isPositiveInt = (val, force = true) => {
  return isZero(val, force) ||
    isInt(val, force) && /^\+?[1-9][0-9]*$/.test(val)
}

// 网址
export const isUrl = url => {
  let reg = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
  let re = new RegExp(reg)
  return re.test(url)
}
