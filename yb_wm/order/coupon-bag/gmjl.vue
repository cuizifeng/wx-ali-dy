<template>
	<view>
		<view class="bf ">
			<view class="p3 hlb f-row " v-for="(v, i) in dataList" :key="i">
				<view class="glimg mr30 bs10 ">
					<mg-img :src="v.bagIcon" :vueId="'a35ca95c-1-'+i"></mg-img>
				</view>
				<view class="f-1 ">
					<view class="f-x-bt ">
						<view class="t-o-e f28 ">{{v.bagName}}</view>
						<view class="cf7 f28 ">{{sl+v.money}}</view>
					</view>
					<view class="f-x-bt c9 f24 mt10 ">
						<view>{{v.createdAt}}</view>
						<view>{{v.payModeName}}</view>
					</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="a35ca95c-2"></jzz>
	</view>
</template>

<script>
	import jzz from "components/common/jzz.vue";
	import {
		setNT,
		sljz
	} from 'common/util';

	export default {
		name: "order-index",
		components: {
			jzz
		},
		data: function() {
			return {
				params: {
					page: 1,
					size: 10
				}
			}
		},
		onLoad: function(t) {
			this.getSystem(), setNT("券包购买记录"), this.getList()
		},
		mixins: [sljz],
		computed: {},
		methods: {
			getList: function() {
				var t = this;
				this.$api['roll-bag_order__list'](t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0,
						t.mygd = t.params.size > res.length, t.params.page++
				})
			}
		}
	}
</script>
<style scoped>
	.glimg {
		width: 100rpx;
		height: 100rpx;
	}
</style>