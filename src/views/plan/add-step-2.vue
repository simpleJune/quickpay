<template>
  <div class="plan-add__container">
    <!--设置还款保证金-->
    <div class="plan-add__preview">
      <div class="plan-add__row">
        <section class="amount-title vux-1px-b">
          <p class="amount-text">实付还款本金(含手续费)</p>
          <p class="amount-money">&yen; {{planResult.firstCharge|formatMoney}}</p>
        </section>
        <section class="amount-list">
          <p>
            <span>还款手续费</span>
            <span>{{planResult.payAmount|formatMoney}}*{{planResult.rateValue|rateFormatter}}={{planResult.feeAmt|formatMoney}}</span>
          </p>
          <p>
            <span>本金支付手续费</span>
            <span>{{planResult.firstCharge|formatMoney}}*{{planResult.rateValue|rateFormatter}}={{planResult.firstFeeAmt|formatMoney}}</span>
          </p>
          <p>
            <span>合计手续费</span>
            <span>{{planResult.feeAmt|formatMoney}}+{{planResult.firstFeeAmt|formatMoney}}={{planResult.sumFeeAmt|formatMoney}}</span>
          </p>
        </section>
      </div>
    </div>

    <!--选择支付信用卡-->
    <group>
      <cell is-link
        title="支付银行卡"
        :value="pageOptions.cardItem._bankName"
        @click.native="onClickSelectBank"
      ></cell>
    </group>

    <!--tips-->
    <div class="plan-add__row">
      <dl class="list">
        <dt>提示：</dt>
        <dd>1. 请确保支付银行卡中剩余信用额度&yen;{{planResult.firstCharge|formatMoney}}以上。</dd>
        <dd>2. 确定计划后，将从支付银行卡扣除&yen;{{planResult.firstCharge|formatMoney}}用于还款。</dd>
        <dd>3. 计划完成后，将退回还款本金&yen;{{planResult.deposit|formatMoney}}到支付银行卡。</dd>
        <dd>4. 由于银行扣费采用四舍五入的方式，故计划完成后会有几分钱的差额，实际手续费以账单展示为准。</dd>
      </dl>
    </div>

    <!--提交下一步-->
    <div class="plan-add__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!isActive"
        :show-loading="pageOptions.status"
        @click.native="doNext"
      >下一步</x-button>
    </div>

    <!--选择银行卡下拉框-->
    <slidebox v-model="slideboxOptions.show"
      :options="slideboxOptions"
    >
      <div class="weui-cells weui-cells_radio">
        <div class="slidebox-bankcard__bd">
          <!--有效银行卡-->
          <bankcard-item
            v-for="(cardItem, cardIdx) in card_list_valid"
            :key="cardIdx"
            :options="cardItem"
            @on-click-item="onClickCardItem"
          ></bankcard-item>
          <!--无效银行卡-->
          <bankcard-item class="invalid"
            v-for="(cardItem, cardIdx) in card_list_invalid"
            :key="cardIdx"
            :options="cardItem"
          ></bankcard-item>
        </div>
      </div>
    </slidebox>
  </div>
</template>

<script>
import { Group, Cell, CellBox, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import Keyboard from '~components/Keyboard'
import Slidebox from '~components/Slidebox'
import BankcardItem from '~components/BankcardItem'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    XButton,
    Slidebox,
    BankcardItem,
  },
  data () {
    return {
      loading: true,
      // 当前页选项
      pageOptions: {
        status: false,
        cardItem: {}
      },
      // 下拉框选项
      slideboxOptions: {
        show: false, // 是否显示下拉框
        title: "选择支付方式",
      }
    }
  },
  computed: {
    ...mapState({
      creditCardList: state => state.globalStore.creditCardList || [],
      planResult: state => state.plan.resultData
    }),
    isActive() {
      return true
    },
    card_list_valid() {
      return this.creditCardList.filter((cardItem) => {
        return cardItem.status == "0"
      })
    },
    card_list_invalid() {
      return this.creditCardList.filter((cardItem) => {
        return cardItem.status == "2" || cardItem.status == "3" || cardItem.status == "4"
      })
    }
  },
  watch: {
    "pageOptions.cardItem": function(newVal, oldVal) {
      let cardItem = newVal
      cardItem._bankName = cardItem.bankName + "(尾号" + cardItem.showName + ")" // 带尾号的银行卡名
      this.$store.commit("PLAN_MUTATION_SET_CARD", cardItem)
    }
  },
  methods: {
    onClickSelectBank() {
      this.slideboxOptions.show = true
    },
    onClickCardItem(item) {
      this.slideboxOptions.show = false
      this.pageOptions.cardItem = item
    },
    doNext(evt) {
      this.$router.push({name:'planAddStep3'})
    }
  },
  mounted: function() {
    let cardItemInterval = setInterval(() => {
      let cardList = this.card_list_valid
      if(cardList.length>0) {
        clearInterval(cardItemInterval)
        this.pageOptions.cardItem = cardList[0]
      }
    }, 50)
  }
}
</script>

<style lang="less">
@import '~assets/less/views/planAdd';
</style>
