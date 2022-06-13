<!-- 菜单悬浮的原理: 通过给菜单添加position:sticky实现, 用法超简单, 仅APP端的低端机不兼容 https://caniuse.com/#feat=css-sticky -->
<template>
  <view>
    <navBar :title="'限时秒杀'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <!-- 对于mescroll-body: 需设置:sticky="true", 此应避免在mescroll-body标签前面加其他非定位的元素, 否则下拉区域会被挤出, 无法会隐藏.-->
    <!-- 对于mescroll-uni: 则无需设置:sticky="true", 无其他限制和要求 -->
    <mescroll-body :sticky="true" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <!-- sticky吸顶悬浮的菜单, 父元素必须是 mescroll -->
      <view class="sticky-tabs">
        <me-tabs v-model="tabIndex" :tabs="tabs" :fixed="fixed" @change="tabChange" :tab-width="150"></me-tabs>
      </view>
      <!-- 轮播图 -->
      <view class="imgList">
        <swiper class="swiper-box">
          <swiper-item v-for="(item ,index) in 6" :key="index">
            <image src="https://img1.baidu.com/it/u=902830885,4052311299&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500" mode="" />
          </swiper-item>
        </swiper>
      </view>

      <view class="sticky-tabs">
        <time-tabs v-model="tabIndex" :tabs="times" @change="tabChange" :tab-width="150"></time-tabs>
      </view>

      <setList></setList>
    </mescroll-body>

    <!-- 此处可以写其他fixed定位元素 -->
    <!-- <view></view> -->
  </view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import meTabs from './components/me-tabs.vue';
import timeTabs from './components/time-tabs.vue'
import setList from './components/list.vue'
export default {
  mixins: [MescrollMixin], // 使用mixin
  components: {
    meTabs,
    timeTabs,
    setList
  },
  data() {
    return {
      fixed: true,
      goods: [], // 数据列表
      tabs: [{ name: '温泉' }, { name: '足疗' }, { name: '按摩' }, { name: '餐饮' }, { name: '套餐' }, { name: '采耳' }, { name: '分类' }],
      times: [{ name: '10:00' }, { name: '9:00' }, { name: '8:00' }, { name: '7:00' }, { name: '6:00' }, { name: '5:00' }, { name: '4:00' }, { name: '3:00' }],
      tabIndex: 0 // tab下标
    }
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback() {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      let curTab = this.tabs[this.tabIndex]
      let keyword = curTab.name // 具体项目中,您可能取的是tab中的type,status等字段

      //   apiGoods(page.num, page.size, keyword).then(res => {
      if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
      this.goods = this.goods.concat([{}]); //追加新数据
      this.mescroll.endSuccess(1); // 隐藏加载状态栏
      //   }).catch(() => {
      //     //联网失败, 结束加载
      //     this.mescroll.endErr();
      //   })
    },
    // 切换菜单
    tabChange() {
      this.goods = []; // 置空列表,显示加载进度条
      this.mescroll.resetUpScroll()
    }
  }
}
</script>

<style lang="scss">
/*
	sticky生效条件：
	1、父元素不能overflow:hidden或者overflow:auto属性。(mescroll-body设置:sticky="true"即可, mescroll-uni本身没有设置overflow)
	2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
	3、父元素的高度不能低于sticky元素的高度
	4、sticky元素仅在其父元素内生效,所以父元素必须是 mescroll
	*/
.sticky-tabs {
  z-index: 990;
  position: sticky;
  top: var(--window-top);
  //   background-color: #fff;
}

// 使用mescroll-uni,则top为0
.mescroll-uni,
/deep/.mescroll-uni {
  .sticky-tabs {
    top: 0;
  }
}

.demo-tip {
  padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}
.imgList {
  width: 750rpx;
  padding: 20rpx 30rpx;
  .swiper-box,
  .swiper-item,
  image {
    width: 690rpx;
    height: 240rpx;
    border-radius: 20rpx;
  }
}
</style>
