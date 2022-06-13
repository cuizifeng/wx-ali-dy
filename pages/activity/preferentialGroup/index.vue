<!-- 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏, 用法比sticky复杂, 但APP端可兼容低端机 -->
<template>
  <view>
    <navBar :title="'优惠拼团'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <!-- 菜单 (悬浮,预先隐藏)-->
    <me-tabs v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="tabChange"></me-tabs>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" @scroll="scroll" @topclick="topClick">
      <!--轮播-->
      <view class="content">
        <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
          <swiper class="swiper-box" @change="change" :current="swiperDotIndex" :circular="circular" :previous-margin="50" :next-margin="40">
            <swiper-item v-for="(item, index) in 3" :key="index">
              <image class="img" :class="[index == current ? 'active' : 'noactive']" src="https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" mode="" />
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>

      <!-- 菜单 (在mescroll-uni中不能使用fixed,否则iOS滚动时会抖动, 所以需在mescroll-uni之外存在一个一样的菜单) -->
      <view id="tabInList">
        <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs>
      </view>

      <!-- 数据列表 -->
      <setList></setList>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import meTabs from '@/components/me-tabs/index.vue'
import setList from './components/list.vue'
// import { apiGoods } from "@/api/mock.js"

export default {
  mixins: [MescrollMixin], // 使用mixin
  components: {
    meTabs,
    setList
  },
  data() {
    return {
      goods: [], // 数据列表
      upOption: {
        // 如果用mescroll-uni 则需要onScroll: true, 且需要 @scroll="scroll"; 而mescroll-body最简单只需在onPageScroll处理即可
        // onScroll: true // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
        // use: false,
      },
      tabs: [{ name: '全部', type: 'xx' }, { name: '套餐', type: 'xx' }, { name: '按摩', type: 'xx' }, { name: '客房', type: 'xx' }],
      tabIndex: 0, // tab下标
      navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
      isShowSticky: false, // 是否悬浮
      info: [{
        colorClass: 'uni-bg-red',
        url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
        content: '内容 A'
      },
      {
        colorClass: 'uni-bg-green',
        url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
        content: '内容 B'
      },
      {
        colorClass: 'uni-bg-blue',
        url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
        content: '内容 C'
      }
      ],
      modeIndex: -1,
      styleIndex: -1,
      circular: true,
      current: 0,
      mode: 'dot',
      dotsStyles: {
        border: 'none',
        selectedBackgroundColor: '#FD5C1D',
        selectedBorder: '#DDDDDD'
      },
      swiperDotIndex: 0
    }
  },
  methods: {
    change(e) {
      this.current = e.detail.current
    },
    clickItem(e) {
      this.swiperDotIndex = e
    },
    /*下拉刷新的回调 */
    downCallback() {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      if (this.isChangeTab) {
        this.mescroll.hideUpScroll(); // 切换菜单,不显示mescroll进度, 显示系统进度条
        uni.showLoading();
      }
      let curTab = this.tabs[this.tabIndex]
      let keyword = curTab.name // 具体项目中,您可能取的是tab中的type,status等字段
      //   apiGoods(page.num, page.size, keyword).then(res => {
      //联网成功的回调

      //设置列表数据
      if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
      this.goods = this.goods.concat([{
        icon: "https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/09/02/202109020233227327.jpg",
        id: "1",
        name: "方便面",
      }, {
        icon: "https://yunbei.lianmengfu.net/web/static/yb_wm/1/2021/09/02/202109020233227327.jpg",
        id: "1",
        name: "方便面",
      }]); //追加新数据

      // 数据渲染完毕再隐藏加载状态 this.$nextTick在iOS真机不触发,需改成setTimeout
      // this.$nextTick(()=>{
      setTimeout(() => {
        this.mescroll.endSuccess(2);
        // 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
        // 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
        if (!this.navTop) this.setNavTop()
        // 保持tab悬浮,列表数据显示第一条
        if (this.isChangeTab) {
          this.isChangeTab = false;
          uni.hideLoading();
          if (this.isShowSticky) this.mescroll.scrollTo(this.navTop, 0)
        }
      }, 20)
      //   }).catch(() => {
      //     //联网失败, 结束加载
      //     this.mescroll.endErr();
      //   })
    },
    // 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的navTop数值是最精确的)
    setNavTop() {
      let view = uni.createSelectorQuery().select('#tabInList');
      view.boundingClientRect(data => {
        // console.log('tabInList基本信息 = ' + JSON.stringify(data));
        this.navTop = data.top // 到屏幕顶部的距离
      }).exec();
    },
    // mescroll-uni的滚动事件 (需在up配置onScroll:true才生效)
    // 而mescroll-body最简单只需在onPageScroll处理即可
    scroll() {
      //   console.log('滚动条位置 = ' + this.mescroll.getScrollTop() + ', navTop = ' + this.navTop);
      // 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏
      if (this.mescroll.getScrollTop() >= this.navTop) {
        this.isShowSticky = true // 显示悬浮菜单
      } else {
        this.isShowSticky = false // 隐藏悬浮菜单
      }
    },
    // 点击回到顶部按钮时,先隐藏悬浮菜单,避免闪动
    topClick() {
      this.isShowSticky = false
    },
    // 切换菜单
    tabChange() {
      this.isChangeTab = true;
      this.mescroll.resetUpScroll()
    }
  },
  // 使用mescroll-body最简单只需在onPageScroll处理即可
  onPageScroll(e) {
    // console.log('滚动条位置 = ' + e.scrollTop + ', navTop = ' + this.navTop);
    if (e.scrollTop >= this.navTop) {
      this.isShowSticky = true // 显示悬浮菜单
    } else {
      this.isShowSticky = false // 隐藏悬浮菜单
    }
  }
}
</script>
<style>
page {
  /* background: #fff; */
}
</style>
<style lang="scss" scoped>
.content {
  width: 750rpx;
  height: 400rpx;
  padding: 30rpx 0rpx 20rpx 0rpx;
  .uni-swiper-dot-box,
  .swiper-box,
  swiper-item {
    width: 750rpx;
    height: 370rpx;
  }
  .img {
    width: 560rpx;
    height: 301rpx;
    border-radius: 20rpx;
    // margin: 0rpx 20rpx;
  }
  .active {
    scale: 1;
  }
  .noactive {
    scale: 0.9;
  }
}
.demo-tip {
  padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}
/deep/.uni-swiper__dots-item {
  width: 16rpx !important;
  height: 16rpx !important;
}
</style>
