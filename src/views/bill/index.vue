<template>
  <div class="page-bill">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      :noDataText="noDataText"
      class="scroller"
    >
      <div class="history-list">
        <section class="history-item" v-for="(item, index) in orderList" :key="item.id" @click="onClickItem(item)">
          <section class="history-item-wrapper" :class="{'vux-1px-b': index !== (orderList.length - 1)}">
            <section class="left">
              <p class="title">{{ item.creditBankName }}({{ item.creditAccountNo }})</p>
              <p class="desc">{{ item.paymentDate }}</p>
            </section>
            <section class="right">
              <a class="state">
                <b>&yen; {{ item.tradeAmount | formatMoney }}</b>
                <span class="state" :class="getStateClass(item.tradeStatus)">{{ item.tradeStatus | formatStatusText }}</span>
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

import Vue from 'vue'
import VueScroller from 'vue-scroller' // 无限加载

Vue.use(VueScroller)

export default {
  name: 'page-bill',
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      orderList: []
    }
  },
  computed: {
    noDataText() {
      return this.orderList.length>0 ? "没有啦~":"暂无任何交易记录"
    }
  },
  filters: {
    formatStatusText(status) {
      switch (status) {
        case 1 :
          return '失败'
        case 2 :
          return '成功'
        case 3 :
          return '处理中'
        default :
          return ''
      }
    }
  },
  methods: {
    getStateClass(status) {
      switch (status) {
        case 1 :
          return 'fail'
        case 2 :
          return 'success'
        case 3 :
          return 'loading'
        default :
          return ''
      }
    },
    refresh(done) {
      this.pageIndex = 1
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      this.getOrderlist(params)
      .then(res => {
        let { orderList } = res
        this.orderList = orderList
        done()
      })
      .catch(err => {
        done(true)
      })
    },
    infinite(done) {
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex++
      }
      // let r = this.orderList
      // let pageIndex = 0 in r ? r[r.length - 1].id : ''
      // pageIndex && (params.pageIndex = pageIndex)
      this.getOrderlist(params)
      .then(res => {
        let { orderList, pageIndex } = res
        if(!orderList.length) {
          done(true)
        } else {
          this.orderList = this.orderList.concat(orderList)
          done()
        }
      })
      .catch(err => {
        done(true)
      })
      // console.log("infinite", this.orderList)
    },
    onClickItem(item) {
      // 交易状态
      // 1-交易失败 2-交易成功 3-交易处理中
      let status = item.tradeStatus
      status !== undefined && 
      status != 1 && 
      this.$router.push({
        name:"publicResult", 
        query:{platformTradeNo:item.platformTradeNo}
      })
    },
    ...mapActions([
      'getOrderlist'
    ])
  },
  destroyed() {
    this.pageSize = 10
    this.pageIndex = 1
    this.orderList = []
  }
}

</script>

<style lang="less">
@import '~assets/less/base/common';

.page-bill {
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