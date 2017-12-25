import  handleRequest  from '~common/API.js'

// 全局store
const state = {
  // title bar
	headerOptions: {
    // 退出到钱盒
    backToCashboxRoutes: [
      'home'
    ],
    // 退出到超级还款首页
    backToHomeRoutes: [
      "planAddStep1",
      "public404",
      "publicResult",
    ]
	},
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsIm5iZiI6MTUxMzkzNjU1NiwiZGF0YSI6eyJicmhObyI6IjAwMTAwMSIsIm1jaHRObyI6IjAwMTQ0MDM5NTAwNDk1OSIsInVzZXJQaG9uZSI6IjE4OTI3NDMwNzQyIiwidXNlcklkIjoyMDAwNTE3NX0sIm1jaHRObyI6IjAwMTQ0MDM5NTAwNDk1OSIsImlzcyI6Imlib3hwYXktbWNodC10b2tlbi1zZXJ2ZXIiLCJleHAiOjE1MTM5NjUzNTYsInVzZXJJZCI6MjAwMDUxNzUsImlhdCI6MTUxMzkzNjU1Nn0.NU6LASNxViEvMALFAHbuvk4lYTv4j3oHZY_wB6WvyI0',
  mchtInfo: {},
  creditCardList: []
}

const mutations = {
  // 重置header options到默认值
  GLOBAL_MUTATION_HEADER_RESET (state, options) {

  },
  // 设置token
  GLOBAL_MUTATION_SET_TOKEN (state, payload) {
    state.token = payload
  },
  // 获取用户信息
  GLOBAL_MUTATION_GET_MCHTIFNO (state, payload) {
    state.mchtInfo = payload
  },
  // 获取银行卡列表
  GLOBAL_MUTATION_GET_CREDITLIST (state, payload) {
    state.creditCardList = payload.resultList || []
  }
}

const actions = {
  // 发送验证码短信
  sendSmsCode ({ commit }, params = {}) {
    params.messageType = 'credit_center_code' // 公用钱盒信用卡参数
    params.subType = '9008' // 公用钱盒信用卡参数
    return handleRequest('globalUrl.sendSmsCode')(params)
  },
  // 根据token获取商户信息
  getMchtInfo ({ commit }, params = {}) {
    return handleRequest('baseUrl.getMchtInfo')(params, {isLoading:true})
    .then(res => {
      return res
    })
  },
  // 根据token获取信用卡列表
  getCreditCardList ({ commit }, params = {}) {
    return handleRequest('baseUrl.getCreditCardList')(params)
    .then(res => {
      commit('GLOBAL_MUTATION_GET_CREDITLIST', res)
      return res
    })
  },
  // 解绑信用卡
  unBindCreditCard({ commit, dispatch }, params = {}) {
    return handleRequest('baseUrl.unBindCreditCard')(params)
    .then(res => {
      return dispatch('getCreditCardList', params)
    })
  }
}

const getters = {
  // 获取当前执行环境
  getRuntime (state) {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("micromessenger") != -1) {
      return 'weixin';
    } else {
      return ""; // 其它
    }
  },
  // 获取token
  getToken (state) {
    return state.token;
  }
}

export default {
	state,
	mutations,
  actions,
  getters
}