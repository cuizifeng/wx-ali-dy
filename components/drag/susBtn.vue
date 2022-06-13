<template>
	<view :class="['susBtn posi-f p2 ',co.type=='left'?'l0':'r0']" :style="'top:'+co.shifting*2+'rpx'+';'"
		v-if="co.status==1">
		<view @tap="goTo(v)" class="imgc bf bsf f-c " v-for="(v, i) in co.imgUrl" :key="i">
			<view class="img ">
				<mg-img class="" :src="v.img" :vueId="'140191cb-1-'+i"></mg-img>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "susBtn",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data: function() {
			return {
				img: ""
			};
		},
		methods: {
			goTo: function(n) {
				this.goUrl(n.url, n);
			}
		},
		created: function() {}
	}
</script>
<style scoped>
	.susBtn {
		width: 140rpx;
	}

	.susBtn .imgc {
		width: 100rpx;
		height: 100rpx;
	}

	.susBtn .imgc:not(:last-child) {
		margin-bottom: 20rpx;
	}

	.susBtn .imgc .img {
		width: 53rpx;
		height: 53rpx;
	}
</style>