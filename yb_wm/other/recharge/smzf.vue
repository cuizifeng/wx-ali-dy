<template>
  <view class="bf mh100 ">
    <navBar :title="'余额支付'" :backgroundColor="'#FFCB4C'" :wordColor="'#fff'"></navBar>
    <view class="sfbg " :style="'background:'+tColor+';'"></view>
    <view class="sfimg bsf ma ">
      <!-- <mg-img class="" :src="user.portrait||'/static/wd/mrtx.png'" vueId="82544710-1"></mg-img> -->
      <mg-img class="" :src="user.portrait" vueId="82544710-1"></mg-img>
    </view>
    <view class="t-c mt15 mb50 ">{{user.userName}}</view>
    <view class="sfbd ">
      <view @tap="syye" class="p3 f-c b-be ">
        <text :class="['iconfont iconwgx mr15 ',isgx?'icongx c0':'']"></text>
        <view class="">{{'使用'+system.custom.balance+'支付'}}<text class="ml10 f24 c9 ">{{'(可用余额'+sl+user.balance+')'}}</text>
        </view>
      </view>
      <view class="t-c p30 ">
        <view class="mt10 mb30 ">此二维码可累计积分并付款</view>
        <view class="sfmc f-c ">
          <view class="sfm ">
            <mg-img class="" local="1" :src="code" vueId="82544710-2" v-if="code"></mg-img>
            <!-- <image :src="code" mode=""></image> -->
          </view>
        </view>
        <view class="f24 wei4 " style="color:#A3A8AE;">会员码每30秒自动刷新—次</view>
      </view>
    </view>
    <uni-qrcode cid="zfewm" class="vue-ref" @makeComplete="makeComplete" ref="zfewm" :margin="0" :text="ewmlink" vueId="82544710-3">
    </uni-qrcode>
  </view>
</template>

<script>
import uniQrcode from "components/uQrcode/uni-qrcode.vue";

export default {
  name: "smzf",
  components: {
    uniQrcode
  },
  data: function () {
    return {
      isgx: !1,
      ewmlink: "",
      code: ""
    }
  },
  onLoad: function (n) {
    var e = this;
    e.getSystem({ setNB: 1 })
    e.getLoginInfo()
    e.$nextTick((function () {
      e.makeMemberCode()
    }))
    e.dsq = setInterval((function () {
      e.makeMemberCode()
    }), 3e4)
  },
  onUnload: function () {
    this.dsq && clearInterval(this.dsq)
  },
  computed: {},
  methods: {
    makeComplete(e) {
      this.$nextTick(() => {
        this.code = e;
      })
    },
    syye: function () {
      this.isgx = !this.isgx, this.makeMemberCode()
    },
    makeMemberCode: function () {
      var e = this;
      //   e.ewmlink = e.uId + e.RandomRange(6, 6);
      e.ewmlink = JSON.stringify({ uid: e.uId })
      this.$nextTick(() => {
        e.$refs.zfewm.make();
        // e.code = e.$refs.zfewm.make();
      })
    },
    RandomRange: function (n, e) {
      for (var t = "", r = e ? Math.round(Math.random() * (e - n)) + n : n, o = ["0", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
        "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
      ], a = 0; a < r; a++) {
        var u = Math.round(Math.random() * (o.length - 1));
        t += o[u]
      }
      return t
    }
  }
}
</script>
<style scoped>
.sfbg {
  background-color: #424141;
  height: 15vh;
}

.sfimg {
  width: 140rpx;
  height: 140rpx;
  margin-top: -70rpx;
}

.sfbd {
  padding: 0 60rpx;
}

.sfmc {
  margin: 0 0 30rpx;
}

.sfm {
  width: 336rpx;
  height: 336rpx;
}
</style>