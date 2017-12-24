/*
  Created by ZhouShengGuo on 2017-12-07 09:43:09
*/
import handleRequest from '~common/API'

const state = {
  cardItem: {}
}

const mutations = {
  HOME_MUTATION_SET_CARD (state, payload) {
    state.cardItem = payload
  }
}

const actions = {
  getAdList({ commit, state }, params = {}, config = {}) {
    return handleRequest('adsUrl.getAdList')(params, {isTip:false})
      .then(res => {
        return res.adList || []
      })
  }
}

export default {
  state,
  mutations,
  actions
}