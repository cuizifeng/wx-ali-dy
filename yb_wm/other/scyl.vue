<template>
  <view class="h100 ">
    <view class="rwimg p-f l0 wh ">
      <mg-img :src="scylConfig.icon" vueId="044bd733-1" v-if="scylConfig.icon"></mg-img>
    </view>
    <block v-if="info">
      <view class="p-r scmain ">
        <view class="bd b-s bf bs10 f24 ">
          <block v-if="!showjl&&info.state!=1">
            <view class="c9 mb10 ">参与步骤：</view>
            <view>{{'1.点击右上角“...”将“'+system.name+'”小程序添加至我的小程序'}}</view>
            <view class="p3 ">
              <image class="w100 " :src="onImgurl+'/img/tjsc.png'" style="height:262rpx;"></image>
            </view>
            <view>2.首页下拉任务栏(下图所示)截图，点击进入小程序并在下方上传，经管理员审核通过后即可获得“<text class="cf5 ">
                <text v-if="scylConfig.isCoupon==1">{{'代金券：'+scylConfig.couponArr[0].name+'、'}}</text>
                <text v-if="scylConfig.isBalance==1">{{scylConfig.balance+dw+'、'}}</text>
                <text v-if="scylConfig.isIntegral==1">{{scylConfig.integral+jfName+'、'}}</text>
                <text v-if="scylConfig.isGrowth==1">{{scylConfig.growth+'成长值'}}</text>
              </text>”</view>
            <view class="p3 ">
              <image class="w100 " :src="onImgurl+'/img/ysc.png'" style="height:274rpx;"></image>
            </view>
            <block v-if="info.state==null||info.state==3">
              <view class="mb10 ">3.立即上传图片，并提交审核</view>
              <mg-photo @changeImg="changeImg" icon="iconxj" max="1" pt="上传图片" vueId="044bd733-2"></mg-photo>
            </block>
          </block>
          <block v-if="info.state>0&&info.state<3">
            <view class="ysc " v-if="info.state==2&&showjl||info.state==1">
              <image class="img dis-b " mode="widthFix" :src="onImgurl+'/img/scjl.png'"></image>
              <view class="t-c f30 c0 p20 wei ">
                {{info.state==1?'您的审核已提交，请耐心等待审核！':info.state==2?'您的提交已通过审核，奖励已发放至您的账户':'审核已拒绝！'}}</view>
            </view>
            <view class="sjlic f-x-bt f-w " v-if="info.state==2&&showjl">
              <view class="sjli p3 bs10 t-c " v-if="scylConfig.isBalance==1">
                <text class="iconfont iconye t0 cf1c mt10 "></text>
                <view class="t1 mt20 f26 ">{{balanceName}}</view>
                <view class="t2 f30 ">{{scylConfig.balance+dw}}</view>
                <view @tap="go({url:'/yb_wm/other/recharge/yemx'})" class="ck bf mt10 ">查看</view>
              </view>
              <view class="sjli p3 bs10 t-c " v-if="scylConfig.isIntegral==1">
                <text class="iconfont iconjf2 t0 cf1c mt10 "></text>
                <view class="t1 mt20 f26 ">{{jfName}}</view>
                <view class="t2 f30 ">{{scylConfig.integral+'个'}}</view>
                <view @tap="go({url:'/yb_wm/my/integral/my-integral'})" class="ck bf mt10 ">查看</view>
              </view>
              <view class="sjli p3 bs10 t-c " v-if="scylConfig.isGrowth==1">
                <text class="iconfont iconzj t0 cf1c mt10 "></text>
                <view class="t1 mt20 f26 ">成长值</view>
                <view class="t2 f30 ">{{scylConfig.growth}}</view>
                <view @tap="go({url:''})" class="ck bf mt10 ">查看
                </view>
              </view>
              <view class="sjli p3 bs10 t-c " v-if="scylConfig.isCoupon==1">
                <text class="iconfont iconyhq t0 cf1c mt10 "></text>
                <view class="t1 mt20 f26 ">代金券</view>
                <view class="t2 f30 " v-if="scylConfig.couponArr[0].type==1">{{scylConfig.couponArr[0].money+dw}}</view>
                <view class="t2 f30 " v-if="scylConfig.couponArr[0].type==2">{{scylConfig.couponArr[0].discount+'折'}}</view>
                <view @tap="go({url:'/yb_wm/my/coupon/my'})" class="ck bf mt10 ">查看</view>
              </view>
            </view>
          </block>
        </view>
      </view>
      <button @tap="save" class="posi-f b0 w100 bs0 cf " :disabled="loading" :loading="loading" :style="'bottom:'+(isIpx?'40rpx':0)+';'+'background:'+(info.state==3?'#fa5151':'#00BE00')+';'" v-if="info.state==null||info.state==3||info.state==2&&!showjl">{{info.state==null?'提交审核':info.state==2?'审核已通过，查看奖励':'信息有误，请重新提交审核'}}</button>
      <view class="bgf " v-if="isIpx"></view>
    </block>
  </view>
</template>

<script>
import mgPhoto from 'components/form/mg-photo.vue';
import {
  isFailParams,
  setNT
} from 'common/util';
export default {
  name: "scyl",
  components: {
    mgPhoto
  },
  data: function () {
    return {
      loading: !1,
      params: {
        media: ""
      },
      info: "",
      scylConfig: {},
      showjl: !1
    }
  },
  onLoad: function (t) {
    var e = this;
    e.getSystem({
      setNB: 1
    }), setNT("收藏有礼"), e.getConfig(), e.getLoginInfo();
    e.getData();
  },
  computed: {
    jfName: function () {
      return this.system.custom.integral
    },
    balanceName: function () {
      return this.system.custom.balance
    }
  },
  methods: {
    getConfig: function () {
      var t = this;
      if (getApp().globalData.scylConfig) {
        t.scylConfig = getApp().globalData.scylConfig
      } else
        this.$api.config_config({
          ident: "collection"
        }).then(res => {
          t.scylConfig = getApp().globalData.scylConfig = res;
        })
    },
    getData: function () {
      var t = this;
      this.$api.member_collection().then(res => {
        t.info = res
      })
    },
    changeImg: function (t) {
      console.log('t: ', t);
      this.params.media = t.p
    },
    tjsh: function () {
      this.state = 2
    },
    save: function () {
      var t = this;

      if (t.info.state > 0 && t.info.state < 3) {
        t.showjl = !0
      } else {
        if (isFailParams({
          field: t.params,
          filter: [],
          tips: {
            media: "请上传截图"
          }
        })) {
          // uploadImg
        }
      }
      // return c(a.default.mark((function e() {
      // 	var n, i, o, c, s;
      // 	return a.default.wrap((function(e) {
      // 		while (1) switch (e.prev = e.next) {
      // 			case 0:
      // 				if (!(t.info.state > 0 && t.info.state < 3)) {
      // 					e.next = 2;
      // 					break
      // 				}
      // 				return e.abrupt("return", t.showjl = !0);
      // 			case 2:
      // 				if (n = [], i = r.default.isFailParams({
      // 						field: t.params,
      // 						filter: n,
      // 						tips: {
      // 							media: "请上传截图"
      // 						}
      // 					}), i) {
      // 					e.next = 8;
      // 					break
      // 				}
      // 				return e.abrupt("return");
      // 			case 8:
      // 				return t.loading = !0, t.util.showLoading("上传中"), e.next = 12, (0, u.uploadImg)({
      // 					files: t.params.media
      // 				});
      // 			case 12:
      // 				return o = e.sent, c = r.default.deepCopy(t.params), c.media = o.join(), e.next = 17, t.util
      // 					.request({
      // 						url: t.api.scyl,
      // 						method: "POST",
      // 						mask: 1,
      // 						data: c
      // 					});
      // 			case 17:
      // 				s = e.sent, s ? (t.util.message("提交成功", 1, 1e3), r.default.stfn((function() {
      // 					t.showjl = !0, t.getData()
      // 				}))) : t.loading = !1;
      // 			case 19:
      // 			case "end":
      // 				return e.stop()
      // 		}
      // 	}), e)
      // })))()
    }
  }
}
</script>

<style>
</style>
<style scoped>
.b-s {
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
}

.scmain {
  padding: 300rpx 20rpx 160rpx;
}

.scmain .bd {
  padding: 30rpx 40rpx;
}

.ysc .img {
  margin: 70rpx auto 0;
  width: 190rpx;
}

.sjlic {
  margin: 60rpx 0 60rpx;
  padding: 0 30rpx;
}

.sjlic .sjli {
  width: 265rpx;
  background: #ffe6b4;
  margin-bottom: 40rpx;
}

.sjlic .t0 {
  font-size: 65rpx;
}

.sjlic .t1 {
  color: #d18d37;
}

.sjlic .t2 {
  color: #a13b00;
}

.sjlic .ck,
.sjlic .qsy {
  padding: 9rpx 20rpx;
  border-radius: 50rpx;
}

.sjlic .ck {
  color: #ffa115;
}

.sjlic .qsy {
  background: #ff8c00;
}

.cf1c {
  color: #ffab1c;
}
</style>