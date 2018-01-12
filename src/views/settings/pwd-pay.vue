<template>
	<div class="page-settings__payPwd">
    <div class="page__hd">
      <p class="page__desc" v-if="pageOptions.step1">该6位数字密码将用于手机支付</p>
      <p class="page__desc" v-else>请重新输入6位数支付密码</p>
    </div>

    <!--密码框-->
    <password id="J_keyboard-pwd" v-model="postData.payPwd" v-if="pageOptions.step1"></password>
    <password id="J_keyboard-pwd" v-model="postData.rePayPwd" v-else></password>

    <!--修改按钮-->
    <div class="page-row__btn" v-if="pageOptions.step2">
      <x-button type="primary"
        action-type="button"
        :disabled="!pageOptions.isActive"
        :show-loading="pageOptions.isLoading"
        @click.native="onClickSubmit"
      >完成</x-button>
    </div>

    <!--数字键盘-->
    <keyboard type="number"
      :options="keyboardOptions"
      @on-key-input="onKeyInput"
      @on-key-del="onKeyDel"
      @on-key-display="onKeyDisplay"
    ></keyboard>
  </div>
</template>

<script>
import { XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import Password from '~components/Password'
import Keyboard from '~components/Keyboard'

export default {
  name: 'page-settings-payPwd',
  components: {
    XButton,
    Password,
    Keyboard
  },
  data() {
    return {
      postData: {
        payPwd: "",
        rePayPwd: ""
      },
      pageOptions: {
        step1: true,
        step2: false,
        isActive: false
      },
      keyboardOptions: {
        show: false, // 是否显示键盘
        value: "", // 输入值
        toggle: false // 是否允许伸缩
      }
    }
  },
  watch: {
    "keyboardOptions.value": function(newVal, oldVal) {
      this.pageOptions.step1 && (this.postData.payPwd = newVal)
      this.pageOptions.step2 && (this.postData.rePayPwd = newVal)
      // 如果6位密码输入完成自动提交
      if(/^\d{6}$/.test(newVal)) {
        setTimeout(() => {
          if(this.pageOptions.step1) {
            this.pageOptions.step1 = false
            this.pageOptions.step2 = true
            this.keyboardOptions.value = ""
          }
        }, 200)
      }
      this.pageOptions.isActive = (this.postData.payPwd == this.postData.rePayPwd)
    }
  },
  methods: {
    ...mapActions([
      'setpaypwd'
    ]),
    onKeyInput(val) {
      this.keyboardOptions.value += val
    },
    onKeyDel(val) {
      this.keyboardOptions.value = this.keyboardOptions.value.replace(new RegExp(".$", "g"), "")
    },
    onKeyDisplay(val) {
      this.keyboardOptions.show = val
    },
    doNext(evt) {
      /*if(/loading/ig.test(evt.target.className)) return
      this.pageOptions.status = true
      this.postData.repayDate = this.homeCardItem.repayDate
      this.getRepaymentPlan(this.postData)
      .then(res => {
        this.$router.push({name:"planAddStep2"})
      }).catch(err => {
        this.pageOptions.status = false
      })*/
    },
    onClickSubmit () {
      this.setpaypwd(this.postData)
      .then(res => {
        this.$router.push({name:"home"})
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.keyboardOptions.show = true
    })
  }
}
</script>

<style lang="less">
@import "~assets/less/views/public";

.page-settings__payPwd {
  .page__hd {
    padding: 16/@unit;
    text-align: center;
  }
  .page__desc {
    font-size: @font-size-16;
  }
}
</style>