<!--
  Created by ZhouShengGuo on 2017-11-28 09:57:31
-->
<template>
  <div class="repayment-history-index">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      :noDataText="noDataText"
      class="scroller"
    >
      <div class="history-list">
        <section class="history-item" v-for="(item, index) in recordList" :key="item.id" @click="onClickItem(item)">
          <section class="history-item-wrapper" :class="{'vux-1px-b': index !== (recordList.length - 1)}">
            <section class="left">
              <p class="title">{{ item.bankName }}(尾号{{ item.cardNo }})</p>
              <p class="desc">{{ item.tradeTime }} {{ item.tradeType === '1' ? '还款' : '消费'}}</p>
            </section>
            <section class="right">
              <a class="state">
                <b>&yen; {{ item.txAmt | formatMoney }}</b>
                <span class="state" :class="getStateClass(item.status)">{{ item.status | formatStatusText }}</span>
              </a>
            </section>
          </section>
        </section>
      </div>
    </scroller>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'repayment-history-index',
  data() {
    return {
     /* recordList: Array.from(new Array(10)).map((el, index)=> {
        let item =  {
          id: '1',
          tradeNo: '',
          tradeType: '1', //交易类型 1: 还款 2: 消费
          status: 0 , // 交易状态 0: 成功 1:未知 2: 失败
          tradeErrCode: '',
          tradeErrDesc: '',
          txAmt: '10000', // 交易金额（分）
          expectFeeAmt: '', // 预计手续费(分)
          feeAmt: '', //  手续费(分)
          bankName: '中国工商银行',
          cardNo: '4321', // 卡号（后四位）
          tradeTime: '2017-10-21 12:22' // 交易时间
        }
        index%2 === 0 && (item.status = 1 )
        index%3 === 0 && (item.status = 2 ) && (item.tradeType = 2)
        return item
      })*/
      recordList: []
    }
  },
  computed: {
    noDataText() {
      return this.recordList.length>0 ? "没有啦~":"暂无任何交易记录"
    }
  },
  filters: {
    formatStatusText(status = 0) {
      switch (status) {
        case 0 :
          return '已成功'
        case 1 :
          return '处理中'
        case 2 :
          return '已关闭'
        default :
          return '处理中'
      }
    }
  },
  methods: {
    getStateClass(status) {
      switch (status) {
        case 0 :
          return 'success'
        case 1 :
          return 'loading'
        case 2 :
          return 'fail'
        default :
          return 'loading'
      }
    },
    refresh(done) {
      let params = {
        pageSize: 10
      }
      this.getBillTradeRecords(params)
      .then(res => {
        let { resultList } = res
        // if(!resultList.length) {
        //   done(true)
        // }else {
          this.recordList = resultList
          done()
        // }
      })
      .catch(err => {
        done(true)
      })
    },
    infinite(done) {
      let params = {
        pageSize: 10
      }
      let r = this.recordList
      let lastId = 0 in r ? r[r.length - 1].id : ''
      lastId && (params.lastId = lastId)
      this.getBillTradeRecords(params)
      .then(res => {
        let { resultList } = res
        if(!resultList.length) {
          done(true)
        }else {
          this.recordList = this.recordList.concat(resultList)
          done()
        }
      })
      .catch(err => {
        done(true)
      })
      console.log("infinite", this.resultList)
    },
    onClickItem(item) {
      this.$router.push({name: 'billDetail', params: { record: item }})
    },
    ...mapActions(['getBillTradeRecords'])
  },
  destroyed() {
    this.recordList = []
  }
}

</script>

<style lang="less" scoped>
@import '~assets/less/base/function';

.repayment-history-index {
  .scroller {
    // padding-top: 44/@unit;
  }

  .history-list {
    margin: 20/@unit 0;
  }

  .history-item {
    padding-left: 16/@unit;
    background-color: #FFF;
  }

  .history-item-wrapper  {
    font-size: 15/@unit;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 11/@unit 16/@unit 11/@unit 0;

    .left, .right {
      flex: 1;
    }

    .left {
      .title {
        color: @font-color-black;
        line-height: 22/@unit;
      }
      .desc {
        font-size: 13/@unit;
        color: #8C8C8C;
        margin-top: 2/@unit;
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .state {

         & b {
          color: @font-color-black;
         }

        .state {
          font-size: 11/@unit;
          color: #FFF;
          margin-left: 8/@unit;
          display: inline-block;
          padding: 2/@unit 4/@unit;
          border-radius: 1.5px;
        }
        .success {
          background-color: rgba(15,194,99,0.6);
        }
        .loading {
          background-color: rgba(255,190,0,.7);
        }
        .fail {
          background-color: rgba(0,0,0,0.25);
        }

      }
    }
  }
}

</style>