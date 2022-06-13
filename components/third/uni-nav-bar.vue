<template>
  <view class="uni-navbar ">
    <view :class="['uni-navbar__content ',fixed?'uni-navbar--fixed':'',border?'uni-navbar--shadow':'',border?'uni-navbar--border':'']" :style="'background:'+(bg||'rgba(255,255,255,'+uropcity+')')+';'">
      <uni-status-bar class="" vueId="89578c26-1" v-if="statusBar"></uni-status-bar>
      <view class="uni-navbar__header uncv " :style="'color:'+color+';'" v-if="urbd">
        <view class="header-l f-g-0 p02 f-y-c ">
          <view class="urlc f-row " :style="'background:'+'rgba(0, 0, 0,'+uriconopcity+')'+';'" v-if="isleft">
            <view @tap="back" class="f-1 posi-r f-c ">
              <text :class="['iconfont ',leftcn]" :style="'color:'+(uropcity>=1?color:'#fff')+';'+'font-size:'+size+'rpx'+';'"></text>
            </view>
            <view class="urlcsx "></view>
            <view @tap="more" class="f-1 posi-r f-c ">
              <text :class="['iconfont ',rightcn]" :style="'color:'+(uropcity>=1?color:'#fff')+';'+'font-size:'+size+'rpx'+';'"></text>
            </view>
          </view>
          <slot name="left"></slot>
        </view>
        <view :class="[ 'f-g-1 t-c wei f30 uncv ',[isleft?'uni-navbar__header-container':''] ]" :style="'color:'+(uropcity>=1?'':'#fff')+';'+'opacity:'+(isleft?uropcity:'')+';'" v-if="title.length">{{title}}
        </view>
        <view class="uni-navbar__header-container f-c " v-else>
          <slot></slot>
        </view>
        <view @tap="onClickRight" class="uni-navbar__header-btns uncv ">
          <view class="uncv " v-if="rightIcon.length">
            <text :class="['iconfont ',rightIcon]" :style="'color:'+color+';'+'font-size:'+size+'rpx'+';'"></text>
          </view>
          <view class="uni-navbar-btn-text uncv " v-if="rightText.length&&!rightIcon.length">{{rightText}}</view>
          <slot name="right"></slot>
        </view>
      </view>
      <slot v-else></slot>
    </view>
    <view class="uni-navbar__placeholder " v-if="fixed&&ispr">
      <uni-status-bar class="" vueId="89578c26-2" v-if="statusBar"></uni-status-bar>
      <view class="uni-navbar__placeholder-view "></view>
    </view>
    <mg-popup v-model="showMore" position="top" vueId="89578c26-3" :vueSlots="['default']" zIndex="10000">
      <view class="bf p3 " style="padding-top:44px;">
        <view class="mb20 ">功能直达</view>
        <view class="f-raw ">
          <view @tap="gogn(i)" class="urgnc f-c-c " v-for="(v, i) in gnarr" :key="i">
            <text :class="['iconfont cf f46 ','icon'+v.icon]"></text>
            <text class="mt10 cf f26 ">{{v.name}}</text>
          </view>
        </view>
      </view>
    </mg-popup>
  </view>
</template>

<script>
import mgPopup from 'components/common/popup.vue';
import uniStatusBar from './uni-status-bar.vue';

export default {
  name: "UniNavBar",
  components: {
    uniStatusBar,
    mgPopup,
    // : function () {
    //   n.e("components/third/uni-status-bar").then(function () {
    //     return resolve(n("c91c"));
    //   }.bind(null, n)).catch(n.oe);
    // },
    // mgPopup: function () {
    //   n.e("components/common/popup").then(function () {
    //     return resolve(n("499a"));
    //   }.bind(null, n)).catch(n.oe);
    // }
  },
  props: {
    urbd: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: ""
    },
    isleft: {
      type: Boolean,
      default: !0
    },
    isright: {
      type: Boolean,
      default: !1
    },
    leftcn: {
      type: String,
      default: "iconleft"
    },
    rightcn: {
      type: String,
      default: "iconshx"
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: !1
    },
    color: {
      type: String,
      default: "#000000"
    },
    bg: {
      type: String,
      default: ""
    },
    statusBar: {
      type: Boolean,
      default: !1
    },
    shadow: {
      type: Boolean,
      default: !0
    },
    border: {
      type: Boolean,
      default: !0
    },
    size: {
      type: String,
      default: "42"
    },
    ispr: {
      type: Boolean,
      default: !0
    },
    uropcity: {
      type: [String, Number],
      default: "0"
    },
    uriconopcity: {
      type: [String, Number],
      default: "0.5"
    },
    leftArr: {
      type: Array,
      default: function () {
        return [];
      }
    },
    customback: {
      type: Boolean,
      default: !1
    },
    custommore: {
      type: Boolean,
      default: !1
    }
  },
  data: function () {
    return {
      showMore: !1
    };
  },
  computed: {
    gnarr: function () {
      return this.leftArr.length ? this.leftArr : [
        {
          icon: "zy",
          name: "首页",
          url: "/pages/tabbar/index/index"
        },
        {
          icon: "dd",
          name: "订单",
          url: "/yb_wm/index/order-index"
        }, {
          icon: "wd",
          name: "我的",
          url: "/yb_wm/index/my-index"
        }];
    }
  },
  methods: {
    back: function () {
      this.customback ? this.$emit("on-back") : this.go({
        t: 1 == getCurrentPages().length ? 6 : 4,
        url: "/pages/tabbar/index/index"
      });
    },
    more: function () {
      this.custommore ? this.$emit("on-more") : this.showMore = !0;
    },
    gogn: function (t) {
      this.go({
        t: 6,
        url: this.gnarr[t].url
      });
    }
  }
}
</script>
<style scoped>
.uni-navbar__content {
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.uni-navbar__content .uncv {
  line-height: 44px;
}

.uni-navbar__header {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
}

.header-l {
  min-width: 60rpx;
}

.uni-navbar__header-btns {
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  padding: 0 20rpx;
}

.uni-navbar__header-btns:last-child {
  width: 60rpx;
}

.uni-navbar__header-container {
  width: 100%;
  padding-right: 130rpx;
}

.uni-navbar__placeholder-view {
  height: 44px;
}

.uni-navbar--fixed {
  position: fixed;
  top: 0;
  z-index: 9999;
}

.uni-navbar--shadow {
  box-shadow: 0 1px 6px #ccc;
}

.uni-navbar--border:after {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  content: "";
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.urlc {
  position: relative;
  width: 186rpx;
  height: 32px;
  padding: 5 0;
  border-radius: 32px;
}

.urlc:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ddd;
  transform-origin: 0 0;
  transform: scale(0.5);
  border-radius: 32px;
}

.urlcsx {
  width: 1px;
  height: 18px;
  background: #ddd;
  margin: auto 0;
}

.urgnc {
  width: 22%;
  height: 120rpx;
  border-radius: 24rpx;
  background: rgba(0, 0, 0, 0.4);
  margin-right: 4%;
  margin-bottom: 4%;
}

.urgnc:nth-of-type(4n) {
  margin-right: 0;
}
</style>