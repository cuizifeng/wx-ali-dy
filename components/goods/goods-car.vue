<template>
  <view>
    <view v-if="type==1||type==2">
      <view class="posi-f carc1 c9 f22 " :hidden="!cshow">
        <view class="mjts cartopmj cf5f " :hidden="!(!showCar&&mjInfo.discount.length)">
          <text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
          <block v-else>
            <text v-for="(v, i) in mjInfo.discount" :key="i">{{'满'+v.fullMoney+'减'+v.money}}<text class="m01 " v-if="i<mjInfo.discount.length-1">,</text>
            </text>
          </block>
        </view>
        <view class="car posi-r f-row ">
          <view @tap="openCar" class="f-g-1 carb f-row ">
            <view :class="['carb-img posi-r f-c animated ',carList.length?'bounceIn':'']">
              <view class="carb-i bsf bf f-c ">
                <text class="iconfont iconshangpin c0 f42 "></text>
              </view>
              <view class="posi-a dot bsf f-c " :style="'background:'+tColor+';'" v-if="carList.length">
                {{getTotal.num}}
              </view>
            </view>
            <view class="f-c-xc ">
              <view>
                <text class="f34 c3 " v-if="carList.length">{{sl+carPrice.nowPrice}}</text>
                <text class="f28 " v-else>未选购商品</text>
                <text class="ml10 t-d-l " v-if="carPrice.reduceMoney>0">{{sl+getTotal.total}}</text>
              </view>
              <view>
                <text v-if="buytype==1">{{'另需配送费'+sl+Number(sjxx.shopData.distribution.money).toFixed(2)}}</text>
                <text class="m01 " v-if="buytype==1&&havezq">|</text>
                <text v-if="havezq&&type==1">支持自取</text>
              </view>
            </view>
          </view>
          <view @tap="goPay" class="f-g-0 carf f-c " :style="'background:'+(qsText.reach?tColor:'#999')+';'+'border:'+(qsText.reach?'1rpx solid '+tColor:'')+';'">
            <view class="f32 cf ">{{qsText.text}}</view>
          </view>
        </view>
      </view>
      <view class="posi-f closec " :hidden="!xxshow" :style="'bottom:'+carBtm+'rpx'+';'">
        <view class="h100 f34 cf f-c-c ">
          <view class="t-c ">
            {{sjxx.shopData.storeOpen==3?'门店已打烊':sjxx.moreSet.status==1?'门店接受预定中':'门店休息中'}}
          </view>
          <view class="f24 " style="color:#ccc;" v-if="sjxx.shopData.storeOpen==2">
            {{'营业时间：'+yysj}}</view>
        </view>
        <view @tap="ydshow = !1" class="p-a r0 t0 f-c p-10-15 " v-if="sjxx.shopData.storeOpen==2&&sjxx.moreSet.status==1">
          <text class=" iconfont iconyx cf f36 "></text>
        </view>
      </view>
      <mg-popup v-model="showCar" vueId="ab5895a6-1" :vueSlots="['default']">
        <view class="mjts cf5f " :hidden="!mjInfo.discount.length">
          <text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
          <block v-else>
            <text v-for="(v, i) in mjInfo.discount" :key="i">{{'满'+v.fullMoney+'减'+v.money}}<text class="m01 " v-if="i<mjInfo.discount.length-1">,</text>
            </text>
          </block>
        </view>
        <view class="carlistc p03 bf " :style="'padding-bottom:'+carlistPab+'rpx'+';'">
          <mg-cell cname="p30" isl="1" :vueId="'ab5895a6-2'+','+'ab5895a6-1'" :vueSlots="['bd','ft']">
            <view class="f-y-c " slot="bd">
              <text class="f24 ">已选商品</text>
            </view>
            <view @tap="clearCar" class="f-y-c f24 c9 " slot="ft">
              清空购物车</view>
          </mg-cell>
          <scroll-view class="p0 carbody " scroll-y="true">
            <mg-cell brs="5rpx" cname="p30 la124" h="136" :img="v.icon" :last="i==carList.length-1" :vueId="'ab5895a6-3-'+i+','+'ab5895a6-1'" :vueSlots="['bd']" w="136" v-for="(v, i) in carList" :key="i">
              <view slot="bd">
                <view class="t-o-e f30 ">{{v.name}}</view>
                <view class="f24 c9 f-raw ">
                  <text v-if="v.groupName">{{v.groupName}}</text>
                  <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                  <text class="ml10 " v-if="v.materialName">{{'+'+v.materialName}}</text>
                </view>
                <view class="f-x-bt mt10 ">
                  <view class="f-g-0 f30 ">{{sl}}{{v.totalMoney}}</view>
                  <add-goods :addgb="addgb" addwz="2" @add="add(v,i)" @dec="dec(v,i)" cname="f-g-0 mt10" :co="v" :isprice="0" :showspec="false" :vueId="'ab5895a6-4-'+i+','+'ab5895a6-3-'+i">
                  </add-goods>
                </view>
              </view>
            </mg-cell>
          </scroll-view>
          <view class="f-y-c p30 hlt f30 ">
            <view style="width:156rpx;">包装费</view>
            <view>
              <view @tap="go({t:1,url:'/yb_wm/shop/out/bzf'})" :hidden="!(getTotal.bzf>=0)">
                <text>{{sl+getTotal.bzf}}</text>
                <text class="iconfont iconwen f24 m01 "></text>
              </view>
              <view class="f20 c9 ">包装费不参与满减</view>
            </view>
          </view>
        </view>
      </mg-popup>
      <sq-btn v-model="showSqtel" @refresh="goPay" type="4" vueId="ab5895a6-5"></sq-btn>
    </view>
    <block v-else>
      <view v-if="type==3">
        <view class="posi-f carc2 cf f22 " :hidden="!cshow" :style="{bottom: carBtm + 'rpx'}">
          <view class="mjts cartopmj2 cf5f " :hidden="!(!showCar&&mjInfo.discount.length)">
            <text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
            <block v-else>
              <text v-for="(v, i) in mjInfo.discount" :key="i">{{'满'+v.fullMoney+'减'+v.money}}<text class="m01" v-if="i<mjInfo.discount.length-1">,</text>
              </text>
            </block>
          </view>
          <view class="car posi-r f-row ">
            <view @tap="openCar" class="f-g-1 carb f-row " style="background:#393939;">
              <view :class="['carb-img posi-r f-c animated ',carList.length?'bounceIn':'']">
                <text class="iconfont icongwc2 cf f46 "></text>
                <view class="posi-a dot f-c " :style="'background:'+tColor+';'" v-if="carList.length">
                  {{getTotal.num}}
                </view>
              </view>
              <view class="f-c-xc ml30 ">
                <view>
                  <text class="wei f34 cf " v-if="carList.length">{{sl+carPrice.nowPrice}}</text>
                  <text class="f28 " v-else>未选购商品</text>
                  <text class="ml10 t-d-l " v-if="carPrice.reduceMoney>0">{{sl+getTotal.total}}</text>
                </view>
              </view>
            </view>
            <view @tap="goPay" class="f-g-0 carf f-c " :style="'background:'+(qsText.reach?tColor:'#323232')+';'+'border:'+(qsText.reach?'1rpx solid '+tColor:'')+';'">
              <view class="f28 ">{{qsText.text}}</view>
            </view>
          </view>
        </view>
        <view class="posi-f closec " :hidden="!xxshow" :style="'bottom:'+carBtm+'rpx'+';'">
          <view class="h100 f34 cf f-c-c ">
            <view class="t-c ">
              {{sjxx.shopData.storeOpen==3?'门店已打烊':sjxx.moreSet.status==1?'门店接受预定中':'门店休息中'}}
            </view>
            <view class="f24 " style="color:#ccc;" v-if="sjxx.shopData.storeOpen==2">
              {{'营业时间：'+yysj}}</view>
          </view>
        </view>
        <mg-popup v-model="showCar" vueId="ab5895a6-6" :vueSlots="['default']">
          <view class="mjts cf5f " :hidden="!mjInfo.discount.length">
            <text v-if="carList.length||!mjInfo.discount.length">{{mjInfo.text}}</text>
            <block v-else>
              <text v-for="(v, i) in mjInfo.discount" :key="i">{{'满'+v.fullMoney+'减'+v.money}}<text class="m01 " v-if="i<mjInfo.discount.length-1">,</text>
              </text>
            </block>
          </view>
          <view class="carlistc p03 bf " :style="'padding-bottom:'+carlistPab+'rpx'+';'">
            <mg-cell cname="p30" isl="1" :vueId="'ab5895a6-7'+','+'ab5895a6-6'" :vueSlots="['bd']">
              <view class="f-y-c " slot="bd">
                <text class="f24 ">已选商品</text>
              </view>
            </mg-cell>
            <scroll-view class="p0 carbody " scroll-y="true">
              <mg-cell brs="5rpx" cname="p30 la124" h="136" :img="v.icon" :last="i==carList.length-1" :vueId="'ab5895a6-8-'+i+','+'ab5895a6-6'" :vueSlots="['bd']" w="136" v-for="(v, i) in carList" :key="i">
                <view slot="bd">
                  <view class="f-bt ">
                    <view class="t-o-e f30 ">{{v.name}}</view>
                    <view class="f-g-0 f30 " :style="'color:'+tColor+';'">{{sl+itemTotal(v)}}
                    </view>
                  </view>
                  <view class="f-bt mt10 ">
                    <view class="f24 c9 f-raw ">
                      <text v-if="v.groupName">{{v.groupName}}</text>
                      <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                      <text class="ml10 " v-if="v.materialName">{{'+'+v.materialName}}</text>
                    </view>
                    <view class="c9 ml10 ">{{'x'+v.num}}</view>
                  </view>
                </view>
              </mg-cell>
            </scroll-view>
          </view>
        </mg-popup>
        <sq-btn v-model="showSqtel" @refresh="goPay" type="4" vueId="ab5895a6-9"></sq-btn>
      </view>
    </block>
  </view>
</template>

<script>
import getMath from '@/utils/math.js';
import mgPopup from 'components/common/popup.vue';
import addGoods from './add-goods.vue';
import sqBtn from 'components/common/sq-btn.vue';

import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';
import {
  utilMixins
} from 'common/utilMixins';
import {
  colorToRGB,
  message,
  modal
} from 'common/util';
export default {
  name: "goods-car",
  components: {
    addGoods,
    mgPopup,
    sqBtn
  },
  props: {
    type: {
      type: String,
      default: "1"
    },
    cName: {
      type: String,
      default: ""
    },
    sname: "",
    carBtm: {
      type: [String, Number],
      default: ""
    },
    carlistPab: {
      type: [String, Number],
      default: ""
    },
    zIndex: {
      type: Number,
      default: 999
    },
    ingopay: {
      type: String,
      default: "1"
    },
    buytype: {
      type: Number,
      default: 2
    },
    sjxx: {
      type: Object,
      default: function () {
        return {};
      }
    },
    goodsList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    startmoney: {
      type: [String, Number],
      default: ""
    },
    show: Boolean,
    outin: {
      type: String,
      default: "1"
    },
    tableinfo: ""
  },
  data: function () {
    return {
      showCar: !1,
      ydshow: !0,
      showSqtel: !1,
    };
  },
  watch: {
    showCar: function (t) {
      this.$emit("update:show", t);
    },
    show: function (t) {
      t && (this.showCar = t);
    },
    mjInfo: {
      handler: function (t) {
        t.discount.length > 0 && this.$emit("hasmj", !0);
      },
      immediate: !0
    }
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      vscarList: t => t.scarList
    }),
    scarList: function () {
      return 1 == this.outin ? this.vscarList && this.vscarList.out : 3 == this.outin ? this.vscarList &&
        this.vscarList
          .fast : 2 == this.outin ? this.vscarList && this.vscarList.ins : void 0;
    },
    carList: function () {
      return this.scarList.data || [];
    },
    yysj: function () {
      var t = "",
        e = this.sjxx.moreSet;
      return 1 == e.timeType ? t = "24小时营业" : 2 == e.timeType && e.timeArr && (t = "".concat(e.timeArr[0]
        .startTime, "-")
        .concat(e.timeArr[0].ciri ? "次日" : "").concat(e.timeArr[0].endTime), e.timeArr[1] && (t +=
          " " + "".concat(e
            .timeArr[1].startTime, "-").concat(e.timeArr[1].ciri ? "次日" : "").concat(e.timeArr[1]
              .endTime)), e.timeArr[2] &&
        (t += " " + "".concat(e.timeArr[2].startTime, "-").concat(e.timeArr[2].ciri ? "次日" : "")
          .concat(e.timeArr[2]
            .endTime))), t;
    },
    cshow: function () {
      return 0 == this.carList.length && (this.showCar = !1), 2 == this.type || 3 == this.type ? this.addgb :
        (1 == this
          .sjxx.shopData.storeOpen || 2 == this.sjxx.shopData.storeOpen && 1 == this.sjxx.moreSet.status
        ) && this.carList
          .length > 0;
    },
    addgb: function () {
      return 1 == this.sjxx.shopData.storeOpen || 2 == this.sjxx.shopData.storeOpen && 1 == this.sjxx.moreSet
        .status;
    },
    xxshow: function () {
      return 1 != this.sjxx.shopData.storeOpen && this.ydshow;
    },
    havezq: function () {
      return this.sjxx.moreSet.distributionSupport && this.sjxx.moreSet.distributionSupport.find(function (
        t) {
        return 2 == t;
      });
    },
    getTotal: function () {
      var t = 0;
      this.carList.forEach(function (e) {
        t += +e.num;
      });

      return {
        total: +this.scarList.oldPrice || 0,
        price: +this.scarList.price,
        spzj: +(this.scarList.oldPrice - this.scarList.boxMoney).toFixed(2),
        bzf: +this.scarList.boxMoney || 0,
        num: t,
        hyzk: this.blxs(this.scarList.vipDiscount)
      };
    },
    carPrice: function () {
      return {
        reduceMoney: this.mjInfo.mjMoney,
        nowPrice: this.getTotal.price
      };
    },
    mjInfo: function () {
      var t = this.getTotal.spzj,
        e = [],
        n = "",
        o = this.scarList.reduce ? getMath.round(this.scarList.reduce, 2) : 0,
        r = -1,
        i = "";

      return this.sjxx.discount.reduce.type ? (e = [].concat(this.sjxx.discount.reduce.moneyArr), n = this
        .sjxx.discount.reduce.type, e.length && (1 == n ? i = Math.floor(t / e[0].fullMoney) <= 0 ?
          "每满".concat(this.sl + e[0]
            .fullMoney, "减").concat(e[0].money) : "已减".concat(this.sl + o) : -1 == (r = e
              .findIndex(function (e) {
                return t >= e.fullMoney;
              })) ? i = "满".concat(this.sl).concat(e[e.length - 1].fullMoney, "减").concat(this.sl)
                .concat(e[e.length - 1]
                  .money, ",还差").concat(this.sl).concat((e[e.length - 1].fullMoney - t).toFixed(2)) :
          0 == r ? i = "已减".concat(
            this.sl + o) : r > 0 && (i = "已减".concat(this.sl + o, ",再满").concat(this.sl + e[r - 1]
              .fullMoney, "减").concat(
                this.sl + e[r - 1].money)))) : o = 0, 1 == this.buytype && +this.startMoney > this
                  .getTotal.total && (i = "还差"
                    .concat(this.sl).concat((+this.startMoney - this.getTotal.total).toFixed(2), "起送")), {
        mjMoney: o,
        text: i,
        discount: [].concat(e).reverse()
      };
    },
    startMoney: function () {
      return this.startmoney || this.sjxx.shopData.distribution.startMoney;
    },
    qsText: function () {
      var t = this.getTotal.total,
        e = +this.startMoney,
        n = "",
        o = !1;
      if (this.type <= 2) {
        if (t <= 0 || !this.carList.length) n = 1 == this.buytype ? this.sl + e + "起送" : "请添加";
        else if (t < e && 1 == this.buytype) {
          var r = +(e - t).toFixed(2);
          n = "差".concat(this.sl) + r + "起送";
        } else n = "去结算", o = !0;
      } else 3 == this.type && (o = !0, n = t <= 0 || !this.carList.length ? "查看购物车" : "选好了");
      return {
        text: n,
        reach: o
      };
    }

  },
  methods: {
    //小合计
    getMoney(v) {
      return this.blxs(v.num * v.money)
    },
    ...mapMutations(["setCarList"]),
    ...mapActions(["clearMycar"]),
    openCar: function () {
      this.showCar = !0;
    },
    dec: function (t, e) {
      this.$emit("dec", {
        addwz: '2',
        g: t
      });
    },
    add: function (t, e) {

      this.$emit("add", {
        addwz: '2',
        g: t
      });
    },
    clearCar: function () {
      var t = this;
      modal("确认清空购物车吗？").then(res => {
        t.clearMycar({
          storeId: t.sjxx.shopData.id,
          item: t.outin,
          key: 1 == t.outin ? "out" : 2 == t.outin ? "ins" : "fast"
        });
        t.$emit("celar"), t.showCar = !1
      })
    },
    goPay: function (e) {
      var n = this;
      let a14 = () => {
        if (2 != n.outin) uni.setStorageSync("carInfo", {
          carList: n.carList,
          getTotal: n.getTotal,
          mjInfo: n.mjInfo,
          carPrice: n.carPrice,
          sjxx: {
            discount: n.sjxx.discount,
            moreSet: n.sjxx.moreSet,
            outSet: n.sjxx.moreSet.distributionSupport,
            shopData: n.sjxx.shopData
          },
          buyType: n.buytype
        });
        if (1 == n.outin) {
          n.go({
            t: 1,
            url: "/yb_wm/shop/out/pay-order"
          })
        } else if (3 == n.outin) {
          n.go({
            url: "/yb_wm/shop/ffmode/pay-order"
          })
        } else if (2 == n.outin) {
          uni.setStorageSync("carInfo", {
            sjxx: {
              discount: n.sjxx.discount,
              moreSet: n.sjxx.moreSet,
              outSet: n.sjxx.moreSet.distributionSupport,
              shopData: n.sjxx.shopData
            }
          });
          n.go({
            url: "/yb_wm/shop/in/car?tableInfo=" + encodeURIComponent(JSON.stringify(n.tableinfo))
          })
        };
        n.showCar = !1;
      };
      if (!n.qsText.reach) return;
      n.checkLogin().then(res => {
        if (1 != n.ingopay) {
          n.$emit("gopay");
          return;
        }
        if (1 != n.buytype || getApp().globalData.xzdzInfo) {
          // 无必选品
          if (!n.havebxp || 3 == n.type) {
            a14();
            return;
          }
          var t = n.goodsList.filter((function (t) {
            return 1 == t.isRequire
          }));
          var e = 0;
          var r = n.carList.map((function (t) {
            return t.goodsId
          }));
          for (var o = 0; o < t.length; o++) {
            t[o].goods.find((function (t) {
              return r.includes(t.id)
            })) && (e += 1);
          }
          if (e < t.length) {
            message("请选择必选品", 3, 1500)
            return;
          }
          a14();
          return;
        }
        n.go({
          t: 1,
          url: "/yb_wm/my/address/index?from=3&storeId=".concat(n.sjxx.shopData.id)
        })
      })
    },
    itemTotal: function (t) {
      return +(t.money * t.num).toFixed(2);
    },
    colorToRGB: function (t) {
      return colorToRGB(t);
    }
  },
  created: function () {
    this.havebxp = this.sjxx.data.findIndex(function (t) {
      return 1 == t.isRequire;
    }) > -1;
  }
}
</script>
<style scoped>
.mjts {
  padding: 15rpx 30rpx;
  font-size: 24rpx;
  text-align: center;
  background: #fff4ee;
  opacity: 0.9;
  border-radius: 35rpx 35rpx 0 0;
}

.closec {
  width: 100%;
  height: 130rpx;
  bottom: 115rpx;
  background: rgba(0, 0, 0, 0.65);
  z-index: 2000;
}

.cartopmj {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 100%;
}

.carc1 {
  width: 100%;
  bottom: 0rpx;
  z-index: 2000;
}

.carc1 .car {
  height: 110rpx;
  background: #f0f0f0;
}

.carc1 .car .carb-img {
  padding: 0 30rpx;
}

.carc1 .car .carb-img .dot {
  min-width: 40rpx;
  height: 40rpx;
  color: #fff;
  top: -15rpx;
  right: 20rpx;
}

.carc1 .car .carb-i {
  width: 110rpx;
  height: 110rpx;
  margin-bottom: 26rpx;
}

.carc1 .car .carf {
  width: 220rpx;
  height: 100%;
}

.carc2 {
  width: 100%;
  padding: 0 4%;
  height: 130rpx;
  bottom: 115rpx;
  background: hsla(0, 0%, 100%, 0);
  z-index: 2000;
}

.carc2 .cartopmj2 {
  position: absolute;
  width: 92%;
  height: 100rpx;
  border-radius: 10rpx;
  left: 4%;
  top: -60rpx;
}

.carc2 .carleft {
  margin-right: 4%;
}

.carc2 .carleft .fabv {
  width: 105rpx;
  height: 105rpx;
}

.carc2 .carleft .fabi {
  background: #000;
  border-radius: 50%;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1),
    -webkit-transform 0.15s cubic-bezier(0.4, 0, 1, 1);
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1),
    -webkit-transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.carc2 .carleft .fabis {
  transform: scale(1) rotate(135deg);
}

.carc2 .carleft .fabc {
  border-radius: 105rpx;
  padding-top: 30rpx;
  padding-bottom: 105rpx;
  transition: all 0.3s;
  transform: scaleY(0);
  transform-origin: 50% 100%;
  opacity: 0;
  visibility: hidden;
}

.carc2 .carleft .fabcs {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}

.carc2 .car {
  height: 105rpx;
  border-radius: 60rpx;
  box-shadow: 0 5rpx 5rpx 1rpx #dcdcdc;
}

.carc2 .car .carh {
  padding: 0 20rpx 0 40rpx;
  height: 70rpx;
}

.carc2 .car .carb {
  border-radius: 105rpx 0 0 105rpx;
}

.carc2 .car .carb-img {
  width: 105rpx;
  background: #000;
  border-radius: 105rpx;
}

.carc2 .car .carb-img .dot {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 1px solid #fff;
  color: #fff;
  right: 0;
  top: -10rpx;
}

.carc2 .car .carf {
  border-radius: 0 60rpx 60rpx 0;
  width: 190rpx;
  height: 100%;
}

.carlistc {
  padding-bottom: 235rpx;
}

.carlistc .carbody {
  max-height: 600rpx;
}

.carimg {
  width: 80rpx;
  height: 110rpx;
  margin-bottom: 45rpx;
}
</style>