<template>
  <div class="comp-slidebox" v-if="show">
    <div :class="['weui-mask', show? 'weui-animate-fade-in':'weui-animate-fade-out']" @click="onClickClose"></div>
    <div :class="['comp-slidebox_container', show? 'weui-animate-slide-up':'weui-animate-slide-down']">
      <div class="comp-slidebox__hd vux-1px-b">
        <span class="close" @click="onClickClose">关闭</span>
        <span class="title"><em class="caption">{{options.title}}</em></span>
      </div>
      <div class="comp-slidebox__bd">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comp-slidebox',
  props: {
    value: Boolean,
    options: {
      type: Object,
      default: {},
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  methods: {
    onClickClose () {
      this.show = false
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

// slideBox
.comp-slidebox,
.comp-slidebox__hd,
.comp-slidebox__bd {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.comp-slidebox_container {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1001;
  background-color: @font-color-white;
  em {
    font-style: normal;
  }
}
.comp-slidebox__hd {
  line-height: 45/@unit;
  position: relative;
  >span {
    display: block;
    height: 45/@unit;
    text-align: center;
    &.close {
      position: absolute;
      left: 0;
      top: 0;
      width: 48/@unit;
      text-indent: -9999em;
      background: url("~assets/less/icon/close.png") scroll no-repeat center center;
      background-size: 30% auto;
    }
  }
  &.vux-1px-b {
    &:after {
      border-color: @border-color-gray;
    }
  }
}
.comp-slidebox__bd {
  max-height: 420/@unit;
  overflow: scroll;
  .weui-cells {
    margin-top: 0;
  }
  .weui-cell_link {
    &:before {
      border: 0 none;
    }
  }
  .invalid {
    opacity: .2
  }
}
</style>
