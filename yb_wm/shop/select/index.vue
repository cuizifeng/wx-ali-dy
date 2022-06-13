<template>
  <view>
    <navBar :title="'选择门店'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="f-col h100 ">
      <view class="bt-e ">
        <nav-tab cname @changeTab="changeTab" :color="tColor" height="76" ifsize="32" ncolor="#666" :tabs="tabs" v-model="aIdx" vueId="5c5afee2-1"></nav-tab>
      </view>
      <view :style="{'height':height + 'px'}">
        <swiper @change="swiperTab" class="h100 " :current="aIdx">
          <swiper-item @touchmoveo="stopTouchMove">
            <view class="h100 f-col ">
              <view class="bf ">
                <!-- <view class="p23 f-y-c f30 " v-if="system.storeSet.showType==1">
                  <view @tap="xzcs" class="f-y-c f-1 ">
                    <view class="mr10 ">{{dwcsInfo.cityName||'定位中'}}</view>
                    <view style="min-width:100rpx;">{{dwcsInfo.zoneName||'...'}}</view>
                    <text class="iconfont iconright c3 ml5 "></text>
                  </view>
                  <view @tap="djss" class="bf6 stssk f-c p03 f28 c9 ml20 ">
                    <text class="iconfont iconsearch "></text>
                    <text class="ml5 ">搜索</text>
                  </view>
                </view> -->
                <map @callouttap="markertap" class="map " :hidden="!dtshow" :latitude="latitude" :longitude="longitude" :markers="covers" scale="12"></map>
                <view @tap="dtshow = !dtshow" class="f-c p23 f26 bt-e l-h1 ">
                  <view>{{(dtshow?'收起':'展开')+'地图'}}</view>
                  <text :class="['iconfont icontop c3 ml5 ',!dtshow?'xzdw':'']"></text>
                </view>
              </view>

              <scroll-view @scrolltolower="lower" class="f-1 o-a p330 " scroll-y="true">
                <view @tap="selectStore(v,i)" class="dpic bs15 b-f5 bf mb30 f-row p-r " :style="'border-color:'+(i==xzdpidx?tColor:'#fff')+';'" v-for="(v, i) in storeList" :key="i">
                  <view class="p03 f-1 dpiclt b-re ">
                    <view class="mb10 ">{{v.name}}</view>
                    <view class="f-raw " v-if="v.distributionSupport">
                      <view class="mb10 f20 p-3-10 bs5 mr10 " style="background:#EAF3E8;color:#5AA540;" v-if="v.g0">可外送</view>
                      <view class="mb10 f20 p-3-10 bs5 " style="background:#EAF3E8;color:#5AA540;" v-if="v.g1">可自取</view>
                    </view>
                    <view class="f-row f24 c6 mt5 ">
                      <text class="iconfont iconlocation f26 mr10 c3 mt10 "></text>
                      <text>{{v.address}}</text>
                    </view>
                    <view class="f-row f24 c6 mt5 ">
                      <text class="iconfont iconsj f26 mr10 c3 mt10 "></text>
                      <text>{{v.m0}}</text>
                    </view>
                    <view class="f-raw mt15 ">
                      <view class="text-btn f20 p-3-10 bs5 mr10 c9 " :style="'border-color:'+(v.storeOpen==1?tColor:'')+';'+'color:'+(v.storeOpen==1?tColor:'')+';'">
                        {{v.storeOpen==1?'营业中':'休息中'}}</view>
                      <view class="text-btn f20 p-3-10 bs5 " :style="'border-color:'+tColor+';'+'color:'+tColor+';'" v-if="v.typeName">{{v.typeName}}</view>
                    </view>
                  </view>
                  <view class="dpicrt f-c-c p-3-10 f26 ">
                    <view>去下单</view>
                    <view class="f20 c6 mt10 ">{{'距离'+v.m1+'km'}}</view>
                  </view>
                  <view class="yddsj p-a " :style="'border-bottom:'+(i==xzdpidx?'56rpx solid '+tColor:'')+';'"></view>
                  <text class="gou p-a iconfont icongou cf f20 " v-if="v.value==params.isOut"></text>
                </view>
                <jzz bgcolor="transparent" :mygd="dataList[aIdx].mygd" :nodata="dataList[aIdx].list.length==0&&dataList[aIdx].isget" vueId="5c5afee2-2"></jzz>
              </scroll-view>
            </view>
          </swiper-item>
          <!-- <swiper-item @touchmove="stopTouchMove">
            <scroll-view @scrolltolower="lower" class="h100 p330 " scroll-y="true">
              <view @tap="selectStore(v,i)" class="dpic bs15 b-f5 bf mb30 f-row p-r " v-for="(v, i) in storeList" :key="i">
                <view class="p03 f-1 dpiclt b-re ">
                  <view class="mb10 f-y-c ">
                    <text class="iconfont mt0 c3 iconxx mr15 f26 " :style="'color:'+tColor+';'"></text>{{v.name}}
                  </view>
                  <view class="f-raw " v-if="v.distributionSupport">
                    <view class="mb10 f20 p-3-10 bs5 mr10 " style="background:#EAF3E8;color:#5AA540;" v-if="v.g2">可外送</view>
                    <view class="mb10 f20 p-3-10 bs5 " style="background:#EAF3E8;color:#5AA540;" v-if="v.g3">可自取</view>
                  </view>
                  <view class="f-row f24 c6 mt5 ">
                    <text class="iconfont iconlocation f26 mr10 c3 mt10 "></text>
                    <text>{{v.address}}</text>
                  </view>
                  <view class="f-row f24 c6 mt5 ">
                    <text class="iconfont iconsj f26 mr10 c3 mt10 "></text>
                    <text>{{v.m2}}</text>
                  </view>
                  <view class="f-raw mt15 ">
                    <view class="text-btn f20 p-3-10 bs5 mr10 c9 " :style="'border-color:'+(v.storeOpen==1?tColor:'')+';'+'color:'+(v.storeOpen==1?tColor:'')+';'">
                      {{v.storeOpen==1?'营业中':'休息中'}}</view>
                    <view class="text-btn f20 p-3-10 bs5 " :style="'border-color:'+tColor+';'+'color:'+tColor+';'" v-if="v.typeName">{{v.typeName}}</view>
                  </view>
                </view>
                <view class="dpicrt f-c-c p-3-10 f26 ">
                  <view>去下单</view>
                </view>
              </view>
              <jzz bgcolor="transparent" imgn="zwyyd" :mygd="dataList[aIdx].mygd" :nodata="dataList[aIdx].list.length==0&&dataList[aIdx].isget" vueId="5c5afee2-3"></jzz>
            </scroll-view>
          </swiper-item> -->
        </swiper>
      </view>
      <view class="wh p-a t0 bf f-col " :style="{top: contentTop}" :hidden="!showSearch">
        <view class="searchc p3 f-y-c ">
          <view class="f-1 scl bf6 f-y-c p03 ">
            <text class="iconfont iconsearch c6 "></text>
            <input @blur="$forceUpdate" @confirm="confirm" class="f-1 p02 " confirmType="search" focus="false" placeholder="请输入关键字搜索" placeholderClass="cb2" v-model.trim="ssobj.params.keyword" />
            <text @tap="cleanKey" class="iconfont iconyx " style="color:#ADACAB;" v-if="ssobj.params.keyword"></text>
          </view>
          <view @tap="qxss" class="c8 ml30 ">取消</view>
        </view>
        <scroll-view class="f-1 o-a p03 " scroll-y="true">
          <view @tap="xzssdp(v)" class="p30 b-be " v-for="(v, i) in ssobj.list" :key="i">
            <view class="f30 t-o-e ">{{v.name+'·'+v.cityName}}</view>
            <view class="f24 c9 t-o-e ">{{v.address}}</view>
          </view>
          <jzz bgcolor="transparent" :data-custom-hidden="!issearch" imgn="zwmd" :mygd="ssobj.isget" :nodata="ssobj.list.length==0&&ssobj.isget" otext="暂时搜索不到相关门店" vueId="5c5afee2-4"></jzz>
        </scroll-view>
      </view>
      <!-- <tab-bar vueId="5c5afee2-5"></tab-bar> -->
    </view>
  </view>
</template>

<script>
import navTab from 'components/common/functionCmp/nav-tab.vue';
import jzz from 'components/common/jzz.vue';
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  bus,
  getDw,
  makeTel,
  message,
  modal,
  setNT,
  stfn,
  throttle
} from 'common/util';
export default {
  name: "select-index",
  components: {
    navTab,
    jzz,
  },
  data: function () {
    return {
      contentTop: uni.getStorageSync('menuInfo').contentTop,
      height: 0,
      aIdx: 0,
      tabs: [{
        name: "选择门店"
      }, {
        name: "常用/收藏"
      }],
      latitude: 39.909,
      longitude: 116.39742,
      covers: [],
      dwcsInfo: {},
      dtshow: !0,
      dataList: [{
        list: [],
        isget: !1,
        mygd: !1,
        api: "shop_store__list",
        params: {
          page: 1,
          size: 10,
          lat: "",
          lng: "",
          cityId: "",
          zoneId: "",
          storeId: ""
        }
      }, {
        list: [],
        isget: !1,
        mygd: !1,
        api: "shop_collection__store__list",
        params: {
          page: 1,
          size: 10
        }
      }],
      xzdpidx: 0,
      ssobj: {
        list: [],
        isget: !1,
        params: {
          keyword: ""
        }
      },
      issearch: !1,
      showSearch: !1
    }
  },
  onLoad: function (e) {
    uni.getSystemInfo({
      success: res => {
        this.height = (res.windowHeight - uni.upx2px(82)) - 90;
      }
    });
    var n = this;
    n.getSystem();
    n.query = e,
      n.swiperTab({
        detail: {
          current: +e.idx || 0
        }
      }),
      bus.$on("changeCity", (function (t) {
        t.hasOwnProperty("dwcsInfo") && (n.dwcsInfo = t.dwcsInfo, n.dataList[0] = {
          list: [],
          isget: !1,
          mygd: !1,
          api: "shop_store__list",
          params: {
            page: 1,
            size: 10,
            lat: n.dataList[0].params.lat,
            lng: n.dataList[0].params.lng,
            cityId: n.dwcsInfo.cityId,
            zoneId: n.dwcsInfo.zoneId
          }
        },
          n.xzdpidx = 0,
          n.getList())
      }));
  },
  onUnload: function () {
    bus.$off("changeCity")
  },
  computed: {
    storeList() {
      var list = this.dataList[this.aIdx].list;
      list = list.map(i => {
        return {
          ...i,
          g0: i.distributionSupport ? i.distributionSupport.find(function (t) {
            return 1 == t;
          }) : null,
          g1: i.distributionSupport ? i.distributionSupport.find(function (t) {
            return 2 == t;
          }) : null,
          m0: this.yysj(i),
          m1: Number((i.distance / 1e3).toFixed(1))
        }
      })
      return list;
    }
  },
  methods: {
    ...mapActions(["getConfig"]),
    getDwcs: function (t) {
      var e = this;
      var i, r;
      return new Promise((resolve, reject) => {
        if (1 != e.system.storeSet.showType) {
          return e.latitude = e.dataList[0].params.lat = t.latitude,
            e.longitude = e.dataList[0].params.lng = t.longitude,
            e.dataList[0].params.storeId = e.query.storeId || "";
        }
        this.$api['shop_coordinate__to__add']({
          lat: t.latitude,
          lng: t.longitude,
          storeId: e.query.storeId || ""
        }).then(res => {
          console.log('res266: ', res, t);
          r = res.data,
            r.zoneName = "全部地区",
            r.zoneId = "",
            e.dwcsInfo = r,
            e.latitude = e.dataList[0].params.lat = t.latitude,
            e.longitude = e.dataList[0].params.lng = t.longitude,
            e.dataList[0].params.cityId = e.dwcsInfo.cityId,
            e.dataList[0].params.zoneId = "",
            e.dataList[0].params.storeId = e.query.storeId || "";
          resolve(r, t);
        })
      })
    },
    stopTouchMove: function () {
      return !1
    },
    changeTab: function (t) { },
    swiperTab: function (t) {
      var e = this;
      var i;
      e.aIdx = t.detail.current;
      if (t.detail.hasOwnProperty("source")) {
        // 11
        if (e.dataList[t.detail.current].isget) {
          return;
        }
        if (0 != e.aIdx || e.dwcsInfo.hasOwnProperty("cityId")) {
          return e.getList();
        }
        // 10
      }
      getDw().then(res => {
        e.getDwcs(res).then(res1 => {
          e.getList();
        });
      })
    },
    lower: throttle((function (t) {
      !this.dataList[this.aIdx].mygd && this.dataList[this.aIdx].isget && (this.dataList[this.aIdx].isget = !
        1, this.getList())
    }), 300),
    getList: function () {
      var t = this;
      var n, i, r;
      n = t.dataList[t.aIdx];
      this.$api[n.api](t.dataList[t.aIdx].params).then(res => {
        r = res,
          n.list = n.list.concat(r),
          n.isget = !0,
          n.mygd = n.params.size > r.length,
          n.params.page++,
          t.$set(t.dataList, t.aIdx, n),
          0 == t.aIdx && t.setCovers();
      });
    },
    setCovers: function () {
      var t = this;
      this.dataList[0].list[0] && stfn((function () {
        t.latitude = +t.dataList[0].list[0].lat, t.longitude = +t.dataList[0].list[0].lng
      }), 400), this.covers = this.dataList[0].list.map((function (t) {
        return {
          id: +t.id,
          latitude: t.lat,
          longitude: t.lng,
          iconPath: t.icon,
          width: "25",
          height: "25",
          callout: {
            content: t.name + ">",
            color: "#333",
            fontSize: 14,
            borderRadius: 3,
            bgColor: "#fff",
            padding: 7,
            display: "ALWAYS",
            textAlign: "center"
          }
        }
      }))
    },
    selectStore: function (e, n) {
      var i = this;
      if (2 != i.system.storeSet.storeModel) {
        return message("多门店功能已关闭", 3);
      }
      i.xzdpidx = n,
        i.latitude = e.lat,
        i.longitude = e.lng;
      if (i.query.storeId == e.id) {
        return uni.showModal({
          title: "提示",
          content: "你选中的是当前所在店铺，是否返回上级页面继续点单",
          success: function (t) {
            t.confirm && i.go({
              t: 4
            })
          }
        })
      }

      var s = "";
      s = 1 != e.storeOpen ? "[".concat(e.name, "] 休息中 确认切换到该门店吗？") :
        0 == n ? "确认切换到[".concat(e.name, "]门店吗？") : "您当前所在位置距离该门店较远 确认切换到 [".concat(e.name, "] 门店吗？"),
        modal(s).then(res => {
          ("goods" == i.query.page || "index" == i.query.page) && (i.qhdp(e), i.go({
            t: 4
          }));
        });


    },
    qhdp: function (t) {
      this.getConfig({
        key: "storeInfo",
        data: {
          id: t.id,
          name: t.name,
          distance: t.distance
        }
      })
    },
    markertap: function (t) {
      var e = this.dataList[0].list.find((function (e, n) {
        return e.id == t.detail.markerId
      })),
        n = this.dataList[0].list.findIndex((function (e, n) {
          return e.id == t.detail.markerId
        }));
      this.selectStore(e, n)
    },
    xzcs: function () {
      this.dwcsInfo.cityId && this.go({
        url: "select?info=" + encodeURIComponent(JSON.stringify(this.dwcsInfo))
      })
    },
    yysj: function (t) {
      var e = "",
        n = t;
      return 1 == n.timeType ? e = "24小时营业" : (e = "".concat(n.timeArr[0].startTime, "-").concat(n.timeArr[0]
        .ciri ? "次日" : "").concat(n.timeArr[0].endTime), n.timeArr[1] && (e += " " + "".concat(n.timeArr[1]
          .startTime, "-").concat(n.timeArr[1].ciri ? "次日" : "").concat(n.timeArr[1].endTime)), n.timeArr[2] &&
        (e += " " + "".concat(n.timeArr[2].startTime, "-").concat(n.timeArr[2].ciri ? "次日" : "").concat(n
          .timeArr[2].endTime))), e
    },
    djss: function () {
      this.showSearch = !0
    },
    qxss: function () {
      this.showSearch = this.issearch = !1, this.ssobj = {
        list: [],
        isget: !1,
        params: {
          keyword: ""
        }
      }
    },
    cleanKey: function () {
      this.ssobj.params.keyword = "", this.issearch = !1, this.ssobj.list = [], this.ssobj.isget = !1
    },
    confirm: function (t) {
      if (!this.ssobj.params.keyword) return message("请输入搜索内容", 3);
      this.issearch = !0, this.ssobj.list = [], this.ssobj.isget = !1, this.getssList()
    },
    getssList: function () {
      var t = this;
      var n, i;
      this.$api.shop_search__store(t.ssobj.params).then(res => {
        i = res.data, t.ssobj.list = t.ssobj.list.concat(i), t.ssobj.isget = !0;
      })
    },
    // 选择店
    xzssdp: function (t) {
      var e = this;
      var i, r;
      e.qxss();
      this.$api['shop_coordinate__to__add']({
        storeId: t.id
      }).then(res => {
        r = res.data,
          e.dwcsInfo = r,
          e.dataList[0] = {
            list: [],
            isget: !1,
            mygd: !1,
            api: "shop_store__list",
            params: {
              page: 1,
              size: 10,
              lat: e.dataList[0].params.lat,
              lng: e.dataList[0].params.lng,
              cityId: e.dwcsInfo.cityId,
              zoneId: e.dwcsInfo.zoneId
            }
          },
          e.xzdpidx = 0,
          e.getList();
      })
    },
    bddh: function (t) {
      makeTel(t.storeTel)
    },
    ckwz: function (t) {
      ckWz({
        lat: t.lat,
        lng: t.lng,
        name: t.name,
        address: t.address
      })
    }
  }
}
</script>
<style scoped>
.stssk {
  height: 68rpx;
  border-radius: 68rpx;
}

.bt-e {
  border-bottom: 1px solid #eaeaea;
}

.map {
  width: 750rpx;
  height: 490rpx;
}

.dpic {
  padding: 40rpx 0;
}

.dpic .dpicrt {
  width: 24%;
}

.yddsj {
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 56rpx solid #fff;
  border-left: 56rpx solid transparent;
}

.gou {
  right: 8rpx;
  bottom: 6rpx;
}

.scl {
  height: 70rpx;
  border-radius: 70rpx;
}
</style>