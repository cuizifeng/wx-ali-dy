<template>
  <view>
    <navBar :title="'申请'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>

    <swiper class="swiper-box">
      <swiper-item v-for="(item, index) in info" :key="index">
        <view class="swiper-item">
          <image class="Img" :src="item.url" mode="" />
        </view>
      </swiper-item>
    </swiper>

    <view class="content">
      <view class="apply">
        <view class="applyTitle">填写资料</view>
        <view class="inpBoxUser">
          <view class="leftText">姓名</view>
          <input placeholder="请输入姓名" trim="all" v-model="from.name" />
        </view>
        <view class="inpBoxUser">
          <view class="leftText">手机号</view>
          <input trim="all" v-model="from.tel" placeholder="请输入手机号" />
        </view>

        <view class="agreement">
          <view @click="setChecked">
            <radio :checked="checked" style="transform:scale(0.7);" color="#EA4702" /> 我已阅读并同意
          </view>
          <!-- <text class="agreementText">《储值协议》</text> -->
        </view>
      </view>

      <view class="Submit" @click="submit">提交</view>
    </view>
  </view>
</template>

<script>
import { Tips, getUrlParams } from "@/utils/miniUtils.js"
import { applyDistribution } from "@/api/my.js"
export default {
  components: {},
  data() {
    return {
      info: [{
        url: 'https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/04/01/202204011802077722.png',
      }
      ],
      from: {
        name: '',
        tel: '',
        uid: 0
      },
      checked: false,
    }
  },
  onLoad(options) {
    if (options.uid) {
      this.from.uid = options.uid
    } else if (options.scene) { //扫码携带参数处理
      var value = getUrlParams(decodeURIComponent(options.scene));
      this.from.uid = value
    } else {
      this.from.uid = 0
    }
    if (this.from.uid != 0) {
      this.getLoginInfo({ flag: true, inviteId: this.from.userId, type: 2 }).then(res => {
        uni.setStorageSync('userId', res.userId)
        getApp().globalData.session_key = res.session_key;
      })
    }
  },
  methods: {
    setChecked() {
      this.checked = !this.checked
    },

    //提交申请
    submit() {
      var tel = this.from.tel.replace(/\s/g, "");//去除空格
      //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
      let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (!this.checked) {
        uni.showModal({
          title: '提示',
          content: '请勾选我已阅读并同意《储值协议》',
          success(res) { }
        })
      } else {
        if (!this.from.name) {
          return uni.showToast({ title: '请输入姓名', icon: 'none', duration: 2000 })
        } else if (!regs.test(tel)) {
          uni.showToast({ title: '手机号输入格式不对', icon: 'none', duration: 2000 })
        } else {
          applyDistribution(this.from).then(res => {
            if (res.code == 1) {
              return Tips({ title: '申请成功', type: 4, url: '/pages/tabbar/my/index', end: 3000 })
            } else {
              return Tips({ title: res.msg, })
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .apply {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 690rpx;
    background: #ffffff;
    box-shadow: 0rpx 10rpx 15rpx 0rpx rgba(0, 0, 0, 0.02);
    border-radius: 0rpx 0rpx 6rpx 6rpx;
    padding: 20rpx 31rpx;
    .applyTitle {
      text-align: center;
      font-size: 30rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #333333;
    }
    .inpBoxUser {
      height: 94rpx;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid rgba(151, 151, 151, 0.3);
      .leftText {
        width: 120rpx;
        height: 94rpx;
        line-height: 94rpx;
        text-align: left;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      input {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000;
      }
    }

    .agreement {
      padding-top: 40rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      display: flex;
      align-items: center;
      .agreementText {
        color: #2082eb;
      }
    }
  }
  .Submit {
    margin: 66rpx auto;
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
}
.swiper-box {
  height: 240rpx !important;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750rpx;
  height: 240rpx;
  .Img {
    width: 750rpx !important;
  }
}

/* #ifndef APP-NVUE */
::v-deep .image img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/* #endif */

@media screen and (min-width: 500px) {
  .uni-swiper-dot-box {
    width: 400px;
    margin: 0 auto;
    margin-top: 8px;
  }

  .image {
    width: 100%;
  }
}

.uni-bg-red {
  background-color: #ff5a5f;
}

.uni-bg-green {
  background-color: #09bb07;
}

.uni-bg-blue {
  background-color: #007aff;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 20rpx;
}

.example-body-item {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15rpx;
  padding: 15rpx;
  height: 60rpx;
  /* #ifndef APP-NVUE */
  display: flex;
  padding: 0 15rpx;
  /* #endif */
  flex: 1;
  border-color: #e5e5e5;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}

.example-body-item-text {
  font-size: 28rpx;
  color: #333;
}

.example-body-dots {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50px;
  background-color: #333333;
  margin-left: 10rpx;
}

.active {
  border-style: solid;
  border-color: #007aff;
  border-width: 1px;
}
</style>