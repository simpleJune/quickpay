// Home组件
const homeIndex = resolve => require(['~views/index.vue'], resolve) // index
const homeRegister = resolve => require(['~views/home/register.vue'], resolve) // 注册
const homeLogin = resolve => require(['~views/home/login.vue'], resolve) // 登录
const homeProfile = resolve => require(['~views/home/profile.vue'], resolve) // 商户认证

// Home Router
export default [
	{ path: '/', redirect: '/index' },
	// 首页
	{
		path: '/index',
		name: 'home',
		component: homeIndex,
		meta: { title: '超级还款', keepAlive:true }
	},
	// 推广注册
	{
		path: '/register',
		name: 'register',
		component: homeRegister,
		meta: { title: '新用户注册' }
	},
	// 登录
	{
		path: '/login',
		name: 'login',
		component: homeLogin,
		meta: { title: '登录' }
	},
	// 商户认证
	{
		path: '/profile',
		name: 'profile',
		component: homeProfile,
		meta: { title: '实名认证' }
	}
]
