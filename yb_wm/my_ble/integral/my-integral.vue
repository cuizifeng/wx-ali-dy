<template>
  <view class="mh100 pb130 " v-if="jfName">
    <view class="bf ">
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
    <view class="bf mt30 ">
      <view class="f32 wei p3 bor-b ">{{jfName+'记录'}}</view>
      <view class="p3 bf bor-b " v-for="(v, i) in dataList" :key="i">
        <view class="f-x-bt ">
          <view class="t-o-e f28 ">{{v.note}}</view>
          <view class="cf7 f28 ">
            <text class="" v-if="v.type=='1'">+</text>
            <text class="" if="v.type=='2'" v-else>-</text>{{v.integral}}
          </view>
        </view>
        <view class="f-x-bt ">
          <view class="c9 f24 m10 ">{{v.createdAt}}</view>
        </view>
      </view>
    </view>
    <jzz bgcolor="transparent" class="" imgn="zwjf" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="144f23cc-1">
    </jzz>
    <tab-bar class="" vueId="144f23cc-2"></tab-bar>
  </view>
</template>

<script>
import jzz from 'components/common/jzz.vue';
import {
  utilMixins
} from 'common/utilMixins';
import {
  setNT,
  sljz
} from 'common/util';
export default {
  name: "myIntegral",
  components: {
    jzz
  },
  data: function () {
    return {
      params: {
        page: 1,
        size: 10
      },
      integral: "0"
    }
  },
  onLoad: function () {
    var t = this;
    t.getSystem().then((function () {
      setNT("我的" + t.jfName)
    })), t.getLoginInfo();
    t.integral = t.user.integral, t.getList();
  },
  mixins: [utilMixins, sljz],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    getList: function () {
      var t = this;
      this.$api.member_integral__details(t.params).then(res => {
        t.dataList = t.dataList.concat(res), t.isget = !0,
          t.mygd = t.params.size > res.length,
          t.params.page++;
      })
    },
    integralMall: function () {
      this.go({
        t: 2,
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

<style>
</style>
<style scoped>
.bor-b {
  border-bottom: 1px solid #eff3f6;
}
</style>