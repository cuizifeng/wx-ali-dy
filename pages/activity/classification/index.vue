<template>
  <!-- mescroll-body本质是原生page的滚动,无法像mescroll-uni那样用flex布局嵌在某个view中使用局部区域滚动, 但是可以通过fixed定位其他元素来实现"局部区域滚动"-->
  <view>
    <navBar :title="'分类'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <!-- 顶部 fixed定位 -->
    <!-- <view class="top-warp">
      <view>顶部区域</view>
      <view style="font-size: 24rpx;">mescroll-body 通过fixed定位其他元素,实现"局部区域滚动"</view>
    </view> -->

    <view class="searchBox">
      <view class="search">
        <uni-icons type="search" size="20"></uni-icons> 搜索关键词
      </view>
    </view>

    <!-- 左边 fixed定位 -->
    <scroll-view class="left-warp" :style="{'top':contentTop}" :scroll-y="true">
      <view class="tab" :class="{active:i==tabIndex}" v-for="(tab,i) in tabs" :key="i" @click="tabChange(i)">{{tab}}</view>
    </scroll-view>

    <!-- mescroll-body跟随page滚动, 不可fixed定位, 可设置 top, bottom, topbar, bottombar, safearea的偏移量-->
    <mescroll-body ref="mescrollRef" top="0" bottom="100" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <!-- <good-list :list="goods"></good-list> -->
      <setList></setList>
    </mescroll-body>

    <!-- 底部 fixed定位 -->
    <view class="bottom-warp"> </view>
  </view>
</template>


<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
// import { apiGoods, apiGetTabs } from "@/api/mock.js"
import setList from './components/list.vue'

export default {
  mixins: [MescrollMixin], // 使用mixin
  components: {
    setList,
  },
  data() {
    return {
      contentTop: (uni.getStorageSync('menuInfo').top + 80) + 'px',
      goods: [], // 数据列表
      //   tabs: [], // tabs异步获取
      tabs: ['全部', '奶粉', '面膜', '图书', '果汁', '奶瓶', '美素', '花王', '韩蜜', '口红', '毛巾', '玩具', '衣服', '果汁', '奶瓶', '美素', '花王', '韩蜜', '口红', '毛巾', '玩具', '衣服'],
      tabIndex: 0 // tab下标
    }
  },
  methods: {
    downCallback() {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.mescroll.resetUpScroll()
    },
    upCallback(page) {
      // tabs异步获取
      return
      if (this.tabs.length == 0) {
        apiGetTabs().then(res => {
          this.tabs = res
          this.mescroll.resetUpScroll() // 重新触发upCallback
        }).catch(() => {
          this.mescroll.endErr()
        })
        return // 此处return,先获取tabs
      }

      //联网加载数据
      let keyword = this.tabs[this.tabIndex]
      apiGoods(page.num, page.size, keyword).then(res => {
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endSuccess(res.list.length);
        //设置列表数据
        if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
        this.goods = this.goods.concat(res.list); //追加新数据
      }).catch(() => {
        //联网失败, 结束加载
        this.mescroll.endErr();
      })
    },
    // 切换菜单
    tabChange(i) {
      if (this.tabIndex != i) {
        this.tabIndex = i
        this.goods = []; // 先置空列表,显示加载进度条
        this.mescroll.resetUpScroll(); // 重置列表数据
      }
    }
  }
}
</script>


<style lang="scss">
/* 顶部 fixed定位*/
.top-warp {
  z-index: 200;
  position: fixed;
  top: var(--window-top);
  left: 0;
  width: 100%;
  height: 88rpx;
  padding-top: 10rpx;
  font-size: 28rpx;
  text-align: center;
  background-color: #fff;
}

/* 左边 fixed定位*/
.left-warp {
  z-index: 100;
  position: fixed;
  top: var(--window-top);
  left: 0;
  bottom: 100rpx;
  width: 160rpx;
  //   padding-top: 88rpx;
  background-color: #fff;
  border-radius: 0rpx 20rpx 0rpx 0rpx;
  .tab {
    font-size: 28rpx;
    padding: 28rpx;
    text-align: center;
    &.active {
      background-color: #f7f7f7;
    }
  }
}

// 设置padding
.mescroll-body,
/deep/.mescroll-body {
  padding-left: 180rpx;
}

/* 底部 fixed定位*/
.bottom-warp {
  z-index: 200;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
}
.searchBox {
  padding: 30rpx 30rpx;
  .search {
    width: 690rpx;
    height: 80rpx;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 18rpx 0rpx rgba(0, 0, 0, 0.02);
    border-radius: 45rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}
</style>