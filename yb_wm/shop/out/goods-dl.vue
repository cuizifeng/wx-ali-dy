<template>
  <view class="pb130 spxq ">
    <navBar :title="'商品详情'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <block v-if="co">
      <mg-swiper :co="swiper" :color="tColor" u="rpx" vueId="24422f2e-1"></mg-swiper>
      <goods addtype="2" @add="addn" @dec="decn" :co="co" :outin="outin" type="3" vueId="24422f2e-2">
      </goods>
      <view class="bf mt20 p3 ">
        <view class="f32 wei ">商品详情</view>
        <view class="mt15 " v-if="co.details">
          <!-- <mg-rtext :content="co.details" type="2" vueId="24422f2e-3"></mg-rtext> -->
          <rich-text :nodes="details"></rich-text>
        </view>
      </view>
      <view class="f-y-c p-f w100 b0 gwcc bf " :style="'bottom:'+(isIpx?'40rpx':0)+';'">
        <view class="f-1 f-row f22 c3 l-h1 ">
          <view @tap="go({t:6,url:'/pages/tabbar/index/index'})" class="f-1 f-c-c ">
            <text class="iconfont iconsy f42 c3 "></text>
            <text class="mt10 ">首页</text>
          </view>
          <view @tap="ljyq" class="f-1 f-c-c ">
            <text class="iconfont iconfx f46 c3 "></text>
            <text class="mt10 ">分享</text>
          </view>
          <view @tap="gwc" class="f-1 f-c-c p-r ">
            <text class="iconfont icongwc1 f48 c3 "></text>
            <text class="mt10 ">购物车</text>
            <view class="posi-a dot bsf f-c " :style="'background:'+tColor+';'" v-if="scarList.length">{{getTotal.num}}</view>
          </view>
        </view>
        <button @tap="jrgwc" class="jrgwc cf f-c f32 " :disabled="showjz" :style="'background:'+tColor+';'">加入购物车</button>
      </view>
      <view class="bgf " v-if="isIpx"></view>
      <spec @add="add" :co="goodsInfo" :outin="outin" :storeid="co.storeId" v-model="showGg" vueId="24422f2e-4"></spec>
      <mg-share :co="shareCo" hbs="1" ptype="1" v-model="shareshow" vueId="24422f2e-5" :s="1"></mg-share>
    </block>
    <load vueId="24422f2e-6" v-if="!co.id"></load>
    <load type="2" v-model="showjz" vueId="24422f2e-7"></load>
  </view>
</template>

<script>
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import goodsCar from 'components/goods/goods-car.vue';
import spec from 'components/goods/spec.vue';
import goods from 'components/goods/index';
import mgRtext from 'components/common/functionCmp/rich-text.vue';
import uniNavBar from 'components/third/uni-nav-bar.vue';
import load from 'components/common/load.vue';
import mgShare from 'components/template/share.vue';
import uniQrcode from 'components/uQrcode/uni-qrcode.vue';
import { formatRichText } from '@/utils/miniUtils.js';

import {
  mapActions,
  mapMutations,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  bus,
  getPage,
  message,
  mpShare,
  setNT,
  swnb
} from 'common/util';
export default {
  name: "bzf",
  components: {
    MgSwiper,
    goodsCar,
    spec,
    goods,
    mgRtext,
    uniNavBar,
    load,
    mgShare,
    uniQrcode,
  },
  data: function () {
    return {
      opcity: 0,
      iconOpcity: .5,
      swiper: {
        class: "",
        padding: 0,
        swiper: [],
        duration: "",
        mode: "",
        height: "750",
        radius: "0",
        auto: !0,
        interval: 5
      },
      isshopGoods: !1,
      co: null,
      showGg: !1,
      outin: "1",
      goodsInfo: {},
      showjz: !1,
      shareshow: !1,
      shareCo: {},
      details: null
    }
  },
  onLoad: function (t) {
    var e = this;
    var r;
    t.scene ? (
      r = decodeURIComponent(t.scene).split(","),
      e.id = r[0],
      e.querystoreId = r[1]) : (e.id = t.gid, e.querystoreId = t.storeId),
      e.getSystem(),
      e.getLoginInfo({
        inviteId: t.userId
      }).then(() => {
        e.getData(), "shopGoods" == t.page && (e.isshopGoods = !0, e.lastPage = getPage().$vm);
      })
  },
  mixins: [utilMixins],
  computed: {
    ...mapState(["sjxx"]),
    ...mapState({
      scarList: function (t) {
        return t.scarList.out.data || []
      }
    }),
    canUseShopGoods: function () {
      return this.isshopGoods
    },
    getTotal: function () {
      var t = 0;
      return this.scarList.forEach((function (e) {
        t += +e.num
      })), {
        num: t
      }
    }
  },
  methods: {
    ...mapActions(["getSjxx", "supdCar", "getMycar"]),
    ljyq: function () {
      this.shareshow = !0
    },
    ewmlink: function () {
      return (0, i.getEwmLink)("/pages/tabbar/index/index?userId=".concat(this.uId))
    },
    getImgS: function (t) {
      return t ? t.indexOf("http") > -1 ? t : this.url + t : "";
    },
    decn: function (t) {
      1 != this.co.num && (this.co.num -= 1)
    },
    addn: function (t) {
      this.co.stock && this.co.num == this.co.stock || (this.co.num += 1)
    },
    add: function (t) {
      this.showjz = !0, this.updList({
        type: 1,
        e: t
      })
    },

    jrgwc: function () {
      if (!this.uId) return message("暂未登录", 3);
      this.showjz = !0,
        1 == this.co.isSpecs ||
          1 == this.co.isMaterial ||
          1 == this.co.isAttr ? (this.showGg = !0, this.goodsInfo = this.co, this.showjz = !1) :
          this.updList({
            type: 1,
            e: {
              addwz: 1,
              g: this.co
            }
          })
    },
    updList: function (t) {
      var e = this;
      e.supdCar("1" == t.e.addwz ? t.e.g.ggnum ? {
        storeId: e.co.storeId,
        type: t.type,
        goodsId: t.e.g.id,
        groupId: t.e.g.groupId || "",
        material: t.e.g.material || [],
        attribute: t.e.g.attribute || "",
        num: t.e.g.ggnum
      } : {
        storeId: e.co.storeId,
        type: t.type,
        goodsId: t.e.g.id,
        num: t.e.g.num
      } : {
        storeId: e.co.storeId,
        type: t.type,
        goodsId: t.e.g.goodsId,
        id: t.e.g.id
      }).then(() => {
        e.showjz = !1;
      });
    },
    gopay: function () {
      this.canUseShopGoods ? this.go({
        t: 4
      }) : this.go({
        t: 3,
        url: "/yb_o2o/shop/goods?storeId=".concat(this.co.storeId, "&isgl=1")
      })
    },
    getData: function () {
      var e = this;
      this.$api.good_get__good__detail({
        goodsId: e.id,
        storeId: e.querystoreId
      }).then(res => {
        e.details = formatRichText(res.details)
        if (!res.id) message("此商家暂无此商品", 3), swnb(1e3)
        res.num = 1;
        e.co = res;
        e.swiper.swiper = res.media && res.media.length ?
          res.media.map((function (t) {
            return {
              url: t
            }
          })) : [{
            icon: res.icon
          }];
        e.canUseShopGoods || e.getMycar({
          storeId: res.storeId
        });
        this.$api.config_get__code({
          page: "yb_wm/shop/out/goods-dl",
          ident: "goodsDl",
          scene: e.co.id + "," + e.co.storeId
        }).then(res1 => {
          // e.shareCo = {
          // 	isget: !0,
          // 	bgimg: u[0][1].path,
          // 	code: u[1][1].path,
          // 	logo: u[2][1].path,
          // 	co: e.co
          // }
          e.shareCo.isget = 1;
          e.shareCo.co = e.co;
          uni.getImageInfo({
            src: e.co.icon
          }).then(r1 => {
            e.shareCo.bgimg = r1[1].path
          })
          uni.getImageInfo({
            src: res.data || ''
          }).then(r2 => {
            e.shareCo.code = r2[1].path;
          })
          uni.getImageInfo({
            src: e.co.storeIcon
          }).then(r3 => {
            e.shareCo.logo = r3[1].path;
          })
        })
      })
    },
    itemBoxMoney: function (t, e) {
      return (t * e).toFixed(1)
    },
    gwc: function () {
      this.go({
        t: 6,
        url: "/pages/tabbar/order/index"
      }), setTimeout((function () {
        bus.$emit("qjjtsj", {
          showgwc: 1
        })
      }), 200)
    }
  },
  created: function () { },
  onShareAppMessage: function () {
    this.shareshow = !1;
    var t = "yb_wm/shop/out/goods-dl?gid=".concat(this.id, "&storeId=").concat(this.co.storeId, "&userId=")
      .concat(this.uId);
    return mpShare({
      t: this.co.name,
      i: this.getImgS(this.co.icon),
      p: t
    })
  },
  onShareTimeline: function (t) {
    return {
      title: this.co.name,
      imageUrl: this.getImgS(this.co.icon)
    }
  }
}
</script>

<style scoped>
.spxq .gwcc {
  height: 120rpx;
}

.spxq .jrgwc {
  width: 400rpx;
  margin-right: 20rpx;
  height: 86rpx;
  border-radius: 90rpx;
}

.spxq .dot {
  min-width: 40rpx;
  height: 40rpx;
  color: #fff;
  top: -20rpx;
  right: 15rpx;
}
</style>