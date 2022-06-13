/* 
        <view>
            <u-tabs-swiper ref="uTabs" :list="navList" :current="current" @change="tabsChange" :is-scroll="false"
             swiperWidth="750"></u-tabs-swiper>
        </view>
        <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
            <swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
                <scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
                    ...
                </scroll-view>
            </swiper-item>
        </swiper>

    import uTabsSwiperMixin from '@/lib/mixins/uTabsSwiperMixin'

    mixins:[uTabsSwiperMixin],
*/
export default {
    data() {
        return {
            navList: [{ name: '' }],
            // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
        };
    },
    methods: {
        // tabs通知swiper切换
        tabsChange(index) {
            this.swiperCurrent = index;
        },
        // swiper-item左右移动，通知tabs的滑块跟随移动
        transition(e) {
            let dx = e.detail.dx;
            this.$refs.uTabs.setDx(dx);
        },
        // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
        // swiper滑动结束，分别设置tabs和swiper的状态
        animationfinish(e) {
            let current = e.detail.current;
            console.log('current: ', current);
            this.$refs.uTabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        // scroll-view到底部加载更多
        onreachBottom() {
        }
    }
};