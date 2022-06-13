<template>
  <mg-popup v-model="show" vueId="3a953c6a-1" :vueSlots="['default']" :zIndex="5000">
    <view class="gdmdxx o-y-s bf7 ">
      <view class="p3 p-r f40 c0 wei t-c ">{{co.shopData.name+''}}<text @tap="show = !1" class="iconfont iconx f38 cd p-a r0 mr10 "></text>
      </view>
      <scroll-view class="svbd f24 c9 " scroll-y="true">
        <block v-if="sjqb.length">
          <view class="p20 c0 f28 ">优惠购</view>
          <view>
            <block v-for="(v, i) in sjqb" :key="i">
              <mg-coupon cname @btntap="btntap(i)" :co="v" ptype="8" :vueId="'3a953c6a-2-'+i+','+'3a953c6a-1'" v-if="i<2||zkshow"></mg-coupon>
            </block>
          </view>
        </block>
        <block v-if="sjyhqArr.length">
          <view class="p20 c0 f28 ">代金券</view>
          <view>
            <block v-for="(v, i) in sjyhqArr" :key="i">
              <mg-coupon cname @btntap="btntap(v)" :co="v" ptype="5" :vueId="'3a953c6a-3-'+i+','+'3a953c6a-1'" v-if="i<2||zkshow"></mg-coupon>
            </block>
            <view @tap="zkshow = !zkshow" class="p23 f-c f24 l-h1 " v-if="sjyhqArr.length>2">
              <view>{{zkshow?'收起':'展开更多'}}</view>
              <text :class="['iconfont icontop c3 ml5 f28 ',!zkshow?'xzdw':'']"></text>
            </view>
          </view>
        </block>
        <view class="p20 c0 f28 " v-if="co.discount.newReduction>0||co.discount.reduce.type||co.discount.give.id||co.discount.grantCoupon.name">优惠活动
        </view>
        <view class="f-s mb20 " v-if="co.discount.newReduction>0">
          <view class="yhic f18 cf b00 f-c ">新</view>
          <view class="f-1 ml10 ">{{'本店新用户立减'+sl+co.discount.newReduction}}</view>
        </view>
        <view class="f-s mb20 " v-if="co.discount.reduce.type">
          <view class="yhic f18 cf bf5f f-c ">减</view>
          <view class="f-1 ml10 ">
            {{'('+(co.discount.reduce.people==1?'全部人群':co.discount.reduce.people==2?'新客专享':'VIP专享')+')'}}<text class="ml20 ">{{mjtxt}}</text>
          </view>
        </view>
        <view class="f-s mb20 " v-if="co.discount.give.id">
          <view class="yhic f18 cf bf5f f-c ">赠</view>
          <view class="f-1 ml10 ">{{'('+co.discount.give.name+')'}}<text class="ml20 ">{{mztxt}}</text>
          </view>
        </view>
        <view class="f-s mb20 " v-if="co.discount.grantCoupon.name">
          <view class="yhic f18 cf bf5f f-c ">返</view>
          <view class="f-1 ml10 ">{{'(满'+co.discount.grantCoupon.orderMoney+'返代金券)'}}<text class="ml20 ">{{co.discount.grantCoupon.name}}</text>
          </view>
        </view>
        <view class="p20 c0 f28 ">公告</view>
        <view>{{type==1||type==3?co.moreSet.notice:type==2?co.moreSet.fastNotice:''}}</view>
        <block v-if="type==1">
          <view class="p20 c0 f28 ">配送信息</view>
          <block v-if="showSupport()">
            <view>{{'满'+co.shopData.distribution.startMoney+'起送'+(getSupport()?'，支持到店自取':'')+'；'}}</view>
            <view v-if="co.shopData.deliveryMode">
              {{'由'+co.shopData.deliveryMode+'提供配送服务，距门店'+co.shopData.delivery+'km范围内配送，配送费用受天气、时间等多方因素影响，以实际配送费为准。'}}</view>
          </block>
          <view v-else>仅支持到店自取</view>
        </block>
        <view class="p20 c0 f28 ">门店信息</view>
        <view>{{'营业时间：'+yysj}}</view>
        <view>{{'联系电话：'+co.shopData.storeTel}}</view>
        <view class="f-row ">
          <view>门店地址：</view>
          <view class="f-1 mr20 ">{{co.shopData.address}}</view>
          <view class="f-y-c ">
            <view @tap="ckwz" class="f-c dzic bsf mr60 p-r o-v ">
              <text class="iconfont icondtdh dzi "></text>
              <text class="p-a dd cf5f f18 bs10 ">到店</text>
            </view>
            <view @tap="makeTel(co.shopData.storeTel)" class="f-c dzic bsf ">
              <text class="iconfont icondh dzi "></text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </mg-popup>
</template>

<script>
import mgPopup from 'components/common/popup.vue';
import mgCoupon from 'components/common/mg-coupon.vue';
import {
  ckWz,
  deepCopy,
  makeTel
} from 'common/util';

export default {
  name: "mg-share",
  components: {
    mgPopup,
    mgCoupon
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    type: {
      type: String,
      default: "1"
    },
    value: {
      type: Boolean,
      default: !1
    },
    ptype: String,
    qlist: Array,
    sjqb: Array
  },
  data: function () {
    return {
      loading: !1,
      sjyhqArr: [],
      zkshow: !1,
      makeTel
    };
  },
  computed: {
    show: {
      get: function () {
        return this.value;
      },
      set: function (t) {
        this.$emit("input", t);
      }
    },
    mjtxt: function () {
      return 1 == this.co.discount.reduce.type ? "每满".concat(this.co.discount.reduce.moneyArr[0].fullMoney, "减").concat(
        this.co.discount.reduce.moneyArr[0].money) : 2 == this.co.discount.reduce.type ? this.co.discount.reduce.moneyArr
          .map(function (t) {
            return "满".concat(t.fullMoney, "减").concat(t.money);
          }).reverse().toString() : void 0;
    },
    mztxt: function () {
      return this.co.discount.give.moneyArr && this.co.discount.give.moneyArr.map(function (t) {
        return "满".concat(t.fullMoney, "赠").concat(t.give);
      }).reverse().toString();
    },
    yysj: function () {
      var t = "",
        n = this.co.moreSet;
      return 1 == n.timeType ? t = "24小时营业" : 2 == n.timeType && n.timeArr && (t = "".concat(n.timeArr[0].startTime, "-")
        .concat(n.timeArr[0].ciri ? "次日" : "").concat(n.timeArr[0].endTime), n.timeArr[1] && (t += " " + "".concat(n
          .timeArr[1].startTime, "-").concat(n.timeArr[1].ciri ? "次日" : "").concat(n.timeArr[1].endTime)), n.timeArr[2] &&
        (t += " " + "".concat(n.timeArr[2].startTime, "-").concat(n.timeArr[2].ciri ? "次日" : "").concat(n.timeArr[2]
          .endTime))), t;
    }
  },
  watch: {
    qlist: function (t) {
      t.length ? this.sjyhqArr = deepCopy(t) : (this.sjyhqArr = [], this.zkshow = !1);
    }
  },
  methods: {
    getSupport() {
      var t = this;
      return 1 == t.type ? t.co.moreSet.distributionSupport.find((function (t) {
        return 2 == t
      })) : null;
    },
    // 配送支持
    showSupport() {
      var t = this;
      return 1 == t.type ? t.co.moreSet.distributionSupport.find((function (t) {
        return 1 == t
      })) : null;
    },
    btntap: function (t) {
      var n = this;
      n.checkLogin().then(res => {
        this.$api.coupon_receive__coupon({
          couponId: t.id
        }).then(res => {
          n.$set(n.sjyhqArr.find(function (n) {
            return n.id == t.id;
          }), "islq", !0);
        })
      })
    },
    ckwz: function () {
      ckWz({
        lat: this.co.shopData.lat,
        lng: this.co.shopData.lng,
        name: this.co.shopData.name,
        address: this.co.shopData.address
      });
    },
    ckda: function () {
      this.go({
        t: 1,
        url: "sjjs?type=2&info=" + encodeURIComponent(JSON.stringify(this.co.storeInfo))
      });
    }
  }
}
</script>
<style scoped>
.gdmdxx {
  border-radius: 35rpx 35rpx 0 0;
  padding: 10rpx 30rpx 40rpx;
}

.gdmdxx .svbd {
  max-height: 900rpx;
}

.gdmdxx .lbtn {
  font-size: 20rpx;
  color: #666;
  padding: 3rpx 25rpx;
  border: 1px solid #ddd;
  border-radius: 5rpx;
}

.gdmdxx .lbtn2 {
  color: #ff5f2f;
  border-color: #f3d8db;
}

.gdmdxx .lbtn3 {
  color: #4bc436;
  border-color: #98ed8b;
}

.dzic {
  width: 58rpx;
  height: 58rpx;
  background: #f2f3f5;
}

.dzic .dzi {
  color: #5b688b;
}

.dzic .dd {
  background: #ffefea;
  padding: 3rpx 10rpx;
  top: -10%;
  right: -70%;
}
</style>