<template>
  <div class="page-pay__channel">
    <div class="page-preview txt">
      <h1>&yen; {{tradeAmount}}</h1>
      <p>交易金额</p>
    </div>

    <divider class="page-row">请选择通道</divider>

    <channel-item 
      v-for="(channelItem, channelIdx) in channelList"
      :options="channelItem"
      :key="channelIdx"
      @on-click-item="onClickItem"
    ></channel-item>
  </div>
</template>

<script>
import Vue from 'vue'
import { Group, Cell, Divider } from 'vux'
import { mapState, mapActions } from 'vuex'
import ChannelItem from '~components/ChannelItem'

// 元 => 分
const Yfen = Vue.iBox.helper.Yfen

export default {
  name: "page-pay-channel",
  components: {
    Group,
    Cell,
    Divider,
    ChannelItem
  },
  data () {
    return {
      tradeAmount: "",
      channelList: []
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.home.mchtInfo,
    }),
  },
  
  methods: {
    ...mapActions([
      'getPaychannel',
    ]),
    onClickItem (item) {
      let params = {
        tradeAmount: this.tradeAmount,
        merchantName: this.mchtInfo.merchantName
      }
      let query = {
        channelCode: item.channelCode
      }
      this.$router.push({name:"payConfirm", params:params, query:query})
    }
  },
  created() {
    let { tradeAmount } = this.$route.params
    this.tradeAmount = tradeAmount
    this.getPaychannel()
    .then((res={}) => {
      this.channelList = res.channelList || []
    })
  }
}
</script>

<style lang="less">
@import '~assets/less/views/public';

</style>