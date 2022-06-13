<template>
  <view class="">
    <navBar :title="'我的卡券'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="fixedtop bf ">
      <view v-if="false" class="f-row ">
        <view class="f-1 ">
          <nav-tab @changeTab="changeTab" v-model="aIdx" color="#ff3a48" ifsize="32" isscroll="true" itw="27%" ncolor="#707070" :tabs="tabs" :value="aIdx" vueId="09db58e3-1"></nav-tab>
        </view>
        <view @tap="go({url:'dh'})" class="f-c p03 f32 ">兑换卡券
        </view>
      </view>
      <view class="f-row o-x-s stabsc ">
        <view @tap="sclick(i)" class="f-c p03 f30 " :style="'color:'+(saIdx==i?'#ff3a48':'#707070')+';'" v-for="(v, i) in stabs" :key="i">{{v.name}}</view>
      </view>
    </view>
    <view class="cmymain p3 ">
      <mg-coupon @btntap="btntap(v)" @operation="operation" class="" cname="mb30" :co="v" :color="tColor" ttype="2" :vueId="'09db58e3-2-'+i" v-for="(v, i) in dataList" :key="i"></mg-coupon>
      <jzz bgcolor="transparent" class="" imgn="zwhb" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="09db58e3-3">
      </jzz>
    </view>
  </view>
</template>

<script>
import navTab from "components/common/functionCmp/nav-tab.vue";
import jzz from "components/common/jzz.vue";
import mgCoupon from "components/common/mg-coupon.vue";
import {
  setNT,
  sljz
} from 'common/util';

export default {
  name: "myCoupon",
  components: {
    navTab,
    mgCoupon,
    jzz,
  },
  data: function () {
    return {
      aIdx: 0,
      stabs: [{
        name: "未使用",
        type: 1
      }, {
        name: "已使用",
        type: 2
      }, {
        name: "已失效",
        type: 3
      }],
      saIdx: 0,
      params: {
        size: 10,
        page: 1,
        state: 1,
        type: 2
      }
    }
  },
  onLoad: function (t) {
    var e = this;
    e.getSystem(), setNT("我的卡券"), e.getLoginInfo();
    e.aIdx = +t.idx || 0, e.changeTab(e.aIdx), e.isOnLoad = !0;
  },
  onShow: function () {
    this.isOnLoad && this.refresh()
  },
  mixins: [sljz],
  computed: {
    tabs: function () {
      return [
        {
          name: this.system.custom.takeOut,
          type: 1
        },
        {
          name: "到店",
          type: 2
        }]
    }
  },
  methods: {
    refresh: function () {
      this.changeTab(this.aIdx)
    },
    changeTab: function (t) {
      this.isget = this.mygd = !1, this.params.page = 1, this.params.type = this.tabs[t].type, this.dataList = [],
        this.getList()
    },
    sclick: function (t) {
      this.saIdx = t, this.isget = this.mygd = !1, this.params.page = 1, this.params.state = this.stabs[t].type,
        this.dataList = [], this.getList()
    },
    getList() {
      var t = this;
      t.params.type = 2
      t.params.size = 100
      console.log('1111111111');
      console.log(t.params);
      this.$api.coupon_my__coupon(t.params).then(res => {
        // t.dataList = t.dataList.concat(res), t.isget = !0, t.mygd = t.params.size > res.length, t.params.page++;
        t.dataList = res, t.isget = !0, t.mygd = t.params.size > res.length, t.params.page++;
      })
    },
    btntap: function (t) {
      var e = this;
      e.checkLogin().then(() => {
        t.storeId > 0 ? e.go({
          t: 6,
          url: "/pages/tabbar/order/index"
        }) : e.go({
          t: 6,
          url: "/pages/tabbar/index/index"
        });
      })
    }
  }
}

</script>
<style scoped>
.cmymain {
  margin-top: 186rpx;
}

.stabsc {
  height: 90rpx;
}
</style>