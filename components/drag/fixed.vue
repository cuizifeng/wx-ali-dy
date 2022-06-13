<template>
  <view class="fixed " :style="'margin-top:'+co.marginTop+'px'+';'+'margin-bottom:'+co.marginBottom+'px'+';'+'margin-left:'+co.marginLR+'px'+';'+'margin-right:'+co.marginLR+'px'+';'">
    <view class="wrap ">
      <swiper autoplay="true" circular="true" class="swiper " indicatorDots="false" v-if="co.orPic==2">
        <swiper-item @tap="goTo(v)" class="" v-for="(v, i) in co.imgUrl" :key="i">
          <image class="wh " mode="aspectFill" :src="v.img"></image>
        </swiper-item>
      </swiper>
      <view class="xfcc " v-if="co.orPic==2&&co.isFloat==2">
        <view class="xfc posi-r f-y-c bf bs15 ">
          <view @tap="goTo(co.floatUrl1)" class="f-1 f-c-c hlr ">
            <view class="img ">
              <mg-img class="" :src="co.floatUrl1.img" vueId="5bb5d49c-1"></mg-img>
            </view>
            <view class="f24 c6 mt20 l-n " v-if="co.floatUrl1.text">{{co.floatUrl1.text}}</view>
          </view>
          <view @tap="goTo(co.floatUrl2)" class="f-1 f-c-c ">
            <view class="img ">
              <mg-img class="" :src="co.floatUrl2.img" vueId="5bb5d49c-2"></mg-img>
            </view>
            <view class="f24 c6 mt20 l-n " v-if="co.floatUrl2.text">{{co.floatUrl2.text}}</view>
          </view>
        </view>
      </view>
      <view :class="['',co.orPic==2?'Locate':'']" :style="'padding-top:'+dwpt+';'+'top:'+dwtop+';'+'background:'+'rgba('+cTR(co.colorBg) +','+co.percent/100+')'+';'+'color:'+co.colorWord+';'" v-if="storeInfo.name">
        <view class="Locate_one f-x-bt p2 " :style="'border-radius:'+co.circle+'px'+';'" v-if="co.module==1">
          <view class="left f-1 ">
            <view class="wei f34 f-y-c ">
              <open-data class="" type="userNickName"></open-data>
              <text class="f-g-0 ">{{','+whtime+'好'}}</text>
            </view>
            <view @tap="goSelect" class="f-y-c f24 ">
              <view class="iconfont iconlocation f28 " :style="'color:'+co.colorWord+';'"></view>
              <view class="dpmc mr10 t-o-e ">{{storeInfo.name}}</view>
              <view class="" style="opacity:0.8;">{{'距您'+storeInfo.distance}}</view>
              <block v-if="system.storeSet.storeModel==2">
                <view class="f-g-0 ml10 ">更多门店</view>
                <view class="iconfont icondown ml5 f28 " :style="'color:'+co.colorWord+';'"></view>
              </block>
            </view>
          </view>
          <view class="f-c ">
            <view @tap="goTo(co.upLoad1)" class="ritem ">
              <view class="img ">
                <mg-img class="" :src="co.upLoad1.img" vueId="5bb5d49c-3"></mg-img>
              </view>
              <view class="" v-if="co.upLoad2.text">{{co.upLoad1.text}}</view>
            </view>
            <view @tap="goTo(co.upLoad2)" class="ritem ">
              <view class="img ">
                <mg-img class="" :src="co.upLoad2.img" vueId="5bb5d49c-4"></mg-img>
              </view>
              <view class="" v-if="co.upLoad2.text">{{co.upLoad2.text}}</view>
            </view>
          </view>
        </view>
        <block v-else>
          <view class="Locate_two f-x-bt p2 " :style="'border-radius:'+co.circle+'px'+';'" v-if="co.module==2">
            <view class="left f-1 ">
              <view @tap="goSelect" class="f-y-c ">
                <view class="iconfont iconlocation f28 mr10 " :style="'color:'+co.colorWord+';'"></view>
                <view class="wei f30 t-o-e ">{{storeInfo.name}}</view>
                <text class="iconfont iconright ml5 wei f28 " :style="'color:'+co.colorWord+';'" v-if="system.storeSet.storeModel==2"></text>
              </view>
              <view class="btm f24 t-o-e ">{{'距离您'+storeInfo.distance}}</view>
            </view>
            <view class="f-c ">
              <view @tap="goTo(co.upLoad1)" class="ritem ">
                <view class="img ">
                  <mg-img class="" :src="co.upLoad1.img" vueId="5bb5d49c-5"></mg-img>
                </view>
                <view class="" v-if="co.upLoad2.text">{{co.upLoad1.text}}</view>
              </view>
              <view @tap="goTo(co.upLoad2)" class="ritem ">
                <view class="img ">
                  <mg-img class="" :src="co.upLoad2.img" vueId="5bb5d49c-6"></mg-img>
                </view>
                <view class="" v-if="co.upLoad2.text">{{co.upLoad2.text}}</view>
              </view>
            </view>
          </view>
          <block v-else>
            <view class="Locate_two f-x-bt p2 " :style="'border-radius:'+''+co.circle+'px'+';'" v-if="co.module==3">
              <view class="left f-1 ">
                <view class="f-y-c ">
                  <view class="iconfont iconlocation f28 mr10 wei " :style="'color:'+co.colorWord+';'"></view>
                  <view class="f-1 wei f30 t-o-e ">{{address}}</view>
                </view>
                <view class="f-row ">
                  <view @tap="goSelect" class="btm3 f20 f-y-c bs20 ">
                    <view class="f-y-c o-a ">
                      <text class="">由</text>
                      <text class="t-o-e m01 f-1 ">{{storeInfo.name}}</text>
                      <text class="">送出</text>
                    </view>
                    <view class="iconfont iconright f28 ml5 " :style="'color:'+co.colorWord+';'" v-if="system.storeSet.storeModel==2"></view>
                  </view>
                </view>
              </view>
              <view class="f-c ">
                <view @tap="goTo(co.upLoad1)" class="ritem ">
                  <view class="img ">
                    <mg-img class="" :src="co.upLoad1.img" vueId="5bb5d49c-7"></mg-img>
                  </view>
                  <view class="" v-if="co.upLoad2.text">{{co.upLoad1.text}}</view>
                </view>
                <view @tap="goTo(co.upLoad2)" class="ritem ">
                  <view class="img ">
                    <mg-img class="" :src="co.upLoad2.img" vueId="5bb5d49c-8"></mg-img>
                  </view>
                  <view class="" v-if="co.upLoad2.text">{{co.upLoad2.text}}</view>
                </view>
              </view>
            </view>
          </block>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getSb
} from 'common/util';
import {
  mapState
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
export default {
  name: "fixed",
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    u: {
      type: String,
      default: "px"
    }
  },
  data: function () {
    return {
      whtime: ""
    };
  },
  mixins: [utilMixins],
  computed: {
    ...mapState(["addInfo", "latLng"]),
    storeInfo: () => {
      try {
        return this.$store.state.storeInfo;
      } catch (error) {
        return {};
      }
    },
    layout: (t) => {
      try {
        return this.$store.state.layout;
      } catch (error) {
        return {};
      }
    },
    address: function () {
      return this.addInfo ? this.addInfo.maddress : "定位中...";
    },
    // 头部高度
    ztlh: function () {
      return getSb().customNavh - 16 + "px";
    },
    dwpt: function () {
      return 2 != this.co.orPic && this.layout &&
        this.layout.pageSetting &&
        1 != this.layout.pageSetting[0].styles.modulePage ? this.ztlh : 0;
    },
    dwtop: function () {
      return this.layout && this.layout.pageSetting &&
        1 == this.layout.pageSetting[0].styles.modulePage ? 0 : this.ztlh;
    }
  },
  methods: {
    goTo: function (t) {
      console.log('t: ', t);
      this.goUrl(t.url, t);
    },
    goSelect: function () {
      2 == this.system.storeSet.storeModel && this.go({
        url: "/yb_wm/shop/select/index?page=index&storeId=" + this.storeInfo.id
      });
    },
    getWhtime: function () {
      var t = new Date().getHours(),
        e = "";
      e = t < 6 ? "凌晨" : t < 9 ? "早上" : t < 12 ? "上午" : t < 13 ? "中午" : t < 18 ? "下午" : t < 22 ? "晚上" : "夜里", this
        .whtime = e;
    }
  },
  created: function () {
    1 == this.co.module && this.getWhtime();
  }
}
</script>
<style scoped>
.fixed .wrap {
  position: relative;
}

.fixed .swiper {
  height: 531rpx;
  position: relative;
}

.fixed .xfcc {
  padding-bottom: 20rpx;
}

.fixed .xfc {
  width: 90%;
  padding: 90rpx 0;
  margin: 0 auto;
  margin-top: -50rpx;
}

.fixed .xfc .img {
  width: 160rpx;
  height: 160rpx;
}

.fixed .Locate {
  position: absolute;
  top: 0;
  width: 100%;
}

.fixed .Locate_one .left .dpmc {
  max-width: 200rpx;
}

.fixed .Locate_two .left .dpmc {
  max-width: 200rpx;
}

.fixed .Locate_two .left .btm {
  padding-left: 35rpx;
}

.fixed .Locate_two .left .btm3 {
  background-color: hsla(0, 0%, 100%, 0.4);
  padding: 4rpx 10rpx 4rpx 20rpx;
  margin: 10rpx 0 0 35rpx;
  max-width: 65%;
}

.fixed .ritem {
  text-align: center;
  margin-left: 20rpx;
  width: 80rpx;
  font-size: 24rpx;
}

.fixed .ritem .img {
  width: 40rpx;
  height: 40rpx;
  margin: 0 auto;
}

.hlr::after {
  border-color: #ddd;
}
</style>