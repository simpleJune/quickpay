import handleRequest from '~common/API'

const state = {
  fields: {}
}

const mutations = {
  PAY_MUTATION_FIELD (state, obj = {}) {
    for(let k in obj) {
      if(obj.hasOwnProperty(k)) {
        state.fields[k] = obj[k]
      }
    }
  },
}

const actions = {
  // 获取信用卡列表(支付方式)
  getCreditlist({ commit }, params) {
    return handleRequest('api.creditlist')(params)
    .then((res={}) => {
      return res.data
    })
  },
  
  // 获取通道列表
  getPaychannel ({ commit }, params = {}) {
    return handleRequest('api.paychannel')(params, {isLoading:true})
    .then((res={}) => {
      return res.data
    })
  },
  
  // 获取通道列表
  quickpay ({ commit }, params = {}) {
    return handleRequest('api.topay')(params, {isLoading:true})
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