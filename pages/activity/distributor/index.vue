<template>
  <view>
    <navBar :title="'分销商'" :backgroundColor="'#0000'" :wordColor="'#000'">
      <view slot="userVip" class="distributorBg"></view>
    </navBar>

    <view class="memberBox">
      <view class="membershipCard">
        <view class="membershipCard_top">
          <view class="membershipCard_top_left">
            <image class="Img" :src="user.portrait || userImg" mode="aspectFit" />
            <view class="userName" v-if="userObj.name && userObj.examineAt">
              <view class="usera">{{userObj.name}}</view>
              <view class="user">{{userObj.examineAt}}</view>
            </view>
          </view>
          <view class="companyInfo" @click="toggle('bottom')">邀请伙伴</view>
          <!-- <button open-type="share"open-type="share" class="companyInfo">邀请伙伴</button> -->
        </view>
        <view class="membershipCard_bottom">
          <view class="membershipCard_bottom_item">
            <view class="item_num">{{getDistribution.allMoney || '0.00'}}</view>
            <view class="item_name">累计佣金</view>
          </view>
          <view class="membershipCard_bottom_line"></view>

          <view class="membershipCard_bottom_item">
            <view class="item_num">{{getDistribution.people || 0}}</view>
            <view class="item_name">伙伴</view>
          </view>
        </view>
      </view>

      <!-- money -->
      <view class="moneyListBox">
        <view class="moneyList">
          <view class="item1-arrs">
            <view :class="['num']">{{getDistribution.wait || '0.00'}}</view>
            <view class="name">在路上</view>
          </view>
          <view class="item1-arrs">
            <view :class="['num']">{{getDistribution.userMoney || '0.00'}}</view>
            <view class="name">可提现</view>
          </view>
          <view class="item1-arrs">
            <view :class="['num']">{{getDistribution.frozen || '0.00'}}</view>
            <view class="name">提现中</view>
          </view>
          <view class="item1-arrs">
            <view :class="['num']">{{getDistribution.alreadyMoney || '0.00'}}</view>
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
          <image class="titleLeftIcon" :src="item.icon" mode="aspectFit" />
          <view class="titleLeftName"> {{item.title}} </view>
        </view>
        <view class="jiantou"></view>
      </view>
    </view>

    <uni-popup ref="popup" :safe-area="safeArea" @change="change">
      <view class="popup-content">
        <view class="title">
          <view class="line"></view>
          <view class="titleText">分享到</view>
          <view class="line"></view>
        </view>
        <view class="list">
          <button class="item" open-type="share">
            <image class="itemIcon" src="https://yunbei.lianmengfu.net/xcxpic/icon/share.png" mode="aspectFit" />
            <view class="itemText">分享好友</view>
          </button>
          <button class="item" @click="goPoster">
            <image class="itemIcon" src="https://yunbei.lianmengfu.net/xcxpic/icon/dow.png" mode="aspectFit" />
            <view class="itemText">海报分享</view>
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { distribution, config, applyDistributionGet } from '@/api/my.js';
import { showModal } from "@/utils/miniUtils.js"
export default {
  data() {
    return {
      safeArea: false,
      getDistribution: {},//页面数据
      list: [
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/dingdan.png',
          title: '分销订单',
          url: '/pages/orderAll/team/index'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/tuandui.png',
          title: '我的团队',
          url: '/pages/orderAll/distributionOrder/index'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/mingxi.png',
          title: '提现明细',
          url: '/pages/orderAll/withdrawalDetails/index?item=' + 2

        }
      ],

      type: 'bottom',
      userObj: {},
      //   portrait: uni.getStorageSync('portrait'),
      shareObj: '',
      userImg: 'https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/11/08/202111081355422543.png'
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      distribution().then(res => {
        this.getDistribution = res.data
      })
      config({ ident: 'distributionSet' }).then(res => {
        this.shareObj = res.data
      })
      applyDistributionGet().then(res => {
        if (res.data.name) {
          this.userObj = res.data
        } else {
          //   showModal({ content: res.msg, type: 3, showCancel: false })
        }
      })
    },

    //提现
    withdrawal() {
      uni.navigateTo({
        url: '/pages/individualAccount/withdrawal/index?item=' + 2 + '&ident=' + 'distributionWithdrawalSet'
      });
    },

    jump(url) {
      if (url) {
        uni.navigateTo({
          url,
        })
      }
    },

    toggle(type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type)
    },
    change(e) {
      //   console.log('当前模式：' + e.type + ',状态：' + e.show);
    },

    goPoster() {
      this.$refs.popup.close()
      uni.navigateTo({
        url: '/pages/user/downloadPoster/index?shareIcon=' + this.shareObj.shareAd
      })
    }
  },

  onShareAppMessage: function () {
    this.$refs.popup.close()
    return {
      title: this.shareObj.shareTitle,
      path: '/pages/activity/apply/index?uid=' + uni.getStorageSync('userId'),
      imageUrl: this.shareObj.shareIcon
    }
  }
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
        width: 170rpx;
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
          width: 105rpx;
          height: 105rpx;
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
          color: #ffffff;
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
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  padding: 20rpx 0rpx 60rpx 0rpx;
  .title {
    display: flex;
    align-items: center;
    .titleText {
      padding: 0rpx 20rpx;
      font-size: 32rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #222222;
    }
    .line {
      width: 96rpx;
      border-bottom: 1rpx solid #dedede;
    }
  }
  .list {
    width: 750rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15rpx 40rpx 0rpx 40rpx;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: none;
      background-color: transparent;
      outline: none;
      .itemIcon {
        width: 88rpx;
        height: 88rpx;
      }
      .itemText {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        // padding: 18rpx 0rpx;
      }
    }
  }
}
</style>