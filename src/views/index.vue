<template>
  <div class="page-home">
    <div class="home-user-profile">
      <!-- 头像信息 -->
      <div class="home-user-profile__cell">
        <div class="home-user-profile__info clearfix">
          <img src="~assets/images/man.png">
          <span class="home-user-profile__name">{{mchtInfo.userName | formatUserName}}</span>
          <span class="home-user-profile__link iBox-icon__dbarrow-right" v-if="card_index > 0">
            <router-link to="/bank/add">添加信用卡</router-link>
          </span>
        </div>
      </div>

      <!-- 绑定银行卡 -->
      <div class="home-user-cards__cell">
        <swiper class="home-user-cards__container"
          v-if="card_index > 0"
          :show-dots="false"
          @on-index-change="onChangeCardIndex"
        >
          <swiper-item class="home-user-cards__item"
            v-for="(cardItem, cardIdx) in card_list"
            :key="cardIdx"
          >
            <bankcard :options="cardItem" @click="onClickCardItem(cardItem)">
              <div class="card-plan" slot="plan">
                <p>{{cardItem._status}}</p>
              </div>
            </bankcard>
          </swiper-item>
        </swiper>
        <div class="home-user-cards__container" v-else>
          <div class="home-user-cards__item">
            <div class="card-add">
              <router-link to="/bank/add">
                <img src="~assets/images/icon-add.png">
              </router-link>
              <p>添加信用卡</p>
            </div>
          </div>
        </div>
        <p class="home-user-profile__num">
          <em>{{card_index}}</em>
          <span>/{{card_count}}</span>
        </p>
      </div>

      <!-- 文字广告 -->
      <div class="home-user-ads__cell">
        <ul>
          <li>
            <i class="iBox-icon__tips"></i>
            <swiper auto direction="vertical" class="text-scroll" :height="ads_txt_height"
              :interval=5000
              :show-dots="false"
            >
              <swiper-item v-for="(txtItem, txtIdx) in ads_text" :key="txtIdx">
                <p @click="onClickAdGo(txtItem)">{{txtItem.adDesc}}</p>
              </swiper-item>
            </swiper>
          </li>
        </ul>
      </div>
    </div>

    <!--九宫格-->
    <grid class="home-user-grids">
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

    <!--图片广告-->
    <div class="home-user-ads">
      <div class="home-user-ads__item" v-for="(imgItem, imgIdx) in ads_images"
        :key="imgIdx"
        :style="{backgroundImage: 'url(' + imgItem.imageUrl + ')'}"
        @click="onClickAdGo(imgItem)"
      ></div>
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
      adsList: [],
      cardIndex: 0,
      baseFontSize: parseFloat(window.document.documentElement.style.fontSize)
    }
  },
  computed: {
    ...mapState({
        mchtInfo: state => state.globalStore.mchtInfo,
        creditCardList: state => state.globalStore.creditCardList
    }),
    card_index: {
      get() {
        let cardsLen = this.card_list.length>0? 1:0
        return this.cardIndex>0? this.cardIndex : cardsLen
      },
      set(newVal) {
        this.cardIndex = newVal
      }
    },
    card_count() {
      return this.card_list.length
    },
    card_list() {
      return this.creditCardList.filter((cardItem) => {
        cardItem._status = CARD_STATUS_MAP[cardItem.status]
        return cardItem.status != "1"
      })
    },
    ads_text() {
      return this.adsList.filter((adsItem) => {
        return adsItem["imageUrl"] === undefined
      })
    },
    ads_images() {
      return this.adsList.filter((adsItem) => {
        return adsItem["imageUrl"] !== undefined
      })
    },
    ads_txt_height() {
      return 40/37.5 * this.baseFontSize + "px"
    }
  },
  created () {
    // 获取广告数据
    this.getAdList({
      queryRules: 'credit_card_home_page',
      pageSize: 20
    }).then((res=[]) => {
      this.adsList = res
    })
  },
  methods: {
    ...mapActions([
      'getAdList'
    ]),
    onChangeCardIndex (index) {
      this.card_index = ++index
    },
    onClickAdGo(item) {
      let redirectUrl = item.redirectUrl
      let ua = window.navigator.userAgent
      if(
        ua.match(/(iPad).*OS\s([\d_]+)/) ||
        ua.match(/(iPod)(.*OS\s([\d_]+))?/) ||
        ua.match(/(iPhone\sOS)\s([\d_]+)/)
      ) {
        redirectUrl = redirectUrl.replace(/^(.*?(?=\?)).*$/i, "$1")
      }
      this.$iBox.cashbox.go(redirectUrl)
    },
    onClickCardItem(item) {
      this.$store.commit("HOME_MUTATION_SET_CARD", item)
      switch(item.status) {
        case 0: //已绑定
          this.$router.push({name:"planAddStep1"})
          break
        case 2: //待完善
          this.$router.push(`/bank/edit/perfectFlag/${item.userCardId}`)
          break
        case 3: //审核中
          this.$router.push({name:"publicResult", params:{ resultState:"2" }})
          break
        case 4: //还款中
          this.$router.push({name:"planDetail", query:{userCardId:item.userCardId}})
          break
        default:
          break;
      }
    }
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

.home-user-profile,
.home-user-grids,
.home-user-ads {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.home-user-profile__cell {
  height: 62/@unit;
}
.home-user-cards__cell {
  height: 178/@unit;
}
.home-user-ads__cell {
  height: 40/@unit;
}

/*用户信息*/
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

/*银行卡列表*/
.home-user-cards__cell {
  width: 100%;
  >p {
    color: @font-color-white;
    text-align: center;
    line-height: 36/@unit;
  }
}
.home-user-cards__container {
  height: 142/@unit;
  >div {
    height: inherit !important;
  }
}
.home-user-cards__item {
  >div {
    width: 315/@unit;
    height: inherit;
    margin: 0 auto;
  }
  .card-add {
    text-align: center;
    box-shadow: 0 3px 5px 0 #232736;
    border-radius: 10px;
    .iBox-fn__linear(@toN:153deg, @startColor:#72778D, @endColor:#373E57);
    >a {
      display: inline-block;
      width: 60/@unit;
      height: 60/@unit;
      margin: 29/@unit auto 8/@unit;
      >img {
        width: 100%;
        height: auto;
      }
    }
    >p {
      color: @font-color-white;
      font-size: @font-size-12;
    }
  }
}

/*九宫格*/
.home-user-grids {
  background-color: @bgColor-white;
  margin: 10/@unit 0;
  font-size: @font-size-13;
  &:before {
    border-width: 0 !important;
  }
  p {
    opacity: 0.8;
  }
  .weui-grid {
    &:before,
    &:after {
      border-width: 0;
    }
  }
  .weui-grid__icon {
    width: 40/@unit;
    height: 40/@unit;
  }
}

/*图文广告*/
.home-user-ads__cell {
  background-color: fade(@userInfo-bgColor-start, 30%);
  ul>li {
    height: 40/@unit;
    line-height: 40/@unit;
    font-size: @font-size-12;
    overflow: hidden;
    list-style: none;
    .iBox-fn__clearfix();
    >i {
      display: block;
      float: left;
      width: 20/@unit;
      height: 20/@unit;
      margin: 10/@unit 10/@unit;
    }
    >.text-scroll {
      width: 320/@unit;
      height: inherit;
      line-height: inherit;
      p {
        width: 100%;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: @font-color-white;
      }
    }
  }
}
.home-user-ads__item {
  width: 345/@unit;
  height: 150/@unit;
  margin: 0 auto 15/@unit;
  border-radius: 4/@unit;
  box-shadow: 0 3/@unit 5/@unit 0 #E5E5E5;
  background-color: @bgColor-white;
  background-size: cover;
}

</style>