<template>
	<div :class="{'page-bank__index':true, fixed:card_list.length>=4}">
    <div :class="{'page-bank__group':true, padding:card_list.length>=1}">
  		<div class="page-bank__row" v-for="(cardItem, cardIdx) in card_list" :key="cardIdx">
  			<bankcard
          :options="cardItem"
          @on-click-item="onClickCardItem"
        ></bankcard>
  		</div>
    </div>
		<div class="page-bank__link">
      <div class="add-btn right-triangle">
        <router-link to="/bank/add">添加信用卡</router-link>
      </div>
    </div>
    <actionsheet
      v-model="showAction"
      :menus = "menus"
      :show-cancel="true"
      @on-click-menu="onClickMenuItem"
    ></actionsheet>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Bankcard from '~components/Bankcard'
import { Actionsheet } from 'vux'

export default {
	components: {
		Bankcard,
    Actionsheet
	},
  data() {
    return {
      showAction: false,
      menus: [
        {
          label: '解除绑定',
          value: 'unbind'
        }
      ]
    }
  },
  computed: {
    ...mapState({
        creditList: state => state.home.mchtInfo.creditList||[]
    }),
    card_list() {
      return this.creditList;
    }
  },
  methods: {
    onClickMenuItem(menuItem) {
      this.showAction = false
      console.log("onClickMenuItem", menuItem)
    },
    onClickCardItem(cardItem) {
      this.showAction = true
      console.log("onClickCardItem", cardItem)
    },
    ...mapActions(['getCreditCardList'])
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

.page-bank__index {
	width: 100%;
	min-height: 667/@unit;
	height: auto;
	overflow: hidden;
	// background-color: @page-bank-bgColor;
  &.fixed {
    .page-bank__group {
      padding-bottom: 54/@unit;
    }
    .page-bank__link {
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }
}

.page-bank__group {
  &.padding {
    padding: 10/@unit 0;
  }
}

.page-bank__row {
	margin: 10/@unit 16/@unit;
}

.page-bank__link {
  background: @bgColor-white;
  width: 100%;
  .add-btn {
    height: 44/@unit;
    line-height: 44/@unit;
    padding: 0 16/@unit;
    >a {
      display: block;
      width: 100%;
      height: inherit;
    }
  }
}
</style>