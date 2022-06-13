<template>
	<view @tap="goTo" class="search " :style="'background:'+''+co.colorBg+';'">
		<view :class="['searchbd ',co.wordStatus=='center'?'f-c':'']"
			:style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'+'border-radius:'+''+co.circle+u+';'+'background:'+''+co.colorInput+';'">
			<text class="iconfont iconsearch mr10 " :style="'color:'+''+co.colorWord+';'"></text>
			<text class="f24 " :style="'color:'+''+co.colorWord+';'">{{co.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			u: {
				type: String,
				default: "px"
			}
		},
		data: function() {
			return {};
		},
		methods: {
			goTo: function() {
				this.go({
					url: "/yb_wm/shop/search/out?page=shopdl"
				});
			}
		}
	}
</script>
<style scoped>
	.search {
		padding: 25rpx;
	}

	.search .searchbd {
		height: 68rpx;
		border-radius: 20rpx;
		padding: 0 20rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.search .weui-input {
		height: 100%;
		line-height: 68rpx;
	}
</style>