/*!
*
 *
 * Copyright 2011-2017 IBOXPAY,Co.,Ltd.
 * http://www.iboxpay.com
 *
 * Created by huangliangxing on 2017/7/26
 */
import Vue from 'vue'
import { numberComma } from 'vux'

// 格式化手机
Vue.filter('formatPhone', (value) => {
  if (value) {
    return value.substring(0, 3) + '****' + value.substring(7, 11)
  }
})

// 当超出某个长度时用省略号代替
Vue.filter('formatEllipsis', (value, maxlen) => {
  if (value) {
    const _length = maxlen || value.length
    const cansub = _length && value && (value.length) > _length
    return cansub ? (value.substr(0, _length) + '...') : value
  }
})

// 数字转中文or中文转数字
Vue.filter('transToChinese', (value) => {
  if (value) {
    var arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    return arr[parseInt(value) - 1]
  }
})

// 加千位符，保留2位小数
Vue.filter('formatMoney', (str='', flag=true) => {
  let val = (Number(str)/100).toFixed(2)
  return flag === false? numberComma(str):numberComma(val)

  /*if(isNaN(n) || n <= 0) {
      return '0.00'
  }
  n = (Math.round(n) / 100).toFixed(2)

  str = String(n)
  let regex = /(\d)(?=(\d\d\d)+$)/g
  let hasPoint = str.indexOf('.')
  let result = ''
  if (hasPoint !== -1) {
      let r = str.slice(hasPoint)
      let l = str.slice(0, hasPoint)
      l = l.replace(regex, '$&,')
      result = l + r
  } else {
      result = str.replace(regex, '$&,')
  }
  return result*/
})

// 姓名去敏
Vue.filter('formatUserName', (str='') => {
  return str? str.replace(/^./, "*"):"";
})

// 费率格式化(%)
Vue.filter('rateFormatter', (str='') => {
  var str = (Number(str)*100).toFixed(1);
  return str += "%";
})
