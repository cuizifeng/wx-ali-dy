<template>
  <view @tap="go({t:1,url:'/yb_wm/order/order-dl?id='+co.id})" class="bf bs20 mb20 p-r ">
    <block v-if="co.deliveryMode==10||co.appointment==1">
      <view :class="['posi-a molta cf ',co.appointment==1?'yd':'']"></view>
      <view class="posi-a moltat cf f22 t-c ">{{co.appointment==1?'预':'自'}}</view>
    </block>
    <mg-cell brs="8rpx" class="" cname="p23" h="84" :img="co.storeIcon" last="1" noc="1" vueId="dfc53ec4-1" :vueSlots="['bd']" w="84">
      <view class="" slot="bd">
        <view class="f-bt ">
          <view class="f-g-1 f30 f-y-c ">
            <text class="t-o-e f32 ">{{co.storeName+''}}
              <block v-if="orderset.oIdOpen==1">(<text class="" :style="'color:'+tColor+';'">{{'#'+(co.deliveryMode==10?co.mId:co.oId)}}</text>)</block>
            </text>
          </view>
          <view class="f-g-0 " :style="'color:'+stateColor()+';'">{{''+getState()+stime}}</view>
        </view>
        <view class="mt5 f-x-bt f22 c9 ">
          <text class="">{{'下单时间：'+timeToDate(co.createdAt)}}</text>
          <text class="" v-if="co.state==7">订单超时未支付</text>
        </view>
        <view class="f-row mt20 p-r ">
          <scroll-view class="f-1 ws-n f26 " scroll-x="true">
            <view class="dis-in mobdli mr20 " v-for="(v, i) in co.goodsArr" :key="i">
              <view class="img bs10 ">
                <mg-img class="" :src="v.icon" :vueId="'dfc53ec4-2-'+i+','+'dfc53ec4-1'"></mg-img>
              </view>
              <view class="mt10 f26 t-o-e ">{{v.name}}</view>
            </view>
            <view class="dis-in mobdli mr20 "></view>
          </scroll-view>
          <view :class="['p-a r0 t0 mobdrc f-c-xc t-r ',co.goodsArr.length>2?'zbyy':'']">
            <view class="f34 wbba l-n ">
              <text class="f24 ">{{co.symbol||sl}}</text>{{Number(co.money)}}
            </view>
            <view class="f26 c9 mt5 ">{{'共'+co.num+'件'}}</view>
          </view>
        </view>
      </view>
    </mg-cell>
    <view class="t-r p03 mb10 " v-if="co.takeNo">{{system.custom.orderNumber+'：#'+co.takeNo}}</view>
    <view class="t-r p03 " v-if="co.deliveryMode==10&&co.state==4">取货码：<text class="wei " :style="'color:'+tColor+';'">{{co.selfCode}}</text>
    </view>
    <view class="p23 f-y-c ">
      <view class="f-1 "></view>
      <view class="f-x-e ">
        <view @tap.stop="$emit('operation',{t:'qxdd',co:co,tip:1})" class="obtn " v-if="co.state==1">取消订单</view>
        <view @tap.stop="$emit('operation',{t:'ljzf',co:co})" class="obtn" :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="co.state==1">立即支付</view>
        <view @tap.stop="$emit('operation',{t:'sqtk',co:co})" class="obtn " v-if="co.isTk==1">
          {{co.state==2?'取消订单':'取消订单'}}</view>
        <view @tap.stop="$emit('operation',{t:'cd',co:co})" class="obtn cf " :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="(co.state==2||co.state==3||co.state==4)&&co.deliveryMode!=10">催单</view>
        <view @tap.stop="$emit('operation',{t:'lxsj',co:co})" class="obtn " v-if="co.state==3||co.state==7">联系商家</view>
        <view @tap.stop="$emit('operation',{t:'qrsh',co:co})" class="obtn  " v-if="co.state==4">确认收货</view>
        <view class="obtn cf " :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="co.state==9">退款中
        </view>
        <view class="obtn " v-if="co.state==10">已退款</view>
        <view class="obtn c9 " v-if="co.state==11">已拒绝</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  countDownTime
} from 'common/util';
import bkB from 'components/common/block-b.vue';
import {
  mapState
} from 'vuex';
import {
  utilMixins
} from 'common/utilMixins';
export default {
  name: "tabbar",
  components: {
    bkB
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      stateArr: ["", "等待支付", "已付款", "已接单", "配送中", "已完成", "已评价", "已取消", "拒单", "待商家处理", "退款已通过", "退款已拒绝"],
      ztstateArr: ["", "等待支付", "已付款", "已接单", "待取货", "已完成", "已评价", "已取消", "拒单", "待商家处理", "退款已通过", "退款已拒绝"],
      stime: ""
    };
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({

      orderset: function (t) {
        return t.config.orderset;
      }
    }),
  },
  methods: {
    onClick: function () {
      this.$emit("click");
    },
    getState: function () {
      return 10 != this.co.deliveryMode ? this.stateArr[+this.co.state] : this.ztstateArr[+this.co.state];
    },
    stateColor: function () {
      var t = "";

      switch (+this.co.state) {
        case 1:
          t = this.tColor;
          break;

        default:
          t = "#999";
      }

      return t;
    },
    djs: function (t) {
      var e = this;

      if (1 == this.co.state && 1 == this.orderset.autoClose) {
        var n = this.dateToTime(),
          r = +t + 60 * this.orderset.closeTime;

        if (r > n) {
          var o = countDownTime(r - n);
          this.stime = "，剩余 ".concat(o[2], ":").concat(o[3]), this.dsq = setInterval((function () {
            var o;
            (r -= 1) == n && (clearInterval(e.dsq), e.$emit("operation", {
              t: "qxdd",
              co: e.co
            })), o = countDownTime(r - n), e.stime = "，剩余 ".concat(o[2], ":").concat(o[3]);
          }), 1e3);
        }
      }
    }
  },
  created: function () {
    var t = this;
    this.$nextTick(() => {
      t.djs(t.co.createdAt);
    })
  },
  destroyed: function () {
    clearInterval(this.dsq);
  }
}
</script>
<style scoped>
.mobdli {
  width: 158rpx;
}

.mobdli .img {
  width: 100%;
  height: 120rpx;
}

.mobdrc {
  height: 100%;
  min-width: 118rpx;
  padding-bottom: 40rpx;
  padding-left: 10rpx;
  background: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0.85),
    hsla(0, 0%, 100%, 0.95),
    #fff
  );
}

.molta {
  top: -50rpx;
  left: -50rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(#96e666, #08c37d);
  transform: rotate(-45deg);
}

.moltat {
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  top: 0;
}

.yd {
  background: linear-gradient(#f57e55, #f05d2c);
}

.zbyy {
  box-shadow: -18rpx 0 18rpx -16rpx rgba(13, 13, 13, 0.1);
}
</style>