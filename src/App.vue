<template>
  <div id="app" class="page">
    <div class="page__bd">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive && appLoadDoneFlag"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && appLoadDoneFlag"></router-view>
    </div>
  </div>
</template>

<script>
// import { Actionsheet, XHeader, TransferDom } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  /*directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },*/
  data() {
    return {
      appLoadDoneFlag: false,
      appId: "wxb50e02101aea7da9"
    }
  },
  created () {
    let runtime = this.getRuntime()
    if (runtime == "weixin") {
      this.initWX()
    } else {
      this.init()
    }
  },
  methods: {
    ...mapGetters([
      'getRuntime'
    ]),
    ...mapActions([
      'getOpenId'
    ]),
    init() {
      let code = "weixin-code-hefeng-test-0000"
      this.getOpenId({
        code: code
      }).then(res => {
        // 如果商户状态未注册不能继续往下走
        if(res.merchantStatus !== undefined) {
          this.$store.commit("HOME_MUTATION_MCHTINFO", res)
        }
        this.appLoadDoneFlag = true
      })
    },
    initWX() {
      let code = "weixin-code-hefeng-test-0000"
      if(!(code = this.$iBox.helper.getURLParam("code"))) {
        let url = window.location.href
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base#wechat_redirect`
      } else {
        this.getOpenId({
          code: code
        }).then(res => {
          // 如果商户状态未注册不能继续往下走
          if(res.merchantStatus !== undefined) {
            this.$store.commit("HOME_MUTATION_MCHTINFO", res)
          }
          this.appLoadDoneFlag = true
        })
      }
    },
    initApp() {
      // 商户信息
      // this.getMchtInfo({
      //   name: "hefeng",
      //   mobile: "13662691961",
      //   mchtName: "和风评价超市"
      // }).then(res => {
      //   this.appLoadDoneFlag = true
      // }).catch(err => {
      //   /*if(err._type === "forbidden") {
      //     this.appLoadDoneFlag = true
      //     this.$router.replace({
      //       name:"publicResult",
      //       params:{ resultState:"3" }
      //     })
      //   }*/
      // })
      // 信用卡列表信息
      // this.$store.dispatch("getCreditCardList")
    }
  },
  computed: {
    ...mapState({
        route: state => state.route,
        routeName: state => state.route.name,
        routePath: state => state.route.path,
        backToCashboxRoutes: state => state.global.headerOptions.backToCashboxRoutes,
        backToHomeRoutes: state => state.global.headerOptions.backToHomeRoutes,
        merchantStatus: state => state.home.mchtInfo.merchantStatus
    }),
    title () {
      let route = this.route, meta = route.meta
      return meta.title || "快捷收款"
    }
  },
  watch: {
    merchantStatus (newVal, oldVal) {
      if(newVal === "") return;
      let merchantStatus = newVal + ""
      switch(merchantStatus) {
        case "-1": // 未注册 merchantNo=504798616515248640&partnerCode=10050
          let merchantNo = this.$iBox.helper.getURLParam("merchantNo")
          merchantNo? //扫码注册|直接关注微信号登录
            this.$router.push({ name:'register', params:{ refereeMerchantNO:merchantNo } }):
            this.$router.push({name:"login"})
          break;
        case "0": // 未实名
          this.$router.push({ name:"profile" })
          break;
        case "1": // 未设置支付密码
          this.$router.push({ name:"pwd" })
          break;
        case "2": // 未绑卡
        case "3": // 正常
        default:
          break;
      }
      // 这里置空很关键
      // 直接关系到从错误页跳回到首页时是否能再次跳转
      this.$store.commit("HOME_MUTATION_MCHTINFO_STATUS", "") 
    },
    title (newPath, oldPath) {
      // 设置钱盒头部标题
      /*this.$iBox.cashbox.callNative('Nav.title', {
        title: newVal || "快捷收款"
      }, () => {})
      // 设置返回事件监听
      // 这里考虑到回调函数采用时间戳区分
      // 为了不重复，需要设置一个延时
      setTimeout(() => {
        // 设置头部标题
        this.$iBox.cashbox.callNative('Nav.back', {
          backEnable: false,
          backID: 2
        }, (resp) => {
          if(resp.status && resp.status == '1' && resp.data.menuClicked == 2){
            if(this.backToCashboxRoutes.includes(this.routeName)) {
              this.$iBox.cashbox.exit();
            } else if(this.backToHomeRoutes.includes(this.routeName)) {
              this.$router.replace({name:"home"});
            } else {
              this.$router ? this.$router.back() : window.history.back()
            }
          }
        })
      }, 10)*/


      document.title = this.title
      /*if(this.backToCashboxRoutes.includes(this.routeName)) {
        try {
          WeixinJSBridge.invoke("closeWindow", {}, function(e){})
        } catch(err) { console.log("WeixinJSBridge") }
      } else if(this.backToHomeRoutes.includes(this.routeName)) {
        this.$router.replace({name:"home"});
      } else {
        this.$router ? this.$router.back() : window.history.back()
      }*/
    },
    routePath (newVal, oldVal) {
      console.log("routePath", newVal, oldVal)
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/index.less';
</style>


