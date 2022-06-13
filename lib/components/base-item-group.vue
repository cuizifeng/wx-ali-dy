<template>
	<view class="base-item-group">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'baseItemGroup',
		props: {}
	}
</script>
<style scoped>
	.base-item-group {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
</style>