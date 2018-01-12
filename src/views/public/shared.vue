<template>
  <div class="page__shared">
    <p><img src="http://120.79.68.8:8080/credit-quick-api/509495858115379200.png"></p>
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

<style lang="less">
@import "~assets/less/base/variable.less";

.page__shared {
  line-height: 5em;
  width: 88%;
  margin: 0 auto;
  text-align: center;
}
</style>