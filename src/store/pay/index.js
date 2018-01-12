/*
  Created by ZhouShengGuo on 2017-12-07 09:43:09
*/
import handleRequest from '~common/API'

const state = {
  cardItem: {},
  resultData: {}
}

const mutations = {
  
}

const actions = {
  // 获取保证金
  getDeposit({}, params) {
    return handleRequest('planUrl.getDeposit')(params)
    .then(res => {
      return res
    })
  },
}

export default {
  state,
  mutations,
  actions
}