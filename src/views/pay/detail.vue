<!--
  Created by ZhouShengGuo on 2017-11-28 17:51:04
-->
<template>
  <div>
    <div class="plan-detail" v-if="plan.planStatus !== 0">
      <group :title="title"></group>
      <div class="main">
        <p class="amount">还款金额(元)</p>
        <p class="money">{{ plan.repayAmtTotal | formatMoney }}</p>
        <flexbox class="plan-detail__container" :gutter="0">
          <flexbox-item class="card-item vux-1px-r">
            <p class="wrapper ">
              <span>已还款</span><br/>
              <span>{{ plan.repayAmt | formatMoney }}</span>
            </p>
          </flexbox-item>
          <flexbox-item class="card-item vux-1px-r">
            <p class="wrapper">
              <span>已消费</span><br/>
              <span>{{ plan.expendAmt | formatMoney }}</span>
            </p>
          </flexbox-item>
          <flexbox-item class="card-item vux-1px-r">
            <p class="wrapper">
              <span>手续费(已扣)</span><br/>
              <span>{{ plan.feeAmt | formatMoney }}</span>
            </p>
          </flexbox-item>
          <img :src="getIcon(plan.planStatus)" class="plan-icon" />
        </flexbox>
      </div>
      <group :title="plan_title"></group>
      <div class="plan-detail__list">
       <section class="detail-item" v-for="(item, index) in plan.plans" :key="index">
          <flexbox
            :gutter="0"
            class="detail-item-wrapper"
            :class="{'vux-1px-b': index!== (plan.plans.length - 1)}"
            justify="spaceBetween"
          >
            <flexbox-item class="left" :span="2/3">
              <p>
                <span>{{ item.amt | formatMoney }}</span><br/>
                <span>{{ item.runTime }} {{ item.planType === '0' ? '还款' : '消费' }}</span>
              </p>
            </flexbox-item>
            <flexbox-item class="right" :span="1/3" :class="{'gold-color': item.status != 0}" >
              {{
                item.planType == '0' ? (item.status == '0' ? '已还款' : '待还款') :
                ( item.status == '0' ? '已消费' : '待消费')
              }}
            </flexbox-item>
          </flexbox>
       </section>
      </div>
    </div>
    <v-result iconType="success" v-else>
        <section class="v-result__bd" slot="resultTips">
          <p class="state">正在审核中</p>
          <p class="info">我们将在1个工作日内进行审核请耐心等待</p>
        </section>
    </v-result>
  </div>
</template>

<script>
import { Group, Flexbox, FlexboxItem } from 'vux'
import VResult from '~components/VResult'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'plan-detail',
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    VResult
  },
  data() {
    return {
      /*plan: {
        planStatus : '1',
        bankName: '工商银行信用卡',
        creditCardNo: '1234',
        beginDate: '',
        payAmt: '100000',
        expendAmt: '50000',
        feeAmt: '50000',
        plans: []
      }*/
      plan: {
        planStatus : '',
        bankName: '',
        creditCardNo: '',
        beginDate: '',
        payAmt: '',
        expendAmt: '',
        feeAmt: '',
        repayInfo: '',
        expendInfo: '',
        plans: []
      }
    }
  },
  computed: {
    title() {
      const { bankName, cardNo } = this.getCard(this.plan)
      return `${bankName || ''}(尾号${cardNo || ''})`
      // return `${this.plan.bankName || ''}(尾号${this.plan.cerditCardId || ''})`

    },
    plan_title() {
      return `还款计划(还款 ${this.plan.repayInfo}，消费${this.plan.expendInfo})`
    },
    ...mapState({
      creditCardList: state => state.global.creditCardList
    })
  },
  methods: {
    getIcon(state) {
      switch (state) {
        case '0':
          return require('~assets/less/icon/icon-plan-commited@3x.png')
        case '1':
          return require('~assets/less/icon/icon-plan-on@3x.png')
        case '2':
          return require('~assets/less/icon/icon-plan-finished@3x.png')
        case '3':
          return require('~assets/less/icon/icon-plan-close@3x.png')
        default:
          return require('~assets/less/icon/none.png')
      }
    },
    getCard(plan) {
      const { cerditCardId = '' } = plan
      let card = this.creditCardList.find(el => el.userCardId === cerditCardId)
      return card ?
        { cardNo: card.cardNo.slice(-4), bankName: card.bankName }
          :
        { cardNo: '****' , bankName: '' }
    },
    ...mapActions(['getRepaymentDetail'])
  },
  mounted() {
    const { query: { planNo, userCardId } } = this.$route
    this.getRepaymentDetail({ planNo, userCardId })
    .then(res => {
      const { resultData } = res
      this.plan = resultData
    })
    .catch(err => {})
  }
}
</script>

<style lang="less" scoped>
@import "~assets/less/base/function.less";
@import "~assets/less/base/common.less";

@font-color-amount: #8C8C8C;
@font-size-money: 20/@unit;
@font-color-gold: #FFBE00;

.plan-detail {
  p {
    line-height: 22/@unit;
  }
  .main {
    background-color: #FFF;
    padding: 20/@unit 0;
    position: relative;
    overflow: hidden;
    text-align: center;
    .amount {
      font-size: @font-size-13;
      color: @font-color-amount;
    }
    .money {
      font-size: @font-size-money;
      margin-top: 5/@unit;
    }
  }
  .plan-icon {
    position: absolute;
    top: -30/@unit;
    right: -30/@unit;
    width: 120/@unit;
    height: 120/@unit;
  }
  .deal-result {
    .result-content {
      p {
        line-height: 21/@unit;
        height: 21/@unit;
        text-align: center;
      }
      .state {
        font-size: 16/@unit;
        color: @font-color-black;
      }
      .info {
        font-size: 14/@unit;
        color: @font-color-amount;
        margin-top: 6/@unit;
      }
    }
  }
}

.plan-detail__list {
  margin-bottom: 20/@unit;
  .detail-item {
    background-color: #FFF;
    padding-left: 16/@unit;
    text-align: left;
  }
  .detail-item-wrapper {
    padding: 11/@unit 16/@unit 11/@unit 0;
    box-sizing: border-box;
    .left {
      p {
        >span:first-child {
          font-size: @font-size-15;
          color: @font-color-black;
        }
        >span:last-child {
          color: @font-color-amount;
          font-size: @font-size-13;
          margin-top: 2/@unit;
        }
      }
    }
    .right {
      text-align: right;
      font-size: @font-size-15;
      color: @font-color-gray-light;
    }
    .gold-color {
      color: @font-color-gold;
    }
  }
}
.plan-detail__container {
  margin-top: 15/@unit;
  .card-item {
    height: 49/@unit;
    &:after {
      height: 27/@unit;
      margin-top: 11/@unit;
    }
    .wrapper{
      text-align: center;
      position: relative;
      span {
        display: inline-block;
        &:first-child {
          font-size: @font-size-12;
          color: @font-color-amount;
        }
        &:last-child {
          font-size: @font-size-15;
          margin-top: 5/@unit;
        }
      }
    }
  }
}

</style>
