/**
 * my/router
 */

const myAccount = resolve => require(['~views/my/account.vue'], resolve)
const myProfit = resolve => require(['~views/my/profit.vue'], resolve)
// const myDetail = resolve => require(['~views/my/detail.vue'], resolve)

export default [
  { path: '/my/account', name:'myAccount', component: myAccount, meta: { title: '我的账户' } },
  { path: '/my/profit', name:'myProfit', component: myProfit, meta: { title: '我的分润' } },
]
