<template>
  <div class="page-profile">
    <div class="page-row">
      <p class="tips"><i class="iBox-icon__tips"></i>为了您的账户安全，请先进行实名认证</p>
    </div>
    <group>
      <x-input type="text" title="姓名" v-model="postData.username" placeholder="您的姓名"></x-input>
      <x-input type="text" title="身份证号码" v-model="postData.idcard" placeholder="您本人身份证号码"></x-input>
      
      <x-address hide-district placeholder="请选择地址"
        :title="pageOptions.addr.title" 
        :list="pageOptions.addr.data"
        v-model="pageOptions.addr.value"
        @on-hide="onAddrHide" 
        @on-shadow-change="onAddrChange" 
      >
        <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
          <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
            <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
            <span style="vertical-align:middle;">地址</span>
          </span>
        </template>
      </x-address>

      <x-textarea 
        v-model="postData.address"
        placeholder="请填写详细地址"
        :max="30"
        :rows="1"
        :autosize="true"
      ></x-textarea>
    </group>

    <group>
      <x-input type="number" title="结算卡号" v-model="postData.settleAccountNo" @focusout.native="onFocusoutCardNo" placeholder="您本人结算银行卡号"></x-input>
      <x-input type="tel" title="手机号" v-model="postData.settleMobile" placeholder="结算银行预留手机号"></x-input>
      <cell is-link title="行业" :value="postData.industryName" @click.native="onClickSelectMcc"></cell>
    </group>

    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >提交</x-button>
    </div>

    <!--选择MCC-->
    <slidebox v-model="slideboxOptions.show"
      :options="slideboxOptions"
    >
      <group>
        <radio title="title"
          :options="mcc_list" 
          v-model="pageOptions.mcc.value"
          @on-change="onChangeMcc"
        ></radio>
      </group>
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
        addr: {
          title: "",
          value: [],
          data: [],
          _value: []
        },
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
    mcc_list () {
      let mccList = this.pageOptions.mcc.data
      let _mccList = []
      for(let i=0; i<mccList.length; i++) {
        let item = {}
        item.key = mccList[i]["industryCode"]
        item.value = mccList[i]["industryName"]
        _mccList.push(item)
      }
      return _mccList
    }
  },
  created () {
    // 获取省市区
    this.getProvince().then((res={}) => {
      let convertFormat = {
        label: "provinceName",
        value: "provinceId"
      }
      this.pageOptions.addr.data = this.$iBox.helper.pickerDataConvert(res.provinceInfoList, convertFormat)
    })
    // 获取行业信息
    this.getIndustry().then(res => {
      this.pageOptions.mcc.data = res.industryList
    })
    
  },
  watch: {
    "pageOptions.addr._value": function(newVal, oldVal) {
      let provinceId = newVal[0]
      if(CACHE_ADDR.includes(provinceId)) return;
      let convertFormat = {
        id: provinceId,
        label: "cityName",
        value: "cityId"
      }
      this.getCity({
        provinceId: provinceId
      }).then((res={}) => {
        CACHE_ADDR.push(provinceId)
        let cityList = this.$iBox.helper.pickerDataConvert(res.cityInfoList, convertFormat)
        this.pageOptions.addr.data = this.pageOptions.addr.data.concat(cityList)
      })
    }
  },
  methods: {
    // actions的方法
    ...mapActions([
        'getProvince',
        'getCity',
        'getIndustry',
        'getCardbin',
        'realname',
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