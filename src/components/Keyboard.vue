<template>
  <div :class="['comp-keyboard', options.show? 'comp-keyboard_toggle' : '']" @click="onClickKeyboard">
    <grid v-if="type==='number'" class="comp-keyboard__num">
      <i data-num="1" class="weui-grid">1</i>
      <i data-num="2" class="weui-grid">2</i>
      <i data-num="3" class="weui-grid">3</i>
      <i data-num="4" class="weui-grid">4</i>
      <i data-num="5" class="weui-grid">5</i>
      <i data-num="6" class="weui-grid">6</i>
      <i data-num="7" class="weui-grid">7</i>
      <i data-num="8" class="weui-grid">8</i>
      <i data-num="9" class="weui-grid">9</i>
      <i data-num="" class="weui-grid"></i>
      <i data-num="0" class="weui-grid">0</i>
      <i data-num="del" class="weui-grid"></i>
    </grid>
    <grid v-if="type==='pay'" class="comp-keyboard__pay">
      <div class="comp-keyboard__left">
        <div class="comp-keyboard__num">
          <i data-num="1" class="weui-grid">1</i>
          <i data-num="2" class="weui-grid">2</i>
          <i data-num="3" class="weui-grid">3</i>
          <i data-num="4" class="weui-grid">4</i>
          <i data-num="5" class="weui-grid">5</i>
          <i data-num="6" class="weui-grid">6</i>
          <i data-num="7" class="weui-grid">7</i>
          <i data-num="8" class="weui-grid">8</i>
          <i data-num="9" class="weui-grid">9</i>
          <i data-num="down" class="weui-grid"></i>
          <i data-num="0" class="weui-grid">0</i>
          <i data-num="." class="weui-grid">.</i>
        </div>
      </div>
      <div class="comp-keyboard__right">
        <div class="comp-keyboard__txt">
          <i data-num="del" class="weui-grid"></i>
          <i data-num="submit" class="weui-grid"></i>
        </div>
      </div>
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
        show: false, // 显示键盘
        toggle: true, // 键盘伸缩
        value: "", // 输入值
        count: 6 // 有效位数
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
        } else if(num === "down") {
          this.$emit("on-key-display", false, null)
        } else if(num === "submit") {
          this.$emit('on-key-submit', value)
        } else {
          let numPreCountReg = new RegExp(`^\\d{${this.options.count}}$`)
          // console.log(value, numPreCountReg.test(value))
          // if(num === "." && /\./.test(value)) {
          //   return;
          // } else if(numPreCountReg.test(value)) {
          //   return;
          // } else {
          //   this.$emit('on-key-input', num)
          // }
          if(
            numPreCountReg.test(value) || // 限制6位数字
            /\.\d{2}$/.test(value) || // 限制2位小数
            (num == "." && /\./.test(value)) // 只能输入一个"."
          ) {
            return
          }
          this.$emit('on-key-input', num)
        }
      }
    },
    onTouchKeyboard(evt) {
      // console.log("=============Optimization point: components/keyboard.vue-1")
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
    this.options.toggle && document.addEventListener("touchstart", this.onTouchKeyboard)
  },
  destroyed() {
    this.options.toggle && document.removeEventListener("touchstart", this.onTouchKeyboard)
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

@keyboard-bgColor-white: @bgColor-white;
@keyboard-bgColor-active: @bgColor-gray;
@keyboard-font-size: @font-size-14;
@keyboard-cell-height: 4*@keyboard-font-size;

// 虚拟键盘
.comp-keyboard {
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
  i[data-num="del"] {
    background: @bgColor data-uri("~assets/less/icon/del@2x.png") no-repeat center center;
    background-size: 22% auto;
    &:active {
      background-color: @keyboard-bgColor-active;
    }
  }
  i[data-num="down"] {
    background: transparent data-uri("~assets/less/icon/keypad@2x.png") no-repeat center center;
    background-size: 26% auto;
    &:active {
      background-color: @keyboard-bgColor-active;
    }
  }
}

//actionSheet aniamtion
.comp-keyboard_toggle {
    transform: translate(0, 0);
}

.comp-keyboard__left {
  float: left;
  width: 75%;
}

.comp-keyboard__right {
  width: 25%;
  float: right;
}

.comp-keyboard__num {
  width: 100%;
  height: auto;
  &:before {
    z-index: 2;
    border-color: @border-color;
  }
  i {
    padding: 0;
    height: @keyboard-cell-height;
    line-height: @keyboard-cell-height;
    font-size: 2*@keyboard-font-size;
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
}

.comp-keyboard__txt {
  >i {
    width: 100%;
    overflow: hidden;
    &:first-child {
      height: @keyboard-cell-height;
      background-color: transparent;
      background-size: 28% auto;
    }
    &:last-child {
      padding: 0;
      height: 3*@keyboard-cell-height;
      background: @bgColor-yellow url("~assets/less/icon/confirm.png") scroll no-repeat center center;
      // >em {
      //   font-style: normal;
      //   display: block;
      //   width: 1.2em;
      //   height: auto;
      //   text-align: center;
      //   margin: 0 auto;
      //   color: @font-color-white;
      //   font-size: 2.4*@font-size-10;
      // }
      &:active {
        background-color: #ff7600;
      }
    }
  }
}

</style>
