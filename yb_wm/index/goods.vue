<template>
  <view :class="['category bf h100v',(tcyhqshow||tcggshow)&&'bgfix']">
    <view class="posi-f l0 w100">
      <uni-nav-bar @onMore="onmore" border="false" custommore="true" :fixed="false" id="uninavbar" :ispr="false" leftcn="iconjiayuan" rightcn="iconsousuo1" :statusBar="true" :title="storeInfo.name||''" :uriconopcity="0" :uropcity="1" vueId="02d1c88e-1"></uni-nav-bar>
      <view class="header p03 bf" :style="'z-index:'+(showShopInfo?'2001':'')+';'">
        <view class="header-bd f-c-xc">
          <view class="f-bt">
            <view class="f-1 f-y-c">
              <view class="f-1" style="padding-right:20rpx;" v-if="sjxx.shopData">
                <view class="f-row f32 wei o-h">
                  <view @tap="scdp" class="f-y-c" style="padding-right:15rpx;">
                    <text :class="['iconfont mt0 c3',issc?'iconxx':'iconkxx']" :style="'color:'+(issc?tColor:'')+';'"></text>
                  </view>
                  <view @tap="goSelect" class="f-y-c f-1">
                    <text class="t-o-e">{{storeInfo.name}}</text>
                    <text class="iconfont iconright ml5 c0 f28" v-if="system.storeSet.storeModel==2"></text>
                  </view>
                </view>
                <view class="f-y-c c9 mt5">
                  <text class="nowei" v-if="storeInfo.distance">{{'距离您'+storeInfo.distance}}</text>
                </view>
              </view>
            </view>
            <view class="f-row ml30" v-if="ModeArr.length">
              <view class="f-c buytype" v-if="ModeArr.length">
                <view @tap="changeBuyType(v)" :class="['type bs30 f-c f24 c9',buyType==v.value?'atype cf f28':'']" :style="'background1:'+(buyType==v.value?tColor:'')+';'" v-for="(v, i) in ModeArr" :key="i">{{v.name}}</view>
              </view>
              <view class="bf6 f-c myicon bsf" v-else>
                <text @tap="go({t:2,url:'/yb_cy/my/index'})" class="iconfont iconwd c3"></text>
              </view>
            </view>
          </view>
          <view class="f-bt mt20 c9">
            <view class="f-1 f-y-c f24">
              <text class="iconfont icontishi mr15" :style="'color:'+tColor+';'"></text>
              <text class="t-o-e">{{sjxx.moreSet.notice}}</text>
            </view>
            <view @tap="showShopInfo = !showShopInfo" class="f22 ml20 f-y-c">
              更多<text class="iconfont icondown f22 ml5 c9"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="h100" :style="'padding-top:'+pageHeight.topH+'px'+';'">
      <view class="bodyer bf" :hidden="!(sIndex==0)">
        <mg-swiper :co="lbswiper" :color="tColor" u="rpx" vueId="02d1c88e-2"></mg-swiper>
        <view class="m20 b-s-1 p02 bs20" v-if="goodsList.length>0">
          <mg-cell :arrow="0" :btt="'商家推荐'||sjxx.orderSet.data.recommend" cname="p20 f30" last="1" vueId="02d1c88e-3">
          </mg-cell>
          <goods :addgb="isClose" addtype="2" @add="add" @dec="dec" :dList="goodsList" :outin="outin" :storeid="storeInfo.id" type="2" vueId="02d1c88e-4"></goods>
        </view>
      </view>
      <view class="category-c f-row">
        <scroll-view class="left-c" :scrollIntoView="lsiv" :scrollWithAnimation="true" :scroll-y="true" :style="'padding-bottom:'+leftpb+';'">
          <view @tap="choose(i)" :class="['title-c',sIndex==i?'onSelected':'']" :id="'l'+i" v-for="(v, i) in catrgoryList" :key="i">
            <view class="title-b" :style="'background:'+tColor+';'" v-if="sIndex==i"></view>
            <view class="title-bx cf5f f18 nowei" v-if="v.isRequire!=2">
              {{v.isRequire==1?'必选':v.customName}}</view>
            <view :class="['title-n f-c-xc',i==sIndex+1?'ysyj':'',i==sIndex-1?'yxyj':'']">
              <block v-if="sjxx.categorySet.display==3">
                <view class="f-y-e">
                  <view class="title-img">
                    <mg-img m="aspectFit" :src="v.icon" :vueId="'02d1c88e-5-'+i">
                    </mg-img>
                  </view>
                  <text>{{v.m0}}</text>
                </view>
                <text class="mt15 t-o-e" v-if="v.m1">{{v.m2}}</text>
              </block>
              <block v-if="sjxx.categorySet.display==2">
                <view class="f-x-c">
                  <view class="title-img">
                    <mg-img m="aspectFit" :src="v.icon" :vueId="'02d1c88e-6-'+i">
                    </mg-img>
                  </view>
                </view>
                <text class="mt15 t-c t-o-e">{{v.name}}</text>
              </block>
              <view class="f-x-c" v-else>
                <text class="t-o-e2">{{v.name}}</text>
              </view>
            </view>
          </view>
          <view class="title-c">
            <view class="title-n"></view>
          </view>
          <view class="title-c">
            <view class="title-n"></view>
          </view>
          <view class="title-c">
            <view class="title-n"></view>
          </view>
        </scroll-view>
        <scroll-view @scroll="myscroll" class="f-g-1 right-c" lowerThreshold="100" :scrollIntoView="rsiv" scroll-y="true" :style="'padding-bottom:'+rightpb+';'">
          <view class="c-item" :id="'r'+pi" v-for="(pv, pi) in catrgoryList" :key="pi">
            <view class="c-title">{{pv.name}}</view>
            <view @tap="goodinfo(co,pv.id,i)" class="conw2 f-row p2" v-for="(co, i) in pv.goods" :key="i">
              <view class="f-g-0 bf6 left bs5 p-r">
                <mg-img cname="wh" :src="co.icon" :vueId="'02d1c88e-7-'+pi+'-'+i">
                </mg-img>
                <view class="p-a ysq f-c b0 cf w100 f22" v-if="co.stock<=0">已售罄</view>
              </view>
              <view class="f-g-1 ml20 f24 c9">
                <view class="f30 t-o-e c0">{{co.name}}</view>
                <view class="mt10" v-if="co.labelName">
                  <text class="text-btnf f22 mr10 p-3-10 bs5" :style="'background:'+'rgba('+co.m3+',0.1)'+';'+'color:'+co.labelColor+';'">{{co.labelName}}</text>
                </view>
                <view class="mt10 t-o-e2 f22" v-if="co.body">{{co.body}}</view>
                <view class="mt10 f-raw" v-if="system.switch.saleShow==1||system.switch.stockShow==1">
                  <text class="mr30" v-if="co.salesNum>0">{{'销量'+co.salesNum}}</text>
                  <text class="mr30" v-if="system.switch.stockShow==1">{{'库存'+co.stock}}</text>
                </view>
                <view class="mt10 f-row" v-if="co.vipPrice<co.price">
                  <view class="vipl f-y-c">{{sl+co.vipPrice}}</view>
                  <view class="vipr f-y-c">VIP</view>
                </view>
                <view class="f-x-bt mt10">
                  <view class="f-g-1 wei t-o-e c3 f36">
                    <text class="f30 mr5">{{sl}}</text>{{co.price+''}}
                  </view>
                  <view @tap.stop="add({addwz:1,g:co})" class="f-g-0 cartggc f-c" v-if="co.isSpecs==1||co.isMaterial==1||co.isAttr==1">
                    <view class="text-btnf f24 f-c ggc" :style="'background:'+(isClose?tColor:'#ccc')+';'">
                      <text>选 择</text>
                      <text class="dot f-c" :style="'background:'+(isClose?tColor:'#ccc')+';'" v-if="co.num>0">{{co.num}}</text>
                    </view>
                  </view>
                  <view class="f-g-0 f-bt" v-else>
                    <view class="reducecon active f-y-c" v-if="co.num>0">
                      <view @tap.stop="dec({addwz:1,g:co})" class="cartc f-c">
                        <button class="cartdec" :style="'border-color:'+(isClose?tColor:'#ccc')+';'">
                          <view class="cartdecab" :style="'background:'+(isClose?tColor:'#ccc')+';'"></view>
                        </button>
                      </view>
                      <text class="f36 ma c0">{{co.num}}</text>
                    </view>
                    <view @tap.stop="add({addwz:1,g:co})" class="cartc f-c">
                      <button class="cartadd" :style="'background:'+(isClose?tColor:'#ccc')+';'"></button>
                    </view>
                  </view>
                </view>
                <view v-if="co.maxNum>0||co.minNum>1">
                  <text class="cf5f mr20" v-if="co.minNum>1">{{co.minNum+'份起售'}}</text>
                  <text class="cf5f" v-if="co.maxNum>0">{{'限'+co.maxNum+'份'}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="conw2mb"></view>
        </scroll-view>
      </view>
    </view>
    <block v-if="sjxx.shopData">
      <tcyhq v-model="tcyhqshow" @close="__e" :co="tcCoupon" :color="tColor" vueId="02d1c88e-8"></tcyhq>
      <goods-car :buytype="buyType" :carBtm="system.outTabbar!=1?isIpx?'155':'115':'0'" :carlistPab="system.outTabbar!=1?isIpx?'265':'225':'110'" class="vue-ref" :show.sync="showCar" @dec="dec" @add="add" @celar="celarCar" ref="goodscar" :goodsList="catrgoryList" :sjxx="sjxx" :startmoney="startMoney" vueId="02d1c88e-9">
      </goods-car>
      <store-info v-model="showShopInfo" :co="sjxx" :qlist="sjyhq" :sjqb="sjqb" vueId="02d1c88e-10"></store-info>
    </block>
    <spec v-model="showGg" @add="add" :co="goodsInfo" :outin="outin" :storeid="storeInfo.id" vueId="02d1c88e-11"></spec>
    <tab-bar vueId="02d1c88e-12"></tab-bar>
    <load vueId="02d1c88e-13" v-if="showloading"></load>
    <load v-model="showjz" type="2" vueId="02d1c88e-14"></load>
  </view>
</template>

<script>
import uniNavBar from 'components/third/uni-nav-bar.vue';
import goodsCar from 'components/goods/goods-car.vue';
import goods from 'components/goods/index.vue';
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
  mapState,
  mapActions,
  mapMutations
} from 'vuex';
import {
  bus,
  deepCopy,
  getDw,
  getOptions,
  message,
  mpShare,
  throttle
} from 'common/util';
import {
  utilMixins
} from 'common/utilMixins';
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
    storeInfo
  },
  data: function () {
    return {
      showloading: !1,
      catrgoryList: [],
      goodsList: [],
      sIndex: 0,
      rsiv: "",
      lsiv: "",
      showGg: !1,
      buyType: 2,
      showShopInfo: !1,
      outin: "1",
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
      storeId: '',
    };
  },
  mixins: [utilMixins],
  onLoad: function (e) {
    var o = this;
    o.showCar = !0;
    o.storeId = getOptions(e, {
      key: "storeId",
      q1: o.storeInfo.id
    }) || "",
      o.query = e,
      o.getLoginInfo({
        inviteId: e.userId
      });
    o.getDw(),
      o.getSystem({ nofc: true }),
      o.getLayout();
    bus.$on("qjjtsj", function (t) {
      t.showgwc ? o.showCar = !0 :
        t.hasOwnProperty("flid") ? (o.flid = "", setTimeout(function () {
          o.flid = t.flid;
        })) : t.wmtz ? o.$refs.goodscar.goPay(2) : (o.xdtype = "", o.xdtype = t);
    })
  },
  onHide: function () {
    this.startMoney = "";
  },
  computed: {
    ...mapState(['sjxx']),
    scarList() {
      try {
        return this.$store.state.scarList.out.data || [];
      } catch (error) {
        return [];
      }
    },
    storeInfo() {
      try {
        return this.$store.state.config.storeInfo;
      } catch (error) {
        return {};
      }
    },

    pageHeight: function () {
      if (!getApp().sgheight) {
        var e = +(uni.getSystemInfoSync().statusBarHeight + 44 + uni.upx2px(178)).toFixed(2);
        getApp().sgheight = {
          topH: e
        };
      }
      return getApp().sgheight;
    },
    lbswiper: function () {
      return {
        class: "mt10 mb20",
        swiper: this.sjxx.moreSet && this.sjxx.moreSet.orderMedia.map(function (t) {
          return {
            url: t
          };
        }),
        duration: "",
        mode: "",
        height: "260",
        radius: "8",
        auto: !0,
        interval: 5
      };
    },
    ModeArr: function () {
      var t = [];
      return this.sjxx.moreSet && (2 == this.sjxx.moreSet.distributionSupport.length ? (t = [{
        name: this.sjxx.moreSet.selfName,
        value: "2"
      }, {
        name: this.sjxx.moreSet.outName,
        value: "1"
      }], 2 == this.sjxx.moreSet.auto && t.reverse(), this.buyType = t[0].value, this.xdtype && (this.buyType = this
        .xdtype)) : this.sjxx.moreSet.distributionSupport.find(function (t) {
          return 1 == t;
        }) ? this.buyType = 1 : this.sjxx.moreSet.distributionSupport.find(function (t) {
          return 2 == t;
        }) && (this.buyType = 2)), t;
    },
    isClose: function () {
      return this.sjxx.shopData && (1 == this.sjxx.shopData.storeOpen || 2 == this.sjxx.shopData.storeOpen && 1 == this
        .sjxx.moreSet.status);
    },
    cshow: function () {
      return this.scarList.length > 0;
    },
    leftpb: function () {
      return 1 == this.system.outTabbar ? this.cshow ? "305rpx" : "115rpx" : this.cshow ? "260rpx" : "115rpx";
    },
    rightpb: function () {
      return this.system.outTabbar, this.cshow ? "230rpx" : "115rpx";
    },
    qhfl: function () {
      return {
        jsgdwb: this.jsgdwb,
        flid: this.flid
      };
    }
  },
  watch: {
    qhfl: {
      handler: function (t) {
        var e = this;
        if (t.jsgdwb && t.flid && this.sjxx.data.find(function (e) {
          return e.id == t.flid;
        })) {
          var o = this.sjxx.data.findIndex(function (e) {
            return e.id == t.flid;
          });
          this.sIndex = o, this.noscroll = !0, this.lsiv = "l".concat(o - 3), this.rsiv = "r".concat(o),
            setTimeout(function () {
              e.noscroll = !1;
            }, 500);
        }
      },
      immediate: !0
    }
  },
  methods: {
    ...mapActions(["getSjxx", "getConfig", "supdCar", "getMycar"]),
    ...mapMutations(["setScarList"]),
    getDw: function () {
      var t = this;
      getDw().then(res => {
        t.init();
      })
    },
    changeStore: function (t) {
      this.showloading = !0, this.tcyhqshow = this.tcggshow = this.jsgdwb = !1, this.startMoney = "",
        this.xdtype = this.flid = "", this.storeId = t.id, this.refreshInfo();
    },
    refreshInfo: function () {
      var t = this;
      t.sIndex = 0, t.rsiv = "r0";
      getApp().globalData.xzdzInfo = null;
      t.setScarList({
        data: {}
      });
      t.init();
    },
    init: function () {
      var e = this;
      var n, s, r, i, a;
      n = getApp().globalData.gdlocation || {},
        e.getSjxx({
          storeId: e.storeId,
          lat: n.latitude || '',
          lng: n.longitude || ''
        }).then(res => {
          e.getMycar({
            storeId: e.sjxx.shopData.id
          }).then(res => {
            e.storeId = e.sjxx.shopData.id, e.goodsList = deepCopy(e.sjxx.recommendData),
              e.catrgoryList = deepCopy(e.sjxx.data), e.showloading = !1;
            e.getConfig({
              key: "storeInfo",
              data: {
                id: e.sjxx.shopData.id,
                name: e.sjxx.shopData.name,
                distance: e.sjxx.shopData.distance
              }
            });
            for (s = 0; s < e.scarList.length; s++) {
              for (r = 0; r < e.catrgoryList.length; r++)
                for (i = 0; i < e.catrgoryList[r].goods.length; i++) e.catrgoryList[r].goods[i].id == e.scarList[s]
                  .goodsId && (e.catrgoryList[r].goods[i].num = +e.catrgoryList[r].goods[i].num + +e.scarList[s].num);
              for (a = 0; a < e.goodsList.length; a++) e.goodsList[a].id == e.scarList[s].goodsId && (e.goodsList[a]
                .num = +e.goodsList[a].num + +e.scarList[s].num);
            }
            e.$nextTick(function () {
              setTimeout(function () {
                e.getHeightList();
              }, 100);
            });
            setTimeout(() => {
              e.getOtherData();
              e.addFwjl({
                storeId: e.storeId,
                origin: "2"
              });
            }, 1e3);
          })
        })
    },
    getOtherData: function () {
      var t = this;
      t.issc = 1 == t.sjxx.shopData.isCollection
      this.$api.shop_window__collection({
        location: 1,
        storeId: t.storeId
      }).then(res => {
        var n;
        (n = res).windowCoupon.hasOwnProperty("name") && (t.tcCoupon = n.windowCoupon,
          t.tcyhqshow = !0), t.sjyhq = n.storeCoupon, t.sjqb = n.rollBag;
      })
    },
    getHeightList: function () {
      var e = this;
      uni.createSelectorQuery().selectAll(".c-item").boundingClientRect(function (t) {
        var o = [],
          n = 0;
        t.forEach(function (t) {
          n += t.height, o.push(n);
        }), e.right_height = o, e.jsgdwb = !0;
      }).exec();
    },
    choose: function (t) {
      var e = this;
      this.sIndex != t && (this.sIndex = t, this.noscroll = !0, this.lsiv = "l".concat(t - 3),
        this.rsiv = "r".concat(t), setTimeout(function () {
          e.noscroll = !1;
        }, 500));
    },
    myscroll: function (t) {
      if (!this.noscroll)
        for (var e = t.detail.scrollTop, o = 0; o < this.right_height.length; o++)
          if (e < this.right_height[0]) this.sIndex = 0,
            this.lsiv = "l0";
          else if (e >= this.right_height[o - 1] && e < this.right_height[o]) {
            this.sIndex = o,
              this.lsiv = "l".concat(o - 3),
              this.rsiv = "";
            break;
          }
    },
    refreshList: function () {
      for (var t = this.scarList, e = this.catrgoryList, o = 0, n = e.length; o < n; o++)
        for (var s = 0, r = e[o].goods.length; s < r; s++) {
          e[o].goods[s].num = 0;
          for (var i = 0; i < t.length; i++) e[o].goods[s].id == t[i].goodsId && (e[o].goods[s].num += +t[i].num);
        }
      for (var a = this.goodsList, u = 0, c = a.length; u < c; u++) {
        a[u].num = 0;
        for (var d = 0; d < t.length; d++) a[u].id == t[d].goodsId && (a[u].num += +t[d].num);
      }
    },
    updList: function (t) {
      var e = this;
      var s, r, i, d, h;
      e.supdCar("1" == t.e.addwz ? t.e.g.ggnum ? {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.id,
        groupId: t.e.g.groupId || "",
        material: t.e.g.material || [],
        attribute: t.e.g.attribute || "",
        num: t.e.g.ggnum
      } : {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.id
      } : {
        storeId: e.storeId,
        type: t.type,
        goodsId: t.e.g.goodsId,
        id: t.e.g.id
      }).then(n => {
        // console.log('n: ', n);
        for (s = e.catrgoryList, r = 0, i = s.length; r < i; r++)
          for (var a = 0, u = s[r].goods.length; a < u; a++) {
            // console.log('t.e.addwz: ', t.e);
            if ("1" == t.e.addwz && s[r].goods[a].id == t.e.g.id ||
              "2" == t.e.addwz && s[r].goods[a].id == t.e.g.goodsId) {
              e.$set(s[r].goods[a], 'num', n);
            }
          }

        for (d = e.goodsList, h = 0, f = d.length; h < f; h++)("1" == t.e.addwz && d[h].id == t.e.g.id ||
          "2" == t.e.addwz && d[h].id == t.e.g.goodsId) && (e.$set(d[h], 'num', n));
        e.showjz = !1;
      })
    },
    dec: function (t) {
      var e = this;
      e.isClose && (e.showjz = !0, e.updList({
        type: 2,
        e: t
      }));
    },
    add: function (t) {
      //   console.log('t: ', t);
      var e = this;
      if (e.isClose) {
        if (!(t.g.SalesStock && t.g.SalesStock <= 0)) {
          if (!(t.g.stock <= 0)) {
            e.showjz = !0, 1 != t.g.isSpecs && 1 != t.g.isMaterial && 1 != t.g.isAttr ||
              t.g.hasOwnProperty("groupId") ? e.updList({
                type: 1,
                e: t
              }) : (e.showGg = !0, e.goodsInfo = t.g, e.showjz = !1);

          } else {
            message("商品已售罄", 3);
          }
        } else {
          message("商品已售罄", 3);
        }
      }
    },
    celarCar: function (t) {
      for (var e = this.catrgoryList, o = 0, n = e.length; o < n; o++)
        for (var s = 0, r = e[o].goods.length; s < r; s++) e[o].goods[s].num = 0;
      for (var i = this.goodsList, a = 0, u = i.length; a < u; a++) i[a].num = 0;
    },
    changeBuyType: function (t) {
      console.log('t: ', t);
      if (t.value != this.buyType) {
        if (1 == t.value && 2 == this.ModeArr[0].value) return console.log("用户想切换外卖"), getApp().globalData.xzdzInfo =
          null,
          void this.go({
            t: 1,
            url: "/yb_wm/my/address/index?from=2&storeId=".concat(this.storeId)
          });
        2 == t.value && (getApp().globalData.xzdzInfo = null), this.buyType = 1 == this.buyType ? 2 : 1;
      }
    },
    trigger: function (t) {
      this.go({
        t: t.index > 1 ? 1 : 2,
        url: t.item.url
      }), console.log(t);
    },
    lfName: function (t) {
      return t.substr(0, 2), t.substr(2, 4), t.substr(0, 2);
    },
    lsName: function (t) {
      return t.substr(2, 5);
    },
    onmore: function () {
      this.go({
        url: "/yb_wm/shop/search/out?page=shopGoods"
      });
    },
    goodinfo: function (t) {
      console.log('t: ', t);
      this.go({
        t: 1,
        url: "/yb_wm/shop/out/goods-dl?gid=".concat(t.id, "&storeId=").concat(this.storeId, "&page=shopGoods")
      });
    },
    goSelect: function () {
      2 == this.system.storeSet.storeModel && this.go({
        url: "/yb_wm/shop/select/index?page=goods&storeId=" + this.storeId
      });
    },
    // 收藏店铺
    scdp: throttle(function () {
      this.$api.member_save__collection({
        collectionId: this.storeId,
        type: 1
      }).then(res => {
        this.issc = !this.issc, message((this.issc ? "" : "取消") + "收藏成功", 3);
      })
    }, 1e3)
  },
  onShow: function () {
    this.sjxx.moreSet && (this.storeId != this.storeInfo.id ? this.changeStore(this.storeInfo) : (this.ModeArr.length &&
      2 == this.ModeArr[0].value && (1 != this.buyType && getApp().globalData.xzdzInfo ? (this.buyType = 1,
        console.log("选择了地址")) : 1 != this.buyType || getApp().globalData.xzdzInfo || (this.buyType = 2)),
      this.refreshList()));
  },
  onShareAppMessage: function () {
    var t = "yb_cy/shop/goods?storeId=".concat(this.storeId, "&userId=").concat(this.uId);
    return mpShare({
      t: this.sjxx.storeInfo.name,
      p: t
    });
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
</style>