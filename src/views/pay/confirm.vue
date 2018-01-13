<template>
  <div class="page-pay__confirm">
    <div class="page-preview txt">
      <h1>&yen; {{fields.tradeAmount}}</h1>
      <p>{{mchtInfo.merchantName}}</p>
    </div>

    <group>
      <cell is-link title="支付方式" 
        :value="bank_name_full" 
        @click.native="onSelectBank"
      >
        <!-- <span class="vux-loading"></span> -->
      </cell>
      <x-input type="number" title="安全码" v-model="postData.safetyCode" placeholder="信用卡背面3位数字"></x-input>
      <x-input type="number" title="有效期" v-model="postData.validity" placeholder="示例：09/15 输入0915"></x-input>
    </group>

    <group>
      <x-input type="number" title="支付密码" v-model="postData.payPwd" placeholder="请输入6位数字支付密码"></x-input>
    </group>

    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >确认支付</x-button>
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
          <!--绑卡-->
          <cell is-link
            title="添加信用卡" 
            link="/bank/add"
          ></cell>
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
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Group, Cell, Radio , XInput, XButton, XTextarea, XAddress, Value2nameFilter as value2name } from 'vux'
import Keyboard from '~components/Keyboard'
import Slidebox from '~components/Slidebox'
import BankcardItem from '~components/BankcardItem'

// 元 => 分
const Yfen = Vue.iBox.helper.Yfen

export default {
  name: 'page-profile',
  components: {
    Group,
    Cell,
    Radio,
    XInput,
    XButton,
    Slidebox,
    BankcardItem
  },
  data () {
    return {
      creditList: [],
      postData: {
        channelCode: '',
        channelName: '',
        tradeAmount: '',
        bindId: '',
        safetyCode: '',
        validity: '',
        payPwd: '',
        remark: ''
      },
      pageOptions: {
        cardItem: {},
        isActive: true,
        isLoading: false
      },
      // 选择银行卡
      slideboxOptions: {
        show: false, // 是否显示下拉框
        title: "选择支付方式",
      }
    }
  },
  computed: {
    ...mapState({
      fields: state => state.pay.fields,
      mchtInfo: state => state.home.mchtInfo,
    }),
    bank_name_full () {
      let cardItem = this.pageOptions.cardItem
      let bankName = `${cardItem.creditBankName||""} (${cardItem.creditAccountNo||""})`
      return cardItem.creditBankName? bankName : ''
    },
    card_list_valid () {
      return this.creditList.filter((cardItem) => {
        return cardItem.grayFlag == "0"
      })
    },
    card_list_invalid () {
      return this.creditList.filter((cardItem) => {
        return cardItem.grayFlag == "1"
      })
    }
  },
  created () {
    let { channelCode } = this.$route.query
    let { channelName } = this.$route.params
    this.postData.channelCode = channelCode
    this.postData.channelName = channelName
    this.getCreditlist({
      channelNo: channelCode
    })
    .then((res={}) => {
      let creditList = this.creditList = res.creditList || []
      if(creditList.length == 0) {
        this.$router.push({name:"bankAdd"})
      } else {
        this.pageOptions.cardItem = creditList[0]
      }
    })
  },
  watch: {
    "pageOptions.cardItem": function(newVal, oldVal) {
      let cardItem = newVal
      this.postData.bindId = cardItem.bindId
    }
  },
  methods: {
    // actions的方法
    ...mapActions([
        'getCreditlist',
        'quickpay',
    ]),
    onSelectBank() {
      this.slideboxOptions.show = true
    },
    onInputPwd () {
      console.log("onInputPwd")
    },
    onClickCardItem(item) {
      this.slideboxOptions.show = false
      this.pageOptions.cardItem = item
    },
    onClickSubmit () {
      let validityFormatter = function(val) {
        return (val+"").replace(/^(\d{2})(\d{2})$/, "$2$1")
      }
      this.quickpay({
        ...this.postData,
        tradeAmount: Yfen(this.fields.tradeAmount),
        validity: validityFormatter(this.postData.validity)
      })
      .then(res => {
        // 交易状态
        // 1-交易失败 2-交易成功 3-交易处理中
        let status = res.tradeStatus
        if(status == 1) {
          //
        } else if(status == 2) {
          //
        } else if(status == 3) {
          //
        } else {}
      })
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/base/icon';
@import '~assets/less/views/public';

.page-profile {
  .mcc {
    color: @font-color-gray-light;
  }
  .tips {
    text-align: left !important;
    line-height: 24/@unit;
    // margin-top: 10/@unit;
    >i {
      width: 18/@unit;
      height: 24/@unit;
      display: block;
      float: left;
      margin-right: 6/@unit;
      background-position: left center;
    }
    .iBox-fn__clearfix()
  }
}
</style>