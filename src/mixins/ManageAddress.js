/*!
 *
 *
 * Copyright 2011-2017 IBOXPAY,Co.,Ltd.
 * http://www.iboxpay.com
 *
 * Created by huangliangxing on 2017/6/22.
 */
export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    chooseCityName () {
      let choose = this.$store.state.address.choose
      if (choose.cityCode) {
        return `${choose.provinceName} ${choose.cityName}`
      } else {
        return '请选择省市地区'
      }
    },
    chooseCountyName () {
      let choose = this.$store.state.address.choose
      if (choose.countyCode) {
        return `${choose.provinceName} ${choose.cityName} ${choose.countyName}`
      } else {
        return '请选择区级地区'
      }
    }
  },
  methods: {
    showCity () {
      this.$store.dispatch('_updateAddressChoose', {chooseType: 'chooseCity'})
      this.$router.push({name: 'ibox_choose_address'})
    },
    showCounty () {
      this.$store.dispatch('_updateAddressChoose', {chooseType: 'chooseCounty'})
      this.$router.push({name: 'ibox_choose_address'})
    }
  }
}