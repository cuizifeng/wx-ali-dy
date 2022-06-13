<template>
  <view :class="['category bf h100 ',(tcyhqshow||tcggshow)&&'bgfix']">
    <uni-nav-bar :border="false" :fixed="true" id="uninavbar" :isleft="false" :ispr="false" :statusBar="true" :title="sjxx.shopData&&sjxx.shopData.name||'扫码点单'" :uropcity="1" vueId="7449ee7c-1"></uni-nav-bar>
    <view class="posi-f t0 w100 headerc p03 bf " :style="'top:'+getSb().customNavh+'px'+';'">
      <view class="h100 f-c-xc ">
        <view class="f-bt ">
          <view class="f-1 f-y-c ">
            <view class="f-y-c f32 c0 " v-if="storeInfo.tableInfo">
              <text class="iconfont icondndc mr10 c0 f40 "></text>
              <text>{{storeInfo.tableInfo.typeName}}</text>
              <text class="ml10 wei ">{{storeInfo.tableInfo.name}}</text>
              <text v-if="paIx">
                <text class="wei ">{{'·'+paIx}}</text>位</text>
            </view>
          </view>
          <view class="f-row ml30 ">
            <view class="f-c">
              <text @tap="tzdd" class="iconfont icondd f48 c3"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="h100 " :style="'padding-top:'+getSb().customNavh+'px'+';'">
      <view class="h100 pt90 ">
        <view class="bodyer bf " :hidden="!(sIndex==0)">
          <view class="f-x-bt ">
            <view class="f44 wei t-o-e ">{{sjxx.shopData.name}}</view>
          </view>
          <view class="f-bt mt15 c9 mb20 ">
            <view class="f-1 f-y-c f24 ">
              <text class="iconfont icontishi mr15 " :style="'color:'+tColor+';'"></text>
              <text class="t-o-e ">{{sjxx.moreSet.notice}}</text>
            </view>
            <view @tap="showShopInfo = !showShopInfo" class="f22 ml20 f-y-c ">更多<text class="iconfont icondown f22 ml5 c9 "></text>
            </view>
          </view>
          <mg-swiper :co="lbswiper" :color="tColor" u="rpx" vueId="7449ee7c-2"></mg-swiper>
        </view>
        <view class="category-c f-row ">
          <scroll-view class="left-c " :scrollIntoView="lsiv" :scrollWithAnimation="true" :scroll-y="true" :style="'padding-bottom:'+leftpb+';'">
            <view @tap="choose(i)" :class="['title-c ',sIndex==i?'onSelected':'']" :id="'l'+i" v-for="(v, i) in catrgoryList" :key="i">
              <view class="title-b " :style="'background:'+tColor+';'" v-if="sIndex==i"></view>
              <view class="title-bx cf5f f18 nowei " v-if="v.isRequire!=2">
                {{v.isRequire==1?'必选':v.customName}}</view>
              <view :class="['title-n f-c-xc ',i==sIndex+1?'ysyj':'',i==sIndex-1?'yxyj':'']">
                <block v-if="sjxx.categorySet.display==3">
                  <view class="f-y-e ">
                    <view class="title-img ">
                      <mg-img m="aspectFit" :src="v.icon" :vueId="'7449ee7c-3-'+i"></mg-img>
                    </view>
                    <text>{{lfName(v.name)}}</text>
                  </view>
                  <text class="mt15 t-o-e " v-if="v.name">{{lfName(v.name)}}</text>
                </block>
                <block v-else>
                  <block v-if="sjxx.categorySet.display==2">
                    <view class="f-x-c ">
                      <view class="title-img ">
                        <mg-img m="aspectFit" :src="v.icon" :vueId="'7449ee7c-4-'+i"></mg-img>
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
            <view class="title-c " v-for="(v, i) in [1,1,1,1]" :key="i">
              <view class="title-n "></view>
            </view>
          </scroll-view>
          <scroll-view @scroll="myscroll" class="f-g-1 right-c " lowerThreshold="100" :scrollIntoView="rsiv" :scroll-y="true" :style="'padding-bottom:'+rightpb+';'">
            <view class="c-item " :id="'r'+pi" v-for="(pv, pi) in catrgoryList" :key="pi">
              <view class="c-title ">{{pv.name}}</view>
              <view @tap="goodinfo(pv.id,co.id)" class="conw2 f-row p2 " v-for="(co, i) in pv.goods" :key="i">
                <view class="f-g-0 bf6 left bs5 p-r ">
                  <mg-img cname="wh" :src="co.icon" :vueId="'7449ee7c-5-'+pi+'-'+i"></mg-img>
                  <view class="p-a ysq f-c b0 cf w100 f22 " v-if="co.stock<=0">已售罄</view>
                </view>
                <view class="f-g-1 ml20 f24 c9 ">
                  <view class="f30 t-o-e c0 ">{{co.name}}</view>
                  <view class="mt10 " v-if="co.labelName">
                    <text class="text-btnf f22 mr10 p-3-10 bs5 " :style="'background:'+'rgba('+ colorToRGB(co.labelColor)+',0.1)'+';'+'color:'+co.labelColor+';'">{{co.labelName}}</text>
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
                        <text>选 择</text>
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
                  <view v-if="co.maxNum>0||co.minNum>1">
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
    <view v-if="sjxx.shopData">
      <goods-car @add="add" @celar="celarCar" @dec="dec" :updateShow.sync="showCar" :buytype="buyType" :carBtm="0" :carlistPab="130" :goodsList="catrgoryList" :outin="outin" :show="showCar" :sjxx="sjxx" :tableinfo="storeInfo.tableInfo" type="3" vueId="7449ee7c-6"></goods-car>
      <store-info :co="sjxx" :qlist="sjyhq" :sjqb="sjqb" type="3" v-model="showShopInfo" vueId="7449ee7c-7"></store-info>
    </view>
    <spec @add="add" :co="goodsInfo" :outin="outin" :storeid="storeInfo.id" v-model="showGg" vueId="7449ee7c-8"></spec>
    <view class="tablec z9999 posi-f udlr " v-if="showTable">
      <view class="tcbg posi-a wh ">
        <mg-img :src="dndcConfig.background||sjxx.shopData.icon" vueId="7449ee7c-9"></mg-img>
      </view>
      <view class="posi-r h100 f-col ">
        <view class="f-g-1 f-c-c cf ">
          <view class="f-y-c ">
            <view class="tcimg mr30 ">
              <mg-img :src="system.icon" vueId="7449ee7c-10"></mg-img>
            </view>
            <view class="tctt ">{{system.name}}</view>
          </view>
          <view class="tctbt f34 p03 ">{{'欢迎来到'+sjxx.shopData.name}}</view>
        </view>
        <view class="f-g-0 tbbd o-h p-r ">
          <view :class="['p-a wh bf bs15 f-col tbbdc ',showTotop?'totop':'']">
            <view class="w100 f40 c0 t-l mt20 ">客官，您几位？</view>
            <view class="f-y-c mt10 ">桌号：<text>{{storeInfo.tableInfo.typeName}}</text>
              <text class="ml10 ">{{storeInfo.tableInfo.name}}</text>
            </view>
            <view class="tbbdvc f-y-c o-x-s ">
              <view @tap="dcParr(i+1)" :class="['f-g-0 tbbdv f30 f-c ',i+1==paIx?'bva':'']" v-for="(v, i) in parr" :key="i">
                {{v+(i>9?'':'人')}}
              </view>
            </view>
            <view @tap="ljdc" class="ljdc f-c b-l-f0f0 f30 cf ">开始点单
            </view>
          </view>
        </view>
        <view class="f-g-0 p3 f-c cf ">{{system.name+'提供技术支持'}}</view>
      </view>

      <mg-modal :ismr="true" v-model="showxzrs" :vs="true" vueId="7449ee7c-11" :vueSlots="['default']" width="630rpx" :zIndex="3000">
        <view class="bf bs10 ">
          <view class="p3 f30 ">
            <view class="t-c mb20 ">选择人数</view>
            <mg-input cname="p23" ht="人数" last="1" max="2" pr="请输入" t="number" v-model="zdyrs" :vueId="'7449ee7c-12'+','+'7449ee7c-11'"></mg-input>
          </view>
          <view class="f-row hlt " style="height:100rpx;">
            <button @tap="showxzrs = !1" class="tcbtn f-1 bf f30 f-c c9 " hoverClass="be">取消</button>
            <button @tap="qdxzrs" class="tcbtn f-1 bf f30 f-c " hoverClass="be" :style="'color:'+'#FF6735'+';'">确定</button>
          </view>
        </view>
      </mg-modal>
    </view>
    <!-- <load vueId="7449ee7c-13" v-if="showloading"></load> -->
    <!-- <load type="2" v-model="showjz" vueId="7449ee7c-14"></load> -->
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
import mgInput from 'components/form/mg-input.vue';
import jzz from 'components/common/jzz.vue';
import tips from 'components/common/tips.vue';
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import tcyhq from 'components/template/tcyhq.vue';
import tcgg from 'components/template/tcgg.vue';
import storeInfo from 'components/goods/store/store-info.vue';
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

import {
  utilMixins
} from 'common/utilMixins';
import {
  deepCopy,
  getDw,
  getOptions,
  getSb,
  message,
  colorToRGB
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
    mgInput,
    jzz,
    tips,
    MgSwiper,
    tcyhq,
    tcgg,
    storeInfo,
  },
  data: function () {
    return {
      showloading: !1,
      catrgoryList: [],
      sIndex: 0,
      rsiv: "",
      lsiv: "",
      showGg: !1,
      getSb,
      colorToRGB,
      buyType: 2,
      showShopInfo: !1,
      outin: "2",
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
      storeInfo: {},
      showTable: !1,
      showTotop: !1,
      parr: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "更多"],
      paIx: 1,
      showxzrs: !1,
      zdyrs: "",
      sjxx: {}
    }
  },
  mixins: [utilMixins],
  onLoad: function (t) {
    var e = this;
    var r, i, u;
    r = getOptions(t, {
      key: "tableId"
    }),
      e.query = t, e.tableId = r;
    console.log('r: ', r);
    if (!r) {
      return e.tips()
    }
    Promise.all([e.getLoginInfo(), e.getConfig({
      key: "orderset",
      api: "order_order__set"
    })]);
    getDw().then(i => {
      if (1 != e.dndcConfig.distanceOpen) {
        this.$api['in-store_table__info']({
          tableId: r,
          lat: i.latitude || "",
          lng: i.longitude || ""
        }).then(res => {
          console.log('res304: ', res);
          res.tableId = r,
            e.storeInfo = {
              id: res.storeId,
              tableInfo: res
            },
            e.storeId = res.storeId;
          e.supdCarbp = {
            storeId: e.storeId,
            tableId: r,
            item: e.outin,
            key: "ins"
          },
            e.getDw(i),
            e.getSystem();
        })
      }
    })
  },
  onShow: function () {
    var t = this;
    this.storeInfo.id && setTimeout(() => t.getMycar(Object.assign({}, t.supdCarbp, {
      mask: 1
    })).then(res => {
      t.refreshList();
    }), 100);
  },
  computed: {
    ...mapState({
      scarList: function (t) {
        return t.scarList.ins.data || []
      },
      dndcConfig: function (t) {
        return t.config.orderset.instore || {}
      }
    }),
    lbswiper: function () {
      return {
        class: "mt20 mb20",
        swiper: this.sjxx.moreSet && this.sjxx.moreSet.orderMedia.map((function (t) {
          return {
            url: t
          }
        })),
        duration: "",
        mode: "",
        height: "260",
        radius: "8",
        auto: !0,
        interval: 5
      }
    },
    isClose: function () {
      return this.sjxx.shopData && (1 == this.sjxx.shopData.storeOpen || 2 == this.sjxx.shopData.storeOpen &&
        1 == this.sjxx.moreSet.status)
    },
    leftpb: function () {
      return 1 == this.system.outTabbar ? "0" : "100rpx"
    },
    rightpb: function () {
      return 1 == this.system.outTabbar ? "0" : "100rpx"
    },
  },
  watch: {},
  methods: {
    ...mapActions(["getConfig", "supdCar", "getMycar"]),
    ...mapMutations(["setScarList"]),
    ljdc: function () {
      if ("" == this.paIx) return message("请选择人数", 3);
      this.storeInfo.tableInfo.pnum = this.paIx, this.showTable = !1
    },
    dcParr: function (t) {
      if (11 == t) return this.showxzrs = !0;
      this.paIx = t
    },
    qdxzrs: function () {
      if ("" == this.zdyrs) return message("请输入人数", 3);
      this.storeInfo.tableInfo.pnum = this.paIx = this.zdyrs, this.showTable = !1
    },
    tips: function () {
      var e = this;
      uni.showModal({
        title: "提示",
        content: "未获取到桌位信息或者超出商家范围",
        showCancel: !1,
        success: function (t) {
          e.go({
            t: 6,
            url: "/pages/tabbar/index/index"
          })
        }
      })
    },
    getDw: function (i) {
      var t = this;
      t.init();
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
      t.sIndex = 0,
        t.rsiv = "r0",
        t.setScarList({
          key: "ins",
          data: {}
        }),
        t.init();
    },
    init: function () {
      var e = arguments,
        n = this;
      var i;
      e.length > 0 && void 0 !== e[0] ? e[0] : 1,
        i = getApp().globalData.gdlocation,
        n.getSjxx({
          storeId: n.storeId,
          goodsType: 2,
          lat: i.latitude,
          lng: i.longitude
        }).then(res => {
          n.getMycar(n.supdCarbp).then(res => {
            n.storeId = n.sjxx.shopData.id,
              n.catrgoryList = deepCopy(n.sjxx.data),
              n.sjxx.data.length || uni.showModal({
                title: "提示",
                content: "暂无堂食商品",
                confirmText: "返回主页",
                cancelText: "我知道了",
                success: function (t) {
                  t.confirm && n.go({
                    t: 6,
                    url: "/pages/tabbar/index/index"
                  })
                }
              }),
              n.showloading = !1,
              n.refreshList(),
              n.$nextTick((function () {
                setTimeout((function () {
                  n.getHeightList()
                }), 100)
              })),
              setTimeout(() => n.getOtherData(), 1e3)
          })
        });

    },
    refreshList: function () {
      this.showjz = !0;
      for (var t = this.scarList, e = this.catrgoryList, n = 0, o = e.length; n < o; n++)
        for (var r = 0, s = e[n].goods.length; r < s; r++) {
          e[n].goods[r].num = 0;
          for (var i = 0; i < t.length; i++) e[n].goods[r].id == t[i].goodsId && (e[n].goods[r].num += +t[i]
            .num)
        }
      this.showjz = !1
    },
    getSjxx: async function (t) {
      var e = this;
      await this.$api['good_get__product__list'](t).then(res => {
        var s = res;
        s.discount.newReduction = s.discount.give.id = s.discount.grantCoupon.name = null,
          e.sjxx = s,
          1 == s.moreSet.orderMode ? e.storeInfo.tableInfo.orderInfo ? (e.showLoading = !1,
            e.query.tableId || e.go({
              t: 2,
              url: "/yb_wm/shop/in/order-dl?id=" + e.storeInfo.tableInfo.orderInfo.id
            })) : 1 == e.storeInfo.tableInfo.state ? (e.showTable = !0, e.showLoading = !1, setTimeout(
              (function () {
                e.showTotop = !0
              }), 100)) : e.showLoading = !1 : (e.showTable = !0, e.showLoading = !1, setTimeout((
                function () {
                  e.showTotop = !0
                }), 100));
        return s;
      })
    },
    getOtherData: function () {
      var t = this;
      this.$api['shop_window__collection']({
        location: 2,
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
    updList: function (t) {
      var e = this;
      e.supdCar("1" == t.e.addwz ? t.e.g.ggnum ? Object.assign({}, e
        .supdCarbp, {}, {
        type: t.type,
        goodsId: t.e.g.id,
        groupId: t.e.g.groupId || "",
        material: t.e.g.material || [],
        attribute: t.e.g.attribute || "",
        num: t.e.g.ggnum
      }) : Object.assign({}, e.supdCarbp, {}, {
        type: t.type,
        goodsId: t.e.g.id
      }) : Object.assign({}, e.supdCarbp), {}, {
        type: t.type,
        goodsId: t.e.g.goodsId,
        id: t.e.g.id
      }).then(res => {
        e.refreshList(), e.showjz = !1;
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
      if (e.isClose) {
        if ((t.g.SalesStock && t.g.SalesStock <= 0)) return message("商品已售罄", 3)
        if (t.g.stock <= 0) return message("商品已售罄", 3);
        e.showjz = !0,
          1 != t.g.isSpecs && 1 != t.g.isMaterial && 1 != t.g.isAttr || t.g
            .hasOwnProperty("groupId") ? e.updList({
              type: 1,
              e: t
            }) : (e.showGg = !0, e.goodsInfo = t.g, e.showjz = !1);
      }
    },
    celarCar: function (t) {
      for (var e = this.catrgoryList, n = 0, o = e.length; n < o; n++)
        for (var r = 0, s = e[n].goods.length; r < s; r++) e[n].goods[r].num = 0
    },
    lfName: function (t) {
      t.substr(0, 2), t.substr(2, 4);
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
    tzdd: function () {
      this.go({
        t: 1,
        url: "/yb_wm/shop/in/indd"
      })
    }
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

.headerc {
  height: 90rpx;
}

.tablec .tcbg::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
}

.tablec .tcimg {
  width: 100rpx;
  height: 100rpx;
}

.tablec .tctt {
  font-size: 70rpx;
}

.tablec .tctbt {
  margin-top: 40rpx;
}

.tablec .tbbd {
  height: 496rpx;
  margin: 0 30rpx;
  border-radius: 15rpx;
}

.tablec .tbbdc {
  padding: 0 30rpx;
  bottom: 0;
  transition: all 0.6s linear;
  transform: translateY(100%);
}

.tablec .totop {
  transform: none;
}

.tablec .tbbdvc {
  margin: 70rpx 0 70rpx 0;
}

.tablec .tbbdv {
  width: 140rpx;
  height: 78rpx;
  border-radius: 78rpx;
}

.tablec .bva {
  background: #fd9800;
  color: #fff;
}

.tablec .ljdc {
  width: auto;
  background: #ff6735;
  height: 110rpx;
  border-radius: 110rpx;
}
</style>