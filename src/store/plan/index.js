/*
  Created by ZhouShengGuo on 2017-12-07 09:43:09
*/
import handleRequest from '~common/API'

const state = {
  cardItem: {},
  resultData: {}
}

const mutations = {
  // 当前所选的银行卡
  PLAN_MUTATION_SET_CARD (state, payload) {
    state.cardItem = payload
  },
  // 制定还款计划
  PLAN_MUTATION_SET_REPAYMENT (state, payload) {
    state.resultData = payload
  }
}

const actions = {
  // 获取保证金
  getDeposit({}, params) {
    return handleRequest('planUrl.getDeposit')(params)
    .then(res => {
      return res
    })
  },
  // 制定自动还款计划
  getRepaymentPlan({ commit }, params) {
    return handleRequest('planUrl.getRepaymentPlan')(params)
    .then(res => {
      commit('PLAN_MUTATION_SET_REPAYMENT', res.resultData||{})
      return res
    })
  },
  // 开始制定自定义自动还款计划
  getCustomRepaymentPlan({ }, params) {
    return handleRequest('planUrl.getCustomRepaymentPlan')(params)
    .then(res => {
      return res
    })
  },
  // 提交还款计划
  submitRepaymentPlan({ dispatch }, params) {
    return handleRequest('planUrl.submitRepaymentPlan')(params)
    .then(res => {
      dispatch("getCreditCardList")
      return res
    })
  },
  // 查询计划明细
  getRepaymentPlans({}, params) {
    return handleRequest('planUrl.queryRepaymentPlans')(params, { isLoading: true })
    .then(res => {
      return res
    })
  },
  // 查询计划详情
  getRepaymentDetail({}, params) {
    return handleRequest('planUrl.queryRepaymentPlanDetail')(params, { isLoading: true })
    .then(res => {
      return res
    })
  },
  // 查询计划制定基础信息
  getPlanBasicsInfo({}, params) {
    return handleRequest('planUrl.getPlanBasicsInfo')(params, { isLoading: true })
    .then((res={}) => {
      return res.resultData || {}
    })
  }
}

export default {
  state,
  mutations,
  actions
}