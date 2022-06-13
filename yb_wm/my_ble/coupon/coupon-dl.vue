<template>
  <view class="mh100 v" :hidden="!dataInfo.id" :style="'background:'+color+';'">
    <view class="cl-main v">
      <view class="timg bsf posi-r v">
        <mg-img class="v" :src="dataInfo.shareImg||system.icon" vueId="7c585e7e-1"></mg-img>
      </view>
      <view class="cl-bd bf v">
        <view class="p03 v">
          <view class="t-c f32 wei v">{{dataInfo.name}}</view>
          <view class="p20 bbd v">
            <view class="v">适用金额</view>
            <view class="mt20 f30 wei v">{{dataInfo.fullMoney>0?'满'+sl+dataInfo.fullMoney+'可用':'无门槛'}}</view>
          </view>
          <view class="p20 bbd v">
            <view class="mb10 v">卡券类型</view>
            <view class="f-row mb30 f24 c9 v">
              <view class="yd f-g-0 v"></view>
              <view class="v">{{qlx}}</view>
            </view>
            <view class="mb10 v">有效期限</view>
            <view class="mb30 f24 c9 v">
              <view class="f-row mb10 v" v-if="dataInfo.startTime">
                <view class="yd f-g-0 v"></view>
                <view class="v">{{'活动时间：'+ timeToDate(dataInfo.startTime)+'至'+ timeToDate(dataInfo.endTime)}}</view>
              </view>
              <view class="f-row v">
                <view class="yd f-g-0 v"></view>
                <view class="v">{{'使用时间：'+dataInfo.useExplain}}</view>
              </view>
            </view>
            <view class="mb10 v">卡券面额</view>
            <view class="mb30 f24 c9 v">
              <view class="f-row mb10 v">
                <view class="yd f-g-0 v"></view>
                <view class="v">{{'面额：'+(dataInfo.type==1?''+sl+dataInfo.money:dataInfo.discount+'折')}}</view>
              </view>
              <view class="f-row v" v-if="dataInfo.stock">
                <view class="yd f-g-0 v"></view>
                <view class="v">{{'库存：'+dataInfo.stock+'张'}}</view>
              </view>
            </view>
            <view class="mb10 v">适用规则</view>
            <view class="mb30 f24 c9 v">
              <view class="f-row mb10 v">
                <view class="yd f-g-0 v"></view>
                <view class="f-row v">
                  <view class="f-g-0 v">适用门店：</view>
                  <view class="v">{{dataInfo.storeType==1?'仅本店可用':dataInfo.storeType==2?'全部门店':'指定店铺可用'}}</view>
                </view>
              </view>
              <view class="f-row mb10 v">
                <view class="yd f-g-0 v"></view>
                <view class="f-g-0 v">适用商品：</view>
                <view class="v">
                  {{dataInfo.goodsType==1?'全部商品可用':dataInfo.goodsType==2?'指定商品可用':dataInfo.goodsType==3?'指定商品不可用':'指定商品分类可用'}}
                </view>
              </view>
              <view class="f-row v">
                <view class="yd f-g-0 v"></view>
                <view class="f-row v">
                  <view class="f-g-0 v">适用场景：</view>
                  <view class="v">{{sycjName}}</view>
                </view>
              </view>
            </view>
            <block v-if="!query.islq">
              <view class="mb10 v">领取规则</view>
              <view class="mb30 f24 c9 v">
                <view class="f-row mb10 v">
                  <view class="yd f-g-0 v"></view>
                  <view class="f-row v">
                    <view class="cdlht v">每人限领次数：</view>{{(dataInfo.isMax==1?'不限次数':'每人限领'+dataInfo.maxNum+'次')+''}}
                  </view>
                </view>
                <view class="f-row v">
                  <view class="yd f-g-0 v"></view>
                  <view class="f-row v">
                    <view class="cdlht v">领取人限制：</view>
                    {{(dataInfo.memberType==1?'所有人均可领':dataInfo.memberType==2?'会员可领':'指定标签用户可领')+''}}
                  </view>
                </view>
              </view>
            </block>
            <view class="f-c mb10 v" v-if="query.nobtn!=1">
              <button @tap="ljsy" class="ljsy cf f32 bs15 f-c v" :disabled="loading" :style="'background:'+(dataInfo.useState>2?'#ddd':color)+';'">{{anlx}}</button>
            </view>
          </view>
        </view>
        <view class="p-r p03 v">
          <view class="p30 v">
            <view @tap.stop="active = !active" :class="['f-x-bt v',active?'active':'']">
              <view class="v">注意事项</view>
              <text :class="['iconfont iconright v',active?'jtactive':'']"></text>
            </view>
            <view :class="['coubb o-h v',active?'cactive':'']">
              <view :class="['coubbv pt10 v',active?'show':'']">
                <mg-rtext class="v" :content="dataInfo.details||dataInfo.couponDetails" type="2" vueId="7c585e7e-2"></mg-rtext>
              </view>
            </view>
          </view>
          <view class="ydl p-a v" :style="'background:'+color+';'"></view>
          <view class="ydr p-a v" :style="'background:'+color+';'"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mgRtext from "components/common/functionCmp/rich-text.vue";
import MgCell from "components/common/mg-cell.vue";
import mgCoupon from "components/common/mg-coupon.vue";
import {
  utilMixins
} from 'common/utilMixins';
import {
  mpShare,
  setNT
} from 'common/util';
export default {
  name: "couponDl",
  components: {
    mgCoupon,
    MgCell,
    mgRtext,
  },
  data: function () {
    return {
      dataInfo: {},
      query: {},
      active: !1,
      loading: !1
    }
  },
  onLoad: function (e) {
    var t = this;
    t.query = e, t.getSystem(), setNT("优惠券详情"), t.getLoginInfo();
    t.getInfo();
  },
  mixins: [utilMixins],
  computed: {
    color: function () {
      return this.dataInfo.color
    },
    sycjName: function () {
      if (this.dataInfo.useType) {
        var e = this.dataInfo.useType,
          t = [];
        return e.indexOf(1) > -1 && t.push("外卖可用"), e.indexOf(2) > -1 && t.push("堂食可用"), e.indexOf(3) > -1 && t
          .push("当面付可用"), e.indexOf(4) > -1 && t.push("快餐可用"), t.toString()
      }
    },
    qlx: function () {
      if (this.dataInfo.id) {
        var e = "";
        switch (+this.dataInfo.type) {
          case 1:
            e = "代金券";
            break;
          case 2:
            e = "折扣券";
            break
        }
        return e
      }
    },
    anlx: function () {
      if (this.dataInfo.id) {
        var e = "";
        switch (+this.dataInfo.useState) {
          case 1:
            e = "点击领取";
            break;
          case 2:
            e = "点击使用";
            break;
          case 3:
            e = "已使用";
            break;
          case 4:
            e = "未到使用时间";
            break;
          case 5:
            e = "已过期";
            break
        }
        return e
      }
    }
  },
  methods: {
    getInfo: function () {
      var e = this;
      this.$api.coupon_coupon__info({
        id: e.query.id || "",
        receiveId: e.query.receiveId || ""
      }).then(res => {
        res.color || (res.color = "#EE472B"), e.dataInfo = res;
      })
    },
    ljsy: function () {
      var e = this;
      var n;
      if (n = e.dataInfo.useState, 1 == n) {
        this.$api.coupon_receive__coupon({
          couponId: e.dataInfo.id
        }).then(res => {
          e.getInfo()
        })
      } else {
        2 == n && e.go({
          t: 6,
          url: "/pages/tabbar/order/index"
        });
      }
    }
  },
  onShareAppMessage: function () {
    var e = "yb_wm/my/coupon/coupon-dl?id=".concat(this.dataInfo.id, "&receiveId=").concat(this.query.receiveId ||
      "");
    return mpShare({
      t: this.dataInfo.shareTitle,
      i: this.getImgS(this.dataInfo.shareImg),
      p: e
    })
  },
  onShareTimeline: function (e) {
    return {
      title: this.dataInfo.shareTitle,
      imageUrl: this.getImgS(this.dataInfo.shareImg)
    }
  }
}
</script>

<style scoped>
.cl-mainv {
  padding: 50rpx 30rpx;
}

.timgv {
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto;
}

.cl-bdv {
  padding: 70rpx 0 0;
  margin-top: -60rpx;
  border-radius: 12rpx;
}

.bbdv {
  border-bottom: 1px dashed #ebebed;
}

.ydv {
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #999;
  margin: 17rpx 12rpx 0 5rpx;
}

.ljsyv {
  width: 60%;
  height: 75rpx;
}

.ydlv,
.ydrv {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  top: -20rpx;
}

.ydlv {
  left: -17rpx;
}

.ydrv {
  right: -17rpx;
}

.jtactivev {
  transform: rotate(90deg);
}

.coubbv {
  height: 0;
  transition: all 0.3s ease-in-out;
}

.coubb.cactivev {
  height: auto;
}

.coubbvv {
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s ease-in-out;
}

.coubbv.showv {
  opacity: 1;
  transform: translateY(0);
}

.cdlhtv {
  min-width: 170rpx;
}
</style>