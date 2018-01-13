// 制定信用卡还款计划页面组件
const payApp = resolve => require(['~views/pay/app.vue'], resolve) // 支付module
const payIndex = resolve => require(['~views/pay/index.vue'], resolve) // 支付首页
const payChannel = resolve => require(['~views/pay/channel.vue'], resolve) // 支付首页
const payConfirm = resolve => require(['~views/pay/confirm.vue'], resolve) // 支付首页

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/pay',
    name: 'payApp',
    component: payApp,
    redirect: '/pay/index',
    children:[
      { path: 'index', name:'payIndex', component: payIndex, meta: { title: '快捷收款' } },
      { path: 'channel', name:'payChannel', component: payChannel, meta: { title: '支付通道' } },
      { path: 'confirm', name:'payConfirm', component: payConfirm, meta: { title: '收款' } },
      // { path: 'add-step-3', name:'payAddStep3', component: payAddStep3, meta: { title: '定制还款计划' } },
      // { path: 'view', name:'payView', component: payView, meta: { title: '查看计划详情' } },
      // { path: 'verify', name:'payVerify', component: payVerify, meta: { title: '手机号验证' } },
      // { path: 'detail', name:'payDetail', component: payDetail, meta: { title: '计划详情' } }
    ]
  }
]