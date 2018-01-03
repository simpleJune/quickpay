<template>
  <div class="page-login">
    <div class="page-container">
      <x-input type="tel" title="手机号" v-model="postData.loginUser" placeholder="请输入您的手机号"></x-input>
      <x-input type="password" title="密码" v-model="postData.password" placeholder="请输入登录密码"></x-input>
    </div>
    <div class="page-row__btn">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >提交</x-button>
      <button type="button" class="weui-btn weui-btn_primary" @click="onClickLogout">退出登录</button>
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
        loginUser: '',
        password: ''
      },
      pageOptions: {
        isActive: true,
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState({
    }),

  },
  mounted () {
  },
  methods: {
    // actions的方法
    ...mapActions([
        'login',
        'logout'
    ]),
    onClickSubmit() {
      this.login(this.postData)
      .then((res={}) => {
        // TODO
        console.log("login ok", res)
      })
    },
    onClickLogout() {
      this.logout()
      .then((res={}) => {
        // TODO
        console.log("logout ok", res)
      })
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