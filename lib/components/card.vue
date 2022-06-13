<template>
	<view class="card">
		<view class="span card-title">
			<view class="a xc-flex-1">{{title}}</view>
			<slot name="menu"></slot>
		</view>
		<text class="span u-border-bottom"></text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'card',
		props: {
			title: {
				type: String,
				default: "卡片"
			},
		}
	}
</script>
<style scoped>
	.card {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-top: 20rpx;
		padding: 0 30rpx 30rpx 30rpx;
	}

	.card .card-title {
		height: 70rpx;
		display: flex;
		flex-direction: row;
		color: #4d4d4d;
		text-align: left;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 70rpx;
	}
</style>