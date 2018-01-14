<template>
  <div class="comp-result">
    <div class="comp-result__hd">
      <icon class="icon" :type="icon" is-msg></icon>
      <h2 class="title">{{title}}</h2>
      <p class="desc">{{desc}}</p>
    </div>
    <div class="comp-result__bd">
      <slot name="result"></slot>
    </div>
    <div class="comp-result__ft">
      <x-button type="primary" @click.native="btnClick()">{{button}}</x-button>
    </div>

    <div hidden>
      <box gap="10px 10px">
        
        <icon type="info"></icon>
        <icon type="info-circle"></icon>
        <icon type="warn"></icon>
        <icon type="waiting"></icon>
        <icon type="waiting-circle"></icon>
        <icon type="safe-success"></icon>
        <icon type="safe_warn"></icon>
        <icon type="success-circle"></icon>
        <icon type="success-no-circle"></icon>
        <icon type="circle"></icon>
        <icon type="download"></icon>
        <icon type="cancel"></icon>
        <icon type="search"></icon>
        <icon type="clear"></icon>
        <br/>
        <icon type="success" is-msg></icon>
        <icon type="info" is-msg></icon>
        <icon type="warn" is-msg></icon>
        <icon type="waiting" is-msg></icon>
        <icon type="safe_success" is-msg></icon>
        <icon type="safe_warn" is-msg></icon>
      </box>
    </div>
  </div>
</template>
<script>
import { Box, Icon, XButton } from 'vux'

export default {
  name: 'comp-result',
  components: {
    XButton,
    Box, Icon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: '确定'
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  methods: {
    btnClick () {
      this.$router.replace({name: 'home'})
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/base/variable.less';

.comp-result {
  padding: 30/@unit 16/@unit;
}
.comp-result__hd {
  text-align: center;
  >.title {
    font-weight: normal;
    margin-top: 15/@unit;
  }
  >.desc {
    color: @font-color-gray;
  }
}
.comp-result__bd {
  margin: 24/@unit -16/@unit 44/@unit;
}
</style>