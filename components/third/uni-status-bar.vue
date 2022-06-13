<template>
	<view class="uni-status-bar" :style="'height:'+statusBarHeight+';'">
		<slot></slot>
	</view>
</template>

<script>
	var e = uni.getSystemInfoSync().statusBarHeight + "px";
	export default {
		name: "UniStatusBar",
		data: function() {
			return {
				statusBarHeight: e
			};
		},
		created: function() {}
	};
</script>
<style scoped>
	.uni-status-bar {
		display: block;
		width: 100%;
		height: 20px;
		height: 25px;
	}
</style>