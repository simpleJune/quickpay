<template>
  <div class="plan-add__container">
    <div class="plan-add__panel">
      <div class="plan-add__row">
        <h3>{{planCardItem.bankName}} (尾号{{planCardItem.showName}})</h3>
      </div>

      <div class="plan-add__row keyboard">
        <h4>待还款金额</h4>
        <div id="J_keyboard-payAmt" class="plan-add__input vux-1px-b">
          <i class="dollar"></i>
          <span :class="['number', pageOptions.payAmt.show? 'twinkle':'']">{{pageOptions.payAmt.value}}</span>
          <em class="txt" v-if="!warn_payAmt">
            支持金额:
            {{baseInfo.minValue|repayMoneyFormat("K")}}~{{baseInfo.maxValue|repayMoneyFormat("W")}}
          </em>
          <em class="txt warn" v-else>输入的金额超过{{mchtInfo.repayMaxMoney|repayMoneyFormat("W")}}</em>
        </div>
      </div>

      <div class="plan-add__row keyboard">
        <h4>计划支付还款本金</h4>
        <div id="J_keyboard-payAmt2" class="plan-add__input vux-1px-b">
          <i class="dollar"></i>
          <span :class="['number', pageOptions.payAmt2.show? 'twinkle':'']">{{this.pageOptions.payAmt2.value}}</span>
          <em class="txt" v-if="!warn_payAmt2">
            最低本金:
            <i class="page__loading" v-if="isLoading"></i>
            <b v-else>{{baseInfo.repaymentMinValue|formatMoney}}</b>
          </em>
          <em class="txt warn" v-else>输入的金额低于{{baseInfo.repaymentMinValue|formatMoney}}元</em>
        </div>
      </div>

      <div class="plan-add__row">
        <ul class="list">
          <li>还款计划起止日期（共{{baseInfo.countDay}}天）</li>
          <li>{{baseInfo.fromDate}}至{{baseInfo.toDate}}（节假日不支持还款）</li>
        </ul>
      </div>
    </div>

    <div class="plan-add__row">
      <dl class="list">
        <dt>提示：</dt>
        <dd>1. 还款本金是为了完成该笔还款所需支付的金额。</dd>
        <dd>2. 最低还款本金为账单金额的{{baseInfo.rateValue|rateFormatter}}，当还款周期小于{{baseInfo.days}}天时，最低还款本金由系统自动匹配。</dd>
      </dl>
    </div>

    <div class="plan-add__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!isActive"
        :show-loading="pageOptions.status"
        @click.native="doNext"
      >制定还款计划</x-button>
    </div>

    <keyboard type="number"
      :options="keyboardOptions"
      @on-key-input="onKeyInput"
      @on-key-del="onKeyDel"
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
      payAmtTimeout: null,
      baseInfo: {}, // 基础信息
      // 发送数据
      postData: {
        defaultDeposit: "1", //页面显示最小保证金
        deposit: "", //用户输入保证金
        payAmt: "", //待还款金额
        userCardId: "", //银行卡ID
        repayDate: "" //最后还款有效期
      },
      // 当前页选项
      pageOptions: {
        status: false, //按钮loading
        currentTarget: "payAmt",
        payAmt: {
          show: false,
          value: ""
        },
        payAmt2: {
          show: false,
          value: ""
        }
      }
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.global.mchtInfo,
        planCardItem: state => state.home.cardItem,
    }),
    /*payAmt2() {
      let formatMoney = this.filter("formatMoney")
      let repaymentMinValue = formatMoney(this.baseInfo.repaymentMinValue)
      return this.pageOptions.payAmt2.value||repaymentMinValue
    },*/
    warn_payAmt() {
      return false //Yfen(this.keyboardOptions.value) > Yfen(this.mchtInfo.repayMaxMoney)
    },
    warn_payAmt2() {
      // let val = Yfen(this.pageOptions.payAmt2.value)
      // let minVal = parseInt(this.baseInfo.repaymentMinValue)
      // let maxVal = Yfen(this.pageOptions.payAmt.value) || 10000000
      return false //val < minVal //&& val<=maxVal
    },
    isLoading: {
      get() {
        return this.loading
      },
      set(newVal) {
        this.loading = newVal
      }
    },
    isActive() {
      return (
        // notNull(this.postData) &&
        this.pageOptions.payAmt.value != "" &&
        this.pageOptions.payAmt2.value != "" &&
        !this.isLoading &&
        !this.warn_payAmt &&
        !this.warn_payAmt2
      )
    },
    keyboardOptions() {
      return this.pageOptions[this.pageOptions.currentTarget]
    }
  },
  watch: {
    "pageOptions.currentTarget": function(newVal, oldVal) {
      this.pageOptions[oldVal].show = false
    },
    "pageOptions.payAmt.value": function(newVal, oldVal) {
      this.payAmtTimeout && clearTimeout(this.payAmtTimeout)
      // 获取保证金
      if(newVal != "") {
        this.isLoading = true
        this.payAmtTimeout = setTimeout(() => {
          this.getDeposit({
            payAmt: Yfen(this.pageOptions.payAmt.value),
            repayDate: this.planCardItem.repayDate
          }).then(res => {
            this.isLoading = false
            this.baseInfo.repaymentMinValue = res.deposit
          }).catch(err => {
            this.isLoading = false
          })
        }, 300)
      }
    }
  },
  filters: {
    repayMoneyFormat(val="", flag) {
      flag == "K" && (val = parseInt(val.replace(/\d{2}$/, "")/1000) + "K")
      flag == "W" && (val = parseInt(val.replace(/\d{2}$/, "")/10000) + "W")
      return val
    }
  },
  methods: {
    ...mapActions([
      'getDeposit',
      'getPlanBasicsInfo',
      'getRepaymentPlan'
    ]),
    onKeyInput(val) {
      this.keyboardOptions.value += val
    },
    onKeyDel(val) {
      this.keyboardOptions.value = this.keyboardOptions.value.replace(new RegExp(".$", "g"), "")
    },
    onKeyDisplay(val, key) {
      key && (this.pageOptions.currentTarget = key)
      this.keyboardOptions.show = val
    },
    doNext(evt) {
      if(/loading/ig.test(evt.target.className)) return
      this.pageOptions.status = true
      this.postData.deposit = Yfen(this.pageOptions.payAmt2.value)
      this.postData.defaultDeposit = this.baseInfo.repaymentMinValue
      this.postData.payAmt = Yfen(this.pageOptions.payAmt.value)
      this.postData.userCardId = this.planCardItem.userCardId
      this.postData.repayDate = this.planCardItem.repayDate
      this.getRepaymentPlan(this.postData)
      .then(res => {
        this.$router.push({name:"planAddStep2"})
      }).catch(err => {
        this.pageOptions.status = false
      })
    }
  },
  created() {
    this.getPlanBasicsInfo({
      repayDate: this.planCardItem.repayDate
    }).then((res={}) => {
      this.baseInfo = res
      // !this.pageOptions.payAmt2.value && (this.pageOptions.payAmt2.value = (Number(res.repaymentMinValue)/100).toFixed(2)+"")
    })
  },
  mounted() {
    setTimeout(() => {
      this.keyboardOptions.show = true
    }, 100);
  }
}
</script>

<style lang="less">
@import '~assets/less/views/planAdd';
</style>