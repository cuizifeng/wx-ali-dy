<template>
  <view class="wrap" style="background-image: url('https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/01/10/202201101651129071.png');background-size: cover;background-repeat: no-repeat;">
    <view class="wrapBox">
      <view class="content">
        <image src="https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/01/10/202201101650598013.png" mode=""></image>

        <view v-if="coupon.couponList" class="price">
          <text>{{coupon.couponList[0].money|filtertext}}</text>
        </view>

        <view v-if="coupon.couponList" class="pricetext">
          <text>{{coupon.couponList[0].explain}}</text>
          <text>{{coupon.couponList[0].useExplain}}</text>
        </view>

      </view>

      <view class="btn" @tap="goshouyin">
        <image src="https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/01/10/202201101812098432.png" mode=""></image>
      </view>
      <!-- <button class="subbtn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber"></button> -->
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      parameter: {
        userId: "",
        location: "2",
        storeId: "1"
      },
      coupon: {},
      fatherUserid: '',
      userId: ''
    }
  },
  filters: {
    filtertext(t) {
      if (t.indexOf('.')) {
        let pointindex = t.indexOf('.');
        let str = t.substr(0, pointindex);
        return str
      } else {
        return t
      }

    }
  },
  onLoad(params) {
    // 获取分享者的userid
    this.fatherUserid = params.fatheruserid;

    // 被分享者进入页面触发登录
    uni.login({
      success: (res) => {
        const { code } = res
        console.log(code)
        this.$api.login_login({
          code: code
        }).then(r => {
          this.userId = r.userId
          uni.setStorageSync("userId", r.userId)


          //	获取优惠劵
          this.getData();

        })
      }
    })



  },
  methods: {
    // 跳转收银
    goshouyin() {
      uni.reLaunch({
        url: "/pages/individualAccount/Collection/index"
      })
    },
    getData() {
      this.$api.shop_window__collection(this.parameter).then(res => {
        console.log(res, "1")
        // if (res.windowCoupon == []) {
        // 	this.imgshow = true
        // }
        this.coupon = res.windowCoupon;
        this.lyhj();
      })
    },
    // 领取优惠券  需要将个人id  以及发起者id回传   明天问一下
    lyhj() {
      this.$api.shop_receive__window__coupon({
        id: this.coupon.id,
        shareuser: this.fatherUserid
      }).then(res => {
        console.log(res, "999")
      })
    },
    onGetPhoneNumber(res) {
      console.log(res);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  position: relative;
  .wrapBox {
    width: 88%;
    // height: 800rpx;
    // background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    top: 500rpx;
    left: 6%;
    .content {
      width: 100%;
      height: 550rpx;
      // background: red;
      margin: 0 auto;
      // margin-top: 200rpx;
      // position: absolute;
      // top: 100rpx;
      // left: 6%;
      position: relative;
      image {
        width: 100%;
        height: 100%;
      }

      .price {
        width: 80%;
        height: 100rpx;
        // background: cyan;
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 28%;
        left: 8%;

        text:first-child {
          font-size: 120rpx;
          color: red;
          font-weight: bold;
        }
      }

      .pricetext {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 47%;
        left: 30%;
        text {
          color: #f2bc96;
          font-size: 20rpx;
        }
      }
    }

    .btn {
      width: 90%;
      height: 130rpx;
      margin: 0 auto;
      margin-top: 10%;
      image {
        width: 100%;
        height: 100%;
      }
      // .subbtn{
      // 	width:100%;
      // 	height: 100%;
      // 	background: none;
      // 	background-image: url(https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/01/10/202201101812098432.png);
      // 	background-size: cover;
      // }
    }
  }
}
</style>
