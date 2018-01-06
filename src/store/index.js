/**
 * vuex
 * 可以跨组件传递数据
 * 该实例将会加载所以自定义和来自插件的store, 调用的时候使用store[key]的方式来区分不同store
 * 例如: store.global.headerOptions
 *
 * mutations, actions定义的标识(事件名)请用大写+下划线的格式，如: GLOBAL_HEANDER_MENU_RESET
 * mutation默认支持从root触发，即 store.commit("GLOBAL_HEANDER_MENU_RESET")
 */

import Vue from 'vue'
import Vuex from 'vuex'
import global from '~store/Global'
import home from '~store/home'
import bill from '~store/bill'
import bank from '~store/bank'
import settings from '~store/settings'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    global,
    home,
    bill,
    bank,
    settings
  }
})

