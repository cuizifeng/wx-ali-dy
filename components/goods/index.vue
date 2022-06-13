<template>
  <view>
    <block v-if="type==1">
      <view :class="(('')+' '+((last)?'mb80':''))">
        <view class="conw2 f-row p2 " v-for="(co, i) in dList" :key="i">
          <view class="f-g-0 bf6 left bs5 p-r " @tap="goodinfo">
            <mg-img :vue-id="'22d6cc2e-1-'+i" cname="wh" :src="co.icon">
            </mg-img>
            <block v-if="outin==1?co.outStock<=0:co.inStock<=0">
              <view class="p-a ysq f-c b0 cf w100 f26 ">
                已售罄
              </view>
            </block>
          </view>
          <view class="f-g-1 right ml20 f24 c9 ">
            <view class="f30 t-o-e c0 ">
              {{co.name}}
            </view>
            <view class="mt10 ">
              <bk-b :vue-id="'22d6cc2e-2-'+i" c-name="f22 bf7 cb mr10 p-3-10" t="含茶">
              </bk-b>
              <bk-b :vue-id="'22d6cc2e-3-'+i" c-name="f22 bf7 cb mr10 p-3-10" t="含乳制品">
              </bk-b>
            </view>
            <view class="mt10 t-o-e2 f20 ">
              {{'防疫期间，为减少接触，如有不便请您谅解。'||co.body}}
            </view>
            <block v-if="orderset.sales==1&&co.salesNum>0">
              <view class="mt10 f-raw ">
                <text class="mr30 "> {{"销量 "+co.salesNum}} </text>
              </view>
            </block>
            <block v-if="vipPrice(co)">
              <view class="mt10 f-row ">
                <view class="vipl f-y-c ">
                  <view>
                    {{sl+ vipPrice(co)}}
                  </view>
                </view>
                <view class="vipr f-y-c ">
                  VIP
                </view>
              </view>
            </block>
            <add-goods :vue-id="'22d6cc2e-4-'+i" :isunit="isunit(co)" :isyprice="isyprice(co)" :outin="outin" :co="co" cname="mt10" pcname="f36 c3" @add="add" @dec="dec">
            </add-goods>
            <block v-if="co.maxNum>0||co.minNum>1">
              <view>
                <block v-if="co.minNum>1">
                  <text class="crb mr20 "> {{co.minNum+"份起售"}} </text>
                </block>
                <block v-if="co.maxNum>0">
                  <text class="crb "> {{"限"+co.maxNum+"份"}} </text>
                </block>
              </view>
            </block>
          </view>
        </view>
      </view>
    </block>
    <block v-else-if="type==2">
      <scroll-view class="ws-n mb10 " :scroll-x="true">
        <view class="dis-in conw mr20 bs15 " v-for="(co, i) in dList" :key="i">
          <view class="goodsimg " @tap="goodinfo(co)">
            <mg-img :vue-id="'22d6cc2e-5-'+i" cname="wh" :src="co.icon">
            </mg-img>
          </view>
          <view class="conwb ">
            <view class="t-o-e f26 ">
              {{co.name}}
            </view>
            <add-goods :vue-id="'22d6cc2e-6-'+i" :addgb="addgb" :outin="outin" :co="co" pcname="f26" @add="add" @dec="dec">
            </add-goods>
          </view>
        </view>
      </scroll-view>
    </block>
    <block v-else-if="type==3">
      <view class="p23 bf ">
        <view class="f-x-bt ">
          <view class="c0 f-y-c f-1 " style="min-width:60%;">
            <block v-if="co.labelName">
              <text class="text-btnf f22 mr20 p-3-10 bs5 f-g-0 " :style="'background:'+('rgba('+cTR(co.labelColor)+',0.1)')+';'+('color:'+(co.labelColor)+';')">
                {{co.labelName}} </text>
            </block>
            <text class="f34 wei "> {{co.name}} </text>
          </view>
          <view class="c9 f24 ml20 ">
            <block v-if="system.switch.saleShow==1&&co.salesNum>0">
              <text> {{"销量"+co.salesNum}} </text>
            </block>
            <block v-if="system.switch.stockShow==1">
              <text class="ml20 "> {{"库存"+co.stock}} </text>
            </block>
          </view>
        </view>
        <view class="c9 f24 m10 ">
          {{co.body}}
        </view>
        <block v-if="co.vipPrice<co.activityGoodData.activityMoney">
          <view class="mt10 f-row ">
            <view class="vipl f-y-c ">
              <view>
                {{sl+co.vipPrice}}
              </view>
            </view>
            <view class="vipr f-y-c ">
              VIP
            </view>
          </view>
        </block>
        <add-goods vue-id="22d6cc2e-7" :isunit="isunit(co)" :isyprice="isyprice(co)" :outin="outin" :co="co" cname="mt10" pcname="f44" showspec="false" :showjj="co.isSpecs!=1&&co.isMaterial!=1&&co.isAttr!=1" :nocheckgd="true" numc="f36" @add="add" @dec="dec">
        </add-goods>
        <block v-if="co.activityGoodData.type>0">
          <view class="mt5 f-row f20 mb10 " :style="'color:'+(tColor)+';'">
            <block v-if="co.activityGoodData.type<3">
              <view class="f-row bs5 b-d p1 l-h1 " :style="'border-color:'+(tColor)+';'">
                <view>
                  {{co.activityGoodData.type==1?'特价':co.activityGoodData.discount+'折'}}
                </view>
                <block v-if="co.activityGoodData.limitNum>0">
                  <view class="ml10 sphdir " :style="'border-color:'+(tColor)+';'">
                    {{"限"+co.activityGoodData.limitNum+"份"}}
                  </view>
                </block>
              </view>
            </block>
            <block v-else>
              <block v-if="co.activityGoodData.type==3">
                <view>
                  <text> {{"商品立减"+(sl+co.activityGoodData.discount)}} </text>
                  <block v-if="co.activityGoodData.limitNum>0">
                    <text class="ml10 "> {{"限"+co.activityGoodData.limitNum+"份"}} </text>
                  </block>
                </view>
              </block>
              <block v-else>
                <view>
                  {{co.activityGoodData.type==4?'第二件'+co.activityGoodData.discount+'折':'买一送一'}}
                </view>
              </block>
            </block>
          </view>
        </block>
        <block v-if="co.maxNum>0||co.minNum>1">
          <view class="f24 ">
            <block v-if="co.minNum>1">
              <text class="cf5f mr20 "> {{co.minNum+"份起售"}} </text>
            </block>
            <block v-if="co.maxNum>0">
              <text class="cf5f "> {{"限"+co.maxNum+"份"}} </text>
            </block>
          </view>
        </block>
      </view>
    </block>
    <block v-else-if="type==6">
      <view>
        <mg-cell :vue-id="'22d6cc2e-8-'+i" w="160" h="160" :img="co.icon" brs="5rpx" cname="f-sh" hdc="f-s" v-for="(co, i) in dList" :key="i">
          <view class="h100 f-y-bt " slot="bd">
            <view class="f-bt ">
              <view class="t-o-e f32 c0 ">
                {{co.name}}
              </view>
            </view>
            <view class="f-bt mt10 ">
              <view class="f-g-1 f24 c9 ">
                <block v-if="co.groupName">
                  <text> {{co.groupName}} </text>
                </block>
                <block v-if="co.attribute">
                  <text> {{"("+co.attribute+")"}} </text>
                </block>
                <block v-if="co.materialName">
                  <text class="ml10 "> {{"+"+co.materialName}} </text>
                </block>
              </view>
            </view>
            <view class="f-x-bt mt10 ">
              <view class="f-g-0 " style="color:#ff560a;">
                {{sl}} <text class="f36 wei "> {{itemTotal(co.money, co.num)}} </text>
              </view>
              <add-goods :vue-id="('22d6cc2e-9-'+i)+','+('22d6cc2e-8-'+i)" color="#ff560a" addwz="2" :isprice="0" :showspec="false" :co="co" cname="f-g-0 mt10" numc="f36" @add="add" @dec="dec">
              </add-goods>
            </view>
          </view>
        </mg-cell>
      </view>
    </block>
  </view>
</template>

<script>
import bkB from 'components/common/block-b.vue';
import addGoods from './add-goods.vue';
import MgCell from 'components/common/mg-cell.vue';
import {
  mapState,
} from 'vuex'
import {
  colorToRGB
} from 'common/util';
export default {
  name: "goods",
  components: {
    addGoods,
    bkB,
    MgCell,
  },
  props: {
    dList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    co: Object,
    type: {
      type: String,
      default: "1"
    },
    showbody: {
      type: Boolean,
      default: !0
    },
    showadd: {
      type: Boolean,
      default: !0
    },
    addtype: {
      type: String,
      default: "1"
    },
    outin: {
      type: String,
      default: "1"
    },
    color: {
      type: String,
      default: ""
    },
    last: {
      type: Boolean,
      default: !1
    },
    storeid: {
      type: String,
      default: ""
    },
    addgb: {
      type: Boolean,
      default: !0
    }
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState({
      orderset: function (t) {
        return t.config.orderset;
      }
    })
  },
  methods: {
    dec: function (t, e) {
      1 == this.addtype ? this.$emit("dec", t.g) : this.$emit("dec", {
        addwz: t.addwz,
        g: t.g
      });
    },
    add: function (t, e) {
      console.log('t: ', t);
      1 == this.addtype ? this.$emit("add", {
        g: t.g
      }) : this.$emit("add", {
        addwz: t.addwz,
        g: t.g
      });
    },
    goodinfo: function (t) {
      this.go({
        t: 1,
        url: "/yb_wm/shop/out/goods-dl?gid=".concat(t.id, "&storeId=").concat(this.storeid, "&page=shopGoods")
      });
    },
    itemTotal: function (t, e) {
      return (t * e).toFixed(2);
    },
    isunit: function (t) {
      return !!t.unit;
    },
    isyprice: function (t) {
      return this.co.activityGoodData.type > 0 && this.co.activityGoodData.type < 4;
    },
    vipPrice: function (t) {
      return 1 == this.outin ? t.outVipPrice > 0 ? t.outVipPrice : "" : t.inVipPrice > 0 ? t.inVipPrice : "";
    },
    cTR: function (t) {
      return colorToRGB(t);
    }
  },
  created: function () { }
}
</script>
<style scoped>
.conw {
  width: 210rpx;
}

.conw .goodsimg {
  width: 210rpx;
  height: 210rpx;
}

.conw .conwb {
  padding: 10rpx 6rpx 0 2rpx;
}

.conw2 .left {
  width: 138rpx;
  height: 138rpx;
}

.mb80 {
  padding-bottom: 100rpx;
}

.ysq {
  height: 50rpx;
  background: rgba(0, 0, 0, 0.5);
}

.sphdir {
  padding-left: 10rpx;
  border-left: 0.5px solid #eee;
}
</style>