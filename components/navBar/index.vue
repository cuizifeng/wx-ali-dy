<template>
  <view class="page_box">
    <!-- #ifdef MP-WEIXIN -->
    <view class="my_tab_title" :style="{height: contentTop, paddingTop:statusBarHeight,background:backgroundColor}">
      <view v-if="isType ==1">
        <view class="wordColor" :style="{color:wordColor}">{{title}}</view>
        <view v-if="leftView" class="menu_btn" :style="{ position: 'fixed',top:menuTop,left:menuRight,width:menuWidth,height:menuHeight,borderRadius:menuBorderRadius,}">
          <uni-icons @click="goToBack" class="arrowleft" type="back" :color="'#fff'" size="25" />
          <text class="text_box"></text>
          <uni-icons @click="goToHome" class="home" type="home" :color="'#fff'" size="25" />
        </view>
      </view>
      <view class="my_tab_title_item" v-else-if="isType ==2">
        <view class="scanCodeAli" @click="getCode">
          <uni-icons color="#fff" type="scan" size="30"></uni-icons>
        </view>
        <view class="sarchbox" @click="sarchBtn">
          <uni-icons type="search" size="20"></uni-icons>
          <text>搜索关键词</text>
        </view>
      </view>

    </view>
    <!-- #endif -->

    <!-- #ifdef MP-ALIPAY -->
    <view class="my_tab_title" :style="{height: contentTop, paddingTop:statusBarHeight,background:backgroundColor}">
      <view v-if="isType ==1">
        <view class="wordColor" :style="{color:wordColor}">{{title}}</view>
      </view>
      <view class="my_tab_title_item" v-else-if="isType ==2">
        <view class="scanCodeAli" @click="getCode">
          <uni-icons type="scan" size="30"></uni-icons>
        </view>
        <view class="sarchbox" @click="sarchBtn">
          <uni-icons type="search" size="20"></uni-icons>
          <text>搜索关键词</text>
        </view>
      </view>
    </view>
    <!-- #endif -->

    <view class="content_box" v-if="occupy" :style="{marginTop:contentTop}"></view>
    <slot name="userVip"></slot>
  </view>
</template>
<script>
export default {
  props: {
    title: { //标题
      type: String,
      default: ''
    },
    backgroundColor: { //背景
      type: String,
      default: '#fff'
    },
    wordColor: { //标题颜色
      type: String,
      default: '#000'
    },
    leftView: { //是否显示左胶囊
      type: Boolean | String,
      default: true
    },
    occupy: { //是否显示占位
      type: Boolean | String,
      default: true
    },
    isType: { //头部样式
      type: Number | String,
      default: 1
    }
  },
  data() {
    return {
      statusBarHeight: uni.getStorageSync('menuInfo').statusBarHeight,//状态栏的高度（可以设置为顶部导航条的padding-top）
      menuWidth: uni.getStorageSync('menuInfo').menuWidth,
      menuHeight: uni.getStorageSync('menuInfo').menuHeight,
      menuBorderRadius: uni.getStorageSync('menuInfo').menuBorderRadius,
      menuRight: uni.getStorageSync('menuInfo').menuRight,
      menuTop: uni.getStorageSync('menuInfo').menuTop,
      contentTop: uni.getStorageSync('menuInfo').contentTop,
    }
  },
  methods: {
    goToBack() {
      if (getCurrentPages().length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        uni.switchTab({
          url: '/pages/tabbar/index/index'
        })
      }
    },
    goToHome() {
      uni.switchTab({
        url: '/pages/tabbar/index/index'
      })
    },

    // 扫码
    getCode() {
      uni.scanCode({
        success: function (res) {
          console.log(res,);
          let user = JSON.parse(res.result);
          if (user.uid) {
            uni.navigateTo({
              url: '/pages/individualAccount/Collection/index'
            })
          }
        }
      });
    },

    sarchBtn() {
      uni.navigateTo({
        url: '/yb_wm/shop/search/out?api=' + 'good_select__good' + '&page=' + 'shopGoods'
      })
    }
  },
};
</script>

<style lang="less" scope>
.page_box {
  .my_tab_title {
    width: 100%;
    // height: 44px; //这个是固定的44px（所有小程序顶部高度都是 = 44px + 手机系统状态栏高度）
    // line-height: 44px;
    text-align: center;
    // background-color: #f1f;
    background-color: #f8f8f8;
    position: fixed;
    top: 0;
    z-index: 999;
    font-family: Monospaced Number, Chinese Quote, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif !important;
    font-size: 32rpx;
    color: #000;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    .my_tab_title_item {
      width: 750rpx;
      display: flex;
      align-items: center;
      .scanCodeAli {
        margin: 0rpx 20rpx;
      }
    }

    .menu_btn {
      background: rgba(0, 0, 0, 0.3);
      opacity: 0.88; //这个是小程序默认的标题栏背景色
      overflow: hidden;
      // position: fixed;//行内式写了固定定位--目的是去掉下划页面一起滚动问题
      .arrowleft {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-140%, -45%) !important;
        -webkit-transform: translate(-140%, -45%) !important;
      }
      .text_box {
        width: 1rpx;
        height: 20px;
        background-color: #ddd;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        -webkit-transform: translate(-50%, -50%) !important;
      }
      .home {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(40%, -45%) !important;
        -webkit-transform: translate(40%, -45%) !important;
      }
    }
  }
  .wordColor {
    width: 300rpx;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
    -webkit-line-clamp: 1; /* 控制最多显示几行 */
    -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  }
  .sarchbox {
    width: 439rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 18rpx 0rpx rgba(0, 0, 0, 0.02);
    border-radius: 45rpx;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    margin-right: 117rpx;
  }
}
</style>

