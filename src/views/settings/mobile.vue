<template>
	<div class="page-settings_mobile">
    <group>
      <x-input type="text" title="姓名" placeholder="您的姓名"></x-input>
      <x-input type="text" title="身份证号码" placeholder="您本人身份证号码"></x-input>
      <x-input type="number" title="结算卡号" placeholder="结算银行"></x-input>
      <x-input type="number" title="手机号" placeholder="结算银行预留手机号"></x-input>
    </group>
    <group>
      <v-code ref="VCode" :verifyCode.sync="postData.vcode" @sendCodeMsg="sendCodeMsg()"></v-code>
    </group>
    <group>
      <x-input type="text" title="支付密码" placeholder="您的姓名"></x-input>
    </group>
    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >确认修改</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode.vue'

export default {
  name: 'page-settings_mobile',
  components: {
    Group,
    XInput,
    XButton,
    VCode
  },
  data() {
    return {
      postData: {
        vcode: ""
      },
      pageOptions: {
        isActive: false,
        isLoading: false
      },
    }
  },
  computed: {
    ...mapState({
        creditCardList: state => state.global.creditCardList,
        mchtInfo: state => state.global.mchtInfo
    }),

  },
  methods: {
    ...mapActions(['unBindCreditCard', 'getCreditCardList']),
    sendCodeMsg () {
      console.log("sendCodeMsg")
    }
  },
  mounted() {

  }
}
</script>

<style lang="less">
@import "~assets/less/views/public";

.page-settings_mobile {

}

</style>