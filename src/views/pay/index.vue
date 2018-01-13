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
        <ul class="list">
          <li :class="{red:pageOptions.tips1}">1. 最低输入金额{{pageOptions.min}}元</li>
          <li :class="{red:pageOptions.tips2}">2. 单笔最高{{pageOptions.max|moneyFormatter}}，当天最高{{pageOptions.total|moneyFormatter}}</li>
        </ul>
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
        min: 100, // 最小输入金额
        max: 20000, // 最大输入金额
        total: 50000, // 当日总交易额
        status: false, 
        tips1: false, // 提示1
        tips2: false, // 提示2
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
  watch: {
    "keyboardOptions.value": function(newVal, oldVal) {
      this.pageOptions.tips1 = false
      this.pageOptions.tips2 = false
      if(parseInt(newVal) > 20000) {
        this.pageOptions.tips2 = true
      }
    }
  },
  filters: {
		moneyFormatter (val) {
			let amt = parseInt(val)
			return amt>=10000? (amt/10000 + "万"): (amt + "")
		}
	},
  methods: {
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
      parseInt(val||"0") < 100 && (this.pageOptions.tips1 = true)
      if(
        this.pageOptions.tips1 === true ||
        this.pageOptions.tips2 === true
      ) {
        return;
      }
      let params = {
        tradeAmount: val
      }
      this.$store.commit("PAY_MUTATION_FIELD", params)
      this.$router.push({name:"payChannel"})
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
  margin-top: 15/@unit;
  >h4 {
    line-height: 1.4em;
    text-align: center;
    padding: 0.8em;
  }
  ul.list {
    margin-top: 10/@unit;
    margin-left: -10/@unit;
    font-size: 1.2*@font-size-10;
    >li.red {
      color: @font-color-red;
    }
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