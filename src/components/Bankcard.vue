<template>
	<div class="iBox-bankcard" @click="$emit('click')">
		<div class="iBox-bankcard__lt">
			<p class="card-name">{{options.creditBankName}} <em class="card-suffix">({{options.creditAccountNo}})</em></p>
		</div>
		<i class="card-icon-sm"><img :src="card_icon_sm" alt="icon"></i>
	</div>
</template>

<script>
export default {
	name: "bankcard",
	props: {
		options: {
			type: Object,
			default: {}
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
.iBox-bankcard {
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

.iBox-bankcard__lt {
  padding-top: 25/@unit;
  padding-left: 80/@unit;
  >p {
    height: 30/@unit;
    line-height: 30/@unit;
    color: @font-color-black;
  }

}

</style>