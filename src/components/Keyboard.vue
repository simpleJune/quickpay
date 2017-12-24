<template>
  <div :class="['iBox-keyboard', options.show? 'iBox-keyboard_toggle' : '']" @click="onClickKeyboard">
    <grid v-show="type==='number'" class="iBox-keyboard__num">
      <i data-num="1" class="weui-grid">1</i>
      <i data-num="2" class="weui-grid">2</i>
      <i data-num="3" class="weui-grid">3</i>
      <i data-num="4" class="weui-grid">4</i>
      <i data-num="5" class="weui-grid">5</i>
      <i data-num="6" class="weui-grid">6</i>
      <i data-num="7" class="weui-grid">7</i>
      <i data-num="8" class="weui-grid">8</i>
      <i data-num="9" class="weui-grid">9</i>
      <i data-num="." class="weui-grid">.</i>
      <i data-num="0" class="weui-grid">0</i>
      <i data-num="del" class="weui-grid"></i>
    </grid>
  </div>
</template>

<script>
import { Grid } from 'vux'

export default {
  components: {
    Grid,
  },
  props: {
    type: {
      type: String,
      default: 'number'
    },
    options: {
      type: Object,
      default: {
        show: false,
        value: ""
      },
      required: true
    }
  },
  methods: {
    onClickKeyboard(evt) {
      const target = evt.target
      if(target.nodeName.toLowerCase() === "i") {
        let value = this.options.value
        let num = target.getAttribute("data-num")
        if(num === "del") {
          this.$emit('on-key-del', num)
        } else {
          if(
            /\.\d{2}$/.test(value) ||
            (num == "." && /\./.test(value))
          ) {
            return
          }
          this.$emit('on-key-input', num)
        }
      }
    },
    onTouchKeyboard(evt) {
      console.log("=============Optimization point: components/keyboard.vue-1")
      // this.$tabbar = document.querySelector('.weui-tabbar')

      // 判断是否点击了键盘自身
      let target = evt.target;
      if(/weui-grid/ig.test(target.getAttribute("class"))) return;

      let opts = this.options,
          attr_id_reg = /^J_keyboard-(.*)$/ig,
          attr_id =  target.getAttribute("id") || "";

      if(attr_id_reg.test(attr_id)) {
        this.$emit("on-key-display", true, RegExp.$1)
      } else {
        this.$emit("on-key-display", false, null)
      }
    }
  },
  created() {
    document.addEventListener("touchstart", this.onTouchKeyboard)
  },
  destroyed() {
    document.removeEventListener("touchstart", this.onTouchKeyboard)
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

@keyboard-bgColor-white: @bgColor-white;
@keyboard-bgColor-active: @bgColor-gray;
@keyboard-font-size: @font-size-14;

// 虚拟键盘
.iBox-keyboard {
  width: 101%;
  height: auto;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1001;
  background-color: @keyboard-bgColor-white;
  overflow: hidden;
  margin: 0 -1px -1px;
  transition: transform .3s;
  transform: translate(0, 100%);
}

//actionSheet aniamtion
.iBox-keyboard_toggle {
    transform: translate(0, 0);
}

.iBox-keyboard__num {
  width: 100%;
  height: auto;
  &:before {
    z-index: 2;
    border-color: @border-color;
  }
  i {
    padding: 0;
    height: 4*@keyboard-font-size;
    line-height: 4*@keyboard-font-size;
    font-size: 2*@keyboard-font-size;
    background-color: @keyboard-bgColor-white;
    font-style: normal;
    text-align: center;

    &:before,
    &:after {
      z-index: 2;
      border-color: @border-color;
    }
    &:active {
      background-color: @keyboard-bgColor-active;
    }
  }
  i[data-num="del"] {
    background: @bgColor data-uri("~assets/less/icon/del@2x.png") no-repeat center center;
    background-size: 22% auto;
    &:active {
      background-color: @keyboard-bgColor-active;
    }
  }
}

</style>
