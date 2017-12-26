<template>
  <div class="page-register">
    <div class="logo">
      <img src="~assets/images/logo.jpg">
    </div>
    <div class="page-container">
      <x-input type="tel" title="手机号" v-model="postData.mobile" placeholder="请输入注册手机号"></x-input>
      <v-code ref="VCode" :verifyCode.sync="postData.vcode" @sendCodeMsg="sendCodeMsg()"></v-code>
      <x-input type="password" title="密码" v-model="postData.pwd" placeholder="设置登录密码"></x-input>
    </div>
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
import { XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode.vue'

export default {
  name: 'page-register',
  components: {
    XInput,
    XButton,
    VCode
  },
  data () {
    return {
      postData: {
        mobile: '',
        vcode: '',
        pwd: ''
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
@import '~assets/less/views/public';

.page-register {
  .logo {
    padding: 15/@unit 0;
    text-align: center;
  }
}
</style>