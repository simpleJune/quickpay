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
import { Actionsheet, XHeader, TransferDom } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data() {
    return {
      appLoadDoneFlag: false
    }
  },
  created () {
    // 获取token
    let vm = this
    if(vm.getRuntime() === "iboxpay") {
      vm.$iBox.cashbox.callNative("getToken", {}, (res) => {
        let data = res.data || {};
        if(res.status==1 && data.userToken) {
          vm.$store.commit("GLOBAL_MUTATION_SET_TOKEN", data.userToken)
          vm.init()
        } else {
          vm.$vux.toast.show({type: 'text', text: '钱盒信息拉取失败', isShowMask: true})
        }
      })
    } else {
      vm.init()
    }
  },
  methods: {
    ...mapGetters([
      'getRuntime'
    ]),
    ...mapActions([
      'getMchtInfo',
      'getCreditCardList'
    ]),
    init() {
      // 商户信息
      this.getMchtInfo().then(res => {
        this.appLoadDoneFlag = true
      }).catch(err => {
        if(err._type === "forbidden") {
          this.appLoadDoneFlag = true
          this.$router.replace({
            name:"publicResult",
            params:{ resultState:"3" }
          })
        }
      })
      // 信用卡列表信息
      this.$store.dispatch("getCreditCardList")
    }
  },
  computed: {
    ...mapState({
        route: state => state.route,
        routeName: state => state.route.name,
        routePath: state => state.route.path,
        backToCashboxRoutes: state => state.globalStore.headerOptions.backToCashboxRoutes,
        backToHomeRoutes: state => state.globalStore.headerOptions.backToHomeRoutes
    }),
    title () {
      let route = this.route, meta = route.meta
      return meta.title || "超级还款"
    }
  },
  watch: {
    routePath (newPath, oldPath) {
      // 设置钱盒头部标题
      /*this.$iBox.cashbox.callNative('Nav.title', {
        title: newVal || "超级还款"
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

      this.$iBox.cashbox.callNative('Nav.setAll', {
        title: this.title,
        backID: 999,
        backEnable: false
      }, (resp={}) => {
        let status = resp.status
        let data = resp.data
        if(status == '1' && data.menuClicked == 999){
          if(this.backToCashboxRoutes.includes(this.routeName)) {
            this.$iBox.cashbox.exit();
          } else if(this.backToHomeRoutes.includes(this.routeName)) {
            this.$router.replace({name:"home"});
          } else {
            this.$router ? this.$router.back() : window.history.back()
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/index.less';
</style>


