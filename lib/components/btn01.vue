<template>
	<button :disabled="disabled" :class="{'disabled': disabled}" :style="{backgroundColor: bgColor, color: color}"
		class="btn01 " @click="onClick()">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'btn01',
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: 'white'
			},
			bgColor: {
				type: String,
				default: '#294d7c'
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style scoped>
	.btn01 {
		font-size: 30rpx;
		font-weight: 500;
		color: white;
		height: 96rpx;
		line-height: 96rpx;
		border: none;
		padding: 0;
		border-radius: unset;
	}

	.btn01:after {
		border: none;
	}

	.btn01:active {
		opacity: 0.7;
	}

	.disabled {
		background-color: #ffffff;
		opacity: 0.5;
	}
</style>