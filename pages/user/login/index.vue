<template>
  <view>
    <navBar :title="'登录'" :backgroundColor="'#fff'" :wordColor="'#333333'"></navBar>
    <view class="content">
      <view class="logo"></view>

      <view class="user">用户登录</view>
      <view class="noUser">取消</view>
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
  .logo {
    width: 560rpx;
    height: 537rpx;
    background: url("https://yunbei.lianmengfu.net/xcxpic/icon/cyys.png");
    background-size: 100% 100%;
  }
  .user {
    width: 408rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
    border-radius: 45rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-top: 206rpx;
  }
  .noUser {
    width: 408rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    border-radius: 45rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f8a809;
    border: 1rpx solid #f8a809;
    margin-top: 42rpx;
  }
}
</style>