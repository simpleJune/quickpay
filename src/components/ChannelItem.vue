<template>
	<div class="comp-channel-item" @click="$emit('on-click-item', options)">
		<group>
			<cell-box is-link>
				<div class="comp-channel-item__container">
					<h3 class="title">{{options.channelName}}</h3>
					<ul class="list">
						<li class="settleTypeDesc">{{options.settleTypeDesc}}</li>
						<li>额度：
							{{options.minTradeMoney|moneyFormatter}}-{{options.maxTradeMoney|moneyFormatter}}/笔，
							当天最高{{options.dayLimitMoney|moneyFormatter}}
						</li>
						<li>费率：{{options.merchantRate}}</li>
					</ul>
					<p class="tips">提示：交易时间为 {{options.tradeStartTime|timeFormatter}} ~ {{options.tradeEndTime|timeFormatter}}</p>
				</div>
			</cell-box>
		</group>
	</div>
</template>
<script>
import { Group, CellBox  } from 'vux'

export default {
	name: "comp-channel-item",
	components: {
		Group,
		CellBox 
	},
	data () {
		return {
			tips: "交易时间为学校"
		}
	},
	props: {
		options: {
			type: Object,
			default: {
				minTradeMoney: 10000
			},
			required: true
		},
		computed: {

		},
		methods: {
		}
	},
	filters: {
		timeFormatter (val) {
			return val? val.replace(/^(\d{2})(\d{2})(\d{2})$/, "$1:$2:$3"):""
		},
		moneyFormatter (val) {
			let amt = parseInt(val)
			return amt>=10000? (amt/10000 + "万"): (amt + "")
		}
	}
}
</script>

<style lang="less">
@import "~assets/less/base/variable";

.comp-channel-item__container {
	display: block;
	.title {
		color: @font-color-yellow;
	}
	.list {
		padding: 5/@unit 0;
		>li {
			color: @font-color-gray;
			&.settleTypeDesc {
				color: @font-color-black;
			}
		}
	}
	.tips {
		color: @font-color-red;
		font-size: 1.3*@font-size-10;
	}
}
</style>