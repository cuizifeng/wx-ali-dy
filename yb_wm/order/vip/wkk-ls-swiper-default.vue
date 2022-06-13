<template>
  <view class="bs20 imgc p-r " :style="'background:'+(data.bgType==1?data.color||tColor:'')+';'">
    <view class="p-a wh ">
      <mg-img class="" :src="data.bgType==2?data.bgImg:'https://yunbei.lianmengfu.net/xcxpic/wd/vip/vipbg.png'" vueId="fb34f8ba-2"></mg-img>
    </view>
    <view class="p-r wh cf ">
      <view class="p34 f-y-c ">
        <view class="f-1 f32 wei ">{{data.name}}</view>
        <view class="rdj b-d f26 l-n ">{{'VIP'+data.level}}</view>
      </view>
      <view class="p3 mt30 f-y-e ">
        <view class="f40 l-n ">{{data.condition}}</view>
        <view class="ml20 f26 ">成长值</view>
      </view>
    </view>
  </view>
</template>

uni.createComponent({
  generic: !0,
  props: {
    data: {
      type: null
    }
  },
  render: function () {}
});<style scoped>
.p34 {
  padding: 30rpx 40rpx;
}

.wk1 {
  width: 140%;
  margin-left: -20%;
  height: 345rpx;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
}

.wk1ic {
  margin: -300rpx 0 42rpx;
}

.wk1ic .imgc {
  height: 360rpx;
}

.xqc {
  height: 30rpx;
  padding: 0 16rpx;
}

.wk2img {
  height: 390rpx;
}

.wk2c1 {
  padding: 40rpx;
}

.wk2c1 .himg {
  width: 90rpx;
  height: 90rpx;
}

.rdj {
  padding: 6rpx 16rpx;
  border-radius: 30rpx;
  border-color: #fff;
}

.icname {
  margin-right: 20rpx;
  color: #333;
}
</style>