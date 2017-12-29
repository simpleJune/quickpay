<template>
	<div class="iBox-pwd">
    <flexbox
      :gutter="0"
      align="center"
    >
      <flexbox-item class="passwd"
      	v-for="(pwdKey, pwdIdx) in pwdLen"
        :key="pwdKey"
      >
      	<i class="iBox-icon__circle" v-if="value[pwdIdx]!==undefined"></i>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'

export default {
	name: "password",
	components: {
    Flexbox,
    FlexboxItem
  },
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			pwdLen: 6
		}
	}
}
</script>

<style lang="less">
@import "~assets/less/base/common";

.iBox-pwd {
  padding: 0 16/@unit;
  .passwd {
    height: 44/@unit;
    margin-right: -1px;
    border: 1px solid @border-color;
    background-color: @bgColor-white;
    >i {
    	display: block;
    	width: 20%;
    	height: inherit;
    	margin: 0 auto;
    }
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  &:before {
    border: 0 none;
  }
}
</style>