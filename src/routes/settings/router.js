// 制定信用卡还款计划页面组件
const settingsApp = resolve => require(['~views/settings/app.vue'], resolve) // 设置
const settingsIndex = resolve => require(['~views/settings/index.vue'], resolve) // 商户信息
const settingsBank = resolve => require(['~views/settings/bank.vue'], resolve) // 银行卡管理
const settingsBankAdd = resolve => require(['~views/settings/bank-add.vue'], resolve) // 添加信用卡
const settingsCard = resolve => require(['~views/settings/card.vue'], resolve) // 修改结算卡
const settingsMobile = resolve => require(['~views/settings/mobile.vue'], resolve) // 修改手机号
const settingsPwd = resolve => require(['~views/settings/pwd.vue'], resolve) // 重置密码
const settingsPwdPay = resolve => require(['~views/settings/pwd-pay.vue'], resolve) // 重置支付密码
const settingsPwdPayAdd = resolve => require(['~views/settings/pwd-pay-add.vue'], resolve) // 初次设置支付密码

// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/settings',
    name: 'settingsApp',
    component: settingsApp,
    redirect: '/settings/index',
    children:[
      { path: 'index', name:'settingsIndex', component: settingsIndex, meta: { title: '我的' } },
      { path: 'bank', name:'settingsBank', component: settingsBank, meta: { title: '银行卡' } },
      { path: 'bank-add', name:'settingsBankAdd', component: settingsBankAdd, meta: { title: '新增银行卡' } },
      { path: 'card', name:'settingsCard', component: settingsCard, meta: { title: '修改结算银行卡' } },
      { path: 'mobile', name:'settingsMobile', component: settingsMobile, meta: { title: '修改手机号' } },
      { path: 'pwd', name:'settingsPwd', component: settingsPwd, meta: { title: '重置登录密码' } },
      { path: 'pwd-pay', name:'settingsPwdPay', component: settingsPwdPay, meta: { title: '重置支付密码' } },
      { path: 'pwd-pay-add', name:'settingsPwdPayAdd', component: settingsPwdPayAdd, meta: { title: '设置支付密码' } }
    ]
  }
]