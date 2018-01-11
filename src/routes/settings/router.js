// 制定信用卡还款计划页面组件
const settingsApp = resolve => require(['~views/settings/app.vue'], resolve) // 设置
const settingsIndex = resolve => require(['~views/settings/index.vue'], resolve) // 商户信息
const settingsCard = resolve => require(['~views/settings/card.vue'], resolve) // 修改结算卡
const settingsMobile = resolve => require(['~views/settings/mobile.vue'], resolve) // 修改手机号
const settingsPwd = resolve => require(['~views/settings/pwd.vue'], resolve) // 重置密码
const settingsPwdCheck = resolve => require(['~views/settings/pwd-check.vue'], resolve) // 密码修改前验证
const settingsPwdPay = resolve => require(['~views/settings/pwd-pay.vue'], resolve) // 重置支付密码

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/settings',
    name: 'settingsApp',
    component: settingsApp,
    redirect: '/settings/index',
    children:[
      { path: 'index', name:'settingsIndex', component: settingsIndex, meta: { title: '我的' } },
      { path: 'card', name:'settingsCard', component: settingsCard, meta: { title: '修改结算银行卡' } },
      { path: 'mobile', name:'settingsMobile', component: settingsMobile, meta: { title: '修改手机号' } },
      { path: 'pwd', name:'settingsPwd', component: settingsPwd, meta: { title: '重置登录密码' } },
      { path: 'pwd-check', name:'settingsPwdCheck', component: settingsPwdCheck, meta: { title: '信息验证' } },
      { path: 'pwd-pay', name:'settingsPwdPay', component: settingsPwdPay, meta: { title: '设置支付密码' } }
    ]
  }
]