<template>
  <view @tap="goDL" class="bf bs30 mb30 pb10 f24 ">
    <block v-if="otype==1">
      <mg-cell class="" cname="p253" isr="1" noc="1" vueId="01775db0-1" :vueSlots="['bd']">
        <view class="f-y-c " slot="bd">
          <view class="mrltc bsf f-c b-l-ts mr15 ">
            <text class="iconfont icondndc cf "></text>
          </view>
          <view class="f-1 ">
            <view @tap.stop="gosjDL" class="f-y-c ">
              <text class="t-o-e f28 ">{{co.storeName+''}}</text>
              <text class="iconfont iconright c0 f24 "></text>
            </view>
          </view>
          <view class="f-g-0 " :style="'color:'+  stateColor() +';'">
            {{ getState()+stime}}</view>
        </view>
      </mg-cell>
      <mg-cell brs="10rpx" class="" cname="p23" h="110" :img="co.goodsArr[0].icon" last="1" noc="1" vueId="01775db0-2" :vueSlots="['bd']" w="110">
        <view class="" slot="bd">
          <view class="">{{'时间：'+(otype ? timeToDate(co.createdAt) : null)}}</view>
          <view class="mt10 ">{{co.goodsArr[0].name+' 等 '+co.goodsNum+'件商品'}}</view>
          <view class="f-y-c mt10 c9 ">
            <view class="">堂食</view>
            <view class="b-r "></view>
            <view class="">{{co.people+'位'}}</view>
          </view>
        </view>
      </mg-cell>
      <view class="p23 ">
        <view class="f-x-bt mb20 ">
          <view class="f-y-c " :style="'color:'+tColor+';'">桌号:<text class="ml20 ">{{co.typeName+co.number}}</text>
          </view>
          <view class="">{{'共'+co.goodsNum+'件'}}<text class="ml20 ">{{''+(co.symbol||sl)+co.money}}</text>
          </view>
        </view>
        <view class="f-row ">
          <view class="f-g-0 f-y-c c9 ">
            <text class="iconfont icondndc mr10 "></text>
            <text class="">堂食订单</text>
          </view>
          <view class="f-g-1 f-x-e ">
            <view @tap.stop="$emit('operation',{t:'tsljzf',co:co})" class="obtn cf " :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="co.state==1&&co.eatType==1||co.state==2&&co.eatType==2">立即支付</view>
            <view @tap.stop="$emit('operation',{t:'lxsj',co:co})" class="obtn b-d " v-if="co.state==3">联系商家</view>
          </view>
        </view>
      </view>
    </block>
    <block v-else>
      <block v-if="otype==2">
        <mg-cell class="" cname="p253" isr="1" noc="1" vueId="01775db0-3" :vueSlots="['bd']">
          <view class="f-y-c " slot="bd">
            <view class="mrltc bsf f-c b-l-sy mr15 ">
              <text class="iconfont iconyue cf f28 "></text>
            </view>
            <view class="f-1 ">
              <view @tap.stop="gosjDL" class="f-y-c ">
                <text class="t-o-e f28 ">{{co.storeName+''}}</text>
                <text class="iconfont iconright c0 f24 "></text>
              </view>
            </view>
            <view class="f-g-0 " :style="'color:'+ stateColor() +';'">
              {{''+ getState() }}</view>
          </view>
        </mg-cell>
        <mg-cell brs="10rpx" class="" cname="p23" h="110" :img="co.storeIcon" last="1" noc="1" vueId="01775db0-4" :vueSlots="['bd']" w="110">
          <view class="" slot="bd">
            <view class="">{{'时间：'+(2 == otype ? timeToDate(co.createdAt) : null)}}</view>
            <view class="mt10 ">{{'实付：'+''+(co.symbol||sl)+co.money}}</view>
          </view>
        </mg-cell>
        <view class="p23 ">
          <view class="f-row ">
            <view class="f-g-0 f-y-c c9 ">
              <text class="iconfont iconyue mr10 "></text>
              <text class="">当面付订单</text>
            </view>
            <view class="f-g-1 f-x-e ">
              <view class="obtn b-d ">查看详情</view>
            </view>
          </view>
        </view>
      </block>
      <block v-else>
        <block v-if="otype==4">
          <mg-cell class="" cname="p253" isr="1" noc="1" vueId="01775db0-5" :vueSlots="['bd']">
            <view class="f-y-c " slot="bd">
              <view class="mrltc bsf f-c b-l-kc mr15 ">
                <text class="iconfont iconmd cf "></text>
              </view>
              <view class="f-1 ">
                <view @tap.stop="gosjDL" class="f-y-c ">
                  <text class="t-o-e f28 ">{{co.storeName+''}}</text>
                  <text class="iconfont iconright c0 f24 "></text>
                </view>
              </view>
              <view class="f-g-0 " :style="'color:'+ stateColor() +';'">
                {{''+ getState() +stime}}</view>
            </view>
          </mg-cell>
          <mg-cell brs="10rpx" class="" cname="p23" h="110" :img="co.goodsArr[0].icon" last="1" noc="1" vueId="01775db0-6" :vueSlots="['bd']" w="110">
            <view class="" slot="bd">
              <view class="">{{'时间：'+(4 == otype ? timeToDate(co.createdAt) : null)}}</view>
              <view class="mt10 ">{{co.goodsArr[0].name+' 等 '+co.goodsNum+'件商品'}}</view>
              <view class="mt10 ">{{co.isOut==1?'店内就餐':'打包带走'}}</view>
            </view>
          </mg-cell>
          <view class="p23 ">
            <view class="f-x-bt mb20 ">
              <view class="f-y-c wei " :style="'color:'+tColor+';'">{{co.callNo?'取单号：'+co.callNo:''}}</view>
              <view class="">{{'共'+co.goodsNum+'件'}}<text class="ml20 ">{{''+(co.symbol||sl)+co.money}}</text>
              </view>
            </view>
            <view class="f-row ">
              <view class="f-g-0 f-y-c c9 ">
                <text class="iconfont iconmd mr10 "></text>
                <text class="">快餐订单</text>
              </view>
              <view class="f-g-1 f-x-e ">
                <view @tap.stop="$emit('operation',{t:'qxdd',co:co})" class="obtn b-d " v-if="co.state==1">取消订单</view>
                <view @tap.stop="$emit('operation',{t:'ljzf',co:co})" class="obtn cf " :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="co.state==1">立即支付</view>
                <view @tap.stop="$emit('operation',{t:'sqtk',co:co})" class="obtn cf " :style="'color:'+tColor+';'+'border-color:'+tColor+';'" v-if="co.isTk==1">取消订单</view>
                <view @tap.stop="$emit('operation',{t:'lxsj',co:co})" class="obtn b-d " v-if="co.state==3">联系商家</view>
              </view>
            </view>
          </view>
        </block>
        <block v-else>
          <block v-if="otype==3">
            <mg-cell class="" cname="p253" isr="1" noc="1" vueId="01775db0-7" :vueSlots="['bd']">
              <view class="f-y-c " slot="bd">
                <view class="mrltc bsf f-c b-l-yy mr15 ">
                  <text class="iconfont iconmd cf f28 "></text>
                </view>
                <view class="f-1 ">
                  <view @tap.stop="gosjDL" class="f-y-c ">
                    <text class="t-o-e f28 ">{{co.storeName+''}}</text>
                    <text class="iconfont iconright c0 f24 "></text>
                  </view>
                </view>
                <view class="f-g-0 " :style="'color:'+ stateColor() +';'">
                  {{''+ getState()}}</view>
              </view>
            </mg-cell>
            <mg-cell brs="10rpx" class="" cname="p23" h="110" :img="co.storeIcon" last="1" noc="1" vueId="01775db0-8" :vueSlots="['bd']" w="110">
              <view class="" slot="bd">
                <view class="f-y-c wei ">
                  <view class="mr10 ">{{co.serviceDay}}</view>
                  <view class="">{{co.serviceTime}}</view>
                </view>
                <view class="f-y-c mt10 c6 ">
                  <view class="">{{co.regionName}}</view>
                  <view class="b-r "></view>
                  <view class="">{{co.people+'人就餐'}}</view>
                </view>
                <view class="mt10 c6 ">{{'下单时间：'+ timeToDate(co.createdAt)}}</view>
              </view>
            </mg-cell>
            <view class="p23 ">
              <view class="f-row ">
                <view class="f-g-0 f-y-c c9 ">
                  <text class="iconfont iconmd mr10 "></text>
                  <text class="">预约订单</text>
                </view>
                <view class="f-g-1 f-x-e ">
                  <view class="obtn b-d ">查看详情</view>
                </view>
              </view>
            </view>
          </block>
          <block v-else>
            <block v-if="otype==5">
              <mg-cell class="" cname="p253" isr="1" noc="1" vueId="01775db0-9" :vueSlots="['bd']">
                <view class="f-y-c " slot="bd">
                  <view class="mrltc bsf f-c b-l-pd mr15 ">
                    <text class="iconfont icondd cf f28 "></text>
                  </view>
                  <view class="f-1 ">
                    <view @tap.stop="gosjDL" class="f-y-c ">
                      <text class="t-o-e f28 ">{{co.storeName+''}}</text>
                      <text class="iconfont iconright c0 f24 "></text>
                    </view>
                  </view>
                  <view class="f-g-0 " :style="'color:'+stateColor() +';'">
                    {{''+ getState()}}</view>
                </view>
              </mg-cell>
              <mg-cell brs="10rpx" class="" cname="p23" h="110" :img="co.logo" last="1" noc="1" vueId="01775db0-10" :vueSlots="['bd']" w="110">
                <view class="" slot="bd">
                  <view class="">{{'时间：'+(5 == otype ? timeToDate(co.createdAt) : null)}}</view>
                  <view class="f-y-c mt10 c6 ">
                    <view class="">{{co.name}}</view>
                    <view class="b-r "></view>
                    <view class="">{{co.people+'人就餐'}}</view>
                  </view>
                  <view class="mt10 wei " :style="'color:'+tColor+';'">{{'排队号：'+co.code}}</view>
                </view>
              </mg-cell>
              <view class="p23 ">
                <view class="f-row ">
                  <view class="f-g-0 f-y-c c9 ">
                    <text class="iconfont icondd mr10 "></text>
                    <text class="">排队订单</text>
                  </view>
                  <view class="f-g-1 f-x-e ">
                    <view @tap.stop="$emit('operation',{t:'scpd',co:co})" class="obtn b-d ">删除</view>
                  </view>
                </view>
              </view>
            </block>
          </block>
        </block>
      </block>
    </block>
  </view>
</template>

<script>
import {
  utilMixins
} from 'common/utilMixins';
import {
  countDownTime
} from 'common/util';
import bkB from 'components/common/block-b.vue';
export default {
  name: "my-dnorder",
  components: {
    bkB
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    otype: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      stateArr: ["", "待付款", "已接单", "已支付", "已关闭", "已退款"],
      kcstateArr: ["待付款", "待接单", "制作中", "已完成", "已关闭"],
      yystateArr: ["待支付", "预约中", "预约成功", "已拒绝", "确认到店", "已取消"],
      pdstateArr: ["排队中", "已就餐", "已过号", "已取消"],
      stime: ""
    };
  },
  mixins: [utilMixins],
  computed: {},
  methods: {
    goDL: function () {
      var t;

      switch (this.otype) {
        case 1:
          t = "/yb_wm/shop/in/order-dl?id=" + this.co.id;
          break;

        case 2:
          t = "/yb_wm/shop/in/syorder-dl?id=" + this.co.id;
          break;

        case 4:
          t = "/yb_wm/shop/ffmode/order-dl?id=" + this.co.id;
          break;

        case 3:
          t = "/yb_wm/inshop/reserve/yyxq?id=" + this.co.id;
          break;

        case 5:
          t = "/yb_wm/inshop/lineup/pdxq?id=" + this.co.id;
      }

      this.go({
        t: 1,
        url: t
      });
    },
    gosjDL: function () {
      this.go({
        t: 6,
        url: "/pages/tabbar/order/index"
      });
    },
    getState: function () {
      return 1 == this.otype ? this.stateArr[+this.co.state] :
        2 == this.otype ? "已完成" :
          4 == this.otype ? this.kcstateArr[+this.co.state - 1] || "" :
            3 == this.otype ? this.yystateArr[+this.co.state - 1] :
              5 == this.otype ? this.pdstateArr[+this.co.state - 1] : void 0;
    },
    stateColor: function () {
      var t = "";
      if (1 == this.otype || 2 == this.otype) switch (+this.co.state) {
        case 1:
        case 2:
          t = 1 == this.otype ? this.tColor : "#999";
          break;

        case 7:
          t = "";
          break;

        case 8:
        case 5:
          t = "#f00";
          break;

        default:
          t = "#999";
      } else if (3 == this.otype) switch (+this.co.state) {
        case 2:
        case 3:
          t = this.tColor;
          break;

        case 4:
          t = "#f00";
          break;

        default:
          t = "#999";
      } else if (4 == this.otype) switch (+this.co.state) {
        case 1:
        case 3:
          t = this.tColor;
          break;

        default:
          t = "#999";
      } else if (5 == this.otype) switch (+this.co.state) {
        case 1:
          t = this.tColor;
          break;

        default:
          t = "#999";
      }
      return t;
    },
    djs: function (t) {
      var e = this;

      if (1 == this.co.state) {
        var o = this.dateToTime(),
          n = +t + 900;
        if (n > o) countDownTime(n - o);
        this.stime =
          "，\n\t\t\t\t\t\t剩余 $ {\n\t\t\t\t\t\t\ta[2]\n\t\t\t\t\t\t}: $ {\n\t\t\t\t\t\t\ta[3]\n\t\t\t\t\t\t}\n\t\t\t\t\t\t";
        this.dsq = setInterval(
          () => {

            n -= 1;
            if (n == o) {
              clearInterval(e.dsq);
              e.$emit("operation", {
                t: "qxdd",
                co: e.co
              })
            }
            countDownTime(n - o)
            e.stime =
              "，\n\t\t\t\t\t\t剩余 $ {\n\t\t\t\t\t\t\tarr[2]\n\t\t\t\t\t\t}: $ {\n\t\t\t\t\t\t\tarr[3]\n\t\t\t\t\t\t}\n\t\t\t\t\t\t";
          }, 3000
        )

      }

    }
  }
}
</script>
<style scoped>
.mrltc {
  width: 50rpx;
  height: 50rpx;
}

.b-l-ts {
  background: linear-gradient(180deg, #f38529, #fe912c);
}

.b-l-sy {
  background: linear-gradient(180deg, #a57afa, #a175f8);
}

.b-l-kc {
  background: linear-gradient(180deg, #07c160, #09bb07);
}

.b-l-yy {
  background: linear-gradient(180deg, #05cbe0, #02aaba);
}

.b-l-pd {
  background: linear-gradient(180deg, #ffcd42, #fabc0a);
}

.b-r {
  width: 1px;
  height: 23rpx;
  background: #999;
  margin: 0 12rpx;
}
</style>