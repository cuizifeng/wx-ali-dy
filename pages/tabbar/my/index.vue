<template>
  <view>
    <navBar :title="'会员中心'" :leftView="leftView" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'">
      <image class="topImg" slot="userVip" src="https://yunbei.lianmengfu.net/xcxpic/icon/myTitle.png" mode="aspectFit" />
    </navBar>
    <view class="memberBox" :style="{marginTop:contentTop}">
      <view class="membershipCard">
        <view class="membershipCard_top">
          <view class="membershipCard_top_left">
            <image class="Img" :src="suerImg || system.icon" mode="aspectFit" />
            <view class="userName">
              <view class="user">{{vipset.brandName}}</view>
              <view class="user">{{vipset.serviceTel}}</view>
            </view>
          </view>
          <view class="companyInfo"> <text @tap="go({url:'/yb_wm/other/recharge/smzf'})" class="iconfont iconewm cf10 f56 "></text></view>
        </view>
        <view class="membershipCard_bottom">
          <view class="cartNum" v-if="user.vipCode">NO.{{user.vipCode}}</view>
          <!-- <view class="growth"> <text>成长值668</text> <text>距黄金会员还需要1332</text> </view> -->
        </view>
      </view>
      <!-- <button class="start" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="getPhoneNumber" @error="errorPhoneNumber">授权手机号</button> -->
      <myList :list="darr"></myList>

      <view class="myList">
        <view class="myListTitle">常用功能</view>
        <view class="myListItem">
          <view class="item" v-for="(item,index) in myFunction" :key="index" @click="setJump(item)">
            <image class="itemImg" :src="item.icon" mode="aspectFit" />
            <view class="itemName">{{item.name}}</view>
          </view>
        </view>
      </view>

      <view class="myList bottom">
        <view class="myListTitle">商家信息</view>
        <view class="myshop">
          <view class="shop"> 商家店铺：丰台科技园店 </view>
          <view class="setAll">
            <!-- 更多门店
            <image class="myListItemImg" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou.png" mode="" /> -->
          </view>
        </view>
        <view class="myshop">
          <view class="shop"> 详细地址：北京市丰台科技园4区7号楼6M20-21 </view>
          <!-- <view class="setAll">
            更多门店
            <image class="myListItemImg" src="https://yunbei.lianmengfu.net/xcxpic/icon/jiantou.png" mode="" />
          </view> -->
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { isDistribution } from '@/api/my.js'
import { mapActions, mapState } from 'vuex'
import { mpShare, setNB, setNT } from 'common/util';
import { showModal, getSystemInfo } from "@/utils/miniUtils.js"
import myList from './components/list.vue';
export default {
  components: {
    myList
  },
  data() {
    return {
      suerImg: 'https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/10/25/202110251106382871.png',
      title: '',//导航栏标题
      leftView: false,
      contentTop: '',
      myFunction: [
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/xiaofei.png',
          name: '消费记录',
          url: '/yb_wm/other/recharge/yemx'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/ticheng.png',
          name: '全员销售',
          url: '/pages/activity/commission/index'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/fenxiao.png',
          name: '分销商',
          url1: '/pages/activity/distributor/index', //分销商页面
          url2: '/pages/activity/apply/index',//分销商申请
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/laodaixin.png',
          name: '全民销售',
          url: '/pages/activity/oldBeltNew/index'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/order.png',
          name: '订单记录',
          url: '/yb_wm/index/order-index'
        }
      ],

      showloading: !0,
      type: 1,
      loading: !1,
      qyarr: {
        btnList: [],
        circle: 10,
        circleBtn: "10",
        colorBg: "",
        colorWord: "",
        line: "2",
        marginBottom: 0,
        marginLR: 0,
        marginTop: 0,
        num: "3"
      },
      arr: [{
        icn: "iconcz f44",
        url: "/yb_wm/other/recharge/index",
        name: "在线储值"
      }, {
        icn: "iconjfgz f44",
        url: "czz",
        name: "成长值"
      }, {
        icn: "iconqy f42",
        url: "wkk?type=1",
        name: "会员权益"
      }, {
        icn: "icondhjl f40",
        url: "/yb_wm/my/other/gywm?t=会员说明&p=6",
        name: "会员说明"
      }],
      lsarr: [],
      xzdjinfo: {},
      swcurrent: 0,
      vipInfo: {},
      adata: "",
      query: {},
      storeId: "1",
      companyInfo: '',
    }
  },
  onLoad: function (t) {
    //获取门店信息
    this.$api.shop_lately__store().then(res => {
      this.storeId = res.id
    })
    this.$api.sound_store({
      storeId: this.storeId
    }).then(r => {
      this.companyInfo = r.data
    })

    var e = this;
    e.query = t, Promise.all([e.getSystem()]);
    e.type = e.isVip ? 2 : 1,
      e.query.type && (e.type = e.query.type),
      1 == e.type && setNB(e.tColor),
      e.getConfig({
        key: "vipset",
        api: "config_config",
        params: {
          ident: "vipSet"
        }
      });
    1 == e.type ? e.title = e.vipset.title : e.title = "会员中心", e.getDjlb();

    //获取会员信息
    this.$api['vip-card_level__list']().then(res => {
      this.vipInfo = res[0]
    })

    getSystemInfo().then(res => {
      this.contentTop = res.contentTop;
    })
  },
  onShow: function () {
    var t = this;
    this.isload ? !this.query.type && this.isVip && 1 == this.type && (this.vipInfo = this.lsarr.find((
      function (
        e) {
        return e.level == t.user.level
      })), this.type = 2, setNB(), setNT("会员中心")) : this.isload = !0
    this.refreshUser({
      nomask: 1,
      get: 1,
      now: 1
    })
    // setTimeout(() => {
    //   if (!this.user.portrait) {
    //     showModal({ content: '为了您更好的体验，请您先登录', type: 5, url: '/pages/user/userLogin/index' })
    //   }
    // }, 2000)
    // this.$api.login_save__user().then(res => {
    //   this.uesr = res.data
    // })
  },
  computed: {
    ...mapState({
      vipset: function (t) {
        return t.config.vipset
      }
    }),
    lbswiper: function () {
      return {
        class: "",
        swiper: [{
          url: "https://images.ddycms.cn/yb_wm/39/2021/01/13/202101131541554298.jpg"
        }],
        duration: "",
        mode: "",
        height: "360",
        radius: "30",
        auto: !0,
        interval: 5
      }
    },
    darr: function () {
      return [
        {
          url: "/yb_wm/other/recharge/yesy",//
          num: this.user.balance,
          name: this.system.custom.balance,
          text: '元'
        },
        {
          num: this.user.couponNum || 0,
          name: "优惠券",
          url: "/yb_wm/my/coupon/my",
          text: '张'
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/zhuanzeng.png',
          name: "转赠",
          url: "",
        },
        {
          icon: 'https://yunbei.lianmengfu.net/xcxpic/icon/home.png',
          name: "商城",
          url: "/pages/tabbar/shop/index"
        }

      ]
    }
  },
  methods: {
    //常用功能
    setJump(event) {
      if (event.name == '分销商') {
        isDistribution().then(res => {
          if (res.data.state == '待审核') {
            uni.navigateTo({ url: event.url2 });
          } else if (res.data.state == '已通过') {
            uni.navigateTo({ url: event.url1 });
          } else if (res.data.state == '已拒绝') {
            showModal({ content: '申请以拒绝，请联系管理员' })
          } else {
            uni.navigateTo({ url: event.url2 });
          }
        })
      } else {
        uni.navigateTo({
          url: event.url
        });
      }
    },

    ...mapActions(["getConfig"]),
    lschange: function (t) {
      this.xzdjinfo = t, this.qyarr.btnList = t.rightsList.map((function (t) {
        return {
          img: t.icon,
          word: t.name
        }
      }))
    },
    getDjlb: function () {
      var t = this;
      this.$api['vip-card_level__list']().then(res => {
        var i = res;
        t.lsarr = res, res.length && (t.lschange(i[0]), t.isVip && (t
          .refreshUser({
            nomask: 1,
            get: 1,
            now: 1
          }), t.swcurrent = res.findIndex((function (e) {
            return e.level == t.user.level
          })), t.vipInfo = res[t.swcurrent]))
        t.showloading = false;
      })
    },
    myDataClick: function (e) {
      var n = "";
      e.url && (n = e.url, "会员说明" == e.name && t.setStorageSync("fwb", this.vipset.content)),
        this.go({
          t: 1,
          url: n
        })
    },
    ljkk: function () {
      var t = this;
      t.checkLogin().then(res => {
        t.go({
          url: "open"
        });
      })
    },




    getPhoneNumber(e) {
      my.getPhoneNumber({
        success: (res) => {
          console.log('授权成功', res)
        },
        fail: (err) => {
          console.log('授权失败', err)
        }
      })
    },
    // 拒绝手机号
    errorPhoneNumber(e) {
      console.log('拒绝授权', e)
      this.exitAccount()
    },

    // 退出登录 功能
    exitAccount() {
      my.confirm({
        title: '提示',
        content: '取消授权，可能会使部分功能无法使用，或页面信息不完整',
        confirmButtonText: '重新授权',//确定按钮
        cancelButtonText: '我知道了',//取消按钮
        success: (res) => {
          //res打印出来是{confirm:true}
        },
      })
    },
  },
  onShareAppMessage: function () {
    var t = "pages/tabbar/my/index";
    return mpShare({
      t: this.vipset.title,
      p: t
    })
  },
  onShareTimeline: function (t) {
    return {
      title: this.vipset.title,
      imageUrl: this.getImgS(this.vipset.logo)
    }
  }
}
</script>

<style lang='scss' scoped>
.topImg {
  width: 750rpx;
  height: 322rpx;
}
.memberBox {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  right: 0rpx;
  bottom: 0rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .membershipCard {
    margin-top: 121rpx;
    width: 690rpx;
    height: 351rpx;
    background-image: url("https://yunbei.lianmengfu.net/xcxpic/icon/cartbg.png");
    background-size: 100% 100%;
    position: relative;
    // z-index: 2;
    .membershipCard_bottom {
      display: flex;
      flex-direction: column;
      padding: 0rpx 36rpx;
      padding-top: 30rpx;
      .cartNum {
        width: 230rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: left;
        border-bottom: 1rpx solid #ddb466;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ddb466;
      }
      .growth {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ddb466;
        padding-top: 10rpx;
        text:nth-child(2) {
          padding-left: 20rpx;
        }
      }
    }
    .membershipCard_bg {
      position: absolute;
      left: 0rpx;
      top: 0rpzx;
      width: 690rpx;
      height: 351rpx;
      //   z-index: -1;
    }
    .membershipCard_top {
      padding: 48rpx 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .companyInfo {
        width: 44rpx;
        height: 44rpx;
      }
      .membershipCard_top_left {
        display: flex;
        align-items: center;
        .Img {
          width: 100rpx;
          height: 100rpx;
          background: #fff;
          box-shadow: 0px 0px 5px 0px rgba(221, 180, 102, 0.3);
          border-radius: 50rpx;
        }
      }
      .userName {
        display: flex;
        flex-direction: column;
        .user {
          padding: 5rpx 10rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ddb466;
        }
      }
    }
  }
  .myList {
    margin-top: 30rpx;
    width: 690rpx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 13rpx 0rpx rgba(0, 0, 0, 0.07);
    border-radius: 11rpx;
    padding: 0rpx 30rpx;
    display: flex;
    flex-direction: column;
    .myListTitle {
      height: 68rpx;
      line-height: 68rpx;
      font-size: 26rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #222222;
      text-align: left;
      border-bottom: 1rpx solid rgba(151, 151, 151, 0.3);
    }
    .myshop {
      padding: 20rpx 0rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shop {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #444444;
      }
      .setAll {
        display: flex;
        align-items: center;
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #979797;
        .myListItemImg {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    .myListItem {
      padding: 20rpx 0rpx;
      display: flex;
      flex-wrap: wrap;
      //   justify-content: space-between;
      align-items: center;
      .item {
        width: 155rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20rpx 0rpx;
        .itemImg {
          width: 42rpx;
          height: 42rpx;
        }
        .itemName {
          padding-top: 15rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #444444;
        }
      }
    }
  }
  .bottom {
    margin-bottom: 100px;
  }
}
</style>