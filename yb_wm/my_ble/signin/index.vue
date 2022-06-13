<template>
  <view class="pb130 ">
    <view class="qdh ">
      <view class="wh ">
        <mg-img class="" :src="config.icon" vueId="f24c74c2-1"></mg-img>
      </view>
    </view>
    <view class="qdc p-r ">
      <view class="m03 mt10 ">
        <view class="bf mb30 bs20 p3 ">
          <view class="f-row p24 posi-r w630 ">
            <view :class="['qddays f-col f-bt p-r ',v.sign==1?'bf2':'be6']" v-for="(v, i) in jsqd.weeklist" :key="i">
              <view :class="['c6 f26 f-x-c f-g-0 dhe p050 ',v.sign==1?'cf':'c6']">{{v.name+'天'}}</view>
              <view class="f-g-1 f-x-c ">
                <view class="icw ">
                  <mg-img class="" :src="v.icon" :vueId="'f24c74c2-2-'+i"></mg-img>
                </view>
              </view>
              <view class="qddayw be6 posi-a r0 " v-if="v.hasjl&&(v.type==3||v.type==4)">
                <mg-img class="" src="https://yunbei.lianmengfu.net/xcxpic/wd/signin/hb.png" :vueId="'f24c74c2-3-'+i"></mg-img>
              </view>
            </view>
          </view>
          <view class="f-col f-y-c m20 ">
            <button @tap="ljqd" class="clearbtn sbtn f-c cf f30 " :disabled="disabled" v-if="goSignin=='1'">立即签到</button>
            <view class="sbtn ysbtn f-c f30 " v-else>今日已签到</view>
            <view class="f22 c9 f-g-1 mt10 " v-if="config.continuity.length&&jsqd.totalDay>0">已经签到<text class="cfc m01 ">{{jsqd.totalSignDay}}</text>天，再签<text class="cfc m01 ">{{jsqd.totalDay}}</text>天必得好礼</view>
          </view>
        </view>
        <view class="bf mb30 bs20 p30 ">
          <view class="f-c c0 f32 wei ">我的签到</view>
          <view class="f-row f-bt c6 p30 ">
            <view @tap="mysignin({type:1})" class="f-1 f-y-c f-col ">
              <view class="f26 ">
                <text class="f46 wei cfc mr10 ">{{mySignData.integral}}</text>{{jfName}}
              </view>
              <view class="f24 ">{{'累计已获'+jfName}}</view>
            </view>
            <view @tap="mycoupon" class="f-1 f-y-c f-col ">
              <view class="f26 ">
                <text class="f46 wei cfc mr10 ">{{mySignData.couponNum}}</text>张
              </view>
              <view class="f24 ">累计已获优惠券</view>
            </view>
            <view @tap="mysignin({type:2})" class="f-1 f-y-c f-col ">
              <view class="f26 ">
                <text class="f46 wei cfc mr10 ">{{mySignData.signNum}}</text>次
              </view>
              <view class="f24 ">累计签到</view>
            </view>
          </view>
        </view>
        <view class="bf mb30 bs20 p3 ">
          <view class="f-c c0 f32 wei ">签到规则</view>
          <view class="p3 c6 ">{{config.introduce}}</view>
        </view>
        <view class="bf mb30 bs20 p3 ">
          <view class="f-bt f-y-c ">
            <view class="f-g-1 c3 ">
              <view class="f32 wei ">{{'下单获取额外'+jfName+'奖励'}}</view>
              <view class="c9 f22 mt10 ">据您最近的门店<text class="f26 c3 ml10 ">{{storeInfo.name}}</text>
              </view>
            </view>
            <view class="f-g-0 ">
              <view @tap="qxd" class="goxd f-c ml30 cf2 ">
                <text class="iconfont f28 iconshangjia cf2 mr10 "></text>
                <text class="f24 ">去下单</text>
              </view>
            </view>
          </view>
        </view>
        <view class="bf mb30 bs20 p3 ">
          <mg-cell arrow="1" @tab="go({t:1,url:'/pages/tabbar/shop/index'})" btt="兑换商品" bttc="f32" cname="p0" ft="查看全部" ftc="f24 c9" hc="1" last="1" vueId="f24c74c2-4"></mg-cell>
          <view class="bf f-raw f-bt pt30 " v-if="dataList.length">
            <view @tap="go({t:1,url:'/yb_wm/my/integral/details?id='+v.id})" class="bf goodsc mb20 bs15 b-s-1 " v-if="i<4" v-for="(v, i) in dataList" :key="i">
              <view class="goodsimg be6 ">
                <mg-img class="" :src="v.icon" :vueId="'f24c74c2-5-'+i"></mg-img>
              </view>
              <view class="p-10-20 ">
                <view class="f-bt ">
                  <text class="bf2 cf f24 mr10 boxs f-g-0 " v-if="v.type=='2'">红</text>
                  <text class="t-o-e f-g-1 ">{{v.name}}</text>
                </view>
                <view class="cfa ">
                  <view class="t-o-e f30 " :style="'color:'+tColor+';'">
                    <text class="" v-if="v.score>0">{{v.score}}</text>
                    <text class="f22 c9 nowei " v-if="v.score>0">{{jfName}}</text>
                    <text class="nowei c9 " v-if="v.score>0&&v.money>0">+</text>
                    <text class="" v-if="v.money>0">{{v.money}}<text class="f22 c9 ">{{dw}}</text>
                    </text>
                  </view>
                  <view class="t-o-e t-d-l c9 f22 wei4 ">{{sl+v.price}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <tab-bar class="" vueId="f24c74c2-6"></tab-bar>
    <!-- <load class="" vueId="f24c74c2-7" v-if="showLoading"></load> -->
  </view>
</template>

<script>
import load from 'components/common/load.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  formatNumber,
  formatTime,
  getDw,
  message,
  setNT
} from 'common/util';
export default {
  name: "index",
  components: {
    load
  },
  data: function () {
    return {
      goSignin: "",
      dataRecord: "",
      totalSignDay: 0,
      totalDay: 0,
      mySignData: "",
      config: {},
      dataList: [],
      showLoading: !0,
      storeInfo: {},
      disabled: !1
    }
  },
  onLoad: function () {
    var t = this;
    t.getpageconfig();
    t.getSystem(), setNT("签到"), formatTime(new Date), (new Date).getTime(),
      t.getLoginInfo();
    t.weekSignRecord(), t.mySign(), t.getList(), t.getDw();
  },
  mixins: [utilMixins],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    },
    jsqd: function () {
      var t = this;
      if (this.dataRecord && this.config.oneDay) {
        for (var e = this.dataRecord, n = 0, r = this.timeToDate(this.dateToTime()).substring(0, 10), i = e
          .findIndex((function (t) {
            return t.time == r
          })), a = 0; a < e.length; a++) a < i ? 1 == e[a].sign ? (e[a].type = 1, e[a].btnName = "已签到", e[a]
            .icon = "https://yunbei.lianmengfu.net/xcxpic/wd/signin/gou.png") : e[a].type = 2 : a == i ? 1 == e[a].sign ? (e[a].type = 1, e[a]
              .btnName = "已签到", e[a].icon = "https://yunbei.lianmengfu.net/xcxpic/wd/signin/gou.png") : (e[a].type = 3, e[a].btnName = "签到", e[a]
                .icon = "https://yunbei.lianmengfu.net/xcxpic/wd/signin/jb.png") : (e[a].type = 4, e[a].icon = "https://yunbei.lianmengfu.net/xcxpic/wd/signin/jb.png"), e[a]
                  .name = a + 1, 1 == e[a].sign && n++;
        n = +n;
        var o = function (n) {
          var r = e.find((function (e, r) {
            return r + 1 == t.config.continuity[n].days
          }));
          r && (r.hasjl = 1)
        };
        for (var u in this.config.continuity) o(u);
        var c = this.config.continuity.sort((function (t, e) {
          return t.days - e.days
        })),
          s = c.find((function (t) {
            return t.days > n
          })),
          f = s ? s.days - n : 0,
          d = e;
        return {
          totalSignDay: n,
          totalDay: f,
          weeklist: d
        }
      }
    }
  },
  methods: {
    ...mapActions(["getConfig"]),
    getpageconfig: function () {
      var e = this;
      this.$api.config_config({
        ident: "signin"
      }).then(res => {
        e.config = res, 1 != res.open && uni.showModal({
          title: "提示",
          content: "签到功能已关闭",
          showCancel: !1,
          success: function (t) {
            e.go({
              t: 6,
              url: "/yb_wm/index/my-index"
            })
          }
        });
      })
    },
    weekSignRecord: function () {
      var t = this;
      this.$api['sign-in_week__sign__record']().then(res => {
        t.dataRecord = res.record, t.showBtn()
      })
    },
    mySign: function () {
      var t = this;
      this.$api['sign-in_my__sign']().then(res => {
        t.mySignData = res.data;
      })
    },
    showBtn: function () {
      var t = this;
      var n;
      n = t.jsqd.weeklist.map((function (t) {
        return {
          type: t.type
        }
      })), 3 == n[t.jsqd.totalSignDay].type ? t.goSignin = "1" : t.goSignin = "2";
    },
    ljqd: function () {
      var t = this, n;
      t.checkLogin().then(() => {
        if (t.disabled = !0, n = t.jsqd.totalSignDay + 1, "1" == t.goSignin) {
          this.$api['sign-in_sign']({
            day: n
          }).then(res => {
            t.weekSignRecord();
            t.mySign();
            if (res) message("签到成功", 1)
          });
        } else {
          t.disabled = !1;
        }
      });
    },
    getDw: function () {
      var t = this;
      getDw().then(res => {
        console.log('res:gesdw ', res);

        this.$api.shop_lately__store({
          lat: res.latitude,
          lng: res.longitude
        }).then(res => {
          t.storeInfo = res;
        })
      })
    },
    getList: function () {
      var t = this;
      this.$api['integral-shop_goods__list']({
        typeId: "",
        page: 1,
        size: 10
      }).then(res => {
        t.dataList = t.dataList.concat(res);
      })
    },
    qxd: function () {
      this.getConfig({
        key: "storeInfo",
        data: {
          id: this.storeInfo.id,
          name: this.storeInfo.name,
          distance: this.storeInfo.distance
        }
      }), this.go({
        t: 6,
        url: "/pages/tabbar/order/index"
      })
    },
    mysignin: function (t) {
      this.go({
        t: 1,
        url: "/yb_wm/my/signin/my-signin?type=" + t.type
      })
    },
    mycoupon: function () {
      this.go({
        t: 1,
        url: "/yb_wm/my/signin/my-coupon"
      })
    },
    getDates: function (t) {
      for (var e = new Date(t),
        n = e.getTime(),
        r = e.getDay(),
        i = [],
        a = 0; a < 7; a++)
        i.push(new Date(n + 864e5 * (a - (r + 6) % 7)).toLocaleDateString().replace(/\//g, "-"));
      for (var o in i) i[o] = i[o].split("-").map(formatNumber).join("-");
      return console.log(i), i
    }
  },
  created: function () { }
}
</script>

<style>
</style>
<style scoped>
.qdh {
  width: 100%;
  height: 387rpx;
}

.qdc {
  margin-top: -120rpx;
}

.bf2 {
  background: #ff5012;
}

.cf2 {
  color: #ff5012;
}

.goxd {
  width: 160rpx;
  height: 58rpx;
  border: 1rpx solid #ff5012;
  border-radius: 28px;
}

.qddays,
.qddayw {
  width: 67rpx;
  height: 84rpx;
  border-radius: 8rpx;
  margin-left: 30rpx;
}

.qddays:first-child {
  margin-left: 0;
}

.icw {
  width: 34rpx;
  height: 24rpx;
}

.dhe {
  height: 40rpx;
}

.w630 {
  width: 630rpx;
}

.p24 {
  padding: 30rpx 0 40rpx 0;
}

.goodsc {
  width: 305rpx;
}

.goodsimg {
  width: 305rpx;
  height: 305rpx;
}

.boxs {
  border-radius: 8rpx;
  padding: 0 7rpx;
}

.sbtn {
  width: 540rpx;
  height: 94rpx;
  background: linear-gradient(-90deg, #ff5217, #ff772d);
  border-radius: 47px;
}

.ysbtn {
  background: linear-gradient(-90deg, #ff5217, #ff772d);
  opacity: 0.5;
  color: #ffdbcc;
}

.cfc {
  color: #ff481c;
}

.p050 {
  padding: 5rpx 0;
}
</style>