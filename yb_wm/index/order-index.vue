<template>
  <view :class="['pb115 ',showCoupon||showCancel?'bgfix':'']">
    <view class="fixedtop ">
      <uni-nav-bar @onMore="onmore" :border="false" :custommore="true" :fixed="false" id="uninavbar" :isleft="false" :ispr="false" :statusBar="true" :uriconopcity="0" :uropcity="1" vueId="5f35cbf1-1" :vueSlots="['default','left']">
        <view @tap="go({t:4})" class="hdsy bsf f-c " slot="left">
          <uni-icons type="back" size="20"></uni-icons>
        </view>
        <view class="oi1c be f-y-c bs15 ">
          <block v-for="(v, i) in tarr" :key="i">
            <view @tap="tClick(i)" :class="['item f-c bs10 f26 wei ',i==taIdx?'bf':'']" v-if="v.show">{{v.name}}
            </view>
          </block>
        </view>
      </uni-nav-bar>
      <nav-tab cname @changeTab="changeTab" v-model="aIdx" ifsize="32" :tabs="tabs" vueId="5f35cbf1-2" v-if="taIdx==0">
      </nav-tab>
      <block v-else>
        <view class="f-row bf " v-if="taIdx==1&&tntabs.length">
          <view class="f-1 b-r-d ">
            <nav-tab cname @changeTab="changeTab" v-model="aIdx" ifsize="32" :tabs="tntabs" :value="aIdx" vueId="5f35cbf1-3">
            </nav-tab>
          </view>
        </view>
      </block>
    </view>
    <view class="mt90 p2 " :style="'margin-top:'+toph+';'">
      <block v-if="isLogin">
        <block v-if="taIdx==0">
          <my-order @operation="operation" :co="v" :vueId="'5f35cbf1-4-'+i" v-for="(v, i) in dataList" :key="i"></my-order>
        </block>
        <dn-order v-model="laIdx" @refresh="dnrefresh" :datalist="dataList" :labelarr="labelArr" :ltop="toph" :otype="tntabs[aIdx].type" :value="laIdx" vueId="5f35cbf1-5" v-else></dn-order>
        <jzz bgcolor="transparent" :mygd="mygd" :nodata="dataList.length==0&&isget" otext="您今天还没有下单" ttext="快去选择喜欢的商品吧" vueId="5f35cbf1-6"></jzz>
        <view @tap="go({t:6,url:'/pages/tabbar/order/index'})" class="oiqdd bs5 f-c f34 cf ma " :hidden="!(dataList.length==0&&isget)" :style="'background:'+tColor+';'">去点单</view>
      </block>
      <view class="f-c-c " v-else>
        <view class="wdlimg ">
          <!-- <mg-img src="/static/static/zwdd.a9f141cb.png" vueId="5f35cbf1-7"></mg-img> -->
        </view>
        <view class="c6 ">登录后才能查看订单哦</view>
        <view @tap="checkLogin" class="ljdl bs15 cf " :style="'background:'+tColor+';'">立即登录</view>
      </view>
      <footc vueId="5f35cbf1-8"></footc>
    </view>
    <tab-bar vueId="5f35cbf1-9"></tab-bar>
    <mg-modal v-model="showCoupon" ismr="true" vueId="5f35cbf1-10" :vueSlots="['default']" width="630rpx" :zIndex="3000">
      <view class="bf bs10 " v-if="!tcCoupon.couponInfo">
        <view>
          <view class="p330 f-c-c ">
            <!-- <image class="payimg " mode="widthFix" src="/static/static/pay/payok.png"></image> -->
            <view class="mt20 f30 wei ">支付成功</view>
            <view class="mt5 f50 wei ">{{sl+tcCoupon.paymoney}}</view>
          </view>
          <mg-cell last="1" :vueId="'5f35cbf1-11'+','+'5f35cbf1-10'" :vueSlots="['bd']">
            <view class="f-y-c c6 " slot="bd">
              <view class="f-g-0 c3 mr30 ">返赠</view>
              <view class="f-g-1 c9 f26 ">{{'恭喜你获得1张优惠券共'+tcCoupon.money+'元'}}</view>
            </view>
          </mg-cell>
        </view>
        <view class="p25 hlt " :style="'background:'+'linear-gradient(45deg,rgba('+tcCoupon.couponInfo?null:cTR(t.tColor) +',0.5),'+tColor+')'+';'">
          <view v-for="(v, i) in tcCoupon.couponInfo" :key="i">
            <mg-coupon cname :co="v" :color="color" ptype="5" :vueId="'5f35cbf1-12-'+i+','+'5f35cbf1-10'">
            </mg-coupon>
          </view>
        </view>
        <view class="f-row hlt " style="height:100rpx;">
          <button @tap="showCoupon = !1" class="btn f-1 bf f30 h100 f-c c9 " hoverClass="be">关闭</button>
          <button @tap="ljck" class="btn f-1 bf f30 h100 f-c hll " hoverClass="be" :style="'color:'+tColor+';'">立即查看</button>
        </view>
      </view>
    </mg-modal>
    <mg-popup v-model="showCancel" position="bottom" vueId="5f35cbf1-13" :vueSlots="['default']">
      <view class="bf bs3000 " :style="'padding-bottom:'+(isIpx?'155rpx':'115rpx')+';'">
        <view class="p3 c0 t-c wei ">取消订单</view>
        <view class="p20 o-y-s " style="max-height:600rpx;">
          <view class="bs10 p23 bf5 f24 m03 ">
            <view class="mb20 ">温馨提示</view>
            <view>1.限时特价、预约资格等购买优惠可能一并取消</view>
            <view>2.支付券不予返还;支付优惠一并取消</view>
            <view>3.订单一旦取消,无法恢复</view>
          </view>
          <view class="mt30 c0 wei p03 ">请选择取消订单的原因(必选):</view>
          <mg-radio :arr="yyArr" v-model="yyradio" bttc="f24" last="1" ranktype="2" rtype="2" :value="yyradio" :vueId="'5f35cbf1-14'+','+'5f35cbf1-13'"></mg-radio>
        </view>
        <view class="foot-btnc p-r hlt ">
          <button @tap="qdyy" class="foot-btn bd6 " :style="'background:'+(yyradio==''?'':tColor)+';'">确定</button>
        </view>
      </view>
    </mg-popup>
  </view>
</template>

<script>
import uniNavBar from "../../components/third/uni-nav-bar";
import myOrder from "yb_wm/index/components/my-order";
import dnOrder from "yb_wm/index/components/dn-order";
import jzz from "../../components/common/jzz";
import mgModal from "../../components/common/modal";
import mgCoupon from "../../components/common/mg-coupon";
import mgPopup from "../../components/common/popup";
import mgRadio from "../../components/form/mg-radio";
import footc from "../../components/common/footc";
import navTab from '../../components/common/functionCmp/nav-tab.vue';
import {
  debounce,
  getSb,
  makeTel,
  modal
} from "common/util";
import {
  mapActions,
  mapState
} from 'vuex';
import {
  utilMixins
} from 'common/utilMixins';
export default {
  name: "orderIndex",
  components: {
    uniNavBar,
    navTab,
    myOrder,
    dnOrder,
    jzz,
    mgModal,
    mgCoupon,
    mgPopup,
    mgRadio,
    footc,
  },
  data: function () {
    return {
      toph: 0,
      taIdx: 0,
      aIdx: 0,
      tabs: [{
        name: "当前订单"
      }, {
        name: "历史订单"
      }],
      tntabs: [{
        name: "快餐",
        type: 4
      }, {
        name: "当面付",
        type: 2
      }],
      labelArr: [],
      laIdx: 0,
      dataList: [],
      isget: !1,
      mygd: !1,
      params: {
        size: 10,
        page: 1
      },
      tcCoupon: {},
      showCoupon: !1,
      showCancel: !1,
      yyArr: [],
      yyradio: ""
    };
  },
  onLoad: function (e) {
    var n = this;
    n.getSystem({ nofc: true }).then(function () {
      n.toph = getSb().customNavh + uni.upx2px("96") + "px";
    });
    n.getLoginInfo();
    n.getConfig({
      key: "orderset",
      api: "order_order__set"
    });
    n.xgIdx(),
      n.changeTab(n.aIdx), n.getLayout();
    //  n.isload = !0
  },
  onReachBottom: debounce(function (t) {
    !this.mygd && this.isget && (this.isget = !1, this.getList());
  }, 300),
  onHide: function () {
    getApp().globalData.ddquery = "";
  },
  onShow: function () {
    var t = this;
    t.isload && (t.xgIdx(), t.refresh());
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      orderset: function (t) {
        return t.config.orderset
      }
    }),
    tarr: function () {
      return [{
        show: 1,
        name: this.system.custom.takeOut + "订单",
        type: 1
      }, {
        show: 1 == this.system.powerList.instore,
        name: this.system.custom.inStore + "订单",
        type: 2
      }];
    }
  },
  methods: {
    ...mapActions(['getConfig']),
    xgIdx: function () {
      getApp().globalData.ddquery && (this.taIdx = getApp().globalData.ddquery.nt, this.aIdx = this.tntabs.findIndex(
        function (t) {
          return t.type == getApp().globalData.ddquery.t;
        }));
    },
    tClick: function (t) {
      t != this.taIdx && (this.taIdx = t, this.aIdx = 0, this.refresh());
    },
    ljck: function () {
      this.showCoupon = !1, this.go({
        t: 1,
        url: "/yb_o2o/my/coupon/my"
      });
    },
    qdyy: function () {
      var t = this;
      this.showCancel = !1, "qxdd" == this.operationt ? (this.qxyy = this.qxyyArr.find(function (e) {
        return e.value == t.yyradio;
      }).name, this.qxdd(1)) : (this.qxyy = this.tkyyArr.find(function (e) {
        return e.value == t.yyradio;
      }).name, this.operation({
        t: "tk",
        co: this.orderInfo
      }));
    },
    operation: function (t) {
      console.log('t: ', t);
      //  order_cancel__order
      var e = this;
      var a, o;
      e.orderInfo = t.co;
      e.operationt = t.t;
      switch (t.t) {
        case "qxdd":
          // 6
          if (t.tip) return e.qxdd(1);
          // 14
          e.qxdd()
          break;
        case "cd":
          // 19
          a = {
            title: "您确认催单吗？",
            url: "order_reminder",
            params: {
              userId: e.user.userId,
              orderId: t.co.id
            }
          };
          //29
          break;
        case "qrsh":
          a = {
            title: "您确认已收到货吗？",
            url: "order_receiving",
            params: {
              orderId: t.co.id
            }
          }
          // 21
          break;
        case "scdd":
          // 23
          a = {
            title: "您确认删除订单吗？",
            url: "wmddsc",
            params: {
              orderId: t.co.id
            }
          }
          break;
        case "lxsj":
          // 25
          makeTel(t.co.storeTel)
          break;
        case "pj":
          e.go({
            t: 1,
            url: "/yb_o2o/order/pl?orderId=" + t.co.id + "&storeName=" + t.co.storeName
          })
          // 26
          break;
        case "ljzf":
          // 27
          e.go({
            t: 1,
            url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
              orderId: e.orderInfo.id,
              orderType: 1,
              info: {
                money: e.orderInfo.money,
                storeName: e.orderInfo.storeName,
                type: "下单支付",
                cancel: 1,
                go: {
                  t: 4
                }
              }
            }))
          })
          break;
        case 'sqtk':
          e.qxdd();
          break
        default:
          // 29
          break;
      }
      if (a && a.title)
        modal(a.title).then(res => {
          this.$api[a.url](a.params).then(res => {
            e.refresh();
          })
        }).catch(e => {

        });
    },
    qxdd: function (t) {
      var e = this;
      modal("您确认取消订单吗？").then(d => {
        this.$api.order_cancel__order({
          orderId: e.orderInfo.id,
          refund: e.orderInfo.id,
          note: t && e.qxyy || ""
        }).then(res => {
          e.refresh()
        })
      }).catch(e => {

      })
    },
    refresh: function () {
      this.changeTab(this.aIdx);
    },
    changeTab: function (t) {
      this.laIdx = 0, this.isget = this.mygd = !1, this.params.page = 1;
      if (0 == this.taIdx) {
        var e = "";
        switch (t) {
          case 0:
            e = "1";
            break;

          case 1:
            e = "2";
        }
        this.params.api = "order_order__list",
          this.iparams = {
            type: e
          };
      } else switch (this.tntabs[t].type) {
        case 1:
          this.labelArr = ["全部", "待付款", "已支付", "已关闭"],
            this.params.api = "MyInOrder",
            this.iparams = {
              state: ""
            };
          break;

        case 2:
          this.labelArr = [], this.params.api = "cashier_my__cashier", this.iparams = {};
          break;

        case 4:
          this.labelArr = ["全部", "制作中", "已完成"],
            this.params.api = "in-store_my__fast__order",
            this.iparams = {
              state: ""
            };
          break;

        case 3:
          this.labelArr = [],
            this.params.api = "wdyy",
            this.iparams = {};
          break;

        case 5:
          this.labelArr = [],
            this.params.api = "pdlb",
            this.iparams = {};
      }
      this.dataList = [],
        this.getList();
    },
    dnrefresh: function (t) {
      t.hasOwnProperty("state") ? (this.iparams.state = t.state, this.isget = this.mygd = !1,
        this.params.page = 1, this.dataList = [], this.getList()) : this.refresh();
    },
    getList: function () {
      var t = this;
      var jsons = Object.assign(t.params, t.iparams);
      this.$api[t.params.api] && this.$api[t.params.api](jsons).then(res => {
        var r = res;
        if (jsons.page == 1) t.dataList = [];
        t.dataList = t.dataList.concat(r),
          t.isget = !0, t.mygd = t.params
            .size > r.length,
          t.params.page++;
      })
    },
    onmore: function () { }
  }
}
</script>

<style scoped>
.hdsy {
  width: 64rpx;
  height: 64rpx;
  border: 0.5px solid #ddd;
}

.btn {
  border-radius: 0;
}

.btn::after {
  transform-origin: 50% 50%;
  border-radius: 0;
}

.oi1c {
  height: 68rpx;
  padding: 0 6rpx;
}

.oi1c .item {
  padding: 0 10rpx;
  min-width: 152rpx;
  height: 56rpx;
}

.oiqdd {
  width: 360rpx;
  height: 88rpx;
  margin-top: 40rpx;
}

.payimg {
  width: 153rpx;
  height: 155rpx;
}

.pt60 {
  padding-top: 50rpx;
}

.p25 {
  padding: 20rpx 50rpx;
}

.wdlimg {
  margin: 170rpx 0 0;
  width: 340rpx;
  height: 340rpx;
}

.ljdl {
  margin-top: 70rpx;
  padding: 16rpx 48rpx;
}
</style>