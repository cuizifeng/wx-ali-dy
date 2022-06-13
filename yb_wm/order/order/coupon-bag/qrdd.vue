<template>
  <view class="pb130 p3 " v-if="co.id">
    <view class="mb30 bs30 bf f24 ">
      <mg-cell bttc brs="50%" :btt="co.storeName" class="" h="45" :img="co.storeIcon" last="1" vueId="3557b939-1" w="45">
      </mg-cell>
      <mg-cell brs="5rpx" class="" cname="f-sh p03" h="160" hdc="f-s" :img="co.icon" last="1" vueId="3557b939-2" :vueSlots="['bd']" w="160">
        <view class="f-row " slot="bd">
          <view class="f-1 ">
            <view class="">{{co.name}}</view>
          </view>
          <view class="ml20 t-r ">
            <view class="">{{sl}}<text class="f28 ">{{co.money}}</text>
            </view>
            <view class="c9 ">{{'x'+params.num}}</view>
          </view>
        </view>
      </mg-cell>
      <mg-cell btt="购买数量" class="" isl="1" last="1" vueId="3557b939-3" :vueSlots="['ft']">
        <view class="" slot="ft">
          <number-box @change="bindChange" class="" :max="maxNum" :min="1" :value="params.num" :vueId="'3557b939-4'+','+'3557b939-3'"></number-box>
        </view>
      </mg-cell>
      <view class="cf1 t-r p23 ">
        <text class="c3 ">
          <text class="c9 mr20 ">{{'共'+params.num+'件'}}</text>小计：</text>{{sl}}<text class="f28 ">{{hjje}}</text>
      </view>
    </view>
    <view class="c9 p02 f24 ">您本次购买的商品不需要收货地址，请仔细确认每个商品所需的购买信息，如手机号码，身份证号码等。</view>
    <view class="dbbtnc bf f-row f-x-e " :style="'bottom:'+(isIpx?'40rpx':0)+';'">
      <view class="f-y-c ">
        <view class="cf1 mr30 ">
          <text class="c9 mr20 f24 ">{{'共'+params.num+'件'}}</text>
          <text class="c3 ">合计：</text>{{sl}}<text class="f36 wei ">{{hjje}}</text>
        </view>
      </view>
      <button @tap="tjdd" class="dbr cf f-c ma0 " :disabled="loading" :loading="loading" :style="'background:'+tColor+';'">提交订单</button>
    </view>
    <view class="bgf " v-if="isIpx"></view>
  </view>
</template>

<script>
import numberBox from "components/form/number-box.vue";
import {
  setNT
} from 'common/util';

export default {
  name: "order-index",
  components: {
    numberBox
  },
  data: function () {
    return {
      co: {},
      params: {
        rollBagId: "",
        num: 1
      },
      loading: !1
    }
  },
  onLoad: function (t) {
    this.getSystem(), setNT("确认订单"), this.params.rollBagId = uni.getStorageSync("bdhc").id,
      this.co = uni.getStorageSync("bdhc")
  },
  computed: {
    maxNum: function () {
      if (this.co.id) {
        var n = this.co,
          t = n.stock - n.salesNum <= 0 ? 1 : n.stock - n.salesNum,
          e = 1 != n.isLimit ? +n.dayNum : t;
        return e > t ? t : e
      }
    },
    hjje: function () {
      return +(this.co.money * this.params.num).toFixed(2)
    }
  },
  methods: {
    bindChange: function (n) {
      this.params.num = n
    },
    tjdd: function () {
      var n = this;
      this.$api['roll-bag_roll__bag__order'](n.params).then(res => {
        n.go({
          t: 2,
          url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
            orderId: res,
            orderType: 4,
            info: {
              money: n.hjje,
              type: "购买券包",
              cancel: 1,
              go: {
                t: 6,
                url: "/pages/tabbar/order/index"
              }
            }
          }))
        })
      })
    }
  }
}
</script>
<style scoped>
.dbbtnc {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 998;
  padding: 30rpx;
}

.dbr {
  min-width: 210rpx;
  height: 80rpx;
  font-size: 30rpx;
  border-radius: 80rpx;
}
</style>