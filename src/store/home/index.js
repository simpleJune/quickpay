/*
  Created by ZhouShengGuo on 2017-12-07 09:43:09
*/
import handleRequest from '~common/API'

const state = {
  // 关联微信商户
  openId: "",

  // 错误码
  errorCode: "",

  // 商户信息
  mchtInfo: {}
}

const mutations = {
  // openId
  HOME_MUTATION_OPENID (state, payload) {
    state.openId = payload
  },

  // errorCode
  HOME_MUTATION_ERROR_CODE (state, payload) {
    state.errorCode = payload
  },

  // mchtInfo
  HOME_MUTATION_MCHTINFO (state, payload) {
    state.mchtInfo = payload
  },

  // merchantStatus
  HOME_MUTATION_MCHTINFO_STATUS (state, payload) {
    state.mchtInfo.merchantStatus = payload
  }
}

const actions = {
  // 获取微信端openId
  getOpenId ({ commit }, params = {}) {
    return handleRequest('api.getopenid')(params, {isLoading:true})
    .then((res={}) => {
      // let res = {"code":"0","data":{"accessToken":"3bb92a55-1e6b-4693-ac86-05012aa4e244","loginMobile":"13662691961","merchantNo":"515187431872398848","merchantStatus":2},"msg":"成功","serverTime":1515820387165}
      let data = res.data
      commit('HOME_MUTATION_OPENID', data.openId) //||"o5hnM0prrEDkfW5p4WtrlN9Eg7bU"
      commit('GLOBAL_MUTATION_MCHTNO', data.merchantNo)
      commit('GLOBAL_MUTATION_TOKEN', data.accessToken)
      commit('GLOBAL_MUTATION_MOBILE', data.loginMobile)
      return data
    })
  },

  // 获取商户信息
  getMchtInfo ({ commit }, params = {}) {
    return handleRequest('api.querymerchant')(params, {isTip:true})
    .then((res={}) => {
      let data = res.data
      commit('HOME_MUTATION_MCHTINFO', data)
      return data
    })
  },

  // 注册
  register ({ commit }, params = {}) {
    return handleRequest('api.register')(params, {isLoading:true})
    .then((res={}) => {
      let data = res.data
      commit('GLOBAL_MUTATION_MCHTNO', data.merchantNo)
      commit('GLOBAL_MUTATION_TOKEN', data.accessToken)
      commit('GLOBAL_MUTATION_MOBILE', params.loginUser)
      return data
    })
  },

  // 登录
  login ({ commit }, params = {}) {
    return handleRequest('api.login')(params, {isLoading:true})
    .then((res={}) => {
      let data = res.data
      commit('GLOBAL_MUTATION_MCHTNO', data.merchantNo)
      commit('GLOBAL_MUTATION_TOKEN', data.accessToken)
      commit('GLOBAL_MUTATION_MOBILE', data.loginMobile)
      return data
    })
  },

  // 退出登录
  logout ({ commit }, params = {}) {
    return handleRequest('api.logout')(params, {isLoading:true})
    .then((res={}) => {
      return res
    })
  },

  // 实名认证
  realname ({ commit }, params = {}) {
    return handleRequest('api.realname')(params, {isLoading:true})
    .then((res={}) => {
      return res.data
    })
  },

}

export default {
  state,
  mutations,
  actions
}