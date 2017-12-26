<template>
	<div class="page-settings">
    <group title="基本信息">
      <cell title="商户名称" value="中商平价超市"></cell>
      <cell title="姓名" value="何锋"></cell>
      <cell title="身份证号码" value="422302************3910"></cell>
      <cell title="手机号" value="136****5555" :is-link="true"></cell>
    </group>
    <group title="银行卡">
      <cell title="结算卡号" value="621226********236"></cell>
      <cell title="信用卡管理" value="" :is-link="true"></cell>
    </group>
    <group title="用户设置">
      <cell title="修改登录密码" value="" :is-link="true"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'page-settings',
  components: {
    Group,
    Cell
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

.page-settings {
  .weui-cell__ft {
    color: @font-color-black;
    font-size: @font-size-14;
  }
}

</style>