const billApp = resolve => require(['~views/bill/app.vue'], resolve)
const billIndex = resolve => require(['~views/bill/index.vue'], resolve)
const billDetail = resolve => require(['~views/bill/detail.vue'], resolve)

export default [
  {
    path: '/bill',
    name: 'billApp',
    component: billApp,
    redirect: '/bill/index',
    children:[
      { path: 'index', name:'billIndex', component: billIndex, meta: { title: '交易记录', keepAlive:true } },
		  { path: 'detail', name: 'billDetail', component: billDetail, meta: {title: '交易详情'} },
    ]
  }
]
