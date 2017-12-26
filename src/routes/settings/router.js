// 制定信用卡还款计划页面组件
const settingsApp = resolve => require(['~views/settings/app.vue'], resolve) // 信用卡还款首页
const settingsIndex = resolve => require(['~views/settings/index.vue'], resolve) // 信用卡还款首页
const settingsBank = resolve => require(['~views/settings/bank.vue'], resolve) // 添加

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/settings',
    name: 'settingsApp',
    component: settingsApp,
    redirect: '/settings/index',
    children:[
      { path: 'index', name:'settingsIndex', component: settingsIndex, meta: { title: '我的' } },
      { path: 'bank', name:'settingsBank', component: settingsBank, meta: { title: '银行卡' } }
    ]
  }
]