<template>
  <x-input type="tel" title="验证码" v-model="code" placeholder="请输入验证码" :show-clear="true" :max="verifyCodeQuantity">
    <button slot="right" class="mobile-code-btn" @click="sendCode()" :disabled="codeTime != 60">{{codeName}}</button>
  </x-input>
</template>
<script>
  import {XInput} from 'vux'
  export default {
    name: 'VCode',
    components: {
      XInput
    },
    props: {
      verifyCode: {
        type: String,
        default: ''
      },
      verifyCodeQuantity: {
        type: Number,
        default: 6
      },
    },
    data () {
      return {
        code: '',
        codeTime: 60,
        codeTimer: null,
        isFirst: true
      }
    },
    mounted () {
    },
    computed: {
      codeName () {
        if (this.codeTime == 60) {
          return this.isFirst ? '获取验证码' : '重新获取'
        } else {
          return `${this.codeTime}秒`
        }
      },
    },
    watch: {
      code (newVal, oldVal) {
        this.$emit('update:verifyCode', newVal)
      }
    },
    methods: {
      getCode () {
        this.codeTime--
        this.codeTimer = setInterval(() => {
          --this.codeTime || this.codeReset()
        }, 1000)
      },
      codeReset () {
        this.isFirst = false
        clearInterval(this.codeTimer)
        this.codeTime = 60
      },
      sendCode () {
        this.$emit('sendCodeMsg')
      }
    },
  }
</script>
<style lang="less">
@import '~assets/less/base/variable.less';

.mobile-code-btn {
  width: 90/@unit;
  color: @font-color-yellow;
  background: transparent;
  border: none;
  border-left: 1px solid #ccc;
  padding-left: 12/@unit;
  font-size: @font-size-15;
}
</style>