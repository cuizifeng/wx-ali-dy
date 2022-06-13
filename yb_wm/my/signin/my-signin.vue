<template>
  <view class="mh100 pb115 ">
    <view class="bf mb30 " v-if="type=='1'">
      <view class="f-c-c p30 ">
        <view class="f28 ">{{'当前'+jfName}}</view>
        <view class="f56 cf7 wei ">{{integral}}</view>
      </view>
      <view class="f-x-bt ">
        <view @tap="integralMall" class="f-c p3 ">
          <text class="iconfont iconjfsc mr10 cf7 f34 "></text>
          <text class="">{{jfName+'商城'}}</text>
        </view>
        <view @tap="integralRule" class="f-c p3 ">
          <text class="iconfont iconjfgz mr10 cf7 f34 "></text>
          <text class="">{{jfName+'规则'}}</text>
        </view>
      </view>
    </view>
    <view class="bf ">
      <view class="f32 wei p3 hlb ">签到记录</view>
      <view class="p3 bf hlb " v-for="(v, i) in dataList" :key="i">
        <view class="f-x-bt ">
          <view class="t-o-e f28 ">{{v.note}}</view>
          <view class="cf7 f28 ">{{'+'+v.integral}}</view>
        </view>
        <view class="f-x-bt ">
          <view class="c9 f24 m10 ">{{v.createdAt}}</view>
        </view>
      </view>
    </view>
    <jzz bgcolor="transparent" class="" imgn="zwyyd" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="eeacb6a4-1">
    </jzz>
  </view>
</template>

<script>
import jzz from "components/common/jzz.vue";
import {
  setNT,
  sljz
} from 'common/util';

export default {
  name: "mySignin",
  components: {
    jzz
  },
  data: function () {
    return {
      params: {
        page: 1,
        size: 10
      },
      integral: "",
      type: ""
    }
  },
  onLoad: function (t) {
    this.getSystem(this), setNT("我的" + (1 == t.type ? this.jfName : "签到")), this.integral = this.user
      .integral, this.getList(), this.type = t.type
  },
  mixins: [sljz],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    getList: function () {
      var t = this;
      this.$api['sign-in_my__sign__record'](t.params).then(res => {
        t.dataList = t.dataList.concat(res), t.isget = !0,
          t.mygd = t.params.size > res.length, t.params.page++;
      })
    },
    integralMall: function () {
      this.go({
        t: 1,
        url: "/pages/tabbar/shop/index"
      })
    },
    integralRule: function () {
      this.go({
        t: 1,
        url: "/yb_wm/my/other/gywm?t=".concat(this.jfName, "规则&p=8")
      })
    }
  }
}
</script>