<template>
	<div class="page-settings__payPwd">
    <div class="page__hd">
      <p class="page__desc">该6位数字密码将用于手机支付</p>
    </div>
    <!--密码框-->
    <password id="J_keyboard-pwd" v-model="postData.pwdValue"></password>
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
import { mapState, mapActions } from 'vuex'
import Password from '~components/Password'
import Keyboard from '~components/Keyboard'

export default {
  name: 'page-settings-payPwd',
  components: {
    Password,
    Keyboard
  },
  data() {
    return {
      postData: {
        pwdValue: ""
      },
      pageOptions: {
        isActive: false,
        isLoading: false
      },
      keyboardOptions: {
        show: false, // 是否显示键盘
        value: "", // 输入值
        count: 6 // 输入的数字位数
      }
    }
  },
  computed: {
    ...mapState({

    }),

  },
  watch: {
    "keyboardOptions.value": function(newVal, oldVal) {
      this.postData.pwdValue = newVal
      // 如果6位密码输入完成自动提交
      if(/\d{6}/.test(newVal)) {
        console.log("不能再输入啦~", newVal, oldVal)
      }
    }
  },
  methods: {
    ...mapActions([
      ''
    ]),
    onKeyInput(val) {
      this.keyboardOptions.value += val
    },
    onKeyDel(val) {
      this.keyboardOptions.value = this.keyboardOptions.value.replace(new RegExp(".$", "g"), "")
    },
    onKeyDisplay(val, key) {
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