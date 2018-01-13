<template>
	<div class="page-bank__add">
    <!--持卡人信息-->
    <group>
      <cell title="持卡人" :value="mchtInfo.realName"></cell>
      <x-input title="卡号" v-model="postData.creditAccountNo" @on-blur="onFocusoutCardNo" placeholder="信用卡卡号"></x-input>
      <cell title="银行" :value="postData.bankName"></cell>
    </group>

    <!--验证信息-->
    <group>
      <x-input type="tel" title="预留手机号" v-model="postData.creditMobile" placeholder="银行预留手机号"></x-input>
      <v-code ref="VCode" :verifyCode.sync="postData.verifyCode" @sendCodeMsg="sendCodeMsg()"></v-code>
    </group>

    <!--提交银行卡信息-->
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
import { Group, Cell, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode.vue'

export default {
  name: 'page-bank__add',
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    VCode
  },
  data() {
    return {
      postData: {
        username: "",
        creditAccountNo: "",
        bankCode: "",
        bankName: "",
        cardName: "",
        creditMobile: "",
        verifyCode: "",
      },
      pageOptions: {
        isActive: true,
        isLoading: false
      },
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.home.mchtInfo
    })
  },
  methods: {
    ...mapActions([
      'sendSmsCode',
      'getCardbin',
      'addcreditcard'
    ]),
    sendCodeMsg() {
      let params = {
        codeType: 5,
        loginUser: this.postData.creditMobile
      }
      this.$refs.VCode.getCode()
      this.sendSmsCode(params)
      .catch(err => {
         this.$refs.VCode.codeReset()
      })
    },
    onFocusoutCardNo () {
      this.getCardbin({
        bankCardNo: this.postData.creditAccountNo
      }).then(res => {
        this.postData.cardName = res.cardName
        this.postData.bankName = res.bankName
        this.postData.bankCode = res.bankCode
      })
    },
    onClickSubmit () {
      this.postData.username = this.mchtInfo.realName
      this.addcreditcard(this.postData)
      .then(res => {
        this.$router ? this.$router.back() : window.history.back()
      })
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/views/public";

.page-bank__add {
  .weui-cell__ft {
    color: @font-color-black;
    font-size: @font-size-14;
  }
}

</style>