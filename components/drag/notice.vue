<template>
  <view class="notice " :style="'margin-top:'+co.marginTop+u+';'+'margin-bottom:'+co.marginBottom+u+';'+'margin-left:'+co.marginLR+u+';'+'margin-right:'+co.marginLR+u+';'">
    <view class="f-y-c p02 " :style="'background:'+co.colorBg+';'+'border-radius:'+co.circle+u+';'">
      <view class="f-g-0 ">
        <view class="ggbt wei mr20 " :style="'color:'+co.color+';'" v-if="co.title">{{co.title}}</view>
        <block v-else>
          <view class="limg mr20 " v-if="co.hand[0].img">
            <mg-img class="" m="aspectFit" :src="co.hand[0].img" vueId="46be255e-1"></mg-img>
          </view>
          <text class="iconfont icongg mt0 f38 mr10 " v-else></text>
        </block>
      </view>
      <view class="f-g-1 ngr b-s1 bs10 " :style="'height:'+(notice?'70rpx':'')+';'">
        <uni-notice-bar :backgroundColor="co.backgroundColor" class="" :color="ptype==1?co.colorWord:co.hand[0].img?tColor:'#8B5C42'" scrollable="true" single="true" :text="notice" vueId="46be255e-2" v-if="type==1&&notice"></uni-notice-bar>
        <swiper autoplay="true" circular="true" class="wh " interval="2000" vertical="true" v-else>
          <swiper-item @tap.stop="goDl(v)" class="f-c-xc " v-for="(v, i) in nlist" :key="i">
            <view class="c6 f24 t-o-e " :style="'color:'+co.colorWord+';'">{{v.title}}</view>
          </swiper-item>
        </swiper>
      </view>
      <text class="iconfont iconright " :style="'color:'+co.colorWord+';'" v-if="arrow&&!notice"></text>
    </view>
  </view>
</template>

<script>
export default {
  name: "searchBox",
  components: {
    uniNoticeBar: function () {
      n.e("components/third/uni-notice-bar").then(function () {
        return resolve(n("5112"));
      }.bind(null, n)).catch(n.oe);
    }
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    shopinfo: {
      type: Object,
      default: function () {
        return {};
      }
    },
    u: {
      type: String,
      default: "px"
    },
    ptype: {
      type: String,
      default: "1"
    },
    type: {
      type: String,
      default: "1"
    },
    list: {
      type: Array,
      default: function () {
        return [];
      }
    },
    color: {
      type: String,
      default: ""
    },
    arrow: {
      type: Boolean,
      default: !0
    }
  },
  data: function () {
    return {
      notice: "",
      nlist: []
    };
  },
  watch: {
    shopinfo: {
      handler: function (t) {
        var e = this;
        this.$api.config_get__article__list({
          type: e.co.source,
          storeId: t.id
        }).then(res => {
          e.nlist = res;
        })
      },
      immediate: !0
    }
  },
  methods: {
    goLink: function (t) {
      this.goUrl(t.url);
    },
    goDl: function (e) {
      console.log('e: ', e);
      uni.setStorageSync("fwb", e.body),
        this.go({
          t: 1,
          url: "/yb_wm/my/other/gywm?t=".concat(e.title, "&p=4")
        });
    }
  },
  created: function () {
    var t = this;
    if (1 != t.co.source) return t.nlist = t.list;
    this.$api.config_get__article__list({
      type: t.co.source
    }).then(res => {
      t.nlist = res;
    })
  }
}
</script>
<style scoped>
.ggbt {
  transform: skew(-12deg, 0deg);
  padding: 1rpx 12rpx;
  font-size: 24rpx;
  border-radius: 7rpx;
  background: linear-gradient(90deg, #fe8f43, #fd4c44);
}

.limg {
  width: 48rpx;
  height: 48rpx;
}

.ngr {
  padding: 10rpx 0rpx;
  height: 80rpx;
}
</style>