<template>
  <view class="p03 " v-if="info.id">
    <mg-cell bgc="transparent" class="" cname="p30" last="1" vueId="07524126-1" :vueSlots="['bd']">
      <view class="f-x-bt " slot="bd">
        <view class="f36 f-y-c ">
          <text class="t-o-e wei ">{{orderState.str1}}</text>
        </view>
        <view @tap="showhb" class="hbimg mr20 " v-if="hbId!=0">
          <mg-img class="" src="/static/gfhb/fhb.png" :vueId="'07524126-2'+','+'07524126-1'"></mg-img>
        </view>
      </view>
    </mg-cell>
    <view class="mb30 bs20 bf " v-if="info.state==4&&info.deliveryInfo&&info.deliveryInfo.riderName">
      <view class="p20 " v-if="info.deliveryInfo">
        <mg-cell btt="配送状态" class="" cname="p13" :ft="info.deliveryInfo.stateMsg" ftc="c3" last="1" vueId="07524126-3">
        </mg-cell>
        <mg-cell btt="配送骑手" class="" cname="p13" ftc="c6" last="1" vueId="07524126-4" :vueSlots="['ft']" v-if="info.deliveryInfo.riderName">
          <view @tap="makeTel(info.deliveryInfo.riderTel)" class="f-y-c " slot="ft">
            <text class="iconfont icondh1 c0 mr10 " :style="'color:'+tColor+';'"></text>
            <text class="f24 b-r-d " :style="'padding-right:20rpx;'+'color:'+tColor+';'">联系骑手</text>
            <text class="ml20 ">{{info.deliveryInfo.riderName||'张三'}}</text>
          </view>
        </mg-cell>
      </view>
    </view>
    <mg-cell brs="50%" class="" cname="mb30 bs20" h="60" img="/static/lb.png" vueId="07524126-5" :vueSlots="['bd']" w="60" v-if="info.state==1&&stime">
      <view class="f26 " slot="bd">
        <view class="">{{'超过'+orderset.closeTime+'分钟未支付，订单将自动取消哦！'}}</view>
        <view class="mt10 ">剩余:<text class="ml20 " :style="'color:'+tColor+';'">{{stime[2]+':'+stime[3]}}</text>
        </view>
      </view>
    </mg-cell>
    <mg-cell brs="50%" class="" cname="mb30 bs20" h="60" img="/static/lb.png" vueId="07524126-6" :vueSlots="['bd']" w="60" v-if="info.state==3&&info.deliveryMode!=10">
      <view class="f26 " slot="bd">
        <view class="" v-if="info.appointment==1">预计<text class="m01 " :style="'color:'+tColor+';'">{{info.serviceAt}}</text>送达</view>
        <view class="" :style="'color:'+tColor+';'" v-else>{{info.serviceAt}}</view>
      </view>
    </mg-cell>
    <mg-cell brs="50%" class="" cname="mb30 bs20" h="60" img="/static/lb.png" vueId="07524126-7" :vueSlots="['bd']" w="60" v-if="info.state==4&&info.deliveryMode==10">
      <view class="f26 " slot="bd">
        <view class="">自取时间<text class="m01 " :style="'color:'+tColor+';'">{{info.serviceAt}}</text>
        </view>
      </view>
    </mg-cell>
    <view class="bf mb30 bs20 ">
      <view class="p3 ">
        <view class="" v-if="orderState.str2">
          <view class="f32 ">{{orderState.str2}}</view>
          <view class="mt30 " v-if="(info.state==3||info.state==4)&&info.deliveryMode==10">
            <view class="f-c ">
              <view :class="['zqmc f-c ',i<zqmArr.length-1?'mr30':'']" v-for="(v, i) in zqmArr" :key="i">{{v}}</view>
            </view>
            <view class="zqmimg ">
              <mg-img class="" :src="qcmsrc" vueId="07524126-8"></mg-img>
            </view>
            <view class="c6 f26 t-c ">{{orderset.tips}}</view>
          </view>
          <block v-else>
            <view class="f24 mt10 " :style="'color:'+tColor+';'" v-if="orderState.str3">{{orderState.str3}}</view>
          </block>
        </view>
      </view>
      <mg-cell bgc="#FAFBFC" @tab="makeTel(info.storeTel)" class="" cname="b-t-e" last="1" vueId="07524126-9" :vueSlots="['bd']">
        <view class="" slot="bd">
          <view class="f30 f-c ">
            <text class="iconfont f42 icondh c0 mr20 "></text>
            <text class="t-o-e ">联系商家</text>
          </view>
        </view>
      </mg-cell>
    </view>
    <view class="mb30 bs20 ">
      <mg-cell class="" isr="1" vueId="07524126-10" :vueSlots="['bd']">
        <view @tap.stop="go({t:3,url:'/yb_o2o/shop/goods?storeId='+info.storeId})" slot="bd">
          <view class="f30 f-y-c ">
            <text class="t-o-e ">{{info.storeName}}</text>
          </view>
        </view>
      </mg-cell>
      <mg-cell brs="5rpx" class="" :cname="i!=info.goodsArr.length-1?'la154':''" h="104" :img="v.icon" isr="1" last="1" :vueId="'07524126-11-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in info.goodsArr" :key="i">
        <view class="" slot="bd">
          <view class="p-a hgc f18 cf bf5f l-n " v-if="v.isChange==1">换购</view>
          <view class="f-bt ">
            <view class="t-o-e ">{{v.name}}</view>
            <view class="f-g-0 f32 ">{{sl+itemTotal(v)}}</view>
          </view>
          <view class="f-bt mt10 f24 c9 ">
            <view class="f-g-1 f-raw ">
              <text class="ml10 " v-if="v.data">{{v.data}}</text>
              <text class="" v-if="v.attribute">{{'('+v.attribute+')'}}</text>
              <text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
            </view>
            <view class="ml10 ">{{'x'+v.num}}</view>
          </view>
        </view>
      </mg-cell>
      <mg-cell bdmw="120rpx" btt="满赠" class="" :ft="''+info.giveName" ftc="c3" isr="1" vueId="07524126-12" v-if="info.giveName"></mg-cell>
      <mg-cell bdmw="120rpx" btt="满返" class="" :ft="''+info.grantCouponName" ftc="c3" isr="1" vueId="07524126-13" v-if="info.grantCouponName"></mg-cell>
      <mg-cell btt="店铺满减优惠" class="" :color="tColor" :ft="'-'+sl+info.preferentialMoney" ftc="f32" isr="1" vueId="07524126-14" v-if="info.preferentialMoney>0"></mg-cell>
      <mg-cell class="" :color="tColor" :ft="'-'+sl+info.newMoney" ftc="f32" isl="1" last="1" vueId="07524126-15" :vueSlots="['bd']" v-if="info.newMoney>0">
        <view class="f-y-c " slot="bd">
          <view class="">新客立减</view>
          <view class="yhic f18 cf b00 f-c ">新</view>
        </view>
      </mg-cell>
      <mg-cell btt="商家优惠券抵扣" class="" :color="tColor" :ft="'-'+sl+info.couponPreferential" ftc="f32" isr="1" vueId="07524126-16" v-if="info.couponPreferential>0"></mg-cell>
      <mg-cell btt="平台优惠券抵扣" class="" :color="tColor" :ft="'-'+sl+info.platformCouponPreferential" ftc="f32" isr="1" vueId="07524126-17" v-if="info.platformCouponPreferential>0"></mg-cell>
      <mg-cell btt="包装费" class="" :ft="''+sl+info.boxMoney" ftc="f32 c3" isr="1" last="1" vueId="07524126-18"></mg-cell>
      <mg-cell :btt="info.deliveryPreferential>0?info.deliveryPreferentialType==1?'满免配送费':'满免配送费':''" class="" ftc="f32 c3" isr="1" vueId="07524126-19" :vueSlots="['hd','ft']" v-if="info.deliveryMode!=10">
        <view class="mr20 " slot="hd">配送费</view>
        <view class="" slot="ft">
          <text class="mr30 t-d-l f24 c9 " v-if="info.deliveryPreferential>0">{{sl+info.deliveryPreferential}}</text>
          <text class="">{{sl+info.deliveryMoney}}</text>
        </view>
      </mg-cell>
      <mg-cell class="" isl="1" vueId="07524126-20" :vueSlots="['bd','ft']" v-if="info.taxRatio>0">
        <view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+info.taxRatio+'%)'}}</text>
        </view>
        <view class="f32 c3 " slot="ft">{{'+'+sl+info.tax}}</view>
      </mg-cell>
      <mg-cell class="" isr="1" last="1" vueId="07524126-21" :vueSlots="['bd','ft']">
        <view class="c9 f24 f-row " slot="bd">
          <view class="f-g-0 f-y-c ">优惠规则<text class="iconfont iconwen f26 c9 ml10 "></text>
          </view>
        </view>
        <view class="ml10 c3 " slot="ft">
          <text class="f24 ">{{'共'+info.num+'件商品'}}</text>
          <text class="m02 ">小计</text>
          <text class="f34 ">{{sl+info.money}}</text>
        </view>
      </mg-cell>
    </view>
    <view class="mb30 bf bs20 " v-if="info.deliveryMode!=10">
      <mg-cell btt="配送信息" bttc="f30" class="" isr="1" vueId="07524126-22"></mg-cell>
      <view class="p20 ">
        <mg-cell btt="配送方式" bttc="c9" class="" cname="p13" :ft="info.deliveryName" ftc="c3" last="1" vueId="07524126-23">
        </mg-cell>
        <mg-cell btt="送达时间" bttc="c9" class="" cname="p13" :ft="timeToDate(info.serviceTime)" ftc="c3" last="1" vueId="07524126-24" v-if="info.appointment==1"></mg-cell>
        <mg-cell btt="送达时间" bttc="c9" class="" cname="p13" :ft="info.serviceAt" ftc="c3" last="1" vueId="07524126-25" v-else></mg-cell>
        <mg-cell btt="收货地址" bttc="c9" class="" cname="p13" ftc="c3" last="1" noc="1" vueId="07524126-26" :vueSlots="['ft']">
          <view class="f-c-e w500 " slot="ft">
            <view class="t-r ">{{info.receivedAddress}}</view>
            <view class="">{{info.receivedName+' ('+info.receivedTel+')'}}</view>
          </view>
        </mg-cell>
      </view>
    </view>
    <view class="mb30 bf bs20 " v-if="info.deliveryMode==10">
      <mg-cell btt="自取信息" bttc="f30" class="" isr="1" vueId="07524126-27"></mg-cell>
      <view class="p20 ">
        <mg-cell btt="自取时间" bttc="c9" class="" cname="p13" :ft="timeToDate(info.serviceTime)" ftc="c3" last="1" vueId="07524126-28" v-if="info.appointment==1"></mg-cell>
        <mg-cell btt="自取时间" bttc="c9" class="" cname="p13" :ft="info.serviceAt" ftc="c3" last="1" vueId="07524126-29" v-else></mg-cell>
        <mg-cell btt="自取类型" bttc="c9" class="" cname="p13" :ft="info.isOut==1?'店内就餐':'打包带走'" ftc="c3" last="1" vueId="07524126-30" v-if="info.isOut"></mg-cell>
        <mg-cell btt="取货码" bttc="c9" class="" cname="p13" :ft="info.selfCode" ftc="c3" last="1" vueId="07524126-31" v-if="info.state>2&&info.state<7&&info.selfCode"></mg-cell>
        <mg-cell btt="商家地址" bttc="c9" class="" cname="p13" ftc="c3" last="1" noc="1" vueId="07524126-32" :vueSlots="['ft']">
          <view class="f-c-e w500 " slot="ft">
            <view class="t-r ">{{info.address}}</view>
            <view @tap="makeTel(info.storeTel)">
              {{info.storeName+' ('+info.storeTel+')'}}</view>
          </view>
        </mg-cell>
        <mg-cell btt="预留电话" bttc="c9" class="" cname="p13" :ft="info.receivedTel" ftc="c3" last="1" vueId="07524126-33">
        </mg-cell>
      </view>
    </view>
    <view class="mb30 bf bs20 ">
      <mg-cell btt="订单信息" bttc="f30" class="" isr="1" vueId="07524126-34"></mg-cell>
      <view class="p20 ">
        <mg-cell btt="订单号码" bttc="c9" class="" cname="p13" last="1" vueId="07524126-35" :vueSlots="['ft']">
          <view class="f-y-c " slot="ft">
            <text class="c3 ">{{info.outTradeNo}}</text>
            <bk-b @tab="fz(info.outTradeNo)" cName="f24 ml20" class="" t="复制" type="2" :vueId="'07524126-36'+','+'07524126-35'"></bk-b>
          </view>
        </mg-cell>
        <mg-cell btt="下单时间" bttc="c9" class="" cname="p13" :ft="timeToDate(info.createdAt)" ftc="c3" last="1" vueId="07524126-37"></mg-cell>
        <mg-cell btt="支付方式" bttc="c9" class="" cname="p13" :ft="payName(info.payMode)" ftc="c3" last="1" vueId="07524126-38" v-if="info.payMode"></mg-cell>
        <mg-cell bdmw="130rpx" btt="订单备注" bttc="c9" class="" cname="p13" :ft="info.userNote" ftc="c3" last="1" noc="1" vueId="07524126-39" v-if="info.userNote"></mg-cell>
      </view>
    </view>
    <mg-popup v-model="showRed" position="middle" vueId="07524126-40" :vueSlots="['default']">
      <view class="bf t-c bs15 " style="width:540rpx;">
        <view class="f-c f-1 ">
          <view class="qhbimg pt30 ">
            <mg-img class="" src="/static/gfhb/qhb.png" :vueId="'07524126-41'+','+'07524126-40'"></mg-img>
          </view>
        </view>
        <view class="m30 ">
          <view class="c0 wei f30 _p ">【送您一个拼手气红包】</view>
          <view class="c6 f26 mt10 _p ">快分享给小伙伴看看谁会撞大运</view>
        </view>
        <view class="f-row hlt f-x-bt " style="height:100rpx;">
          <button @tap="showRed = !1" class="bs0 p0 f-1 bf f30 h100 f-c c9 " hoverClass="be">取消</button>
          <sq-btn @refresh="fhb" class="" cname="f-1 bf f30 h100 f-c hll" h="100" t="发红包" type="3" :vueId="'07524126-42'+','+'07524126-40'" w="270"></sq-btn>
        </view>
      </view>
    </mg-popup>
  </view>
</template>

<script>
import bkB from 'components/common/block-b.vue'
import MgCell from 'components/common/mg-cell.vue'
import mgPopup from 'components/common/popup.vue'
import sqBtn from 'components/common/sq-btn.vue'
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  ckWz,
  countDownTime,
  fz,
  makeTel,
  mpShare,
  setNT
} from 'common/util'
import {
  utilMixins
} from 'common/utilMixins'

export default {
  name: "order-dl",
  components: {
    bkB,
    MgCell,
    mgPopup,
    sqBtn,
  },
  data: function () {
    return {
      fz,
      makeTel,
      info: {},
      stime: "",
      latitude: "",
      longitude: "",
      covers: [],
      line: [],
      showRed: !1,
      hbId: "",
      qcmsrc: ""
    }
  },
  onLoad: function (e) {
    this.getSystem(),
      setNT("订单详情"),
      this.orderId = e.id,
      this.getInfo()
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      orderset: function (e) {
        return e.config.orderset
      }
    }),
    orderState: function () {
      var e = "",
        t = "",
        n = "";
      switch (+this.info.state) {
        case 1:
          e = "等待支付", t = "请尽快支付";
          break;
        case 2:
          e = "等待商家接单", t = "请耐心等待商家接单";
          break;
        case 3:
          e = "商家已接单", t = 10 != this.info.deliveryMode ? "商家已接单准备中请耐心等待" : "请尽快到店自取";
          break;
        case 4:
          10 != this.info.deliveryMode ? (e = "订单状态", t = "配送平台", n = "".concat(this.info.deliveryName)) : (e =
            "待取货", t = "请您尽快到店取货", n = "取货码:".concat(this.info.selfCode));
          break;
        case 5:
        case 6:
          e = "订单已完成", t = "感谢您对我们的信任，期待再次光临";
          break;
        case 7:
          e = "订单已取消", t = "感谢您对我们的信任，期待再次光临", n = "取消原因：订单超时或未支付";
          break;
        case 8:
          e = "商家拒单", t = "非常抱歉！感谢您对我们的信任，期待再次光临", n = this.info.refuseReason && "拒单原因：" + this.info.refuseReason;
          break;
        case 9:
          e = "申请退款中", t = "请耐心等待商家处理", n = this.info.cancelReason && "取消原因：" + this.info.cancelReason;
          break;
        case 10:
          e = "订单已退款", t = "感谢您对我们的信任，期待再次光临";
          break;
        case 11:
          e = "订单退款拒绝", t = "感谢您对我们的信任，如有疑问请联系商家", n = this.info.refuseReason && "拒绝原因：" + this.info.refuseReason;
          break
      }
      return {
        str1: e,
        str2: t,
        str3: n
      }
    },
    zqmArr: function () {
      return console.log(this.info.selfCode && this.info.selfCode.split("")), this.info.selfCode && this.info
        .selfCode.split("")
    },
    sl: function () {
      return this.info.symbol || this.system.symbol || "￥"
    },
    dsfps: function () {
      return 1 != this.info.deliveryMode && 10 != this.info.deliveryMode
    }
  },
  methods: {
    getInfo: function () {
      var e = this;
      this.$api.order_order__info({
        orderId: e.orderId
      }).then(res => {
        console.log('res: ', res);
        e.info = res.data,
          1 == res.data.state && e.djs(res.data.createdAt),
          3 != res.data.state && 4 != res.data.state || 10 != res.data.deliveryMode || e.getqcm()
      })
    },
    getqcm: function () {
      var e = this;
      this.$api.order_meal__code({
        id: e.orderId
      }).then(res => {
        e.qcmsrc = res;
      })
    },
    itemTotal: function (e) {
      var t = +(e.vipMoney > 0 && +e.vipMoney < +e.money && e.vipMoney || e.money);
      return +(t * e.num).toFixed(2)
    },
    djs: function (e) {
      var t = this;
      if (1 == this.info.state && 1 == this.orderset.autoClose) {
        var n = this.dateToTime(),
          o = +e + 60 * this.orderset.closeTime;
        o > n && (this.stime = countDownTime(o - n), this.dsq = setInterval(() => {
          o -= 1, o == n && (clearInterval(t.dsq), t.go({
            t: 4
          })), t.stime = countDownTime(o - n);
        }), 1e3)
      }
    },
    psxq: function () { },
    ckwz: function () {
      ckWz({
        lat: this.info.storeLat,
        lng: this.info.storeLng,
        name: this.info.storeName,
        address: this.info.storeAddress
      })
    },
    getisPop: function () {
      var e = this;
      // return c(r.default.mark((function t() {
      // 	var n, o;
      // 	return r.default.wrap((function(t) {
      // 		while (1) switch (t.prev = t.next) {
      // 			case 0:
      // 				return t.next = 2, e.util.request({
      // 					url: e.api.bonusPackage_isPop,
      // 					data: {
      // 						orderId: e.orderId
      // 					}
      // 				});
      // 			case 2:
      // 				return n = t.sent, o = n.data, e.hbId = o, t.next = 7, e.getConfig();
      // 			case 7:
      // 			case "end":
      // 				return t.stop()
      // 		}
      // 	}), t)
      // })))()
    },
    getConfig: function () {
      var e = this;
      this.$api.config_config({
        ident: "divideset"
      }).then(res => {
        e.config = res;
      })
    },
    showhb: function () {
      this.showRed = !0
    },
    fhb: function () {
      this.showRed = !1
    }
  },
  onUnload: function () {
    this.dsq && clearInterval(this.dsq)
  },
  onShareAppMessage: function () {
    var e = "yb_o2o/order/gfhb?id=".concat(this.hbId, "&userId=").concat(this.uId);
    return mpShare({
      t: this.config.redName,
      i: this.getImgS(this.config.icon),
      p: e
    })
  }
}
</script>
<style scoped>
.obtn {
  margin: 0 25rpx 0 0;
}

.map {
  width: 690rpx;
  height: 400rpx;
}

.zqmc {
  width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
  border: 1px dashed #ddd;
}

.zqmimg {
  width: 380rpx;
  height: 380rpx;
  margin: 20rpx auto;
}

.qhbimg {
  width: 314rpx;
  height: 266rpx;
}

.hbimg {
  width: 50rpx;
  height: 60rpx;
}

.hgc {
  top: 30rpx;
  left: 30rpx;
  padding: 3rpx 12rpx;
  border-radius: 0 0 15rpx 0;
}
</style>