<template>
  <view>
    <navBar :title="'收款'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="coll">
      <view class="input_text">
        <view class="userName">
          <image class="nameImg" src="https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/06/16/202206161439165508.png" mode="aspectFit" />
          <view class="name">{{shopinfo.name?shopinfo.name:'沐掌柜'}}</view>
        </view>

        <view class="inputMoney">
          <view class="icon">￥</view>
          <input class="inputMoneyUser" type="digit" placeholder-style="font-size:25rpx" placeholder="请输入金额" focus="true" maxlength="8" v-model="inputMoney" />
        </view>

        <view class="title" @click="SelectCoupons">
          <view>优惠券</view>
          <view>
            <text v-if="!youObj.id">请选择优惠券</text>
            <text v-else>{{youObj.couponName}} {{youObj.money}}</text>
            <image class="couponImg" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou.png" mode="aspectFit" />
          </view>
        </view>

        <view class="switchPay">
          <view :class="['pay',payIndex == 2 ? 'active' : '']" @click="switchPay(2)">
            <view class="payItem" v-for="(item,index) in payArr" :key="index">
              <image class="payItemImg1" :src="item.img" mode="aspectFit" />
              <view class="payName">{{item.name}}</view>
            </view>
          </view>
          <view :class="['pay',payIndex==1 ? 'active' : '']" @click="switchPay(1)">
            <view class="payItem">
              <image class="payItemImg2" src="https://yunbei.lianmengfu.net/xcxpic/icon/qianbao.png" mode="aspectFit" />
              <view class="payName">余额支付</view>
            </view>
            <view class="yueMoney">余额:{{users.balance ? users.balance : '0.00'}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="goPay" @click="gitRechargeList">立即支付</view>
    <!-- 支付弹窗 -->
    <payPupup :show="show" :params="params" @confirm="confirm" :activeIndex="activeIndex" @goPay="goPay" @setRecharge="useCoupon" :list="RechargeList"></payPupup>
  </view>

</template>

<script>
import payPupup from "./components/payPupup.vue";
import { message } from 'common/util';
import getMath from "@/utils/math.js";
import {
  platform
} from 'common/apiconfig';
import { setRequestPayment } from "@/utils/pay.js"
export default {
  components: {
    payPupup,
  },
  data() {
    return {
      payIndex: '',//选择支付方式   1==>余额充值     2==>微信
      show: true,//底部弹窗

      users: {},//用户信息
      shopinfo: {},//店铺信息
      inputMoney: '',//输入的钱
      params: {
        money: "",//输入的钱
        storeId: uni.getStorageSync('storeinfo').storeid, //店铺storeid
        useCouponId: "",//优惠券
        balance: ""
      },
      RechargeList: [],//充值列表
      activeIndex: 0,//充值下标
      member: [],//未知
      orderType: 2,
      payType: 1, //余额1   微信未知
      youObj: { //优惠券信息
        couponName: '',
        money: 0,
        id: 0
      },
      payArr: [],
    }
  },

  onLoad(options) {
    this.init()
    this.getPayArr()
  },

  onShow() {
    let that = this;
    uni.$on("handClick", res => {
      if (res.id) {
        that.youObj = res;
        that.params.useCouponId = res.id;
      }
      uni.$off('handClick');
    })
  },
  methods: {
    getPayArr() {
      var e = [];
      "mini" == platform.appType ||
        "weChat" == platform.appType ? e.push({
          name: "微信支付",
          value: "wx",
          img: "https://yunbei.lianmengfu.net/xcxpic/icon/weixin.png",
          img2: "wxb",
          color: "#65B05B",
          text: "更方便，更快捷"
        }) : "ali" == platform.appType ? e.push({
          name: "支付宝支付",
          value: "zfb",
          img: "https://wlh-1307843985.cos.ap-beijing.myqcloud.com/yb_wm/1/2022/06/17/202206171233295272.png",
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

      this.payArr = e;
    },
    //初始化信息
    init() {
      uni.login({
        success: (res) => {
          this.$api.login_login({
            code: res.code
          }).then(res1 => {
            getApp().globalData.session_key = res1.session_key;
            this.users = res1;
            uni.setStorageSync("userId", res1.userId);

            this.$api.order_order__set({ storeId: this.params.storeId });
            this.$api.shop_lately__store().then(res => {
              this.shopinfo = res;
              this.params.storeId = res.id
            })
          })
        }
      })
    },

    switchPay(event) { //选择支付方式
      this.payIndex = event
      if (event == 1) {
        this.setCoupon()
      }
    },
    goPay() {
      this.activeIndex = 0;
      this.params.money = this.inputMoney;
      this.orderType = 2;
      this.show = !this.show;
    },

    setCoupon() {//重置优惠券
      this.youObj.couponName = '';
      this.youObj.money = 0;
      this.youObj.id = 0;
      this.params.useCouponId = 0;
    },



    //支付
    gitRechargeList: function () {
      var reg = new RegExp(/^\d{0,10}?\.?\d{1,2}$/);
      if (this.payIndex === '') { return message("请选择支付方式", 3) }
      if (!this.inputMoney) { return message("请输入金额", 3) }
      if (!reg.test(this.inputMoney)) {
        return message("金额输入不正确", 3)
      } else {
        if (this.payIndex == 2) {
          if (this.inputMoney - this.youObj.money <= 0) {
            return message('请确认您的金额是否输入正确', 3)
          }
        }
        // #ifdef MP-WEIXIN
        uni.requestSubscribeMessage({ tmplIds: ['vzLKV00ddeEMEPN772rbV4ZuSrTL9UviTCyZIZG17d4'] });
        // #endif 

        this.$api.member_recharge__rule().then(res => {
          const { list } = res;
          this.RechargeList = []
          for (var i = 0; i < list.length; i++) {
            if (this.inputMoney * 1.5 < list[i].money) {
              this.RechargeList.push(list[i])
            }
          }
          if (this.RechargeList.length == 0) {
            this.params.money = this.inputMoney
          } else {
            if (this.youObj.id) {
              this.activeIndex = null
            } else {
              this.params.money = this.RechargeList[0].money
            }
            this.member.push(this.RechargeList[0])
          }

        })

        if (this.payIndex == 2) {
          if (this.youObj.money) {
            this.params.money = getMath.subtract(this.inputMoney, this.youObj.money)
          } else {
            this.params.money = this.inputMoney
          }
          this.params.balance = "0"
          //   this.orderType = "5"
        } else {
          if (parseFloat(this.inputMoney) > parseFloat(this.users.balance == null ? '0' : this.users
            .balance)) {
            this.params.balance = this.users.balance
            this.params.money = (this.inputMoney * 100 - this.users.balance * 100) / 100
            // this.orderType = "5"
          } else {
            this.params.money = this.inputMoney
            // this.orderType = "5"

          }
        }
      }
      this.show = !this.show;
    },

    //选择充值
    useCoupon: function (index) {
      if (this.activeIndex == index) {
        this.activeIndex = -1;
        this.orderType = "5";
        if (this.payIndex == 1) {
          this.params.money = getMath.subtract(this.inputMoney, this.youObj.money)
        } else {
          this.params.money = getMath.subtract(this.inputMoney, this.youObj.money)
        }
      } else {
        this.setCoupon()
        this.activeIndex = index;
        this.params.money = getMath.subtract(this.RechargeList[index].money, this.youObj.money)
        this.orderType = "2";
        this.member = [];
        this.member.push(this.RechargeList[index]);
      }
    },

    //最后支付
    confirm() {
      if (this.orderType == "5") {
        this.$api.cashier_save__cashier(Object.assign(this.params)).then(res => {
          this.ljzf(res.data)
        })
      } else {

        this.$api.member_recharge__order({
          money: this.params.money,
          monetary: this.money,
          storeId: this.params.storeId,
          userCouponId: this.youObj.id
        }).then(res => {
          this.ljzf(res.data)
        })
      }
    },

    //立即支付
    ljzf: function (event) {
      var i = {
        orderId: event,
        orderType: this.orderType
      }
      this.$api.pay_pay({
        payType: this.payIndex == "1" ? 1 : '',
        orderId: event,
        orderType: this.orderType,
        info: {
          money: this.params.money,
          storeName: "沐掌柜",
          type: "下单支付",
          cancel: 1,
          go: {
            t: 4,
          },
        }
      }).then(res => {
        if (this.payIndex == "1") {
          uni.reLaunch({
            url: "/pages/individualAccount/paymentSuccessful/index?orderId=" + event + "&payType=" + 1 +
              "&orderType=" +
              this.orderType
          })
        } else {
          return setRequestPayment(res.data, i, 'Collection')
        }
      });
    },


    SelectCoupons() {
      if (this.payIndex === 1) { return message('多重优惠不可重叠使用', 3) }
      uni.navigateTo({
        url: '/yb_wm/shop/in/selectYou'
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.coll {
  display: flex;
  flex-direction: column;
  align-items: center;
  .input_text {
    margin-top: 48rpx;
    width: 690rpx;
    background: #fff;
    box-shadow: 0rpx 6rpx 9rpx -3rpx rgba(0, 0, 0, 0.06);
    border-radius: 8rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // padding: 30rpx 22rpx;
    padding: 30rpx 22rpx 60rpx 22rpx;
    .userName {
      position: absolute;
      left: 26rpx;
      top: -30rpx;
      display: flex;
      align-items: center;
      .nameImg {
        width: 188rpx;
        height: 188rpx;
      }
      .name {
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        padding: 0rpx 30rpx;
      }
    }
    .inputMoney {
      padding: 0rpx 20rpx;
      margin-top: 180rpx;
      width: 650rpx;
      height: 96rpx;
      background: #f4f4f4;
      border-radius: 5rpx;
      opacity: 0.8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        font-size: 50rpx;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #333333;
      }
      .inputMoneyUser {
        text-align: right;
        font-size: 40rpx;
        color: #000;
        font-weight: 600;
        background: #f4f4f4;
        caret-color: #09bb07;
        padding-right: 5rpx;
      }
      /deep/.u-input__content__field-wrapper {
        font-weight: 700;
      }
    }
    .title {
      padding: 31rpx 10rpx;
      width: 650rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      view {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 600;
        color: #666666;
        image {
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
    .switchPay {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .active {
        background: #fff7e6;
        border-radius: 10rpx;
        border: 5rpx solid #e8af3a !important;
      }
      .pay {
        width: 270rpx;
        height: 100rpx;
        // background: #fff7e6;
        border-radius: 10rpx;
        border: 5rpx solid #dedede;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .payItem {
          display: flex;
          align-items: center;
          .payItemImg1 {
            width: 32rpx;
            height: 28rpx;
          }
          .payItemImg2 {
            width: 28rpx;
            height: 25rpx;
          }
          .payName {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 600;
            color: #222222;
            padding: 0rpx 10rpx;
            letter-spacing: 3rpx;
          }
        }
        .yueMoney {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #faad0d;
        }
      }
    }
  }
}
.goPay {
  width: 568rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-weight: 800;
  color: #fff;
  font-size: 30rpx;
  background: linear-gradient(227deg, #fac763 0%, #faaf1a 100%);
  margin: 100rpx auto;
  border-radius: 50rpx;
}
</style>