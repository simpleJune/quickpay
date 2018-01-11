// 引入axios库
import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import { store } from '~store'
import { setTimeout } from 'timers';

Vue.use(AjaxPlugin)

// 全局配置
const axiosDefault = {
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: false // default
}

const handleErr = (err) => {
  return Promise.reject(err)
}

const ERROR_CODE_MAP = {
  "990104":	"", // 短信发送失败
  "990105":	"", // 手机号已注册
  "990106":	"", // 您的验证码输入有误，请重新输入
  "990107":	"", // 登录密码错误次数超限
  "990108":	"", // 用户获取短信验证码次数超限
  "990110":	"", // 支付密码错误
  "990111":	"", // 支付密码未设置
  "990112":	"", // 账号已锁定，请明日再登录
  "990113":	"", // 登录出错
  "990114":	"/login", // 业务token失效
  "990115":	"", // 发送短信验证码出错
  "990116":	"", // 验证码已失效,请重新获取
  "990405":	"", // 手机号未注册
  "990500":	"/profile", // 商户未实名认证
  "990501":	"/settings/pwd-pay", // 商户实名未设置支付密码
  "990502":	"" // 实名已设置支付密码未绑卡
}

const instance = Vue.http.create(axiosDefault) // 创建axios通用规则

// http request 请求拦截器
instance.interceptors.request.use(
  config => {
    let params = config.data || {}
    let data = {}

    // 请求头
    data.header = {
      ...store.getters.getHeaderParams
    }
    // 请求参数
    data.body = params

    console.log("postData:", data)

    // 传输加密
    let aesKey = "UMrtmcM108My8SM7"
    let paramsStr = JSON.stringify(data),
        RSAKey = Vue.iBox.security.encryptByRSA(aesKey);
    let postData = {
      data: Vue.iBox.security.encryptByDES(paramsStr, aesKey),
      sign: RSAKey
    };
    config.data = postData

    return config
  },
  handleErr
)

// http response 服务器响应拦截器
instance.interceptors.response.use(
  response => {
    let data = response.data, routePath = "";
    (routePath = ERROR_CODE_MAP[data.code]) && window.router.push(routePath)
    return data
  },
  handleErr
)

export default instance
