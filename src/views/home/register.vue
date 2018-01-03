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
        loginUser: "",
        verifyCode: '',
        password: '',
        // openId: '',
        refereeMerchantNO: '504798616515248640'
      },
      pageOptions: {
        isActive: true,
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState({
      openId: state => state.home.openId,
    }),

  },
  mounted () {
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
      .then(() => {
        // TODO
        this.postData.openId = this.openId
        this.pageOptions.isActive = true
      })
      .catch(err => {
         // this.$refs.VCode.codeReset()
      })
    },
    onClickSubmit() {
      this.register(this.postData)
      .then((res={}) => {
        console.log("register ok", res)
      })
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