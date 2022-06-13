<template>
  <view>
    <view class="list">
      <view class="item">
        <view class="itemLeft">
          <image src="https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" mode="" />
        </view>
        <view class="itemRight">
          <view class="orderName">【冬季尊享】洗浴券+精品养生足疗+ 舒爽</view>
          <view class="orderPrice">
            <view class="priceAll">
              <view class="priceA"><text class="icon">¥</text> <text>498</text>
                <view class="group">6人团</view>
              </view>
              <view class="priceB">¥1280</view>
            </view>
            <view class="gopin">去拼团</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    width: 690rpx;
    background: #ffffff;
    box-shadow: 0rpx 12rpx 12rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 20rpx;
    padding: 23rpx;
    display: flex;
    margin: 30rpx 0rpx;
    .itemLeft {
      width: 202rpx;
      height: 202rpx;
      border-radius: 15rpx;
      //   overflow: hidden;
      image {
        width: 202rpx;
        height: 202rpx;
        border-radius: 15rpx;
      }
    }
    .itemRight {
      display: flex;
      flex-direction: column;
      padding: 10rpx 10rpx 10rpx 30rpx;
      .orderName {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        display: -webkit-box; //谷歌
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //显示几行
        overflow: hidden;
      }
      .orderPrice {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0rpx;
        .priceAll {
          display: flex;
          flex-direction: column;
          .priceA {
            font-size: 32rpx;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #ff6e11;
            display: flex;
            align-items: center;
            .icon {
              font-size: 20rpx;
            }
            .group {
              width: 60rpx;
              height: 28rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4rpx;
              border: 1rpx solid #fd5c1d;
              font-size: 18rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #fd5c1d;
              margin-left: 20rpx;
            }
          }
          .priceB {
            font-size: 24rpx;
            font-family: DIN-Medium, DIN;
            font-weight: 500;
            color: #c9c8c8;
            text-decoration: line-through;
          }
        }
        .gopin {
          width: 132rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          background: linear-gradient(180deg, #ffca4a 0%, #f8a707 100%);
          border-radius: 30rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }
}
</style>