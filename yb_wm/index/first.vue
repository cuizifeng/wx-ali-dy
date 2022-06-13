<template>
  <view class="box">
    <view class="img">
      <image src="https://yunbei.lianmengfu.net/xcxpic/imgs/6ae84699b45e747f64eab4ecdd0387a.jpg" mode=""></image>
      <navigator url="/pages/individualAccount/Collection/index">
        <view class="syt">
          收银台
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  position: relative;
}

.img image {
  width: 100%;
  height: 100%;
}

.syt {
  width: 330rpx;
  height: 55rpx;
  line-height: 55rpx;
  text-align: center;
  color: #ffffff;
  /* background-image: url(../../static/imgs/图层%203.png); */
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -165rpx;
  margin-top: 200rpx;
}
</style>
