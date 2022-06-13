<template>
	<view class="titles o-h "
		:style="'margin-top:'+co.marginTop+u+';'+'margin-bottom:'+co.marginBottom+u+';'+'margin-left:'+co.marginLR+u+';'+'margin-right:'+co.marginLR+u+';'+'border-radius:'+co.circle+u+';'">
		<view class="titles-c f-y-c " :style="'background:'+co.colorBg+';'">
			<view @tap="goLink(co.upLoad1)" :class="['f-1 f-y-c ',co.wordStatus=='center'?'f-x-c':'']">
				<view class="img f-g-0 mr10 " v-if="co.upLoad1.img">
					<mg-img :src="co.upLoad1.img" vueId="7894f60a-1"></mg-img>
				</view>
				<view class="f32 wei l-n " :style="'color:'+co.upLoad1.colorWord+';'">{{co.upLoad1.text}}</view>
			</view>
			<view @tap="goLink(co.upLoad2)" class="f-y-c ">
				<view class="f24 c9 " :style="'color:'+co.upLoad2.colorWord+';'">{{co.upLoad2.text}}</view>
				<view class="img ml10 " v-if="co.upLoad2.img">
					<mg-img :src="co.upLoad2.img" vueId="7894f60a-2"></mg-img>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "titles",
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
			goLink: function(n) {
				this.goUrl(n.url);
			}
		},
		created: function() {}
	}
</script>
<style scoped>
	.titles-c {
		padding: 15rpx 20rpx;
	}

	.titles-c .img {
		width: 48rpx;
		height: 48rpx;
	}
</style>