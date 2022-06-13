<template>
  <view>
    <view class="list">
      <view class="item" v-for="(item,index) in 10" :key="index">
        <view class="itemLeft">
          <image src="https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" mode="" />
        </view>
        <view class="itemRight">
          <view class="orderName">【冬季尊享】洗浴券+精品养生足疗+ 舒爽</view>
          <view class="progress-box">
            <uni-rate :readonly="true" :size="18" :value="2" />
            <!-- <progress percent="20" border-radius="50" activeColor="#FAAD15" backgroundColor="#fff" stroke-width="6"></progress> -->
          </view>
          <view class="orderPrice">
            <view class="priceAll">
              <!-- <view class="priceB">¥1280</view> -->
              <view class="priceA"><text class="icon">¥</text> <text>498</text>
                <view class="group">¥390</view>
              </view>
            </view>
            <!-- <view class="gopin">去抢购</view> -->
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
    width: 573rpx;
    background: #ffffff;
    box-shadow: 0rpx 12rpx 12rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 20rpx;
    padding: 23rpx;
    display: flex;
    margin: 10rpx 0rpx;
    .itemLeft {
      width: 150rpx;
      height: 150rpx;
      border-radius: 15rpx;
      //   overflow: hidden;
      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 15rpx;
      }
    }
    .itemRight {
      display: flex;
      flex-direction: column;
      padding: 0rpx 10rpx 0rpx 30rpx;
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
      .progress-box {
        width: 320rpx;
        padding: 10rpx 0rpx;
        border-radius: 50rpx;
        progress {
          border: 1rpx solid #faae16;
          border-radius: 50rpx;
        }
      }
      .orderPrice {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rpx 0rpx;
        .priceAll {
          display: flex;
          flex-direction: column;
          .priceA {
            display: flex;
            align-items: center;
            font-size: 30rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #ff7400;
            .icon {
              font-size: 20rpx;
            }
            .group {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              letter-spacing: 1rpx;
              margin-left: 20rpx;
              text-decoration: line-through;
            }
          }
          .priceB {
            font-size: 24rpx;
            font-family: DIN-Medium, DIN;
            font-weight: 500;
            color: #c9c8c8;
            text-decoration: line-through;
            padding-bottom: 20rpx;
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