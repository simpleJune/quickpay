<template>
	<label class="weui-cell weui-check__label iBox-bankcard-item" @click="onClickCardItem">
	  <div class="weui-cell__bd">
	      <p class="icon-x"
	      	:style="{backgroundImage: 'url(' + card_bg_icon + ')'}"
      	>
	      	{{options.bankName+"("+options.showName+")"}}
	      </p>
	  </div>
	</label>
</template>

<script>
const CARDS_LIST = [
  // RED
  "1", //中国银行
  "2", //工商银行
  "6", //中信银行
  "8", //华夏银行
  "10", //广发银行
  "12", //招商银行
  "14", //北京银行

  // BLUE
  "4", //建设银行
  "50", //上海银行
  "13", //兴业银行
  "5", //交通银行
  "51", //浦发银行

  // GREEN
  "3", //农业银行
  "26", //邮政银行
  "9", //民生银行

  // PURPLE
  "7", //光大银行

  // ORANGE
  "11" //平安银行
]

export default {
	name: "bankcard-item",
	props: {
		options: {
			type: Object,
			default: {},
			required: true
		}
	},
	computed: {
		card_bg_icon() {
			// let bankIcon = CARDS_LIST.includes(this.options.unitedBankNo+"")? this.options.unitedBankNo:"x"
			return require('~assets/images/bank/bankcard_'+ this.options.unitedBankNo + '.png')
		}
	},
	methods: {
		onClickCardItem() {
			this.$emit("on-click-item", this.options)
		}
	}
}
</script>

<style lang="less">
@import "~assets/less/base/variable";

@bankcard-item-icon-width: 32/@unit;
@bankcard-item-height: 32/@unit;

.iBox-bankcard-item {
	* {
		font-size: @font-size-16;
	}
	.icon-x {
		height: @bankcard-item-height;
	  line-height: @bankcard-item-height;
	  padding-left: 36/@unit;
	  background-size: @bankcard-item-icon-width auto;
	  background-repeat: no-repeat;
	  background-position-x: left;
	  background-position-y: center;
	}

}
</style>