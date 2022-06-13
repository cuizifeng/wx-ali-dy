<template>
	<view class="bf p23 ">
		<block v-if="co.id">
			<view class="f40 wei ">{{co.title}}</view>
			<view class="p20 c9 f-raw f24 ">
				<view class="yc bs5 c9 f22 mr20 " v-if="co.storeName">{{co.storeName}}</view>
				<view class="mr20 ">{{getTime(co.createdAt)}}</view>
				<view class="t-o-e mr20 ">{{'浏览量:'+co.views}}</view>
			</view>
			<view class="mt15 ">
				<mg-rtext class="" :content="co.body" type="2" vueId="629f2594-1"></mg-rtext>
			</view>
		</block>
	</view>
</template>


<script>
	import jzz from 'components/common/jzz.vue'
	import mgRtext from 'components/common/functionCmp/rich-text.vue'
	import {
    mpShare,
		setNT,
    settime
	} from 'common/util'
	export default {
		name: "order-index",
		components: {
			jzz,
			mgRtext,
		},
		data: function() {
			return {
				co: {}
			}
		},
		onLoad: function(t) {
			this.getSystem(), setNT("资讯详情"), this.id = t.id, this.getData()
		},
		computed: {},
		methods: {
			getData: function() {
				var t = this;
				this.$api.config_information__info({
					id: t.id
				}).then(res => {
					t.co = res;
				})
			},
			getTime: function(t) {
				return settime(t)
			}
		},
		onShareAppMessage: function() {
			return mpShare({
				t: this.co.title,
				i: this.getImgS(this.co.icon)
			})
		},
		onShareTimeline: function(t) {
			return {
				title: this.co.title,
				imageUrl: this.getImgS(this.co.icon)
			}
		}
	}
</script>
<style scoped>
	.yc {
		padding: 3rpx 10rpx;
		background: #f0f0f0;
	}
</style>