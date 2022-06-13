<template>
  <view>
    <navBar :title="'选择地区'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="bf f-col h100 ">
      <view class="sttab f-row o-x-s ">
        <view @tap="changeTab" class="p02 f-g-0 " v-for="(v, i) in tabs" :key="i">
          <view :class="['h100 f-c f30 ',aIdx==i?'wei c0 xzc':'']">{{v.name}}</view>
        </view>
      </view>
      <view class="f-1 " :style="{'height':height + 'px'}">
        <swiper @change="swiperTab" class="h100 " :current="aIdx">
          <swiper-item @touchmove="stopTouchMove" v-for="(v, i) in arr" :key="i">
            <scroll-view class="h100 " scroll-y="true">
              <view @tap="xzitem(i,ci)" class="p23 f-x-bt " v-for="(cv, ci) in arr[i]" :key="ci">
                <view class="">{{cv.name}}</view>
                <view class="iconfont icongou c0 ml20 f24 wei " v-if="ci==xzarr[i]"></view>
              </view>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>

</template>


<script>
import {
  setNT, stfn
} from 'common/util';
export default {
  name: "select-select",
  components: {},
  data: function () {
    return {
      height: 0,
      aIdx: 0,
      tabs: [{
        name: "中国"
      }, {
        name: "城市"
      }, {
        name: ""
      }],
      arr: [
        [{
          name: "中国"
        }],
        [],
        [{
          name: "全部地区",
          id: ""
        }]
      ],
      xzarr: [0, 0, 0]
    }
  },
  onLoad: function (n) {
    uni.getSystemInfo({
      success: res => {
        this.height = (res.windowHeight - uni.upx2px(82));
      }
    });
    var t = this;
    var a = JSON.parse(decodeURIComponent(n.info));
    t.getSystem(), setNT("选择地区"), t.tabs[
      1].name = a.cityName, t.tabs[2].name = a.zoneName || "全部地区";
    this.$api.shop_get__city().then(res => {
      var c = res;
      t.citys = c,
        t.arr[0] = c.map((function (n) {
          return {
            name: n.name
          }
        })),
        t.arr[1] = c[0].children.map((function (n) {
          return {
            name: n.name,
            id: n.id
          }
        })), t.arr[2] = t.arr[2].concat(c[0].children.find((function (n) {
          return n.id == a.cityId
        })).children), t.xzarr[1] = t.arr[1].findIndex((function (n) {
          return n.id == a.cityId
        })), t.xzarr[2] = t.arr[2].findIndex((function (n) {
          return n.id == a.zoneId
        })), setTimeout((function () {
          t.aIdx = 2
        }), 100);
    });
  },
  computed: {},
  methods: {
    stopTouchMove: function () {
      return !1
    },
    changeTab: function (n) {
      this.aIdx = n
    },
    swiperTab: function (n) {
      this.aIdx = n.detail.current
    },
    xzitem: function (t, e) {
      var r = this;
      0 != t && (1 == t && (this.tabs[t].name = this.arr[t][e].name, this.tabs[t + 1].name = "全部地区", this.xzarr[
        t] = e, this.xzarr[t + 1] = -1, this.arr[2] = [{
          name: "全部地区",
          id: ""
        }].concat(this.citys[0].children[e].children), this.aIdx = t + 1), 2 == t && (this.$set(this.xzarr, t,
          e), stfn((function () {
            n.$emit("changeCity", {
              dwcsInfo: {
                cityId: r.arr[1][r.xzarr[1]].id,
                cityName: r.arr[1][r.xzarr[1]].name,
                zoneId: r.arr[2][r.xzarr[2]].id,
                zoneName: r.arr[2][r.xzarr[2]].name
              }
            }), r.go({
              t: 4
            })
          }), 200)))
    }
  }
}
</script>
<style scoped>
.sttab {
  border-bottom: 1px solid #eaeaea;
  height: 90rpx;
}

.sttab .xzc {
  border-bottom: 4rpx solid #000;
}

.c5d {
  color: #555;
}
</style>