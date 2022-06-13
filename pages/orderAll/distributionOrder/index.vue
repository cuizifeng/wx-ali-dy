<template>
  <view>
    <navBar :title="'我的团队'" :backgroundColor="'#fff'" :wordColor="'#333333'"></navBar>
    <view class="title">
      <view :class="[params.type == 1 ? 'active' : '']" @click="switchTab(1)">直接伙伴</view>
      <view :class="[params.type == 2 ? 'active' : '']" @click="switchTab(2)">间接伙伴</view>
    </view>

    <view class="with">
      <view class="item" v-for="(item,index) in list" :key="index">
        <view class="arrs">
          <image v-if="item.portrait != 'undefined' || item.portrait" class="arrsImg" :src="item.portrait" mode="" />
          <view class="name">{{item.userName}}</view>
        </view>
        <view class="arrs">
          <!-- <text class="over">充值消费总额：¥98</text> -->
        </view>
      </view>
    </view>

    <noData v-if="list.length == 0"></noData>
  </view>
</template>

<script>
import { getOffline } from "@/api/my.js";
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
        type: 1,//1直接伙伴2间接伙伴
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchTab(event) {
      this.list = [];
      this.params.page = 1;
      this.params.type = event;
      this.getList()
    },


    //获取列表
    getList() {
      uni.showLoading({ title: '加载中...' });
      getOffline(this.params).then(res => {
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
      align-items: center;
      .arrsImg {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50rpx;
      }
      .name {
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        padding-left: 48rpx;
      }
      .over {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>