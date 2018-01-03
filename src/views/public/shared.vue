<template>
  <div class="page__404">
    <p>分享注册</p>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  name: 'public-shared',
  components: {
    XButton
  }
}

</script>

<style lang="less" scoped>
@import "~assets/less/base/variable.less";

.page__shared {
  line-height: 5em;
  width: 88%;
  margin: 0 auto;
  text-align: center;
}
</style>