<template>
  <v-result :iconType="result_icon" :buttonText="result_text" @on-click-result="onClickResult">
    <section class="v-result__bd" slot="resultTips">
      <p class="state">{{result_title}}</p>
      <p class="info">{{result_info}}</p>
    </section>
  </v-result>
</template>

<script>
import { XButton } from 'vux'
import VResult from '~components/VResult'

// 提示小图标
const ICON_MAP = {
  "0": "fail",
  "1": "success",
  "2": "audit",
  "3": "network"
};

// 按钮文字
const TEXT_MAP = {
  "0": "重新制定计划",
  "1": "返回首页",
  "2": "我知道了",
  "3": "我知道了"
};

// 状态提示标题
const STATE_MAP = {
  "0": "计划定制失败",
  "1": "计划提交成功",
  "2": "正在审核中",
  "3": "暂不支持使用，敬请期待"
};

// 详细提示信息
const INFO_MAP = {
  "0": "计划定制失败",
  "1": "还款计划正在处理中，请实时关注",
  "2": "我们将在1个工作日内进行审核请耐心等待",
  "3": ""
};

export default {
  name: 'public-result',
  components: {
    XButton,
    VResult
  },
  computed: {
    state() {
      // 0、失败 1、成功 2、审核
      let {
        params: {
          resultState = "0", // 结果状态标示
          resultTitle = "", // 结果页提示title
          resultDesc = "", // 结果页提示描述信息
          resultText = "", // 结果页按钮显示文字
          errorCode = "", // 错误码
          errorDesc = "" // 错误描述
        }
      } = this.$route

      // 按钮文字
      let defaultText = TEXT_MAP["0"]
      TEXT_MAP[resultState] = resultText || defaultText

      // 状态提示标题
      let defaultTitle = STATE_MAP["0"]
      STATE_MAP[resultState] = resultTitle || defaultTitle

      // 详细提示信息
      let defaultDesc = INFO_MAP["0"]
      INFO_MAP[resultState] = (resultDesc || errorDesc || defaultDesc) + ` ${errorCode? "["+ errorCode +"]":""}`

      return resultState
    },
    result_title() {
      return STATE_MAP[this.state]
    },
    result_info() {
      return INFO_MAP[this.state]
    },
    result_icon() {
      return ICON_MAP[this.state]
    },
    result_text() {
      return TEXT_MAP[this.state]
    }
  },
  methods: {
    onClickResult() {
      let {
        params: {
          resultRouteName = "home", // 点击按钮跳转路由
        }
      } = this.$route
      // 如果有设置routeName直接跳转，默认都跳转到首页面
      this.$router.replace({ name:resultRouteName })
    }
  }
}
</script>
