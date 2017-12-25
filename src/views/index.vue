<template>
  <div class="page-home">
    <ul class="home-quick">
      <li class="money">fdd</li>
      <li class="pay">fdd</li>
    </ul>

    <!--九宫格-->
    <grid class="home-grids">
      <grid-item link="/bank">
        <img slot="icon" src="~assets/images/icon-bank.png">
        <span slot="label">银行卡</span>
      </grid-item>
      <grid-item link="/bill">
        <img slot="icon" src="~assets/images/icon-bill.png">
        <span slot="label">交易记录</span>
      </grid-item>
      <grid-item link="/plan">
        <img slot="icon" src="~assets/images/icon-plan.png">
        <span slot="label">查看计划</span>
      </grid-item>
      <grid-item link="/bank">
        <img slot="icon" src="~assets/images/icon-bank.png">
        <span slot="label">银行卡</span>
      </grid-item>
      <grid-item link="/bill">
        <img slot="icon" src="~assets/images/icon-bill.png">
        <span slot="label">交易记录</span>
      </grid-item>
      <grid-item link="/plan">
        <img slot="icon" src="~assets/images/icon-plan.png">
        <span slot="label">查看计划</span>
      </grid-item>
    </grid>

    <!--广告-->
    <div class="home-ads">
      <swiper class="home-ads__container"
        v-if="adsList > 0"
      >
        <swiper-item class="home-ads__item"
          v-for="(adItem, adIdx) in adsList"
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
import Bankcard from '~components/Bankcard'

const CARD_STATUS_MAP = {
  "0": "定制计划",
  "1": "已解绑",
  "2": "定制计划",
  "3": "定制计划",
  "4": "查看计划"
}

export default {
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperItem,
    Bankcard
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.global.mchtInfo,
        creditCardList: state => state.global.creditCardList
    }),
    adsList() {
      return  [
        { imgUrl: "~assets/images/ads-item.jpg" }
      ]
    }
  },
  created () {
    // 获取广告数据
    /*this.getAdList({
      queryRules: 'credit_card_home_page',
      pageSize: 20
    }).then((res=[]) => {
      this.adsList = res
    })*/
  },
  methods: {
    ...mapActions([
      'getAdList'
    ]),

  }
}
</script>

<style lang=less>
@import '~assets/less/base/icon';
@import '~assets/less/base/common';

@userInfo-font-color-link: #D6AA4E;
@userInfo-bgColor-start: #232736;
@userInfo-bgColor-end: #323956;
@userInfo-bgColor-icon: #D8D8D8;

.page-home {
  background: url("~assets/images/bg.png") scroll no-repeat 0 0;
  background-size: 100% auto;
}
.home-quick,
.home-grids {
  width: 100%;
  height: auto;
  overflow: hidden;
}

/*收款*/
.home-quick {
  >li {
    width: 50%;
    height: 100/@unit;
    float: left;
  }
  .iBox-fn__clearfix()
}
/*宫格*/
/*广告*/
.home-user-profile {
  color: @font-color-white;
  .iBox-fn__linear(@toN:-180deg, @startColor:@userInfo-bgColor-start, @endColor:@userInfo-bgColor-end);
}
.home-user-profile__info {
  padding: 16/@unit;
  >img {
    display: block;
    float: left;
    .iBox-fn__radiusImg(30)
  }
  >span {
    display: block;
    height: 30/@unit;
    line-height: 30/@unit;
  }
  .home-user-profile__name {
    float: left;
    margin-left: 10/@unit;
    font-size: @font-size-14;
  }
  .home-user-profile__link {
    float: right;
    font-size: @font-size-13;
    padding-right: 18/@unit;
    &.iBox-icon__dbarrow-right {
      background-size: 18/@unit auto
    }
    >a {
      color: @userInfo-font-color-link;
    }
  }
}
.home-user-profile__num {
  >em {
    opacity: 1;
    font-style: normal;
    font-size: @font-size-14;
  }
  >span {
    opacity: 0.5;
    font-size: @font-size-12;
  }
}

</style>