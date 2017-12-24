<template>
	<div :class="['iBox-bankcard', card_bg_color]" @click="$emit('click')">
		<div class="iBox-bankcard__lt">
			<p class="card-name">{{options.bankName}}  <em>信用卡</em></p>
			<p class="card-number">**** **** **** <em class="card-suffix">{{options.showName}}</em></p>
			<p class="card-date">
				<span class="start">账单日{{options.billDate||"--"}}日</span>
				<span class="end">还款日{{options.repayDate||"--"}}日</span>
			</p>
		</div>
		<slot name="plan"></slot>
		<i class="card-icon-sm"><img :src="card_icon_sm" alt="icon"></i>
		<i class="card-icon-lg"><img :src="card_icon_lg" alt="watermark"></i>
	</div>
</template>

<script>
const CARDS_MAP = {
  //红色背景
  "red": [
    "1", //中国银行
    "2", //工商银行
    "6", //中信银行
    "8", //华夏银行
    "10", //广发银行
    "12", //招商银行
    "14" //北京银行
  ],

  //蓝色背景
  "blue": [
    "4", //建设银行
    "50", //上海银行
    "13", //兴业银行
    "5", //交通银行
    "51" //浦发银行
  ],

  //绿色背景
  "green": [
    "3", //农业银行
    "26", //邮政银行
    "9" //民生银行
  ],

  //紫色背景
  "purple": [
    "7" //光大银行
  ],

  //橙色背景
  "orange": [
    "11" //平安银行
  ]
};
const bgColorFormatter = function(val) {
  let bgColor = "X";
  for(let key in CARDS_MAP) {
    if(CARDS_MAP.hasOwnProperty(key)) {
      let item = CARDS_MAP[key]
      if(item.find((v) => v==val) !== undefined) {
        bgColor = key;
        break;
      }
    }
  }
  return bgColor;
};
const bgIconFormatter = function(val) {
  let bgIcon = "x";
  for(let key in CARDS_MAP) {
    if(CARDS_MAP.hasOwnProperty(key)) {
      let item = CARDS_MAP[key]
      if(item.find((v) => v==val) !== undefined) {
        bgIcon = val;
        break;
      }
    }
  }
  return bgIcon;
};

export default {
	name: "bankcard",
	props: {
		options: {
			type: Object,
			default: {}
		}
	},
  computed: {
    card_bg_color() {
      return bgColorFormatter(this.options.bankId);
    },
    card_icon_sm() {
      return require('~assets/images/bank_bg/bankcard_icon_'+ bgIconFormatter(this.options.bankId) + '.png')
    },
    card_icon_lg() {
      return require('~assets/images/bank_bg/bankcard_bg_'+ bgIconFormatter(this.options.bankId) + '.png')
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/base/common";

// color: red
@cardColorRed: #B8394A; // 渐变开始颜色
@cardColorRed2: #F06476; // 渐变结束颜色
@cardColorRed3: #C04354; // 底部透明色

// color: green
@cardColorGreen: #009783;
@cardColorGreen2: #46BEAE;
@cardColorGreen3: #079A87;

// color: blue
@cardColorBlue: #1A65A4;
@cardColorBlue2: #4686B8;
@cardColorBlue3: #1E6199;

// color: purple
@cardColorPurple: #744890;
@cardColorPurple2: #B167C1;
@cardColorPurple3: #7A4793;

// color: orange
@cardColorOrange: #F65A57;
@cardColorOrange2: #E9897A;
@cardColorOrange3: #E85752;

// color: yelow
@cardColorX: #EE9729;
@cardColorX2: #EEC480;
@cardColorX3: #E99D3B;

// bankCard
.iBox-bankcard {
  width: 100%;
  height: 110/@unit;
  border-radius: 5/@unit;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1/@unit 2/@unit 0 rgba(0,0,0,0.04);
  em {
    font-style: normal;
  }
  >i {
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    >img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  >i.card-icon-sm {
    width: 40/@unit;
    height: 40/@unit;
    left: 13/@unit;
    top: 16/@unit;
  }
  >i.card-icon-lg {
    width: 150/@unit;
    height: 150/@unit;
    top: -20/@unit;
    right: 27/@unit;
  }
  .card-plan {
  	width: 100%;
  	height: 30/@unit;
  	overflow: hidden;
  	position: absolute;
  	bottom: 0;
  	z-index: 1;
  	border-bottom-left-radius: 5/@unit;
  	border-bottom-right-radius: 5/@unit;
  	>p {
	  	font-size: @font-size-12;
	  	line-height: 30/@unit;
	  	text-align: center;
	  	color: @font-color-white;
  	}
  	~i.card-icon-lg {
  		top: -4/@unit;
  	}
  }

  //红色背景
  &.red {
    .iBox-fn__linear(-16deg, @cardColorRed, @cardColorRed2);
    .card-plan {
    	>p {
    		background-color: fade(@cardColorRed3, 90%);
    	}
    }
  }
  //绿色背景
  &.green {
    .iBox-fn__linear(-16deg, @cardColorGreen, @cardColorGreen2);
    .card-plan {
    	>p {
    		background-color: fade(@cardColorGreen3, 90%);
    	}
    }
  }
  //蓝色背景
  &.blue {
    .iBox-fn__linear(-16deg, @cardColorBlue, @cardColorBlue2);
    .card-plan {
    	>p {
    		background-color: fade(@cardColorBlue3, 90%);
    	}
    }
  }
  //紫色背景
  &.purple {
    .iBox-fn__linear(-16deg, @cardColorPurple, @cardColorPurple2);
    .card-plan {
    	>p {
    		background-color: fade(@cardColorPurple3, 90%);
    	}
    }
  }
  //橙色背景
  &.orange {
    .iBox-fn__linear(-16deg, @cardColorOrange, @cardColorOrange2);
    .card-plan {
      >p {
        background-color: fade(@cardColorOrange3, 90%);
      }
    }
  }
  //默认背景
  &.X {
    .iBox-fn__linear(-16deg, @cardColorX, @cardColorX2);
    .card-plan {
    	>p {
    		background-color: fade(@cardColorX3, 90%);
    	}
    }
  }
}

.iBox-bankcard__lt {
  padding-top: 13/@unit;
  padding-left: 73/@unit;
  >p {
    height: 30/@unit;
    line-height: 22/@unit;
    color: @font-color-white;
    &.card-name {
      em {
        font-size: @font-size-13;
      }
    }
    &.card-number {
      em {
        font-size: 1.8*@font-size-10;
      }
    }
    &.card-date {
      opacity: 0.8;
      font-size: @font-size-12;
      >span {
        margin-right: 30/@unit;
      }
    }
  }

}

</style>