<template>
	<view class="base-item">
		<text class="i iconfont" :class="icon" :style="{color: iconColor}"></text>
		<text class="span title">{{title}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'baseItem',
		meta: {
			descr: '基础信息'
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			iconColor: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style scoped>
	.base-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
	}

	.base-item .i {
		font-size: 40rpx;
	}

	.base-item .title {
		margin-left: 20rpx;
		text-align: left;
		font-size: 26rpx;
		line-height: 38rpx;
		color: #4d4d4d;
	}
</style>