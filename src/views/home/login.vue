<template>
  <div class="page-login">
    <div class="logo">
      <img src="~assets/images/logo.jpg">
    </div>
    <div class="page-container">
      <x-input type="tel" title="手机号" v-model="postData.mobile" placeholder="请输入您的手机号"></x-input>
      <x-input type="password" title="密码" v-model="postData.pwd" placeholder="请输入登录密码"></x-input>
    </div>
    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >提交</x-button>
    </div>
    <div class="page-row__info forgetPwd">
      <router-link to="/">忘记密码</router-link>
    </div>
  </div>
</template>
<script>
import { XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'page-login',
  components: {
    XInput,
    XButton
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

.page-login {
  .logo {
    padding: 15/@unit 0;
    text-align: center;
  }
}
.page-row__info {
  &.forgetPwd {
    text-align: right;
  }
}
</style>