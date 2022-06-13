<template>
  <view class="h100 ">
    <view>
      <view class="cf p-r " :style="'background:'+tColor+';'">
        <view class="rwimg p-a b0 r0 ">
          <mg-img m="aspectFit" src="/static/pay/ylbg.png" vueId="49ce66d7-1"></mg-img>
        </view>
        <view class="p-r ">
          <view class="zl1c ">
            <view class="f-y-c top ">
              <view class="f-g-1 ">
                <view class="f42 mb30 wei6 ">支付成功</view>
                <view>
                  <view>{{'实付'+sl+(ylInfo.money||'--')}}</view>
                  <view>{{ylInfo.payModeName}}</view>
                </view>
              </view>
              <view class="f-g-0 gouc f-c ">
                <image class="img " mode="widthFix" src="https://yunbei.lianmengfu.net/xcxpic/wd/yldd.png"></image>
              </view>
            </view>
            <view class="p30 ">
              <block v-if="ylInfo.payPolitely==1">
                <view class="mb20 f-y-c f24 " v-if="ylInfo.couponName">
                  <view class="f-y-c jli bf cf mr20 f-g-0 ">
                    <view class="wei f22 ">代金券</view>
                  </view>
                  <view>{{'订单完成后，您将获得'+ylInfo.couponName+'门店代金券1张！'}}</view>
                </view>
                <view class="mb20 f-y-c f24 " v-if="ylInfo.balance>0">
                  <view class="f-y-c jli bf cf mr20 f-g-0 ">
                    <view class="wei f22 ">{{balanceName}}</view>
                  </view>
                  <view>{{'订单完成后，您将获得'+ylInfo.balance+balanceName+'！'}}</view>
                </view>
                <view class="mb20 f-y-c f24 " v-if="ylInfo.integral>0">
                  <view class="f-y-c jli bf cf mr20 f-g-0 ">
                    <view class="wei f22 ">{{jfName}}</view>
                  </view>
                  <view>{{'订单完成后，您将获得'+ylInfo.integral+jfName+'！'}}</view>
                </view>
                <view class="mb20 f-y-c f24 " v-if="ylInfo.growth>0">
                  <view class="f-y-c jli bf cf mr20 f-g-0 ">
                    <view class="wei f22 ">成长值</view>
                  </view>
                  <view>{{'订单完成后，您将获得'+ylInfo.growth+'成长值！'}}</view>
                </view>
              </block>
              <view class="f-c p10 ">
                <!-- <view @tap="go({t:6,url:'/yb_wm/index/index'})" class="ckdd b-d f-c mr40 ">逛逛首页</view> -->
                <view @tap="ckdd" class="ckdd b-d f-c ">完成</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="zlbd p-r o-h ">
        <view class="bf p3 f24 c9 bs30 ">{{'注意:'+system.name+'及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。'}}</view>
        <block v-if="shopinfo.id">
          <view class="f-y-c p23 ">
            <view class="tjl f-1 "></view>
            <view class="f-y-c wntj c9 ">
              <text>为你推荐</text>
            </view>
            <view class="tjr f-1  "></view>
          </view>
          <product-group :co="pgco" :shopinfo="shopinfo" vueId="49ce66d7-2"></product-group>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import productGroup from 'components/drag/product.vue'
import {
  getPage,
  setNT,
  throttle
} from 'common/util'
export default {
  name: "rwzx",
  components: {
    productGroup
  },
  data: function () {
    return {
      shopinfo: {},
      ylInfo: {}
    }
  },
  onLoad: function (t) {
    this.getSystem({
      setNB: 1
    }), setNT(""), this.payObj = JSON.parse(decodeURIComponent(t.payObj)) || {
      orderId: 61,
      orderType: 1,
      info: {
        money: .01,
        storeName: "楚河11汉街店",
        type: "下单支付",
        cancel: 1,
        go: {
          t: 4
        }
      }
    }, this.getData()
  },
  computed: {
    jfName: function () {
      return this.system.custom.integral
    },
    balanceName: function () {
      return this.system.custom.balance
    },
    pgco: function () {
      return {
        circle: "8",
        colorBg: "rgba(0,0,0,0)",
        colorBtn: this.tColor,
        colorProductBg: "#fff",
        colorTitle: "#212121",
        img: "https://bkycms.com/addons/yb_wm/web/static/yb_wm/36/2020/09/24/202009241022175541.png",
        marginBottom: "0",
        marginLR: "0",
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        productMarket: "3",
        productNum: "4",
        type: "1",
        typeBg: "1",
        typeBtn: "3",
        typePay: "4",
        typeProduct: "3",
        typeText: "推荐"
      }
    }
  },
  methods: {
    getData: function () {
      var t = this;
      this.$api['order_pay__politely']({
        id: t.payObj.orderId,
        orderType: t.payObj.orderType
      }).then(res => {
        t.ylInfo = res,
          t.shopinfo = {
            id: res.storeId
          }
      })
    },
    ckdd: throttle((function (t) {
      if (4 == this.payObj.info.go.t) {
        var e = getPage();
        e.$vm.paySuccess && e.$vm.paySuccess()
      }
      5 == this.payObj.orderType ? getApp().globalData.ddquery = {
        nt: 1,
        t: 2
      } : 6 == this.payObj.orderType && (getApp().globalData.ddquery = {
        nt: 1,
        t: 4
      });
      this.go(this.payObj.info.go)
    }), 1e3)
  }
}
</script>
<style scoped>
.rwimg {
  width: 194rpx;
  height: 146rpx;
  bottom: 10rpx;
}

.zl1c {
  padding: 0 90rpx 50rpx;
}

.zl1c .top {
  padding: 30rpx 0;
  border-bottom: 1px dashed hsla(0, 0%, 100%, 0.3);
}

.zl1c .jli {
  padding: 2rpx 10rpx;
  border-radius: 10rpx;
  background: #f44336;
}

.zl1c .limg {
  width: 32rpx;
  height: 34rpx;
  margin-right: 3rpx;
}

.cea {
  color: #e03d2a;
}

.ckdd {
  border-color: #fff;
  width: 220rpx;
  height: 68rpx;
  border-radius: 68rpx;
}

.mr40 {
  margin-right: 40rpx;
}

.gouc .img {
  width: 170rpx;
}

.zlbd {
  border-radius: 30rpx 30rpx 0 0;
  margin-top: -30rpx;
}

.wntj {
  margin: 0 30rpx;
}

.tjl {
  height: 1px;
  background: linear-gradient(90deg, #f5f5f5, #bababa);
}

.tjr {
  height: 1px;
  background: linear-gradient(-90deg, #f5f5f5, #bababa);
}
</style>