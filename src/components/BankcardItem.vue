<template>
	<div class="comp-bankcard-item vux-1px-b" @click="$emit('on-click-item', options)">
		<div class="comp-bankcard-item__lt">
			<p class="card-name">
				{{options.creditBankName + "(" + options.creditAccountNo + ")"}} 
			</p>
		</div>
		<i class="card-icon-sm" :style="{backgroundImage: 'url(' + card_icon_sm + ')'}"></i>
	</div>
</template>

<script>
export default {
	name: "comp-bankcard-item",
	props: {
		options: {
			type: Object,
			default: {},
			required: true
		}
	},
  computed: {
    card_icon_sm() {
      return require('~assets/images/bank/bankcard_'+ (this.options.unitedBankNo||"x") + '.png')
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

// bankCard
.comp-bankcard-item {
  width: 100%;
  height: 46/@unit;
  line-height: 46/@unit;
  position: relative;
  >i {
    display: block;
    position: absolute;
    width: 46/@unit;
    height: inherit;
    left:0; top:0;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: auto 100%;
    background-position: center center;
  }
  &.vux-1px-b {
    &:after {
      left: 16/@unit;
    }
  }
}

.comp-bankcard-item__lt {
  padding-left: 46/@unit;
  >p {
    color: @font-color-black;
  }

}
</style>