// DEMO
const public404 = resolve => require(['~views/public/404.vue'], resolve) // not-found-404
const publicResult = resolve => require(['~views/public/result.vue'], resolve) // 状态结果页

// 路由配置
export default [
	{ path: '*', name: 'public404', component: public404, meta: {title: '页面不存在'} },
  { path: '/public/result', name: 'publicResult', component: publicResult, meta: {title: '操作结果'} }
]
