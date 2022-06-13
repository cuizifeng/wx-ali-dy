<template>
  <view>
    <view class="pb130 " v-if="info.id">
      <view class="posi-s w100 t0 f-y-c tgg cfc " v-if="info.eatType==1">
        <text class="iconfont iconsgg mr30 cfc "></text>
        <view class="f-1 f22 ">订单成功支付后，大厨就开始制作啦！</view>
        <view class="f-c ml20 ">
          <text @tap="tzdd" class="iconfont icondd f48 c3 "></text>
        </view>
      </view>
      <view class="f-c-e p330 " v-else>
        <text @tap="tzdd" class="iconfont icondd f48 c3 "></text>
      </view>
      <view class="f-c-c oltop ">
        <view class="f36 wei ">{{orderState.str1}}</view>
        <view class="mt15 " v-if="orderState.str2">
          <view class="f-y-c ">
            <text class="iconfont iconsgg c0 f34 mr10 "></text>{{orderState.str2}}
          </view>
          <view class="f24 mt10 " :style="'color:'+tColor+';'" v-if="orderState.str3">{{orderState.str3}}</view>
        </view>
      </view>
      <view class="p03 olbd ">
        <mg-cell brs="50%" cname="mb30 bs20" h="60" img="/static/lb.png" vueId="76882586-1" :vueSlots="['bd']" w="60" v-if="info.state==1&&info.eatType==1">
          <view class="f26 " slot="bd">
            <view>{{'超过'+orderset.instore.closeTime+'分钟未支付，订单将自动取消哦！'}}</view>
            <view class="mt10 " v-if="stime">剩余:<text class="ml20 " :style="'color:'+tColor+';'">{{stime[2]+':'+stime[3]}}</text>
            </view>
          </view>
        </mg-cell>
        <view class="mb30 bs20 ">
          <mg-cell isr="1" vueId="76882586-2" :vueSlots="['bd']">
            <view slot="bd">
              <view class="f30 f-y-c ">
                <text class="t-o-e wei ">{{'已点商品('+info.goodsNum+')'}}</text>
              </view>
            </view>
          </mg-cell>
          <mg-cell brs="5rpx" :cname="i!=info.goodsArr.length-1?'la154':''" h="104" :img="v.icon" isr="1" :vueId="'76882586-3-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in info.goodsArr" :key="i">
            <view slot="bd">
              <view class="f-bt ">
                <view class="t-o-e ">{{v.name}}</view>
                <view class="f-g-0 f32 ">{{osl+itemTotal(v)}}</view>
              </view>
              <view class="f-bt mt10 f24 c9 ">
                <view class="f-g-1 ">
                  <text v-if="v.data">{{v.data}}</text>
                  <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                  <text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
                </view>
                <view class="ml20 ">{{'x'+v.num}}</view>
              </view>
            </view>
          </mg-cell>
        </view>
        <view class="mb30 bs20 " v-for="(pv, pi) in info.addGoods" :key="pi">
          <view class="p-r pt30 bf ">
            <mg-cell brs="5rpx" :cname="i!=pv.length-1?'la154':''" h="104" :img="v.icon" isr="1" :vueId="'76882586-4-'+pi+'-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in pv" :key="i">
              <view slot="bd">
                <view class="f-bt ">
                  <view class="t-o-e ">{{v.name}}</view>
                  <view class="f-g-0 f32 ">{{osl+itemTotal(v)}}</view>
                </view>
                <view class="f-bt mt10 f24 c9 ">
                  <view class="f-g-1 ">
                    <text v-if="v.data">{{v.data}}</text>
                    <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                    <text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
                  </view>
                  <view class="ml20 ">{{'x'+v.num}}</view>
                </view>
              </view>
            </mg-cell>
            <view class="p-a sjx cf ">加</view>
          </view>
        </view>
        <view class="mb30 bs20 bf ">
          <mg-cell btt="桌位费" :ft="''+osl+info.tablewareMoney" ftc="f32 c3" isr="1" vueId="76882586-5"></mg-cell>
          <mg-cell btt="店铺满减优惠" :color="tColor" :ft="'-'+sl+info.preferentialMoney" ftc="f32" isr="1" vueId="76882586-6" v-if="info.preferentialMoney>0"></mg-cell>
          <mg-cell btt="门店新客立减" :color="tColor" :ft="'-'+osl+info.newMoney" ftc="f32" isl="1" vueId="76882586-7" :vueSlots="['hd']" v-if="info.newMoney>0">
            <view class="itemcon poxk mr20 " slot="hd">新客</view>
          </mg-cell>
          <mg-cell btt="商家优惠券抵扣" :color="tColor" :ft="'-'+sl+info.couponPreferential" ftc="f32" isr="1" vueId="76882586-8" v-if="info.couponPreferential>0"></mg-cell>
          <mg-cell btt="平台优惠券抵扣" :color="tColor" :ft="'-'+sl+info.platformCouponPreferential" ftc="f32" isr="1" vueId="76882586-9" v-if="info.platformCouponPreferential>0"></mg-cell>
          <mg-cell isl="1" vueId="76882586-10" :vueSlots="['bd','ft']" v-if="info.taxRatio>0">
            <view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+info.taxRatio+'%)'}}</text>
            </view>
            <view class="f32 c3 " slot="ft">{{'+'+osl+info.tax}}</view>
          </mg-cell>
          <mg-cell isr="1" last="1" vueId="76882586-11" :vueSlots="['bd','ft']">
            <view class="c9 f24 f-row " slot="bd">
              <view class="f-g-0 f-y-c ">优惠规则<text class="iconfont iconwen f26 c9 ml10 "></text>
              </view>
            </view>
            <view class="ml10 c3 " slot="ft">
              <text class="f24 ">{{'共'+info.goodsNum+'件商品'}}</text>
              <text class="m02 ">小计</text>
              <text class="f34 ">{{osl+info.money}}</text>
            </view>
          </mg-cell>
        </view>
        <view class="mb30 bs20 bf " v-if="info.deliveryMode==1">
          <mg-cell btt="自取信息" bttc="f30 wei" isr="1" vueId="76882586-12"></mg-cell>
          <view class="p20 ">
            <mg-cell btt="自取时间" bttc="c9" cname="p13" :ft="timeToDate(info.serviceTime)" ftc="c3" last="1" vueId="76882586-13" v-if="info.appointment==1"></mg-cell>
            <mg-cell btt="自取时间" bttc="c9" cname="p13" :ft="info.serviceAt" ftc="c3" last="1" vueId="76882586-14" v-else>
            </mg-cell>
            <mg-cell btt="取货码" bttc="c9" cname="p13" :ft="info.selfCode" ftc="c3" last="1" vueId="76882586-15">
            </mg-cell>
            <mg-cell btt="商家地址" bttc="c9" cname="p13" ftc="c3" last="1" noc="1" vueId="76882586-16" :vueSlots="['ft']">
              <view class="f-c-e w500 " slot="ft">
                <view @tap="ckwz" class="t-r ">{{info.storeAddress}}
                </view>
                <view @tap="makeTel(info.storeTel)">
                  {{info.storeName+' ('+info.storeTel+')'}}</view>
              </view>
            </mg-cell>
            <mg-cell btt="预留电话" bttc="c9" cname="p13" :ft="info.receivedTel" ftc="c3" last="1" vueId="76882586-17">
            </mg-cell>
          </view>
        </view>
        <view class="mb30 bs20 bf ">
          <view class="p20 ">
            <mg-cell arrow="1" @tab="go({t:6,url:'/pages/tabbar/index/index?storeId='+info.storeId})" btt="商家信息" cname="p13" :ft="info.storeName" ftc="c3" hc="1" last="1" vueId="76882586-18"></mg-cell>
            <mg-cell btt="桌号" cname="p13" :ft="info.typeName+info.number" ftc="c3" last="1" vueId="76882586-19">
            </mg-cell>
            <mg-cell btt="人数" cname="p13" :ft="info.people+'位'" ftc="c3" last="1" vueId="76882586-20"></mg-cell>
            <mg-cell btt="结算模式" cname="p13" :ft="info.eatType==1?'餐前支付':'餐后支付'" ftc="c3" last="1" vueId="76882586-21">
            </mg-cell>
          </view>
        </view>
        <view class="mb30 bs20 bf ">
          <view class="p20 ">
            <mg-cell bttc btt="订单信息" cname="p13" last="1" vueId="76882586-22"></mg-cell>
            <mg-cell btt="订单号码" bttc="c9" cname="p13" last="1" vueId="76882586-23" :vueSlots="['ft']">
              <view class="f-y-c " slot="ft">
                <text>{{info.outTradeNo}}</text>
                <bk-b @tab="fz(info.outTradeNo)" cName="f24 ml20" color="#fd5b00" t="复制" type="2" :vueId="'76882586-24'+','+'76882586-23'"></bk-b>
              </view>
            </mg-cell>
            <mg-cell btt="下单时间" bttc="c9" cname="p13" :ft="timeToDate(info.createdAt)" last="1" vueId="76882586-25"></mg-cell>
            <mg-cell btt="支付方式" bttc="c9" cname="p13" :ft="payName(info.payMode)" last="1" vueId="76882586-26" v-if="info.payMode&&info.state>=3"></mg-cell>
            <mg-cell bdmw="130rpx" btt="订单备注" bttc="c9" cname="p13" :ft="info.userNote" last="1" noc="1" vueId="76882586-27" v-if="info.userNote"></mg-cell>
          </view>
        </view>
      </view>
    </view>
    <view class="foot-btnc f-row " :style="'bottom:'+'20rpx'+';'" v-if="info.state<3">
      <button @tap="qxdd({tip:1})" class="f-1 foot-btn b-l-qx mr30 " hoverClass="btnhc" v-if="info.eatType==1">取消订单</button>
      <button @tap="ljzf" class="f-1 foot-btn b-l-f0f0 " :disabled="loading" hoverClass="btnhc" :loading="loading" v-if="info.eatType==1">立即支付</button>
      <button @tap="jxtj" class="f-1 foot-btn b-l-fdf3 mr30 " hoverClass="btnhc" v-if="info.state==2&sjxx.orderMode==1&&info.eatType==2">继续加菜</button>
    </view>
  </view>
</template>


<script>
import bkB from 'components/common/block-b.vue';
import MgCell from 'components/common/mg-cell.vue';
import {
  makeTel,
  fz,
  setNT,
  countDownTime,
  modal,
  ckWz
} from 'common/util';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
export default {
  name: "order-dl",
  components: {
    bkB,
    MgCell,
  },
  data: function () {
    return {
      info: {},
      stime: "",
      makeTel,
      fz,
      latitude: "",
      longitude: "",
      covers: [],
      line: [],
      sjxx: {},
      loading: !1
    }
  },
  onLoad: function (e) {
    var t = this;
    setNT("订单详情"),
      t.orderId = e.id,
      t.getConfig({
        key: "orderset",
        api: "order_order__set"
      }).then(res => {
        t.getInfo();
      })
  },
  onShow: function () {
    this.getInfo();
  },
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
          e = 1 == this.info.eatType ? "待支付" : "等待商家接单", t = 1 == this.info.eatType ? "请尽快支付" : "";
          break;
        case 2:
          e = "已接单", t = "请耐心等待商家备餐";
          break;
        case 3:
          e = "已支付", t = "请耐心等待商家备餐";
          break;
        case 4:
          e = "已关闭", t = "订单已关闭";
          break;
        case 5:
          e = "已退款", t = "订单已退款";
          break
      }
      return {
        str1: e,
        str2: t,
        str3: n
      }
    },
    zqmArr: function () {
      return this.info.selfCode && this.info.selfCode.split("")
    },
    osl: function () {
      return this.info.symbol || this.sl
    }
  },
  mixins: [utilMixins],
  methods: {

    ...mapActions(["getConfig"]),
    jxtj: function () {
      this.go({
        t: 3,
        url: "/yb_wm/shop/in/goods?tableId=" + this.info.tableId
      })
    },
    ljzf: function () {
      var e = this;
      var n;
      n = 1 == e.sjxx.orderMode && 2 == e.info.eatType ? {
        data: 1
      } : {
        data: 2
      };

      if (1 == n.data) {
        e.getInfo();
      } else {
        e.go({
          t: 1,
          url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
            orderId: e.orderId,
            orderType: 7,
            info: {
              money: e.info.money,
              type: "堂内订单支付",
              cancel: 1,
              go: {
                t: 3,
                url: "/yb_wm/shop/in/indd"
              }
            }
          }))
        })
      }
    },
    getInfo: function () {
      var e = this;
      this.$api['in-store_in__store__order__info']({
        id: e.orderId
      }).then(res => {
        console.log('res: 309', res);
        e.info = res,
          1 == res.state && 1 == res.eatType && e.djs(res.createdAt),
          e.sjxx = res.storeSet;
      })
    },
    itemTotal: function (e) {
      var t = +(e.vipMoney > 0 && +e.vipMoney < +e.money && e.vipMoney || e.money);
      return +(t * e.num).toFixed(2)
    },
    getJldata: function (e) {
      if (e) {
        var t = "";
        return e.forEach((function (e) {
          t += e.name + ","
        })), t.substr(0, t.length - 1)
      }
    },
    djs: function (e) {
      var t = this;
      if (1 == this.info.state &&
        this.orderset.instore &&
        1 == this.orderset.instore.autoClose) {
        var n = this.dateToTime(),
          o = +e + 60 * this.orderset.instore.closeTime + 2;
        o > n && (this.stime = countDownTime(o - n), this.dsq = setInterval(() => {
          o -= 1, o == n && (clearInterval(t.dsq), t.qxdd()), t.stime = countDownTime(o -
            n);
        }), 1e3);
      }
    },
    qxdd: function (e) {
      var t = this;
      modal("您确认取消订单吗？").then(res => {
        this.$api['in-store_close__in__order']().then(res => {
          t.go({
            t: 3,
            url: "/yb_wm/shop/in/indd"
          });
        })
      })
    },
    ckwz: function () {
      ckWz({
        lat: this.info.storeLat,
        lng: this.info.storeLng,
        name: this.info.storeName,
        address: this.info.storeAddress
      })
    },
    tzdd: function () {
      this.go({
        t: getCurrentPages().length > 1 ? 4 : 1,
        url: "/yb_wm/shop/in/indd"
      })
    }
  },
  onUnload: function () {
    this.dsq && clearInterval(this.dsq)
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

.oltop {
  padding: 60rpx 30rpx;
}

.tgg {
  padding: 10rpx 30rpx;
  height: 70rpx;
  background: #fff3ea;
}

.cfc {
  color: #ff7c1c;
}

.sjx {
  top: 0;
  left: 0rpx;
  padding: 0 40rpx;
  height: 35rpx;
  font-size: 20rpx;
  line-height: 35rpx;
  border-radius: 0 0 20rpx 0;
  background: linear-gradient(#f75214, #f87d22);
}
</style>