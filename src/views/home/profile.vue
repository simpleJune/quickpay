<template>
  <div class="page-profile">
    <div class="page-row">
      <p class="tips"><i class="iBox-icon__tips"></i>为了您的账户安全，请先进行实名认证</p>
    </div>
    <group>
      <x-input type="text" title="姓名" v-model="postData.userName" placeholder="您的姓名"></x-input>
      <x-input type="text" title="身份证号码" v-model="postData.cardNo" placeholder="您本人身份证号码"></x-input>
      <x-input type="text" title="商户地址" v-model="postData.address" placeholder="请选择"></x-input>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="postData.addrDetail" placeholder="请填写详细地址">
        </div>
      </div>
    </group>
    <group>
      <x-input type="number" title="结算卡号" v-model="postData.userName" placeholder="您本人结算银行卡号"></x-input>
      <x-input type="tel" title="手机号" v-model="postData.cardNo" placeholder="结算银行预留手机号"></x-input>
      <div class="weui-cell weui-cell_access J_href-mcc">
        <div class="weui-cell__bd">
          <p>行业</p>
        </div>
        <div class="weui-cell__ft">
          <p class="mcc">请选择行业</p>
        </div>
      </div>
    </group>
    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >提交</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'page-profile',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      postData: {
        userName: '',
        cardNo: '',
        address: '',
        addrDetail: ''
      },
      pageOptions: {
        isActive: false,
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState({
      bankSelectObj: state => state.bankSelect.bankSelectObj,
      mchtInfo: state => state.global.mchtInfo,
    }),

  },
  mounted () {
  },
  methods: {
    // actions的方法
    ...mapActions([
        'sendSmsCode'
    ]),
    sendCodeMsg() {
      let params = {
        messageType: "credit_center_add_plan",
        userPhone: this.postData.mobile
      }
      this.$refs.VCode.getCode()
      this.sendSmsCode(params).then(() => {
        // TODO
      }).catch(err => {
         // this.$refs.VCode.codeReset()
      })
    },
    onClickSubmit() {
      console.log("submit...")
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
      width: 24/@unit;
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