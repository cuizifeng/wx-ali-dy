<template>
  <view class="mh100 pb130 " :hidden="!(system.color&&recharge.open==1)">
    <navBar :title="'充值'" :backgroundColor="'#FFCB4C'" :wordColor="'#fff'"></navBar>
    <view class="remain ">
      <view class="topc p-r " :style="'background:'+tColor+';'">
        <view class="rwimg p-a r0 ">
          <mg-img m="aspectFit" :src="onImgurl+'/czbg.png'" vueId="7d4d3f8c-1"></mg-img>
        </view>
        <view class="f-y-c p-r ">
          <view class="img mr30 ">
            <mg-img cname="bsf" :src="user.portrait||'https://yunbei.lianmengfu.net/xcxpic/wd/mrtx.png'" vueId="7d4d3f8c-2"></mg-img>
          </view>
          <view class="cf " v-if="rule.money>-1">
            <view>{{system.custom.balance+'：'+sl+rule.money}}</view>
            <view @tap="go({url:'yemx?idx=1'})" class="f-y-c cf mt10 f24 ">交易记录<text class="iconfont iconright ml5 cf f28 "></text>
            </view>
          </view>
        </view>
      </view>
      <view class="bdc o-h bf p-r ">
        <view class="f-bt f-w ">
          <view @tap="change(i)" class="ckic p02 bs15 bf5 f-col " :style="'background:'+(aIdx==i?'#fff':'')+';'+'box-shadow:'+(aIdx==i?'none':'')+';'+'border-color:'+(aIdx==i?tColor:'')+';'+'color:'+(aIdx==i?tColor:'')+';'" v-for="(v, i) in rule.list" :key="i">
            <view class="f-1 f-c ">
              <view :class="['f42 ',aIdx==i?'f48 wei':'']">{{v.money}}</view>
              <view :class="['ml15 mt10 f20 ',aIdx==i?'f30':'']">{{dw}}</view>
            </view>
            <view class="hx ma " :style="'background:'+(aIdx==i?tColor:'')+';'"></view>
            <view class="f-1 f-c-c f20 ">
              <view v-if="v.arr.includes(1)">{{'赠送:'+v.giveMoney+dw}}</view>
              <!-- <view class="t-o-e " v-if="v.arr.includes(2)">{{'赠送'+v.integral+jfName}}</view> -->
              <view v-if="v.arr.includes(3)">{{'赠送:'+v.giveGrow+'成长值'}}</view>
              <view v-if="v.arr.includes(4)">赠送优惠券</view>
            </view>
          </view>
          <view @tap="change(-1)" class="ckic p02 bs15 bf5 f-col " :style="'background:'+(aIdx==-1?'#fff':'')+';'+'box-shadow:'+(aIdx==-1?'none':'')+';'+'border-color:'+(aIdx==-1?tColor:'')+';'+'color:'+(aIdx==-1?tColor:'')+';'" v-if="recharge.moneyOpen==1">
            <view class="f-1 f-c ">
              <input :class="['f42 srk t-c ',aIdx==-1?'f48 wei':'']" :focus="focus" maxlength="6" placeholder="请输入" placeholderClass="f30 t-c" type="digit" v-model="money" />
              <view :class="['f20 ',aIdx==-1?'f30':'']">{{dw}}</view>
            </view>
            <view class="hx ma " :style="'background:'+(aIdx==-1?tColor:'')+';'"></view>
            <view class="f-1 f-c-c f20 ">
              <view>其他金额</view>
            </view>
          </view>
        </view>
        <!-- <view class="bs30 reqnr f24 c6 " :style="'background:'+'rgba('+cTR(tColor)+',0.2)'+';'" v-if="aIdx!=-1">
					<view v-if="xzrule.moneyOpen==1">{{'赠送：'+xzrule.giveMoney+dw}}</view>
					<view class="t-o-e " v-if="xzrule.integralOpen==1">{{'赠送：'+xzrule.integral+jfName}}</view>
					<view v-if="xzrule.growOpen==1">{{'赠送：'+xzrule.giveGrow+'成长值'}}</view>
					<view class="f-row " v-if="xzrule.couponOpen==1">
						<view class="f-g-0 ">赠送：</view>
						<view>
							<view class="f-row " v-for="(v, i) in xzrule.couponArr" :key="i">
								<view>{{v.name}}</view>
								<view class="ml10 f-g-0 ">x 1</view>
							</view>
						</view>
					</view>
				</view> -->
        <view class="mt30 ">
          <view class="mb10 wei f30 ">使用说明</view>
          <mg-rtext :content="recharge.details" type="2" vueId="7d4d3f8c-3"></mg-rtext>
        </view>
      </view>
      <view class="foot-btnc cf f30 f-c bf ">
        <button @tap="save" class="foot-btn bs15 f30 " :disabled="loading" hoverClass="btnhc" :loading="loading" :style="'background:'+tColor+';'">立即储值</button>
      </view>
    </view>
  </view>
</template>
<script>
import MgImg from 'components/common/mg-img.vue';
import mgInput from 'components/form/mg-input.vue';
import mgAgree from 'components/form/mg-agree.vue';
import uniFab from 'components/third/uni-fab.vue';
import sqBtn from 'components/common/sq-btn.vue';
import mgRtext from 'components/common/functionCmp/rich-text.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  message,
  setNT
} from 'common/util';
export default {
  name: "index",
  components: {
    MgImg,
    mgInput,
    mgAgree,
    uniFab,
    sqBtn,
    mgRtext,
  },
  data: function () {
    return {
      aIdx: -1,
      focus: !1,
      rule: {
        list: []
      },
      xzrule: {},
      money: "",
      loading: !1,
      isAgree: !0,
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "",
        buttonColor: ""
      },
      content: [
        {

          icon: "iconzy",
          text: "首页",
          url: "/pages/tabbar/index/index"
        },
        {
          icon: "icondd",
          text: "订单",
          url: "/yb_o2o/order/index"
        }, {
          icon: "iconwd",
          text: "我的",
          url: "/yb_o2o/my/index"
        }]
    }
  },
  onLoad: function () {
    var n = this;
    n.getSystem({
      setNB: 1
    }).then((function () {
      n.isAgree = 1 == n.system.isCheck, setNT(n.system.custom.rechargeTitle)
    })), n.getConfig({
      key: "recharge",
      api: "config_config",
      params: {
        ident: "recharge"
      }
    }).then((function () {
      n.isload = !0, 1 != n.recharge.open && uni.showModal({
        title: "提示",
        content: "储值功能已关闭",
        showCancel: !1,
        success: function (e) {
          n.go({
            t: 6,
            url: "/yb_wm/index/my-index"
          })
        }
      })
    }))
    n.getLoginInfo();
    n.rechargeRule();
  },
  onShow: function () {
    var e = this;
    e.isload;
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      recharge: function (e) {
        return e.config.recharge
      },
    }),
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    ...mapActions(["getConfig"]),
    rechargeRule: function () {
      var e = this;
      this.$api.member_recharge__rule().then(res => {
        res.list.forEach((function (e) {
          e.arr = [],
            1 == e.moneyOpen && e.arr.push(1),
            1 == e.integralOpen && e.arr.push(2),
            1 == e.growOpen && e.arr.push(3),
            1 == e.couponOpen && e.arr.push(4),
            e.arr = e.arr.slice(0, 2)
        })),
          e.rule = res,
          res.list.length && (e.aIdx = 0, e.xzrule = res.list[0]);
      })
    },
    change: function (e) {
      this.aIdx = e, -1 == e ? this.focus = !0 : (this.focus = !1, this.xzrule = this.rule.list[e])
    },
    checkboxChange: function (e) {
      console.log(e.detail.value, this.isAgree), 1 == this.isAgree ? this.isAgree = !1 : this.isAgree = !0
    },
    paySuccess: function () {
      var e = this;
      e.rechargeRule();
    },
    save: function () {
      var e = this,
        t;
      e.checkLogin().then(() => {
        t = -1 == e.aIdx ? +e.money : e.xzrule.money
        if (!t) return message("请确定储值金额", 3)
        if (-1 == e.aIdx && t < +e.recharge.downMoney) return message("最小储值金额" + e.recharge.downMoney, 3);
        e.requestSM("recharge").then(res1 => {

          this.$api.member_recharge__order({
            money: t
          }).then(res => {
            console.log('res: ', res);
            e.go({
              t: 1,
              url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
                orderId: res.data,
                orderType: 2,
                info: {
                  money: t,
                  type: "储值支付",
                  cancel: 1,
                  go: {
                    t: 4,
                    url: "/yb_wm/index/my-index"
                  }
                }
              }))
            })
          })
        })
      })
    },
    trigger: function (e) {
      this.go({
        t: 3,
        url: e.item.url
      }), console.log(e)
    }
  },
  onAddToFavorites: function (e) {
    return {
      title: this.system.shareTitle,
      imageUrl: this.system.shareIcon
    }
  }
}
</script>
<style scoped>
.rwimg {
  width: 216rpx;
  height: 208rpx;
  bottom: 50rpx;
}

.remain {
  margin: 0 0rpx;
}

.topc {
  padding: 55rpx 48rpx 130rpx;
}

.jyjl {
  right: 30rpx;
  top: 30rpx;
}

.img {
  width: 120rpx;
  height: 120rpx;
}

.bdc {
  margin-top: -70rpx;
  border-radius: 50rpx 50rpx 0 0;
  padding: 0 40rpx 50rpx;
}

.bdc .ml15 {
  margin-left: 15rpx;
}

.bdc .srk {
  height: 70rpx;
  width: 60%;
}

.ckic {
  width: 47%;
  margin-top: 45rpx;
  height: 180rpx;
  border: 1px solid #f5f5f5;
}

.hx {
  width: 55%;
  height: 1px;
  background: #eee;
}

.reqnr {
  margin-top: 45rpx;
  padding: 30rpx 30rpx 30rpx 90rpx;
}

.foot-btn {
  width: 280rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 60rpx;
}
</style>