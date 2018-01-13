<template>
	<div class="comp-bankcard-item" @click="$emit('on-click-item', options)">
		<div class="comp-bankcard-item__lt">
			<p class="card-name">
				{{options.creditBankName + "(" + options.creditAccountNo + ")"}} 
			</p>
		</div>
		<i class="card-icon-sm"><img :src="card_icon_sm" alt="icon"></i>
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
  height: 80/@unit;
  position: relative;
  overflow: hidden;
  padding: 5/@unit 0;
  border-radius: 5/@unit;
  box-shadow: 0 2/@unit 3/@unit 0 fade(@bgColor-gray, 90%);
  background-color: @bgColor-white;
  em {
    font-style: normal;
  }
  >i {
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    >img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  >i.card-icon-sm {
    width: 80/@unit;
    height: 80/@unit;
    left: 0;
    top: 5/@unit;
  }
}

.comp-bankcard-item__lt {
  padding-top: 25/@unit;
  padding-left: 80/@unit;
  >p {
    height: 30/@unit;
    line-height: 30/@unit;
    color: @font-color-black;
  }

}
</style>