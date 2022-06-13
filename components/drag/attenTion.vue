<template>
	<view @tap="close" class="tipsc f26 f-row " :style="'top:'+(uni.getSystemInfoSync().statusBarHeight + 44)+'px'+';'"
		v-if="showTips">
		<view class="f-1 f-y-c ">
			<view class="img f-g-0 bsf mr20 ">
				<mg-img class="" :src="co.img" vueId="22061a28-1"></mg-img>
			</view>
			<view class="">{{co.text}}</view>
		</view>
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
		name: "attenTion",
		components: {},
		props: ["co"],
		data: function() {
			return {};
		},
		methods: {
			close: function() {
				this.$store.state.config.showTips = !1, uni.setStorageSync("tips", !0);
			}
		},
		computed: {
			...mapState({
				showTips: t => t.config.showTips
			})
		},
	}
</script>

<style scoped>
	.tipsc {
		position: fixed;
		background: #fff;
		z-index: 10;
		width: 520rpx;
		padding: 20rpx;
		right: 10px;
		border-radius: 8rpx;
		box-shadow: 0 0rpx 8rpx 3rpx #d1d1d1;
	}

	.tipsc .img {
		width: 60rpx;
		height: 60rpx;
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
		top: -16rpx;
		right: 57px;
		width: 0;
		height: 0;
		border-left: 15rpx solid transparent;
		border-right: 15rpx solid transparent;
		border-bottom: 20rpx solid #fff;
	}
</style>