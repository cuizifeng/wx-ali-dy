<template>
	<button class="image-btn xc-border-radius0" :class="{'disabled':unable}" :style="{backgroundColor: bgColor}"
		@click="onClick()">
		<text class="i iconfont" :class="icon" :style="{color:iconColor}"></text>
		<text class="span" :style="{color: titleColor}">{{title}}</text>
	</button>
</template>
<script>
	export default {
		name: 'image-btn01',
		meta: {
			descr: '水平排列-带图片按钮'
		},
		props: {
			icon: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			iconColor: {
				type: String,
				default: '#294d7c'
			},
			titleColor: {
				type: String,
				default: '#294d7c'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				unable: false
			}
		},
		methods: {
			onClick() {
				if (!this.disabled && !this.unable) {
					this.$emit("click");
					this.unable = true;
					setTimeout(() => {
						this.unable = false;
					}, 500);
				}
			}
		},
		watch: {
			disabled: function(newVal, oldVal) {
				this.unable = newVal;
			}
		}
	}
</script>
<style scoped>
	.image-btn {
		height: 96rpx;
		border: none;
	}

	.image-btn .i {
		font-size: 32rpx;
	}

	.image-btn .span {
		margin-left: 16rpx;
		font-size: 26rpx;
		line-height: 38rpx;
	}

	.disabled {
		background-color: #ffffff;
		opacity: 0.3;
	}
</style>