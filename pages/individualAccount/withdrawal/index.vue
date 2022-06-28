<template>
  <view>
    <navBar :title="'提现'" :leftView="platform==1" :backgroundColor="'linear-gradient(to right, #FEC745, #F9AA0C)'" :wordColor="'#fff'">
      <view class="topImg" slot="userVip"></view>
    </navBar>
    <view class="memberBox" :style="{marginTop:contentTop}">
      <view class="moneyBox">
        <view class="kt">可提现金额（元）</view>
        <view class="money"> <text class="font">￥</text> {{config.money || '0.00'}}</view>
      </view>

      <view class="content">
        <view class="item1">
          <view class="title">提现金额<text class="tip">最低提现金额{{config.downMoney}}元</text> </view>
          <view class="inputMoney line">
            <view class="money"> <text class="font">¥</text> <input class="inputMoneyUser" placeholder="请输入提现金额" placeholder-style="font-size:30rpx" type="digit" focus="true" maxlength="8" v-model="params.money" /></view>
            <view class="moneyAll" @click="setAllMoney">全部提现</view>
          </view>
          <view class="title">提现方式</view>

          <view class="payType" @click="setPayType(4)">
            <view class="payTypeLeft">
              <image class="Icon" :src="yue" mode="aspectFill" /> 提现至余额
            </view>
            <image class="payTypeRight" :src="params.type == 4 ? G : H" mode="aspectFill" />
          </view>
          <!-- #ifdef MP-WEIXIN -->
          <view class="payType line" @click="setPayType(1)">
            <view class="payTypeLeft">
              <image class="Icon" :src="weixin" mode="aspectFill" /> 提现至微信
            </view>
            <image class="payTypeRight" :src="params.type == 1 ? G : H" mode="aspectFill" />
          </view>
          <!-- #endif -->
          <!-- #ifdef MP-ALIPAY -->
          <view class="payType line" @click="setPayType(2)">
            <view class="payTypeLeft">
              <image class="Icon" :src="alipay" mode="aspectFill" /> 提现至支付宝
            </view>
            <image class="payTypeRight" :src="params.type == 2 ? G : H" mode="aspectFill" />
          </view>
          <!-- #endif -->
          <view class="payType line">
            <view class="title">结算周期</view>
            <view class="title">t+1</view>
          </view>

          <view class="title">提现说明</view>
          <view class="textarea">
            <rich-text :nodes="explain"></rich-text>
          </view>

          <view class="txbtn" @click="bonus">提现</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { config, bonusWithdrawal } from "@/api/my.js";
import { Tips, formatRichText, getSystemInfo } from "@/utils/miniUtils.js";
export default {
  data() {
    return {
      contentTop: '',
      weixin: 'https://yunbei.lianmengfu.net/xcxpic/icon/weixin1.png',
      alipay: 'https://yunbei.lianmengfu.net/xcxpic/icon/zfbflag.png',
      yue: 'https://yunbei.lianmengfu.net/xcxpic/icon/yue1.png',
      H: 'https://yunbei.lianmengfu.net/xcxpic/icon/h1.png',
      G: 'https://yunbei.lianmengfu.net/xcxpic/icon/g1.png',

      params: {
        item: 1,   // 1老带新2全员销售3分销商
        type: 4,   //提现方式,1微信,2支付宝3银联,4.余额
        money: '', //提现的钱
      },
      ident: '',//老带新 ==》 oldWithNewWithdrawalSet  分销商 ==》 distributionWithdrawalSet
      config: {},//页面数据
      explain: '',
      platform: 1,//判断平台1微信 2支付宝
    }
  },
  onLoad(options) {
    //#ifdef MP-ALIPAY
    this.platform = 2
    //#endif
    //#ifdef MP-WEIXIN
    this.platform = 1
    //#endif
    this.params.item = options.item ? options.item : 1;
    this.init(options.ident)
    getSystemInfo().then(res => { this.contentTop = res.contentTop })
  },
  methods: {
    init(type) {
      config({ ident: type }).then(res => {
        this.config = res.data;
        this.explain = formatRichText(res.data.explain)
      })
    },
    //选择支付方式
    setPayType(event) {
      this.params.type = event;
    },

    //提现
    bonus() {
      let reg = new RegExp(/^\d{0,10}?\.?\d{1,2}$/);
      if (!this.params.money) {
        return Tips({ title: '请输入提现金额' })
      } else if (!reg.test(this.params.money)) {
        return Tips({ title: '金额输入不正确' })
      } else if (this.params.money < this.config.downMoney) {
        return Tips({ title: '金额需大于最低提现金额' })
      } else if (this.config.money < this.params.money) {
        return Tips({ title: '输入金额大于可提现金额' })
      } else {
        bonusWithdrawal(this.params).then(res => {
          if (res.code == 1) {
            return uni.reLaunch({
              url: '/pages/individualAccount/withdrawalSucceeded/index'
            });
          } else {
            return Tips({ title: res.msg, end: 3000 })
          }
        })
      }
    },

    //全部提现
    setAllMoney() {
      this.params.money = this.config.money;
    }
  },
}
</script>

<style lang="scss" scoped>
.topImg {
  width: 750rpx;
  height: 322rpx;
  background: url("https://yunbei.lianmengfu.net/xcxpic/icon/txbg.png");
  background-size: 100% 100%;
}
.memberBox {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  right: 0rpx;
  bottom: 0rpx;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  .moneyBox {
    padding: 20rpx 73rpx;
    display: flex;
    flex-direction: column;
    .kt {
      font-size: 26rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
    }
    .money {
      padding-top: 10rpx;
      font-size: 70rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      .font {
        font-size: 40rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item1 {
      width: 690rpx;
      background: #ffffff;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.11);
      border-radius: 14rpx;
      padding: 0rpx 33rpx;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 26rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        display: flex;
        align-items: center;
        padding: 20rpx 0rpx;
        .tip {
          font-size: 22rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f03700;
          padding-left: 10rpx;
        }
      }
      .line {
        border-bottom: 1rpx solid #dedede;
      }
      .inputMoney {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0rpx;
        .money {
          font-size: 64rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #333333;
          display: flex;
          align-items: center;
          .inputMoneyUser {
            height: 100%;
            text-align: left;
            font-size: 64rpx;
            color: #000;
            // font-weight: 600;
            background: #fff;
            caret-color: #09bb07;
          }
          .font {
            font-size: 60rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            padding-right: 10rpx;
          }
        }
        .moneyAll {
          width: 200rpx;
          padding-top: 40rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff8809;
        }
      }
      .payType {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0rpx;
        .payTypeLeft {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          .Icon {
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
          }
        }
        .payTypeRight {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .textarea {
        width: 630rpx;
        // height: 160rpx;
        background: #f6f6f6;
        border-radius: 10rpx;
        padding: 10rpx;
      }
      .txbtn {
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
        margin: 50rpx auto;
      }
    }
  }
}
</style>