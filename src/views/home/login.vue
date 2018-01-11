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
    </div>
    <div class="page-row__info forgetPwd">
      <router-link to="/settings/pwd">忘记密码</router-link>
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
  methods: {
    // actions的方法
    ...mapActions([
        'login'
    ]),
    onClickSubmit() {
      this.login(this.postData)
      .then((res={}) => {
        this.$router.push({name:"home"})
      })
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/views/public';

.page-row__info {
  &.forgetPwd {
    text-align: right;
  }
}
</style>