<template>
  <div class="page-pay__channel">
    <div class="page-preview txt">
      <h1>&yen; {{fields.tradeAmount}}</h1>
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
      channelList: []
    }
  },
  computed: {
    ...mapState({
      fields: state => state.pay.fields,
      mchtInfo: state => state.home.mchtInfo,
    }),
  },
  
  methods: {
    ...mapActions([
      'getPaychannel',
    ]),
    onClickItem (item) {
      let params = {
        channelName: item.channelName,
      }
      let query = {
        channelCode: item.channelCode
      }
      this.$router.push({name:"payConfirm", query:query, params:params})
    }
  },
  created() {
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