// utils
import {
  each,
  isArray,
  isObject,
  isBoolean,
  isString,
  isNumber,
  isDate,
  includes,
  isEmpty as _isEmpty
} from 'lodash'
import {Message} from 'element-ui'

// 把一个object数据清空
export const empty = obj => {
  let o = {}
  each(obj, (r, k) => {
    if (isObject(r)) {
      o[k] = isArray(r) ? [] : {}
    } else {
      if (r !== '') {
        o[k] = r
      }
    }
  })
  return o
}

// 把一个object数据结构深度清空
export const emptyDeep = obj => {
  let o = {}
  each(obj, (item, key) => {
    if (item !== null) {
      if (isArray(item)) {
        o[key] = item
      } else {
        if (isObject(item)) {
          o[key] = emptyDeep(item)
        } else {
          o[key] = item
        }
      }
    }
  })
  return o
}

// 手机打码
export const maskmobile = mobile => {
  if (!mobile) return
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 身份证打码
export const maskIdNumber = id => {
  return id.replace(/^(.{6})(.*)(.{4})$/, '$1********$3')
}

// 姓名打码
export const maskName = name => {
  if (name.length < 2) {
    return
  }
  let arr = name.split('')
  if (arr.length === 2) {
    return arr[0] + '*'
  } else {
    return arr[0] + '*' + (arr[arr.length - 1])
  }
}

// 阿拉伯数字转中文数字
export const num2str = num => {
  let map = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
  }
  return map[num.toString()]
}

// 获取滚动条距离顶部距离
export const getScrollTop = () => {
  let scrollPos = null
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop
  } else if (document.body) {
    scrollPos = document.body.scrollTop
  }
  return scrollPos
}

// debounce function
let runtime = window.__nb_runtime || 0
let timer = window.__nb_timer
export const debounce = (func, timerOffset = 200) => {
  let now = Date.now()
  if (runtime > 0 && now - runtime < timerOffset) {
    timer && clearTimeout(timer)
    window.__nb_runtime = 0
    window.__nb_timer = null
  }
  runtime = now
  timer = setTimeout(() => {
    func.call()
  }, timerOffset)
}

export const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export const uuid = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

// isEmpty
export const isEmpty = (val) => {
  if (val === null || val === undefined || val === '') {
    return true
  }
  if (isBoolean(val)) return false
  if (isString(val)) return false
  if (isNumber(val)) return false
  if (isDate(val)) return false
  return _isEmpty(val)
}

export const toHref = url => {
  if (isEmpty(url)) return null
  if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
    return url
  } else {
    return `//${url}`
  }
}

// 将数组拼接成key,value形式
export const getNewArray = (key, arr) => {
  if (isEmpty(arr)) return null
  return arr.join(`&${key}=`)
}

// currentcy format
export const currency = (value, prefix) => {
  if (!value) return null
  let curry = {
    CNY: '￥',
    USD: '$'
  }[prefix] || ''
  if (value >= 100000000) {
    return `${curry}${value / 100000000}亿`
  } else {
    return `${curry}${value / 10000}万`
  }
}
/**
 * 校验图片上传时的类型
 * @param 文件对象file 文件类型type(picture、doc、all) 默认all
 */
export const checkFileType = (file, type = 'all') => {
  let fileAttr = file.target.files[0] || file.dataTransfer.files[0]
  let fileType = fileAttr.type
  let isFit = true
  switch (type) {
    // 校验图片类型
    case 'picture': {
      if (!fileType.includes('image/')) {
        isFit = false
      }
      break
    }
    // 校验除图片外类型
    case 'doc': {
      // 如果文档类型是图片 就返回false
      if (fileType.includes('image/')) {
        isFit = false
      }
      break
    }
    default:
      break
  }
  return isFit
}
/**
 * 在协议上传时，会调用生成uuid的方法
 * 弊端 是随机生成的，存在小概率的重复可能性
 */
export const makeUuid = (len, radix) => {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 校验文件上传时的大小
 * @param 文件对象file 需求要求大小size 需求要求大小类型 type (默认k,可选MB,KB)
 */
export const checkFileSize = (file, size, type) => {
  let fileAttr = file.target.files[0] || file.dataTransfer.files[0]
  let fileSize = fileAttr.size
  let isSuite = true
  switch (type.toUpperCase()) {
    case 'G': {
      let mbSize = fileSize / 1024 / 1024 / 1024
      if (mbSize > size) {
        isSuite = false
      }
      break
    }
    case 'M': {
      let mbSize = fileSize / 1024 / 1024
      if (mbSize > size) {
        isSuite = false
      }
      break
    }
    case 'KB': {
      let kbSize = fileSize / 1024
      if (kbSize > size) {
        isSuite = false
      }
      break
    }
    default:
      if (fileSize > size) {
        isSuite = false
      }
  }
  return isSuite
}
/**
 * 校验图片外文件上传时的类型
 * @param 文件对象file 文件类型type(pdf、video、audio) 默认pdf
 */
export const checkAttchmentType = (file, type = 'pdf') => {
  let isFit = true
  if (type === 'pdf') {
    for (let item of file) {
      if (item.type.toUpperCase().indexOf('PDF') === -1) {
        isFit = false
        break
      }
    }
  } else if (type === 'video') {
    for (let item of file) {
      if (item.type.toUpperCase().indexOf('VIDEO') === -1) {
        isFit = false
        break
      }
    }
  } else if (type === 'image') {
    for (let item of file) {
      if (item.type.toUpperCase().indexOf('IMAGE') === -1) {
        isFit = false
        break
      }
    }
  } else {
    for (let item of file) {
      if (item.type.toUpperCase().indexOf('AUDIO') === -1) {
        isFit = false
        break
      }
    }
  }
  return isFit
}
// 统一根据value转换name方法
export const getTypeName = (param, obj) => {
  if (Array.isArray(param)) {
    let nameArr = []
    param.map(item => {
      for (let it of obj) {
        if (it.name === item) {
          nameArr.push(it.value)
        }
      }
    })
    return nameArr.join('、')
  } else {
    for (let item of obj) {
      if (item.name === param) {
        return item.value
      }
    }
  }
}
/**
 * 根据产品类型获取产品列表收益/净值的不同展示字段
 * @param productType 产品类型 proObj 代表res.entity.entity下的值
 * @return 返回收益或者是净值的值
 */
export const getLimitValueOrRate = (productType, proObj) => {
  if (productType === 'PUBLIC_OFFER_FUND' || productType === 'PRIVATE_EQUITY') {
    return proObj.value
  } else {
    return proObj.rate
  }
}
/**
* app字段和后端字段不同的转义
* @params type 代表转义的字典表 data 代表转义的数据
* @return 返回新的数组集合
*/
export const makeFacDictionary = (type, data) => {
  if (type === 'investStatus') {
    data.map(item => {
      if (item.name === 'PROPOSED') {
        item.value = '待审核'
      }
      if (item.name === 'ARCHIVED') {
        item.value = '已删除'
      }
    })
  }
  if (type === 'tagType') {
    let tempArr = []
    data.map(item => {
      tempArr.push({name: item.id, value: item.name})
    })
    data = [...tempArr]
  }
  return data
}
/**
* 广告管理表单提交时的校验
* @params data 代表需要校验的表单数据
* @return 返回是否可提交
*/
export const validSubmit = (data) => {
  let seqenceArr = []
  let canSubmit = true
  for (let i = 0; i < data.length; i++) {
    if (!validateForm(data[i], i)) {
      canSubmit = false
      break
    } else {
      if (seqenceArr.length > 0) {
        if (includes(seqenceArr, data[i].sequence)) {
          Message.error(`第${i + 1}条广告信息的显示顺序重复！`)
          canSubmit = false
          break
        }
      }
      seqenceArr.push(data[i].sequence)
    }
  }
  return canSubmit
}
/**
* 广告管理表单提交时校验表单项是否为空
* @params data 代表需要校验的表单数据
* @return 返回是否可提交
*/
export const validateForm = (item, index) => {
  if (!item.title) {
    Message.error(`请输入第${index + 1}条广告的广告标题！`)
    return false
  }
  if (!item.description) {
    Message.error(`请输入第${index + 1}条广告的广告摘要！`)
    return false
  }
  if (!item.sequence) {
    Message.error(`请选择第${index + 1}条广告的显示顺序！`)
    return false
  }
  if (!item.href) {
    Message.error(`请输入第${index + 1}条广告的图片链接！`)
    return false
  } else {
    let reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/ig
    // 必须以action开头
    let regAction = /^action:\/\/*/ig
    if (!reg.test(item.href) && !regAction.test(item.href)) {
      Message.error(`请输入正确的第${index + 1}条广告的图片链接！`)
      return false
    }
  }
  if (!item.uri) {
    Message.error(`请上传第${index + 1}条广告的图片！`)
    return false
  }
  return true
}
/**
* 修改密码提交时，密码校验
* @params password
* @return 返回是否通过
*/
export const validPassword = (password) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
  let isValid = false
  if (reg.test(password)) {
    isValid = true
  }
  return isValid
}
export const getModuleStatus = (type, obj, text) => {
  for (let item of obj) {
    if (item.type === type) {
      if (item.status === 'PUBLISHED') {
        return '已开启委托运营，每天自动更新' + text + '内容至企业APP中'
      } else {
        return '未开启委托运营，到' + text + '库中查看更新的' + text + '内容'
      }
    }
  }
}
