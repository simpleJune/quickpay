<template>
  <div class="page-home">
    <ul class="home-quick">
      <li class="money">
        <router-link to="/bank/add">
          <img src="~assets/less/icon/money.png">
        </router-link>
        <p>收款</p>
      </li>
      <li class="pay">
        <router-link to="">
          <img src="~assets/less/icon/pay.png">
        </router-link>
        <p>还款</p>
      </li>
    </ul>

    <!--九宫格-->
    <grid class="home-grids" :rows="2" :cols="3">
      <grid-item link="/bank">
        <img slot="icon" src="~assets/less/icon/wodezhanghu.png">
        <span slot="label">我的账户</span>
      </grid-item>
      <grid-item link="/bill">
        <img slot="icon" src="~assets/less/icon/wodefenrun.png">
        <span slot="label">我的分润</span>
      </grid-item>
      <grid-item link="/plan">
        <img slot="icon" src="~assets/less/icon/zhangdanchaxun.png">
        <span slot="label">账单查询</span>
      </grid-item>
      <grid-item link="/bank">
        <img slot="icon" src="~assets/less/icon/wodeshanghu.png">
        <span slot="label">我的商户</span>
      </grid-item>
      <grid-item link="/bill">
        <img slot="icon" src="~assets/less/icon/wodefeilv.png">
        <span slot="label">我的费率</span>
      </grid-item>
      <grid-item link="/plan">
        <img slot="icon" src="~assets/less/icon/xinyongkabanli.png">
        <span slot="label">信用卡办理</span>
      </grid-item>
    </grid>

    <!--广告-->
    <div class="home-ads">
      <swiper class="home-ads__container"
        :height="ads_height"
        v-if="ads_list.length > 0"
      >
        <swiper-item class="home-ads__item"
          v-for="(adItem, adIdx) in ads_list"
          :key="adIdx"
        >
          <img :src="adItem.imgUrl">
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Swiper, SwiperItem } from 'vux'
import { mapState, mapActions } from 'vuex'

const CARD_STATUS_MAP = {
  "0": "定制计划",
  "1": "已解绑",
  "2": "定制计划",
  "3": "定制计划",
  "4": "查看计划"
}

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
        // creditCardList: state => state.home.creditCardList
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
  created () {
    // 获取广告数据
    /*this.getAdList({
      queryRules: 'credit_card_home_page',
      pageSize: 20
    }).then((res=[]) => {
      this.ads_list = res
    })*/
    
  },
  methods: {
    ...mapActions([
      ''
    ]),

  }
}
</script>

<style lang=less>
@import '~assets/less/base/icon';
@import '~assets/less/base/common';

.page-home {
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
    height: inherit;
    float: left;
    margin: 27/@unit 0;
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