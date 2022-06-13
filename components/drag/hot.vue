<template>
	<view class="hot o-h "
		:style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'+'border-radius:'+co.circle+u+';'">
		<mg-img class="" cname="imgha" m="widthFix" :src="co.img" vueId="5596130e-1"></mg-img>
		<view @tap="goTo(v)" class="react "
			:style="'width:'+v.width+'rpx'+';'+'height:'+v.height+'rpx'+';'+'left:'+'10rpx'+';'+'top:'+'10rpx'+';'+'transform:'+'translateX('+v.sX+'rpx) translateY('+v.sY+'rpx)'+';'"
			v-for="(v, i) in co.divStyles" :key="i"></view>
	</view>
</template>


<script>
	export default {
		name: "hot",
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
			goTo: function(n) {
				n.url.params || (n.url = JSON.parse(n.url)),
					this.goUrl(n.url, n);
			}
		}
	}
</script>
<style scoped>
	.hot {
		height: auto;
		position: relative;
		transform: translateZ(0);
	}

	.react {
		border: 1px solid #38f;
		background: rgba(51, 136, 255, .5);
		color: #fff;
		position: absolute;
		user-select: auto;
		opacity: 0;
	}
</style>