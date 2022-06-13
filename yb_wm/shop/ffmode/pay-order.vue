<template>
  <view class="pb130 " :hidden="!carInfo.sjxx">
    <view class="header " :style="'background:'+'#fff'+';'">
      <view class="w100 t0 f-y-c p23 " :style="'background:'+'rgba('+ cTR(tColor)+',0.1)'+';'" v-if="carInfo.sjxx&&carInfo.sjxx.moreSet.fastOrderNotice">
        <text class="iconfont icontishi " :style="'color:'+tColor+';'"></text>
        <view class="f-1 " :style="'color:'+tColor+';'">
          <uni-notice-bar backgroundColor="transparent" :color="tColor" scrollable="true" single="true" :speed="25" :text="carInfo.sjxx.moreSet.fastOrderNotice" vueId="5a3e17de-1"></uni-notice-bar>
        </view>
      </view>
      <view class="p-r ">
        <get-ztd :sjxx="carInfo.sjxx" vueId="5a3e17de-2" v-if="params.deliveryMode==1"></get-ztd>
        <view class="p-a psmsc f-x-bt bf6 " v-if="ModeArr.length">
          <view @tap="clickMode(v)" :class="['psms f-c f24 c9 ',v.value==params.deliveryMode?'f28':'']" :style="'color:'+(v.value==params.deliveryMode?'#fff':'')+';'+'background:'+(v.value==params.deliveryMode?'#333':'')+';'" v-for="(v, i) in ModeArr" :key="i">{{v.name}}</view>
        </view>
      </view>
    </view>
    <view class="mainc ">
      <view class="mt20 bs20 ">
        <view :hidden="!(params.deliveryMode==1)">
          <mg-cell last="1" vueId="5a3e17de-3" :vueSlots="['bd']" v-if="ztTypeArr.length">
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
      <view class="mt20 p03 bf bs20 ">
        <mg-cell btt="商品明细" bttc="f30" cname="p30" isl="1" vueId="5a3e17de-4"></mg-cell>
        <mg-cell brs="5rpx" cname="p30 la124" h="104" :img="v.icon" :isl="i==carInfo.carList.length-1&&1" last="1" :vueId="'5a3e17de-5-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in carInfo.carList" :key="i">
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
        <mg-cell btt="商品小计" cname="p15" :ft="''+sl+carInfo.getTotal.spzj" ftc="f32 c3" last="1" vueId="5a3e17de-6">
        </mg-cell>
        <mg-cell btt="包装费" cname="p15" last="1" vueId="5a3e17de-7" :vueSlots="['ft']" v-if="carInfo.getTotal.bzf>=0">
          <view class="f32 c3 " slot="ft">
            <text class="mr30 t-d-l f24 c9 " v-if="params.deliveryMode==1&&params.isOut==1">{{sl+carInfo.getTotal.bzf}}</text>
            <text>{{sl+xjMoney.bzf}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" :ft="'-'+sl+carInfo.mjInfo.mjMoney" ftc="f32 cf5f" last="1" vueId="5a3e17de-8" :vueSlots="['bd']" v-if="carInfo.mjInfo.mjMoney>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c ">减</view>
            <view>商品满减</view>
          </view>
        </mg-cell>
        <mg-cell cname="p15" :ft="'-'+sl+orderMuster.newReduction" ftc="f32 cf5f" last="1" vueId="5a3e17de-9" :vueSlots="['bd']" v-if="orderMuster.newReduction>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf b00 f-c ">新</view>
            <view>门店新客立减</view>
          </view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="5a3e17de-10" :vueSlots="['bd','ft']" v-if="jsInfo.mzInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">赠</view>
            <view>{{jsInfo.mzInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mzInfo.title}}</view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="5a3e17de-11" :vueSlots="['bd','ft']" v-if="jsInfo.mfInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">返</view>
            <view>{{jsInfo.mfInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mfInfo.title}}</view>
        </mg-cell>
        <mg-cell arrow="1" @tab="tzxqyhq(1)" cname="p15" :color="kyhb.dpyhq.n>0?tColor:''" last="1" vueId="5a3e17de-12" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
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
        <mg-cell arrow="1" @tab="tzxqyhq(2)" cname="p15" :color="kyhb.ptyhq.n>0?tColor:''" last="1" vueId="5a3e17de-13" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
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
        <mg-cell cname="p15" isl="1" vueId="5a3e17de-14" :vueSlots="['bd','ft']">
          <view @tap="showyhgz = !0" class="f-y-c c9 f24 " slot="bd">优惠说明<text class="iconfont iconwen f20 c9 ml10 "></text>
          </view>
          <view class="ml10 c3 " slot="ft">
            <text class="f24 ">{{'共'+carInfo.getTotal.num+'件商品'}}</text>
            <text class="m02 ">小计</text>
            <text class="f34 ">{{sl+(xjMoney.total||0)}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" isl="1" vueId="5a3e17de-15" :vueSlots="['bd','ft']" v-if="system.taxRatio>0">
          <view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+system.taxRatio+'%)'}}</text>
          </view>
          <view class="f32 c3 " slot="ft">{{'+'+sl+(xjMoney.slje||0)}}</view>
        </mg-cell>
      </view>
      <view class="mt20 p03 bf bs20 ">
        <mg-cell arrow="1" bdmw="100rpx" @tab="go({t:1,url:'/yb_wm/shop/out/bz?note='+params.userNote})" btt="备注" bttc="f30" cname="p30" :ft="params.userNote||'请填写你的其他要求'" isl="1" vueId="5a3e17de-16"></mg-cell>
      </view>
    </view>
    <view class="dbbtnc " :style="'bottom:'+(isIpx?'40rpx':0)+';'">
      <view class="dbbtn ">
        <view class="f-g-1 lt f-c-xc ">
          <view>
            <text class="mr10 ">合计</text>
            <text class="f36 ">{{sl+(jsInfo.hjMoney||0)}}</text>
          </view>
          <view class="f-y-c f22 c9 ">
            <view>为您节省</view>
            <view>{{sl+(jsInfo.yhzj||0)}}</view>
          </view>
        </view>
        <button @tap="ljzf" class="rt f-c " :style="'background:'+tColor+';'">立即支付</button>
      </view>
    </view>
    <view class="bgf " v-if="isIpx"></view>
    <mg-modal ismr="true" v-model="showyhgz" vueId="5a3e17de-17" :vueSlots="['default']" width="630rpx" :zIndex="3000">
      <view class="bf bs10 ">
        <view class="p3 c9 ">
          <view class="t-c f32 c0 mb20 ">优惠规则详情</view>
          <view class="p10 f-y-c " v-if="carInfo.mjInfo.mjMoney>0">
            <view class="f-1 ">满减</view>
            <view>{{'-'+sl+carInfo.mjInfo.mjMoney}}</view>
          </view>
          <view class="p10 f-y-c " v-if="orderMuster.newReduction>0">
            <view class="f-1 ">新客立减</view>
            <view>{{'-'+''+sl+orderMuster.newReduction}}</view>
          </view>
          <view class="p10 f-y-c " v-if="params.deliveryMode==1&&params.isOut==1">
            <view class="f-1 ">包装费优惠</view>
            <view>{{'-'+''+sl+carInfo.getTotal.bzf}}</view>
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
import {
  utilMixins
} from 'common/utilMixins';
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'
import {
  bus,
  getPage,
  setNT,
  showLoading
} from 'common/util';
import getAddress from 'components/address/get-address.vue';
import getZtd from 'components/address/get-ztd.vue';
import uniNoticeBar from 'components/third/uni-notice-bar.vue';
import mgPopup from 'components/common/popup.vue';
import bkB from 'components/common/block-b.vue';
import sqBtn from 'components/common/sq-btn.vue';
import mgRadio from 'components/form/mg-radio.vue';
import mgAgree from 'components/form/mg-agree.vue';
import mgModal from 'components/common/modal.vue';
import load from 'components/common/load.vue';
export default {
  name: "pay-order",
  components: {
    getAddress,
    getZtd,
    uniNoticeBar,
    mgPopup,
    bkB,
    sqBtn,
    mgRadio,
    mgAgree,
    mgModal,
    load,
  },
  data: function () {
    return {
      showLoading: !1,
      closePay: !1,
      showPay: !1,
      carInfo: {},
      ModeArr: [],
      wmAddress: "",
      params: {
        storeId: "",
        userAddId: "",
        deliveryMode: "2",
        serviceAt: "",
        appointment: "",
        serviceTime: "",
        userTel: "",
        couponId: {
          store: "",
          platform: ""
        },
        userNote: "",
        isOut: "",
        changeId: "",
        changeGoodsId: ""
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
      hgInfo: {}
    }
  },
  onLoad: function () {
    var t = this;
    t.getSystem(),
      setNT("提交订单"),
      t.carInfo = uni.getStorageSync("carInfo"),
      t.params.storeId = t.carInfo.sjxx.shopData.id,
      t.params.userTel = t.user.userTel,
      t.getOrderset(),
      t.getOrderMuster(),
      t.getyhqArr();
    bus.$on("payorder", (function (e) {
      e.hasOwnProperty("hbInfo") && (1 == e.type ? (t.couponInfo.store = e.hbInfo || "", t.params
        .couponId.store = t.couponInfo.store ? t.couponInfo.store.id : "") : 2 == e.type && (t
          .couponInfo.platform = e.hbInfo || "", t.params.couponId.platform = t.couponInfo
            .platform ? t.couponInfo.platform.id : ""));
    }));
    setTimeout(function () {
      t.isOnLoad = !0
    });
  },
  onUnload: function () {
    bus.$off("payorder")
  },
  onShow: function () {
    this.isOnLoad
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      orderset: function (e) {
        return e.config.orderset
      }
    }),
    ...mapState(["latLng"]),
    xjMoney: function () {
      if (this.carInfo.carPrice) {
        var e = +(this.carInfo.getTotal.spzj - this.carInfo.mjInfo.mjMoney).toFixed(2),
          t = this.orderMuster.newReduction || 0,
          n = 0,
          o = 0;
        this.couponInfo.store && (this.orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) &&
          (1 == this.couponInfo.store.type ? n = +this.couponInfo.store.money || 0 : 2 == this.couponInfo.store
            .type && (n = +this.couponInfo.store.money), n < 0 && (n = 0)), this.couponInfo.platform && (this
              .orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) && (1 == this.couponInfo
                .platform.type ? o = +this.couponInfo.platform.money || 0 : 2 == this.couponInfo.platform.type && (
                  o = +this.couponInfo.platform.money), o < 0 && (o = 0));
        var r = +(this.wmAddress && this.wmAddress.deliveryMoney || 0),
          a = this.carInfo.getTotal.bzf,
          i = 0,
          s = 0,
          u = +(e - n - o - t).toFixed(2);
        return this.deliveryPreferential = 0, 1 == this.params.deliveryMode ? (r = 0, 1 == this.params.isOut &&
          (a = 0)) : this.wmAddress && (this.deliveryPreferential = this.wmAddress.discount), u <= 0 && (u =
            .01), i = +(u + r + a).toFixed(2), i <= 0 && (i = .01), this.yhqPreferential.store = n, this
              .yhqPreferential.platform = o, this.system.taxRatio > 0 && (s = +(i * (this.system.taxRatio / 100))
                .toFixed(2)), {
          total: i,
          psf: r,
          slje: s,
          bzf: a
        }
      }
    },
    jsInfo: function () {
      var e = this;
      if (this.carInfo.carPrice) {
        var t = this.carInfo.getTotal.total + (2 == this.params.deliveryMode && this.wmAddress ? Number(this
          .deliveryPreferential > 0 ? this.wmAddress.oldMoney : this.wmAddress.deliveryMoney) : 0) - this
            .xjMoney.total,
          n = this.xjMoney.total + this.xjMoney.slje,
          o = {},
          r = {};
        this.carInfo.sjxx.discount.give.moneyArr && this.carInfo.sjxx.discount.give.moneyArr.find((function (
          t) {
          return e.xjMoney.total >= t.fullMoney
        }));
        return this.xjMoney.total >= this.carInfo.sjxx.discount.grantCoupon.orderMoney && (r = {
          name: "满返门店代金券",
          title: this.carInfo.sjxx.discount.grantCoupon.name
        }), this.hgInfo.id && (n = +this.hgInfo.money + n), {
          yhzj: +t.toFixed(2),
          hjMoney: +n.toFixed(2),
          mzInfo: o,
          mfInfo: r
        }
      }
    },
    timearrow: function () {
      return this.yjTime.length
    },
    appointment: function () {
      return this.yjrV.timeTitle && -1 == this.yjrV.timeTitle.indexOf("现在下单")
    },
    ljsctext: function () {
      return 1 == this.params.deliveryMode ? this.yjrV.timeTitle ? "立即自取" : "" : this.yjrV.timeTitle ? "约"
        .concat(this.yjrV.timeTitle.substring(4, 9), "送达") : ""
    }
  },
  methods: {

    ...mapActions(["getConfig"]),
    ...mapMutations(["setScarList"]),
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
    getOrderset: function () {
      var t = this;
      t.carInfo.sjxx.moreSet, t.carInfo.sjxx.outSet, t.params.deliveryMode = 1 == t.carInfo
        .buyType ? 2 : 1, [].includes("1") || t.ztTypeArr.push({
          value: "1",
          name: "店内就餐",
          icon: "icondianneitubiao f36"
        }), [].includes("2") || t.ztTypeArr.push({
          value: "2",
          name: "打包带走",
          icon: "icondabao f42"
        }), t.ztTypeArr[0] && (t.params.isOut = t.ztTypeArr[0].value), t.getConfig({
          key: "orderset",
          api: "order_order__set"
        }).then((function () {
          uni.setStorageSync("fwb", t.orderset.selfAgreement)
        }))
    },
    tzxqyhq: function (t) {
      1 == t ? (uni.setStorageSync("kyhb", this.kyhb.dpyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=1&name=门店代金券&couponId=" + this.params.couponId.store
      })) : 2 == t && (uni.setStorageSync("kyhb", this.kyhb.ptyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=2&name=" + this.system.custom.systemRedbag + "&couponId=" + this
          .params.couponId.platform
      }))
    },
    getyhqArr: function () {
      var t = this;
      t.kyhb = {};
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 3,
        storeType: 1
      }).then(res => {
        t.kyhb.dpyhq = {
          n: res.length,
          data: res
        };
      })
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 3,
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
      })
    },
    itemTotal: function (e, t) {
      return (e * t).toFixed(2)
    },
    xzhg: function (e) {
      this.hgInfo = e.id == this.hgInfo.id ? {} : e
    },
    ljzf: function () {
      var t = this;
      var r, a;
      console.log('ljzf');
      t.requestSM("fastOrder").then(res => {
        t.hgInfo.id && (t.params.changeId = t.orderMuster.changePay.id, t.params
          .changeGoodsId = t.hgInfo.id);
        t.params.ct = 1;
        this.$api['in-store_save__fast__order'](t.params).then(res => {
          a = getPage(),
            a.$vm.refreshInfo(),
            t.go({
              t: 2,
              url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
                orderId: res.data,
                orderType: 6,
                info: {
                  money: t.jsInfo.hjMoney,
                  storeName: t.carInfo.sjxx.shopData.name,
                  type: "快餐下单支付",
                  go: {
                    t: 6,
                    url: "/yb_wm/index/order-index"
                  }
                }
              }))
            }), uni.setStorageSync("note", t.params.userNote);
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
  padding: 0 0rpx;
}

.bs20 {
  border-radius: 0;
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