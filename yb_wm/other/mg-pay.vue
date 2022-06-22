<template>
  <view class="mh100 bf ">
    <navBar :title="'收银台'" :backgroundColor="xzcolor" :wordColor="'#fff'"></navBar>
    <view class="paytop f-c-c cf p-r " :style="'background:'+xzcolor+';'">
      <!-- <image class="p-a payimg b0 r0 " :src="'/static/pay/'+xzzfimg+'.png'"></image> -->
      <view class="f30 mb10 " style="opacity:0.8;" v-if="payObj.orderType">{{payObj.info.storeName}}</view>
      <view class="paymoeny wei f60 ">
        <text>{{sl}}</text>
        <text>{{pmoney}}</text>
      </view>
      <view class="p13 f26 " v-if="payObj.orderType">{{payObj.info.type}}</view>
      <view class="f26 djsc " v-if="info">支付剩余时间：<text class="ml10 " v-if="stime">{{stime[2]+':'+stime[3]}}</text>
      </view>
    </view>
    <form @submit="formSubmit">
      <view>
        <radio-group @change="radioChange" name="radiogroup">
          <label class="weui-cell right30 f-s " v-for="(v, i) in payArr" :key="i">
            <view class="f-y-c ">
              <image class="hdimg " mode="aspectFit" :src="v.img"></image>
            </view>
            <view class="weui-cell__bd ">
              <view class="f-row ">
                <view class="f34 f-1 l-n ">{{v.name}}</view>
                <view class="weui-cell__ft_in-radio ">
                  <text :class="['iconfont f40 ',v.value==radioVal?'icongx':'iconwgx']" :style="'color:'+(v.value==radioVal?v.color||tColor:'')+';'"></text>
                  <radio :checked="v.value==radioVal" class="weui-check " :value="v.value"></radio>
                </view>
              </view>
              <view class="yezf f24 mt10 " :style="'color:'+tColor+';'" v-if="v.value=='ye'">
                {{'可用'+balanceName+sl+user.balance+''}}</view>
              <view class="mt20 mswz bf5 bs10 l-n f24 c9 ">{{v.text}}</view>
              <block v-if="v.value=='ye'">
                <block v-for="(v, i) in yeczrule" :key="i">
                  <view class="f-y-c f22 mt20 " v-if="i<2">
                    <view class="hdc f18 mr15 f-g-0 cf ">惠</view>
                    <view class="c6 f-raw ">
                      <view>{{'充'+v.money+'赠送：'}}</view>
                      <view v-if="v.moneyOpen==1">{{sl+v.giveMoney+','}}</view>
                      <!-- <view v-if="v.integralOpen==1">{{v.integral+jfName+','}}</view> -->
                      <view v-if="v.growOpen==1">{{v.giveGrow+'成长值,'}}</view>
                      <view v-if="v.couponOpen==1">{{v.couponArr.length+'张代金券'}}</view>
                    </view>
                  </view>
                </block>
                <view @tap.stop="go({url:'/yb_wm/other/recharge/index'})" class="f-y-c mt20 " v-if="yeczrule.length">
                  <view class="c6 f24 f-1 ">更多优惠</view>
                  <text :class="['iconfont iconright arrow ml5 ',ftc]" style="color:#C4C4C4;"></text>
                </view>
              </block>
            </view>
          </label>
        </radio-group>
      </view>
      <view class="foot-btnc " v-if="payArr.length">
        <button class="foot-btn b-s-2 bs0 f30 wei " formType="submit" :style="'background:'+xzcolor+';'">确认支付</button>
      </view>
    </form>
  </view>
</template>

<script>
import mgPopup from 'components/common/popup.vue';
import mgModal from 'components/common/modal.vue';
import {
  countDownTime,
  deepCopy,
  message,
  setNB,
  setNT
} from 'common/util';
import {
  utilMixins
} from 'common/utilMixins';
import {
  platform
} from 'common/apiconfig';
import { Tips } from "@/utils/miniUtils.js";
import {
  mapState,
  mapActions
} from 'vuex';

export default {
  name: "mg-pay",
  components: {
    mgPopup,
    mgModal
  },
  data: function () {
    return {
      loading: !1,
      payObj: {},
      payArr: [],
      showCoupon: !1,
      stime: "",
      info: null,
      radioVal: "",
      xzcolor: "",
      xzzfimg: "",
      yeczrule: []
    }
  },
  onLoad: function (t) {
    // console.log(t)
    var n = this;
    // setNT("收银台"),
    n.payObj = JSON.parse(decodeURIComponent(t.payObj)),
      n.getConfig({
        key: "payConfig",
        api: "config_config",
        params: {
          ident: "payConfig"
        }
      }).then((function (e) {
        // console.log('115e: ', e);
        n.getPayArr()
      }));
    //
    if (1 == n.payObj.orderType) {
      this.$api.order_order__info({
        orderId: n.payObj.orderId
      }).then(res => {
        if (res && res.state) {
          n.info = res, n.djs(res.createdAt)
        }
      })
    }
    uni.getProvider({
      service: "payment",
      success: function (e) {
        e.provider.indexOf("wxpay") ? n.provider = "wxpay" : e.provider.indexOf("alipay") ? n
          .provider = "alipay" : e.provider.indexOf("baidu") ? n.provider = "baidu" : e.provider
            .indexOf("toutiao") && (n.provider = "toutiao")
      }
    }), uni.setStorageSync("payPage", !0), uni.setStorageSync("payedCoupon", !1);
  },
  onShow: function () {
    return
    this.refreshUser({
      get: 1,
      now: 1
    })
  },
  onUnload: function () {
    var t = this;
    setTimeout((function () {
      uni.removeStorageSync("payPage"), t.dsq && clearInterval(t.dsq)
    }), 1e3)
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      payConfig: function (e) {
        return e.config.payConfig
      },
      orderset: function (e) {
        return e.config.orderset
      }
    }),
    pmoney: function () {
      return Number(this.payObj.info && this.payObj.info.money || 0).toFixed(2)
    },
    jfName: function () {
      return this.system.custom.integral
    },
    balanceName: function () {
      return this.system.custom.balance
    }
  },
  methods: {
    ...mapActions(["getConfig"]),
    radioChange: function (e) {
      this.radioVal = e.detail.value;
      var t = this.payArr.find((function (t) {
        return t.value == e.detail.value
      }));
      setNB(t.color), this.xzcolor = t.color,
        this.xzzfimg = t.img2
    },
    getPayArr: function () {
      var e = [];
      "mini" == platform.appType ||
        "weChat" == platform.appType ? e.push({
          name: "微信支付",
          value: "wx",
          img: "",
          img2: "wxb",
          color: "#65B05B",
          text: "更方便，更快捷"
        }) : "ali" == platform.appType ? e.push({
          name: "支付宝支付",
          value: "zfb",
          img: "",
          img2: "ylbg",
          color: "#1890ff",
          text: "更方便，更快捷"
        }) : "baidu" == platform.appType ? e.push({
          name: "百度支付",
          value: "baidu",
          img: ""
        }) : "toutiao" == platform.appType && e.push({
          name: "头条支付",
          value: "baidu",
          img: ""
        });
      if (1 == this.payConfig.balancePayOpen) switch (+this.payObj.orderType) {
        case 2:
          break;
        default:
          e.push({
            name: this.balanceName + "支付",
            value: "ye",
            img: "",
            img2: "yeb",
            color: '#FFCB4C',
            text: this.balanceName + "支付，充值有优惠"
          });
          break
      }
      this.payArr = e,
        this.radioChange({
          detail: {
            value: e[0].value
          }
        }), e.find((function (e) {
          return "ye" == e.value
        })) && this.rechargeRule()
    },
    rechargeRule: function () {
      var e = this;
      this.$api.member_recharge__rule().then(res => {
        e.yeczrule = res.list || []
      })
    },
    djs: function (e) {
      var t = this,
        n = this.dateToTime(),
        a = +e + 60 * this.orderset.closeTime;
      if (a > n) {
        this.stime = countDownTime(a - n);
        this.dsq = setInterval(
          () => {
            a -= 1;
            if (a == n) clearInterval(t.dsq);
            t.go({
              t: 4
            });
            t.stime = countDownTime(a - n);
          }, 1e3)
      }
    },
    setzfcg: function () {
      uni.setStorageSync("payedCoupon", {
        orderId: this.payObj.orderId,
        paymoney: this.pmoney
      })
    },
    formSubmit: function (t) {
      var n = this;
      var i, u;
      i = deepCopy(n.payObj);
      // 余额付 
      if ("ye" == t.detail.value.radiogroup) {
        i.payType = 1;
        if (+n.pmoney > +n.user.balance) {
          return message("您的" + n.balanceName + "不足支付", 3);
        }
      }
      if (1 == n.payObj.orderType && n.jjmbxx) {
        return n.requestSM("payOrder");
      }

      this.$api.pay_pay(i).then(res => {
        if ("ye" != t.detail.value.radiogroup) {

          // #ifdef MP-WEIXIN
          uni.requestPayment({
            ...res.data,
            provider: n.provider,
            orderInfo: res.data,
            success: function (t) {
              uni.reLaunch({
                url: "/pages/individualAccount/paymentSuccessful/index?orderId=" + i.orderId + "&payType=" + '' + "&orderType=" + i.orderType
              })
            },
            complete: function (e) {
              //   console.log("paymentcomplete", e)
            }
          })
          // #endif 

          // #ifdef MP-ALIPAY
          // .js
          my.tradePay({
            // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
            tradeNO: res.data.alipay_trade_create_response.trade_no,
            success: (res) => {
              if (res.resultCode == 9000) {
                Tips({ title: res.memo, type: 5, url: "/pages/individualAccount/paymentSuccessful/index?orderId=" + i.orderId + "&payType=" + '' + "&orderType=" + i.orderType })
              } else {
                Tips({ title: res.memo, type: 5, url: "/yb_wm/index/order-index" })
              }
            },
            fail: (res) => { }
          });
          // #endif
        } else {
          (n.setzfcg(), n.go({
            t: 2,
            url: "zfyl?payObj=" + encodeURIComponent(JSON.stringify(i))
          }))
        }
      })


    }
  }
}
</script>
<style scoped>
.weui-cell:after {
  display: block;
}

.img {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
}

.last:after {
  display: none;
}

.left0:after {
  left: 0rpx;
}

.right30:after {
  right: 30rpx;
}

.arrow {
  margin-right: -5rpx;
}

.aligns {
  -webkit-box-align: start;
  align-items: flex-start;
}

.paytop {
  padding: 10rpx 30rpx 30rpx;
}

.paymoeny {
  display: flex;
  -webkit-box-align: baseline;
  align-items: baseline;
}

.weui-cell {
  padding: 45rpx 35rpx 30rpx;
}

.weui-cell:last-child:after {
  display: block;
}

.weui-cell:after {
  left: 112rpx;
}

.hdimg {
  width: 49rpx;
  height: 49rpx;
  margin-right: 30rpx;
}

.right30::after {
  right: 30rpx;
}

.payimg {
  width: 145rpx;
  height: 125rpx;
}

.djsc {
  background: hsla(0, 0%, 100%, 0.12);
  border-radius: 60rpx;
  padding: 10rpx 25rpx;
}

.mswz {
  padding: 10rpx 13rpx;
}

.hdc {
  border-radius: 15rpx 5rpx;
  padding: 0rpx 10rpx;
  background: #f44336;
}

.foot-btn {
  height: 84rpx;
  line-height: 84rpx;
  border-radius: 78rpx;
}
</style>