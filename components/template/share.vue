<template>
  <mg-popup v-model="show" class="" close="1" :value="show" vueId="1fdb2abe-1" :vueSlots="['default']" :zIndex="5000">
    <view class="p0 ">
      <view class="bf p3 fxc ">
        <view class="f-c ">
          <view class="hx "></view>
          <view class="m02 f32 wei ">分享到</view>
          <view class="hx "></view>
        </view>
        <view class="sharec f-row ">
          <view class="f-1 f-c-c posi-r " v-if="wxs">
            <view class="fximg bsf f-c ">
              <text class="iconfont iconwxfx f60 c6 "></text>
            </view>
            <view class="mt20 f24 ">分享好友</view>
            <button class="sharebtn " openType="share" @click="backparent"></button>
          </view>
          <!-- 	<view @tap="hbfx" class="f-1 f-c-c " v-if="hbs">
						<view class="fximg bsf f-c ">
							<text class="iconfont iconxzfx f56 c6 "></text>
						</view>
						<view class="mt20 f24 ">海报分享</view>
					</view> -->
        </view>
      </view>
    </view>
  </mg-popup>
</template>

<script>
import mgPopup from 'components/common/popup.vue';
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import { fz } from 'common/util';
export default {
  name: "mg-share",
  components: {
    mgPopup,
    MgSwiper
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    value: {
      type: Boolean,
      default: !1
    },
    wxs: {
      type: String,
      default: "1"
    },
    hbs: {
      type: Boolean,
      default: !1
    },
    link: {
      type: String,
      default: ""
    },
    ptype: String
  },
  data: function () {
    return {};
  },
  computed: {
    show: {
      get: function () {
        return this.value;
      },
      set: function (t) {
        this.$emit("input", t);
      }
    }
  },
  watch: {},


  methods: {
    backparent() {
      this.$emit('tapshare')
    },
    share: function () {
      this.show = !1, uni.showModal({
        title: "提示",
        content: "点击右上角分享",
        showCancel: !1,
        confirmText: "我知道了"
      });
    },
    fzlj: function () {
      fz(this.link || location.href);
    },
    hbfx: function () {
      console.log(this.co, '888888888');
      1 == this.ptype && (this.show = !1, uni.setStorageSync("bdhc", this.co), this.go({
        url: "/yb_wm/other/hb?type=".concat(this.ptype)
      })), console.log(this.ptype);
    }
  }
}
</script>
<style scoped>
.tcbtm {
  margin-top: 50rpx;
}

.fxc {
  border-radius: 30rpx 30rpx 0 0;
}

.hx {
  width: 120rpx;
  height: 2rpx;
  background: #eaeaea;
}

.sharec {
  margin-top: 50rpx;
}

.fximg {
  width: 100rpx;
  height: 100rpx;
  background: #efeeef;
}

.sharebtn {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  background: none;
  left: 0;
}
</style>