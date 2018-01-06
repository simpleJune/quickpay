import handleRequest from '~common/API.js'

const actions = {
  // 设置初始支付密码
  setpaypwd ({ commit }, params = {}) {
    return handleRequest('api.setpaypwd')(params, {isLoading:true})
    .then(res => {
      return res;
    })
  },
}

export default {
  actions
}