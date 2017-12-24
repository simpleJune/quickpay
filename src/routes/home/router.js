// Home组件
const homeIndex = resolve => require(['~views/index.vue'], resolve) // index

// Home Router
export default [
	{ path: '/', redirect: '/index' }, // 默认首页
	{
		path: '/index',
		name: 'home',
		component: homeIndex,
		meta: { title: '超级还款', keepAlive:true }
	}
]
