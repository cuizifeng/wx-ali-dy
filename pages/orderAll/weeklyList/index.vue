<template>
  <view>
    <navBar :title="title" :backgroundColor="'#fff'" :wordColor="'#333333'"></navBar>

    <view class="with" v-if="Alist.length > 0">
      <view class="item" v-for="(item,index) in Alist" :key="index">
        <view class="arrs">
          <image class="icon" v-if="list[index].icon" :src="list[index].icon" mode="" />
          <view class="num" v-else>{{index}}</view>
          <image class="userImg" :src="item.portrait || imgs" mode="" />
          <view class="userName" v-if="item.userName">{{item.userName || ''}}</view>
        </view>
        <view class="arrs">
          <text class="txt">{{list[index].text || `第${index + 1}名`}} </text>
        </view>
      </view>
    </view>

    <noData v-if="Alist.length == 0"></noData>
  </view>
</template>

<script>
import { rank } from "@/api/my.js";
import noData from '@/components/noData/index'
export default {
  components: {
    noData
  },
  data() {
    return {
      imgs: 'https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/11/08/202111081355422543.png',
      title: '',
      list: [
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/one1.png',
          text: 'NO.1'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/two2.png',
          text: 'NO.2'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/three3.png',
          text: 'NO.3'
        }
      ],
      type: '',//1是本周  2是上周
      Alist: []
    }
  },
  onLoad(options) {
    this.title = options.title;
    this.getRank(options.type)
  },
  methods: {
    getRank(type) {
      rank({ type }).then(res => {
        if (res.code == 1) {
          this.Alist = this.Alist.concat(res.data.rank)
        }
      })
    }
  },
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
      align-items: center;
      .num {
        font-size: 36rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #fbbf63;
        padding: 0rpx 7rpx;
      }
      .icon {
        width: 34rpx;
        height: 45rpx;
      }
      .userImg {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50rpx;
        margin-left: 20rpx;
      }
      .userName {
        padding-left: 46rpx;
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
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