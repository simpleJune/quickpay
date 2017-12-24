// 选择银行store
const state = {
  // title bar
  bankSelectObj: {}
}

const mutations = {
  UPDATE_CREDITCARD_BANK_SELECTED_OBJ (state, payload) {
    state.bankSelectObj = payload
  }
}

export default {
  state,
  mutations
}