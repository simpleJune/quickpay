import request from '~common/Ajax'
import Vue from 'vue'

// API
const basePrefix = '/credit-quick-api'

const API = {
  // 公共服务
  'api.province': `${basePrefix}/common/province`, // 获取省份
  'api.city': `${basePrefix}/common/city`, // 获取市区
  'api.industry': `${basePrefix}/common/industry`, // 获取行业类型
  'api.cardbin': `${basePrefix}/common/cardbin`, // 获取卡bin
  'api.paychannel': `${basePrefix}/common/paychannel`, // 获取通道信息
  'api.banklist': `${basePrefix}/common/banklist`, // 获取系统支持的银行卡信息

	// 综合服务
  'api.getopenid': `${basePrefix}/user/getopenid`, // 获取商户信息
  'api.mobile': `${basePrefix}/user/mobile`, // 发送验证码 
  'api.register': `${basePrefix}/user/register`, // 注册
  'api.login': `${basePrefix}/user/login`, // 登录
  'api.logout': `${basePrefix}/user/logout`, // 退出登录
  'api.realname': `${basePrefix}/user/realname`, // 实名认证
  'api.setpaypwd': `${basePrefix}/user/setpaypwd`, // 设置支付密码
  'api.addcreditcard': `${basePrefix}/user/addcreditcard`, // 添加信用卡
  'api.creditlist': `${basePrefix}/user/creditlist`, // 获取信用卡列表

  // 快捷交易
  'api.topay': `${basePrefix}/payment/topay`, // 发起快捷支付
  'api.orderlist': `${basePrefix}/payment/queryorder`, // 查询交易订单信息
  'api.orderdetail': `${basePrefix}/payment/orderdetail`, // 查询订单详情

  // 商户服务
  'api.querymerchant': `${basePrefix}/merchant/querymerchant`, // 获取商户信息

}

const handleRequest = (url = '') => {
  let _url = API[url] || ''

  return (data = {}, config = {}) => {
    let _config = {
      isLoading: false,
      isTip: true,
      isToast: false,
      method: 'POST',
      ...config
    }
    _config.isLoading && Vue.$vux.loading.show()

    return request({
      url: _url,
      data: { ...data },
      method: _config.method
    }).then(resp => {
      _config.isLoading && Vue.$vux.loading.hide()
      // 成功返回
      if(resp.code == '0') {
        // 如果需要提示成功
        _config.isToast && Vue.$vux.toast.show({text: '操作成功', isShowMask: true})
        return resp
      } else {
        // 如果有异常需要提示
        return Promise.reject(resp)
      }
    }).catch(err => {
      _config.isLoading && Vue.$vux.loading.hide()

      let { code='', msg='' } = err
      let errText =  msg + ' [' + code + ']'

      errText = errText.length > 18 ?
     `${errText.slice(0, 19)}<br/>${errText.slice(19)}`
        :
      errText

      if (!_config.errorAction && _config.isTip) {
        Vue.$vux.toast.show({
          type: 'text',
          width: `${err.msg ? 7.5 : 3}rem`,
          text:  err.code ?  errText : '请求失败',
          isShowMask: true
        })
      }
      return Promise.reject(err)
    })
  }
}

export default handleRequest