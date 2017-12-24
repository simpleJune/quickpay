<template>
  <div class="page__404">
    <p>[404] 您访问的页面不存在。</p>
    <x-button action-type="button" type="primary" @click.native="$iBox.cashbox.exit()">我知道了</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  name: 'public-404',
  components: {
    XButton
  }
}

</script>

<style lang="less" scoped>
@import "~assets/less/base/variable.less";

.page__404 {
  line-height: 5em;
  width: 88%;
  margin: 0 auto;
  text-align: center;
}
</style>