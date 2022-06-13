<template>
	<view :class="[ '','am-popup',className,[value?'am-popup-show':''],[animation?'animation':''] ]">
		<view @tap="maskTap" class="am-popup-mask " :style="{ zIndex: zIndex, transitionDuration: dhsj }" v-if="mask"></view>
		<view :class="['am-popup-content ',position]" :style="'z-index:'+zIndex+';'+'transition-duration:'+dhsj+';'">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		props: {
			className: {
				type: String,
				default: ""
			},
			value: {
				type: Boolean,
				default: !1
			},
			position: {
				type: String,
				default: "bottom"
			},
			mask: {
				type: Boolean,
				default: !0
			},
			animation: {
				type: Boolean,
				default: !0
			},
			zIndex: {
				type: [Number, String],
				default: "999"
			},
			close: {
				type: [Boolean, String],
				default: !0
			},
			msname: Object,
			dhsj: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {};
		},
		computed: {},
		methods: {
			maskTap: function() {
				this.close && this.$emit("input", !1);
			}
		}
	}
</script>
<style scoped>
	.am-popup-content {
		position: fixed;
	}

	.am-popup-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .6);
		opacity: 0;
		pointer-events: none;
	}

	.left {
		transform: translateX(-100%);
		left: 0;
		top: 0;
		bottom: 0;
	}

	.right {
		transform: translateX(100%);
		right: 0;
		top: 0;
		bottom: 0;
	}

	.top {
		top: 0;
		left: 0;
		width: 100vw;
		transform: translateY(-100%);
	}

	.bottom {
		bottom: 0;
		left: 0;
		width: 100vw;
		transform: translateY(100%);
	}

	.am-popup-show .am-popup-content {
		transform: none;
	}

	.am-popup-show .am-popup-mask {
		opacity: 1;
		pointer-events: auto;
	}

	.am-popup.animation .am-popup-content {
		transition: all .15s linear;
	}

	.am-popup.animation .am-popup-mask {
		transition: all .15s linear;
	}

	.middle {
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0) scale(.6);
		opacity: 0;
		visibility: hidden;
	}

	.am-popup-show .middle {
		visibility: visible;
		transform: translate3d(-50%, -50%, 0) scale(1);
		opacity: 1;
	}
</style>