// iBoxPlugin
import Utils from "~common/Utils"
import API from "~common/API"

export default {
	/**
	 * 自定义方法
	 * 组件内使用：this.$iBox.validator
	 * 全局使用：Vue.iBox.validator
	 */
	install(Vue) {
		const iBox = {
			...Utils,
			api: API
		}

		// const $ = require("exports-loader?window.$!script-loader!~common/zepto/zepto")

		// console.log($)

		// iBox.utils = require('~common/Utils')
		// iBox.cashbox = require('~common/Cashbox').cashbox
		// iBox.api = require('~common/API').API

		Vue.iBox = iBox
		Vue.prototype.$iBox = iBox
	}
}