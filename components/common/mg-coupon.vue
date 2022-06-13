<template>
  <view>
    <view @tap="goTo" :class="['posi-r cou1 o-h bf c6 f22 ',cname]" v-if="ptype==1">
      <view class="bf cout f-row ">
        <view class="f-g-0 coutl f-c-c mr30 ">
          <view class="wei cf5 ">
            <block v-if="co.type==1">
              <text>{{sl}}</text>
              <text class="f48 ml5 ">{{ Number(co.money)}}</text>
            </block>
            <block v-else-if="co.type==2">
              <text class="f48 ">{{ Number(n.discount)}}</text>
              <text class="ml5 ">折</text>
            </block>
          </view>
          <view>{{fullName}}</view>
        </view>
        <view class="f-g-1 f-y-ad ">
          <view class="wei f30 t-o-e c3 ">{{ttype==2?co.couponName:co.name}}</view>
          <view class="f-x-bt ">
            <view class="t-o-e ">{{co.useExplain}}</view>
          </view>
        </view>
      </view>
      <view @tap.stop="active = !active" class="bfc p2 coub c9 ">
        <view :class="['f-y-c coubt ',active?'active':'']">
          <view class="f-g-1 f-y-c mr10 ">
            <view class="t-o-e ">{{co.explain}}</view>
            <text :class="['iconfont icondown ml10 coubjt f24 ',active?'jtactive':'']"></text>
          </view>
          <button @tap.stop="btnClick" class="coubtn f-c f22 clearbtn " :disabled="disabled" :style="'background:'+typeName.c+';'">{{typeName.t}}</button>
        </view>
        <view :class="['coubb o-h ',active?'cactive':'']">
          <view :class="['coubbv pt20 ',active?'show':'']">
            <mg-rtext :content="co.details||co.couponDetails" type="2" vueId="6eefc3b6-1">
            </mg-rtext>
          </view>
        </view>
      </view>
      <view class="p-a couqlx cf t-c ">{{qlx}}</view>
    </view>
    <view @tap="goTo" :class="['posi-r cou1 o-h bf c6 f22 cou2 ',cname]" v-else-if="ptype==2">
      <view class="bf cout f-row ">
        <view class="f-g-0 coutl f-c-c mr30 ">
          <view class="wei cf5 ">
            <block v-if="co.type==1">
              <text>{{sl}}</text>
              <text class="f48 ml5 ">{{Number(co.money)}}</text>
            </block>
            <block v-else>
              <block v-if="co.type==2">
                <text class="f48 ">{{Number(co.discount)}}</text>
                <text class="ml5 ">折</text>
              </block>
            </block>
          </view>
          <view class="t-o-e ">{{fullName}}</view>
        </view>
        <view class="f-g-1 f-y-ad ">
          <view class="wei f30 t-o-e c3 ">{{co.name||co.couponName}}</view>
          <view class="f-x-bt ">
            <view class="t-o-e ">{{co.useExplain}}</view>
          </view>
        </view>
      </view>
    </view>
    <view @tap="goTo" :class="['posi-r f-row cou3 b-d f20 ',cname]" style="background:#fff;" v-else-if="ptype==3">
      <view class="posi-r p20 f-g-0 cou2l f-c-c ">
        <view class="wei cf5 ">
          <text>{{sl}}</text>
          <text class="f48 ml5 ">{{Number(co.money)}}</text>
        </view>
        <view class="mt10 ">{{fullName}}</view>
        <view class="dot1 b-d bf "></view>
        <view class="dot2 b-d bf "></view>
      </view>
      <view class="p23 f-g-1 f-row ">
        <view class="f-g-1 f-y-bt ">
          <view class="wei f30 t-o-e ">{{co.name}}</view>
          <view class="mt20 t-o-e ">{{useTypeName(co.activityType)}}</view>
        </view>
        <button @tap.stop="btnClick" class="f-g-0  bs10 cou3br f-c cf clearbtn " :disabled="disabled" :style="'background:'+typeName.c+';'">{{''+typeName.t+''}}</button>
      </view>
    </view>
    <view @tap="1 != co.isUse ? $emit('change', co.id) : goTo()" :class="[ 'posi-r bf bs20 c6 f22 ',cname,[co.isUse==2?'ce5':''] ]" v-if="ptype==4">
      <view class="bf cout f-row ">
        <view class="f-g-0 coutl f-c-c mr30 ">
          <view :class="['wei cf5 ',co.isUse==2?'ce5':'']">
            <block v-if="co.type==1">
              <text>{{sl}}</text>
              <text class="f48 ml5 ">{{Number(co.money) }}</text>
            </block>
            <block v-else>
              <block v-if="co.type==2">
                <text class="f48 ">{{Number(co.discount)}}</text>
                <text class="ml5 ">折</text>
              </block>
            </block>
          </view>
          <view>{{fullName}}</view>
        </view>
        <view class="f-g-1 f-y-ad ">
          <view :class="['wei f30 t-o-e c3 ',co.isUse==2?'ce5':'']">{{co.couponName}}</view>
          <view class="f-x-bt ">
            <view class="t-o-e ">{{co.useExplain}}</view>
          </view>
        </view>
        <view class="f-c ">
          <radio :checked="co.checked" color="#07C160" v-if="co.isUse!=1"></radio>
        </view>
      </view>
      <view class="bfc p2 coub c9 ">
        <view class="f-y-c coubt ">
          <view class="t-o-e ">{{co.explain}}</view>
        </view>
      </view>
      <view class="p-a couqlx cf t-c ">{{qlx}}</view>
    </view>
    <view :class="['cou5 p253 p-r bf bs20 f24 f-y-c mb20 ',cname]" v-else-if="ptype==5">
      <view class="cou5l mr20 p-r ">
        <!-- <mg-img src="/static/yhq/sjyhq.png" vueId="6eefc3b6-2"></mg-img> -->
        <view class="p-a t0 wh f-c-c cf lh1 ">
          <view>
            <block v-if="co.type==1">
              <text>{{sl}}</text>
              <text class="f50 ml5 ">{{Number(co.money)}}</text>
            </block>
            <block v-else>
              <block v-if="co.type==2">
                <text class="f50 ">{{Number(co.discount)}}</text>
                <text class="ml5 ">折</text>
              </block>
            </block>
          </view>
        </view>
      </view>
      <view class="f-1 f-c-xc mr20 ">
        <view class="f30 c0 t-o-e ">{{co.name}}</view>
        <view class="c6 mt10 ">{{fullName+'，'+co.useExplain}}</view>
      </view>
      <view class="f-c-c cou5r ">
        <button @tap="btnClick" class="cf cou5lq bs15 f-c clearbtn " :disabled="disabled" v-if="!co.islq">领
          取</button>
        <image class="p-a cou5ylq " src="/static/static/yhq/lyq.png" v-else></image>
      </view>
    </view>
    <view @tap="goTo" :class="['posi-r f-row cou3 b-d f20 ',cname]" v-else-if="ptype==6">
      <view class="posi-r p20 f-g-0 cou2l f-c-c ">
        <view class="wei cf5 ">
          <text>{{sl}}</text>
          <text class="f48 ml5 ">{{Number(co.money)}}</text>
        </view>
        <view class="mt10 ">{{fullName}}</view>
        <view class="dot1 b-d bf "></view>
        <view class="dot2 b-d bf "></view>
      </view>
      <view class="p23 f-g-1 f-row ">
        <view class="f-g-1 f-y-bt ">
          <view class="wei f30 t-o-e ">{{co.name}}</view>
          <view class="mt20 t-o-e ">{{useTypeName(co.activityType)}}</view>
        </view>
        <view class="f-y-c f-g-0 ml30  ">
          <button class="bs10 f-c cf clearbtn cou6 f24 " :disabled="disabled" :style="'background:'+typeName.c+';'">{{''+typeName.t+''}}</button>
        </view>
      </view>
    </view>
    <view :class="['posi-r bf bs20 c6 f22 ',cname]" gttype="1" v-else-if="ptype==7">
      <view class="bf cout ">
        <view class="f-bt f-y-c lh1 ">
          <view class="cef ">
            <text class="f36 ml5 ">{{co.name}}</text>
          </view>
          <view class="wei f66 cef ">
            <text class="f34 ">￥</text>{{co.money}}
          </view>
        </view>
        <view class="f-bt f28 c6 ">
          <view>{{co.endAt+'后过期'}}</view>
          <view>{{fullName}}</view>
        </view>
      </view>
      <view @tap.stop="active = !active" class="bfc p3 coub c9 gfbg ">
        <view :class="['f-y-c coubt ',active?'active':'']">
          <view class="f-g-1 t-o-e cb ">{{fullName+','+(useTypeName(co.activityType))+','+sycjName}}</view>
          <text :class="['iconfont icondown ml10 coubjt ',active?'jtactive':'']"></text>
        </view>
        <view :class="['coubb o-h ',active?'cactive':'']">
          <view :class="['coubbv pt20 ',active?'show':'']">
            <mg-rtext :content="co.introduce" type="2" vueId="6eefc3b6-3" v-if="co.introduce"></mg-rtext>
          </view>
        </view>
      </view>
    </view>
    <view @tap="goTo" :class="['cou5 cou8 p253 p-r bf bs20 f24 f-y-c mb20 ',cname]" v-else-if="ptype==8">
      <view class="cou5l mr20 p-r ">
        <!-- <mg-img src="/static/yhq/qb.png" vueId="6eefc3b6-4"></mg-img> -->
        <view class="p-a t0 wh f-c-c  lh1 " style="color:red">
          <view>
            <text>{{sl}}</text>
            <text class="f50 ml5 mr10 ">{{Number(co.money)}}</text>
          </view>
          <view class="f22 mt5 ">代金券</view>
        </view>
      </view>
      <view class="cou8m f-1 f-c-xc ">
        <view class="f-y-c ">
          <view class="cou8zs bs10 f20 mr20 ">{{co.couponNum+'张'}}</view>
          <view class="c0 f30 f-1 t-o-e ">{{co.name}}</view>
        </view>
        <view class="c9 mt10 f22 ">
          <text class="cqb f24 ">{{sl}}</text>
          <text class="cqb f32 ">{{co.money}}</text>
          <text class="t-d-l ">{{sl+co.price}}</text>
          <text class="qbzkc ml10 ">{{(Number((co.money / co.price * 10).toFixed(1)))+'折'}}</text>
        </view>
      </view>
      <view class="f-c-c cou5r ">
        <button class="cf cou5lq bs15 f-c clearbtn " :disabled="disabled" v-if="!co.islq">去抢购</button>
        <image class="p-a cou5ylq " src="/static/static/yhq/lyq.png" v-else></image>
      </view>
    </view>
    <view @tap="go({url:'/yb_o2o/order/coupon-bag/qbxq?id='+co.id})" :class="['p-r bs20 c6 f24 cou9 ',cname]" v-else-if="ptype==9">
      <view class="qbyhq p-a ">
        <image class="wh " src="/static/static/yhq/qbyhq.png"></image>
      </view>
      <view class="p-r cou9bd ">
        <view class="cout f-y-c ">
          <view class="f-g-0 cou9tl mr30 bs10 ">
            <mg-img :src="co.icon" vueId="6eefc3b6-5"></mg-img>
          </view>
          <view class="f-1 f-y-bt ">
            <view class="wei f30 t-o-e2 c3 ">{{co.name}}</view>
            <view>
              <text class="t-o-e cff0 ">{{sl}}<text class="f36 wei ">{{co.money}}</text>
              </text>
              <text class="t-o-e ml10 t-d-l cb ">{{''+sl+co.originalPrice}}</text>
            </view>
          </view>
          <view class="ml30 f-c-c ">
            <view class="qqg cf f26 f-c " :style="'background:'+(qbbl<1?'':'#ddd')+';'">
              <text v-if="qbbl<1"> </text>
              <text v-else>已抢完</text>
            </view>
          </view>
          <view @tap.stop="active = !active" class="p3 bf cou9b ">
            <view :class="['f-y-c coubt ',active?'active':'']">
              <view class="dpimg bsf mr15 ">
                <mg-img :src="co.logo" vueId="6eefc3b6-6"></mg-img>
              </view>
              <view class="f-1 t-o-e ">{{co.storeName}}</view>
              <text>使用规则</text>
              <text :class="['iconfont icondown ml10 coubjt ',active?'jtactive':'']"></text>
            </view>
            <view :class="['coubb o-h ',active?'cactive':'']">
              <view :class="['coubbv pt20 ',active?'show':'']">
                <mg-rtext :content="co.notice" type="2" vueId="6eefc3b6-7" v-if="co.notice"></mg-rtext>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view @tap="goTo" :class="['p-r bf bs20 c6 f22 cou10 ',cname]" v-else-if="ptype==10">
      <view class="bf cout f-y-c ">
        <view class="f-g-0 coutl f-c-c mr30 ">
          <view class="wei cf5 ">
            <text>{{sl}}</text>
            <text class="f48 ml5 ">{{Number(co.money)}}</text>
          </view>
          <view class="mt20 ">{{fullName}}</view>
        </view>
        <view class="f-g-1 f-y-bt ">
          <view class="wei f30 t-o-e c3 ">{{co.name}}</view>
          <view class="mt20 w70 t-o-e ">{{useTypeName(co.activityType)}}</view>
          <view class="t-o-e ">{{dateText}}</view>
        </view>
        <text class="iconfont iconright ml10 c3 "></text>
      </view>
      <view @tap.stop="active = !active" class="bfc p23 coub c9 ">
        <view :class="['f-y-c coubt ',active?'active':'']">
          <view class="f-g-1 t-o-e ">{{fullName+','+(useTypeName(co.activityType))+','+sycjName}}</view>
          <text :class="['iconfont icondown ml10 coubjt ',active?'jtactive':'']"></text>
        </view>
        <view :class="['coubb o-h ',active?'cactive':'']">
          <view :class="['coubbv pt20 ',active?'show':'']">
            <mg-rtext :content="co.introduce" type="2" vueId="6eefc3b6-8" v-if="co.introduce"></mg-rtext>
          </view>
        </view>
      </view>
      <view class="p-a ybk "></view>
      <view class="p-a num cf t-c ">{{'x'+co.number+' 张'}}</view>
    </view>
  </view>
</template>

<script>
import { utilMixins } from 'common/utilMixins';
import mgRtext from './functionCmp/rich-text.vue';
export default {
  name: "searchBox",
  components: {
    mgRtext
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    gttype: {
      type: String,
      default: ""
    },
    ptype: {
      type: String,
      default: "1"
    },
    ttype: {
      type: String,
      default: "1"
    },
    cname: {
      type: String,
      default: ""
    },
    u: {
      type: String,
      default: "px"
    },
    color: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      active: !1,
      disabled: !1
    };
  },
  mixins: [utilMixins],
  computed: {
    typeName: function () {
      var t,
        e = "";

      switch (this.ptype) {
        case "1":
          1 == this.ttype ? (t = "领 取", e = "linear-gradient(90deg, #ff3a48, #ff3a48)") : (t = 1 == this.co.useState ?
            "去使用" : 2 == this.co.useState ? "已使用" : "已失效", e = 1 == this.co.useState ?
              "linear-gradient(90deg, #ff3a48, #ff3a48)" : "");
      }

      return {
        t: t,
        c: e
      };
    },
    fullName: function () {
      return this.co.fullMoney > 0 ? "满".concat(Number(this.co.fullMoney) + this.dw, "可用") : "无门槛";
    },
    qbbl: function () {
      return this.co.saleNum / this.co.totalNum >= 1 ? 1 : this.co.saleNum / this.co.totalNum;
    },
    qlx: function () {
      return 1 == this.co.type ? "代" : "折";
    }
  },
  methods: {
    useTypeName: function (t) {
      var e;

      switch (+t) {
        case 1:
          e = "全门店通用";
          break;

        case 2:
        case 6:
          e = "指定商户可用";
          break;

        case 7:
          e = "指定商品可用";
          break;

        case 8:
          e = "指定分类可用";
      }

      return e;
    },
    goTo: function () {
      var t = "/yb_wm/my/coupon/coupon-dl?id=" + (this.co.couponId ? this.co.couponId : this.co.id);
      1 == this.ptype && 2 == this.ttype || 4 == this.ptype ? t = "/yb_wm/my/coupon/coupon-dl?islq=1&receiveId=" + this
        .co.id : 8 == this.ptype && (t = "/yb_wm/order/coupon-bag/qbxq?id=" + this.co.id), this.go({
          t: 1,
          url: t
        });
    },
    btnClick: function () {
      var t = this;
      (this.typeName.c || 5 == this.ptype) && ((1 == this.ptype && 1 == this.ttype || 5 == this.ptype) && (this
        .disabled = !0, setTimeout(function () {
          t.disabled = !1;
        }, 1e3)), this.$emit("btntap"));
    }
  }
}
</script>
<style scoped>
.bf8 {
  background: #ff3a48;
}

.cf5 {
  color: #ff3a48;
}

.cou1 {
  border-radius: 20rpx;
}

.cout {
  position: relative;
  padding: 30rpx 20rpx;
}

.coutl {
  min-width: 150rpx;
}

.coub {
  position: relative;
  background: #fff;
}

.coub::after {
  content: "";
  position: absolute;
  border-top: 1px dashed #ebebed;
  top: 0;
  right: 25rpx;
  left: 25rpx;
}

.coubtn {
  min-width: 100rpx;
  height: 48rpx;
  color: #fff;
  background: #ddd;
  border-radius: 15rpx;
}

.coubt,
.coubjt {
  transition: all 0.3s ease-in-out;
}

.active {
  opacity: 0.4;
}

.jtactive {
  transform: rotate(-180deg);
}

.coubb {
  height: 0;
  transition: all 0.3s ease-in-out;
}

.coubb.cactive {
  height: auto;
}

.coubbv {
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s ease-in-out;
}

.coubbv.show {
  opacity: 1;
  transform: translateY(0);
}

.ylq {
  width: 125rpx;
  height: 125rpx;
  top: 90rpx;
  right: 10rpx;
}

.couqlx {
  top: 0;
  left: -50rpx;
  width: 100rpx;
  height: 45rpx;
  font-size: 18rpx;
  line-height: 52rpx;
  background: linear-gradient(#ff3a48, #ff3a48);
  transform: rotate(-45deg);
  transform-origin: 50% 0;
}

.counew {
  top: 0;
  left: -50rpx;
  width: 100rpx;
  height: 45rpx;
  font-size: 18rpx;
  line-height: 52rpx;
  background: linear-gradient(#96e666, #08c37d);
  transform: rotate(-45deg);
  transform-origin: 50% 0;
}

.dot1,
.dot2 {
  position: absolute;
  right: -16rpx;
  width: 30rpx;
  height: 15rpx;
  background: #eff3f6;
}

.dot1 {
  top: -1.5rpx;
  border-radius: 0 0 30px 30px;
  border-top: 0;
}

.dot2 {
  bottom: -1.5rpx;
  border-radius: 30px 30px 0 0;
  border-bottom: 0;
}

.cou2l {
  width: 180rpx;
  border-right: 1px dashed #ddd;
}

.cou3 {
  background: #f6f7f9;
  border-radius: 15rpx;
}

.cou3 .cou2l {
  width: 160rpx;
}

.cou3br {
  width: 42rpx;
  padding: 5rpx 12rpx;
  background: #ddd;
}

.cou5 {
  height: 174rpx;
}

.cou5 .cou5l {
  width: 135rpx;
  height: 108rpx;
}

.cou5 .cou5r {
  padding-left: 30rpx;
}

.cou5 .cou5lq {
  background: linear-gradient(90deg, #ff876f, #ff654d);
  min-width: 116rpx;
  height: 56rpx;
}

.cou5 .cou5ylq {
  width: 125rpx;
  height: 125rpx;
  bottom: -20rpx;
  right: 0;
}

.be5 {
  background: #e5e5e5;
}

.cou6 {
  padding: 10rpx 15rpx;
}

.f66 {
  font-size: 66rpx;
}

.lh1 {
  line-height: 1;
}

.gfbg:after {
  background: #ffafc0;
}

.gfbg:before {
  background: #ffafc0;
}

.gfbtn {
  width: 112rpx;
  height: 48rpx;
  color: #fff;
  border-radius: 4rpx;
}

.gfbg {
  border-top: 1px dashed #eee;
}

.cef {
  color: #ef371f;
}

.cou8 .bgimg {
  width: 100%;
  height: 140rpx;
}

.cou8 .cqb {
  color: #7a4a1a;
}

.cou8 .cou8m {
  border-right: 1px dashed #e2e2e2;
  padding-right: 20rpx;
}

.cou8 .cou8zs {
  background: #f2d287;
  color: #7b4b1b;
  padding: 2rpx 10rpx;
}

.cou8 .cou5lq {
  background: #f2d287;
  color: #7b4b1b;
}

.cou8 .qbzkc {
  border: 0.5px solid #f7eac6;
  color: #7b4b1b;
  padding: 2rpx 6rpx;
  border-radius: 4rpx;
}

.cou9 {
  width: 690rpx;
}

.cou9 .cout {
  height: 190rpx;
  padding: 25rpx 30rpx 15rpx;
}

.cou9 .cou9tl {
  width: 100rpx;
  height: 100rpx;
}

.cou9 .qbyhq {
  width: 690rpx;
  height: 288rpx;
}

.cou9 .dpimg {
  width: 30rpx;
  height: 30rpx;
}

.cou9 .qqg {
  width: 123rpx;
  height: 54rpx;
  border-radius: 54rpx;
  background: linear-gradient(90deg, #ff315f, #ff4c21);
}

.cou9 .jdt {
  width: 88rpx;
  height: 8rpx;
  border-radius: 10rpx;
  background: #ffb2b2;
}

.cou9 .jd {
  border-radius: 10rpx;
  background: linear-gradient(90deg, #ff315f, #ff4c21);
}

.cou9 .cou9b {
  border-radius: 60rpx 60rpx 0 0;
}

.cou10 .cout {
  padding: 15rpx 30rpx 15rpx;
}

.cou10 .coub:before {
  background: transparent;
}

.cou10 .ybk {
  top: 0;
  left: 0;
  height: 100%;
  width: 15rpx;
  background: linear-gradient(0deg, #f75214 20%, #f87d22);
}

.cou10 .cout::after {
  border-bottom: 1px dashed #fa5a16;
}

.cou10 .num {
  top: 0;
  right: 0rpx;
  padding: 0 20rpx;
  height: 45rpx;
  font-size: 22rpx;
  line-height: 45rpx;
  border-bottom-left-radius: 20rpx;
  background: linear-gradient(#f75214, #f87d22);
}
</style>