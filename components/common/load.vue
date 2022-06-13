<template>
	<view>
		<view class="posi-f wh bf t0 z9999 " :style="'z-index:'+zix+';'" v-if="type==1">
			<view class="animation_opactiy posi-f wh bf t0 l0 "></view>
			<view :class="['jzzc ',system.loadIcon?'':'f-c']">
				<mg-img class="" m="widthFix" :src="system.loadIcon" vueId="7e7e0d72-1" v-if="system.loadIcon"></mg-img>
				<view class="weui-loading " v-else></view>
			</view>
		</view>
		<view class="posi-f wh t0 z9999 skeletonbg " :hidden="!value" v-else></view>
	</view>
</template>

<script>
	export default {
		props: {
			zix: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "1"
			},
			value: {
				type: Boolean,
				default: !1
			}
		},
		computed: {},
		data: function() {
			return {};
		}
	}
</script>
<style scoped>
	@-webkit-keyframes backOpacity {
		0% {
			opacity: 0;
		}

		25% {
			opacity: .2;
		}

		50% {
			opacity: .5;
		}

		75% {
			opacity: .2;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes backOpacity {
		0% {
			opacity: 0;
		}

		25% {
			opacity: .2;
		}

		50% {
			opacity: .5;
		}

		75% {
			opacity: .2;
		}

		100% {
			opacity: 0;
		}
	}

	.animation_opactiy {
		animation: backOpacity 1s ease-in-out infinite;
	}

	.jzzc {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.weui-loading {
		width: 80rpx;
		height: 80rpx;
	}
</style>