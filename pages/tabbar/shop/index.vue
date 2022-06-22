<template>
  <view class="bf ">
    <navBar :title="'商城'" :leftView="leftView" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view @tap="integralRecord" style="width: 92%;height: 100rpx;margin:0 auto;padding-top:20rpx; display:flex;align-items: center;justify-content: space-between;">
      <text>购买记录</text>
      <uni-icons type="right"></uni-icons>
    </view>
    <view v-if="false" class="f-row pb20 c0 " style="border-bottom:24rpx solid #F6F6F6;">
      <view v-if="false" class="f-1 ">
        <view class="p13 ">
          <view class="f26 ">可用积分</view>
          <view class="f60 wei " style="padding-left:0rpx;">{{user.integral}}</view>
        </view>
        <view class="p30 f30 f-row l-h1 " style="margin-top:100rpx;">
          <!-- <view @tap="myIntegral" class="f-1 t-c b-re " style="border-color:#333;">{{jfName+'明细'}}</view> -->
          <view @tap="integralRecord" class="f-1 t-c ">购买记录</view>
        </view>
      </view>
      <view class="f-1 f-c ">
        <view class="topimg ">
          <mg-img class="" :src="onImgurl+'/jfsct.png'" vueId="16eaf28c-1"></mg-img>
        </view>
      </view>
    </view>
    <mg-swiper class="" :co="swiper" :color="tColor" u="rpx" vueId="16eaf28c-2"></mg-swiper>
    <notice-group class="" :co="ggConfig" :color="tColor" :list="ggList" ptype="2" vueId="16eaf28c-3" v-if="ggList.length"></notice-group>
    <block v-if="hotList.length">
      <view class="p230 ">
        <view class="f32 wei ">热门推荐</view>
      </view>
      <view class="bf f-row o-x-s p23 ">
        <view @tap="go({t:1,url:'/yb_wm/my/integral/details?id='+v.id + '&qrcodeId='+ qrcodeId})" class="bf f-g-0 goodsc mr30 bs15 b-s-1 " v-for="(v, i) in hotList" :key="i">
          <view class="goodsimg ">
            <mg-img class="" :src="v.icon" :vueId="'16eaf28c-4-'+i"></mg-img>
          </view>
          <view class="jfgb ">
            <view class="f-bt ">
              <text class="bf2 cf f24 mr10 boxs f-g-0 " v-if="v.type=='2'">红</text>
              <text class="t-o-e f-g-1 ">{{v.name}}</text>
            </view>
            <view class="cfa " :style="'color:'+tColor+';'">
              <view class="t-o-e f30 ">
                <!-- <text class="" v-if="v.score>0">{{v.score}}</text> -->
                <!-- 	<text class="f22 nowei c9 " v-if="v.score>0">{{jfName}}</text>
								<text class="nowei c9 " v-if="v.score>0&&v.money>0">+</text> -->
                <text class="" v-if="v.money>0">{{v.money}}<text class="f22 c9 ">{{dw}}</text>
                </text>
              </view>
              <view class="t-o-e t-d-l c9 f22 wei4 ">{{v.price}}</view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <view class="p03 ">
      <nav-tab @changeTab="changeTab" :color="tColor" :tabs="tabs" :value="aIdx" vueId="16eaf28c-5"></nav-tab>
    </view>
    <goods-list class="" :qrcodeId="qrcodeId" :color="tColor" :list="dataList" vueId="16eaf28c-6"></goods-list>
    <!-- <jzz bgcolor="transparent" class="" imgn="zwjf" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="16eaf28c-7">
    </jzz> -->
    <load class="" vueId="16eaf28c-8" v-if="showLoading"></load>
  </view>
</template>

<script>
import {
  sljz
} from "@/common/util";
import navTab from "@/components/common/functionCmp/nav-tab.vue";
import noticeGroup from "@/components/common/functionCmp/notice-group.vue";
import MgSwiper from "@/components/common/functionCmp/swiper.vue";
import jzz from "@/components/common/jzz.vue";
import load from "@/components/common/load.vue";
import entryButtonGroup from "@/components/drag/btn.vue";
import goodsList from "./components/goods-list";
import {
  mapActions,
} from 'vuex'
import { invitationInsert } from "@/api/my.js";
import { getCode } from "@/utils/getCode.js";
export default {
  name: "jfsc",
  components: {
    MgSwiper,
    entryButtonGroup,
    goodsList,
    jzz,
    noticeGroup,
    load,
    navTab,
  },
  data: function () {
    return {
      leftView: false,
      swiper: {
        class: "p230",
        padding: 0,
        swiper: [],
        duration: "",
        mode: "",
        height: "248",
        radius: "0",
        auto: !0,
        interval: 5
      },
      ebg: {
        active: 1,
        btnList: [],
        circle: "10",
        circleBtn: "50",
        colorBg: "#FFFFFF",
        colorWord: "#2c2c2c",
        line: "2",
        marginBottom: "0",
        marginLR: "10",
        marginTop: "0",
        num: "5"
      },
      hotList: [],
      params: {
        typeId: "",
        page: 1,
        size: 10,
        sort: ""
      },
      ggConfig: {
        txtOrImg: 2,
        notice: {
          title: "",
          fontSize: "32rpx"
        }
      },
      ggList: [],
      showLoading: !1,
      aIdx: 0,
      tabs: [],
      qrcodeId: '',//通过扫描二维码进来的id
    }
  },
  onLoad: function (options) {
    var e = this;
    if (options.q) {
      decodeURIComponent(options.q).split('?')[1].split('=')[1] ? e.qrcodeId = decodeURIComponent(options.q).split('?')[1].split('=')[1] : '';
      e.getLoginInfo({ flag: true, inviteId: e.qrcodeId })
    } else {
      //存储扫描二维码进的id
      e.getLoginInfo({ flag: true, inviteId: options.userId, type: options.type }).then(res => {
        uni.setStorageSync('userId', res.userId)
        getApp().globalData.session_key = res.session_key;
        if (options.userId) {
          invitationInsert({ userId: options.userId })
        }
      })
    }

    e.getSystem();
    e.getCategory();
    e.newGetList();
    e.getHotList();
    //存储扫描二维码进的id
    // if (uni.getStorageSync('userId')) {
    //   if (options.userId) {
    //     invitationInsert({ userId: options.userId })
    //   }
    // } else {
    //   getCode().then(code => {
    //     e.$api.login_login({
    //       code: code,
    //     }).then(res => {
    //       uni.setStorageSync('userId', res.userId)
    //       getApp().globalData.session_key = res.session_key;
    //       if (res.userId) {
    //         if (options.userId) {
    //           invitationInsert({ userId: options.userId })
    //         }
    //       }
    //     })

    //   })
    // }
  },
  mixins: [sljz],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    ...mapActions(["getSwitchConfig"]),
    myIntegral: function () {
      this.go({
        t: 2,
        url: "/yb_wm/my/integral/my-integral"
      })
    },
    integralRecord: function () {
      this.go({
        t: 1,
        url: "/yb_wm/my/integral/integral-record"
      })
    },
    tabitem: function (t) {
      this.isget = this.mygd = !1, this.params.typeId = t.id || "", this.params.page = 1, this.dataList = [],
        this.newGetList()
    },
    changeTab: function (t) {
      this.isget = this.mygd = !1, this.params.typeId = this.tabs[t].id, this.params.page = 1, this
        .dataList = [], this.newGetList()
    },
    newGetList: function () {
      var t = this;
      this.$api['integral-shop_goods__list']().then(res => {
        t.dataList = t.dataList.concat(res), t.isget = !0, t.mygd = t.params
          .size > res.length, t.params.page++;
      })
    },
    getHotList: function () {
      var t = this;
      this.$api['integral-shop_goods__list']({
        typeId: "",
        page: 1,
        size: 10,
        sort: "1"
      }).then(res => {
        t.hotList = t.hotList.concat(res)
      })
    },
    getCategory: function () {
      var t = this;
      this.$api['integral-shop_goods__type__list']().then(res => {
        t.swiper.swiper = res.ad.map((function (t) {
          return {
            icon: t.icon
          }
        })),
          t.tabs = [{
            name: "全部",
            id: ""
          }].concat(res.typeList),
          t.ggList = res.payList.map((function (t) {
            return {
              title: "".concat(t.userName, "成功兑换了").concat(t.goodsName)
            }
          }));
      })
    }
  }
}
</script>
<style scoped lang="less">
.topimg {
  width: 350rpx;
  height: 350rpx;
}

.jfgb {
  padding: 12rpx 20rpx;
}

.bf2 {
  background: #ff5012;
}

.imgc {
  width: 320rpx;
  height: 320rpx;
  margin-top: 30rpx;
}

.goodsc {
  width: 325rpx;
}

.goodsimg {
  width: 325rpx;
  height: 325rpx;
}

.boxs {
  border-radius: 8rpx;
  padding: 0 7rpx;
}
</style>