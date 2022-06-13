<template>
  <view>
    <view class="noData">
      <image class="icon" src="https://yunbei.lianmengfu.net/xcxpic/icon/nodata.png" mode="" />
      <view class="text">{{text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无相关内容～'
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style lang="scss" scoped>
.noData {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    width: 239rpx;
    height: 234rpx;
  }
  .text {
    padding-top: 20rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 42px;
  }
}
</style>