<!--
  Created by ZhouShengGuo on 2017-11-28 15:29:49
-->
<template>
  <div class="more-repayment-plan" v-show="isShow">
    <div class="plan-list" v-if="planList.length>0">
      <flexbox
        justify="spaceBetween"
        :gutter="0"
        class="plan-item"
        v-for="(item, index) in planList"
        :key="index"
        @click.native="onClickItem(item)"
        >
        <flexbox-item class="left" :span="2/3">
          <p class="title" :class="{'title-gray': item.status == '2' || item.status == '3'}">
            {{ getCard(item).bankName }}(尾号{{ getCard(item).cardNo  }})
          </p>
          <p class="desc"><span>还款 {{ item.repayInfo }}</span><span>消费 {{ item.expendInfo }}</span></p>
          <p class="time">{{ item.beginDate }}至{{ item.endDate }}</p>
        </flexbox-item :span="1/3">
        <flexbox-item class="right">
          &yen; {{ item.payAmt | formatMoney }}
        </flexbox-item>
        <img :src="getIcon(item.status)" class="plan-icon" />
      </flexbox>
    </div>
    <div v-else>
      <v-result iconType="tips" @on-click-result="onClickTips">
        <section class="v-result__bd" slot="resultTips">
          <p class="state">您还未开启还款计划，赶快去制定计划吧！</p>
        </section>
      </v-result>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group } from 'vux'
import { mapActions, mapState } from 'vuex'
import VResult from "~components/VResult"

export default {
  name: 'more-repayment-plan',
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    VResult
  },
  data() {
    return {
      /*planList: Array.from(new Array(10)).map((el, index) => {
        let item = {
          bankName: '农业银行信用卡',
          creditCardNo: '1234',
          payInfo: '0/12',
          expendInfo: '0/12',
          payAmt: '100000',
          status: '0', // 0:创建 1:进行中 2:已完成 3:异常结束
          planNo: '',
          beginDate: '2017-10-27',
          endDate: '2017-10-30'
        }
        index%2 == 0 && (item.status = '1')
        index%3 == 0 && (item.status = '2')
        index%4 == 0 && (item.status = '3')
        return item
      })*/
      isShow: false,
      tipOpts: {
        type: "info"
      },
      planList: []
    }
  },
  computed: {
    ...mapState({
      creditCardList: state => state.globalStore.creditCardList
    })
  },
  methods: {
    ...mapActions(['getRepaymentPlans']),
    getIcon(state) {
      switch (state) {
        case '0':
        case '4':
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
        { cardNo: '****' , bankName: '未知' }
    },
    onClickItem(item) {
      let { planNo } = item
      this.$router.push({ name:'planDetail', query:{ planNo } })
    },
    onClickTips() {
      this.$router.replace({ name:"home" })
    }
  },
  mounted() {
    this.getRepaymentPlans()
    .then(res => {
      let { resultData } = res
      this.planList = resultData
      this.isShow = true
    })
    .catch(err => {})
  }
}

</script>

<style lang="less" scoped rel="stylesheet/less">
@import "~assets/less/base/function.less";
@import "~assets/less/base/common.less";

@font-color-desc: #8C8C8C;
@font-size-20: 20/@unit;
.more-repayment-plan {
  .plan-list {
    margin: 20/@unit 0 40/@unit 0;
    .plan-item {
      padding: 21/@unit 16/@unit;
      background-color: #FFF;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      margin-top: 10/@unit;

      .left {
        p {
          line-height: 22/@unit;
        }
        .title {
          font-size: @font-size-15;
          color: @font-color-black;
        }
        .title-gray {
          color: @font-color-desc;
        }
        .desc, .time {
          color: @font-color-desc;
          font-size: @font-size-14;
          margin-top: 10/@unit;
        }
        .desc {
          :last-child {
            margin-left: 30/@unit;
          }
        }
      }

      .right {
        font-size: @font-size-20;
        text-align: right;
        z-index: 1;
      }

      .plan-icon {
        position: absolute;
        top: -30/@unit;
        right: -30/@unit;
        width: 120/@unit;
        height: 120/@unit;
      }
    }
  }
}

</style>