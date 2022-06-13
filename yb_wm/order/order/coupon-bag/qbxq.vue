<template>
  <view>
    <view class="" v-if="co.id">
      <mg-swiper class="" :co="swiper" :color="tColor" u="rpx" vueId="211ee720-1"></mg-swiper>
      <view class="bf p3 ">
        <view class="f-y-c ">
          <view class="f-g-1 ">
            <text class="t-o-e cff0 ">{{sl}}<text class="f36 wei ">{{co.money}}</text>
            </text>
            <text class="t-o-e ml10 t-d-l cb f24 ">{{sl+ co.price}}</text>
          </view>
          <view class="f26 c9 ">{{'剩余'+co.stock+'份'}}</view>
        </view>
        <view class="f34 c0 wei mt10 ">{{co.name}}</view>
      </view>
      <view class="bf p3 mt15 f26 ">
        <view class="f34 wei c0 mb10 ">购买须知</view>
        <view class="f30 ">本订单包含以下代金券</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">
            <text class="" v-for="(v, i) in co.coupon" :key="i">{{(v.fullMoney>0?'满'+v.fullMoney+'减'+v.money:v.money+dw+'无门槛')+'代金券'+v.num+'张,'}}</text>
          </view>
        </view>
        <view class="f30 mt15 ">可购数量</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">{{co.isLimit==1?'每个用户限购'+co.limitNum+'份':'每位用户每天可购卡券数量限制'+co.dayNum+'份'}}</view>
        </view>
        <view class="f30 mt15 ">抢购时间</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">{{timeToDate(co.startTime)+'至'+ timeToDate(co.endTime)}}</view>
        </view>
        <view class="f30 mt15 ">有效期限</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">{{'自购买日起'+co.days+'天内使用有效'}}</view>
        </view>
        <view class="f30 mt15 ">适用商家</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">{{co.storeName}}</view>
        </view>
        <view class="f30 mt15 ">使用限制</view>
        <view class="f-row p10 ">
          <view class="yd bsf "></view>
          <view class="">须分次使用，每次可使用一张</view>
        </view>
      </view>
      <view class="bf mt15 p3 pb130 ">
        <view class="f34 wei c0 ">使用须知</view>
        <view class="mt20 " v-if="co.details">
          <mg-rtext class="" :content="co.details" type="2" vueId="211ee720-2"></mg-rtext>
        </view>
      </view>
      <view class="foot-btnc ">
        <view class="qbbtn o-h f-row ">
          <view class="f-1 p3 b3 f-y-c cf ">
            <text class="f24 ml10 ">{{sl}}</text>
            <text class="f40 " style="margin-top:-10rpx;">{{co.money}}</text>
            <text class="t-d-l c9 f18 ml10 ">{{sl+co.price}}</text>
          </view>
          <button @tap="ljgm" class="ljgm f30 cf f-c bs0 " :style="'background:'+(co.canBuy==1?tColor:'#ddd')+';'">{{co.canBuy==1?'立即购买':'已购买过了'}}</button>
        </view>
      </view>
    </view>
    <load class="" vueId="211ee720-3" v-else></load>
  </view>
</template>

<script>
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import uniNavBar from 'components/third/uni-nav-bar.vue';
import mgCoupon from 'components/common/mg-coupon.vue';
import mgRtext from 'components/common/functionCmp/rich-text.vue';
import load from 'components/common/load.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  getOptions,
  mpShare,
  setNT
} from 'common/util';
export default {
  name: "qbxq",
  components: {
    MgSwiper,
    uniNavBar,
    mgCoupon,
    mgRtext,
    load,
  },
  data: function () {
    return {
      opcity: 0,
      iconOpcity: .5,
      swiper: {
        class: "",
        padding: 0,
        swiper: [],
        duration: "",
        mode: "",
        height: "750",
        radius: "0",
        auto: !0,
        interval: 5
      },
      co: {},
      dataList: []
    }
  },
  onLoad: function (e) {
    var t = this;
    getOptions(e, {
      key: "id"
    });
    t.getLoginInfo().then(res => {
      t.getData(), t.getSystem({
        nosetNB: 1
      });
    })
  },
  onShow: function () {
    this.co.id && (this.getData(), console.log("qbxq onshow"))
  },
  mixins: [utilMixins],
  computed: {},
  methods: {
    ...mapActions(["getSjxx"]),
    getData: function () {
      var e = this;
      this.$api['roll-bag_roll__bag__info']({
        id: e.id
      }).then(res => {
        e.co = res, setNT(r.name), e.swiper.swiper = res.media.map((
          function (e) {
            return {
              url: e
            }
          })), e.dataList = res.coupons, (0, u.wxShare)({
            title: res.name,
            desc: res.body,
            imgUrl: e.getImgS(res.icon)
          });
      })
    },
    ljgm: function () {
      1 == this.co.canBuy && (e.setStorageSync("bdhc", this.co), this.go({
        url: "qrdd"
      }))
    }
  },
  onPageScroll: function (e) {
    if (!(this.opcity >= 1 && e.scrollTop / 64 >= 1)) {
      var t = e.scrollTop / 64;
      this.opcity = t, this.iconOpcity = .5 * (1 - t < 0 ? 0 : 1 - t)
    }
  },
  onShareAppMessage: function () {
    return mpShare({
      t: this.co.name,
      i: this.getImgS(this.co.icon)
    })
  }
}
</script>

<style>
</style>
<style scoped>
.foot-btnc {
  padding: 30rpx 40rpx;
}

.qbbtn {
  box-shadow: 0rpx 10rpx 30rpx 8rpx rgba(0, 0, 0, 0.18);
  height: 96rpx;
  border-radius: 48rpx;
}

.ljgm {
  width: 230rpx;
}

.yd {
  margin: 15rpx 12rpx 0 8rpx;
  background: #333;
  width: 10rpx;
  height: 10rpx;
}

.sjlogo {
  width: 42rpx;
  height: 42rpx;
}
</style>