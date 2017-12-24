<!--
  Created by ZhouShengGuo on 2017-12-04 16:56:37
-->
<template>
  <div class="phone-verify">
    <section class="tips">
      <p class="tips-title"><span>短信验证码已发送到您的手机</span><br/></p>
      <p class="tips-phone"><span>{{ planCardItem.mobile | formatPhone }}</span><br/></p>
    </section>
    <v-code ref="VCode" class="code-input"
      @update:verifyCode="verifyCode"
      @sendCodeMsg="sendCodeMsg()"
    ></v-code>
    <x-button type="primary" class="btn"
      action-type="button"
      :disabled="!isActive"
      :show-loading="isLoading"
      @click.native="planAdd"
    >确定</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCode from '~components/VCode'

// 判断对象的所有值为非空
const notNull = function(obj) {
  var flag = true;
  for(let k in obj) {
    if(obj.hasOwnProperty(k)) {
      let val = obj[k]
      if(val === "") {
        flag = false
        break;
      }
    }
  }
  return flag
}

export default {
  name: 'phone-verify',
  components: {
    VCode,
    XButton
  },
  data() {
    return {
      loading: false,
      postData: {
        smsCode: "",
        userCardId: "", // 这个ID为首页选择指定计划的时银行卡ID
        depositType: "1",
        depositSourceNo: "",
      }
    }
  },
  computed: {
    ...mapState({
      homeCardItem: state => state.home.cardItem,
      planCardItem: state => state.plan.cardItem
    }),
    isActive() {
      return notNull(this.postData) && this.postData.smsCode.length==6
    },
    isLoading: {
      get() {
        return this.loading
      },
      set(newVal) {
        this.loading = newVal
      }
    },
  },
  watch: {
    "postData.smsCode": function(newVal, oldVal) {
      this.postData.userCardId = this.homeCardItem.userCardId
      this.postData.depositSourceNo = this.planCardItem.userCardId
    }
  },
  methods: {
    ...mapActions([
      'sendSmsCode',
      'submitRepaymentPlan'
    ]),
    verifyCode(code) {
      this.postData.smsCode = code
    },
    sendCodeMsg() {
      let params = {
        userPhone: this.planCardItem.mobile
      }
      this.$refs.VCode.getCode()
      this.sendSmsCode(params).then(() => {
        // TODO
      }).catch(err => {
         this.$refs.VCode.codeReset()
      })
    },
    planAdd(evt) {
      if(/loading/ig.test(evt.target.className)) return
      this.isLoading = true
      this.submitRepaymentPlan(this.postData).then(res => {
        this.$router.push({
          name: 'publicResult',
          params: Object.assign({ resultState:"1" }, res)
        })
      }).catch(err => {
        // 如果是短信验证失败则页面提示不跳转
        if(err.errorCode !== "PBS-010106") {
          this.$router.push({
            name: 'publicResult',
            params: Object.assign({ resultState:"0", resultRouteName:"planAddStep1" }, err)
          })
        }
        this.isLoading = false
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.sendCodeMsg()
    }, 100)
  }
}
</script>

<style lang="less">
@import '~assets/less/base/function';

@font-color-tips: #8E8E93;
@font-size-phone: 26/@unit;

.phone-verify {
  .tips {
    background-color: @bgColor-white;
    height: 148/@unit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
    }

    .tips-title {
        font-size: @font-size-16;
        color: @font-color-tips;
        line-height: 28/@unit;
    }
    .tips-phone {
      font-size: @font-size-phone;
      line-height: 52/@unit;
    }
  }

  .code-input {
    margin-top: 20/@unit;
    &:before {
      display: none;
    }
  }

  .btn {
    margin: 0 auto;
    margin-top: 44/@unit;
    width: 343/@unit;
  }
}

</style>