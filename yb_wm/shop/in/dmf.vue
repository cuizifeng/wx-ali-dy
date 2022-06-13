<template>
  <mg-form>
    <!-- <view class="sjh" v-if="isshow">
			<mg-modal v-model="show" ismr="true" vueId="051d3460-1" :vueSlots="['default']" width="600rpx"
				:zIndex="3000">
				<view class="bf bs30 sqtel t-c ">
					<view class="ptimg bsf ma ">
						<mg-img :src="system.icon" :vueId="'051d3460-2'+','+'051d3460-1'"></mg-img>
					</view>
					<view class="f36 mt30 mb20 l-h1 ">{{system.name}}</view>
					<view>绑定手机号后，将会获得更多权益哦！</view>

				</view>
			</mg-modal>
		</view> -->
    <view class="zfbox">
      <view class="bigbox">
        <view class="bigbox_one">
          <view class="left">
            <image :src="shopinfo.icon?shopinfo.icon:'https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/11/08/202111081355422543.png'" mode="" style="border-radius: 10%;border: 1rpx solid #DDDDDD;margin-top: 22rpx;"></image>
            {{shopinfo.name?shopinfo.name:'沐掌柜'}}
          </view>
          <view v-if="users.vipCode" class="right">
            会员：{{users.vipCode}}
          </view>

          <!-- vipCode -->
        </view>
        <view class="bigbox_two">
          <input class="input1" focus="true" maxlength="8" type="digit" v-model="money" />
          <view class="placeholder">
            ￥
          </view>
        </view>
        <view class="bigbox_three" @tap="selectYou">
          <view class="font1">
            优惠券
          </view>
          <view class="font2" style="display: flex;align-items: center;justify-content: center;">
            <text v-if="youObj==''">请选择优惠券</text>
            <text v-else>{{youObj.couponName}} {{youObj.money}}</text>
            <uni-icons type="right" style="margin-left: 5rpx;" size="15"></uni-icons>
          </view>
        </view>
        <view class="bigbox_four">
          <!-- :class="zfid==1 ? 'btm2' : 'btm'"  -->
          <view class="btm" @click="zfid=1" style="position: relative;">
            <view v-if="zfid==1" class="cheackimg" style="position: absolute;top:0;right: -2rpx; width: 50rpx;height: 50rpx;">
              <image style="width: 100%;height: 100%;" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/dmf1.png" mode=""></image>
            </view>
            <view class="" style="display: flex;align-items: center;justify-content: flex-start;">
              <image style="width: 30rpx;height: 30rpx;" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/dmf3.png" mode=""></image>
              <text style="margin-left: 10rpx;">余额支付</text>
            </view>
            <view class="">
              余额：￥{{users.balance==null ? '0' :users.balance}}
            </view>
          </view>
          <view class="btm" @click="zfid=2" style="flex-direction:row;position: relative;">
            <view v-if="zfid==2" class="cheackimg" style="position: absolute;top:0;right: 0; width: 50rpx;height: 50rpx;">
              <image style="width: 100%;height: 100%;" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/dmf1.png" mode=""></image>
            </view>
            <image style="width: 30rpx;height: 30rpx;" src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/dmf2.png" mode=""></image>
            <text style="margin-left: 10rpx;">微信支付</text>
          </view>
        </view>
      </view>
      <view>
        <!-- #ifdef MP-WEIXIN -->
        <button class="but" @tap="gitRechargeList" :disabled="disabled=='1' ? true : false" :openType="isshow==1 ? 'getPhoneNumber' : ''" @getphonenumber="mpGetphonenumber">立即支付</button>
        <!-- #endif -->

        <!-- #ifdef MP-TOUTIAO -->
        <button class="but" @tap="gitRechargeList" :disabled="disabled=='1' ? true : false">立即支付</button>
        <!-- #endif -->

        <!-- #ifdef MP-ALIPAY -->
        <button class="but" @tap="gitRechargeList" :disabled="disabled=='1' ? true : false">立即支付</button>
        <!-- #endif -->

      </view>
    </view>
    <view class="bottom" v-if="zfshow">
      <!-- <view class="bottom" v-if="true"> -->
      <view class="bigbox">
        <view class="one">
          <view class="bottom_font" style="display: flex;align-items: center;justify-content: space-between;">
            <text></text>
            <text>储值立享更多优惠</text>
            <text style="font-size: 40rpx;" @tap="close">x</text>
          </view>
          <!-- <view class="qx"  @click="close">
						x
					</view> -->
          <!-- <view style="visibility: hidden;" class="bottom_font2">
						推荐充值并支付，立享更多优惠
					</view> -->
          <view class="hidden">
            <view class="box">

              <view :class="bordershow==key?'priItemBox baseItem':'nocheack baseItem'" style="position: relative;" v-for="(item,key) in RechargeList" :key="key" @click="useCoupon(key)">
                <!-- <image style="width: 100%;height: 100%;position: absolute;top:0;left: 0;" src="../../../static/imgs/selecpri.png" mode=""></image> -->
                <view class="">
                  <text style="font-size: 40rpx;color: #000000;margin-right: 10rpx;">￥{{item.money}}</text>元
                </view>
                <view class="" style="display: flex;align-items: center;justify-content: center;">
                  <text style="font-size: 24rpx;">送￥</text><text style="font-size: 30rpx;color: #000000;">{{item.giveMoney}}</text>
                </view>
              </view>

              <!-- 		<view v-for="(item,key) in RechargeList" :key="key" @click="useCoupon(key)"
								:class="bordershow==key ? 'minbox' : 'yborder'">
								<image v-if="bordershow==key" class="selectimg" style="width: 50rpx; height: 50rpx;position: absolute;top: 0;right: 0;" src="../../../static/imgs/shopselect.png" mode=""></image>
								<view class="size">
									<text style="font-size: 42rpx; font-weight: bold;">{{item.money}}</text>元
								</view>
								<view class="size2" style="color: #333333;">
									送<text style="font-weight: bold;">{{item.giveMoney}}</text>元
								</view>
							</view> -->

            </view>
          </view>
        </view>
        <view class="two">
          <checkbox-group @change="pleaseComfirm">
            <label>
              <checkbox value="ty" />我已阅读并同意
            </label>
            <text style="color:#fe6a0e;" @tap="tapXy">《储值协议》 </text>
          </checkbox-group>

        </view>
        <button v-if="ischeack.length>0" type="default" class="zfbtn" @click="hqdd">确认支付{{params.money}}元</button>
        <button v-else type="default" class="zfbtn nozfbtn" disabled>确认支付{{params.money}}元</button>
      </view>

    </view>

    <mg-popup v-model="popshow" class="" close="1" :value="popshow" vueId="1fdb2abe-1" :vueSlots="['default']" :zIndex="5000">
      <view class="popwrap">
        <view class="popwrapheader">
          <text>储值协议</text>
        </view>
      </view>
    </mg-popup>

  </mg-form>

</template>


<script>
import MgCell from 'components/common/mg-cell.vue';
import sqBtn from 'components/common/sq-btn.vue';
import mgPopup from 'components/common/popup.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  deepCopy,
  getOptions,
  message,
  setNT
} from 'common/util';
import {
  utilMixins
} from 'common/utilMixins';
import { log } from 'lib/utils/QS-SharePoster/app';
export default {
  name: "bzf",
  components: {
    MgCell,
    sqBtn,
    mgPopup,
  },
  data() {
    return {
      money: "",
      params: {
        money: "",
        storeId: uni.getStorageSync('storeinfo').storeid,
        userNote: "",
        useCouponId: "",
        balance: ""
      },
      shopinfo: '',
      mdconfig: null,
      loading: !1,
      kyhb: {
        n: 0,
        data: []
      },
      couponInfo: null,
      show: 1,
      isshow: false,
      arr: {
        userId: "",
        location: "2",
        storeId: "1"
      },
      orderId: '',
      yhj: {},
      RechargeList: [],
      zfshow: false,
      bordershow: -1,
      users: {},
      payType: "", //支付方式（微信或者余额）
      orderType: "", //当面付或者充值到余额
      zfid: '', //选择微信或者余额 默认微信
      member: [], //选择的会员卡，
      disabled: "2",
      userInfo: [], //用户信息
      userTel: '',
      youObj: '',
      popshow: false,
      ischeack: []
    }
  },
  watch: {
    zfid(newName, oldName) {
      console.log(newName);
      if (newName === 1) {
        this.youObj = '';
      }
    }
  },
  onLoad(params) {
    console.log(params, "==------");
    console.log(Object.keys(params), '88888');
    if (Object.keys(params).length > 0 && Object.keys(params)[0] == 'obj') {
      console.log(JSON.parse(params.obj), 444444444);
      let obj = JSON.parse(params.obj);
      this.youObj = obj;
      this.money = obj.pushmoney;
      this.zfid = obj.pushzfid;
      console.log(obj.pushzfid, '111111111111');
      console.log(obj.pushmoney, '1111111111111111');
    }
    console.log(uni.getStorageSync('storeinfo').storeid, '888888888888888888');
    let uniacid = uni.getStorageSync('uniacid');
    if (!uniacid) {
      uni.setStorageSync('uniacid', 1);
    }
    // console.log( getApp().globalData.session_key,'77777777777778888884444444444444');
    uni.login({
      success: (res) => {
        const { code } = res
        this.$api.login_login({
          code: code
        }).then(r => {
          console.log(r, '888888888');
          getApp().globalData.session_key = r.session_key;
          this.users = r

          // console.log(this.users.portrait);
          this.userId = r.userId
          uni.setStorageSync("userId", r.userId)
          this.userTel = r.userTel
          // console.log(this.users, "2")

          if (r.userTel == null) {
            this.isshow = 1
          } else {
            this.isshow = 2
          }
          console.log(this.users, "2")


          var n = this;
          n.getSystem(),
            setNT("收款"),


            // n.params.storeId = getOptions({
            // 	'key': "storeId",
            // 	'q1': n.storeInfo.id
            // }), n.getLoginInfo().then((function(res) {

            //     n.shopinfo = res;
            // 	console.log(n.shopinfo);

            // })),

            this.$api.order_order__set({
              storeId: n.params.storeId
            }).then(res => {
              console.log(res, '6666666666666');

            })


          this.$api.shop_lately__store().then(res => {
            console.log(res, 777777);
            console.log(res.icon, 777777);
            this.shopinfo = res;
            console.log(this.shopinfo.icon);
            this.params.storeId = res.id
          })
        })
      }
    })



  },

  mixins: [utilMixins],
  computed: {
    ...mapState({
      storeInfo: function (t) {
        return t.config.storeInfo
      }
    }),
    yhq: function () {
      return this.mdconfig && this.mdconfig.discount.indexOf("1") > -1
    },
    vip: function () {
      return this.isVip && this.mdconfig && this.mdconfig.discount.indexOf("3") > -1
    },
    zkmoney: function () {
      var t = 0,
        n = +(this.couponInfo && this.couponInfo.money || 0);
      return this.vip && this.user.discount && (t = (10 - this.user.discount) / 10 * (this.money - n)), this
        .blxs(t)
    },
    total: function () {
      var t = 0,
        n = +(this.couponInfo && this.couponInfo.money || 0),
        e = this.zkmoney;
      return t = this.blxs(this.money - n - e), t <= 0 && (t = .01), t
    }
  },
  methods: {
    // 同意用户协议
    pleaseComfirm(e) {
      console.log(e.target.value);
      this.ischeack = e.target.value;

    },
    selectYou() {
      if (this.zfid === 1) {
        return message('多重优惠不可重叠使用', 3)
      }
      console.log(1111);
      uni.navigateTo({
        url: 'selectYou?money=' + this.money + '&zfid=' + this.zfid
      })
    },

    //获取手机号
    mpGetphonenumber: function (t) {
      var n = this;
      if (this.loading = !0, "getPhoneNumber:ok" != t.detail.errMsg) return this.loading = !1,
        void uni.showModal({
          title: "温馨提示",
          content: "授权手机号失败",
          showCancel: !1
        });

      // let sessionKey = uni.getStorageSync('session_key');
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
        this.users.userTel = res.data
        n.loading = !1, res && (n.show = !1, 4 == n.type ? message("绑定成功", 1, 1e3) : n
          .$emit(
            "refresh", res), n.refreshUser({
              nomask: 1,
              get: 1,
              now: 1
            }));
        this.isshow = false
        this.gitRechargeList()
      }).catch(e => {
        n.loading = !1;
      })

    },
    // //获取优惠券
    // obtainCoupon: function() {
    // 	this.$api.shop_receive__window__coupon(this.yhjid).then(res => {
    // 		console.log(res, "123456")
    // 	})
    // 	this.isshow = false
    // },


    //充值会员
    useCoupon: function (index) {
      if (this.bordershow == index) {
        this.bordershow = -1
        this.orderType = "5"
        this.payType = ""
        if (this.zfid == 1) {
          this.params.money = (this.money * 100 - this.users.balance * 100) / 100
        } else {
          this.params.money = this.money
        }
      } else {
        this.bordershow = index
        this.params.money = this.RechargeList[index].money
        this.orderType = "2"
        this.payType = ""
        this.member = []
        this.member.push(this.RechargeList[index])
      }
    },
    //支付
    gitRechargeList: function () {
      // uni.navigateTo({
      // 	url:"../../order/vip/open"
      // })
      // return;

      if (this.zfid === '') {
        return message("请选择支付方式", 3)
      }

      // uni.navigateTo({
      // 	url:"./zfwc"
      // })
      // return
      var reg = new RegExp(/^\d{0,10}?\.?\d{1,2}$/)
      if (!this.money) {
        return message("请输入金额", 3)
      }
      if (!reg.test(this.money)) {
        return message("金额输入不正确", 3)
      } else {
        if (this.users.userTel == null) {
          this.isshow = true
          return
        } else {
          // 金额判断
          if (this.zfid == 2) {
            if (this.money - this.youObj.money <= 0) {
              return message('请确认您的金额是否输入正确', 3)
            }
          }



          uni.requestSubscribeMessage({
            tmplIds: ['vzLKV00ddeEMEPN772rbV4ZuSrTL9UviTCyZIZG17d4'],
            success(res) {
              console.log(res);
            }
          });
          this.disabled = "1";
          this.$api.member_recharge__rule().then(res => {
            const {
              list
            } = res
            this.RechargeList = []
            for (var i = 0; i < list.length; i++) {
              if (this.money * 1.5 < list[i].money) {
                this.RechargeList.push(list[i])
              }
            }
            if (this.RechargeList.length == 0) {
              this.params.money = this.money
            } else {
              // this.params.money = this.RechargeList[0].money
              this.member.push(this.RechargeList[0])
              console.log(this.member, "5")
            }

          })
          this.bordershow = -1
          if (this.zfid == 2) {
            if (this.youObj.money) {
              this.params.money = (this.money - this.youObj.money).toFixed(2)
            } else {
              this.params.money = this.money
            }
            console.log(this.params.money, '8888888');
            this.params.balance = "0"
            this.orderType = "5"
            this.payType = ""
            this.zfshow = true
            // this.hqdd()
          } else {
            if (parseFloat(this.money) > parseFloat(this.users.balance == null ? '0' : this.users
              .balance)) {
              this.params.balance = this.users.balance
              this.params.money = (this.money * 100 - this.users.balance * 100) / 100
              this.orderType = "5"
              this.payType = ""
              this.zfshow = true
            } else {
              this.params.money = this.money
              this.orderType = "5"
              this.payType = "1"
              this.hqdd()
            }
          }
        }

      }

    },
    // 点击用户协议
    tapXy() {
      this.popshow = true;
    },

    //获取订单
    hqdd() {
      if (this.orderType == "5") {
        console.log('8989');
        this.$api.cashier_save__cashier(Object.assign(this.params, { 'userCouponId': this.youObj.id })).then(res => {
          return
          this.ljzf(res.data)
        })
      } else {

        this.$api.member_recharge__order({
          money: this.params.money,
          monetary: this.money,
          storeId: this.params.storeId,
          userCouponId: this.youObj.id
        }).then(res => {
          return
          this.ljzf(res.data)
        })
      }
    },
    //立即支付
    ljzf: function (i) {
      this.$api.pay_pay({
        payType: this.payType,
        orderId: i,
        orderType: this.orderType,
        info: {
          money: this.params.money,
          // money: "0.01",
          storeName: "沐掌柜",
          type: "下单支付",
          cancel: 1,
          go: {
            t: 4,
          },
        }
      }).then(res => {
        if (this.payType == "1") {
          uni.reLaunch({
            url: "./zfwc?orderId=" + i + "&payType=" + this.payType +
              "&orderType=" +
              this.orderType
          })
        } else {
          uni.requestPayment({
            ...res.data,
            provider: 'wxpay',
            orderInfo: res.data,
            success: (res) => {
              console.log(res);
              uni.reLaunch({
                url: "./zfwc?orderId=" + i + "&payType=" + this
                  .payType + "&orderType=" + this.orderType
              })
              // if (9e3 == t.resultCode) n.setzfcg(),
              // 	this.go({
              // 		t: 2,
              // 		url: "zfwc?payObj=" + encodeURIComponent(JSON.stringify(i))
              // 	});
              // else if (6001 == t.resultCode) {
              // 	if (message("取消支付", 2), i.info.cancel) return;
              // 	setTimeout((function() {
              // 		this.go(i.info.go)
              // 	}), 1e3)
              // } else uni.showModal({
              // 	title: "提示",
              // 	content: JSON.stringify(t)
              // });
            },
            complete: function (e) {
              console.log("paymentcomplete", e)
            }
          })
        }


      });
    },
    close: function () {
      this.zfshow = false
      this.disabled = '2'
      this.ischeack = [];
    },

    minput: function (t) {
      this.couponInfo = null
    },
    changeUsecoupon: function () {
      var n = 0,
        e = deepCopy(this.yhqArr);
      for (var r in e) 1 == e[r].isUse && (this.money >= +e[r].full || 1 == e[r].isLimit ? (e[r]
        .isUse = 1,
        n +=
        1) : e[r].isUse = 2);
      this.kyhb = {
        n: n,
        data: e
      }, t.setStorageSync("kyhb", this.kyhb)
    },
    getConfig: function () {
      var t = this;
      this.$api.config_config({
        ident: "cashierset"
      }).then(res => {
        t.mdconfig = res;
      })
    },
    getyhqArr: function () {
      var n = this;
      // return l(r.default.mark((function e() {
      // 	var o, u;
      // 	return r.default.wrap((function(e) {
      // 		while (1) switch (e.prev = e.next) {
      // 			case 0:
      // 				return n.util.showLoading(), t.setStorageSync("kyhb", {
      // 					n: 0,
      // 					data: []
      // 				}), e.next = 4, n.util.request({
      // 					url: n.api.AvailableCoupon,
      // 					method: "POST",
      // 					data: {
      // 						type: 3,
      // 						userId: n.params.userId,
      // 						storeId: n.params.storeId
      // 					}
      // 				});
      // 			case 4:
      // 				o = e.sent, u = o.data, u && (n.yhqArr = u, n.changeUsecoupon()), t.hideLoading();
      // 			case 8:
      // 			case "end":
      // 				return e.stop()
      // 		}
      // 	}), e)
      // })))()
    },
    changeCoupon: function (t) {
      this.couponInfo = t || null, this.params.useCouponId = t ? t.id : ""
    },
    // qdzf: function() {		
    // 	var t = this;
    // 	t.checkLogin().then(res => {
    // 		t.requestSM("cashierOrder");
    // 		t.params.storeId = "1";
    // 		t.params.money = "1";
    // 		this.$api.cashier_save__cashier(t.params).catch(err => {
    // 		}).then(res => {

    // 			t.go({
    // 				t: 2,
    // 				url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON
    // 					.stringify({
    // 						orderId: res,
    // 						orderType: 5,
    // 						info: {
    // 							money: t.total,
    // 							type: "买单支付",
    // 							cancel: 1,
    // 							go: {
    // 								t: 6,
    // 								url: "/yb_wm/index/order-index"
    // 							}
    // 						}
    // 					}))
    // 			})
    // 		})
    // 	})
    // }
  }
}
</script>
<style scoped lang="scss">
.zfbox {
  padding: 42rpx 24rpx;
  background: #f5f5f5;
  width: 100%;
}
.popwrap {
  width: 100%;
  height: 300rpx;
  background: #ffffff;
  .popwrapheader {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    margin-left: 10rpx;
  }
}

.bigbox {
  background: #ffffff;
  border-radius: 10rpx;
  padding: 0 22rpx;
  height: 554rpx;
  width: 100%;
}

.bigbox_one {
  position: relative;
  height: 110rpx;
  padding-left: 170rpx;
  padding-top: 40rpx;
  font-size: 30rpx;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bigbox_one image {
  position: absolute;
  top: -16rpx;
  left: 0;
  width: 120rpx;
  height: 120rpx;
}

.bigbox_two {
  position: relative;
  margin-top: 30rpx;
}

.bigbox_two .input1 {
  width: 100%;
  height: 100rpx;
  background: #f5f5f5;
  font-size: 48rpx;
  text-align: right;
  padding: 0 32rpx;
  border-radius: 10rpx;
}

.placeholder {
  position: absolute;
  top: 12rpx;
  left: 32rpx;
  font-size: 48rpx;
}

.bigbox_two .font {
  width: 100%;
  height: 44rpx;
  line-height: 44rpx;
  text-align: right;
  font-size: 18rpx;
  color: #666666;
  padding-right: 32rpx;
}

.bigbox_two .input2 {
  width: 100%;
  height: 80rpx;
  background: #f5f5f5;
  padding-left: 32rpx;
  font-size: 18rpx;
  color: #999999;
  border-radius: 10rpx;
}

.bigbox_three {
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
  margin-top: 40rpx;
}

.bigbox_three .font1 {
  color: #333333;
}

.bigbox_three .font2 {
  color: #666666;
}

.bigbox_four {
  display: flex;
  justify-content: space-between;
  margin-top: 50rpx;
}

.bigbox_four .btm {
  width: 265rpx;
  height: 100rpx;
  border: 2px solid #ff9f38;
  border-radius: 25rpx;
  color: #666666;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bigbox_four .btm2 {
  width: 265rpx;
  height: 100rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(136deg, #F7D378  0%, #F6A920   100%); */
  /* background: #027AFF; */
  background: linear-gradient(#f8a144, #d84333);
  color: #ffffff;
}

.but {
  width: 550rpx;
  height: 86rpx;
  background: linear-gradient(to right, #f2d8a7, #eebe6c);
  // background: linear-gradient(136deg, #F7D378  0%, #F6A920   100%);
  /* background: #027AFF; */
  // background:linear-gradient(#F8A144 , #D84333);
  color: #ffffff;
  border-radius: 50rpx;
  margin-top: 50rpx;
}

.bottom {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  z-index: 999;
  box-sizing: border-box;
}

.bottom .bigbox {
  height: 570rpx;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #eeeeee;
}

.bottom .one {
  background: #ffffff;
  height: 310rpx;
  width: 100%;
  padding: 0 44rpx;
  position: relative;
}

.one .qx {
  position: absolute;
  right: 44rpx;
  top: 20rpx;
}

.bottom .one .bottom_font {
  height: 84rpx;
  font-size: 32rpx;
  text-align: center;
  line-height: 84rpx;
  border-bottom: 1px solid #eeeeee;
}

.bottom .one .bottom_font2 {
  font-size: 28rpx;
  margin-top: 26rpx;
  margin-bottom: 34rpx;
}

.bottom .one .hidden {
  overflow: hidden;
  overflow-x: scroll;
  height: 185rpx;
  position: relative;
}

.hidden {
  margin-top: 30rpx;
  .box {
    .baseItem {
      height: 160rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .priItemBox:first-child {
      margin-left: 0;
    }
    .nocheack:first-child {
      margin-left: 0;
    }
    .priItemBox {
      width: 260rpx;
      height: 160rpx;
      border-radius: 10rpx;
      background: linear-gradient(to bottom right, #fcf0da 50%, #fee8c3 50%);
      margin-left: 30rpx;
    }

    .nocheack {
      width: 260rpx;
      height: 160rpx;
      border-radius: 10rpx;
      background: #fff9eb;
      margin-left: 30rpx;
    }
  }
}

.bottom .one .hidden .box {
  display: flex;
  position: absolute;
}

.hidden .box .minbox {
  /* width: 256rpx;
		height: 127rpx;
		border-radius: 10rpx;
		text-align: center;
		margin-right: 20rpx;
		border: 2px solid #FB9237;
		background-color: #FFFFFF !important; */

  width: 256rpx;
  height: 127rpx;
  border-radius: 10rpx;
  text-align: center;
  margin-right: 20rpx;
  border: 2px solid #fb9237;
  position: relative;
}

.minbox .size {
  /* 	color: #FB9237;
		font-size: 36rpx;
		margin-top: 16rpx; */
  color: #333333;
  font-size: 32rpx;
  margin-top: 16rpx;
}

.minbox .size2 {
  /* color: #050599;
		font-size: 20rpx; */
  color: #050599;
  font-size: 28rpx;
}

.yborder {
  width: 256rpx;
  height: 127rpx;
  border-radius: 10rpx;
  text-align: center;
  margin-right: 20rpx;
  border: 2px solid #fb9237;
  /* background: linear-gradient(#E64433, #FF9F38); */
}

.yborder .size {
  color: #333333;
  font-size: 30rpx;
  margin-top: 16rpx;
}

.yborder .size2 {
  color: #050599;
  font-size: 28rpx;
}

.bottom .two {
  height: 85rpx;
  width: 100%;
  background-color: #ffffff;
  margin-top: 11rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
}

.bottom .two .two_left {
  display: flex;
  align-items: center;
  margin-left: 14rpx;
}

.bottom .two .two_left image {
  width: 52rpx;
  height: 52rpx;
  margin-right: 9rpx;
}

.bottom .two .two_right image {
  width: 30rpx;
  height: 30rpx;
}

.zfbtn {
  width: 538rpx;
  height: 94rpx;
  color: #ffffff;
  text-align: center;
  line-height: 94rpx;
  margin-top: 16rpx;
  font-size: 38rpx;
  // background: linear-gradient(90deg, #F2D8A7 0%, #EEBE6C 100%)
  background: linear-gradient(to right, #f2d8a7, #eebe6c);
  border-radius: 50rpx;
}
.nozfbtn {
  background: #dddddd !important;
}

.sjh {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  padding: 0 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
