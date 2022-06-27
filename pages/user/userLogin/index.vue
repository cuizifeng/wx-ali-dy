<template>
  <view class="content">
    <view class="topimg p-r ">
      <mg-img class="" :src="onImgurl+'img/sqbg.png'" vueId="037bf7bc-1"></mg-img>
      <view class="p-a logoc ">
        <mg-img class="" :src="system.icon" vueId="037bf7bc-2"></mg-img>
      </view>
    </view>
    <view class="snbtnc ">

      <!-- #ifdef MP-WEIXIN -->
      <button @click="getUserInfo" class="btni cf f-c f28 " :openType="getUserInfo" scope="userInfo" :style="'background:'+tColor+';'+'border-color:'+tColor+';'">用户登录</button>
      <!-- #endif -->

      <!-- #ifdef MP-ALIPAY-->
      <button class="btni cf f-c f28 " openType="getAuthorize" scope="userInfo" @getAuthorize="onGetAuthorize" @error="onAuthError" :style="'background:'+tColor+';'+'border-color:'+tColor+';'">用户登录 </button>
      <!-- #endif -->

      <view @click="switchTab" class="btni bf f-c f28 " :style="'border-color:'+tColor+';'+'color:'+tColor+';'">取消</view>
    </view>
  </view>
</template>


<script>
import {
  message,
  setNT,
  swnb
} from 'common/util';
import { Tips } from '@/utils/miniUtils.js'
export default {
  name: "sq-login",
  data: function () {
    return {
      loading: !1,
      ptname: 'mini'
    }
  },
  onLoad: function () {
    this.getSystem();
    setNT("登录")
  },
  methods: {
    getUserInfo() {
      let self = this;
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用于完善会员资料',
        success: (res) => {
          if (res.errMsg !== 'getUserProfile:ok') {
            return false;
          }
          uni.showLoading({
            title: "正在登录",
            mask: true
          });
          // 执行微信登录
          //   wx.login({
          //     success: (res_login) => {
          var s = res.userInfo.avatarUrl,
            r = res.userInfo.nickName;
          // a = this.uId;
          this.refreshUser({

            // storeId: this.storeid,
            storeId: 1,
            portrait: s,
            userName: r,
            // userId: a,
            now: 1
          }).then((function (e) {
            if (e.code == 1) {
              Tips({ title: '登录成功，正在跳转...', type: 4, url: '/pages/tabbar/my/index' })
            }
            // this.switchTab()
          })).catch((function (err) {
            // n.loading = !1
          }))
          //     }
          //   });
        }
      });
    },

    // 授权成功回调
    onGetAuthorize() {
      const that = this;
      my.getOpenUserInfo({
        fail: res => { console.log(res); },
        success: res => {
          const userInfo = JSON.parse(res.response).response; // 以下方的报文格式解析两层 response
          that.refreshUser({
            storeId: 1,
            portrait: userInfo.avatar,
            userName: userInfo.nickName,
            now: 1
          }).then((function (e) {
            if (e.code == 1) {
              Tips({ title: '登录成功，正在跳转...', type: 5, url: '/pages/tabbar/my/index' })
            }
          }))
        },
      });
    },
    // 授权失败回调
    onAuthError() {
      this.exitAccount()
    },

    // 退出登录 功能
    exitAccount() {
      const that = this;
      my.confirm({
        title: '提示',
        content: '取消授权，可能会使部分功能无法使用，或页面信息不完整',
        confirmButtonText: '重新授权',//确定按钮
        cancelButtonText: '我知道了',//取消按钮
        success: (res) => {
          if (res.confirm) {
            that.onGetAuthorize()
          }
        },
      })
    },



    mpGetphonenumber: function (t) {
      var n = this;
      if ("getPhoneNumber:ok" == t.detail.errMsg) {
        var o = getApp().globalData.session_key,
          s = t.detail.encryptedData,
          r = t.detail.iv,

          a = this.uId;
        this.$api.login_decrypt({
          userId: a,
          sessionKey: o,
          data: s,
          iv: r
        }).then((function (e) {
          e.data && n.$emit("refresh", e.data), n.refreshUser({
            get: 1
          })
        }))
      } else uni.showModal({
        title: "温馨提示",
        content: "授权手机号失败",
        showCancel: !1
      })
    },
    switchTab() {
      uni.reLaunch({
        url: '/pages/tabbar/my/index'
      })
    }
  }
}
</script>
<style scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
}
.topimg {
  height: 100vw;
}

.logoc {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 166rpx;
  height: 166rpx;
}

.snbtnc {
  margin-top: 95rpx;
}

.btni {
  margin: 0 19.5% 50rpx;
  /* border: 1px solid #000; */
  height: 80rpx;
  border-radius: 80rpx;
}
</style>