<!--
 *
 * Copyright 2011-2017 IBOXPAY,Co.,Ltd. 
 * http://www.iboxpay.com
 * 
 * Created by huangliangxing on 2017/11/29, Updated by huangliangxing.
 *
 -->
<template>
  <section class="bank-select">
    <cell :title="item.bankName"
          v-for="(item, index) in bankList"
          :key="index"
          @click.native="bankSelect(item, index)">
      <div :class="{'selected': bankSelectObj.bankId === item.bankId}"></div>
    </cell>
  </section>
</template>
<script>
  import { Cell } from 'vux'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'bank-select',
    components: {
      Cell
    },
    data () {
      return {
        selectIndex: 0,
        bankList: []
      }
    },
    created () {
      this.bankGetBankInfo().then(res => {
        this.bankList = res.bankList
      }).catch(err => {})
    },
    computed: {
      ...mapState({
        bankSelectObj: state => state.bankSelect.bankSelectObj,
      })
    },
    methods: {
      ...mapActions([
         'bankGetBankInfo'
      ]),
      bankSelect (item) {
        this.$store.dispatch('updateBankSelectObj', item)
        this.$emit('hide-bank-select')
      }
    },
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '~assets/less/base/function';

  .bank-select {
    margin: 20/@unit 0;
    .selected {
      width: 22/@unit;
      height: 22/@unit;
      background: url('~assets/less/icon/selected@3x.png') no-repeat;
      background-size: 100%;
    }
  }

</style>