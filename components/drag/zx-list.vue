<template>
	<view class="titles o-h "
		:style="'margin-top:'+co.marginTop+u+';'+'margin-bottom:'+co.marginBottom+u+';'+'margin-left:'+co.marginLR+u+';'+'margin-right:'+co.marginLR+u+';'+'border-radius:'+co.circle+u+';'">
		<view class="titles-c bf " :style="'background:'+co.colorBg+';'">
			<view @tap="go({url:'/yb_wm/other/info/index'})" class="p330 f-x-bt ">
				<view class="f30 wei c0 ">{{co.title}}</view>
				<view class="f-y-c f-g-0 ">
					<text class="f24 " style="color:#A4A4A4;">更多</text>
					<text class="iconfont iconright c6 arrow f26 "></text>
				</view>
			</view>
			<view @tap="go({url:'/yb_wm/other/info/detail?id='+v.id})" class="weui-cell f-sh " v-for="(v, i) in arr" :key="i">
				<view class="f-1 f-y-bt ">
					<view class="">
						<view class="f26 t-o-e ">{{v.title}}</view>
						<view class="f24 t-o-e c9 " v-if="v.introduction">{{v.introduction}}</view>
					</view>
					<view class="c9 f24 l-n ">{{timeToDate(v.createdAt, "MM月dd日")}}</view>
				</view>
				<view class="img ml30 bs10 ">
					<mg-img class="" :src="v.icon" :vueId="'25bff60e-1-'+i"></mg-img>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		utilMixins
	} from '@/common/utilMixins'
	import {
		timeToDate
	} from 'common/util';

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
			return {
				arr: [],
				timeToDate
			};
		},
		mixins: [utilMixins],
		methods: {
			goLink: function(t) {
				this.goUrl(t.url);
			}
		},
		created() {
			this.$api.config_information({
				page: 1,
				size: 3
			}).then(res => {
				this.arr = res;
			})
		},
	}
</script>
<style scoped>
	.titles-c {
		padding: 0 0 20rpx;
	}

	.titles-c .img {
		width: 178rpx;
		height: 123rpx;
	}
</style>