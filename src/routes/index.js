import Vue from 'vue'   //引入vue
import VueRouter from 'vue-router'   //引入vue-router

import HomeRouter from '~routes/home/router'
import PlanRouter from '~routes/plan/router'
import BillRouter from '~routes/bill/router'
import BankRouter from '~routes/bank/router'
import PublicRouter from '~routes/public/router'
import SettingsRouter from '~routes/settings/router'

const routes = [
  ...HomeRouter,
  ...PlanRouter,
  ...BillRouter,
  ...BankRouter,
  ...PublicRouter,
  ...SettingsRouter
]

const router = new VueRouter({
  saveScrollPosition: true, //  保存页面切换的位置滚动
  routes: routes
})

// 处理Android物理键的返回事件
/*window.onBack = function () {
  // 路由跳转配置
  const backConfig = {
    // 需要退出快捷收款的路由
    exitRoutes: [
      'home'
    ],
    backHomeRoutes: [
      "planAddStep1",
      "public404",
      "publicResult",
    ]
  };
  // 当前路由
  const routeName = window.router.app.$route.name;
  backConfig.exitRoutes.includes(routeName) && Vue.iBox.cashbox.exit();
  backConfig.backHomeRoutes.includes(routeName) && Vue.$router.replace({name:"home"});
};*/


Vue.use(VueRouter)

export default router
