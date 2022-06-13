<template>
  <view>
    <navBar :title="'订单详情'" :backgroundColor="'#FFCB4C'" :wordColor="'#fff'"></navBar>
    <view class="pb130 " v-if="info.id">
      <view class="sltop cf " :style="'background:'+tColor+';'">
        <view class="p3 f36 ">{{orderState.str1}}</view>
      </view>
      <view class="p03 slbd ">
        <view class="bf mb30 bs20 ">
          <view class="slbdt1 f30 wei ">感谢您对我们的信任，期待下次光临</view>
          <mg-cell bgc="#FAFBFC" @tab="makeTel(info.storeTel)" cname="b-t-e" last="1" vueId="b38ad1d2-1" :vueSlots="['bd']">
            <view slot="bd">
              <view class="f30 f-c ">
                <text class="iconfont f42 icondh c0 mr20 "></text>
                <text class="t-o-e ">联系商家</text>
              </view>
            </view>
          </mg-cell>
        </view>
        <view class="mb30 bs20 ">
          <mg-cell isr="1" vueId="b38ad1d2-2" :vueSlots="['bd']">
            <view slot="bd">
              <view class="f30 f-y-c ">
                <text class="t-o-e wei ">{{info.storeName}}</text>
              </view>
            </view>
          </mg-cell>
          <mg-cell btt="订单总额" :ft="''+osl+(info.originalMoney||info.money)" ftc="f32 c3" isr="1" vueId="b38ad1d2-3">
          </mg-cell>
          <mg-cell btt="会员折扣" :color="tColor" :ft="info.vipDiscount*10+'折'" ftc="f32" isr="1" vueId="b38ad1d2-4" :vueSlots="['hd']" v-if="info.vipDiscountMoney>0">
            <view class="itemcon pomj mr20 " slot="hd">会员</view>
          </mg-cell>
          <mg-cell btt="优惠券抵扣" :color="tColor" :ft="'-'+osl+info.couponPreferential" ftc="f32" isr="1" vueId="b38ad1d2-5" :vueSlots="['hd']" v-if="info.couponPreferential>0">
            <view class="itemcon pomj mr20 " slot="hd">优惠券</view>
          </mg-cell>
          <mg-cell isr="1" last="1" vueId="b38ad1d2-6" :vueSlots="['ft']">
            <view class="ml10 c3 " slot="ft">
              <text v-if="zyh>0">已优惠<text :style="'color:'+tColor+';'">{{osl+zyh}}</text>
              </text>
              <text class="m02 ">小计</text>
              <text class="f34 wei ">{{osl+info.money}}</text>
            </view>
          </mg-cell>
        </view>
        <view class="mb30 bf bs20 ">
          <mg-cell btt="订单信息" bttc="f30 wei" isr="1" vueId="b38ad1d2-7"></mg-cell>
          <view class="p20 ">
            <mg-cell btt="订单号码" bttc="c9" cname="p13" last="1" vueId="b38ad1d2-8" :vueSlots="['ft']">
              <view class="f-y-c " slot="ft">
                <text class="c3 ">{{info.outTradeNo}}</text>
                <bk-b @tab="fz(info.outTradeNo)" cName="f24 ml20" t="复制" type="2" :vueId="'b38ad1d2-9'+','+'b38ad1d2-8'"></bk-b>
              </view>
            </mg-cell>
            <mg-cell btt="下单时间" bttc="c9" cname="p13" :ft="timeToDate(info.createdAt)" ftc="c3" last="1" vueId="b38ad1d2-10"></mg-cell>
            <mg-cell btt="支付方式" bttc="c9" cname="p13" :ft="payName(info.payMode)" ftc="c3" last="1" vueId="b38ad1d2-11" v-if="info.payMode"></mg-cell>
            <mg-cell bdmw="130rpx" btt="订单备注" bttc="c9" cname="p13" :ft="info.userNote" ftc="c3 f-s-1" last="1" noc="1" vueId="b38ad1d2-12" v-if="info.userNote"></mg-cell>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import bkB from 'components/common/block-b.vue';
import MgCell from 'components/common/mg-cell.vue';
import {
  fz,
  makeTel,
  setNT
} from 'common/util';
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
      fz,
      makeTel,
      info: {},
      stime: "",
      latitude: "",
      longitude: "",
      covers: [],
      line: [],
      sjxx: {},
      loading: !1
    }
  },
  onLoad: function (t) {
    var n = this;
    n.getSystem({
      setNB: 1
    });
    n.orderId = t.id;
    n.getInfo();
    n.id = t.id;
  },
  mixins: [utilMixins],
  computed: {
    orderState: function () {
      var t = "",
        n = "",
        e = "";
      switch (+this.info.state) {
        case 2:
          t = "订单已完成", n = "";
          break
      }
      return {
        str1: t,
        str2: n,
        str3: e
      }
    },
    osl: function () {
      return this.info.symbol || this.sl
    },
    zyh: function () {
      return +this.info.vipDiscountMoney + +this.info.couponPreferential
    }
  },
  methods: {
    getInfo: function () {
      var t = this;
      this.$api.cashier_cashier__order__info({
        orderId: t.orderId,
        id: t.orderId
      }).then(res => {
        t.info = res;
      })
    },
    getStoreInfo: function (t) {
      var n = this;
    }
  }
}
</script>
<style scoped>
.sltop {
  height: 206rpx;
}

.slbd {
  margin-top: -80rpx;
}

.slbdt1 {
  padding: 50rpx 30rpx;
}
</style>