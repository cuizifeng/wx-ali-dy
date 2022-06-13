<template>
  <view class="pb130 ">
    <view class="posi-f w100 t0 f-y-c tgg cfc ">
      <text class="iconfont icongg mr30 cfc "></text>
      <view class="f-1 f22 ">本页面会每5秒刷新一次页面，保证其他人所点的商品能够实时同步；订单支付后，大厨就开始制作啦!</view>
      <view class="f-c ml20 ">
        <text @tap="go({url:'/yb_wm/shop/in/indd'})" class="iconfont icondd f48 c3 "></text>
      </view>
    </view>
    <view class="carlistc p02 " :style="'padding-top:'+'80rpx'+';'">
      <mg-cell bgc="transparent" isl="1" vueId="53a1f184-1" :vueSlots="['bd','ft']">
        <view class="f-y-c " slot="bd">
          <text>已选以下商品</text>
        </view>
        <view class="f-y-c f24 " slot="ft">
          <text @tap="sxsj" class="iconfont iconsx f50 c0 " style="margin-right:40rpx;"></text>
          <text @tap="clearCar" class="iconfont iconshanchu f42 c0 "></text>
        </view>
      </mg-cell>
      <view class="p20 " v-if="tableInfo.orderInfo&&orderGoods.goodsArr">当前桌位订单商品</view>
      <view class="ucarlc o-h bf " style="opacity:0.5;">
        <mg-cell brs="5rpx" cname="f-sh" h="160" hdc="f-s" :img="v.icon" :vueId="'53a1f184-2-'+i" :vueSlots="['bd']" w="160" v-for="(v, i) in orderGoods.goodsArr" :key="i">
          <view class="h100 f-y-bt " slot="bd">
            <view class="f-bt ">
              <view class="t-o-e f32 c0 ">{{v.name}}</view>
            </view>
            <view class="f-bt mt10 ">
              <view class="f-g-1 f24 c9 ">
                <text v-if="v.data">{{v.data}}</text>
                <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                <text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
              </view>
            </view>
            <view class="f-x-bt mt10 ">
              <view class="f-g-0 " :style="'color:'+tColor+';'">{{sl}}<text class="f36 wei ">{{itemTotal(v)}}</text>
              </view>
              <view class="c9 ">{{'x'+v.num}}</view>
            </view>
          </view>
        </mg-cell>
      </view>
      <view class="ucarlc o-h bf mt20 p-r pt30 " style="opacity:0.5;" v-for="(pv, pi) in orderGoods.addGoods" :key="pi">
        <mg-cell brs="5rpx" cname="f-sh" h="160" hdc="f-s" :img="v.icon" :vueId="'53a1f184-3-'+pi+'-'+i" :vueSlots="['bd']" w="160" v-for="(v, i) in pv" :key="i">
          <view class="h100 f-y-bt " slot="bd">
            <view class="f-bt ">
              <view class="t-o-e f32 c0 ">{{v.name}}</view>
            </view>
            <view class="f-bt mt10 ">
              <view class="f-g-1 f24 c9 ">
                <text v-if="v.data">{{v.data}}</text>
                <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                <text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
              </view>
            </view>
            <view class="f-x-bt mt10 ">
              <view class="f-g-0 " :style="'color:'+tColor+';'">{{sl}}<text class="f36 wei ">{{itemTotal(v)}}</text>
              </view>
              <view class="c9 ">{{'x'+v.num}}</view>
            </view>
          </view>
        </mg-cell>
        <view class="p-a sjx cf ">加</view>
      </view>
      <view class="p20 " v-if="tableInfo.orderInfo&&orderGoods.goodsArr">新增商品</view>
      <view class="p0 ">
        <view class="mb30 ucarlc o-h bf ">
          <goods addtype="2" @add="add" @dec="dec" :dList="carList" outin="2" type="6" vueId="53a1f184-4"> </goods>
        </view>
      </view>
    </view>
    <jzz bgcolor="transparent" mygd="true" nodata="true" otext="暂未添加商品" vueId="53a1f184-5" v-if="carList.length==0"></jzz>
    <view class="dbbtnc bf f-row " :style="'bottom:'+(isIpx?'40rpx':0)+';'" v-if="tableInfo.userId">
      <view class="f-1 f-y-c ">
        <view class="cf1 mr30 ">
          <text class="c3 ">合计：</text>{{sl}}<text class="f36 wei ">{{scarList.ins.price}}</text>
        </view>
      </view>
      <view c="true" class="dbbtn o-h f-row ">
        <button @tap="jxdc" class="dbl f-c ">继续点单</button>
        <button @tap="tjsp" class="dbr f-c " :disabled="loading" v-if="tableInfo.orderInfo&&tableInfo.orderInfo.state==2">提交商品</button>
        <button @tap="ljxd" class="dbr f-c f-1 " v-if="!tableInfo.orderInfo">去下单</button>
      </view>
    </view>
    <view class="bgf " v-if="isIpx"></view>
    <!-- <load type="2" v-model="showjz" vueId="53a1f184-6"></load> -->
  </view>
</template>


<script>
import goods from 'components/goods/index';
import MgCell from 'components/common/mg-cell.vue';
import MgImg from 'components/common/mg-img.vue';
import jzz from 'components/common/jzz.vue';
import load from 'components/common/load.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  message,
  modal,
  setNT
} from 'common/util';
export default {
  name: "order-index",
  components: {
    goods,
    MgCell,
    MgImg,
    jzz,
    load,
  },
  data: function () {
    return {
      tableInfo: {},
      otableInfo: {},
      orderGoods: {},
      loading: !1,
      showjz: !1
    }
  },
  onLoad: function (e) {
    var t = this;
    t.getSystem({
      nosetNB: 1
    }), setNT("购物车"), t.tableInfo = JSON.parse(decodeURIComponent(e.tableInfo)),
      t.getLoginInfo().then(() => {
        if (t.tableInfo.storeId && t.tableInfo.tableId) {
          t.supdCarbp = {
            storeId: t.tableInfo.storeId,
            tableId: t.tableInfo.tableId,
            item: 2,
            key: "ins"
          }
          t.dsq = setInterval((function () {
            t.sxsj()
          }), 5e3), t.sxsj();
        } else {
          t.tips()
        }
      })
  },
  onShow: function () {
    var e = this;
    this.isload ? (this.sxsj(), this.dsq = setInterval((function () {
      e.sxsj()
    }), 5e3)) : this.isload = !0
  },
  computed: {
    ...mapState(['scarList']),
    carList: function () {
      return this.scarList.ins.data || []
    }
  },
  methods: {

    ...mapActions(["supdCar", "getMycar", "clearMycar"]),
    getTableInfo: function () {
      var e = this;
      this.$api['in-store_table__info']({
        tableId: e.tableInfo.tableId
      }).then(res => {
        e.otableInfo = res;
      })
    },
    clearCar: function () {
      var e = this;
      modal("确认清空购物车吗？").then(res => {
        e.clearMycar(e.supdCarbp).then(res => {
          e.getMycar(e.supdCarbp)
        })
      })
    },
    tips: function () {
      var t = this;
      uni.showModal({
        title: "提示",
        content: "未获取到桌位信息",
        showCancel: !1,
        success: function (e) {
          t.go({
            t: 6,
            url: "/pages/tabbar/index/index"
          })
        }
      })
    },
    updList: function (e) {
      console.log('e194: ', e, e.g);
      var t = this;
      t.supdCar(Object.assign({}, t.supdCarbp, {
        type: e.type,
        goodsId: e.e.g.goodsId,
        id: e.e.g.id
      })).then(res => {
        t.showjz = !1;
      })
    },
    dec: function (e) {
      this.showjz = !0, this.updList({
        type: 2,
        e: e
      })
    },
    add: function (e) {
      this.showjz = !0, this.updList({
        type: 1,
        e: e
      })
    },
    sxsj: function () {
      var t = this;
      t.getMycar(t.supdCarbp), t.getInfo();
    },
    getInfo: function () {
      var e = this;
      this.$api['in-store_table__info']({
        tableId: e.tableInfo.tableId
      }).then(res => {
        if (res.orderInfo) {
          res.orderInfo.state < 3 ? (e.tableInfo.orderInfo = res.orderInfo, e.orderGoods = res.orderInfo) : (e.tableInfo
            .orderInfo = !1, e.orderGoods = {})
        }
      })
    },
    jxdc: function () {
      this.go({
        t: 4
      })
    },
    tjsp: function () {
      var e = this;
      if (!e.carList.length) return message("请添加商品后提交", 3);
      this.$api['in-store_add__food']({
        orderId: e.tableInfo.orderInfo.id
      }).then(res => {
        e.go({
          t: 2,
          url: "/yb_wm/shop/in/order-dl?id=" + e.tableInfo.orderInfo.id
        })
      })
    },
    jsdd: function () {
      var e = this;
      // return d(r.default.mark((function t() {
      // 	var n;
      // 	return r.default.wrap((function(t) {
      // 		while (1) switch (t.prev = t.next) {
      // 			case 0:
      // 				return t.next = 2, e.util.request({
      // 					url: e.api.UpdCarState,
      // 					method: "POST",
      // 					data: {
      // 						manyType: 1,
      // 						tableId: e.tableInfo.tableId
      // 					}
      // 				});
      // 			case 2:
      // 				return n = t.sent, n.data, t.next = 6, e.sxsj();
      // 			case 6:
      // 				e.go({
      // 					t: 4
      // 				});
      // 			case 7:
      // 			case "end":
      // 				return t.stop()
      // 		}
      // 	}), t)
      // })))()
    },
    ljxd: function () {
      var e = this;
      if (!e.carList.length) return message("请添加商品后下单", 3);
      e.go({
        t: 1,
        url: "pay-order?tableInfo=" + encodeURIComponent(JSON.stringify(e.tableInfo))
      });
    },
    itemTotal: function (e) {
      var t = +(e.vipMoney > 0 && +e.vipMoney < +e.money && e.vipMoney || e.money);
      return +(t * e.num).toFixed(2)
    }
  },
  onUnload: function () {
    this.dsq && clearInterval(this.dsq)
  },
  onHide: function () {
    clearInterval(this.dsq)
  }
}
</script>
<style scoped>
.tgg {
  padding: 10rpx 30rpx;
  height: 80rpx;
  line-height: 1.4;
  background: #fff3ea;
  z-index: 99;
}

.cfc {
  color: #ff7c1c;
}

.dbbtnc {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 998;
  padding: 20rpx 30rpx;
}

.dbbtnc .dbbtn {
  border-radius: 80rpx;
  height: 80rpx;
}

.dbbtnc .dbl,
.dbbtnc .dbr {
  width: 180rpx;
  color: #fff;
  font-size: 30rpx;
  border-radius: 80rpx;
}

.dbbtnc .dbl {
  margin-right: 40rpx;
  background: linear-gradient(90deg, #f8c10d, #ff9503);
}

.dbbtnc .dbr {
  background: linear-gradient(90deg, #ff7a01, #ff560a);
}

.sdbg {
  position: fixed;
  background: #fff;
  opacity: 0.8;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 997;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 35rpx;
  color: #000;
}

.sdbg .sdimg {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 30rpx;
}

.sdbg .sdbtn {
  margin-top: 30rpx;
  background: linear-gradient(90deg, #ff7a01, #ff560a);
  color: #fff;
  font-size: 30rpx;
}

.hddb {
  bottom: 300rpx;
}

.hddb .hddbimg {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cimg {
  width: 70rpx;
  height: 70rpx;
  position: relative;
  z-index: 2;
}

.cun {
  height: 50rpx;
  border-radius: 50rpx;
  padding: 0 30rpx 0 40rpx;
  bottom: 2rpx;
  left: 40rpx;
  background: #f5f5f5;
}

.ucarlc {
  border-radius: 25rpx;
}

.sjx {
  top: 0;
  left: 0rpx;
  padding: 0 40rpx;
  height: 35rpx;
  font-size: 20rpx;
  line-height: 35rpx;
  border-radius: 0 0 20rpx 0;
  background: linear-gradient(#f75214, #f87d22);
}
</style>