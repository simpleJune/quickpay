<template>
	<div class="page-settings_pwd">
    <group>
      <cell title="手机号" value="136****6666"></cell>
      <v-code ref="VCode" :verifyCode.sync="postData.vcode" @sendCodeMsg="sendCodeMsg()"></v-code>
      <x-input type="text" title="身份证号码" placeholder="您本人身份证号码"></x-input>
    </group>
    <group>
      <x-input type="number" title="新密码" placeholder="6位数字支付密码"></x-input>
      <x-input type="number" title="确认新密码" placeholder="再次输入以确认"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode.vue'

export default {
  name: 'page-settings',
  components: {
    Group,
    Cell,
    XInput,
    VCode
  },
  data() {
    return {
      postData: {},
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
    ...mapActions(['unBindCreditCard', 'getCreditCardList'])
  },
  mounted() {

  }
}
</script>

<style lang="less">
@import "~assets/less/views/public";

.page-settings_pwd {
  .weui-cell__ft {
    color: @font-color-black;
    font-size: @font-size-14;
  }
}
</style>