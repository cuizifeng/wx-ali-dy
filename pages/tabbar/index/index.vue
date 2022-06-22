<template>
  <view>
    <navBar :title="'沐掌柜'" :leftView="leftView" :isType="2" :backgroundColor="'rgba(255,192,70,1)'" :wordColor="'#000'"></navBar>
    <!-- 背景图 -->
    <!-- <view class="bg" :style="{'top':Top}"></view> -->

    <view class="content">
      <!-- 轮播图 -->
      <view class="Rotation" v-if="imgUrl.carousel_image.length > 0">
        <swiper class="swiper-box" style="border-radius: 10rpx" @change="change" autoplay="true" circular="true" interval="3000">
          <swiper-item style="border-radius: 10rpx" v-for="(item ,index) in imgUrl.carousel_image" :key="index" @click="select">
            <view class="swiper-item" style="border-radius: 10rpx">
              <image :src="item.image_url" mode="" style="border-radius: 10rpx" />
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- 金刚位 -->
      <view class="activeList">
        <view class="item" v-for="(item,index) in activeList" :key="index" @click="jump(item)">
          <image class="icon" :src="item.url" mode="aspectFit" />
          <view class="name">{{item.name}}</view>
        </view>
      </view>

      <!-- 专区 -->
      <!-- <view class="specialArea">
        <view class="item">
          <image class="icon" src="https://yunbei.lianmengfu.net/xcxpic/index/8.png" mode="aspectFit"></image>
        </view>
        <view class="item">
          <image class="icon" src="https://yunbei.lianmengfu.net/xcxpic/index/11.png" mode="aspectFit"></image>
        </view>
      </view> -->

      <view class="specialArea">
        <view class="exclusive">
          <view class="title">
            <image class="vipLogo" src="https://yunbei.lianmengfu.net/xcxpic/index/4.png" mode="aspectFit" /> 会员专属特权
          </view>

          <view class="openPlus" @click="jump({type:'/pages/individualAccount/Collection/index'})">
            <view class="title">
              <image class="vipLogo" src="https://yunbei.lianmengfu.net/xcxpic/index/3.png" mode="aspectFit" /> 会员专属特权
            </view>
            <view class="collect">
              领1200元全品券包
            </view>
            <view class="bing">立即开通</view>
          </view>

          <view class="commodity">
            <scroll-view class="scroll-view_H" scroll-x="true">
              <view class="scroll-view-item_H" v-for="(item,index) in imgUrl.member_goods" :key="index">
                <image :src="item.icon" mode="aspectFill" @tap="go({t:1,url:'/yb_wm/my/integral/details?id='+item.id + '&qrcodeId='+ 0})" />
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="seckill">
          <view class="seckillTime">
            <view class="seckillText">全场秒杀</view>
            <uni-countdown :show-day="false" :font-size="10" color="#FFFFFF" :hour="24" :minute="0" :second="0" @timeup="timeup" />
          </view>

          <!-- 轮播 -->
          <swiper class="swiper" autoplay="true" circular="true" interval="3000">
            <swiper-item v-for="(item ,index) in indexlist" :key="index">
              <view class="seckillList" @tap="go({t:1,url:'/yb_wm/my/integral/details?id='+item.id + '&qrcodeId='+ 0})">
                <image class="seckillIcon" :src="item.icon" mode="aspectFill" />
                <view class="price">
                  <text class="originalPrice">¥{{item.money}}</text>
                  <text class="actual">¥{{item.price}}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>

          <view class="hotTitle">热门套餐</view>

          <!-- 轮播 -->
          <swiper class="swiper" autoplay="true" circular="true" interval="3000">
            <swiper-item v-for="(item ,index) in imgUrl.hot_combo" :key="index">
              <view class="setMeal" @tap="go({t:1,url:'/yb_wm/my/integral/details?id='+item.id + '&qrcodeId='+ 0})">
                <view class="setMealTitle">精选组合，超值特惠</view>
                <image class="setMealImg" :src="item.icon" mode="aspectFill" />
              </view>
            </swiper-item>
          </swiper>

        </view>
      </view>

      <!-- 洗浴券免费领取 -->
      <view class="timeLimit">
        <swiper class="swiper-box" @change="change" autoplay="true" circular="true" interval="3000">
          <swiper-item v-for="(item ,index) in 1" :key="index">
            <view class="swiper-item" @click="jump({type:'/yb_wm/order/coupon-bag/qbxq?id=1'})">
              <image src="https://yunbei.lianmengfu.net/xcxpic/index/12.png" mode="aspectFit" />
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- 底部列表 -->
      <view class="bottomHot">热销推荐</view>
      <view class="bottomList">
        <view class="leftBox">
          <view v-for="(item,index) in bottomList" :key="index" @click="jumpDetails(item)">
            <view class="item" v-if="index % 2==0">
              <image class="itemImg" :src="item.icon" mode="aspectFit" />
              <view class="orderName">{{item.name}}</view>
              <view class="itemPricr">
                <view class="price">¥{{item.price}}</view>
                <!-- <view class="sale">已出售0+</view> -->
              </view>
            </view>
          </view>
        </view>
        <view class="rightBox">
          <view v-for="(item,index) in bottomList" :key="index" @click="jumpDetails(item)">
            <view class="item" v-if="index % 2 ==1">
              <image class="itemImg" :src="item.icon" mode="aspectFit" />
              <view class="orderName">{{item.name}}</view>
              <view class="itemPricr">
                <view class="price">¥{{item.price}}</view>
                <!-- <view class="sale">已出售0+</view> -->
              </view>
            </view>
          </view>

        </view>
      </view>

      <view style="height:50rpx"></view>
    </view>

    <!-- logo -->
    <!-- <view class="logo">
      <view class="logoImg"></view>
      <view class="cashier" @click="cashier">收银台</view>
    </view> -->
  </view>
</template>

<script>
import { goodRankType, pageImage } from "@/api/index.js";
import fixedSet from '@/components/drag/fixed.vue';
import { goodsList } from "@/api/shop.js";
export default {
  data: function () {
    return {
      indexlist: [],
      allList: [],
      imgUrl: [],//顶部轮播图
      titleBg: '#0000',
      Top: 0,
      activeList: [{
        url: 'https://yunbei.lianmengfu.net/xcxpic/icon/index1.png',
        name: '扫码点单',
        type: '/pages/tabbar/order/index'
      }, {
        url: 'https://yunbei.lianmengfu.net/xcxpic/icon/index2.png',
        name: '推荐有礼',
        type: '/pages/tabbar/shop/index'
      }, {
        url: 'https://yunbei.lianmengfu.net/xcxpic/icon/index3.png',
        name: '积分商城',
        type: '/pages/tabbar/shop/index'
      }, {
        url: 'https://yunbei.lianmengfu.net/xcxpic/icon/index4.png',
        name: '今日特惠',
        type: '/pages/tabbar/order/index'
      }],
      leftView: false,//是否显示左侧按钮
      money: "",
      params: {
        money: "",
        storeId: "",
        userNote: "",
        useCouponId: ""
      },
      shopinfo: {},
      mdconfig: null,
      loading: !1,
      kyhb: {
        n: 0,
        data: []
      },
      couponInfo: null,
      show: 1,
      isshow: false,
      arr: {
        userId: "",
        location: "2",
        storeId: "1"
      },
      orderId: '',
      yhj: {},
      RechargeList: [],
      zfshow: false,
      bordershow: 0,
      users: {},
      userTel: '',
      userId: "",


      storeList: '',
      storename: '',
      storeposition: '',
      sheetopen: false,
      bottomList: []
    }
  },
  components: {
    fixedSet,
  },
  onLoad() {
    // 获取门店列表
    this.$api.shop_store__list({}).then(r => {
      this.storeList = r;
      this.storename = r[0].name;
      this.storeposition = r[0].address;
      let storeid = r[0].id;

      uni.setStorage({
        key: 'storeinfo',
        data: {
          storename: this.storename,
          storeposition: this.storeposition,
          storeid: storeid
        }
      });
    });

    this.pageImage()
    this.goodRankType()
    this.setGoodsList({
      typeId: '',
      page: 1,
      size: 10,
      sort: 1
    })
    this.setGoodsList()
  },
  computed: {
  },
  methods: {
    //轮播图
    change(e) {
      this.current = e.detail.current;
    },
    // 秒杀倒计时结束触发
    timeup() {

    },

    // 活动列表
    setGoodsList(data) {
      goodsList(data).then(res => {
        if (data) {
          this.indexlist = res.data
        } else {
          this.allList = res.data
        }
      })
    },

    // 顶部轮播图
    pageImage() {
      pageImage().then(res => {
        this.imgUrl = res.data
      })
    },

    select() {
      return
      uni.navigateTo({
        url: '/yb_wm/shop/select/index'
      })
    },

    jumpDetails(event) {
      uni.navigateTo({
        url: '/yb_wm/shop/out/goods-dl?gid=' + event.id + '&storeId=' + this.arr.storeId
      })
    },

    jump(event) {
      if (event.name) {
        uni.switchTab({
          url: event.type
        });
      } else {
        uni.navigateTo({
          url: event.type
        })
      }
    },

    goodRankType() {
      goodRankType({
        storeId: this.arr.storeId,
        type: 1,
        ids: '1,2,3,4,5,6,7,8,9,10'
      }).then(res => {
        this.bottomList = res.data
      })
    },

    changeStore() {
      var _this = this;
      let list = [];
      this.storeList.map((item, index) => {
        list.push(item.name)
      });
      uni.showActionSheet({
        itemList: list,
        success: function (res) {
          _this.storename = _this.storeList[res.tapIndex].name;
          _this.storeposition = _this.storeList[res.tapIndex].address;
          let storeid = _this.storeList[res.tapIndex].id;
          // 切换后存储本地
          uni.setStorage({
            key: 'storeinfo',
            data: {
              storename: _this.storename,
              storeposition: _this.storeposition,
              storeid: storeid
            }

          });
        },
        fail: function (res) {
        }
      });
    },
    cashier() {
      //旧的收款
      //   uni.navigateTo({
      //     url: "../shop/in/dmf"
      //   })

      //新的收款
      uni.navigateTo({
        url: '/pages/individualAccount/Collection/index'
      })
    },
  },

  onPageScroll: function (e) {
    this.titleBg = 'rgba(255,192,70,' + e.scrollTop / 100 + ')';
    this.Top = `-${e.scrollTop * 2}rpx`;
  },

  //   onReachBottom: function () {
  //     uni.stopPullDownRefresh()
  //   },

  //   onPullDownRefresh: function () {
  //     uni.stopPullDownRefresh()
  //   }
}
</script>

<style>
page {
  background: #fff !important;
}
</style>
<style lang="scss" scoped>
.bg {
  width: 750rpx;
  height: 380rpx;
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  background: url("https://yunbei.lianmengfu.net/xcxpic/icon/indexbg.png");
  background-size: 100% 100%;
}
.content {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 0rpx 30rpx;
  background: #ffffff;
  .Rotation {
    width: 690rpx;
    height: 306rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-top: 20rpx;
    .swiper-box,
    .swiper-item,
    image {
      width: 690rpx;
      height: 306rpx;
    }
  }
  .activeList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 50rpx;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 88rpx;
        height: 100rpx;
      }
      .name {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .specialArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10rpx;
    .item image {
      width: 330rpx;
      height: 188rpx;
      border-radius: 20rpx;
    }
    .exclusive {
      padding: 20rpx;
      width: 333rpx;
      background: linear-gradient(135deg, #fae198 0%, #fdd46f 100%);
      box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(0, 0, 0, 0.2);
      border-radius: 10rpx;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        .vipLogo {
          width: 50rpx;
          height: 50rpx;
          margin-right: 5rpx;
        }
      }
      .openPlus {
        width: 293rpx;
        background: #ffffff;
        border-radius: 18rpx;
        padding: 25rpx 0rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20rpx;
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #324397;
          .vipLogo {
            width: 44rpx;
            height: 44rpx;
            margin-right: 5rpx;
          }
        }
      }
      .collect {
        padding: 24rpx 0rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffb600;
      }
      .bing {
        width: 178rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        background: linear-gradient(180deg, #33469e 0%, #232861 100%);
        border-radius: 24rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fcd778;
      }
      .commodity {
        width: 293rpx;
        padding-top: 20rpx;
        .scroll-view_H {
          white-space: nowrap;
          .scroll-view-item_H {
            width: 135rpx;
            height: 135rpx;
            display: inline-block;
            margin-right: 30rpx;
            image {
              width: 100%;
              height: 100%;
              border-radius: 20rpx;
            }
          }
        }
      }
    }
    .seckill {
      padding: 30rpx 20rpx 10rpx 20rpx;
      width: 333rpx;
      background: #fff;
      box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(0, 0, 0, 0.2);
      border-radius: 10rpx;
      .seckillTime {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15rpx;
        .seckillText {
          font-size: 24rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #333333;
        }
        /deep/.uni-countdown__number {
          width: 35rpx;
          height: 30rpx;
          background: rgba(0, 0, 0, 0.67);
          border-radius: 4rpx;
        }
      }
      .swiper,
      .swiper-item {
        width: 302rpx;
        height: 180rpx;
        border-radius: 0rpx 0rpx 18rpx 18rpx;
        overflow: hidden;
        .seckillList {
          width: 302rpx;
          height: 180rpx;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 133, 10, 0.46) 100%
          );
          border-radius: 18rpx;
          display: flex;
          flex-direction: column;
          padding: 0rpx 17rpx;
          .seckillIcon {
            // width: 265rpx;
            width: 100%;
            height: 119rpx;
          }
          .price {
            padding-top: 16rpx;
            .originalPrice {
              font-size: 30rpx;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #ff7400;
            }
            .actual {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              padding: 0rpx 10rpx;
              text-decoration: line-through;
            }
          }
        }
        .setMeal {
          display: flex;
          flex-direction: column;
          .setMealTitle {
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            padding-bottom: 17rpx;
          }
          .setMealImg {
            width: 272rpx;
            height: 120rpx;
            border-radius: 15rpx;
          }
        }
      }
      .hotTitle {
        padding-top: 20rpx;
        font-size: 24rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .timeLimit {
    height: 210rpx;
    .swiper-box,
    .swiper-item,
    image {
      width: 690rpx;
      height: 210rpx;
    }
  }

  .bottomHot {
    font-size: 28rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    padding: 20rpx 0rpx;
  }
  .bottomList {
    display: flex;
    justify-content: space-between;
    .leftBox,
    .rightBox {
      width: 335rpx;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        flex-direction: column;
        width: 335rpx;
        background: #ffffff;
        box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(0, 0, 0, 0.24);
        border-radius: 10rpx;
        margin: 10rpx 0rpx;
        .itemImg {
          width: 335rpx;
          height: 270rpx;
        }
        .orderName {
          padding: 18rpx 14rpx 0rpx 14rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          display: -webkit-box; //谷歌
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; //显示几行
          overflow: hidden;
        }
        .itemPricr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10rpx 14rpx;
          .price {
            font-size: 22rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #ff7400;
          }
          .sale {
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
}
// .logo {
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   .logoImg {
//     width: 262rpx;
//     height: 252rpx;
//     background: url("https://yunbei.lianmengfu.net/xcxpic/icon/logo.png");
//     background-size: 100% 100%;
//   }
//   .cashier {
//     margin-top: 200rpx;
//     width: 320rpx;
//     height: 90rpx;
//     line-height: 90rpx;
//     text-align: center;
//     background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
//     border-radius: 45rpx;
//     font-size: 32rpx;
//     font-family: PingFangSC-Medium, PingFang SC;
//     font-weight: 500;
//     color: #ffffff;
//   }
// }
</style>