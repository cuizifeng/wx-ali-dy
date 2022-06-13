<template>
	<view class="pt110 pb130 ">
		<nav-tab @changeTab="changeTab" cname="fixedtop" v-model="aIdx" :tabs="tabs" vueId="a398d456-1"></nav-tab>
		<view @tap="go({t:1,url:'order-dl?id='+v.id})" class="bf bs20 f24 p3 m23 " v-for="(v, i) in dataList" :key="i">
			<view class="f-x-bt pb20 b-b-e c3 ">
				<view class="f24 wei4 ">{{'订单号：'+v.outTradeNo}}</view>
				<view class="f24 wei4 " v-if="v.state=='1'">未付款</view>
				<view class="f24 wei4 cf7 " v-if="v.deliveryMode=='1'&&v.state=='2'">待发货</view>
				<view class="f24 wei4 cf7 " v-if="v.deliveryMode=='2'&&v.state=='2'">待核销</view>
				<view class="f24 wei4 c1f " v-if="v.state=='3'">已发货</view>
				<view class="f24 wei4 c3f " v-if="v.state=='4'">已完成</view>
			</view>
			<view class="bf f-row p20 ">
				<view class="f-g-0 mr30 ">
					<view class="imgw bs10 bf7 ">
						<mg-img class="" :src="v.goodsIcon" :vueId="'a398d456-2-'+i"></mg-img>
					</view>
				</view>
				<view class="f-g-1 f-y-bt ">
					<view class="wei4 f30 t-o-e2 c6 ">{{v.goodsName}}</view>
					<view class="f-x-bt ">
						<view class="cfa t-o-e wei4 ">
							<text class="" v-if="v.score>0">{{v.score}}</text>
							<text class="f26 ml10 nowei " v-if="v.score>0">{{jfName}}</text>
							<text class="nowei " v-if="v.score>0&&v.money>0">+</text>
							<text class="" v-if="v.money>0">
								<text class="f22 ">{{sl}}</text>{{v.money}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="p20 t-r mr20 ">
				<view class="f28 wei4 cfa ">
					<text class="f24 c9 mr20 ">{{'共计'+v.convertNum+'件'}}</text>
					<text class="c3 ">实付：</text>
					<text class="" v-if="v.score>0">{{v.score}}</text>
					<text class="f26 ml10 nowei " v-if="v.score>0">{{jfName}}</text>
					<text class="nowei " v-if="v.score>0&&v.money>0">+</text>
					<text class="" v-if="v.money>0">
						<text class="f22 ">{{sl}}</text>{{v.money}}</text>
				</view>
			</view>
			<view class="pt20 mr20 b-t-e " v-if="v.state=='3'&&v.deliveryMode=='1'">
				<view class="f28 c3 wei4 f-x-e ">
					<view @tap.stop="qrsh(v)" class="obtn b-d bwid bs30 " :style="'color:'+tColor+';'+'border-color:'+tColor+';'">确认收货
					</view>
				</view>
			</view>
			<view class="pt20 mr20 b-t-e f-x-bt f28 " v-if="v.deliveryMode=='2'">
				<view class="c3 wei4 " :style="'color:'+tColor+';'">自提订单</view>
				<view class="" v-if="v.selfCode">核销码：<text class="" :style="'color:'+tColor+';'">{{v.selfCode}}</text>
				</view>
			</view>
		</view>
		<jzz bgcolor="transparent" class="" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="a398d456-3"></jzz>
		<tab-bar class="" vueId="a398d456-4"></tab-bar>
	</view>
</template>

<script>
	import {
		modal,
		setNT,
		sljz
	} from "common/util";
	import navTab from "components/common/functionCmp/nav-tab.vue";
	import jzz from "components/common/jzz.vue";

	export default {
		name: "integralRecord",
		components: {
			navTab,
			jzz,
		},
		data: function() {
			return {
				aIdx: 0,
				tabs: [{
					name: "未完成"
				}, {
					name: "已完成"
				}],
				params: {
					page: 1,
					size: 10
				}
			}
		},
		onLoad: function(t) {
			this.getSystem(), setNT("兑换记录"), this.aIdx = +t.idx || 0, this.changeTab(this.aIdx)
		},
		mixins: [sljz],
		computed: {
			jfName: function() {
				return this.system.custom.integral
			}
		},
		methods: {
			getList: function() {
				var t = this;
				this.$api['integral-shop_my__integral__order'](t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0,
						t.mygd = t.params.size > res.length,
						t.params.page++;
				})
			},
			changeTab: function(t) {
				this.isget = this.mygd = !1, this.params.page = 1;
				var e = "";
				switch (t) {
					case 0:
						e = "1";
						break;
					case 1:
						e = "2";
						break
				}
				this.params.type = e, this.dataList = [], this.getList()
			},
			qrsh: function(t) {
				var e = this;
				modal("您确认收货吗？").then(() => {
					this.$api['integral-shop_modify__order']({
						id: t.id
					}).then(res => {
						e.changeTab(e.aIdx)
					})
				})
			}
		}
	}
</script>

<style scoped>
	.imgw {
		width: 100rpx;
		height: 100rpx;
	}

	.bor-b {
		border-bottom: 1px solid #eff3f6;
	}

	.pt110 {
		padding-top: 110rpx;
	}

	.bwid {
		width: 175rpx;
	}

	.c1f {
		color: #1fbf5f;
	}

	.c3f {
		color: #999;
	}
</style>