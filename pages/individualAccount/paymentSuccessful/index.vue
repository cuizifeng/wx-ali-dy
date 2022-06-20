<template>
  <view>
    <navBar :title="'支付成功'" :backgroundColor="'#0000'" :wordColor="'#fff'"></navBar>
    <image class="icon" src="https://yunbei.lianmengfu.net/xcxpic/icon/juxing.png" mode="widthFix" />

    <view class="payment">
      <image class="wangcheng" src="https://yunbei.lianmengfu.net/xcxpic/icon/wancheng.png" mode="widthFix" />
      <view class="text">支付成功</view>
      <view class="money"><text class="moneyIcon">￥</text>{{moneyObj.money ||"0.00"}}</view>

      <view class="line">
        <view class="notice" :style="{height: height + 'rpx'}">
          <view class="noticeTop">
            <view v-if="height > 100">充值金额： <text>{{moneyObj.cmoney || "0.00"}}元</text>
            </view>
            <view v-if="height > 200">赠送金额：<text>{{moneyObj.giveMoney || "0.00"}}元</text>
            </view>
            <view v-if="height > 250">当前金额：<text style="color:#FABF48">{{moneyObj.balance || "0.00"}}元</text>
            </view>
          </view>

          <view class="collectCoupons">
            <view v-if="couponList.length > 0">
              <scroll-view class="scroll_view" scroll-x="true">
                <view class="titleCoupon">
                  <image class="titleCouponImg" src="https://yunbei.lianmengfu.net/xcxpic/icon/leftline.png" mode="widthFix" />
                  <view class="titleCouponText">优惠券</view>
                  <image class="titleCouponImg" src="https://yunbei.lianmengfu.net/xcxpic/icon/rightline.png" mode="widthFix" />
                </view>
                <view class="tab_first" v-for="(item,index) in couponList" :key="index" @click="collectCoupons">
                  <view class="tab_first_top">
                    <rich-text :nodes="setdecimalPoint(item.money,20,10,'#FF5600')"></rich-text>
                    <view class="couponName">{{item.explain}}</view>
                  </view>
                  <image class="couponIcon" v-if="show" src="https://yunbei.lianmengfu.net/xcxpic/icon/lq.png" mode="widthFix" />
                  <image class="couponIcon" v-else src="https://yunbei.lianmengfu.net/xcxpic/icon/yl.png" mode="widthFix" />
                </view>
              </scroll-view>
            </view>

            <view v-else class="zanwu">暂无优惠券~</view>
          </view>
        </view>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="goHome" @click="gozl"> {{userinfo == "" ? '完善资料更多优惠' : '返回首页'}}</view>
    <!-- #endif  -->

    <!--  #ifdef MP-ALIPAY -->
    <view class="goHome" @click="goHome"> 返回首页</view>
    <!-- #endif -->

  </view>
</template>

<script>
import { decimalPoint } from "@/utils/miniUtils.js";
import { receiveWindowCoupon } from "@/api/coupon.js";
export default {
  data() {
    return {
      userinfo: uni.getStorageSync('userinfo'),
      height: 0,
      setTime: null,
      payType: '',
      orderType: '',
      moneyObj: {},
      parameter: {
        userId: uni.getStorageSync("userId"),
        location: "2",
        storeId: "1"
      },
      show: true,//领取假状态
      coupon: {},//领取优惠券组 id
      couponList: [],//优惠券列表
    }
  },

  onLoad: function (options) {
    this.payType = options.payType || ''
    this.orderType = options.orderType || ''
    this.$api.member_member__order({
      orderid: options.orderId,
      type: options.orderType
    }).then(res => {
      this.moneyObj = res.data
    })

    //	获取优惠劵
    this.$api.shop_window__collection(this.parameter).then(res => {
      this.coupon = res.windowCoupon;
      if (res.windowCoupon && res.windowCoupon.couponList.length > 0) {
        this.couponList = res.windowCoupon && res.windowCoupon.couponList;
      }
    })
  },

  mounted() {
    this.setHeight()
  },

  methods: {
    setHeight() {
      this.setTime = setInterval(() => {
        if (this.height < 698) {
          this.height = ++this.height
        } else {
          clearInterval(this.setTime)
        }
      }, 3)
    },

    goHome() {
      uni.switchTab({
        url: '/pages/tabbar/index/index'
      });
    },

    setdecimalPoint(e, a, b, c) {
      return decimalPoint(e, a, b, c)
    },


    //领取优惠券
    collectCoupons() {
      uni.showLoading({ title: '领取中...' });
      receiveWindowCoupon({ id: this.coupon.id }).then(res => {
        if (res.code == 0) {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon: "none"
          });
        } else {
          this.show = false;
          uni.showToast({
            title: '领取成功！',
            duration: 2000,
            icon: "none"
          });
        }
      })
    },


    gozl() {
      // 判断登录是否过期 userInfo
      const userInfo = uni.getStorage('userInfo');
      if (uni.getStorageSync('userinfo').length == 0 || uni.getStorageSync('userinfo').userName == "微信用户") {
        this.changeLogin()
      } else {
        this.sub(userInfo)
      }
    },

    // 登录未过期
    sub(res) {
      var _this = this;
      if (res.gender == 0) {
        res.gender = "男"
      } else {
        res.gender = "女"
      }
      _this.$api.login_save__user({
        sex: res.gender,
        portrait: res.avatarUrl,
        userName: res.nickName,
        now: 1
      }).then(r => {
        uni.switchTab({
          url: "/pages/tabbar/my/index"
        })
      })
    },

    goHome() {
      uni.reLaunch({
        url: "/pages/tabbar/my/index"
      })
    },

    // 授权
    // 获取用户详细信息, 可以获取到说明已经授权过, 直接拿到用户信息
    changeLogin() {

      var _this = this;
      uni.showModal({
        title: '温馨提示',
        content: '亲，授权微信登录后才能正常使用小程序功能',
        success(res) {
          //如果用户点击了确定按钮
          if (res.confirm) {
            uni.getUserProfile({
              desc: '获取你的昵称、头像、地区及性别',
              success: res => {
                // 写入缓存
                uni.setStorageSync('userinfo', res.userInfo);
                setTimeout(() => {
                  if (res.userInfo.gender == 0) {
                    res.userInfo.gender = "男"
                  } else {
                    res.userInfo.gender = "女"
                  }
                  _this.$api.login_save__user({
                    sex: res.userInfo.gender,
                    portrait: res.userInfo.avatarUrl,
                    userName: res.userInfo.nickName,
                    now: 1
                  }).then(r => {
                    let url
                    if (!r.data.birthday) {
                      // 如果没填写过个人信息去填写
                      url = "/yb_wm/my/other/bjzl"
                    } else {
                      // 填过直接跳会员页面
                      url = "/pages/tabbar/my/index"
                    }
                    uni.reLaunch({
                      url: url
                    })
                  })
                }, 0)

              },
              fail: res => {
                uni.switchTab({
                  url: "/pages/tabbar/my/index"
                })
              }
            });
          } else if (res.cancel) {
            //如果用户点击了取消按钮
            uni.switchTab({
              url: "/pages/tabbar/my/index"
            })
          }
        }
      });
    },

  },
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  width: 750rpx;
  z-index: -1;
}
.payment {
  display: flex;
  flex-direction: column;
  align-items: center;
  .wangcheng {
    margin-top: 10rpx;
    width: 116rpx;
    height: 116rpx;
  }
  .text {
    font-size: 26rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    padding-top: 10rpx;
  }
  .money {
    font-size: 60rpx;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #ffffff;
    .moneyIcon {
      font-size: 30rpx;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .line {
    width: 639rpx;
    height: 21rpx;
    background: #fff;
    border-radius: 20rpx;
    margin-top: 10rpx;
    position: relative;
    // overflow: hidden;
    .notice {
      position: absolute;
      top: -15rpx;
      left: 35rpx;
      width: 568rpx;
      overflow: hidden;
      //   height: 391rpx;
      background: url("https://yunbei.lianmengfu.net/xcxpic/icon/cg.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   justify-content: center;
      .noticeTop {
        padding-top: 130rpx;
      }
      .collectCoupons {
        width: 460rpx;
        height: 280rpx;
        background: #ffe8bb;
        border-radius: 20rpx;
        padding: 10rpx 30rpx;
        .zanwu {
          text-align: center;
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
        }
        .scroll_view {
          white-space: nowrap;
          .titleCoupon {
            padding-bottom: 10rpx;

            display: flex;
            justify-content: center;
            align-items: center;
            .titleCouponImg {
              width: 75rpx;
              height: 4rpx;
            }
            .titleCouponText {
              font-size: 22rpx;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #fca700;
              padding: 0rpx 10rpx;
            }
          }
        }
        .tab_first {
          display: inline-block;
          width: 144rpx;
          height: 177rpx;
          background-image: url("https://yunbei.lianmengfu.net/xcxpic/icon/lqbg.png");
          background-size: 100% 100%;
          position: relative;
          margin-left: 20rpx;
          .tab_first_top {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0rpx !important;
            .couponName {
              font-size: 18rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ff5600;
            }
          }

          .couponIcon {
            position: absolute;
            left: 38rpx;
            bottom: 10rpx;
            width: 68rpx;
            height: 68rpx;
          }
        }
      }
      view {
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        padding: 10rpx 0rpx;
        text {
          padding-left: 20rpx;
        }
      }
    }
  }
}
.goHome {
  width: 568rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: linear-gradient(227deg, #fac763 0%, #fab222 100%);
  margin: 0rpx auto;
  margin-top: 800rpx;
  border-radius: 50rpx;
}
</style>