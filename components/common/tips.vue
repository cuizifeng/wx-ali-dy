<template>
	<view @tap="close" class="tipsc f26 f-row " v-if="showTips">
		<view class="">点击“...”添加到我的小程序，首页下拉即可快速访问哦</view>
		<view class="f-g-0 tipx f-c bsf ">
			<text class="iconfont iconx cf f14 "></text>
		</view>
		<view class="posi-a triangle-up "></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "tips",
		components: {},
		props: {
			name: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {};
		},
		methods: {
			close: function() {
				this.$store.state.showTips = !1, uni.setStorageSync("tips", !0);
			}
		},
		computed: {
			...mapState(["showTips"])
		},
		watch: {}
	}
</script>
<style scoped>
	.tipsc {
		position: fixed;
		background: #fff;
		z-index: 10;
		width: 450rpx;
		padding: 20rpx;
		top: 30rpx;
		right: 20rpx;
		border-radius: 8rpx;
		box-shadow: 0 0rpx 10rpx 7rpx #d1d1d1;
	}

	.tipx {
		background: #e8e8e8;
		width: 40rpx;
		height: 40rpx;
	}

	.f14 {
		font-size: 14rpx;
	}

	.triangle-up {
		top: -20rpx;
		right: 100rpx;
		width: 0;
		height: 0;
		border-left: 15rpx solid transparent;
		border-right: 15rpx solid transparent;
		border-bottom: 20rpx solid #fff;
	}
</style>