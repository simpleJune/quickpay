<!--
 *
 * Copyright 2011-2017 IBOXPAY,Co.,Ltd.
 * http://www.iboxpay.com
 *
 * Created by huangliangxing on 2017/11/27, Updated by huangliangxing.
 *
 -->
<template>
  <section class="container">
    <div class="edit-creditCard">
      <group title="银行卡信息"></group>
      <div class="card-info">
        <flexbox :gutter="0" class="flex-bottom">
          <flexbox-item :span="3/5"><div class="text-left">持卡人姓名</div></flexbox-item>
          <flexbox-item :span="2/5"><div class="text-right">{{mchtInfo.userName}}</div></flexbox-item>
        </flexbox>
        <flexbox :gutter="0" class="flex-bottom">
          <flexbox-item :span="3/5"><div class="text-left">银行卡号</div></flexbox-item>
          <flexbox-item :span="2/5"><div class="text-right">{{cardInfo.cardNum}}</div></flexbox-item>
        </flexbox>
        <flexbox :gutter="0" :class="{'flex-bottom': isEditFlag}">
          <flexbox-item :span="3/5"><div class="text-left">银行名称</div></flexbox-item>
          <flexbox-item :span="2/5"><div class="text-right">{{cardInfo.bankName}}</div></flexbox-item>
        </flexbox>
        <div v-if="isEditFlag">
          <flexbox :gutter="0" class="flex-bottom">
            <flexbox-item :span="3/5"><div class="text-left">安全码</div></flexbox-item>
            <flexbox-item :span="2/5"><div class="text-right">{{cardInfo.securityCode}}</div></flexbox-item>
          </flexbox>
          <flexbox :gutter="0">
            <flexbox-item :span="3/5"><div class="text-left">有效期</div></flexbox-item>
            <flexbox-item :span="2/5"><div class="text-right">{{cardInfo.validityDay}}</div></flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>

    <div class="edit-creditCard">
      <group :title="isEditFlag ? '修改银行卡信息' : '完善银行卡信息'"></group>
      <div class="mobile-input">
        <x-input type="tel" title="预留手机号" v-model="editInfo.mobile" :show-clear="false" :max="11" placeholder="请填写预留手机号"></x-input>
        <v-code ref="VCode" :verifyCode.sync="editInfo.verifyCode" @sendCodeMsg="sendCodeMsg()"></v-code>
      </div>
      <x-input type="tel" title="账单日" v-model="editInfo.billsDay" placeholder="请填写账单日  如:12日填写12" :show-clear="false"></x-input>
      <x-input type="tel" title="还款日" v-model="editInfo.reimburseDay" placeholder="请填写还款日  如:28日填写28" :show-clear="false"></x-input>
      <x-input type="tel" title="安全码" v-model="editInfo.securityCode" placeholder="信用卡背面3位数字" :show-clear="false" v-if="!isEditFlag"></x-input>
      <x-input type="tel" title="有效期" v-model="editInfo.validityDay" placeholder="月份年份  如:0421" :show-clear="false" v-if="!isEditFlag"></x-input>
    </div>
    <div class="sure-btn">
      <x-button type="primary"
        action-type="button"
        :disabled="buttonFlag"
        :show-loading="loading"
        @click.native="btnClick"
      >
        {{isEditFlag ? "确定" : "下一步"}}
      </x-button>
    </div>
  </section>
</template>
<script>
  import { XHeader, Group, Flexbox, FlexboxItem, XInput, XButton } from 'vux'
  import { mapState, mapActions } from 'vuex'
  import VCode from '~components/VCode.vue'
  export default {
    name: 'edit-credit-card',
    components: {
      XHeader,
      Group,
      Flexbox,
      FlexboxItem,
      XInput,
      XButton,
      VCode
    },
    data () {
      return {
        loading: false,
        cardInfo: {
          cardNum: '',
          bankName: '',
          securityCode: '',
          validityDay: ''
        },
        editInfo: {
          mobile: '',
          verifyCode: '',
          billsDay: '',
          reimburseDay: '',
          securityCode: '',
          validityDay: ''
        }
      }
    },
    computed: {
      ...mapState({
        mchtInfo: state => state.globalStore.mchtInfo,
        creditCardList: state => state.globalStore.creditCardList
      }),
      creditCardInfo () {
        return this.creditCardList.find((value, index ,arr) => {
          return value.userCardId === this.$route.params.userCardId
        })
      },
      isEditFlag () { // 判断是编辑信息还是完善信息，等于1的时候是编辑信用卡，等于0或其他的时候是完善信用卡
        return this.$route.params.isEdit === 'editFlag'
      },
      userCardId () {
        return this.$route.params.userCardId
      },
      buttonFlag () {
        if (this.isEditFlag) {
          return !(this.$iBox.validator.isMobile(this.editInfo.mobile) && this.$iBox.validator.isAuthCode(this.editInfo.verifyCode)
            && this.$iBox.validator.isNumRange(this.editInfo.billsDay, [1, 30]) && this.$iBox.validator.isNumRange(this.editInfo.reimburseDay, [1, 30]))
        } else {
          return !(this.$iBox.validator.isMobile(this.editInfo.mobile) && this.$iBox.validator.isAuthCode(this.editInfo.verifyCode)
            && this.$iBox.validator.isNumRange(this.editInfo.billsDay, [1, 30]) && this.$iBox.validator.isNumRange(this.editInfo.reimburseDay, [1, 30])
            && this.$iBox.validator.isLenRange(this.editInfo.securityCode, [3, 3]) && this.$iBox.validator.isLenRange(this.editInfo.validityDay, [4, 4]))
        }
      }
    },
    mounted () {
      this.autoFillInfo()
    },
    methods: {
      // actions的方法
      ...mapActions([
        'sendSmsCode',
        'bankAddCreditCard',
        'bankEditCreditCard'
      ]),
      autoFillInfo () {
        this.cardInfo.cardNum = this.creditCardInfo.cardNo
        this.cardInfo.bankName = this.creditCardInfo.bankName
        this.editInfo.mobile = this.creditCardInfo.mobile
        if (this.isEditFlag) {
          this.cardInfo.securityCode = this.creditCardInfo.safetyCode
          this.cardInfo.validityDay = this.creditCardInfo.expiryDate
        }
      },
      sendCodeMsg () {
        let params = {
          userPhone: this.editInfo.mobile
        }
        this.$refs.VCode.getCode()
        this.sendSmsCode(params).then(() => {
        }).catch(err => {
          this.$refs.VCode.codeReset()
        })
      },
      btnClick (evt) {
        if(/loading/ig.test(evt.target.className)) return
        if (this.isEditFlag) {
          this.editCreditCard() // 修改银行卡信息
        } else {
          this.perfectCreditCard() // 完善银行卡信息
        }
      },
      editCreditCard () {
        let params = {
          mobile: this.editInfo.mobile,
          userCardId: this.$route.params.userCardId,
          smsVerifyCode: this.editInfo.verifyCode,
          billDate: this.editInfo.billsDay,
          repayDate: this.editInfo.reimburseDay
        }
        this.loading = true
        this.bankEditCreditCard(params).then(res => { // 请求成功
          this.$vux.toast.show({
            text: '修改成功',
            isShowMask: true,
            onHide: () => {
              this.$router ? this.$router.back() : window.history.back()
            }
          })
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
      perfectCreditCard () {
        // 完善信息之后先发起一笔交易，交易5元，确定信用卡的有效期和CVN码是正确的。
        // 若成功的话才能都到制定计划，失败的话toast展示失败原因，结果未知的话就是审核中的那个页面
        let params = {
          userCardId: this.$route.params.userCardId,
          mobile: this.editInfo.mobile,
          smsVerifyCode: this.editInfo.verifyCode,
          billDate: this.editInfo.billsDay,
          repayDate: this.editInfo.reimburseDay,
          expiryDate: this.editInfo.validityDay,
          safetyCode: this.editInfo.securityCode
        }
        this.loading = true
        this.bankAddCreditCard(params).then(res => { // 请求成功
          if (res.status === '0') { // 添加成功
            this.$vux.toast.show({
              text: '完善成功',
              isShowMask: true,
              onHide: () => {
                this.$router.replace({name: 'planAddStep1'})
              }
            })
          } else if (res.status === '1') { // 审核中
            this.$router.replace({
              name: 'publicResult',
              params:{ resultState:"2" }
            })
          } else { // 添加失败
            this.$vux.toast.show({
              type: 'text',
              isShowMask: true,
              width: `${236/37.5}rem`,
              text:  res.errorDesc || '请求失败，请重试',
            })
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '~assets/less/base/function';

  .x-header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .card-info {
    background: #fff;
    padding: 15/@unit 16/@unit;
    font-size: @font-size-13;
    .flex-bottom {
      margin-bottom: 5/@unit;
    }
    .text-left {
      text-align: left;
      color: @font-color-gray;
    }
    .text-right {
      text-align: right;
    }
  }

  .sure-btn {
    margin: 44/@unit 16/@unit 0 16/@unit;
  }
</style>