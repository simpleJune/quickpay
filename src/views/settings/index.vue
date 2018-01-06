<template>
	<div class="page-settings">
    <group title="基本信息">
      <cell title="商户名称" :value="mchtInfo.merchantName"></cell>
      <cell title="姓名" :value="mchtInfo.realName"></cell>
      <cell title="身份证号码" :value="mchtInfo.idcardNo"></cell>
      <cell title="手机号" :value="mchtInfo.settleMobile" is-link link="/settings/mobile"></cell>
    </group>
    <group title="银行卡">
      <cell title="结算卡号" :value="mchtInfo.settleAccountNo" is-link link="/settings/card"></cell>
      <cell title="信用卡管理" is-link link="/bank"></cell>
    </group>
    <group title="用户设置">
      <cell title="修改登录密码" is-link link="/settings/pwd"></cell>
      <cell title="修改支付密码" is-link link="/settings/pwd-pay"></cell>
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
      pageOptions: {
        isActive: false,
        isLoading: false
      },
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.home.mchtInfo
    })
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