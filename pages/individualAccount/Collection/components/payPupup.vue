<template>
  <view :class="['upBox', !show ? 'fadelogIn' : '']" v-if="!show">
    <view class="popUp">
      <view>
        <view class="title" @click="close">
          <view></view>
          <view>储值立享更多优惠</view>
          <view class="titleImg">x</view>
        </view>
        <view class="line">
          <view class="dashed"></view>
        </view>

        <view style="width:750rpx">
          <scroll-view class="scroll_view" scroll-x="true">
            <view class="tab_first" v-for="(item, index) in list" :key="index" @click="rechargeBtn(index)">
              <image v-if="index === activeIndex" src="https://yunbei.lianmengfu.net/xcxpic/icon/kaquan2.png" mode="aspectFit" />
              <image v-else src="https://yunbei.lianmengfu.net/xcxpic/icon/kaquan1.png" mode="aspectFit" />
              <view class="tab_first_center">
                <rich-text :nodes="setdecimalPoint(item.money,25,10, index == activeIndex ? '#fff' : '#333333')"></rich-text>
                <view :class="['song',index === activeIndex ? 'songYes' : '']">送{{item.giveMoney}}元</view>
              </view>
            </view>
          </scroll-view>
        </view>

        <view :class="['confirmPayment',checked ? 'confirmPaymentYes' : '']" @click="confirmPayment">确认支付 {{params.money}}</view>

        <view class="agreement">
          <view @click="setChecked">
            <radio :checked="checked" style="transform:scale(0.7);" color="#EA4702" /> 我已阅读并同意
          </view> <text class="agreementText">《储值协议》</text>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
import { decimalPoint } from "@/utils/miniUtils.js";
import { message } from 'common/util';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Boolean | String,
      default: null
    },
    params: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      indicator: false,
      checked: false,
    }
  },

  methods: {
    close() {
      this.$emit('goPay')
    },
    setChecked() {
      this.checked = !this.checked
    },
    setdecimalPoint(e, a, b, c) {
      return decimalPoint(e, a, b, c)
    },

    rechargeBtn(event) {
      this.$emit('setRecharge', event)
    },
    confirmPayment() {
      if (!this.checked) { return message("请点击阅读并同意储值协议", 3) }
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>
.upBox {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  right: 0rpx;
  bottom: 0rpx;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
}

.popUp {
  width: 750rpx;
  position: absolute;
  left: 0rpx;
  bottom: 0rpx;
  z-index: 9;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.title {
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  text-align: center;
  padding: 5rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .titleImg {
    font-weight: 600;
    font-size: 36rpx;
  }
}
.line {
  padding: 20rpx 30rpx;
  .dashed {
    height: 5rpx;
    border: 1rpx dashed #eee;
  }
}

.confirmPayment {
  width: 466rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: #c2c2c2;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  margin: 15rpx auto;
  border-radius: 50rpx;
}
.confirmPaymentYes {
  background: linear-gradient(227deg, #fac763 0%, #fab222 100%) !important;
}

.scroll_view {
  white-space: nowrap;
}
.tab_first {
  margin: 10rpx 20rpx 20rpx 40rpx;
  display: inline-block;
  width: 260rpx;
  height: 150rpx;
  position: relative;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 260rpx;
    height: 150rpx;
  }
  .tab_first_center {
    width: 260rpx;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .song {
      font-size: 23rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .songYes {
      color: #fff;
    }
  }
}
.agreement {
  padding-top: 20rpx;
  padding-bottom: 30rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
  .agreementText {
    color: #2082eb;
  }
}
.fadelogIn {
  -webkit-animation: fadelogIn 0.6s;
  animation: fadelogIn 0.6s;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
}

@keyframes fadelogIn {
  0% {
    -webkit-transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes fadelogIn {
  0% {
    -webkit-transform: translate3d(0, 100%, 0);
  }
  100% {
    -webkit-transform: none;
  }
}
</style>