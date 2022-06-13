<template>

  <view class="container pb115 ">
    <view class="p23 ">
      <view @tap="chooseAdd(v)" :class="['bf bs20 p23 mb20 f-row ',v.isClick==2?'bggray ce5':'']" v-for="(v, i) in dataList" :key="i">
        <view class="f-g-1 ">
          <view class="f-row ">
            <view class="f32 mr10 t-o-e " style="max-width:80%;">{{v.address}}</view>
            <bk-b cName="f-g-0 f22 c6 mr20 p-5-10" class="" :color="labelColor(v.label)" :t="v.label" type="2" :vueId="'4c825661-1-'+i">
            </bk-b>
          </view>
          <view class="f24 mr10 t-o-e ">{{v.details}}</view>
          <view :class="['f-row f24 c6 mt15 ',v.isClick==2?'ce5':'']">
            <text class="mr20 ">{{v.userName+'('+(v.sex=='女生'?'女士':v.sex)+'）'}}</text>
            <text class="">{{v.userTel}}</text>
          </view>
          <view class="f24 mt10 " style="color:#f00;" v-if="v.isClick==2">超出配送范围</view>
        </view>
        <view @tap.stop="go({t:1,url:'address?id='+v.id})" class="f-g-0 f-c ml20 ">
          <text class="iconfont iconbianji f40 "></text>
        </view>
      </view>
    </view>
    <view class="foot-btnc ">
      <button @tap="xzdz" class="foot-btn " :style="'background:'+tColor+';'">+新增地址</button>
    </view>
    <jzz bgcolor="transparent" class="" imgn="zwdz" :mygd="mygd" :nodata="dataList.length==0&&isget" otext="暂无地址信息" ttext="请点击底部按钮添加地址" vueId="4c825661-2"></jzz>
  </view>

</template>

<script>
import bkB from "components/common/block-b.vue";
import jzz from "components/common/jzz.vue";
import mgInput from "components/form/mg-input.vue";
import mgRadio from "components/form/mg-radio.vue";
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  bus,
  setNT,
  swnb
} from 'common/util';
export default {
  components: {
    mgInput,
    mgRadio,
    bkB,
    jzz,
  },
  data: function () {
    return {
      dataList: [],
      isget: !1,
      mygd: !1
    }
  },
  onLoad: function (e) {
    var t = this;
    t.getSystem(), setNT("我的地址"), t.query = e;
    t.getLoginInfo().then(res => {
      t.query.from && t.query.from <= 4 && e.storeId ? t.params = {
        storeId: e.storeId
      } : t.params = {}, t.getData();
    });
  },
  onShow: function () { },
  computed: {
    ...mapState(['latLng'])
  },
  methods: {
    getData: function () {
      var e = this;
      var o;
      this.$api.member_my__address(e.params).then(res => {
        e.dataList = res || [], getApp().globalData.xzdzInfo && (o = -1 == e.dataList.findIndex((
          function (e) {
            return e.id == getApp().globalData.xzdzInfo.id
          })), o && (getApp().globalData.xzdzInfo = null)), e.isget = e.mygd = !0;
      })
    },
    chooseAdd: function (t) {
      var n = this;
      var u;
      if (2 != t.isClick) {
        if (n.query.from && n.query.from <= 4) {
          this.$api.member_receiving__address({
            storeId: n.query.storeId || "",
            addressId: t.id,
            lat: n.latLng.lat || "",
            lng: n.latLng.lng || ""
          }).then(res => {
            getApp().globalData.xzdzInfo = res;
            if (4 == n.query.from) {
              n.go({
                t: 6,
                url: "/pages/tabbar/order/index"
              }), setTimeout((function () {
                bus.$emit("qjjtsj", 1)
              }), 200);
            } else if (3 != n.query.from) {
              swnb()
            } else {
              bus.$emit("qjjtsj", {
                wmtz: 1
              })
            }

          })
        } else {
          5 == n.query.from && (bus.$emit("changeChoose", {
            addInfo: t
          }), swnb())
        }
      }
    },
    xzdz: function () {
      this.go({
        t: 1,
        url: "/yb_wm/my/address/address"
      })
    },
    chooseAddress: function () {
      e.authorize({
        scope: "scope.address",
        success: function (t) {
          e.chooseAddress({
            success: function (e) {
              console.log(e)
            }
          })
        },
        fail: function (t) {
          e.showModal({
            title: "温馨提示",
            content: "获收货地址授权失败",
            confirmText: "去设置",
            success: function (t) {
              t.confirm ? e.openSetting({
                success: function (e) {
                  console.log(e.authSetting)
                }
              }) : t.cancel
            }
          }), console.log(t)
        }
      })
    },
    labelColor: function (e) {
      return "公司" == e ? "#94B2D8" : "家" == e ? "#DF8884" : "#A0B888"
    }
  }
}
</script>