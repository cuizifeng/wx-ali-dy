<template>
  <view class="dragvip ">
    <view class="header posi-r f-x-c " :style="'background:'+(styles.bgType==1?styles.colorBg:'')+';'">
      <view class="posi-a mywh bgimg " v-if="styles.bgType!=1&&styles.img">
        <mg-img class="" :src="styles.img" vueId="3f4ca4a9-1"></mg-img>
      </view>
      <view class="posi-r mywh cf ">
        <view class="posi-r " :style="'height:'+getSb().customNavh-10+'px'+';'" v-if="ptype=='my'&&showpr==2"></view>
        <view class="my-header f-row " v-if="isLogin">
          <view class="f-g-0 posi-r ">
            <image class="posi-a hgimg " src="https://yunbei.lianmengfu.net/xcxpic/wd/vip/hg.png" v-if="isVip"></image>
            <view class="img ">
              <mg-img class="" cname="bsf" :src="user.portrait||'https://yunbei.lianmengfu.net/xcxpic/wd/mrtx.png'" vueId="3f4ca4a9-2"></mg-img>
            </view>
          </view>
          <view class="f-g-1 ">
            <view class="f38 wei mb15 f-y-c ">
              <view class="t-o-e mr20 " :style="'color:'+styles.colorName+';'">{{user.userName}}</view>
              <view class="f-g-0 f-row f22 o-h " style="max-width:60%;" v-if="isVip">
                <view class="vname-l t-c t-o-e ">{{vipset.title}}</view>
                <view class="vname-r t-c t-o-e ">{{user.cardName}}</view>
              </view>
            </view>
            <view class="f-y-c f24 ">
              <text class="mr10 ">用户ID:</text>
              <text class="">{{user.id}}</text>
              <text @tap="fz(user.id)" class="fz ">复制</text>
            </view>
          </view>
          <view @tap="go({url:'/yb_wm/my/other/bjzl'})" class="ml20 f-c ">
            <text class="iconfont iconsz cf f46 "></text>
          </view>
        </view>
        <view class="my-header f-y-c " v-else>
          <view class="f-g-0 img ">
            <mg-img class="" cname="bsf" src="https://yunbei.lianmengfu.net/xcxpic/wd/mrtx.png" vueId="3f4ca4a9-3"></mg-img>
          </view>
          <view class="f-g-1 ">
            <view class="f38 mb15 " :style="'color:'+styles.colorName+';'">{{user.userName}}</view>
            <view @tap="ljdl" class="text-btn bs30 f24 p0 cf f-c ">立即登录</view>
          </view>
        </view>
        <view class="my-bd c3 " v-if="styles.vipStatus==1">
          <view class="vc f-x-bt f22 " v-if="isVip">
            <view class="f-y-c " style="color:#FADCAD;">
              <image class="vimg mr10 " src="https://yunbei.lianmengfu.net/xcxpic/wd/vip/mv.png"></image>
              <view class="">{{user.cardName}}</view>
            </view>
            <view @tap="go({t:1,url:'/pages/tabbar/my/index'})" class="bs30 p-8-20 dlbtn f-y-c ">
              <view class="mr10 ">查看详情</view>
              <view class="ysj "></view>
            </view>
          </view>
          <view class="vc f-x-bt f22 " v-else>
            <view class="f-y-c " style="color:#fff;">
              <image class="vimg mr10 " src="https://yunbei.lianmengfu.net/xcxpic/wd/vip/mv.png"></image>
              <view class="">领取会员卡，各种优惠享不停</view>
            </view>
            <view @tap="go({t:1,url:'/pages/tabbar/my/index'})" class="bs30 p-8-20 dlbtn f-y-c ">
              <view class="mr10 ">立即领取</view>
              <view class="ysj "></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="my-datac ">
      <view class="my-data bf bs20 f-row ">
        <view @tap="myDataClick(v)" class="datac f-1 b-r-d f-c-c " :hidden="!!v.hide" v-for="(v, i) in myData" :key="i">
          <view class="f36 wei t-o-e t-c " :style="'width:90%;'+'color:'+styles.colorNumber+';'">
            {{isLogin?v.num:'***'}}</view>
          <view class="f24 " :style="'color:'+styles.colorTitle+';'">{{v.name}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import sqBtn from 'components/common/sq-btn.vue';
import {
  fz
} from 'common/util';

export default {
  name: "vip",
  components: {
    sqBtn,
    // sqBtn: function() {
    // 	n.e("components/common/sq-btn").then(function() {
    // 		return resolve(n("fc42"));
    // 	}.bind(null, n)).catch(n.oe);
    // }
  },
  data: function () {
    return {
      fz
    };
  },
  props: {
    styles: Object,
    ptype: {
      type: String,
      default: "my"
    },
    showpr: {
      type: String,
      default: ""
    }
  },
  methods: {
    ljdl: function () {
      var t = this;
      t.checkLogin();
    },
    myDataClick: function (t) {
      var e = this;
      var r;
      debugger
      e.checkLogin().then(res => {
        r = "", r = t.url ? t.url : "/yb_wm/my/other/kfz", e.go({
          t: 1,
          url: r
        });
      })
    }
  },
  computed: {
    vipset() {
      try {
        return this.$store.state.config.vipset;
      } catch (e) {
        return {};
      }
    },
    myData: function () {
      return [{
        hide: "false" == this.styles.btnStatus[0].toString(),
        num: this.user.balance || 0,
        name: this.system.custom.balance,
        url: "/yb_wm/other/recharge/yesy"
      }, {
        hide: "false" == this.styles.btnStatus[1].toString(),
        num: this.user.integral || 0,
        name: this.system.custom.integral,
        url: "/yb_wm/my/integral/my-integral"
      }, {
        hide: "false" == this.styles.btnStatus[2].toString(),
        num: this.user.couponNum || 0,
        name: "优惠券",
        url: "/yb_wm/my/coupon/my"
      }, {
        hide: "false" == this.styles.btnStatus[3].toString(),
        num: 0,
        name: "收藏"
      }];
    }
  },
  created: function () { }
}
</script>
<style scoped>
.header {
  width: 160%;
  margin-left: -30%;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
  overflow: hidden;
}

.header .mywh {
  width: 100vw;
  height: 100%;
}

.my-header {
  padding: 40rpx 30rpx 40rpx;
}

.my-header .text-btn {
  width: 130rpx;
  height: 50rpx;
  border-color: #fff;
}

.my-header .img {
  width: 116rpx;
  height: 116rpx;
  margin-right: 30rpx;
}

.my-header .fz {
  font-size: 18rpx;
  padding: 2rpx 15rpx;
  border-radius: 5rpx;
  border: 1rpx solid #fff;
  margin-left: 20rpx;
}

.my-header .hgimg {
  top: -18rpx;
  right: 10rpx;
  width: 53rpx;
  height: 54rpx;
}

.my-header .vname-l {
  min-width: 120rpx;
  padding: 3rpx 10rpx 3rpx 15rpx;
  border-radius: 50rpx 0 0 50rpx;
  background: linear-gradient(90deg, #503215, #55371a);
  color: #fffadb;
}

.my-header .vname-r {
  min-width: 120rpx;
  padding: 3rpx 15rpx 3rpx 10rpx;
  border-radius: 0 50rpx 50rpx 0;
  background: linear-gradient(90deg, #fff3a6, #fcd96f);
  color: #7a5d24;
}

.my-bd {
  margin: 0 25rpx;
  background: linear-gradient(90deg, #535353, #131313);
  border-radius: 40rpx 40rpx 0 0;
}

.my-bd .vc {
  padding: 15rpx 30rpx 25rpx;
}

.my-bd .dlbtn {
  background: linear-gradient(90deg, #fff5c2, #ffdd8b);
}

.my-bd .vimg {
  width: 25rpx;
  height: 25rpx;
}

.my-bd .img {
  width: 46rpx;
  height: 46rpx;
}

.my-bd .ysj {
  width: 0;
  height: 0;
  border-top: 6rpx solid transparent;
  border-left: 10rpx solid #333;
  border-bottom: 6rpx solid transparent;
}

.my-datac {
  padding: 20rpx 20rpx 0;
}

.my-data {
  padding: 35rpx 0rpx;
}

.my-data .b-r-d:after {
  background: #fff;
}

.my-data .datac:last-child.b-r-d:after {
  background: #fff;
}
</style>