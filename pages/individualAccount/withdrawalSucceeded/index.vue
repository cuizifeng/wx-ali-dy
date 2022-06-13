<template>
  <view>
    <navBar :title="'提现成功'" :backgroundColor="'#fff'" :wordColor="'#000'"></navBar>
    <view class="content">
      <image class="icon" src="https://yunbei.lianmengfu.net/xcxpic/icon/txok.png" mode="" />
      <view class="item">提现成功</view>
      <view class="over">您已完成提现 </view>
      <view class="over">感谢您对{{system.name}}的支持</view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 146rpx;
  .icon {
    width: 316rpx;
    height: 237rpx;
  }
  .item {
    font-size: 44rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffaa00;
    padding-top: 65rpx;
    padding-bottom: 20rpx;
  }
  .over {
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    padding-top: 5rpx;
  }
}
</style>