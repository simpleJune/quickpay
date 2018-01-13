/*
  Created by ZhouShengGuo on 2017-12-05 16:34:07
*/
import  handleRequest  from '~common/API.js'

const state = {
  recordList: [] // 账本记录
}

const mutations = {
  // GET_BILL_TRADE_RECORDS(state, payload) {
  //   state.recordList = payload.resultList
  // }
}

const actions = {
  getBillTradeRecords({ commit, state }, payload = {}) {
    return handleRequest('billUrl.queryTradeRecords')(payload)
      .then(res => {
        /*if (!reload) {
          let { resultList } = res
          if(resultList.length) {
            resultList = resultList.concat(state.recordList)
            commit('GET_BILL_TRADE_RECORDS', { resultList })
          }
        }else {
          commit('GET_BILL_TRADE_RECORDS', res)
        }*/
        return res
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
