<template>
  <view>
    <button @getAuthorize="onGetAuthorize" @getuserinfo="mpGetUserInfo" :class="['','sqbtn',cname]" :openType="api.platform=='ali'?'getAuthorize':'getUserInfo'" scope="userInfo" :style='{ width: w + "rpx", height: h + "rpx", lineHeight: h + "rpx" }' v-if="type==1">{{t}}</button>

    <button @getphonenumber="mpGetphonenumber" :class="['','sqbtn',cname]" openType="getPhoneNumber" :style='{ width: w + "rpx", height: h + "rpx", lineHeight: h + "rpx" }' v-if="type==2">{{t}}</button>

    <button @tap="$emit('refresh')" :class="['','sqbtn',cname]" hoverClass="be" openType="share" :style='{ width: w + "rpx", height: h + "rpx", lineHeight: h + "rpx" }' v-if="type==3">{{t}}</button>

    <view v-if="type==4">
      <mg-modal v-model="show" ismr="true" vueId="051d3460-1" :vueSlots="['default']" width="600rpx" :zIndex="3000">
        <view class="bf bs30 sqtel t-c ">
          <view class="ptimg bsf ma ">
            <mg-img :src="system.icon" :vueId="'051d3460-2'+','+'051d3460-1'"></mg-img>
          </view>
          <view class="f36 mt30 mb20 l-h1 ">{{system.name}}</view>
          <view>绑定手机号后，将会获得更多权益哦！</view>
          <button @getphonenumber="mpGetphonenumber" class="f30 telbtn cf " :disabled="loading" openType="getPhoneNumber" :style="'background:'+tColor+';'">立即绑定</button>
        </view>
      </mg-modal>
    </view>
  </view>
</template>

<script>
import {
  platform
} from 'common/apiconfig';
import mgModal from './modal.vue';
import { message } from 'common/util';
export default {
  name: "sq-btn",
  components: {
    mgModal
  },
  props: {
    cname: "",
    sname: "",
    w: "",
    h: "",
    t: "",
    type: {
      type: String,
      default: "1"
    },
    storeid: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: !1
    }
  },
  data: function () {
    return {
      loading: !1
    };
  },
  computed: {
    ptname: function () {
      var e;
      switch (platform) {
        case "mini":
          e = "微信";
          break;

        case "ali":
          e = "支付宝";
          break;

        case "baidu":
          e = "百度";
          break;

        case "toutiao":
          e = "字节跳动";
      }

      return e;
    },
    show: {
      get: function () {
        return this.value;
      },
      set: function (e) {
        this.$emit("input", e);
      }
    }
  },
  watch: {},
  methods: {
    share: function () {
      uni.showModal({
        title: "提示",
        content: "点击右上角分享",
        showCancel: !1,
        confirmText: "我知道了"
      });
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
            userId: t.uId
          }).then(function (e) {
            t.$emit("refresh");
          });
        }
      });
    },
    getUserInfo: function () {
      var t = this;
      uni.getUserInfo({
        success: function (e) {
          t.refreshUser({
            storeId: t.storeid,
            portrait: portrait,
            userName: userName,
            userId: userId
          }).then(function (e) {
            t.$emit("refresh");
          }), console.log("getUserInfo success", e);
        },
        fail: function (t) {
          console.log("getUserInfo fail", t), uni.showModal({
            title: "温馨提示",
            content: "获取头像等信息失败",
            showCancel: !1
          });
        }
      });
    },
    mpGetUserInfo: function (t) {
      var n = this;

      if ("getUserInfo:ok" == t.detail.errMsg) {
        var o = t.detail.userInfo.avatarUrl,
          s = t.detail.userInfo.nickName,
          r = this.uId;
        this.refreshUser({
          storeId: this.storeid,
          portrait: o,
          userName: s,
          userId: r
        }).then(function (e) {
          n.$emit("refresh");
        }), console.log(o, s, r);
      } else uni.showModal({
        title: "温馨提示",
        content: "获取头像等信息失败",
        showCancel: !1
      });
    },
    mpGetphonenumber: function (t) {
      var n = this;
      if (this.loading = !0, "getPhoneNumber:ok" != t.detail.errMsg) return this
        .loading = !1, void uni.showModal({
          title: "温馨提示",
          content: "授权手机号失败",
          showCancel: !1
        });
      var o = getApp().globalData.session_key,
        s = t.detail.encryptedData,
        r = t.detail.iv,
        a = this.uId;
      this.$api.login_decrypt({
        userId: a,
        sessionKey: o,
        data: s,
        iv: r
      }).then(res => {
        console.log('res: ', res);
        n.loading = !1, res && (n.show = !1, 4 == n.type ? message("绑定成功", 1, 1e3) : n.$emit("refresh", res), n.refreshUser({
          nomask: 1,
          get: 1,
          now: 1
        }));
      }).catch(e => {
        n.loading = !1;
      })
    }
  }
}
</script>
<style scoped>
.sqtel {
  padding: 70rpx 40rpx;
}

.ptimg {
  width: 136rpx;
  height: 136rpx;
}

.telbtn {
  line-height: 2.8;
  margin-top: 70rpx;
}
</style>