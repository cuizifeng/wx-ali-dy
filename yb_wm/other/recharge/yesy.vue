<template>
  <view class="bf mh100 ">
    <navBar :title="'余额'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="yytop t-c " style="border-bottom:24rpx solid #F6F6F6;">
      <view class="">{{'可用'+system.custom.balance}}</view>
      <view class="wei f60 mb30 " :style="'color:'+tColor+';'">
        <text class="f24 mr10 ">{{sl}}</text>{{user.balance}}
      </view>
      <view @tap="go({url:'index'})" class="ma ljcz f-c cf " :style="'background:'+tColor+';'" v-if="recharge.open==1">立即充值
      </view>
    </view>
    <view class="p21 mt30 ">
      <mg-cell acolor="#9F9F9F" arrow="1" @tab="go({url:'smzf'})" btt="扫码支付" bttc="f30" class="" cname="p43 c0" ftc="f28" last="1" vueId="b0f0f6e8-1" :vueSlots="['ft']">
        <view class="f24 wei mr20 " slot="ft" style="color:#C8CACD;">可使用钱包直接支付</view>
      </mg-cell>
      <mg-cell arrow="1" @tab="go({url:'yemx'})" btt="消费记录" bttc="f30" class="" cname="p43 c0" ftc="f28" last="1" vueId="b0f0f6e8-2">
      </mg-cell>
      <!-- <mg-cell arrow="1" @tab="cjwt" btt="常见问题" bttc="f30" class="" cname="p43 c0" ftc="f28" last="1" vueId="b0f0f6e8-3">
      </mg-cell> -->
    </view>
  </view>
</template>

<script>
import { setNT } from 'common/util';
import {
  mapActions,
  mapState,
} from 'vuex'
export default {
  name: "yesy",
  components: {},
  data: function () {
    return {}
  },
  onLoad: function (e) {
    var t = this;
    this.getSystem().then((function () {
      //   setNT(t.system.custom.balance)
    })), this.getLoginInfo(), this.getConfig({
      key: "recharge",
      api: "config",
      params: {
        ident: "recharge"
      }
    })
  },
  computed: {
    ...mapState({
      recharge: function (e) {
        return e.config.recharge
      }
    })
  },
  methods: {
    ...mapActions(["getConfig"]),
    cjwt: function () {
      this.go({
        t: 1,
        url: "/yb_wm/my/other/gywm?t=常见问题&p=5"
      })
    }
  }
}
</script>
<style scoped>
.yytop {
  padding: 40rpx;
}

.ljcz {
  width: 322rpx;
  height: 80rpx;
}
</style>