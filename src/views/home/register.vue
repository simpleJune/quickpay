<template>
  <div class="page-register">
    <div class="page-container">
      <x-input type="tel" title="手机号" v-model="postData.loginUser" placeholder="请输入注册手机号"></x-input>
      <v-code ref="VCode" :verifyCode.sync="postData.verifyCode" @sendCodeMsg="sendCodeMsg()"></v-code>
      <x-input type="password" title="密码" v-model="postData.password" placeholder="设置登录密码"></x-input>
    </div>
    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!isActive"
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
        loginUser: "",
        verifyCode: '',
        password: '',
        refereeMerchantNO: ''
      },
      pageOptions: {
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState({
      openId: state => state.home.openId,
    }),
    isActive() {
      return (
        this.$iBox.validator.isNotEmpty(this.postData.loginUser) &&
        this.$iBox.validator.isNotEmpty(this.postData.verifyCode) &&
        this.$iBox.validator.isNotEmpty(this.postData.password)
      )
    }
  },
  created () {
    // 推荐码
    this.postData.refereeMerchantNO = this.$route.params.refereeMerchantNO
  },
  methods: {
    // actions的方法
    ...mapActions([
        'sendSmsCode',
        'register'
    ]),
    sendCodeMsg() {
      let params = {
        codeType: 1,
        loginUser: this.postData.loginUser
      }
      this.$refs.VCode.getCode()
      this.sendSmsCode(params)
      .catch(err => {
         this.$refs.VCode.codeReset()
      })
    },
    onClickSubmit(evt) {
      this.postData.openId = this.openId
      this.register(this.postData)
      .then((res={}) => {
        this.$router.push({name:"home"})
      })
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/views/public';
</style>
