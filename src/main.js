// 导入Vue和vue插件
import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync' // 同步路由到store
// import NProgress from 'nprogress'; // 进度条
// import 'nprogress/nprogress.css'; // 进度条样式
// import VueScroller from 'vue-scroller' // 无限加载

// vux 全局组件
import { LoadingPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
// Vue.use(VueScroller)

// 自定义插件
import iBoxPlugin from '~plugins/iBox'
Vue.use(iBoxPlugin)

// 加载必要的第三方库文件
require('~common/lib-flexible')
// require('~common/Ajax')
// require('es6-promise').polyfill()

const FastClick = require('fastclick')
FastClick.attach(document.body)

// 导入App入口文件
import App from './App'
import { store } from '~store'
import router from '~routes'
import { filters } from '~filters'

sync(store, router)

// 路由解析开始
/*router.beforeEach((to, from, next) => {
  // 开启顶部进度条
  NProgress.start();
  next()
})*/

// 路由解析结束
/*router.afterEach((to, from) => {
  // 关闭顶部进度条
  NProgress.done();
})*/

// 应用启动
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
