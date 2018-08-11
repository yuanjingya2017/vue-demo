// global const config

exports.CF = {
  PAGE_START: 0, // 分页的第一页是从0还是1开始
  PAGE_SIZE: 10
}

exports.COOKIE = {
  KEY_TOKEN: 'access_token',
  KEY_USER: 'nbuser',
  MAX_AGE: 1000 * 60 * 60 * 24, // ms
  KEY_PERMISSION: 'nb-permission_admin',
  KEY_TENANT: 'tenant',
  KEY_REDIRECT: 'redirect'
}

// error code
exports.ERRORS = {
  PARAMS_ERROR: '参数错误',
  OPEN_ACCOUNT_FIRST: '账户未开通'
}

// 来源 1:pc 2:ios 3:android 4:another app 5:h5 6:wx
exports.SOURCE = {
  '1': 'PC',
  '2': 'IOS',
  '3': 'ANDROID',
  '4': 'OTHER APP',
  '5': 'H5',
  '6': 'WX'
}
// OSS上传时 富文本编辑器需要拼接的参数
exports.OSS_HEAD = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
  '<meta charset="UTF-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
  '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
  '<title></title>' +
'</head>' +
'<body>' +
'</body>' +
'</html>'

/**
 * 课程管理 课程类型
 */
export const COURSE_MEDIA = {
  'PLAIN': '图文课程',
  'VIDEO': '视频课程',
  'AUDIO': '音频课程',
  'TOPIC': '专题课程'
}
/**
 * 课程管理 新增时专用
 */
exports.COURSE_STRUCTURE = {
  'SINGLE': '单附件',
  'CHAPTER': '多附件'
}
/**
 * 广告管理 顺序码
 */
exports.COURSE_STRUCTURE = {
  'CHAPTER': '多章节课程',
  'SINGLE': '单个资源课程'
}
/**
 * 服务管理 产品类型
 */
exports.SERVICE_PRODUCT_TYPE = {
  'FIXED': '类固收',
  'INSURANCE': '保险服务',
  'TRUST': '信托计划',
  'ASSET_MANAGEMENT': '资管计划',
  'LIMITED_PARTNERSHIP': '有限合伙',
  'FOREIGN_INVESTMENT': '海外投资',
  'PUBLIC_OFFER_FUND': '公募基金',
  'PRIVATE_EQUITY': '阳光私募',
  'FUND_OF_FUNDS': '母基金'
}
exports.SERVICE_PRODUCT_DATE_TYPE = {
  'FIXED_MATURITY_DATE': '固定到期日',
  'FIXED_DURATION': '固定期限',
  'FIXED_PERIOD': '周期性回款'
}
exports.SERVICE_PRODUCT_REPAYPERIOD = {
  'MONTHLY': '月',
  'QUARTERLY': '季度',
  'HALF_YEARLY': '半年',
  'YEARLY': '年'
}
exports.SERVICE_PRODUCT_FOF_TYPES = {
  'FUND_OF_FUNDS_SECURITIES': '证券母基金',
  'FUND_OF_FUNDS_EQUITY': '股权母基金'
}
exports.SERVICE_MONEY_TYPES = {
  'CNY': '人民币',
  'USD': '美元',
  'EUR': '欧元',
  'GBP': '英镑',
  'HKD': '港币',
  'JPY': '日元',
  'CHF': '瑞士法郎',
  'CAD': '加拿大元',
  'AUD': '澳元',
  'SGD': '新加坡元',
  'NZD': '新西兰元'
}
export const SEQ_ARR = [
  {name: 1, value: '1'},
  {name: 2, value: '2'},
  {name: 3, value: '3'},
  {name: 4, value: '4'},
  {name: 5, value: '5'},
  {name: 6, value: '6'}
]
// 客户来源
export const CUSTOMER_SCOURCE = {
  'WEB': '后台录入',
  'INSURANCE_APPOINT': '保险预约',
  'MANUAL': 'App添加',
  'WECHAT_INFO': '微信获客'
}
// 来源
export const SOURCE_DATA = [
  {value: '本地创建', name: 'INSTITUTION'},
  {value: '资讯库', name: 'CORN'}
]
export const APP_STATUS = [
  {value: '关闭', name: 'STOP'},
  {value: '开启', name: 'OPEN'}
]
// 员工角色 编辑用 'OWNER': '负责人' 负责人
export const USER_ROLE_EDIT = {
  'LEADER': '管理者',
  'USER': '员工'
}
// 员工角色 展示用
export const USER_ROLE = {
  'OWNER': '负责人',
  'LEADER': '管理者',
  'USER': '员工'
}
// 海报分类
export const POSTER_SOURCE = {
  'LEADS': '顾问云',
  'LOCAL': '本地创建'
}
export const POSTER_STATUS = {
  'SHOWN': '开启',
  'HIDDEN': '关闭'
}
export const INVEST_CATEGORY = [
  {name: 'INSURANCE', value: '保险服务', existProduct: true},
  {name: 'FIXED', value: '类固收', existProduct: true},
  {name: 'FOREIGN_INVESTMENT', value: '海外投资', existProduct: true},
  {name: 'PUBLIC_OFFER_FUND', value: '公募基金', existProduct: true},
  {name: 'PRIVATE_EQUITY', value: '阳光私募', existProduct: true},
  {name: 'VC_AND_PE', value: 'VC/PE', existProduct: true},
  {name: 'STOCK', value: '股票', existProduct: false},
  {name: 'CASH', value: '现金管理', existProduct: false},
  {name: 'PRECIOUS_METALS', value: '贵金属', existProduct: false},
  {name: 'ESTATE', value: '房产', existProduct: false},
  {name: 'ALTERNATIVE_INVESTMENT', value: '另类投资', existProduct: false},
  {name: 'OTHERS', value: '其他', existProduct: false}
]
