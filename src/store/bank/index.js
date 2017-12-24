import bankSelect from './BankSelect'
import handleRequest from '~common/API.js'

const bankActions = {
  actions: {
    // 更新选择银行卡的信息
    updateBankSelectObj ({ commit }, params = {}) {
      commit('UPDATE_CREDITCARD_BANK_SELECTED_OBJ', params)
    },
    // 获取银行信息
    bankGetBankInfo ({ commit }, params = {}) {
      return handleRequest('baseUrl.bankGetBankInfo')(params)
    },
    // 认证信用卡
    bankAuthCard ({ dispatch }, params = {}) {
      return handleRequest('baseUrl.bankAuthCard')(params)
        .then(res => {
          dispatch('getCreditCardList')
          return res
        })
    },
    // 添加信用卡
    bankAddCreditCard ({ dispatch }, params = {}) {
      return handleRequest('baseUrl.bankAddCreditCard')(params)
        .then(res => {
          if(res.status == "0"){
            dispatch('getCreditCardList')
          }
          return res
        })
    },
    // 修改信用卡
    bankEditCreditCard ({commit}, params = {}) {
      return handleRequest('baseUrl.bankEditCreditCard')(params)
    }
  }
}

export default {
  bankSelect,
  bankActions
}