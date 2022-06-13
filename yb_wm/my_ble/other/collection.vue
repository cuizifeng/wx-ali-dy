<template>
	<view class="">
		<view class="mt9 p3 ">
			<view class="bf bs30 mb30 " v-for="(v, i) in dataList" :key="i">
				<mg-cell @tab="goDl(v.storeId)" brs="15rpx" class="" cname="p23" h="130" :img="v.icon" last="1"
					:vueId="'2d72e6c7-1-'+i" :vueSlots="['bd','ft']" w="130">
					<view class="f24 c9 " slot="bd">
						<view class="f-bt ">
							<view class="f-g-1 f32 wei f-y-c ">
								<text class="t-o-e c0 ">{{v.name}}</text>
							</view>
						</view>
						<view class="mt10 f-y-c ">
							<uni-rate activeColor="#FF5B0A" class="" disabled="true" icon="iconxing" :margin="4" size="25"
								:value="v.foodScore||5" :vueId="'2d72e6c7-2-'+i+','+'2d72e6c7-1-'+i"></uni-rate>
						</view>
						<view class="mt10 f-x-bt ">
							<text class="" v-if="typeName(v)">{{typeName(v)}}</text>
						</view>
					</view>
					<view class="f-g-0 text-btnf bs30 p-5-20 bec c9 " slot="ft">进入</view>
				</mg-cell>
			</view>
			<jzz bgcolor="transparent" class="" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="2d72e6c7-3"></jzz>
		</view>
	</view>
</template>

<script>
	import navTab from "components/common/functionCmp/nav-tab.vue";
	import jzz from "components/common/jzz.vue";
	import uniRate from "components/third/uni-rate.vue";
	import {
		setNT
	} from 'common/util';
	export default {
		name: "myCoupon",
		components: {
			navTab,
			jzz,
			uniRate,
		},
		data: function() {
			return {
				aIdx: 0,
				tabs: [{
					name: "未使用",
					type: 1
				}, {
					name: "已使用",
					type: 2
				}, {
					name: "已失效",
					type: 3
				}],
				dataList: [],
				isget: !1,
				mygd: !1,
				params: {
					userId: "",
					size: 10,
					page: 1,
					type: 1
				}
			}
		},
		onLoad: function(t) {
			var e = this;
			e.getSystem(), setNT("我的收藏"), e.getLoginInfo().then(res => {
				e.params.userId = e.uId, e.aIdx = +t.idx || 0, e.changeTab(e.aIdx);
			});
		},
		onReachBottom: function() {
			!this.mygd && this.isget && (this.isget = !1, this.getList())
		},
		computed: {},
		methods: {
			refresh: function() {
				this.changeTab(this.aIdx)
			},
			changeTab: function(t) {
				this.isget = this.mygd = !1, this.params.page = 1, this.params.size = 10, this.params.type = this.tabs[t]
					.type, this.dataList = [], this.getList()
			},
			getList: function() {
				var t = this;
				// return i(a.default.mark((function e() {
				// 	var n, r;
				// 	return a.default.wrap((function(e) {
				// 		while (1) switch (e.prev = e.next) {
				// 			case 0:
				// 				return e.next = 2, t.util.request({
				// 					url: t.api.MyCollection,
				// 					method: "POST",
				// 					data: t.params
				// 				});
				// 			case 2:
				// 				n = e.sent, r = n.data, t.dataList = t.dataList.concat(r), t.isget = !0, t.mygd = t.params.size >
				// 					r.length, t.params.page++;
				// 			case 8:
				// 			case "end":
				// 				return e.stop()
				// 		}
				// 	}), e)
				// })))()
			},
			typeName: function(t) {
				return t.typeName ? t.typePname + "/" + t.typeName : t.typePname
			},
			goDl: function(t) {
				this.go({
					t: 1,
					url: "/yb_o2o/gfood/shop-dl?storeId=" + t
				})
			}
		}
	}
</script>