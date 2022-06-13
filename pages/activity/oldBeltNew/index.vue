<template>
  <view>
    <navBar :title="'全民销售'" :backgroundColor="'#ff8c43'" :wordColor="'#333333'"></navBar>
    <view class="content">
      <view class="box">
        <view class="boxTitle">邀请收益</view>
        <view class="moneyList">
          <view class="moneyListItem activeline">
            <view class="num">{{invitationIncome.money || '0.00'}} <text class="numIcon">元</text> </view>
            <view class="numName">在路上收益</view>
          </view>
          <view class="moneyListItem activeline">
            <view class="num">{{invitationIncome.num || '0.00'}} <text class="numIcon">元</text> </view>
            <view class="numName">累计收益</view>
          </view>
          <view class="moneyListItem">
            <view class="num">{{invitationIncome.people || 0}} <text class="numIcon">人</text> </view>
            <view class="numName">成功邀请</view>
          </view>
        </view>
        <view class="withdrawal" @click="withdrawal">提现</view>
        <view class="withdrawalLog" @click="withdrawalLog">
          提现记录
          <image class="logIcon" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou2.png" mode="" />
        </view>
      </view>

      <view class="box">
        <view class="boxTitle">赚提成</view>
        <view class="threeIcon"></view>
        <view class="threeText">
          <view>邀请新人好友</view>
          <view>好友领红包</view>
          <view>好友七日内消费</view>
        </view>
        <view class="line"></view>
        <view class="list">邀新赏金</view>
        <view class="addUser">已邀请{{invitationIncome.people}}人，邀请好友越多，赏金越多</view>
      </view>

      <view class="box">
        <view class="boxTitle">财富榜</view>
        <view class="addUser">共<text class="addNum">{{invitationIncome.people}}</text>人参加</view>
        <view class="list">本周榜单</view>
        <view class="time" @click="goWeek('本周榜单',1)">{{getRank.weekStart}}-{{getRank.weekEnd}}（本周一至今日排名）
          <image class="goAll" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou3.png" mode="" />
        </view>
        <view class="list" style="margin-top:27px">上周榜单</view>
        <view class="time" @click="goWeek('上周榜单',2)">{{getRank.lastWeekStart}}-{{getRank.lastWeekEnd}}（本周一至今日排名）
          <image class="goAll" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou3.png" mode="" />
        </view>
      </view>

      <button open-type="share" class="addUserMoney">邀请好友赚赏钱</button>
    </view>
  </view>
</template>

<script>
import { index, rank } from "@/api/my.js";
export default {
  data() {
    return {
      invitationIncome: {},//邀请收益
      getRank: {},//财富榜
    }
  },
  onShow() {
    this.init()
  },

  methods: {
    init() {
      index().then(res => { this.invitationIncome = res.data })
      rank({}).then(res => { this.getRank = res.data })
    },
    //提现记录
    withdrawalLog() {
      uni.navigateTo({
        url: '/pages/orderAll/withdrawalDetails/index?item=' + 1
      });
    },

    //提现
    withdrawal() {
      uni.navigateTo({
        url: '/pages/individualAccount/withdrawal/index?item=' + 1 + '&ident=' + 'oldWithNewWithdrawalSet'
      });
    },
    //榜单列表
    goWeek(event, type) {
      uni.navigateTo({
        url: '/pages/orderAll/weeklyList/index?title=' + event + '&type=' + type
      });
    }
  },
  onShareAppMessage: function () {
    return {
      title: '进来看看吧！',
      path: '/pages/tabbar/shop/index?userId=' + uni.getStorageSync('userId'),
      //   imageUrl: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.addUserMoney {
  //   position: fixed;
  //   left: 91rpx;
  //   bottom: 50rpx;
  margin: 50rpx auto;
  width: 568rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
  border-radius: 45rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #ff8c43 0%, #fe6f4a 100%);
  .box {
    width: 690rpx;
    background: url("https://yunbei.lianmengfu.net/xcxpic/icon/oldNew.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30rpx 0rpx;
    padding-bottom: 30rpx;
    .threeIcon {
      width: 576rpx;
      height: 100rpx;
      background: url("https://yunbei.lianmengfu.net/xcxpic/icon/three.png");
      background-size: 100% 100%;
      margin: 20rpx 0rpx 0rpx 0rpx;
    }
    .threeText {
      width: 576rpx;
      //   height: 50rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20rpx;
      padding-bottom: 30rpx;
      view {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
    .line {
      width: 627rpx;
      border-bottom: 1rpx solid #dfd7ce;
      margin-bottom: 10rpx;
    }
    .boxTitle {
      width: 312rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 30rpx;
      font-weight: 600;
      background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
      margin-left: 21rpx;
      color: #fff;
    }
    .activeline {
      border-right: 2rpx solid #ece3d9;
    }
    .moneyList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 50rpx 0rpx;
      .moneyListItem {
        width: 230rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          font-size: 67rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #ff6a00;
          .numIcon {
            font-size: 30rpx;
            padding-left: 5rpx;
          }
        }
        .numName {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .withdrawal {
      width: 290rpx;
      height: 68rpx;
      line-height: 68rpx;
      text-align: center;
      background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
      border-radius: 45rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .withdrawalLog {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      padding-top: 20rpx;
      .logIcon {
        width: 19rpx;
        height: 15rpx;
        margin-left: 10rpx;
      }
    }
    .addUser {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      padding: 5rpx 0rpx;
      .addNum {
        color: #fe7b46;
      }
    }
    .list {
      width: 332rpx;
      height: 8rpx;
      line-height: 8rpx;
      text-align: center;
      background: url("https://yunbei.lianmengfu.net/xcxpic/icon/listIcon.png");
      background-size: 100% 100%;
      font-size: 30rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #fe7b46;
      margin: 20rpx 0rpx;
    }
    .time {
      display: flex;
      align-items: center;
      display: flex;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fe7b46;
      .goAll {
        width: 19rpx;
        height: 15rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>