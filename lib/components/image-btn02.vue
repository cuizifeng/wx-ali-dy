<template>
	<button class="image-btn02 xc-flex xc-flex-column xc-border-radius0" :disabled="disabled"
		:style="{backgroundColor: background, color: color}" @click="onClick()">
		<text class="i iconfont" :class="icon"></text>
		<text class="span">
			{{title}}
			<slot></slot>
		</text>
	</button>
</template>

<script>
	export default {
		name: 'image-btn02',
		meta: {
			descr: '垂直排列-带图片按钮'
		},
		props: {
			icon: {
				type: String,
				required: true
			},
			title: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#294d7c'
			},
			background: {
				type: String,
				default: '#FFFFFF'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick() {
				this.$emit('click');
			}
		},
	}
</script>
<style scoped>
	.image-btn02 {
		border: none;
		height: 96rpx;
		padding: 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		line-height: 1;
	}

	.image-btn02:active {
		opacity: 0.7;
	}

	.image-btn02 .i {
		font-size: 30rpx;
	}

	.image-btn02 .span {
		margin-top: 8rpx;
		font-size: 18rpx;
		line-height: 26rpx;
	}

	.image-btn02:disabled {
		background-color: #ffffff;
		opacity: 0.5;
	}
</style>