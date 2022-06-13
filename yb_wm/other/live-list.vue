<template>
  <view class="pb115 ">
    <view class="f-raw zbl f-bt ">
      <view @tap="goDl(v)" class="zbc p-r b-s-3 bs15 mb20 " v-for="(v, i) in dataList" :key="i">
        <view class="zbfm bs15 p-r ">
          <mg-img class="" :src="v.cover_img" :vueId="'5095f3a7-1-'+i"></mg-img>
          <view class="p-a udlr zban bsf f-c ">
            <text class="iconfont iconsxxx cf f56 ml10 " style="transform:rotate(-90deg);"></text>
          </view>
        </view>
        <view class="p23 bf ">
          <view class="t-o-e l-n ">{{v.name}}</view>
          <view class="f-y-c mt10 ">
            <view class="zbtx bsf mr10 ">
              <mg-img class="" :src="v.cover_img" :vueId="'5095f3a7-2-'+i"></mg-img>
            </view>
            <view class="f24 c9 f-1 t-o-e ">{{v.anchor_name}}</view>
          </view>
        </view>
        <view class="p-a l0 t0 zbzt f-y-c cf f24 ">
          <view class="yd bsf bf mr10 "></view>
          <view class="">{{ls(v)}}</view>
        </view>
      </view>
    </view>
    <jzz bgcolor="transparent" class="" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="5095f3a7-3"></jzz>
    <tab-bar class="" vueId="5095f3a7-4"></tab-bar>
  </view>
</template>

<script>
import jzz from "components/common/jzz.vue";
import {
  setNT,
  sljz
} from 'common/util';

export default {
  name: "order-index",
  components: {
    jzz
  },
  data: function () {
    return {
      params: {
        page: 1,
        size: 10
      }
    }
  },
  onLoad: function (t) {
    var e = this;
    this.getSystem().then((function () {
      setNT(e.system.custom.live)
    })), this.getList(), this.getLayout()
  },
  mixins: [sljz],
  computed: {},
  methods: {
    getList: function () {
      var t = this;
      this.$api.config_get__mini__live(t.params).then(res => {
        res ? (t.dataList = t.dataList.concat(res), t.isget = !0, t.mygd = t.params
          .size > res.length, t.params.page++) : t.isget = t.mygd = !0;
      })
    },
    ls: function (t) {
      var e = "";
      switch (t.live_status) {
        case 101:
          e = "直播中";
          break;
        case 102:
          e = "未开始";
          break;
        case 103:
          e = "已结束";
          break;
        case 104:
          e = "禁播";
          break;
        case 105:
          e = "暂停中";
          break;
        case 106:
          e = "异常";
          break;
        case 107:
          e = "已过期";
          break
      }
      return e
    },
    goDl: function (e) {
      uni.navigateTo({
        url: "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=".concat(e.roomid)
      })
    },
    onShareAppMessage: function () {
      return {
        title: "邀你一起看直播！"
      }
    },
    onShareTimeline: function (t) {
      return {
        title: "邀你一起看直播！",
        imageUrl: this.getImgS(this.system.shareIcon)
      }
    }
  }
}
</script>
<style scoped>
.zbl {
  padding: 20rpx 20rpx 0;
}

.zbc {
  width: 345rpx;
}

.zbfm {
  height: 345rpx;
}

.zbtx {
  width: 46rpx;
  height: 46rpx;
}

.zbzt {
  width: 140rpx;
  padding: 15rpx 0 15rpx 20rpx;
  background: hsla(0, 0%, 42.7%, 0.9);
  border-radius: 0 60rpx 60rpx 0;
}

.zbzt .yd {
  width: 15rpx;
  height: 15rpx;
}

.zban {
  width: 100rpx;
  height: 100rpx;
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.5);
}
</style>