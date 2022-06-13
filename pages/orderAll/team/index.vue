<template>
  <view>
    <navBar :title="'分销订单'" :backgroundColor="'#fff'" :wordColor="'#333333'"></navBar>
    <view class="title">
      <view :class="[params.type == 1 ? 'active' : '']" @click="switchTab(1)">已入账</view>
      <view :class="[params.type == 2 ? 'active' : '']" @click="switchTab(2)">在路上</view>
    </view>

    <view class="with">
      <view class="item" v-for="(item,index) in list" :key="index">
        <view class="arrs">
          <view class="name">{{item.distributionName}}</view>
          <view class="time">{{item.createdAt}}</view>
        </view>
        <view class="arrs">
          <text class="over" v-if="params.type == 1">+{{item.money}}</text>
          <text class="txt" v-else>+{{item.money}}</text>
        </view>
      </view>
    </view>
    <noData v-if="list.length == 0"></noData>
  </view>
</template>

<script>
import { distributionOrder } from '@/api/my.js';
import noData from '@/components/noData/index'
export default {
  components: {
    noData
  },
  data() {
    return {
      params: {
        page: 1,
        size: 20,
        type: 1, // 1冻结(在路上),2正常(已入账)
        item: 4,//1.外卖2店内3快餐4收银
      },

      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    //切换
    switchTab(event) {
      this.list = []
      this.params.type = 1
      this.params.type = event;
      this.getList()
    },
    //列表
    getList() {
      uni.showLoading({ title: '加载中...' });
      distributionOrder(this.params).then(res => {
        if (res.data.length > 0) {
          this.list = this.list.concat(res.data)
        }
        uni.hideLoading();
      })
    }
  },
  onReachBottom: function () {
    this.params.page += 1;
    this.getList()
    uni.stopPullDownRefresh()
  },

  onPullDownRefresh: function () {
    uni.stopPullDownRefresh()
  }
}
</script>


<style>
page {
  background: #fff !important;
}
</style>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 89rpx;
  background: #fff;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  border-bottom: 1rpx solid #eee;
  .active {
    // font-size: 30rpx;
    // font-family: PingFang-SC-Bold, PingFang-SC;
    // font-weight: bold;
    color: #faa700;
    height: 89rpx;
    line-height: 89rpx;
    text-align: center;
    border-bottom: 6rpx solid #faa700;
  }
}
.with {
  display: flex;
  flex-direction: column;
  padding: 0rpx 55rpx;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0rpx;
    border-bottom: 1rpx solid rgba(151, 151, 151, 0.3);
    .arrs {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 32rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
      }
      .time {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        padding: 5rpx 0rpx;
      }
      .over {
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #00a719;
      }
      .txt {
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #fbbf63;
      }
    }
  }
}
</style>