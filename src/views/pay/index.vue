<template>
  <div class="page-pay">
    <h4>{{mchtInfo.merchantName}}</h4>
    <div class="page-row">
      <div id="J_keyboard-payAmt" class="page-row__input">
        <span class="txt">
          <em>消费金额(&yen;)</em>
        </span>
        <span :class="['number', keyboardOptions.show? 'twinkle':'']">{{keyboardOptions.value}}</span>
      </div>
      <div class="page-row">
        <p class="tips">单笔最高2万，当天最高5万</p>
      </div>
    </div>

    <keyboard type="pay"
      :options="keyboardOptions"
      @on-key-input="onKeyInput"
      @on-key-del="onKeyDel"
      @on-key-submit="onKeySubmit"
      @on-key-display="onKeyDisplay"
    ></keyboard>
  </div>
</template>

<script>
import Vue from 'vue'
import { XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import Keyboard from '~components/Keyboard'

// 判断对象的所有值为非空
const notNull = function(obj) {
  var flag = true;
  for(let k in obj) {
    if(obj.hasOwnProperty(k)) {
      let val = obj[k]
      if(val === "") {
        flag = false
        break;
      }
    }
  }
  return flag
}

// 元 => 分
const Yfen = Vue.iBox.helper.Yfen

export default {
  components: {
    XButton,
    Keyboard
  },
  data () {
    return {
      loading: false,
      // 当前页选项
      pageOptions: {
        status: false, //按钮loading
      },
      keyboardOptions: {
        show: false,
        value: "",
        count: 6,
        toggle: true
      }
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.home.mchtInfo
    })
  },
  methods: {
    ...mapActions([
      'getDeposit',
      'getpayBasicsInfo',
      'getRepaymentpay'
    ]),
    onKeyInput(val) {
      this.keyboardOptions.value += val
    },
    onKeyDel(val) {
      this.keyboardOptions.value = this.keyboardOptions.value.replace(new RegExp(".$", "g"), "")
    },
    onKeyDisplay(val, key) {
      this.keyboardOptions.show = val
    },
    onKeySubmit(val) {
      console.log("onKeySubmit", val)
      this.$router.push({name:"payChannel", params:{tradeAmount:val}})
    },
    doNext(evt) {
      if(/loading/ig.test(evt.target.className)) return
      this.pageOptions.status = true
      this.getRepaymentpay(this.postData)
      .then(res => {
        this.$router.push({name:"payAddStep2"})
      }).catch(err => {
        this.pageOptions.status = false
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.keyboardOptions.show = true
    }, 100);
  }
}
</script>

<style lang="less">
@import '~assets/less/views/public';

.page-pay {
  >h4 {
    line-height: 1.4em;
    text-align: center;
    padding: 0.8em;
  }
  p.tips {
    margin-top: 25/@unit;
  }
}

.page-row__input {
  height: 36/@unit;
  line-height: 36/@unit;
  padding: 10/@unit;
  border: 1px solid @border-color;
  border-radius: 5/@unit;
  background-color: @bgColor-white;
  box-shadow: 0 2px 3px 0 @border-color;
  >span {
    display: block;
    float: left;
    height: inherit;
    line-height: inherit;
  }
  .txt {
    color: @font-color-gray;
    &.warn {
      color: @font-color-red;
    }
    >em {
      font-style: normal;
      font-size: 1.8*@font-size-10;
    }
  }
  .number {
    width: auto;
    font-size: 3.2*@font-size-10;
    position: relative;
    padding: 0 5/@unit;
    float: right;
    &.twinkle {
      &:after {
        content: " ";
        display: block;
        right: 0;
        .iBox-fn__alignV(1, 28);
        background-color: @bgColor-yellow;
        animation: twinkle .8s infinite;
      }
    }
  }
}
</style>