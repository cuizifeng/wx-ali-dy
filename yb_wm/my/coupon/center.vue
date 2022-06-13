<template>
	<view class="v">
		<view class="fixedtop bf5 v">
			<nav-tab @changeTab="changeTab" v-model="aIdx" class="v" iwidth="150rpx" :tabs="tabs" vueId="d80ab94c-1"
				xhxjb="#F25F42"></nav-tab>
			<view class="f-c wxts f22 c9 v">温馨提示：领取成功后请到‘个人中心-优惠券’查看</view>
		</view>
		<view style="height:130rpx;">
			
		</view>
		<view class="ccbd p3 v">
			<mg-coupon @btntap="btntap(v)" class="v" cname="mb30" :co="v" :color="tColor" :vueId="'d80ab94c-2-'+i"
				v-for="(v, i) in dataList" :key="i"></mg-coupon>
			<jzz bgcolor="transparent" class="v" imgn="zwhb" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="d80ab94c-3">
			</jzz>
		</view>
	</view>
</template>

<script>
	import navTab from "components/common/functionCmp/nav-tab.vue";
	import jzz from "components/common/jzz.vue";
	import mgCoupon from "components/common/mg-coupon.vue";
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		setNT,
		sljz
	} from 'common/util';
	export default {
		name: "myCoupon",
		components: {
			navTab,
			mgCoupon,
			jzz,
		},
		data: function() {
			return {
				aIdx: 0,
				params: {
					page: 1,
					size: 10,
					type: 1,
					storeId: ""
				}
			}
		},
		onLoad: function(t) {
			var e = this;
			e.getSystem().then((function() {
				setNT(t.storeId ? t.name + "领券中心" : "领券中心")
			}));
			e.getLoginInfo();
			e.params.storeId = t.storeId || "", e.aIdx = +t.idx || 0, e.changeTab(e.aIdx), e.isLoad = !0;
		},
		onShow: function() {
			this.isLoad && this.changeTab(this.aIdx)
		},
		mixins: [sljz],
		computed: {
			tabs: function() {
				return [{
					name: "优惠券",
					type: 1
				}]
			}
		},
		methods: {
			...mapActions(["getConfig"]),
			refresh: function() {
				this.changeTab(this.aIdx)
			},
			changeTab: function(t) {
				this.isget = this.mygd = !1, this.params.page = 1, this.params.type = this.tabs[t].type, this
					.dataList = [], this.getList()
			},
			getList: function() {
				var t = this;
				this.$api.coupon_coupon__list(t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0,
						t.mygd = t.params.size > res.length, t.params.page++;
				})
			},
			btntap: function(t) {
				var e = this;
				e.checkLogin().then(() => {
					this.$api.coupon_receive__coupon({
						couponId: t
					}).then(res => {
						e.refresh()
					})
				})
			}
		}
	}
</script>

<style scoped>
	.wxtsv {
		height: 70rpx;
	}

	.ccbdv {
		padding-top: 166rpx;
	}
</style>