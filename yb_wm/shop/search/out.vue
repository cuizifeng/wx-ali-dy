<template>
  <view class="mh100 bf ">
    <navBar :title="'搜索'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="searchc p3 f-y-c ">
      <view class="f-g-1 scl bf2f f-y-c p03 ">
        <text class="iconfont iconsearch c0 "></text>
        <input autoFocus="true" @confirm="confirm" class="f-1 p02 " confirmType="search" focus="true" placeholder="请输入关键字搜索" placeholderClass="cb2" v-model.trim="params.keyword" />
        <text @tap="cleanKey" class="iconfont iconyx " style="color:#ADACAB;" v-if="params.keyword"></text>
      </view>
      <view @tap="confirm" class="f-g-0 c8 ml30 ">搜索</view>
    </view>
    <view class="p03 " :hidden="!!issearch">
      <view class="p30 f-x-bt ">
        <view class="wei ">搜索历史</view>
        <view @tap="clear" class="f-y-c p2 ">
          <text class="iconfont iconshanchu c3 "></text>
        </view>
      </view>
      <view class="f-raw ">
        <view @tap="setKey(v)" class="f26 bf2f mr20 mb20 c3 lstag " v-for="(v, i) in history" :key="i">{{v}}</view>
      </view>
    </view>
    <view class="" v-if="query.page=='index'">
      <view @tap="goDl(v)" class="f-row p23 hlb " hoverClass="be" v-for="(v, i) in dataList" :key="i">
        <view class="f-g-0 mr15 ">
          <text class="iconfont iconmd "></text>
        </view>
        <view class="f-g-1 ">
          <view class="f-y-c f30 ">
            <view class="t-o-e c0 ">{{v.name}}</view>
            <view class="f-g-0 f-y-c ">
              <text class="pai okzt f-c " v-if="isText(v, '1')">堂</text>
              <text class="mai okzt f-c " v-if="isText(v, '2')">买</text>
              <text class="wai okzt f-c " v-if="v.isOrder==1">外</text>
            </view>
          </view>
          <view class="f-y-c f24 c9 mt15 ">
            <view class="f-g-1 t-o-e ">
              <block v-if="v.typePname">
                <text class="">{{typeName(v)}}</text>
                <text class="m05 ">|</text>
              </block>
              <text class="">{{v.address}}</text>
            </view>
            <view class="f-g-0 ">{{v.distance}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bf f-raw " v-else>
      <view class="w100 " v-for="(v, i) in dataList" :key="i">
        <mg-cell @tab="goDl(v)" brs="10rpx" class="" h="150" :img="v.icon" isr="1" noc="1" :vueId="'4101edb2-1-'+i" :vueSlots="['bd']" w="150">
          <view class="" slot="bd">
            <view class="f-bt ">
              <text class="t-o-e ">{{v.name}}</text>
            </view>
            <view class="f-bt mt15 ">
              <text class="f24 c9 t-o-e ">{{v.body}}</text>
            </view>
            <view class="mt10 f-row " v-if="v.outVipPrice>0">
              <view class="vipl f-y-c ">
                <view class="">{{sl+v.outVipPrice}}</view>
              </view>
              <view class="vipr f-y-c ">VIP</view>
            </view>
            <view class="f-x-bt mt10 ">
              <text class="t-o-e " :style="'color:'+tColor+';'">{{sl+v.price}}</text>
              <button class="f-g-0 cartadd " :style="'background:'+tColor+';'"></button>
            </view>
          </view>
        </mg-cell>
      </view>
    </view>
    <view class="" :hidden="!issearch">
      <jzz class="" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="4101edb2-2"></jzz>
    </view>
  </view>
</template>

<script>
import jzz from 'components/common/jzz.vue';
import {
  message,
  modal,
  setNT
} from 'common/util';
import {
  mapState
} from 'vuex';
export default {
  name: "order-index",
  components: {
    jzz
  },
  data: function () {
    return {
      query: {},
      history: [],
      key: "",
      issearch: !1,
      dataList: [],
      isget: !1,
      mygd: !1,
      params: {}
    }
  },
  onLoad: function (e) {
    var r = this;
    var s;
    r.query = e, r.getSystem({
      nosetNB: 1
    });
    // setNT("shopGoods" == e.page ? r.sjxx.shopData.name + "-搜索商品" : "搜索");
    if ("shopdl" == e.page || "shopGoods" == e.page) {
      r.params = {
        storeId: r.storeInfo.id || 1,
        page: 1,
        size: 10,
        keyword: "",
        item: "1"
      }, r.query.api = "good_select__good"

    }
    if ("index" == e.page) {
      // (0, o.getDw)({
      // 								t: 0
      // 							});
      r.params = {
        lat: s.latitude,
        lng: s.longitude,
        page: 1,
        size: 10,
        keyword: "",
        item: ""
      }, r.query.api = "StoreList";
    }
    uni.getStorageSync("searchHistory") || uni.setStorageSync("searchHistory", []),
      r.history = uni.getStorageSync("searchHistory");
  },
  onReachBottom: function () {
    !this.mygd && this.isget && (this.isget = !1, this.getList())
  },
  computed: {
    ...mapState(['sjxx']),
    ...mapState({
      storeInfo: function (t) {
        return t.config.storeInfo
      }
    })
  },

  methods: {
    setKey: function (t) {
      this.params.keyword = t, this.confirm()
    },
    cleanKey: function () {
      this.params.keyword = "", this.issearch = !1, this.isget = !1, this.mygd = !1, this.params.page = 1, this
        .dataList = []
    },
    clear: function () {
      var e = this;
      modal("确认清空搜索历史吗？").then(() => {
        e.history = [], t.removeStorageSync("searchHistory")
      })
    },
    confirm: function (t) {
      if (!this.params.keyword) return message("请输入搜索内容", 3);
      this.issearch = !0,
        this.isget = !1,
        this.mygd = !1,
        this.params.page = 1,
        this.dataList = [],
        this.getList(),
        this.setHistory()
    },
    getList: function () {
      var t = this;
      this.$api[t.query.api](t.params).then(res => {
        t.dataList = t.dataList.concat(res), t.isget = !0, t.mygd = t.params
          .size > res.length, t.params.page++;
      })
    },
    setHistory: function () {
      var e = this,
        r = uni.getStorageSync("searchHistory"); -
          1 == r.findIndex((function (t) {
            return t == e.params.keyword
          })) && (r.push(this.params.keyword),
            uni.setStorageSync("searchHistory", r)),
          this.history = uni.getStorageSync("searchHistory")
    },
    goDl: function (t) {
      "index" == this.query.page ? t.inStorePower.length ? this.go({
        t: 1,
        url: "/yb_o2o/gfood/shop-dl?storeId=" + t.id
      }) : this.go({
        t: 1,
        url: "/yb_o2o/shop/goods?storeId=" + t.id
      }) : 1 == this.params.item && ("shopdl" == this.query.page ? this.go({
        t: 1,
        url: "/yb_wm/shop/out/goods-dl?gid=".concat(t.id, "&storeId=").concat(this.params.storeId)
      }) : this.go({
        t: 1,
        url: "/yb_wm/shop/out/goods-dl?gid=".concat(t.id, "&storeId=").concat(this.params.storeId,
          "&page=shopGoods")
      }))
    },
    isText: function (t, e) {
      return t.inStorePower && t.inStorePower.indexOf(e) > -1
    },
    typeName: function (t) {
      return t.typeName ? t.typePname + "/" + t.typeName : t.typePname
    }
  }
}
</script>
<style scoped>
.scl {
  height: 66rpx;
  border-radius: 35rpx;
}

.lstag {
  padding: 16rpx 26rpx;
  border-radius: 50rpx;
  line-height: 28rpx;
}

.okzt {
  width: 35rpx;
  height: 35rpx;
  font-size: 24rpx;
  margin-left: 10rpx;
  border-radius: 5rpx;
}

.wai {
  color: #ec9c1f;
  background: #fff3e3;
}

.pai {
  color: #35b0a5;
  background: #ddfafe;
}

.mai {
  color: #dc5338;
  background: #ffedea;
}

.m05 {
  margin: 0 8rpx;
}
</style>