<template>
  <result 
    :icon="result_icon" 
    :title="result_title" 
    :desc="result.tradeStatusMsg" 
  >
    <!--结果展示详情-->
    <section class="comp-result__list" slot="result" v-if="result.tradeStatus==2">
      <p><span>付款方式</span><span>{{result.creditBankName+"("+result.creditAccountNo+")"}}</span></p>
      <p><span>交易流水</span><span>{{result.platformTradeNo}}</span></p>
      <p><span>交易时间</span><span>{{result.paymentDate}}</span></p>
    </section>
    <section class="comp-result__list" slot="result" v-if="result.tradeStatus==3">
      <p>处理中...</p>
    </section>
  </result>
</template>

<script>
import { XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import Result from '~components/Result'

// 提示小图标
const ICON_MAP = {
  "1": "warn",
  "2": "success",
  "3": "waiting"
};

// 状态标题
const title_MAP = {
  "1": "交易失败",
  "2": "支付成功",
  "3": "正在处理，请稍后..."
};

export default {
  name: 'public-result',
  components: {
    XButton,
    Result
  },
  data () {
    return {
      result: {}
    }
  },
  computed: {
    result_icon() {
      return ICON_MAP[this.result.tradeStatus + ""] 
    },
    result_title() {
      return title_MAP[this.result.tradeStatus + ""] 
    }
  },
  created () {
    let { platformTradeNo } = this.$route.query
    this.getOrderdetail({
      platformTradeNo: platformTradeNo //||"CZ201800000000103000"
    })
    .then((res={}) => {
      this.result = res
    })
  },
  methods: {
    ...mapActions ([
      'getOrderdetail'
    ])
  }
}
</script>

<<style lang="less">
@import "~assets/less/views/public";

.comp-result__list {
  font-size: @font-size-13;
  background-color: @bgColor-white;
  padding: 10/@unit 16/@unit;
  >p {
    line-height: 30/@unit;
    >span {
      &:first-child {
        float: left;
        color: @font-color-gray ;
      }
      &:last-child {
        float: right;
      }
    }
    .iBox-fn__clearfix()
  }
}
</style>
