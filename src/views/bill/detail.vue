<!--
  Created by ZhouShengGuo on 2017-11-28 13:59:08
-->
<template>
  <div class="history-detail">
    <div class="detail-info vux-1px-b">
      <i class="ibox-icon" :class="getIconClass(record.status)"></i>
      <p class="desc">
        <span>{{ record.status | formatStautsText }}</span><br/>
        <span v-if="record.status === 1">
          我们将在1个工作日内完成交易请耐心等待
        </span>
        <span v-else-if="record.status === 2">
          {{ record.tradeErrDesc }} {{ record.tradeErrCode }}
        </span>
      </p>
    </div>
    <div class="order-info">
      <p>
        <span>交易流水号</span>
        <span>{{ record.tradeNo }}</span>
      </p>
      <p>
        <span>交易金额</span>
        <span>&yen; {{ record.txAmt | formatMoney }}</span>
      </p>
      <p v-if="!!record.feeAmt">
        <span>手续费</span>
        <span>&yen; {{ record.feeAmt | formatMoney }}</span>
      </p>
       <p v-else-if="!!record.expectFeeAmt">
        <span>预计手续费</span>
        <span>&yen; {{ record.expectFeeAmt | formatMoney }}</span>
      </p>
      <p>
        <span>交易银行卡</span>
        <span>{{ record.bankName }}(尾号{{ record.cardNo }})</span>
      </p>
      <p>
        <span>交易时间</span>
        <span>{{ record.tradeTime }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history-detail',
  data() {
    return {
      /*record: {
        id: '1',
        tradeNo: '142354354654765',
        tradeType: '1', //交易类型 1: 还款 2: 消费
        status: 0 , // 交易状态 0: 成功 1:未知 2: 失败
        tradeErrCode: '',
        tradeErrDesc: '',
        txAmt: '100',
        expectFeeAmt: '', // 预计手续费(分)
        feeAmt: '10', //  手续费(分)
        bankName: '中国工商银行',
        cardNo: '4321', // 卡号（后四位）
        tradeTime: '2017-10-21 12:22' // 交易时间
      }*/
      record: {}
    }
  },
  filters: {
    formatStautsText(status = 0) {
      switch (status) {
        case 0 :
          return '交易成功'
        case 1 :
          return '正在处理中'
        case 2 :
          return '交易失败'
        default :
          return '正在处理中'
      }
    }
  },
  methods: {
    getIconClass(status) {
      switch (status) {
        case 0 :
          return 'result-success'
        case 1 :
          return 'result-audit'
        case 2 :
          return 'result-fail'
        default :
          return 'result-audit'
      }
    }
  },
  mounted() {
    const { params: { record } }  = this.$route
    this.record = record
  }
}

</script>

<style lang="less">
@import '~assets/less/base/function';
@import '~assets/less/base/common';

.history-detail {

  .detail-info {
    text-align: center;
    margin: 0 auto;
    margin-top: 93/@unit;
    width: 315/@unit;
    padding-bottom: 40/@unit;

    & i {
      display: inline-block;
      width: 120/@unit;
      height: 120/@unit;
      position: relative;
    }

    .desc {
      font-size: 16/@unit;
      color:  @font-color-black;
      line-height: 21/@unit;
      text-align: center;

      & :last-child {
        font-size: 14/@unit;
        color: #8C8C8C;
        margin-top: 6/@unit;
      }
    }
  }

  .order-info {
    & p {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 12/@unit;
      color: #424242;
      line-height: 15/@unit;
      width: 315/@unit;
      margin: 0 auto;
      margin-top: 20/@unit;
    }
  }
}

</style>