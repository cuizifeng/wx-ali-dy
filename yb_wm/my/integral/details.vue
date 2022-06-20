<template>
  <view class="pb130 ">
    <navBar :title="'商品详情'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <mg-swiper class="" :co="swiper" :color="tColor" u="rpx" vueId="4109bbb6-1"></mg-swiper>
    <view class="p3 bf mb20 ">
      <view class="f-x-bt ">
        <view class="t-o-e f34 wei ">{{dlDatl.name}}</view>
      </view>
      <view class="f-bt mt10 ">
        <view class="cfa f30 mb10 " :style="'color:'+tColor+';'">
          <view class="">
            <!-- <text class="" v-if="dlDatl.score>0">{{dlDatl.score}}</text>
						<text class="f22 nowei c9 " v-if="dlDatl.score>0">{{jfName}}</text>
						<text class="nowei c9 " v-if="dlDatl.score>0&&dlDatl.money>0">+</text> -->
            <text class="" v-if="dlDatl.money>0">{{dlDatl.money}}<text class="f22 c9 ">{{dw}}</text>
            </text>
          </view>
          <view class="t-o-e t-d-l c9 f22 wei4 " v-if="dlDatl.type==1">{{sl+dlDatl.price}}</view>
        </view>
        <view class="">
          <view class="f24 c9 " v-if="dlDatl.stock-dlDatl.convertNum>-1">{{'剩余'+(dlDatl.stock-dlDatl.convertNum)+'件'}}</view>
        </view>
      </view>
    </view>
    <view class="bf p3 ">
      <view class="f32 wei ">商品详情</view>
      <view class="richText" v-if="dlDatl.notice">
        <rich-text :nodes="content"></rich-text>
      </view>
    </view>

    <!-- <view class="dbbtnc " :style="'bottom:'+(isIpx?'40rpx':0)+';'"> -->
    <!-- <view class="dbbtn ">
				<button @tap="ljdh" class="rt f-c " :style="'background:'+tColor+';'">立即购买</button>
			</view> -->
    <view class="f-y-c p-f w100 b0 gwcc bf " :style="'bottom:'+(isIpx?'40rpx':0)+';'">
      <view class="f-1 f-row f22 c3 l-h1 ">
        <view @tap="back" class="f-1 f-c-c ">
          <text class="iconfont iconsy f42 c3 "></text>
          <text class="mt10 ">首页</text>
        </view>
        <view @tap="ljyq" class="f-1 f-c-c ">
          <text class="iconfont iconfx f46 c3 "></text>
          <text class="mt10 ">分享</text>
        </view>
        <view class="dbbtn ">
          <button @tap="ljdh" class="rt f-c " :style="'background:'+tColor+';'">立即购买</button>
        </view>
        <!-- <button @tap="ljdh" class="jrgwc cf f-c f32 " :style="'background:'+tColor+';'">立即购买</button> -->
        <!-- <button @tap="ljdh" class="rt f-c " :style="'background:'+tColor+';'">立即购买</button> -->
      </view>
    </view>
    <!-- </view> -->
    <view class="bgf " v-if="isIpx"></view>
    <mg-popup v-model="showTime" vueId="4109bbb6-3" :vueSlots="['default']">
      <view class="bf c3 bs2000 ">
        <view class="f24 p3 pb0 bor-b ">
          <view class="bf cout f-row pb30 ">
            <view class="f-g-0 coutl mr30 ">
              <view class="imgw bs10 bf7 ">
                <mg-img class="" :src="dlDatl.icon" :vueId="'4109bbb6-4'+','+'4109bbb6-3'"></mg-img>
              </view>
            </view>
            <view class="f-g-1 f-y-bt ">
              <view class="wei4 f32 t-o-e c3 ">{{dlDatl.name}}</view>
              <view class="f-x-bt mt20 cf7 f36 wei4 ">
                <view class="cfa " :style="'color:'+tColor+';'">
                  <!-- <text class="" v-if="dlDatl.score>0">{{dlDatl.score}}</text>
									<text class="f22 nowei c9 " v-if="dlDatl.score>0">{{jfName}}</text>
									<text class="nowei c9 " v-if="dlDatl.score>0&&dlDatl.money>0">+</text> -->
                  <text class="" v-if="dlDatl.money>0">{{dlDatl.money}}<text class="f22 c9 ">{{dw}}</text>
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="f-x-bt p3 bor-b " v-if="dlDatl.type==1">
          <view class="f28 wei4 ">配送方式</view>
          <view class="">
            <view class="bf f-x-bt ">
              <view @tap="clickMode(v)" class="pstypec f-c ml30 " :style="'color:'+(v.value==params.deliveryMode?tColor:'')+';'+'border-color:'+(v.value==params.deliveryMode?tColor:'')+';'" v-for="(v, i) in ModeArr" :key="i">
                <text :class="['iconfont f28 mr10 ',v.icon]" :style="'color:'+(v.value==params.deliveryMode?tColor:'')+';'"></text>
                <text class="f24 ">{{v.name}}</text>
              </view>
            </view>
          </view>
        </view>
        <block v-if="dlDatl.type==1">
          <get-address :address="wmAddress" class="" color="#333" mw=" " :ptype="2" :vueId="'4109bbb6-5'+','+'4109bbb6-3'" v-if="params.deliveryMode==1"></get-address>
          <get-ztjf :address="ziAddress" @ztshow="ztshow" :vueId="'4109bbb6-6'+','+'4109bbb6-3'" v-if="params.deliveryMode==2"></get-ztjf>
        </block>
        <view class="f-x-bt p3 bor-t ">
          <view class="f28 wei4 ">购买数量</view>
          <view class="">
            <number-box @change="bindChange" :max="maxNum" :min="1" :vueId="'4109bbb6-7'+','+'4109bbb6-3'"></number-box>
          </view>
        </view>
        <view class="f-x-bt p3 bor-b bor-t " v-if="params.deliveryMode==1&&dlDatl.type==1">
          <view class="f28 wei4 ">配送运费</view>
          <view class="">{{sl+dlDatl.deliveryMoney}}</view>
        </view>
        <view class="p3 f28 t-r ">
          <view class="">
            <text style="color: #DBA86F;">您最多可购买{{maxNum}}张</text>

            <view>
              {{'共'+params.convertNum+'张，合计'}}
              <!-- <text class="cfa "v-if="dlDatl.score>0">{{xjMoney.totalScore}}</text>
							<text class="" v-if="dlDatl.score>0">{{jfName}}</text>
							<text class="" v-if="dlDatl.score>0&&dlDatl.money>0">+</text> -->
              <text class="cfa " v-if="dlDatl.money>0">{{sl+xjMoney.total}}</text>
            </view>

          </view>
        </view>
        <view :class="['p3 ',isIpx?'mb30':'']">
          <button @tap="qrdh" class="w100 cf f34 qrdh " :disabled="loading" :loading="loading" :style="'background:'+tColor+';'">确认购买</button>
        </view>
      </view>
    </mg-popup>
    <zi-list @chooseAdd="chooseAdd" v-model="showGg" :co="zitiList" :value="showGg" vueId="4109bbb6-8"></zi-list>
    <load class="" vueId="4109bbb6-9" v-if="showLoading"></load>
    <mg-share :co="shareCo" :hbs="true" ptype="1" v-model="shareshow" vueId="24422f2e-5" :s="1"></mg-share>
  </view>
</template>

<script>
import parseHtml from "../../../utils/htmlParser.js";
import getAddress from "components/address/get-address.vue";
import getZtjf from "components/address/get-ztjf.vue";
import mgRtext from "components/common/functionCmp/rich-text.vue";
import MgSwiper from "components/common/functionCmp/swiper.vue";
import load from "components/common/load.vue";
import mgPopup from "components/common/popup.vue";
import numberBox from "components/form/number-box.vue";
import ziList from "./zi-list.vue";
import mgShare from 'components/template/share.vue';
import {
  utilMixins
} from 'common/utilMixins';
import { formatRichText } from '@/utils/miniUtils.js';
import {
  bus,
  message,
  setNT,
  showLoading,
  stfn
} from 'common/util';
import {
  mapActions,
  mapMutations,
  mapState,
} from 'vuex'
export default {
  name: "js-details",
  components: {
    MgSwiper,
    mgRtext,
    mgPopup,
    getAddress,
    getZtjf,
    ziList,
    numberBox,
    load,
    mgShare
  },
  data: function () {
    return {
      content: '',//富文本解析

      swiper: {
        class: "",
        padding: 0,
        swiper: [{
          icon: ""
        }],
        duration: "",
        mode: "",
        height: "500",
        radius: "0",
        auto: !0,
        interval: 5
      },
      // showLoading: !0,
      loading: !1,
      payObj: {},
      showTime: !1,
      wmAddress: "",
      ziAddress: "",
      params: {
        selfId: "",
        goodsId: "",
        convertNum: "1",
        deliveryMode: "",
        userAddId: ""
      },
      dlDatl: "",
      config: "",
      ModeArr: [],
      showGg: !1,
      zitiList: {},
      maxNum: 0,
      shareshow: !1,
      shareCo: {},
      shareObj: '',
      shareUserId: '',//分享商品详情的id
      qrcodeId: '',
    }
  },
  onLoad: function (t) {
    var n = this;
    var a;
    t.qrcodeId ? n.qrcodeId = t.qrcodeId : ''
    a = t.scene ? decodeURIComponent(t.scene) : t.id,
      n.id = a,
      n.getSystem(),
      setNT("商城-商品详情"),
      n.getData(),
      bus.$on("changeChoose", (function (e) {
        e.hasOwnProperty("addInfo") && n.refreshAddress(e.addInfo)
      }))
    // n.getData1();
  },
  // 修改分享连接地址等
  onShareAppMessage(res) {
    if (res.from === 'button') {// 来自页面内分享按钮

    }
    return {
      title: this.shareObj.name,
      imageUrl: this.shareObj.icon,
      //   path: '/yb_wm/index/getredoder?fatheruserid=' + uni.getStorageSync("userId")
      path: '/yb_wm/index/getredoder?fatheruserid=' + uni.getStorageSync("userId")
    }
  },
  onUnload: function () {
    bus.$off("changeChoose")
  },
  mixins: [utilMixins],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    },

    xjMoney: function () {
      if (this.dlDatl) {
        var e = +this.params.convertNum,
          t = +this.dlDatl.score,
          n = +this.dlDatl.money,
          r = +(1 == this.params.deliveryMode && 1 == this.dlDatl.type && this.dlDatl.deliveryMoney || 0),
          o = 0,
          a = 0;
        return o = +(e * n + r).toFixed(2), a = e * t, {
          total: o,
          totalScore: a
        }
      }
    }
  },
  methods: {
    ...mapActions(["getSjxx", "supdCar", "getMycar"]),
    getData1: function () {
      var e = this;
      this.$api.good_get__good__detail({
        goodsId: e.id,
        storeId: e.querystoreId
      }).then(res => {
        if (!res.id) message("此商家暂无此商品", 3), swnb(1e3)
        res.num = 1;
        e.co = res;

        e.canUseShopGoods || e.getMycar({
          storeId: res.storeId
        });
        this.$api.config_get__code({
          page: "yb_wm/shop/out/goods-dl",
          ident: "goodsDl",
          scene: e.id + "," + e.co.storeId
        }).then(res1 => {
          // e.shareCo = {
          // 	isget: !0,
          // 	bgimg: u[0][1].path,
          // 	code: u[1][1].path,
          // 	logo: u[2][1].path,
          // 	co: e.co
          // }
          e.shareCo.isget = 1;
          e.shareCo.co = e.co;
          uni.getImageInfo({
            src: e.co.icon
          }).then(r1 => {
            e.shareCo.bgimg = r1[1]?.path
          })
          uni.getImageInfo({
            src: res.data || ''
          }).then(r2 => {
            e.shareCo.code = r2[1]?.path;
          })
          uni.getImageInfo({
            src: e.co.storeIcon
          }).then(r3 => {
            e.shareCo.logo = r3[1]?.path;
          })
        })
      })
    },
    ljyq: function () {
      this.shareshow = !0
    },
    back() {
      uni.switchTab({
        url: '/pages/tabbar/my/index'
      })
    },
    getConfig: function () {
      var e = this;
      this.$api.config_config({
        ident: "integral"
      }).then(res => {
        e.config = res;
      })
    },

    getData: function () {
      var e = this;
      var o;
      this.$api['integral-shop_goods__info']({
        id: e.id
      }).then(res => {
        e.shareObj = res;
        o = res, e.swiper.swiper[0].icon = o.icon, e.dlDatl = o, e.getLoginInfo();
        e.content = formatRichText(res.notice)
        //支付宝富文本需要解析
        //#ifdef MP-ALIPAY
        let newArr = []
        let arr = parseHtml(e.content)
        arr.forEach((item, index) => {
          newArr.push(item)
        })
        e.content = newArr
        //#endif
        e.getziList(),
          // e.maxNum = o.stock,
          e.params.goodsId = o.id,
          o.deliveryMode.indexOf(1) > -1 && e.ModeArr.push({
            icon: "iconddys",
            name: "快递配送",
            value: "1"
          }),
          o.deliveryMode.indexOf(2) > -1 && e.ModeArr.push({
            icon: "iconshangjia",
            name: "到店自取",
            value: "2"
          }),
          1 == e.ModeArr.length && o.deliveryMode.indexOf(2) > -1 ? e.params.deliveryMode = 2 : e.params.deliveryMode = 1
      })
    },
    getziList: function () {
      var e = this;
      if ("1" == e.dlDatl.type) {
        this.$api.member_my__address().then(res => {
          res.length > 0 && (e.wmAddress = res[0]),
            this.$api['integral-shop_self__list']().then(res => {
              e.zitiList = res, e.ziAddress = res[0];
            })
        })
      }
    },
    refreshAddress: function (e) {
      this.wmAddress = e
    },
    ztshow: function (e) {
      this.showGg = !0
    },
    chooseAdd: function (e) {
      this.ziAddress = e;
    },
    clickMode: function (t) {
      showLoading("设置中..."),
        this.params.deliveryMode = t.value, setTimeout((function () {
          uni.hideLoading()
        }), 500);
    },
    bindChange: function (e) {
      this.params.convertNum = e;
    },
    // 购买弹出层
    ljdh() {
      var e = this;
      this.$nextTick(() => {
        e.showTime = !0;
      })
      // 请求接口门票是否可以多选  lqgs	  通过接口 修改 
      this.$api.shop_get__coupon({

      }).then(res => {
        this.maxNum = res.sum
      })
    },
    qrdh: function () {
      var e = this;
      if (e.maxNum == 0) {
        return message("您今天已经购买过了，明天再来试试", 3, 3000);
      }
      // if ("2" == e.dlDatl.type) {
      // 	e.params.selfId = "", e.params.userAddId = "";
      // 	if ("1" == e.params.deliveryMode && !e.wmAddress) {
      // 		return message("请选择收货地址", 3);
      // 	} else if (!e.ziAddress) {
      // 		e.params.userAddId = "", e.params.selfId = e.ziAddress.id;
      // 		return message("请选择地址后下单", 3);
      // 	}
      // }
      e.loading = true;
      e.$api['integral-shop_save__integral__order'](e.params).then(res => {
        stfn((function () {
          e.xjMoney.total > 0 ? e.go({
            t: 2,
            url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
              orderId: res.data,
              orderType: 3,
              mid: e.qrcodeId ? e.qrcodeId : '',
              goodsId: e.id,
              info: {
                money: e.xjMoney.total,
                type: "下单支付",
                cancel: 1,
                go: {
                  t: 2,
                  url: "/yb_wm/my/integral/integral-record"
                }
              }
            }))
          }) : e.go({
            t: 2,
            url: "/yb_wm/my/integral/integral-record"
          })
          e.loading = false;
        }));
      }).catch(res => {
        e.loading = false;
        if (res.code == 2) {
          return uni.showToast({ title: res.msg, icon: 'none', duration: 3000 });
        }
      })
    }
  }
}
</script>
<style scoped>
.f-c {
  padding: 0 14px;
  box-sizing: border-box;
  border-radius: 5px;
}
.richText {
  width: 100%;
}
.bor-b {
  border-bottom: 1px solid #eff3f6;
}

.bor-t {
  border-top: 1px solid #eff3f6;
}

.dbbtnc {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 30rpx;
}

.dbbtnc .dbbtn {
  height: 96rpx;
  border-radius: 90rpx;
  overflow: hidden;
  display: flex;
  box-shadow: 0rpx 8rpx 18rpx 5rpx hsla(0, 0%, 86.7%, 0.9);
}

.dbbtnc .dbbtn .rt {
  color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-size: 34rpx;
  padding: 0;
}

.imgw {
  width: 130rpx;
  height: 130rpx;
}

.pstypec {
  width: 180rpx;
  height: 58rpx;
  border: 1rpx solid #ddd;
  border-radius: 28px;
}

.qrdh {
  border-radius: 48rpx;
}
</style>