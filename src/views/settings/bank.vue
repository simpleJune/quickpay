<template>
	<div :class="{'page-bank__index':true, fixed:card_list.length>=4}">
    <div :class="{'page-bank__group':true, padding:card_list.length>=1}">
  		<div class="page-bank__row" v-for="(cardItem, cardIdx) in card_list">
  			<bankcard
          :options="cardItem"
          :key="cardIdx"
          @click="onClickCardItem(cardItem)"
        ></bankcard>
  		</div>
    </div>
		<div class="page-bank__add">
      <div class="add-btn right-triangle">
        <router-link to="/bank/add">添加信用卡</router-link>
      </div>
    </div>
    <actionsheet
      v-model="showAction"
      :menus = "menus"
      :show-cancel="true"
      @on-click-menu="onClickMenu"
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
          label: '修改银行卡信息',
          value: 'edit'
        },
        {
          label: '解除绑定',
          value: 'unbind'
        }
      ],
      selectedCard: {} //选中的卡
    }
  },
  computed: {
    ...mapState({
        creditCardList: state => state.global.creditCardList,
        mchtInfo: state => state.global.mchtInfo
    }),
    card_list() {
      return this.creditCardList.filter((cardItem) => {
        return cardItem.status != "1"
      })
    }
  },
  methods: {
    onClickMenu(menuKey) {

    },
    onClickCardItem(cardItem) {

    },
    ...mapActions(['unBindCreditCard', 'getCreditCardList'])
  },
  mounted() {
    this.getCreditCardList()
    .catch(err => {})
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
    .page-bank__add {
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

.page-bank__add {
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