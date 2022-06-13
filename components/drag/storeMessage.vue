<template>
	<view class="" :style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'">
		<view class="f-row o-x-s p0 ">
			<block v-for="(v, i) in storelist" :key="i">
				<view class="f-g-0 w-210 mr20 p2 bs10 bf " v-if="i<10">
					<view class="imgc bsf ">
						<mg-img class="" :vueId="'5dd1a1e0-1-'+i"></mg-img>
					</view>
					<view class="mt10 ">
						<view class="t-o-e ">{{'XXXXXXxxxxxx'||v.name}}</view>
						<view class="mt10 f24 c6 f-row ">
							<text class="iconfont icondw c3 mr10 f28 "></text>
							<text class="f22 ">{{'xxx'||v.distance}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		modal
	} from 'common/util';
	export default {
		name: "storeMessage",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			storeInfo: {},
			list: {
				type: Array,
				default: function() {
					return [];
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
		computed: {
			storelist: function() {
				return [1, 2, 3, 4, 5] || !1;
			}
		},
		methods: {
			goTo: function(e) {
				var t = this;
				if (1 != e.isOpen) {
					modal("[".concat(e.name, "] 休息中 确认切换到该门店吗？")).then(res => {
						t.$emit("change-store", e)
					})
				} else {
					modal("您当前所在位置距离该门店较远 确认切换到该门店吗？").then(res => {
						t.$emit("change-store", e)
					})
				}
			}
		},
		created: function() {}
	}
</script>
<style scoped>
	.b-s {
		box-shadow: 0rpx 0rpx 20rpx 2rpx hsla(0, 0%, 86.7%, .6);
	}

	.imgc {
		width: 160rpx;
		height: 160rpx;
	}

	.w-210 {
		width: 210rpx;
	}
</style>