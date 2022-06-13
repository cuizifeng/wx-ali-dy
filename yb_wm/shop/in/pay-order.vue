<template>
  <view class="pb130 " :hidden="!sjxx.moreSet">
    <view class="header " :style="'background:'+'#fff'+';'">
      <view class="w100 t0 f-y-c p23 " :style="'background:'+'#FFF3EA'+';'" v-if="sjxx.moreSet&&sjxx.moreSet.orderNotice">
        <text class="iconfont icontishi " :style="'color:'+'#ff7c1c'+';'"></text>
        <view class="f-1 " :style="'color:'+'#ff7c1c'+';'">
          <uni-notice-bar backgroundColor="transparent" color="#ff7c1c" scrollable="true" single="true" :speed="25" :text="sjxx.moreSet.orderNotice" vueId="04c6110f-1"></uni-notice-bar>
        </view>
      </view>
    </view>
    <view class="mainc ">
      <view class="bf bs20 f-c-c p3 ">
        <view class="p10 f24 cb ">桌位号码</view>
        <view class="f44 f-y-c wei mb20 ">
          <text>{{tableInfo.typeName}}</text>
          <text class="ml20 ">{{tableInfo.name}}</text>
        </view>
        <view class="f24 c6 p10 ">订单支付后，大厨就开始制作啦！</view>
      </view>
      <view class="p03 bf bs20 mt30 ">
        <mg-cell btt="桌位人数" bttc="f30" cname="p30" isl="1" last="1" vueId="04c6110f-2" :vueSlots="['ft']">
          <view slot="ft">
            <number-box @change="bindChange" :max="99" :min="1" :value="params.people" :vueId="'04c6110f-3'+','+'04c6110f-2'">
            </number-box>
          </view>
        </mg-cell>
      </view>
      <view class="bs20 ">
        <view :hidden="!(params.deliveryMode==1)">
          <mg-cell last="1" vueId="04c6110f-4" :vueSlots="['bd']" v-if="ztTypeArr.length">
            <view class="f-x-bt " slot="bd">
              <view @tap="clickztMode(v)" class="pstypec bs10 f-c " :style="'color:'+(v.value==params.isOut?tColor:'')+';'+'border-color:'+(v.value==params.isOut?tColor:'')+';'" v-for="(v, i) in ztTypeArr" :key="i">
                <text :class="['iconfont c3 mr20 ',v.icon]" :style="'color:'+(v.value==params.isOut?tColor:'')+';'"></text>
                <text class="f32 ">{{v.name}}</text>
                <view class="yddsj posi-a " :style="'border-bottom:'+(v.value==params.isOut?'41rpx solid '+tColor:'')+';'">
                </view>
                <text class="gou posi-a iconfont icongou cf f20 " v-if="v.value==params.isOut"></text>
              </view>
            </view>
          </mg-cell>
        </view>
      </view>
      <view class="mt30 p03 bf bs20 ">
        <mg-cell btt="商品明细" bttc="f30" cname="p30" isl="1" vueId="04c6110f-5"></mg-cell>
        <mg-cell brs="5rpx" cname="p30 la124" h="104" :img="v.icon" :isl="i==carInfo.data.length-1&&1" last="1" :vueId="'04c6110f-6-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in carInfo.data" :key="i">
          <view slot="bd">
            <view class="f-bt ">
              <view class="t-o-e ">{{v.name}}</view>
              <view class="f-g-0 f32 ">{{sl+itemTotal(v.money, v.num)}}</view>
            </view>
            <view class="f-bt mt10 f24 c9 ">
              <view class="f-g-1 f-raw ">
                <text class="ml10 " v-if="v.groupName">{{v.groupName}}</text>
                <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                <text class="ml10 " v-if="v.materialName">{{'+'+v.materialName}}</text>
              </view>
              <view class="ml10 ">{{'x'+v.num}}</view>
            </view>
          </view>
        </mg-cell>
        <mg-cell btt="商品小计" cname="p15" :ft="''+sl+carInfo.oldPrice-carInfo.boxMoney" ftc="f32 c3" last="1" vueId="04c6110f-7"></mg-cell>
        <mg-cell btt="桌位费" cname="p15" :ft="''+sl+xjMoney.zwf" ftc="f32 c3" last="1" vueId="04c6110f-8"></mg-cell>
        <mg-cell cname="p15" :ft="'-'+sl+carInfo.reduce" ftc="f32 cf5f" last="1" vueId="04c6110f-9" :vueSlots="['bd']" v-if="carInfo.reduce>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c ">减</view>
            <view>商品满减</view>
          </view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="04c6110f-10" :vueSlots="['bd','ft']" v-if="jsInfo.mzInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">赠</view>
            <view>{{jsInfo.mzInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mzInfo.title}}</view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="04c6110f-11" :vueSlots="['bd','ft']" v-if="jsInfo.mfInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">返</view>
            <view>{{jsInfo.mfInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mfInfo.title}}</view>
        </mg-cell>
        <mg-cell arrow="1" @tab="tzxqyhq(1)" cname="p15" :color="kyhb.dpyhq.n>0?tColor:''" last="1" vueId="04c6110f-12" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
          <view class="f-y-c " slot="hd">
            <view class="yhic f18 cf bf5f f-c ">券</view>
            <view>门店代金券</view>
          </view>
          <view slot="ft">
            <text class="f32 " :style="'color:'+tColor+';'" v-if="couponInfo.store">{{'-'+sl+yhqPreferential.store}}</text>
            <block v-else>
              <view class="hongbao bs5 f20 f-y-c " v-if="kyhb.dpyhq.n>0">
                <text class="iconfont iconhb cf mr10 f26 "></text>{{kyhb.dpyhq.n+'个可用'}}
              </view>
              <block v-else>
                <view class="f24 f-y-c " v-if="kyhb.dpyhq.n==0">暂无可用</view>
              </block>
            </block>
          </view>
        </mg-cell>
        <mg-cell arrow="1" @tab="tzxqyhq(2)" cname="p15" :color="kyhb.ptyhq.n>0?tColor:''" last="1" vueId="04c6110f-13" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
          <view class="f-y-c " slot="hd">
            <view class="yhic f18 cf bf5f f-c ">券</view>
            <view>{{system.custom.systemRedbag}}</view>
          </view>
          <view slot="ft">
            <text class="f32 " :style="'color:'+tColor+';'" v-if="couponInfo.platform">{{'-'+sl+yhqPreferential.platform}}</text>
            <block v-else>
              <view class="hongbao bs5 f20 f-y-c " v-if="kyhb.ptyhq.n>0">
                <text class="iconfont iconhb cf mr10 f26 "></text>{{kyhb.ptyhq.n+'个可用'}}
              </view>
              <block v-else>
                <view class="f24 f-y-c " v-if="kyhb.ptyhq.n==0">暂无可用</view>
              </block>
            </block>
          </view>
        </mg-cell>
        <mg-cell cname="p15" isl="1" vueId="04c6110f-14" :vueSlots="['bd','ft']">
          <view @tap="showyhgz = !0" class="f-y-c c9 f24 " slot="bd">优惠说明<text class="iconfont iconwen f20 c9 ml10 "></text>
          </view>
          <view class="ml10 c3 " slot="ft">
            <text class="f24 ">{{'共'+carInfo.num+'件商品'}}</text>
            <text class="m02 ">小计</text>
            <text class="f34 ">{{sl+(xjMoney.total||0)}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" isl="1" vueId="04c6110f-15" :vueSlots="['bd','ft']" v-if="system.taxRatio>0">
          <view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+system.taxRatio+'%)'}}</text>
          </view>
          <view class="f32 c3 " slot="ft">{{'+'+sl+(xjMoney.slje||0)}}</view>
        </mg-cell>
      </view>
      <view class="mt30 p03 bf bs20 ">
        <mg-cell arrow="1" bdmw="100rpx" @tab="go({t:1,url:'/yb_wm/shop/out/bz?color=#FE6E00&note='+params.userNote})" btt="备注" bttc="f30" cname="p30" :ft="params.userNote||'请填写你的其他要求'" isl="1" vueId="04c6110f-16"></mg-cell>
      </view>
    </view>
    <view class="foot-btnc " :style="'bottom:'+(isIpx?'40rpx':0)+';'" v-if="carInfo.data.length">
      <button @tap="ljzf" class="foot-btn b-l-f0f0 " :disabled="loading" hoverClass="btnhc" :loading="loading">确认下单</button>
    </view>
    <view class="bgf " v-if="isIpx"></view>
    <mg-modal ismr="true" v-model="showyhgz" vueId="04c6110f-17" :vueSlots="['default']" width="630rpx" :zIndex="3000">
      <view class="bf bs10 ">
        <view class="p3 c9 ">
          <view class="t-c f32 c0 mb20 ">优惠规则详情</view>
          <view class="p10 f-y-c " v-if="carInfo.reduce>0">
            <view class="f-1 ">满减</view>
            <view>{{'-'+sl+carInfo.reduce}}</view>
          </view>
          <view class="p10 f-y-c " v-if="orderMuster.newReduction>0">
            <view class="f-1 ">新客立减</view>
            <view>{{'-'+''+sl+orderMuster.newReduction}}</view>
          </view>
          <view class="p10 f-y-c c0 ">
            <view class="f-1 ">总计</view>
            <view>{{'-'+''+sl+jsInfo.yhzj}}</view>
          </view>
        </view>
        <view class="hlt " style="height:100rpx;">
          <button @tap.stop="showyhgz = !1" class="tcbtn f-1 bf h100 f28 f-c cf70 " hoverClass="be">我知道了</button>
        </view>
      </view>
    </mg-modal>
  </view>
</template>


<script>
import uniNoticeBar from 'components/third/uni-notice-bar.vue';
import mgPopup from 'components/common/popup.vue';
import bkB from 'components/common/block-b.vue';
import sqBtn from 'components/common/sq-btn.vue';
import mgRadio from 'components/form/mg-radio.vue';
import mgAgree from 'components/form/mg-agree.vue';
import mgModal from 'components/common/modal.vue';
import load from 'components/common/load.vue';
import numberBox from 'components/form/number-box.vue';
import {
  mapActions,
  mapState,
  mapMutations,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  setNT,
  showLoading,
  bus
} from 'common/util';

export default {
  name: "pay-order",
  components: {
    uniNoticeBar,
    mgPopup,
    bkB,
    sqBtn,
    mgRadio,
    mgAgree,
    mgModal,
    load,
    numberBox,
  },
  data: function () {
    return {
      showLoading: !1,
      tableInfo: {},
      closePay: !1,
      showPay: !1,
      carInfo: {
        data: []
      },
      ModeArr: [],
      wmAddress: "",
      params: {
        deliveryMode: "1",
        couponId: {
          store: "",
          platform: ""
        },
        people: 0,
        storeId: "",
        tableId: "",
        userNote: "",
        eatType: ""
      },
      loading: !1,
      payObj: {},
      showTime: !1,
      wmIndex: 0,
      wmTime: [],
      yjIndex: 0,
      yjTime: [],
      rsiv: "",
      yjrV: {},
      deliveryPreferential: 0,
      yhqPreferential: {
        store: 0,
        platform: 0
      },
      kyhb: {
        dpyhq: {
          n: 0,
          data: []
        },
        ptyhq: {
          n: 0,
          data: []
        }
      },
      couponInfo: {
        store: "",
        platform: ""
      },
      orderMuster: {},
      ztTypeArr: [],
      agree: !0,
      showyhgz: !1,
      hgInfo: {},
      sjxx: {}
    }
  },
  onLoad: function (t) {
    var n = this;
    n.getSystem(), setNT("提交订单"),
      n.sjxx = uni.getStorageSync("carInfo").sjxx,
      n.tableInfo = JSON.parse(decodeURIComponent(t.tableInfo)),
      n.params.people = n.tableInfo.pnum || 3,
      n.params.storeId = n.tableInfo.storeId,
      n.params.tableId = n.tableInfo.tableId,
      n.params.eatType = n.sjxx.moreSet.payMode,
      n.supdCarbp = {
        storeId: n.tableInfo.storeId,
        tableId: n.tableInfo.tableId,
        item: 2,
        key: "ins",
        mask: 1
      },
      n.getGoodsArr(),
      n.getOrderset(),
      n.getOrderMuster(),
      n.getyhqArr(),
      bus.$on("payorder", (function (e) {
        e.hasOwnProperty("hbInfo") && (1 == e.type ? (n.couponInfo.store = e.hbInfo || "",
          n.params.couponId.store = n.couponInfo.store ? n.couponInfo.store.id : "") :
          2 == e.type && (n.couponInfo.platform = e.hbInfo || "",
            n.params.couponId.platform = n.couponInfo.platform ? n.couponInfo.platform.id : ""));
      })),
      setTimeout((function () {
        n.isOnLoad = !0
      }));
  },
  onUnload: function () {
    bus.$off("payorder")
  },
  onShow: function () {
    this.isOnLoad
  },
  mixins: [utilMixins],
  computed: {
    ...mapState(["scarList", "latLng"]),
    ...mapState({
      orderset: function (e) {
        return e.config.orderset
      }
    }),
    xjMoney: function () {
      if (this.carInfo.price) {
        var e = +(this.carInfo.oldPrice - this.carInfo.boxMoney - this.carInfo.reduce).toFixed(2),
          t = this.orderMuster.newReduction || 0;
        t = 0;
        var n = 0,
          o = 0;
        this.couponInfo.store && (this.orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) &&
          (1 == this.couponInfo.store.type ? n = +this.couponInfo.store.money || 0 : 2 == this.couponInfo.store
            .type && (n = +this.couponInfo.store.money), n < 0 && (n = 0)), this.couponInfo.platform && (this
              .orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) && (1 == this.couponInfo
                .platform.type ? o = +this.couponInfo.platform.money || 0 : 2 == this.couponInfo.platform.type && (
                  o = +this.couponInfo.platform.money), o < 0 && (o = 0));
        var r = 0,
          a = this.blxs(1 == this.sjxx.moreSet.serviceType ? this.params.people * this.sjxx.moreSet
            .serviceMoney : this.sjxx.moreSet.serviceMoney),
          s = 0,
          i = 0,
          u = +(e - n - o - t).toFixed(2);
        return this.deliveryPreferential = 0, u <= 0 && (u = .01), s = +(u + r + a).toFixed(2), s <= 0 && (s =
          .01), this.yhqPreferential.store = n, this.yhqPreferential.platform = o, this.system.taxRatio > 0 &&
          (i = +(s * (this.system.taxRatio / 100)).toFixed(2)), {
          total: s,
          slje: i,
          bzf: r,
          zwf: a
        }
      }
    },
    jsInfo: function () {
      var e = this;
      if (this.carInfo.price) {
        var t = +this.carInfo.oldPrice + this.xjMoney.zwf - (2 == this.params.deliveryMode && this.wmAddress ?
          Number(this.deliveryPreferential > 0 ? this.wmAddress.oldMoney : this.wmAddress.deliveryMoney) : 0) -
          this.xjMoney.total,
          n = this.xjMoney.total + this.xjMoney.slje,
          o = {},
          r = {};
        this.sjxx.discount.give.moneyArr && this.sjxx.discount.give.moneyArr.find((function (t) {
          return e.xjMoney.total >= t.fullMoney
        }));
        return this.xjMoney.total >= this.sjxx.discount.grantCoupon.orderMoney && (r = {
          name: "满返门店代金券",
          title: this.sjxx.discount.grantCoupon.name
        }), this.hgInfo.id && (n = +this.hgInfo.money + n), {
          yhzj: +t.toFixed(2),
          hjMoney: +n.toFixed(2),
          mzInfo: o,
          mfInfo: r
        }
      }
    }
  },
  methods: {
    ...mapActions(["getConfig", "getMycar"]),
    ...mapMutations(["setScarList"]),
    bindChange: function (e) {
      this.params.people = e
    },
    clickMode: function (e) {
      e.value != this.params.deliveryMode && (showLoading("设置中..."), this.params.deliveryMode = e
        .value, this.getWmAddress())
    },
    clickztMode: function (e) {
      this.params.isOut = e.value
    },
    setTel: function (e) {
      this.params.userTel = e
    },
    getGoodsArr: function () {
      var e = this;
      var n;
      return new Promise((r, j) => {
        e.getMycar(e.supdCarbp).then(res => {
          console.log('res: ', res);
          e.carInfo = e.scarList.ins,
            n = 0,
            e.scarList.ins.data.forEach((function (e) {
              n += +e.num
            })),
            e.carInfo.num = n
          r(res);
        })

      })
    },
    getOrderset: function () {
      var t = this;
      t.getConfig({
        key: "orderset",
        api: "order_order__set"
      }).then((function () {
        uni.setStorageSync("fwb", t.orderset.selfAgreement)
      }));
    },
    tzxqyhq: function (t) {
      1 == t ? (e.setStorageSync("kyhb", this.kyhb.dpyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=1&name=门店代金券&couponId=" + this.params.couponId.store
      })) : 2 == t && (e.setStorageSync("kyhb", this.kyhb.ptyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=2&name=" + this.system.custom.systemRedbag + "&couponId=" + this
          .params.couponId.platform
      }))
    },
    getyhqArr: function () {
      var t = this;
      uni.setStorageSync("kyhb", {
        n: 0,
        data: []
      });
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 2,
        storeType: 1
      }).then(res => {
        console.log('res: ', res);
        t.kyhb.dpyhq = {
          n: res.length,
          data: res
        };
      })
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 2,
        storeType: 2
      }).then(res => {
        t.kyhb.ptyhq = {
          n: res.length,
          data: res
        }
      })
    },
    getOrderMuster: function () {
      var e = this;
      this.$api.order_order__muster({
        storeId: e.params.storeId
      }).then(res => {
        e.orderMuster = res || {
          newReduction: 0
        };
      });
    },
    itemTotal: function (e, t) {
      return this.blxs(e * t)
    },
    xzhg: function (e) {
      this.hgInfo = e.id == this.hgInfo.id ? {} : e
    },
    ljzf: function () {
      var e = this;
      this.$api['in-store_shop__car__require']({
        storeId: e.params.storeId,
        item: 2,
        tableId: e.params.tableId
      }).then(res => {
        e.getGoodsArr().then(() => {
          e.requestSM("inStoreOrder").then(res => {
            e.hgInfo.id && (e.params.changeId = e.orderMuster.changePay.id,
              e.params.changeGoodsId = e.hgInfo.id),
              this.$api['in-store_save__in__store__order']({ ...e.params, ct: 1 }).then(res => {
                (1 == e.params.eatType ? e.go({
                  t: 3,
                  url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
                    orderId: res.data,
                    orderType: 7,
                    info: {
                      money: e.jsInfo.hjMoney,
                      storeName: e.sjxx.shopData.name,
                      type: "堂食下单支付",
                      go: {
                        t: 3,
                        url: "/yb_wm/shop/in/order-dl?id=" + res.data
                      }
                    }
                  }))
                }) : 2 == e.params.eatType && e.go({
                  t: 3,
                  url: "order-dl?id=" + res.data
                }))
              })
          })
        })
      })
    }
  },
  created: function () { }
}
</script>
<style scoped>
.p15 {
  padding: 12rpx 0;
}

.header .psmsc {
  right: 30rpx;
  top: 26rpx;
  height: 66rpx;
  padding: 0 6rpx;
  border-radius: 60rpx;
}

.header .psmsc .psms {
  border-radius: 66rpx;
  height: 56rpx;
  padding: 0 10rpx;
  min-width: 90rpx;
}

.pstypec {
  width: 330rpx;
  height: 95rpx;
  border: 1rpx solid #333;
  position: relative;
}

.yddsj {
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 41rpx solid #fff;
  border-left: 46rpx solid transparent;
}

.gou {
  right: 4rpx;
  bottom: 3rpx;
}

.mainc {
  padding: 30rpx;
}

.hdwith {
  width: 100rpx;
}

.dbbtnc {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0rpx;
}

.dbbtnc .dbbtn {
  height: 104rpx;
  border-radius: 0rpx;
  overflow: hidden;
  display: flex;
  box-shadow: 0rpx 8rpx 18rpx 5rpx hsla(0, 0%, 86.7%, 0.9);
}

.dbbtnc .dbbtn .lt {
  color: #333;
  padding: 0 30rpx 0 30rpx;
  background: #fff;
}

.dbbtnc .dbbtn .rt {
  color: #fff;
  width: 179rpx;
  height: 100%;
  border-radius: 0;
  font-size: 28rpx;
  padding: 0;
}

.mt20 {
  margin-top: 18rpx;
}

.hgic {
  width: 382rpx;
  height: 140rpx;
}

.hgic .hgimg {
  width: 140rpx;
  height: 140rpx;
}

.hgic .spzk {
  border-bottom-right-radius: 15rpx;
  padding: 5rpx 14rpx;
}
</style>