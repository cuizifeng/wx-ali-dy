<template>
	<view class="h100v p-f w100 f-col ">
		<view class="qb1c p-f wh " :style="'background:'+'linear-gradient(90deg, #FF876F, #FF654D)'+';'">
		</view>
		<view class="qb2c ">
			<uni-nav-bar border="false" id="uninavbar" statusBar="true" :uriconopcity="0.1" :uropcity="0" vueId="443c05c8-1"
				:vueSlots="['default']">
				<view class="cf ">{{title}}</view>
			</uni-nav-bar>
			<mg-swiper :co="swiper" :color="tColor" u="rpx" vueId="443c05c8-2"></mg-swiper>
			<nav-tab @changeTab="changeTab" cname="bt" color="#fff" height="80" icname="f26" :tabs="tabs" uw="60" v-model="aIdx"
				vueId="443c05c8-3" v-if="tabs.length"></nav-tab>
		</view>
		<view class="qb3c f-1 ">
			<swiper @change="swiperTab" class="h100 " :current="aIdx" :style="'padding-bottom:'+(hasTabbar?'130rpx':'')+';'">
				<swiper-item v-for="(tv, ti) in tabs" :key="ti">
					<scroll-view @scrolltolower="lower" class="h100 p3 " scroll-y="true" v-if="ti==aIdx">
						<mg-coupon @btntap="btntap(v)" cname="mb30" :co="v" :color="tColor" ptype="9" :vueId="'443c05c8-4-'+ti+'-'+i"
							v-for="(v, i) in dataList" :key="i"></mg-coupon>
						<jzz bgcolor="transparent" :mygd="mygd" :nodata="dataList.length==0&&isget" tcolor="#fff"
							:vueId="'443c05c8-5-'+ti"></jzz>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<tab-bar @refresh="tbrh" vueId="443c05c8-6">
		</tab-bar>
	</view>
</template>

<script>
	import navTab from "components/common/functionCmp/nav-tab.vue";
	import MgSwiper from "components/common/functionCmp/swiper.vue";
	import jzz from "components/common/jzz.vue";
	import mgCoupon from "components/common/mg-coupon.vue";
	import uniNavBar from "components/third/uni-nav-bar.vue";
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		sljz, throttle
	} from 'common/util';
	export default {
		name: "qb-list",
		components: {
			uniNavBar,
			MgSwiper,
			navTab,
			mgCoupon,
			jzz,
		},
		data: function() {
			return {
				title: "",
				swiper: {
					class: "p230 bt",
					swiper: [],
					duration: "",
					mode: "",
					height: "210",
					radius: "0",
					auto: !0,
					interval: 5
				},
				aIdx: 0,
				tabs: [],
				hasTabbar: !1,
				params: {
					page: 1,
					size: 10,
					typeId: "",
					storeId: ""
				}
			}
		},
		onLoad: function(t) {
			var e = this;
			e.query = t, e.getAd(), e.getSystem();
			this.$api['integral-shop_goods__type__list']().then(res => {
				e.tabs = res.typeList.map((function(t) {
					return {
						name: t.name,
						id: t.id
					}
				})), e.params.typeId = e.tabs[0].id;

			})
			t.storeId && (e.params.storeId = t.storeId), e.getList(), e.getLayout();
		},
		mixins: [sljz],
		computed: {

			...mapState({
				jbset: function(t) {
					return t.config.jbset
				}
			}),
			hasdata: function() {
				return 0 == this.dataList.length
			}
		},
		methods: {
			...mapActions(["getConfig"]),
			getAd: function() {
				var t = this;
				this.$({
					url: this.api.jffl,
					data: {
						location: 8,
						type: 1
					}
				}).then((function(e) {
					t.swiper.swiper = e.data.ad.map((function(t) {
						return {
							icon: t.icon
						}
					}))
				}))
			},
			tbrh: function(t) {
				this.hasTabbar = !0
			},
			changeTab: function(t) {
				this.refreshList()
			},
			swiperTab: function(t) {
				this.aIdx = t.detail.current, t.detail.source && this.refreshList()
			},
			refreshList: function() {
				this.isget = this.mygd = !1, this.params.page = 1, this.params.typeId = this.tabs[this.aIdx].id, this
					.dataList = [], this.getList()
			},
			lower: throttle((function(t) {
				!this.mygd && this.isget && (this.isget = !1, this.getList())
			}), 300),
			getList: function() {
				var t = this;
				this.$api.coupon_my__coupon(t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0,
						t.mygd = t.params.size > res.length, t.params.page++;
				})
			}
		},
		onShareAppMessage: function() {
			return {
				title: "快来看看吧！"
			}
		}
	}
</script>