<template>
	<view class="mh100 ">
		<view class="bf ">
			<view class="f32 wei p3 hlb ">优惠券列表</view>
			<view class="p3 bf hlb " v-for="(v, i) in dataList" :key="i">
				<view class="f-x-bt ">
					<view class="t-o-e f28 ">{{v.couponName}}</view>
					<view class="wei cf5 ">
						<block v-if="v.type==1">
							<text class="">{{sl}}</text>
							<text class="f48 ml5 ">{{v.money}}</text>
						</block>
						<block v-else>
							<block v-if="v.type==2">
								<text class="f48 ">{{v.discount}}</text>
								<text class="ml5 ">折</text>
							</block>
						</block>
					</view>
				</view>
				<view class="f-x-bt ">
					<view class="c9 f24 m10 ">{{v.useExplain}}</view>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" class="" imgn="zwcz" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="1cfceeaa-1">
		</jzz>
	</view>
</template>

<script>
	import jzz from 'components/common/jzz.vue'
	import {
		utilMixins
	} from 'common/utilMixins'
	import {
		setNT,
		sljz
	} from 'common/util'
	export default {
		name: "mySignin",
		components: {
			jzz
		},
		data: function() {
			return {
				params: {
					page: 1,
					size: 10,
					receiveType: 2
				}
			}
		},
		onLoad: function() {
			this.getSystem(), setNT("我的优惠券"), this.getList()
		},
		mixins: [utilMixins, sljz],
		computed: {},
		methods: {
			getList: function() {
				var t = this;
				this.$api.coupon_my__coupon(t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0, t.mygd = t.params.size > res.length, t.params.page++;
				})
			}
		}
	}
</script>