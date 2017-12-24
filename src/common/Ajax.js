// 引入axios库
import Vue from 'vue'
import { AjaxPlugin } from 'vux'

Vue.use(AjaxPlugin)

// 全局配置
const axiosDefault = {
  // baseURL: '/fspf-credit-center',
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
    let data = config.data || {}
    console.log("postData:", data)

    let ADKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf+dvg7ouhRAiRZ1IUjDOGjv6o3" +
        "SedYDVZs41y0SysvvWusjKuw4TnkPARVJfmBnsUIHAx9XL/fM5F/ZJ5/9LSe28zUolqs6qm/" +
        "yxQpsHoZYSxD+sKQgQI5x8RlOmutnoCy1ZX23lo5IjgWJTrhVfjmmnqdWfXeNzG5WiTmNuqOQIDAQAB"

    // 传输加密
    let paramsStr = JSON.stringify(data),
        RSAKey = Vue.iBox.security.encryptByRSA(new Date().getTime()+"", /[getAdList]\.json$/ig.test(config.url)? ADKey:"");
    let postData = {
      encryptStr: Vue.iBox.security.encryptByDES(paramsStr, RSAKey),
      desKey: RSAKey
    };
    config.data = /[sendSmsCode]\.json$/ig.test(config.url)? data:postData
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
