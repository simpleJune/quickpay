// 银行卡
const bankApp = resolve => require(['~views/bank/app.vue'], resolve) // bank app
const bankIndex = resolve => require(['~views/bank/index.vue'], resolve) // 银行卡管理
const bankAdd = resolve => require(['~views/bank/add.vue'], resolve) // 添加银行卡

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/bank',
    name: 'bankApp',
    component: bankApp,
    redirect: '/bank/index',
    children:[
      { path: 'index', name:'bankIndex', component: bankIndex, meta: { title: '银行卡' } },
      { path: 'add', name:'bankAdd', component: bankAdd, meta: { title: '新增银行卡' } }
    ]
  }
]