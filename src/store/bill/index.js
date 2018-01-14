/*
  Created by ZhouShengGuo on 2017-12-05 16:34:07
*/
import  handleRequest  from '~common/API.js'

const state = {
  
}

const mutations = {
  // GET_BILL_TRADE_RECORDS(state, payload) {
  //   state.recordList = payload.resultList
  // }
}

const actions = {
  // 查询交易订单信息
  getOrderlist({ commit }, params) {
    return handleRequest('api.orderlist')(params, {isLoading:true})
    .then((res={}) => {
      return res.data
    })
  },

  // 查询订单详情
  getOrderdetail({ commit }, params) {
    return handleRequest('api.orderdetail')(params, {isLoading:true})
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
