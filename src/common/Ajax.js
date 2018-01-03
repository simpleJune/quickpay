// 引入axios库
import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import { store } from '~store'

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
    return response.data
  },
  handleErr
)

export default instance
