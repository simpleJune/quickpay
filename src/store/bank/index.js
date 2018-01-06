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
  // 添加信用卡
  addcreditcard({ commit }, params = {}) {
    return handleRequest('api.addcreditcard')(params, {isLoading:true})
      .then(res => {
        return res
      })
  }
}

export default {
  state,
  mutations,
  actions
}
