<template>
  <view class="pb130 ">
    <view class="posi-f w100 t0 czztm bf5 ">
      <view class="bf ">
        <view class="f-c-c p30 ">
          <view class="f28 ">当前成长值</view>
          <view class="f56 cf7 wei ">{{user.growth}}</view>
        </view>
        <view class="f-x-bt ">
          <view class="p03 f-row f22 o-h ">
            <view class="vname-l t-c t-o-e ">{{'VIP'+user.level}}</view>
            <view class="vname-r t-c t-o-e ">{{user.cardName}}</view>
          </view>
          <view @tap="integralRule" class="f-c p3 ">
            <text class="iconfont iconjfgz mr10 cf7 f34 "></text>
            <text class="">会员权益</text>
          </view>
        </view>
      </view>
      <view class="bf mt30 ">
        <view class="f32 wei p3 bor-b ">成长值记录</view>
      </view>
    </view>
    <view class="" :style="'margin-top:'+topH+'px'+';'">
      <view class="p3 bf bor-b " v-for="(v, i) in dataList" :key="i">
        <view class="f-x-bt ">
          <view class="t-o-e f28 ">{{v.note}}</view>
          <view class="cf7 f28 ">
            <text class="" v-if="v.type=='1'">+</text>
            <text class="" if="v.type=='2'" v-else>-</text>{{v.growth}}
          </view>
        </view>
        <view class="f-x-bt ">
          <view class="c9 f24 m10 ">{{v.createdAt}}</view>
        </view>
      </view>
      <jzz bgcolor="transparent" class="" imgn="zwjf" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="d037a752-1">
      </jzz>
    </view>
  </view>
</template>

<script>
import jzz from "components/common/jzz.vue";
import {
  utilMixins
} from 'common/utilMixins';
import {
  setNT,
  sljz
} from 'common/util';
export default {
  name: "myIntegral",
  components: {
    jzz
  },
  data: function () {
    return {
      params: {
        page: 1,
        size: 10
      },
      integral: "0",
      topH: ""
    }
  },
  onLoad: function () {
    var e = this;
    var a;
    e.getSystem(), setNT("成长值"), e.getLoginInfo();
    e.refreshUser({
      nomask: 1,
      get: 1,
      now: 1
    }), a = uni.createSelectorQuery(), a.select(".czztm").boundingClientRect((function (t) {
      e.topH = t.height
    })).exec(), e.integral = e.user.integral, e.getList();
  },
  mixins: [utilMixins, sljz],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    getList: function () {
      var t = this;
      this.$api.member_growth__details(t.params).then(res => {
        t.dataList = t.dataList.concat(res), t.isget = !0,
          t.mygd = t.params.size > res.length, t.params.page++;
      })
    },
    integralMall: function () {
      this.go({
        t: 2,
        url: "/pages/tabbar/shop/index"
      })
    },
    integralRule: function () {
      this.go({
        t: 1,
        url: "wkk?type=1"
      })
    }
  }
}
</script>
<style scoped>
.vname-l {
  min-width: 120rpx;
  padding: 3rpx 10rpx 3rpx 15rpx;
  border-radius: 50rpx 0 0 50rpx;
  background: linear-gradient(90deg, #503215, #55371a);
  color: #fffadb;
}

.vname-r {
  min-width: 120rpx;
  padding: 3rpx 15rpx 3rpx 10rpx;
  border-radius: 0 50rpx 50rpx 0;
  background: linear-gradient(90deg, #fff3a6, #fcd96f);
  color: #7a5d24;
}

.bor-b {
  border-bottom: 1px solid #eff3f6;
}
</style>