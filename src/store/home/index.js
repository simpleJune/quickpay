/*
  Created by ZhouShengGuo on 2017-12-07 09:43:09
*/
import handleRequest from '~common/API'

const state = {
  openId: "",
}

const mutations = {
  // openId
  HOME_MUTATION_OPENID (state, payload) {
    state.openId = payload
  }
}

const actions = {
  // 获取微信端openId
  getOpenId ({ commit }, params = {}) {
    return handleRequest('api.getopenid')(params, {isLoading:true})
    .then((res={}) => {
      let data = res.data
      commit('HOME_MUTATION_OPENID', data.openId) //||"o5hnM0prrEDkfW5p4WtrlN9Eg7bU"
      commit('GLOBAL_MUTATION_MCHTNO', data.merchantNo)
      commit('GLOBAL_MUTATION_TOKEN', data.accessToken)
      return data
    })
  },

  // 注册
  register ({ commit }, params = {}) {
    return handleRequest('api.register')(params, {isLoading:true})
    .then((res={}) => {
      return res
    })
  },

  // 登录
  login ({ commit }, params = {}) {
    return handleRequest('api.login')(params, {isLoading:true})
    .then((res={}) => {
      return res
    })
  },

  // 退出登录
  logout ({ commit }, params = {}) {
    return handleRequest('api.logout')(params, {isLoading:true})
    .then((res={}) => {
      return res
    })
  },
}

export default {
  state,
  mutations,
  actions
}