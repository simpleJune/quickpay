import request from '~common/Ajax'
import Vue from 'vue'

// API
const basePrefix = '/mock-credit-quick-api' // 综合服务

const API = {
	// 综合服务
  'baseUrl.getMchtInfo': `${basePrefix}/getMchtInfo`, // 获取商户信息
  'baseUrl.getCreditCardList': `${basePrefix}/getCreditCardList`, // 获取商户信息
  'baseUrl.sendSmsCode': `${basePrefix}/sendSmsCode`, // 发送验证码
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
      data: { needRefresh: 'YES', ...data },
      method: _config.method
    }).then(resp => {
      _config.isLoading && Vue.$vux.loading.hide()
      // 成功返回
      if(resp.code == '1') {
        // 如果需要提示成功
        _config.isToast && Vue.$vux.toast.show({text: '操作成功', isShowMask: true})
        return resp
      } else {
        // 如果有异常需要提示
        return Promise.reject(resp)
      }
    }).catch(err => {
      _config.isLoading && Vue.$vux.loading.hide()

      let { errorCode='', errorDesc='' } = err
      let errText =  errorDesc + ' [' + errorCode + ']'

      errText = errText.length > 18 ?
     `${errText.slice(0, 19)}<br/>${errText.slice(19)}`
        :
      errText

      if (!_config.errorAction && _config.isTip) {
        Vue.$vux.toast.show({
          type: 'text',
          width: `${err.errorDesc ? 7.5 : 3}rem`,
          text:  err.errorCode ?  errText : '请求失败',
          isShowMask: true
        })
      }
      return Promise.reject(err)
    })
  }
}

export default handleRequest