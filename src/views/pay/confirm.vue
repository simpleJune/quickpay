<template>
  <div class="page-pay__confirm">
    <div class="page-preview txt">
      <h1>&yen; {{tradeAmount}}</h1>
      <p>{{merchantName}}</p>
    </div>

    <group>
      <x-input type="text" title="姓名" v-model="postData.username" placeholder="您的姓名"></x-input>
      <x-input type="text" title="身份证号码" v-model="postData.idcard" placeholder="您本人身份证号码"></x-input>
    </group>

    <group>
      <cell is-link title="支付密码" :value="postData.industryName" @click.native="onClickSelectMcc"></cell>
      <x-input type="number" title="结算卡号" v-model="postData.settleAccountNo" @focusout.native="onFocusoutCardNo" placeholder="您本人结算银行卡号"></x-input>
      <x-input type="tel" title="手机号" v-model="postData.settleMobile" placeholder="结算银行预留手机号"></x-input>
      
    </group>

    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >确认支付</x-button>
    </div>

    <!--选择MCC-->
    <slidebox v-model="slideboxOptions.show"
      :options="slideboxOptions"
    >
      好地方
    </slidebox>
  </div>
</template>
<script>
import { Group, Cell, Radio , XInput, XButton, XTextarea, XAddress, Value2nameFilter as value2name } from 'vux'
import { mapState, mapActions } from 'vuex'
import Slidebox from '~components/Slidebox'

// 缓存已经加载过的市区数据
const CACHE_ADDR = []

export default {
  name: 'page-profile',
  components: {
    Group,
    Cell,
    Radio,
    XInput,
    XButton,
    XTextarea,
    XAddress,
    Slidebox
  },
  data () {
    return {
      postData: {
        username: '',
        idcard: '',
        provinceName: '',
        cityName: '',
        address: '',
        settleAccountNo: '',
        settleMobile: '',
        settleBankCode: '',
        settleBankName: '',
        cardName: '',
        industryType: '',
        industryName: '请选择行业'
      },
      pageOptions: {
        mcc: {
          value: "",
          data: []
        },
        isActive: true,
        isLoading: false
      },
      slideboxOptions: {
        show: false, // 是否显示下拉框
        title: "请选择行业",
      }
    }
  },
  computed: {
    ...mapState({
      // mchtInfo: state => state.global.mchtInfo,
    }),
    
  },
  created () {
    let { tradeAmount, merchantName } = this.$route.params
    let { channelCode } = this.$route.query
    this.tradeAmount = tradeAmount
    this.merchantName = merchantName
    this.getCreditlist({
      channelNo: channelCode
    })
    .then((res={}) => {
      let creditList = this.creditList = res.creditList || []
      if(creditList.length == 0) {
        this.$router.push({name:"bankAdd"})
      }
    })
  },
  watch: {
    "pageOptions.cardItem": function(newVal, oldVal) {
      
    }
  },
  methods: {
    // actions的方法
    ...mapActions([
        'getCreditlist',
    ]),














    getName (value) {
      return value2name(value, this.pageOptions.addr.data)
    },
    onAddrHide () {
      let addrVal = this.pageOptions.addr.value
      let addrArr = this.getName(addrVal).split(" ")
      this.postData.provinceName = addrArr[0]
      this.postData.cityName = addrArr[1]
    },
    onAddrChange (params) {
      this.pageOptions.addr._value = params
    },
    onClickSelectMcc () {
      this.slideboxOptions.show = true
    },
    onChangeMcc (value, label) {
      this.slideboxOptions.show = false
      this.postData.industryType = value;
      this.postData.industryName = label;
    },
    onFocusoutCardNo () {
      this.getCardbin({
        bankCardNo: this.postData.settleAccountNo
      }).then(res => {
        this.postData.cardName = res.cardName
        this.postData.settleBankName = res.bankName
        this.postData.settleBankCode = res.bankCode
      })
    },
    onClickSubmit () {
      this.realname(this.postData)
      .then(res => {
        this.$router ? this.$router.back() : window.history.back()
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