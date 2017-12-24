// 制定信用卡还款计划页面组件
const bankApp = resolve => require(['~views/bank/app.vue'], resolve) // 信用卡还款首页
const bankIndex = resolve => require(['~views/bank/index.vue'], resolve) // 信用卡还款首页
const bankAdd = resolve => require(['~views/bank/add.vue'], resolve) // 添加
const bankEdit = resolve => require(['~views/bank/edit.vue'], resolve) // 修改

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/bank',
    name: 'bankApp',
    component: bankApp,
    redirect: '/bank/index',
    children:[
      { path: 'index', name:'bankIndex', component: bankIndex, meta: { title: '银行卡' } },
      { path: 'add', name:'bankAdd', component: bankAdd, meta: { title: '添加银行卡', useCustomHeader: true } },
      { path: 'edit/:isEdit/:userCardId', name:'bankEdit', component: bankEdit, meta: { title: '银行卡信息', useCustomHeader: true } }
    ]
  }
]