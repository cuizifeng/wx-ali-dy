<template>
  <view>
    <navBar :title="'全员销售'" :backgroundColor="'linear-gradient(133deg, #fec745 0%, #f9aa0c 100%)'" :wordColor="'#000'"></navBar>
    <!-- <view class="distributorBg"></view> -->
    <view class="memberBox">
      <view class="membershipCard" v-if="user.portrait || user.userName">
        <view class="membershipCard_top">
          <view class="membershipCard_top_left">
            <image class="Img" :src="user.portrait" mode="aspectFill" />
            <view class="userName">
              <view class="usera">{{user.userName?user.userName:'-'}}</view>
              <!-- <view class="user">1234567890</view> -->
            </view>
          </view>
        </view>
      </view>

      <!-- money -->
      <view class="moneyListBox">
        <view class="moneyList">
          <view class="item1-arrs">
            <view :class="['num']">{{info.ketixianjine?info.ketixianjine:'0.00'}}</view>
            <view class="name">可提现</view>
          </view>
          <view class="item1-arrs">
            <view :class="['num']">{{info.userAuditMoney?info.userAuditMoney:'0.00'}}</view>
            <view class="name">提现中</view>
          </view>
          <view class="item1-arrs">
            <view :class="['num']">{{info.userCompleteMoney?info.userCompleteMoney:'0.00'}}</view>
            <view class="name">已提现</view>
          </view>
        </view>
        <view class="Withdrawal" @click="withdrawal">提现</view>
      </view>
    </view>
    <!-- 底部列表 -->
    <view class="bottomList">
      <view class="bottomListItem" v-for="(item,index) in list" :key="index" @click="jump(item.url)">
        <view class="titleLeft">
          <image class="titleLeftIcon" :src="item.icon" mode="aspectFill" />
          <view class="titleLeftName"> {{item.title}} </view>
        </view>
        <view class="jiantou"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: '',//详情
      getDistribution: {},//页面数据
      list: [
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/mingxi.png',
          title: '提现明细',
          url: '/yb_wm/other/withDrawal/record'

        }
      ]
    }
  },

  mounted() {

  },
  onLoad() {
    this.code_list()
    console.log(this.user)
  },
  methods: {
    //奖励金额
    code_list() {
      this.$api['code_list']({
        userId: uni.getStorageSync('userId')
      }).then(res => {
        this.info = res
        console.log(this.info)
      })
    },
    //提现
    withdrawal() {
      uni.navigateTo({
        url: '/pages/individualAccount/withdrawal/index?item=' + 3 + '&ident=' + 'allbutionWithdrawalSet'
      });
    },

    jump(url) {
      if (url) {
        uni.navigateTo({
          url,
        })
      }
    },
  },
}
</script>

<style lang="scss" sceoped>
page {
  background: #ffffff !important;
}
.distributorBg {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  z-index: -1;
  width: 750rpx;
  height: 500rpx;
  background: linear-gradient(133deg, #fec745 0%, #f9aa0c 100%);
}
.memberBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .membershipCard {
    width: 690rpx;
    .membershipCard_bottom {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0rpx 50rpx;
      .membershipCard_bottom_line {
        height: 71rpx;
        border: 1rpx dashed #ffffff;
      }
      .membershipCard_bottom_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .item_num {
          font-size: 42rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #ffffff;
        }
        .item_name {
          padding-top: 5rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .membershipCard_top {
      padding: 48rpx 0rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .companyInfo {
        // width: 170rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        background: linear-gradient(to bottom, #ffb957, #ff7c16);
        border-radius: 50rpx;
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        // font-weight: bold;
        color: #ffffff;
        margin-right: 10rpx;
      }
      .membershipCard_top_left {
        display: flex;
        align-items: center;
        .Img {
          width: 100rpx;
          height: 100rpx;
          box-shadow: 0px 0px 5px 0px rgba(221, 180, 102, 0.3);
          border-radius: 50rpx;
        }
      }
      .userName {
        display: flex;
        flex-direction: column;
        .usera {
          font-size: 32rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #000;
          padding: 5rpx 10rpx;
        }
        .user {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          padding: 5rpx 10rpx;
        }
      }
    }
  }
  .moneyListBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 36rpx 0rpx rgba(0, 0, 0, 0.07);
    border-radius: 11rpx;
    margin-top: 10rpx;
    .moneyList {
      width: 690rpx;
      padding: 28rpx 0rpx;
      //   background: #fff;
      //   border-radius: 10rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .item1-arrs {
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          padding-top: 15rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .num {
          font-size: 38rpx;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #222222;
        }
      }
    }
    .Withdrawal {
      width: 290rpx;
      height: 68rpx;
      line-height: 68rpx;
      text-align: center;
      background: linear-gradient(133deg, #fec745 0%, #f9aa0c 100%);
      border-radius: 50rpx;
      margin-bottom: 38rpx;
      margin-top: 20rpx;
      color: #ffffff;
    }
  }
}
.bottomList {
  display: flex;
  flex-direction: column;
  padding: 50rpx 56rpx;
  .bottomListItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 36rpx 0rpx;
    border-bottom: 1rpx solid rgba(151, 151, 151, 0.3);
    .jiantou {
      width: 16rpx;
      height: 27rpx;
      background: url("https://yunbei.lianmengfu.net/xcxpic/icon/jiantou1.png");
      background-size: 100% 100%;
    }
    .titleLeft {
      display: flex;
      align-items: center;
      .titleLeftIcon {
        width: 34rpx;
        height: 35rpx;
      }
    }
    .titleLeftName {
      padding-left: 30rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>