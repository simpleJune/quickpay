<!--
  Created by ZhouShengGuo on 2017-11-23 10:40:16
-->
<template>
  <div class="plan-add__container">
    <div class="plan-add__preview">
      <div class="plan-add__row">
        <section class="amount-title vux-1px-b">
          <p class="amount-text">计划还款金额</p>
          <p class="amount-money">&yen; {{resultData.payAmount | formatMoney}}</p>
        </section>
        <section class="amount-list">
          <p><span>待还款银行卡</span><span>{{bank_name}}</span></p>
          <p><span>保证金</span><span>&yen; {{resultData.firstCharge | formatMoney}}</span></p>
          <p><span>手续费</span><span>&yen; {{(resultData.sumFeeAmt) | formatMoney}}</span></p>
          <p><span>还款开始日期</span><span>{{resultData.beginDate}}</span></p>
          <p><span>还款结束日期</span><span>{{resultData.endDate}}</span></p>
        </section>
      </div>
    </div>

    <group>
      <cell is-link title="查看还款计划" link="/plan/view"></cell>
    </group>

    <div class="plan-add__btn">
      <x-button type="primary" class="btn"
        action-type="button"
        link="/plan/verify"
        :disabled="!status"
      >核实无误，确定添加计划</x-button>
    </div>

    <div class="plan-add__row">
      <p class="tips">点击按钮确定添加计划则默认同意该还款计划</p>
    </div>
  </div>
</template>

<script>
import { XButton, Group, Cell } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'repayment-plan',
  components: {
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      status: true
    }
  },
  computed: {
    ...mapState({
      cardItem: state => state.home.cardItem,
      resultData: state => state.plan.resultData
    }),
    bank_name() {
      return this.cardItem.bankName + "(尾号" + this.cardItem.showName + ")"
    }
  }
}

</script>
<style lang="less">
@import '~assets/less/views/planAdd';
</style>