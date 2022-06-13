<template>
	<view class="ynGalleryPanel">
		<view class="gallerypanel" style="filter:brightness(1);border-radius:1upx"
			:style="{'height':galleryheight+'rpx','width':'100%'}">
			<scroll-view class="scroll-view" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft"
				@scroll="scroll">
				<!-- scroll-view-panle 容纳左右空块+中间img块 -->
				<view class="scroll-view-panle" @touchend='touchEndHandle' @touchstart='touchStartHandle'
					@touchmove='touchMoveHandle'>
					<!-- 左侧留空 必须用min-width属性 用width属性无效-->
					<view class="leftview" :style="{'min-width':2*150+'rpx','height':galleryheight+'rpx'}"></view>
					<!-- 中间图像横向列表 ==-->
					<!-- 外层 高度与画廊高度一样 -->
					<view :id="'imgviewpanel'+index" :ref="'imgviewpanel'+index" class="item" :class="[curentIndex == index? 'item1 trans-fadeout':
						curentIndex == index+1?'item2':
						curentIndex == index-1?'item2':
						curentIndex == index+2?'item3':
						curentIndex == index-2?'item3':
						  '']" @click="itemClick(index)" v-for="(item,index) in list" :key="index"
						:style="{'height':galleryheight+'rpx'}">
						<view>{{item.value}}</view>
						<view>{{item.label}}</view>
						<!-- </view> -->
					</view>
					<!-- 右侧留空  必须用min-width属性 用width属性无效-->
					<view class="rightview" :style="{'min-width':2*150+'rpx','height':galleryheight+'rpx'}"></view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'ynGallery',
		props: {
			value: {
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			},
			galleryheight: {
				type: Number,
				default: 180
			},
		},

		data() {
			return {
				meta: {
					title: '抢购模块的时间导航栏',
					desc: '兔拍拍专用,5栏,中间缩放1.4透明度1,次级缩放1透明度0.8,最外层2栏缩放0.8透明度0.6'
				},
				offset: 0,
				//这个用来定位具体的位置
				scrollLeft: 0,
				//滚动组件内视图块数据定义
			};
		},
		created: function() {
			// this.upDataScrollviewLayout(0)
		},
		computed: {
			list() {
				return this.options;
			},
			curentIndex: {
				get: function() {
					return this.value;
				},
				set: function(e) {
					this.$emit('input', e)
				}
			}
		},
		mounted: function() {
			this.setScrollLeft()
		},
		methods: {
			setScrollLeft() {
				this.$nextTick(() => {
					this.scrollLeft = (this.curentIndex) * 75 + Math.random()
				})
			},
			itemClick(index) {
				this.curentIndex = index;
				this.setScrollLeft()
			},
			endscroll: function(e) {},
			//实时监控scrol位置  计算焦点图中点偏移
			scroll: function(e) {
				this.offset = e.detail.scrollLeft;
				this.curentIndex = Math.round(this.offset / 75);
			},

			touchStartHandle(e) {},
			touchMoveHandle(e) {
				// 手指滑动中
			},
			touchEndHandle(e) {
				this.setScrollLeft()
				this.$emit('confirm', this.curentIndex);
			},
		},

	}
</script>

<style lang="scss" scoped="">
	//画廊总容器 静态样式放这里  动态样式放template
	.gallerypanel {
		.scroll-view {
			.scroll-view-panle {
				display: flex;
				height: 100%;
				width: 100%;
				white-space: nowrap;
			}
		}
	}

	* {
		-webkit-overflow-scrolling: touch;
	}

	// 呼吸帧
	@keyframes living {
		0% {
			// transform-origin:'center bottom';
			transform: scale(1);
			opacity: 1;
		}

		50% {
			// transform-origin:'center bottom';
			transform: scale(1.05);
			opacity: 1;
			/*圆形放大的同时，透明度逐渐减小为0*/
		}

		100% {
			// transform-origin:'center bottom';
			transform: scale(1);
			opacity: 1;
		}
	}

	.trans-fadeout {
		//    -webkit-transition:all 0.2s linear;
		//    -moz-transition:all 0.2s linear;
		//    -ms-transition:all 0.2s linear;
		//    -o-transition:all 0.2s linear;
		// background: blue;
		animation: living 1.5s ease-in-out 1;
	}

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		flex-shrink: 0;
		width: 150rpx;
	}

	.item1 {
		height: 180rpx;
		color: #fff;
		font-size: 45rpx;
		width: 210rpx;
	}

	.item2 {
		height: 180rpx;
		color: rgba(255, 255, 255, 0.8);
		width: 150rpx;
		font-size: 36rpx;
	}

	.item3 {
		height: 180rpx;
		width: 105rpx;
		color: rgba(255, 255, 255, 0.5);
		font-size: 29rpx;
	}
</style>