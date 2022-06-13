<template>
  <view class="">
    <navBar :title="'订单'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="fixedtop bf5 ">
      <nav-tab @changeTab="changeTab" v-model="aIdx" :tabs="tabs" :value="aIdx" vueId="542f95ff-1"></nav-tab>
    </view>
    <view class="ccbd p3 ">
      <dn-order v-model="laIdx" @refresh="dnrefresh" :datalist="dataList" :labelarr="[]" :ltop="0" :otype="1" :value="laIdx" vueId="542f95ff-2"></dn-order>
      <jzz bgcolor="transparent" :mygd="mygd" :nodata="dataList.length==0&&isget" otext="暂无店内订单" vueId="542f95ff-3"></jzz>
    </view>
  </view>
</template>

<script>
import {
  setNT,
  sljz
} from 'common/util';
import navTab from 'components/common/functionCmp/nav-tab.vue';
import dnOrder from 'yb_wm/index/components/dn-order.vue';
import jzz from 'components/common/jzz.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: "myCoupon",
  components: {
    navTab,
    dnOrder,
    jzz
  },
  data: function () {
    return {
      aIdx: 0,
      tabs: [{
        name: "全部",
        s: ""
      }, {
        name: "待付款",
        s: "1"
      }, {
        name: "已支付",
        s: "2"
      }, {
        name: "已关闭",
        s: "3"
      }],
      params: {
        page: 1,
        size: 10,
        state: 1
      }
    }
  },
  onLoad: function (t) {
    var e = this;
    e.getSystem(), setNT("堂食订单"), e.getLoginInfo();
    e.aIdx = +t.idx || 0, e.changeTab(e.aIdx), e.isLoad = !0;
  },
  onShow: function () {
    this.isLoad && this.changeTab(this.aIdx)
  },
  mixins: [sljz],
  computed: {},
  methods: {
    ...mapActions(["getConfig"]),
    dnrefresh: function (t) {
      this.refresh()
    },
    refresh: function () {
      this.changeTab(this.aIdx)
    },
    changeTab: function (t) {
      this.isget = this.mygd = !1, this.params.page = 1, this.params.state = this.tabs[t].s, this.dataList = [],
        this.getList()
    },
    getList: function () {
      var t = this;
      var n, a;
      this.$api['in-store_my__in__store__order'](t.params).then(res => {
        a = res, t.dataList = t.dataList.concat(a), t.isget = !0, t.mygd = t.params
          .size > a.length, t.params.page++;
      })
    }
  }
}
</script>
<style scoped>
.wxts {
  height: 70rpx;
}

.ccbd {
  margin-top: 96rpx;
}
</style>