<template>
  <view>
    <navBar :title="'提现明细'" :backgroundColor="'#fff'" :wordColor="'#333333'"></navBar>
    <view class="with" v-if="list.length > 0">
      <view class="item" v-for="(item,index) in list" :key="index">
        <view class="arrs">
          <view class="txtLeft">提现</view>
          <view class="time">{{item.createdAt}}</view>
        </view>
        <view class="arrs">
          <view class="txt">{{item.money}}</view>
          <view class="type success" v-if="item.state == 2"> 提现成功 </view>
          <view class="type fail" v-if="item.state == 3">提现失败</view>
          <view class="type in" v-if="item.state == 1">申请中</view>
        </view>
      </view>
    </view>
    <noData v-if="list.length == 0"></noData>
  </view>
</template>

<script>
import { withdrawalList } from '@/api/my.js';
import noData from '@/components/noData/index'
export default {
  components: {
    noData
  },
  data() {
    return {
      params: {
        size: 20,
        page: 1,
        item: 1,	//1.老带新2.分销商3.全员
      },
      list: []
    }
  },
  onLoad(options) {
    this.params.item = options.item
    this.withdrawalList()
  },
  methods: {
    withdrawalList() {
      withdrawalList(this.params).then(res => {
        if (res.code == 1) {
          this.list = this.list.concat(res.data)
        }
      })
    }
  },

  onReachBottom: function () {
    uni.stopPullDownRefresh()
  },

  onPullDownRefresh: function () {
    this.params.page += 1
    this.withdrawalList()
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
      .txtLeft {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        padding-bottom: 10rpx;
      }
      .txt {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        padding-bottom: 10rpx;
        text-align: right;
      }
      .time {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .type {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
      .success {
        color: #07bc60;
      }
      .fail {
        color: #fa6400;
      }
      .in {
        color: #aaa;
      }
    }
  }
}
</style>