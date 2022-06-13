<template>
	<view class="">
		<view class="dlhd f-c-c ">
			<view class="hdimg bsf ">
				<mg-img class="" :src="system.icon" vueId="33eb5d2a-1"></mg-img>
			</view>
			<view class="c9 f26 p23 ">{{system.name}}</view>
		</view>
		<view class="foot-btnc posi-r ">
			<button @tap="zxkf" class="foot-btn " :style="'background:'+tColor+';'" v-if="system.serviceUrl">在线客服</button>
			<button class="foot-btn " openType="contact" :style="'background:'+tColor+';'" v-else>在线客服</button>
		</view>
		<view @tap="makeTel(system.tel)" class="foot-btnc posi-r ">
			<button class="foot-btn f-c "
				:style="'background:'+'transparent'+';'+'border:'+'1px solid '+tColor+';'+'color:'+tColor+';'">
				<text class="iconfont icondh mr20 f42 " :style="'color:'+tColor+';'"></text>联系电话</button>
		</view>
		<view @tap="bbh" class="posi-f b0 w100 " style="height:100rpx;"></view>
		<tab-bar class="" vueId="33eb5d2a-2"></tab-bar>
	</view>
</template>
<script>
	import mgPopup from "components/common/popup.vue";
	import {
		makeTel, setNT
	} from 'common/util';
	export default {
		name: "kf",
		components: {
			mgPopup
		},
		data: function() {
			return {
				showSq: !0,
				makeTel
			}
		},
		onLoad: function(t) {
			this.getSystem({
				normal: 1
			}), setNT("联系客服")
		},
		computed: {},
		methods: {
			zxkf: function() {
				this.go({
					t: 1,
					url: "/yb_o2o/other/web-view?src=" + encodeURIComponent(JSON.stringify(this.system.serviceUrl))
				})
			},
			bbh: function() {
				uni.showModal({
					title: "小程序版本号",
					content: "21.3.19"
				})
			}
		}
	}
</script>
<style scoped>
	.kfimg {
		width: 400rpx;
		height: 400rpx;
	}

	.dlhd {
		padding: 130rpx 30rpx 80rpx;
	}

	.hdimg {
		width: 150rpx;
		height: 150rpx;
	}
</style>