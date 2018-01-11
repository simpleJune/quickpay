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
  // 请求参数header
  headerParams: {
    accessToken: '', // 用户token
    merchantNo: '', // 商户编号
    loginMobile: '', // 登录手机号
    sysSource: 'H5', // 来源
    channel: '微信', // 渠道
    partnerCode: '10050', // 机构编号
    clientIP: '127.0.0.1' // 客户端IP
  },
  // 微信授权跳转地址
  authorizeUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base#wechat_redirect"
}

const mutations = {
  // token
  GLOBAL_MUTATION_TOKEN(state, payload) {
    state.headerParams.accessToken = payload
  },
  // merchantNo
  GLOBAL_MUTATION_MCHTNO (state, payload) {
    state.headerParams.merchantNo = payload
  },
  // loginMobile
  GLOBAL_MUTATION_MOBILE (state, payload) {
    state.headerParams.loginMobile = payload
  },
}

const actions = {
  // 根据token获取信用卡列表
  sendSmsCode ({ commit }, params = {}) {
    return handleRequest('api.mobile')(params)
    .then(res => {
      return res
    })
  },

  // 获取省份信息
  getProvince ({ commit }, params = {}) {
    return handleRequest('api.province')(params)
    .then((res={}) => {
      return res.data
    })
  },

  // 获取市区
  getCity ({ commit }, params = {}) {
    return handleRequest('api.city')(params)
    .then((res={}) => {
      return res.data
    })
  },

  // 获取行业类型
  getIndustry ({ commit }, params = {}) {
    return handleRequest('api.industry')(params)
    .then((res={}) => {
      return res.data
    })
  },

  // 获取卡宾
  getCardbin ({ commit }, params = {}) {
    return handleRequest('api.cardbin')(params)
    .then((res={}) => {
      return res.data
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
  // 获取headerParams
  getHeaderParams (state) {
    return state.headerParams;
  }
}

export default {
	state,
	mutations,
  actions,
  getters
}