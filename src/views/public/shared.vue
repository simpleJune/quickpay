<template>
  <div class="page__shared">
    <img :src="mchtInfo.qrCodeUrl">
    <p>长按图片保存到相册</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'public-shared',
  computed: {
    ...mapState({
        mchtInfo: state => state.home.mchtInfo
    })
  },
  created () {
    this.$store.dispatch("getMchtInfo")
  }
}

</script>

<style lang="less">
@import "~assets/less/base/variable.less";

.page__shared {
  >img {
    width: 256/@unit;
    height: 256/@unit;
    display: block;
    margin: 0 auto;
  }
  >p {
    text-align: center;
    line-height: 3.6em;
  }
}
</style>