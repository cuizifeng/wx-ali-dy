<template>
  <view :class="['category bf h100v ',(tcyhqshow||tcggshow)&&'bgfix']">
    <view class="h100 f-col ">
      <view class="header p03 bf " :style="'z-index:'+(showShopInfo?'2001':'')+';'">
        <view class="header-bd f-c-xc ">
          <view class="f-bt ">
            <view class="f-1 f-y-c ">
              <view class="f-1 " style="padding-right:20rpx;" v-if="sjxx.shopData">
                <view class="f-row f32 wei o-h ">
                  <view @tap="scdp" class="f-y-c " style="padding-right:15rpx;">
                    <text :class="['iconfont mt0 c3 ',issc?'iconxx':'iconkxx']" :style="'color:'+(issc?tColor:'')+';'"></text>
                  </view>
                  <view class="f-y-c f-1 ">
                    <text class="t-o-e ">{{storeInfo.name}}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="f-row ml30 ">
              <view class="f-c myicon ">
                <text @tap="tzdd" class="iconfont icondd f48 c3 "></text>
              </view>
            </view>
          </view>
          <view class="f-bt mt20 c9 ">
            <view class="f-1 f-y-c f24 ">
              <text class="iconfont icontishi mr15 " :style="'color:'+tColor+';'"></text>
              <text class="t-o-e ">{{sjxx.moreSet.fastNotice}}</text>
            </view>
            <view @tap="showShopInfo = !showShopInfo" class="f22 ml20 f-y-c ">更多<text class="iconfont icondown f22 ml5 c9 "></text>
            </view>
          </view>
        </view>
      </view>
      <view class="f-1 o-h ">
        <view class="category-c f-row ">
          <scroll-view class="left-c " :scrollIntoView="lsiv" scrollWithAnimation="true" scroll-y="true" :style="'padding-bottom:'+leftpb+';'">
            <view @tap="choose(i)" :class="['title-c ',sIndex==i?'onSelected':'']" :id="'l'+i" v-for="(v, i) in catrgoryList" :key="i">
              <view class="title-b " :style="'background:'+tColor+';'" v-if="sIndex==i"></view>
              <view class="title-bx cf5f f18 nowei " v-if="v.isRequire!=2">
                {{v.isRequire==1?'必选':v.customName}}</view>
              <view :class="['title-n f-c-xc ',i==sIndex+1?'ysyj':'',i==sIndex-1?'yxyj':'']">
                <block v-if="sjxx.categorySet.display==3">
                  <view class="f-y-e ">
                    <view class="title-img ">
                      <mg-img class="" m="aspectFit" :src="v.icon" :vueId="'2753bcc4-1-'+i"></mg-img>
                    </view>
                    <text class="">{{lfName(v.name)}}</text>
                  </view>
                  <text class="mt15 t-o-e " v-if="v.name">{{lsName(v.name)}}</text>
                </block>
                <block v-else>
                  <block v-if="sjxx.categorySet.display==2">
                    <view class="f-x-c ">
                      <view class="title-img ">
                        <mg-img class="" m="aspectFit" :src="v.icon" :vueId="'2753bcc4-2-'+i"></mg-img>
                      </view>
                    </view>
                    <text class="mt15 t-c t-o-e ">{{v.name}}</text>
                  </block>
                  <view class="f-x-c " v-else>
                    <text class="t-o-e2 ">{{v.name}}</text>
                  </view>
                </block>
              </view>
            </view>
            <view class="title-c ">
              <view class="title-n "></view>
            </view>
            <view class="title-c ">
              <view class="title-n "></view>
            </view>
            <view class="title-c ">
              <view class="title-n "></view>
            </view>
          </scroll-view>
          <scroll-view @scroll="myscroll" class="f-g-1 right-c " lowerThreshold="100" :scrollIntoView="rsiv" scroll-y="true" :style="'padding-bottom:'+rightpb+';'">
            <view class="c-item " :id="'r'+pi" v-for="(pv, pi) in catrgoryList" :key="pi">
              <view class="c-title ">{{pv.name}}</view>
              <view @tap="goodinfo(pv.id,co.id)" class="conw2 f-row p2 " v-for="(co, i) in pv.goods" :key="i">
                <view class="f-g-0 bf6 left bs5 p-r ">
                  <mg-img class="" cname="wh" :src="co.icon" :vueId="'2753bcc4-3-'+pi+'-'+i"></mg-img>
                  <view class="p-a ysq f-c b0 cf w100 f22 " v-if="co.stock<=0">已售罄</view>
                </view>
                <view class="f-g-1 ml20 f24 c9 ">
                  <view class="f30 t-o-e c0 ">{{co.name}}</view>
                  <view class="mt10 " v-if="co.labelName">
                    <text class="text-btnf f22 mr10 p-3-10 bs5 " :style="'background:'+'rgba('+co.m3+',0.1)'+';'+'color:'+co.labelColor+';'">{{co.labelName}}</text>
                  </view>
                  <view class="mt10 t-o-e2 f22 " v-if="co.body">{{co.body}}</view>
                  <view class="mt10 f-raw " v-if="system.switch.saleShow==1||system.switch.stockShow==1">
                    <text class="mr30 " v-if="co.salesNum>0">{{'销量'+co.salesNum}}</text>
                    <text class="mr30 " v-if="system.switch.stockShow==1">{{'库存'+co.stock}}</text>
                  </view>
                  <view class="f-x-bt mt10 ">
                    <view class="f-g-1 wei t-o-e c3 f36 ">
                      <text class="f30 mr5 ">{{sl}}</text>{{co.price+''}}
                    </view>
                    <view @tap.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c " v-if="co.isSpecs==1||co.isMaterial==1||co.isAttr==1">
                      <view class="text-btnf f24 f-c ggc " :style="'background:'+(isClose?tColor:'#ccc')+';'">
                        <text class="">选 择</text>
                        <text class="dot f-c " :style="'background:'+(isClose?tColor:'#ccc')+';'" v-if="co.num>0">{{co.num}}</text>
                      </view>
                    </view>
                    <view class="f-g-0 f-bt " v-else>
                      <view class="reducecon active f-y-c " v-if="co.num>0">
                        <view @tap.stop="dec({addwz:1,g:co})" class="cartc f-c ">
                          <button class="cartdec " :style="'border-color:'+(isClose?tColor:'#ccc')+';'">
                            <view class="cartdecab " :style="'background:'+(isClose?tColor:'#ccc')+';'"></view>
                          </button>
                        </view>
                        <text class="f36 ma c0 ">{{co.num}}</text>
                      </view>
                      <view @tap.stop="add({addwz:1,g:co})" class="cartc f-c ">
                        <button class="cartadd " :style="'background:'+(isClose?tColor:'#ccc')+';'"></button>
                      </view>
                    </view>
                  </view>
                  <view class="" v-if="co.maxNum>0||co.minNum>1">
                    <text class="cf5f mr20 " v-if="co.minNum>1">{{co.minNum+'份起售'}}</text>
                    <text class="cf5f " v-if="co.maxNum>0">{{'限'+co.maxNum+'份'}}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="conw2mb "></view>
          </scroll-view>
        </view>
      </view>
    </view>
    <block v-if="sjxx.shopData">
      <goods-car @add="add" @celar="celarCar" @dec="dec" :updateShow.sync="showCar" :buytype="buyType" :carBtm="hasTabbar?isIpx?'155':'115':'0'" :carlistPab="hasTabbar?isIpx?'265':'225':'110'" class="" :goodsList="catrgoryList" :outin="outin" :show="showCar" :sjxx="sjxx" type="2" vueId="2753bcc4-4"></goods-car>
      <store-info :co="sjxx" :qlist="sjyhq" :sjqb="sjqb" type="2" v-model="showShopInfo" vueId="2753bcc4-5"></store-info>
    </block>
    <spec @add="add" :co="goodsInfo" :outin="outin" :storeid="storeInfo.id" v-model="showGg" vueId="2753bcc4-6"></spec>
    <tab-bar @refresh="tbrh" vueId="2753bcc4-7"></tab-bar>
    <load class="" vueId="2753bcc4-8" v-if="showloading"></load>
    <load type="2" v-model="showjz" vueId="2753bcc4-9"></load>
  </view>
</template>

<script>
import uniNavBar from 'components/third/uni-nav-bar.vue';
import goods from 'components/goods/index';
import goodsCar from 'components/goods/goods-car.vue';
import spec from 'components/goods/spec.vue';
import load from 'components/common/load.vue';
import mgPopup from 'components/common/popup.vue';
import mgModal from 'components/common/modal.vue';
import jzz from 'components/common/jzz.vue';
import tips from 'components/common/tips.vue';
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import tcyhq from 'components/template/tcyhq.vue';
import tcgg from 'components/template/tcgg.vue';
import storeInfo from 'components/goods/store/store-info.vue';
import {
  mapActions,
  mapState,
  mapMutations,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  deepCopy,
  getDw,
  getOptions,
  message,
  mpShare,
  setNT,
  throttle
} from 'common/util';
export default {
  components: {
    uniNavBar,
    goods,
    goodsCar,
    spec,
    load,
    mgPopup,
    mgModal,
    jzz,
    tips,
    MgSwiper,
    tcyhq,
    tcgg,
    storeInfo,
  },
  data: function () {
    return {
      showloading: !0,
      catrgoryList: [],
      sIndex: 0,
      rsiv: "",
      lsiv: "",
      showGg: !1,
      buyType: 2,
      showShopInfo: !1,
      outin: "3",
      goodsInfo: {},
      showjz: !1,
      tcyhqshow: !1,
      tcCoupon: {},
      tcggshow: !1,
      tcggList: [],
      showCar: !1,
      startMoney: "",
      xdtype: "",
      issc: !1,
      sjyhq: [],
      flid: "",
      jsgdwb: !1,
      sjqb: [],
      hasTabbar: !1,
      sjxx: {}
    }
  },
  mixins: [utilMixins],
  onLoad: function (t) {
    var e = this;
    e.storeId = getOptions(t, {
      key: "storeId",
      q1: e.storeInfo.id
    }) || "", e.query = t,
      e.getLoginInfo({
        inviteId: t.userId
      }).then(() => {
        e.getDw(),
          e.getSystem();
      })
  },
  computed: {
    ...mapState({
      scarList: function (t) {
        return t.scarList.fast.data || []
      },
      storeInfo: function (t) {
        return t.config.storeInfo
      }
    }),
    isClose: function () {
      return this.sjxx.shopData && (1 == this.sjxx.shopData.storeOpen || 2 == this.sjxx.shopData.storeOpen &&
        1 == this.sjxx.moreSet.status)
    },
    leftpb: function () {
      return this.system.outTabbar, "0"
    },
    rightpb: function () {
      return this.system.outTabbar, "0"
    }
  },
  watch: {},
  methods: {
    ...mapActions(["getConfig", "supdCar", "getMycar"]),
    ...mapMutations([
      "setScarList"
    ]),
    tbrh: function (t) {
      this.hasTabbar = !0
    },
    getDw: function () {
      var t = this;
      getDw().then(res => {
        t.init();
      })
    },
    changeStore: function (t) {
      this.showloading = !0,
        this.tcyhqshow = this.tcggshow = this.jsgdwb = !1,
        this.startMoney = "",
        this.xdtype = this.flid = "",
        this.storeId = t.id,
        this.refreshInfo()
    },
    refreshInfo: function () {
      var t = this;
      t.sIndex = 0, t.rsiv = "r0", t.setScarList({
        key: "fast",
        data: {}
      }), t.init();
    },
    init: function () {
      var e = arguments,
        n = this;
      var i, a, c, u;
      e.length > 0 && void 0 !== e[0] ? e[0] : 1,
        i = getApp().globalData.gdlocation,
        n.getSjxx({
          storeId: n.storeId,
          goodsType: 2,
          isKc: 1,
          lat: i.latitude,
          lng: i.longitude
        }).then(() => {
          console.log(22222);
          n.getMycar({
            storeId: n.sjxx.shopData.id,
            item: n.outin,
            key: "fast"
          }).then(() => {
            console.log(134141);
            for (n.storeId = n.sjxx.shopData.id, n.catrgoryList = deepCopy(n.sjxx.data), n.sjxx
              .data.length || uni.showModal({
                title: "提示",
                content: "暂无快餐商品",
                confirmText: "返回主页",
                cancelText: "我知道了",
                success: function (t) {
                  t.confirm && n.go({
                    t: 6,
                    url: "/pages/tabbar/index/index"
                  })
                }
              }), n.showloading = !1, a = 0; a < n.scarList.length; a++)
              for (c = 0; c < n.catrgoryList.length; c++)
                for (u = 0; u < n.catrgoryList[c].goods.length; u++) n.catrgoryList[c].goods[u].id == n
                  .scarList[a].goodsId && (n.catrgoryList[c].goods[u].num = +n.catrgoryList[c].goods[u]
                    .num + +n.scarList[a].num);
            n.$nextTick((function () {
              setTimeout((function () {
                n.getHeightList()
              }), 100)
            })),
              n.getConfig({
                key: "storeInfo",
                data: {
                  id: n.sjxx.shopData.id,
                  name: n.sjxx.shopData.name,
                  distance: n.sjxx.shopData.distance
                }
              }), setTimeout(() => n.getOtherData(), 1e3);
          })
        })
    },
    getSjxx: function (t) {
      var e = this;
      return new Promise((r, j) => {
        var jsons = {
          ...t
        };
        this.$api.good_get__product__list(jsons).then(res => {
          res.discount.newReduction = res.discount.give.id = res.discount.grantCoupon.name = null,
            e.sjxx = res,
            setNT(res.shopData.name);
          r(res);
        });
      })
    },
    getOtherData: function () {
      var t = this;
      t.issc = 1 == t.sjxx.shopData.isCollection;
      this.$api.shop_window__collection({
        location: 3,
        storeId: t.storeId
      }).then(res => {
        t.sjyhq = res.storeCoupon;
      })
    },
    getHeightList: function () {
      var e = this,
        n = uni.createSelectorQuery();
      n.selectAll(".c-item").boundingClientRect((function (t) {
        var n = [],
          o = 0;
        t.forEach((function (t) {
          o += t.height, n.push(o)
        })), e.right_height = n, e.jsgdwb = !0
      })).exec()
    },
    choose: function (t) {
      var e = this;
      this.sIndex != t && (this.sIndex = t, this.noscroll = !0, this.lsiv = "l".concat(t - 3), this.rsiv = "r"
        .concat(t), setTimeout((function () {
          e.noscroll = !1
        }), 500))
    },
    myscroll: function (t) {
      if (!this.noscroll)
        for (var e = t.detail.scrollTop, n = 0; n < this.right_height.length; n++)
          if (e < this.right_height[0]) this.sIndex = 0, this.lsiv = "l0";
          else if (e >= this.right_height[n - 1] && e < this.right_height[n]) {
            this.sIndex = n, this.lsiv = "l".concat(n - 3), this.rsiv = "";
            break
          }
    },
    refreshList: function () {
      for (var t = this.scarList, e = this.catrgoryList, n = 0, o = e.length; n < o; n++)
        for (var r = 0, s = e[n].goods.length; r < s; r++) {
          e[n].goods[r].num = 0;
          for (var i = 0; i < t.length; i++) e[n].goods[r].id == t[i].goodsId && (e[n].goods[r].num += +t[i].num)
        }
    },
    updList: function (t) {
      console.log('t: ', t);
      var e = this;
      var r, s, i, a, c, u;
      e.supdCar("1" == t.e.addwz ? t.e.g.ggnum ? {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.id,
        groupId: t.e.g.groupId || "",
        material: t.e.g.material || [],
        attribute: t.e.g.attribute || "",
        num: t.e.g.ggnum,
        item: e.outin,
        key: "fast"
      } : {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.id,
        item: e.outin,
        key: "fast"
      } : {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.goodsId,
        id: t.e.g.id,
        item: e.outin,
        key: "fast"
      }).then(res => {
        console.log('res: ', res);
        s = e.catrgoryList;
        r = res;
        for (i = 0, a = s.length; i < a; i++)
          for (c = 0, u = s[i].goods.length; c < u; c++) {
            if ("1" == t.e.addwz && s[i].goods[c].id == t.e.g.id ||
              "2" == t.e.addwz && s[i].goods[c].id == t.e.g.goodsId) {
              console.log('rrrrr', r);
              s[i].goods[c].num = r;
            }
          }
        e.showjz = !1
      });
    },
    dec: function (t) {
      var e = this;
      e.isClose && (e.showjz = !0, e.updList({
        type: 2,
        e: t
      }));
    },
    add: function (t) {
      var e = this;
      if (e.isClose && (t.g.SalesStock && t.g.SalesStock <= 0)) return message("商品已售罄", 3);
      if ((t.g.stock <= 0)) return message("商品已售罄", 3)
      e.showjz = !0,
        1 != t.g.isSpecs && 1 != t.g.isMaterial && 1 != t.g.isAttr || t.g.hasOwnProperty("groupId") ?
          e.updList({
            type: 1,
            e: t
          }) : (e.showGg = !0, e.goodsInfo = t.g, e.showjz = !1);
    },
    celarCar: function (t) {
      for (var e = this.catrgoryList, n = 0, o = e.length; n < o; n++)
        for (var r = 0, s = e[n].goods.length; r < s; r++) e[n].goods[r].num = 0
    },
    lfName: function (t) {
      t.substr(0, 2),
        t.substr(2, 4);
      return t.substr(0, 2)
    },
    lsName: function (t) {
      return t.substr(2, 5)
    },
    onmore: function () {
      this.go({
        url: "/yb_wm/shop/search/out?page=shopGoods"
      })
    },
    goodinfo: function (t) { },
    goSelect: function () {
      2 == this.system.storeSet.storeModel && this.go({
        url: "/yb_wm/shop/select/index?page=goods&storeId=" + this.storeId
      })
    },
    scdp: throttle(function () {
      this.$api.member_save__collection({
        collectionId: this.storeId,
        type: 1
      }).then(res => {
        this.issc = !this.issc, message((this.issc ? "" : "取消") +
          "收藏成功", 3)
      })
    }, 1e3),
    tzdd: function () {
      getApp().globalData.ddquery = {
        nt: 1,
        t: 4
      },
        this.go({
          t: 6,
          url: "/yb_wm/index/order-index"
        })
    }
  },
  onShow: function () { },
  onShareAppMessage: function () {
    var t = "yb_cy/shop/goods?storeId=".concat(this.storeId, "&userId=").concat(this.uId);
    return mpShare({
      t: this.sjxx.storeInfo.name,
      p: t
    })
  }
}
</script>
<style scoped>
.category {
  position: relative;
}

.header {
  height: 178rpx;
  z-index: 9;
}

.header-bd {
  height: 178rpx;
}

.header .myicon {
  width: 70rpx;
  height: 70rpx;
}

.header .sjimg {
  width: 90rpx;
  height: 90rpx;
}

.header .buytype {
  height: 62rpx;
  padding: 0 6rpx;
  border-radius: 45rpx;
  border: 0.5px solid #ddd;
  background: #f6f6f6;
}

.header .buytype .type {
  min-width: 86rpx;
  padding: 0 10rpx;
  height: 50rpx;
}

.header .buytype .atype {
  color: #fff;
  background: #000;
}

.bodyer {
  padding: 0 25rpx;
}

.pt150 {
  padding-top: 240rpx;
}

.category-fix {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}

.category-c {
  width: 100%;
  height: 100%;
}

.category-c .left-c {
  width: 168rpx;
  -webkit-box-flex: 0;
  flex: 0 0 168rpx;
  padding-bottom: 190rpx;
  background-color: #f6f6f6;
}

.category-c .left-c .title-c {
  position: relative;
  height: 140rpx;
  color: #999;
  font-size: 26rpx;
  background: #fff;
}

.category-c .left-c .title-c .title-n {
  margin: auto;
  height: 100%;
  padding-left: 10rpx;
  background: #f6f6f6;
  overflow: hidden;
}

.category-c .left-c .title-c .title-n .title-img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}

.category-c .left-c .title-c .title-b {
  position: absolute;
  left: 0;
  top: 0;
  width: 7rpx;
  height: 100%;
  background: #fff;
}

.category-c .left-c .title-c .title-bx {
  position: absolute;
  right: 0;
  top: 8rpx;
  background: #ffefea;
  padding: 3rpx 10rpx;
  border-radius: 15rpx 0 0 15rpx;
}

.category-c .left-c .title-c.onSelected {
  color: #333;
  font-weight: 700;
}

.category-c .left-c .title-c.onSelected .title-n {
  background: #fff;
}

.category-c .left-c .ysyj {
  border-top-right-radius: 14rpx;
}

.category-c .left-c .yxyj {
  border-bottom-right-radius: 14rpx;
}

.category-c .right-c {
  background: #fff;
  padding-bottom: 130rpx;
}

.category-c .right-c .c-item .c-title {
  font-size: 24rpx;
  color: #777;
  padding: 20rpx 30rpx 0 20rpx;
}

.category-c .right-c .conw2mb {
  padding-bottom: 220rpx;
}

.conw2 {
  padding: 20rpx;
}

.conw2 .left {
  width: 138rpx;
  height: 138rpx;
  background: #f6f6f6;
  border-radius: 5rpx;
}

.conw2 .ppbq {
  background: #ffe054;
  top: 0rpx;
  left: -1rpx;
  padding: 0rpx 8rpx 2rpx;
  border-radius: 10rpx 0 10rpx 10rpx;
}

.conw2 .ppbq::after {
  content: "";
  width: 0;
  height: 0;
  border-bottom: 9rpx solid #948233;
  border-right: 9rpx solid transparent;
  position: absolute;
  right: -8rpx;
  top: 0;
}

.conw2 .ysq {
  height: 42rpx;
  background: rgba(0, 0, 0, 0.5);
}

.ggc {
  position: relative;
  border-radius: 30rpx;
  height: 46rpx;
  width: 106rpx;
}

.dot {
  position: absolute;
  width: 36rpx;
  height: 36rpx;
  right: -10rpx;
  top: -18rpx;
  border-radius: 50%;
  color: #fff;
  border: 1rpx solid #fff;
}

.mr5 {
  margin-right: 5rpx;
}

.category {
  padding-bottom: 110rpx;
}
</style>