<template>
  <view class="wh bf ">
    <view class="topimg p-r ">
      <mg-img class="" :src="onImgurl+'img/sqbg.png'" vueId="037bf7bc-1"></mg-img>
      <view class="p-a logoc ">
        <mg-img class="" :src="system.icon" vueId="037bf7bc-2"></mg-img>
      </view>
    </view>
    <view class="snbtnc ">
      <button @click="getUserInfo" @getAuthorize="onGetAuthorize" class="btni cf f-c f28 " :openType="api.platform=='ali'?'getAuthorize':'getUserInfo'" scope="userInfo" :style="'background:'+tColor+';'+'border-color:'+tColor+';'">用户登录</button>

      <button @tap="go({t:4})" class="btni bf f-c f28 " :style="'border-color:'+tColor+';'+'color:'+tColor+';'">取消</button>
    </view>
  </view>
</template>


<script>
import {
  message,
  setNT,
  swnb
} from 'common/util';
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
          console.log('res: ', res);
          if (res.errMsg !== 'getUserProfile:ok') {
            return false;
          }
          uni.showLoading({
            title: "正在登录",
            mask: true
          });
          // 执行微信登录
          wx.login({
            success: (res_login) => {
              console.log('res_login: ', res_login);
              var s = res.userInfo.avatarUrl,
                r = res.userInfo.nickName;
              // a = this.uId;
              console.log({
                storeId: this.storeid,
                portrait: s,
                userName: r,
                // userId: a,
                now: 1
              }, "1111111111111");
              this.refreshUser({

                // storeId: this.storeid,
                storeId: 1,
                portrait: s,
                userName: r,
                // userId: a,
                now: 1
              }).then((function (e) {
                console.log('e', e);
                message("登录成功", 1, 1e3);
                swnb(1e3)
              })).catch((function (err) {
                console.log(err);
                // n.loading = !1
              }))
            }
          });
        }
      });
    },
    mpGetUserInfo: function (t) {
      console.log('getuserinfo');
      return;
      var n = this;
      if (!this.loading)
        if (this.loading = !0, console.log("mpGetUserInfo", t), "getUserInfo:ok" == t.detail.errMsg) {
          var s = t.detail.userInfo.avatarUrl,
            r = t.detail.userInfo.nickName,
            a = this.uId;
          this.refreshUser({
            storeId: this.storeid,
            portrait: s,
            userName: r,
            userId: a,
            now: 1
          }).then((function (e) {
            message("登录成功", 1, 1e3), swnb(1e3)
          })).catch((function () {
            n.loading = !1
          }))
        } else this.loading = !1, uni.showModal({
          title: "温馨提示",
          content: "获取头像等信息失败",
          showCancel: !1
        })
    },
    onGetAuthorize: function (e) {
      var t = this;
      my.getOpenUserInfo({
        fail: function (e) { },
        success: function (e) {
          var n = JSON.parse(e.response).response;
          t.refreshUser({
            storeId: t.storeid,
            portrait: n.avatar,
            userName: n.nickName,
            userId: t.uId,
            now: 1
          }).then((function (e) {
            message("登录成功", 1, 1e3), swnb(1e3)
          }))
        }
      })
    },
    mpGetphonenumber: function (t) {
      var n = this;
      if (console.log("mpGetphonenumber", t), "getPhoneNumber:ok" == t.detail.errMsg) {
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
          }), console.log(e)
        })), console.log(o, s, r)
      } else uni.showModal({
        title: "温馨提示",
        content: "授权手机号失败",
        showCancel: !1
      })
    }
  }
}
</script>
<style scoped>
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
  border: 1px solid #000;
  height: 80rpx;
  border-radius: 80rpx;
}
</style>