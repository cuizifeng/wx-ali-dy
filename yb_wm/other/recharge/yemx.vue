<template>
  <view class="mh100 ">
    <navBar :title="title" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <nav-tab @changeTab="changeTab" class="" cname="fixedtop" :tabs="tabs" v-model="aIdx" vueId="686d4867-1"></nav-tab>
    <view class="mt90 ">
      <view class="f26 c9 t-c ">
        <view class="p2 " :hidden="!(aIdx==0)">{{'我的'+system.custom.balance+'：'+sl+user.balance}}<text class="ml50 ">{{'累计支出：'+sl+(info.expenditure||0)}}</text>
        </view>
        <view class="p2 " :hidden="!(aIdx==1)">{{'累计充值：'+sl+(info.money||0)}}<text class="ml50 ">{{'累计赠送：'+sl+(info.giveMoney||0)}}</text>
        </view>
      </view>
      <mg-cell :bbt="v.createdAt" :btt="v.note" bttc="f32" class="" cname="p43 f-s" :ft="v.type==1?'+'+v.money:'-'+v.money" isr="1" :vueId="'686d4867-2-'+i" v-for="(v, i) in dataList" :key="i"></mg-cell>
    </view>
    <jzz bgcolor="transparent" class="" imgn="zwye" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="686d4867-3">
    </jzz>
  </view>
</template>

<script>
import navTab from 'components/common/functionCmp/nav-tab.vue'
import jzz from 'components/common/jzz.vue'
import {
  utilMixins
} from 'common/utilMixins'
import {
  setNT,
  sljz
} from 'common/util'
export default {
  name: "yemx",
  components: {
    navTab,
    jzz
  },
  data: function () {
    return {
      aIdx: 0,
      tabs: [{
        name: "支出"
      }, {
        name: "收入"
      }],
      params: {
        page: 1,
        size: 10,
        type: 2
      },
      info: {}
    }
  },
  onLoad: function (t) {
    this.getSystem(), setNT(this.system.custom.balance + "明细"), this.aIdx = t.idx || 0, this.changeTab(
      this.aIdx)
  },
  mixins: [utilMixins, sljz],
  computed: {
    title() {
      return this.system.custom.balance + "明细"
    }
  },
  methods: {
    changeTab: function (t) {
      this.isget = this.mygd = !1, this.params.page = 1;
      var n = "";
      switch (t) {
        case 0:
          n = "2";
          break;
        case 1:
          n = "1";
          break
      }
      this.params.type = n, this.dataList = [], this.getList()
    },
    getList: function () {
      var t = this;
      this.$api.member_balance__details(t.params).then(res => {
        t.dataList = t.dataList.concat(res.list), t.info = res, t.isget = !0,
          t.mygd = t.params.size > res.list.length, t.params.page++;
      })
    }
  }
}
</script>
<style scoped>
.mt120 {
  margin-top: 120rpx;
}

.p43 {
  padding: 40rpx 30rpx;
}
</style>