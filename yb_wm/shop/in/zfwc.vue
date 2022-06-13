<template>
  <view class="bigbox">
    <!-- <image src="../../../static/imgs/BIAN.png" mode="" class="img3"></image> -->

    <view class="topbox">
      <view class="paytitle">支付成功</view>
      <view class="contentBox">
        <view class="img">
          <image src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/book.png" mode=""></image>
        </view>
        <view class="textcontent">
          <text>消费金额：{{obj.money ||"0"}}元</text>
          <text>充值金额：{{obj.cmoney || "0"}}元</text>
          <text>赠送金额：{{obj.giveMoney || "0"}}元</text>
          <text style="color: #333333;font-size: 34rpx;">当前余额：{{obj.balance || "0"}}元</text>
        </view>
      </view>
      <view class="listBox">
        <view class="itemone" v-for="(item,index) in coupon.couponList" :key="index">
          <image v-if="lingshow" class="firstimg" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/hongbao-@2x.png" mode=""></image>
          <image v-else class="firstimg" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/hongbao-em@2x.png" mode=""></image>
          <view class="box">
            <text>{{item.money}}元无门槛立减金</text><br>
            <text>{{item.useExplain}}</text>
          </view>
          <!-- lingshow -->
          <image v-if="lingshow" class="lastimg" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/ling.png" mode="" @click="lyhj(index)"></image>
        </view>

      </view>
    </view>
    <view class="bootomBox">
      <image class="imgbox" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/red.png" mode=""></image>
      <view class="btnBox">
        <!-- <button  type="default" class="btn" @tap="ljyq">分享优惠</button> -->
        <template @click="gozl">

          <!-- <button style="width: 100%;"  type="default" class="btn" @click="gozl">{{payType=='' && orderType=='5'?'返回首页':'完善资料更多优惠'}}</button> -->
          <button style="width: 100%;" type="default" class="btn" @click="gozl">{{userinfo==''?'完善资料更多优惠':'返回首页'}}</button>
        </template>
      </view>
    </view>

    <mg-share :co="shareCo" hbs="1" ptype="1" v-model="shareshow" vueId="24422f2e-5" :s="1" @tapshare="tapshare"></mg-share>

    <!-- 	<view v-if="false" class="zfje">
			<view class="zfcg">支付成功</view>
			<view class="font">
				<view class="">消费金额</view>
				<view class="">{{obj.money ||"0"}}元</view>
			</view>
			<view class="font">
				<view class="">充值金额</view>
				<view class="">{{obj.cmoney || "0"}}元</view>
			</view>
			<view class="font">
				<view class="">赠送金额</view>
				<view class="">{{obj.giveMoney || "0"}}元</view>
			</view>
			<view class="font" >
				<view class="" >当前余额</view>
				<view class="ye" style="color: #ff0000;">
					<view >{{obj.balance || "0"}}</view>元
				</view>
			</view>
			<view class="coupon-box" v-for="(item,index) in coupon.couponList" :key="index">
				<view class="coupon">
					<view class="coupon-min">
						<view class="font1">{{item.money}}元无门槛立减金</view>
						<view class="font2">{{item.useExplain}}</view>
					</view>
					<view class="limg" @click="lyhj(index)" v-if="imgshow">领</view>
				</view>
			</view>
		</view>
		<button v-if="false" type="default" class="btn" @click="gozl">{{payType=='' && orderType=='5'?'返回首页':'完善资料更多优惠'}}</button> -->
  </view>

</template>

<script>
import mgShare from 'components/template/share.vue';
import {
  dateFormat
} from '../../utils/common.js'
export default {
  data: function () {
    return {
      userinfo: uni.getStorageSync('userinfo'),
      arr: {},
      parameter: {
        userId: "",
        location: "2",
        storeId: "1"
      },
      coupon: '',
      obj: {},
      // imgshow: true,
      payType: "",
      orderType: "",
      lingshow: true,
      shareshow: !1,
      shareCo: {},
      shareObj: '',
    }
  },
  components: {

    mgShare
  },
  // 修改分享连接地址等
  onShareAppMessage(res) {
    console.log(res, '1111111111111111');
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: this.shareObj.name,
      imageUrl: this.shareObj.icon,
      path: '/yb_wm/index/getredoder?fatheruserid=' + uni.getStorageSync("userId"),

    }
  },
  onLoad: function (i) {
    console.log(i)
    this.payType = i.payType
    this.orderType = i.orderType
    this.$api.member_member__order({
      orderid: i.orderId,
      type: i.orderType
    }).then(res => {
      const {
        data
      } = res
      this.obj = data
      console.log(this.obj, '2222')
    })

    this.parameter.userId = uni.getStorageSync("userId")
    //	获取优惠劵
    this.$api.shop_window__collection(this.parameter).then(res => {
      console.log(res, "1")
      // if (res.windowCoupon == []) {
      // 	this.imgshow = true
      // }
      this.coupon = res.windowCoupon;
    })


    // 获取要分享的商品 展示位
    this.getShareContent()
  },
  methods: {

    //分享微信图标被点击     来自于子组件
    tapshare() {
      this.$api.shop_receive__window__coupon({
        id: this.coupon.id
      }).then(res => {
        // this.imgshow = false
        console.log(res, "999")
        this.lingshow = false;
        uni.showToast({
          title: '领取成功！',
          duration: 2000,
          icon: "none"
        });
      })
    },

    lyhj: function (index) {

      // 点击领取   显示  分享弹出层
      this.shareshow = !0;

    },
    // 获取分享要展示的内容
    getShareContent() {
      var e = this;
      var o;
      this.$api['integral-shop_goods__info']({
        id: 1
      }).then(res => {
        console.log(res, '88888888888888888');
        this.shareObj = res;
      })
    },
    // 分享
    ljyq: function () {
      this.shareshow = !0
    },
    // 授权
    // 获取用户详细信息, 可以获取到说明已经授权过, 直接拿到用户信息
    changeLogin() {

      var _this = this;
      uni.showModal({
        title: '温馨提示',
        content: '亲，授权微信登录后才能正常使用小程序功能',
        success(res) {
          console.log(0)
          console.log(res)
          //如果用户点击了确定按钮
          if (res.confirm) {
            uni.getUserProfile({
              desc: '获取你的昵称、头像、地区及性别',
              success: res => {
                console.log(res);

                // 写入缓存
                uni.setStorageSync('userinfo', res.userInfo);
                console.log(uni.getStorageSync('userinfo'), '保存陈宫')
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
                    console.log(r, "963")
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
                console.log(2);
                console.log(res)
                //拒绝授权
                // uni.showToast({
                // 	title: '您拒绝了请求,不能正常使用小程序',
                // 	icon: 'error',
                // 	duration: 2000
                // });
                uni.switchTab({
                  url: "/pages/tabbar/my/index"
                })
                return;
              }
            });
          } else if (res.cancel) {
            //如果用户点击了取消按钮
            console.log(3);
            uni.switchTab({
              url: "/pages/tabbar/my/index"
            })
            // uni.showToast({
            // 	title: '您拒绝了请求,不能正常使用小程序',
            // 	icon: 'error',
            // 	duration: 2000
            // });
            return;
          }
        }
      });




    },
    gozl() {
      // 判断登录是否过期 userInfo
      const userInfo = uni.getStorage('userInfo');
      console.log(uni.getStorageSync('userinfo'), '信息在这里----------------------');
      console.log(Object.keys(userInfo).length);

      if (uni.getStorageSync('userinfo').length == 0 || uni.getStorageSync('userinfo').userName == "微信用户") {
        this.changeLogin()
      } else {
        this.sub(userInfo)
      }


      // if (this.payType == "" && this.orderType == '5') {
      // 	uni.reLaunch({
      // 		url: "../../index/index"
      // 	})
      // } else {
      // 	this.$api.login_save__user().then(res => {
      // 		if (res.data.realName == null || res.data.userTel == null || res.data.sex == null ||res.data.birthday == null) {
      // 			uni.reLaunch({
      // 				url: "../../order/vip/open"
      // 			})
      // 		} else {
      // 			uni.reLaunch({
      // 				url: '/yb_wm/order/vip/wkk'
      // 			})

      // 		}
      // 	})
      // }


    },
    // 登录未过期
    sub(res) {
      var _this = this;
      console.log(res);
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
        console.log(r, "963")
        uni.switchTab({
          url: "/pages/tabbar/my/index"
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
page {
  background: #ffffff;
}
.bigbox {
  // background: #FFFFFF;
  width: 100%;
  height: 60%;
  padding: 0 24rpx;
  position: relative;

  .topbox {
    width: 95%;
    height: 100%;
    background-color: #fff7e0;
    margin: 20rpx auto;
    margin-bottom: 0rpx;

    .paytitle {
      width: 100%;
      height: 100rpx;
      color: #000000;
      font-size: 46rpx;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 100rpx 0;
      padding-bottom: 30rpx;
    }

    .contentBox {
      width: 83%;
      // height: 300rpx;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      margin: 50rpx auto;
      margin-top: 100rpx;

      .img {
        width: 130rpx;
        height: 145rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }

      .textcontent {
        // width: 250rpx;
        height: 220rpx;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 28rpx;
        color: #666666;
      }
    }

    .listBox {
      width: 90%;
      height: 300rpx;
      padding-bottom: 100rpx;
      margin: 20rpx auto;
      margin-top: 80rpx;
      overflow-y: scroll;
      .itemone {
        width: 100%;
        height: 140rpx;
        background: #ffffff;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 20rpx;

        .firstimg {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
        }

        .box {
          width: 60%;
          height: 90rpx;
          text:first-child {
            font-size: 32rpx;
          }
        }

        .lastimg {
          width: 80rpx;
          height: 60rpx;
        }
      }
    }
  }

  .bootomBox {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-end;
    // justify-content: flex-end;
    position: relative;
    .imgbox {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .btnBox {
      width: 90%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}

.img3 {
  width: 710rpx;
  height: 940rpx;
}

.zfje {
  width: 660rpx;
  height: 896rpx;
  display: flex;
  flex-direction: column;
  font-size: 26rpx;
  padding: 40rpx 30rpx 0 30rpx;
  position: absolute;
  top: 70rpx;
  left: 50rpx;
}

.zfje .zfcg {
  font-size: 20rpx;
  color: #ed5d36;
  text-align: center;
  margin-bottom: 30rpx;
}

.zfje .font {
  display: flex;
  justify-content: space-between;
  margin: 0 123rpx 18rpx 123rpx;
  align-items: flex-end;
}

.zfje .font .ye {
  display: flex;
  align-items: flex-end;
}

.coupon-box {
  height: 350rpx;
  overflow-x: hidden;
  overflow-y: scroll;
}

.coupon {
  width: 100%;
  height: 168rpx;
  //   background-image: url(../../../static/imgs/矩形%204.png);
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}

.coupon .coupon-min {
  width: 320rpx;
  border-left: 2rpx dashed #eeeeee;
  margin: 0 auto;
  padding-left: 20rpx;
  text-align: center;
}

.coupon .limg {
  width: 190rpx;
  height: 102rpx;
  //   background-image: url(../../../static/imgs/矩形%204%20拷贝.png);
  background-size: 100% 100%;
  position: absolute;
  right: -70rpx;
  top: 30rpx;
  line-height: 102rpx;
  color: #fecf13;
  font-size: 36rpx;
  padding-left: 40rpx;
}

.coupon .font1 {
  font-size: 28rpx;
  margin-top: 40rpx;
}

.coupon .font2 {
  font-size: 20rpx;
  color: #999999;
  margin-top: 10rpx;
}

.btn {
  width: 43%;
  height: 74rpx;
  color: #fe4d33;
  text-align: center;
  line-height: 74rpx;
  font-size: 36rpx;
  border-radius: 50rpx;
  margin-top: 100rpx;
  background: linear-gradient(#ffe8cd, #fee3bf) !important;
  margin-bottom: 50rpx;
}
</style>
