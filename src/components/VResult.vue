<template>
  <div class="v-result">
    <div class="result-img">
      <img :src="iconSrc">
    </div>
    <div class="result-tips">
      <slot name="resultTips"></slot>
    </div>
    <div class="result-btn">
      <x-button type="primary" @click.native="btnClick()">{{buttonText}}</x-button>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  export default {
    name: 'VResult',
    components: {
      XButton
    },
    props: {
      iconType: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: '我知道了'
      }
    },
    computed: {
      iconSrc () {
        switch (this.iconType) {
          case 'audit':
            return require('~assets/images/result/icon-audit@3x.png')
          case 'fail':
            return require('~assets/images/result/icon-fail@3x.png')
          case 'network':
            return require('~assets/images/result/icon-network@3x.png')
          case 'success':
            return require('~assets/images/result/icon-success@3x.png')
          case 'tips':
            return require('~assets/images/result/icon-tips@3x.png')
        }
      }
    },
    methods: {
      btnClick () {
        if(
          this.iconType === "tips" ||
          this.iconType === "fail"
        ) {
          this.$emit("on-click-result")
        } else if(this.iconType == "network") {
          this.$iBox.cashbox.exit()
        } else {
          this.$router.replace({name: 'home'})
        }
      }
    }
  }
</script>

<style lang="less">
@import '~assets/less/base/variable.less';

.v-result {
  position: absolute;
  left: 0; top:0; right:0; bottom: 0;
  background: @bgColor-white;
  .result-img {
    margin-top: 136/@unit;
    img {
      width: 120/@unit;
      display: block;
      margin: 0 auto;
    }
  }
  .result-tips {
    text-align: center;
    margin: 10/@unit 16/@unit 44/@unit 16/@unit;
  }
  .result-btn {
    margin: 0 16/@unit;
  }
}
.v-result__bd {
  >p {
    line-height: 21/@unit;
    height: 21/@unit;
    text-align: center;
    &.state {
      font-size: 16/@unit;
      color: @font-color-black;
    }
    &.info {
      font-size: 14/@unit;
      color: #8c8c8c;
      margin-top: 6/@unit;
    }
  }
}
</style>