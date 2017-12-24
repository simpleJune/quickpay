// 制定信用卡还款计划页面组件
const planApp = resolve => require(['~views/plan/app.vue'], resolve) // 信用卡还款首页
const planIndex = resolve => require(['~views/plan/index.vue'], resolve) // 信用卡还款首页

// 新增
const planAddStep1 = resolve => require(['~views/plan/add-step-1.vue'], resolve) // 添加还款计划 - 第一步
const planAddStep2 = resolve => require(['~views/plan/add-step-2.vue'], resolve) // 添加还款计划 - 第二步
const planAddStep3 = resolve => require(['~views/plan/add-step-3.vue'], resolve) // 添加还款计划 - 第二步
const planView = resolve => require(['~views/plan/view.vue'], resolve) // 查看还款计划
const planVerify = resolve => require(['~views/plan/verify.vue'], resolve) // 验证短信码并提交还款计划
const planDetail = resolve => require(['~views/plan/detail.vue'], resolve) // 计划详情


// 制定信用卡还款计划页面路由配置
export default [
  {
    path: '/plan',
    name: 'planApp',
    component: planApp,
    redirect: '/plan/index',
    children:[
      { path: 'index', name:'planIndex', component: planIndex, meta: { title: '定制还款计划' } },
      { path: 'add-step-1', name:'planAddStep1', component: planAddStep1, meta: { title: '定制还款计划' } },
      { path: 'add-step-2', name:'planAddStep2', component: planAddStep2, meta: { title: '定制还款计划' } },
      { path: 'add-step-3', name:'planAddStep3', component: planAddStep3, meta: { title: '定制还款计划' } },
      { path: 'view', name:'planView', component: planView, meta: { title: '查看计划详情' } },
      { path: 'verify', name:'planVerify', component: planVerify, meta: { title: '手机号验证' } },
      { path: 'detail', name:'planDetail', component: planDetail, meta: { title: '计划详情' } }
    ]
  }
]