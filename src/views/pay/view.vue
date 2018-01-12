<!--
  Created by ZhouShengGuo on 2017-11-23 17:51:12
-->
<template>
  <div class="plan-view">
    <p class="title">还款计划（共 {{ repayPlan.length }}笔）</p>
    <div class="plan-list">
      <section class="plan-item" v-for="(item, index) in repayPlan"  @click="() => selected = index">
        <section class="total">
          <section class="total-wrapper vux-1px-b">
            <p class="title">第{{index + 1}}笔</p>
            <p class="content">
              <span class="time">{{ item.runTime }}</span>
              <span class="money">+{{ item.amt | formatMoney }}</span>
            </p>
          </section>
        </section>
        <section class="detail" v-show="selected === index">
          <section class="detail-wrapper vux-1px-b">
            <p class="content" v-for="(expend, eindex) in item.expendPlan" :key="eindex">
              <span class="time">{{ expend.runTime }}</span>
              <span class="money">-{{ expend.amt | formatMoney }}</span>
            </p>
          </section>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'plan-view',
  data() {
    return {
      selected: ""
    }
  },
  computed: {
    ...mapState({
        repayPlan: state => state.plan.resultData.repayPlan || []
    })
  }
}
</script>

<style lang="less" scoped>
@import "~assets/less/base/variable.less";

.plan-view {
  >.title {
    font-size: 13/@unit;
    color: @font-color-gray;
    padding: 20/@unit 0 8/@unit 16/@unit;
  }
}
.plan-list {
  p {
    line-height: 20/@unit;
    height: 20/@unit;
  }
  .detail {
    background-color: #EFEFEF;
  }
}
.plan-item {
  background-color: #FFF;
  .total,
  .detail {
    padding-left: 16/@unit;
  }
  .total-wrapper,
  .detail-wrapper {
    padding: 10/@unit;
    padding-right: 16/@unit;
    >:last-child {
      margin-top: 8/@unit;
    }
    .title {
      font-size: 15/@unit;
      color: @font-color-black;
    }
    .content {
      display: flex;
      justify-content: space-between;
      font-size: 13/@unit;
      .time {
        color: #909090;
      }
      .money {
        color: @font-color-black;
      }
    }
  }
}
</style>