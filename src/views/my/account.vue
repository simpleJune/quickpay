<template>
  <div class="page-home">
    fddfdf
  </div>
</template>

<script>
import { Grid, GridItem, Swiper, SwiperItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  name: "page-home",
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      baseFontSize: parseFloat(window.document.documentElement.style.fontSize)
    }
  },
  computed: {
    ...mapState({
        headerParams: state => state.global.headerParams
    }),
    ads_list() {
      return [
        { imgUrl: require("~assets/images/bankCard.jpg") },
        { imgUrl: require("~assets/images/ads-item.jpg") }
      ]
    },
    ads_height() {
      return 120/37.5 * this.baseFontSize + "px"
    }
  },
  mounted () {
    // 获取商户信息
    this.headerParams.accessToken &&
    this.headerParams.merchantNo &&
    this.$store.dispatch("getMchtInfo")
  },
  methods: {
    ...mapActions([
      ''
    ])
  }
}
</script>

<style lang=less>
@import '~assets/less/base/icon';
@import '~assets/less/base/common';

.page-home {
  margin-top: -16/@unit;
  background: url("~assets/images/bg.png") scroll no-repeat 0 0;
  background-size: 100% auto;
}
.home-quick,
.home-grids,
.home-ads {
  width: 100%;
  height: auto;
  overflow: hidden;
}

/*收款*/
.home-quick {
  height: 160/@unit;
  >li {
    width: 50%;
    height: auto;
    float: left;
    margin: 27/@unit 0;
    >a {
      display: block;
    }
    img {
      display: block;
      width: 80/@unit;
      height: 80/@unit;
      margin: 0 auto;
    }
    p {
      height: 26/@unit;
      line-height: 26/@unit;
      text-align: center;
      color: @font-color-white;
      font-size: 1.8*@font-size-10;
    }
    &.pay {
      opacity: .2;
    }
  }
  .iBox-fn__clearfix()
}

/*宫格*/
.home-grids {
  width: 92%;
  margin: 10/@unit auto;
  padding: 10/@unit 0;
  border-radius: 5/@unit;
  background-color: @bgColor-white;
  &:after {
    border: 0 none !important;
  }
  .weui-grid {
    padding: 10/@unit;
    &:before,
    &:after {
      border: 0 none;
    }
  }
  .weui-grid__icon {
    width: 41/@unit;
    height: 41/@unit;
  }
  .weui-grid__label {
    font-size: @font-size-15;
  }
}

/*广告*/
.home-ads {
  width: 92%;
  height: 120/@unit;
  margin: 13/@unit auto;
  border-radius: 5/@unit;
}

</style>