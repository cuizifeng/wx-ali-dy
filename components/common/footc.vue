<template>
	<view class="bfooter f-c-c c9 f26 t-c ">
		<view @tap="" class="f-c ">
			<view class="" v-if="system.copyright.support">{{system.copyright.support}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "footc",
		props: {
			bottom: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {};
		}
	}
</script>
<style scoped>
	.bfooter {
		padding: 20rpx 20rpx 20rpx;
	}

	.footimg {
		width: 40rpx;
		height: 40rpx;
	}
</style>