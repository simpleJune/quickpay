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
    <section v-show="!chooseBankFlag">
      <div class="add-creditCard" v-if="opStep === 1"> <!--第一步骤-->
        <group title="请绑定账户本人银行卡"></group>
        <div class="add-input">
          <x-input title="持卡人姓名" :value="creditCardInfo.userName" :show-clear="false" readonly></x-input>
          <x-input type="tel" title="银行卡号" v-model="creditCardInfo.cardNum" placeholder="请填写银行卡卡号" :show-clear="false" :max="20"></x-input>
          <x-input title="银行名称"
                   :placeholder="bankSelectObj.bankName ? bankSelectObj.bankName : '请选择发卡行'"
                   readonly class="right-triangle" @click.native="showBankSelect()"
                   :value="bankSelectObj.bankName"></x-input>
        </div>
        <div class="mobile-input">
          <x-input type="tel" title="预留手机号" placeholder="请填写预留手机号" v-model="creditCardInfo.mobile" :show-clear="false" :max="11"></x-input>
          <v-code ref="VCode" :verifyCode.sync="creditCardInfo.verifyCode" @sendCodeMsg="sendCodeMsg()"></v-code>
        </div>
      </div>

      <div class="add-creditCard" v-if="opStep === 2"> <!--第二步骤-->
        <group title="请填写信用卡信息"></group>
        <x-input type="tel" title="账单日" v-model="creditCardInfo.billsDay" placeholder="请填写账单日 如:12日填写12" :show-clear="false"></x-input>
        <x-input type="tel" title="还款日" v-model="creditCardInfo.reimburseDay" placeholder="请填写还款日 如:28日填写28" :show-clear="false"></x-input>
        <x-input type="tel" title="安全码" v-model="creditCardInfo.securityCode" placeholder="信用卡背面3位数字" :show-clear="false"></x-input>
        <x-input type="tel" title="有效期" v-model="creditCardInfo.validityDay" placeholder="月份年份 如:0421" :show-clear="false"></x-input>
        <p class="add-tips">银行卡管理手续费：{{mchtInfo.addCardFee / 100}}元，请保证信用卡剩余额度大于等于{{mchtInfo.addCardFee / 100}}元。</p>
      </div>
      <div class="stepBtn">
        <x-button type="primary"
          :disabled="buttonFlag"
          :show-loading="loading"
          @click.native="btnClick"
        >
          {{opStep === 1 ? "下一步" : "确认"}}
        </x-button>
      </div>
    </section>
    <select-bank v-show="chooseBankFlag" @hide-bank-select="hideBankSelect"></select-bank>
  </section>
</template>
<script>
import { XHeader, Group, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode.vue'
import SelectBank from './select.vue'

export default {
  name: 'add-credit-card',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    VCode,
    SelectBank
  },
  data () {
    return {
      opStep: 1,
      loading: false,
      creditCardInfo: {
        userName: '',
        cardNum: '',
        mobile: '',
        verifyCode: '',
        billsDay: '',
        reimburseDay: '',
        securityCode: '',
        validityDay: '',
        userCardId: ''
      },
      chooseBankFlag: false
    }
  },
  computed: {
    ...mapState({
      bankSelectObj: state => state.bankSelect.bankSelectObj,
      mchtInfo: state => state.globalStore.mchtInfo,
    }),
    buttonFlag () {
      if (this.opStep === 1) {
        return !(this.$iBox.validator.isLenRange(this.creditCardInfo.cardNum, [14, 20]) && this.bankSelectObj.bankId
          && this.$iBox.validator.isMobile(this.creditCardInfo.mobile) && this.$iBox.validator.isAuthCode(this.creditCardInfo.verifyCode))
      } else {
        return !(this.$iBox.validator.isNumRange(this.creditCardInfo.billsDay, [1, 30]) && this.$iBox.validator.isNumRange(this.creditCardInfo.reimburseDay, [1, 30])
          && this.$iBox.validator.isLenRange(this.creditCardInfo.securityCode, [3, 3]) && this.$iBox.validator.isLenRange(this.creditCardInfo.validityDay, [4, 4]))
      }
    }
  },
  mounted () {
    this.autoFillInfo() // 自动填充信息
    this.$store.dispatch('updateBankSelectObj', {}) // 重置银行卡选择
  },
  methods: {
    // actions的方法
    ...mapActions([
        'sendSmsCode',
        'bankAuthCard',
        'bankAddCreditCard'
    ]),
    autoFillInfo () {
      this.creditCardInfo.userName = this.mchtInfo.userName
      this.creditCardInfo.mobile = this.mchtInfo.mobile
    },
    showBankSelect () {
      this.chooseBankFlag = true
    },
    hideBankSelect () {
      this.chooseBankFlag = false
    },
    sendCodeMsg () {
      let params = {
        userPhone: this.creditCardInfo.mobile
      }
      this.$refs.VCode.getCode()
      this.sendSmsCode(params).then(() => {

      }).catch(err => {
         this.$refs.VCode.codeReset()
      })
    },
    btnClick (evt) {
      if(/loading/ig.test(evt.target.className)) return
      this.opStep === 1 ? this.stepOne() : this.stepTwo()
    },
    stepOne () {
      let params = {
        cardName: this.creditCardInfo.userName,
        cardNo: this.creditCardInfo.cardNum,
        bankId: this.bankSelectObj.bankId,
        bankName: this.bankSelectObj.bankName,
        mobile: this.creditCardInfo.mobile,
        smsVerifyCode: this.creditCardInfo.verifyCode
      }
      this.loading = true
      this.bankAuthCard(params).then(res => {
        this.creditCardInfo.userCardId = res.userCardId
        this.opStep = 2
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    stepTwo () {
     // 添加信息之后先发起一笔交易，交易5元
     // 确定信用卡的有效期和CVN码是正确的，成功即展示成功。
     // 失败的话toast展示失败原因，结果未知的话就是审核中的那个页面
      let params = {
        mobile: this.creditCardInfo.mobile,
        smsVerifyCode: this.creditCardInfo.verifyCode,
        userCardId: this.creditCardInfo.userCardId,
        billDate: this.creditCardInfo.billsDay,
        repayDate: this.creditCardInfo.reimburseDay,
        expiryDate: this.creditCardInfo.validityDay,
        safetyCode: this.creditCardInfo.securityCode
      }
      this.loading = true
      this.bankAddCreditCard(params).then(res => { // 请求成功
        if (res.status === '0') { // 添加成功
          this.$vux.toast.show({
            text: '添加成功',
            isShowMask: true,
            onHide: () => {
              this.$router.replace({name: 'home'})
            }
          })
        } else if (res.status === '1') { // 审核中
          this.$router.replace({
            name: 'publicResult',
            params: { resultState:"2" }
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

<style lang="less" scoped>
@import '~assets/less/base/function';

.x-header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.mobile-input {
  margin-top: 20/@unit;
}

.add-tips {
  color: @font-color-gray;
  font-size: @font-size-14;
  padding: 8/@unit 16/@unit;
  text-align: justify;
}

.stepBtn {
  margin: 44/@unit 16/@unit 0 16/@unit;
}
</style>