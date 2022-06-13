<template>
	<view class="pb115 o-h "
		:style="'background:'+(layout.pageSetting?layout.pageSetting[0].styles.moduleTitle==1?layout.pageSetting[0].styles.colorIcon:'url('+layout.pageSetting[0].styles.img+')':'')+';'">
		<block v-if="!showloading">
			<uni-nav-bar :bg="layout.pageSetting[0].styles.colorBg" border="false"
				:color="layout.pageSetting[0].styles.colorWord" fixed="true" id="uninavbar" isleft="false" ispr="true"
				statusBar="true" :title="layout.pageSetting[0].styles.navTitle" uropcity="1" vueId="48f8de24-1"
				v-if="layout.pageSetting[0].styles.modulePage==1"></uni-nav-bar>
			<block v-for="(v, i) in layout.attention" :key="i">
				<atten-tion :co="v.styles" :vueId="'48f8de24-2-'+i" v-if="v.name=='attention'"></atten-tion>
			</block>
			<block v-for="(v, i) in layout.list" :key="i">
				<search-box :co="v.styles" :vueId="'48f8de24-3-'+i" v-if="v.name=='search'" />
				<fixed-set :co="v.styles" :vueId="'48f8de24-4-'+i" v-else-if="v.name=='fixed'" />
				<notice-sue :co="v.styles" :shopinfo="shopinfo" :vueId="'48f8de24-5-'+i" v-else-if="v.name=='notice'" />
				<pic-lunbo-by :co="v.styles" :vueId="'48f8de24-6-'+i" v-else-if="v.name=='picLunbo'" />
				<zx-list :co="v.styles" :vueId="'48f8de24-7-'+i" v-else-if="v.name=='information'" />
				<btn-group :co="v.styles" :vueId="'48f8de24-8-'+i" v-else-if="v.name=='btn'" />
				<pictures :co="v.styles" :vueId="'48f8de24-9-'+i" v-else-if="v.name=='pictures'" />
				<titles-bar :co="v.styles" :vueId="'48f8de24-10-'+i" v-else-if="v.name=='titles'" />
				<blank :co="v.styles" :vueId="'48f8de24-11-'+i" v-else-if="v.name=='blank'" />
				<lines-wire :co="v.styles" :vueId="'48f8de24-12-'+i" v-else-if="v.name=='lines'" />
				<store-message :co="v.styles" :vueId="'48f8de24-13-'+i" v-else-if="v.name=='storeMessage'" />
				<book-text :co="v.styles" :vueId="'48f8de24-14-'+i" v-else-if="v.name=='book'" />
				<hot-spots :co="v.styles" :vueId="'48f8de24-15-'+i" v-else-if="v.name=='hot'" />
				<margic-cube :co="v.styles" :vueId="'48f8de24-16-'+i" v-else-if="v.name=='margic'" />
				<list-nav :co="v.styles" :vueId="'48f8de24-17-'+i" v-else-if="v.name=='listNav'" />
				<discount-coupons :styles="v.styles" :vueId="'48f8de24-18-'+i" v-else-if="v.name=='discount'" />
				<product-group :co="v.styles" :shopinfo="shopinfo" :vueId="'48f8de24-19-'+i" v-else-if="v.name=='product'" />
			</block>
			<sus-btn :co="layout.susBtn[0].styles" vueId="48f8de24-20" v-if="layout.susBtn&&layout.susBtn[0]"></sus-btn>
			<view v-for="(v, i) in layout.remind" :key="i">
				<order-prompt :styles="v.styles" :vueId="'48f8de24-21-'+i" v-if="v.name=='remind'"></order-prompt>
			</view>
			<tcyhq @close="xkzxshow = !1" type="3" v-model="xkzxshow" vueId="48f8de24-22" v-if="xkzxInfo"></tcyhq>
			<tcyhq @close="fqbshow = !1" :co="fqbInfo" type="2" v-model="fqbshow" vueId="48f8de24-23" v-if="fqbInfo"></tcyhq>
			<footc vueId="48f8de24-24"></footc>
			<tab-bar ptype="custom" vueId="48f8de24-25"></tab-bar>
			<load vueId="48f8de24-26" v-if="showloading"></load>
		</block>
	</view>
</template>

<script>
	import footc from "components/common/footc.vue";
	import bookText from "components/common/functionCmp/rich-text.vue";
	import load from "components/common/load.vue";
	import attenTion from "components/drag/attenTion.vue";
	import blank from "components/drag/blank.vue";
	import btnGroup from "components/drag/btn.vue";
	import cardTab from "components/drag/card.vue";
	import discountCoupons from "components/drag/discount.vue";
	import fixedSet from "components/drag/fixed.vue";
	import hotSpots from "components/drag/hot.vue";
	import linesWire from "components/drag/lines.vue";
	import listNav from "components/drag/listNav.vue";
	import margicCube from "components/drag/margic.vue";
	import noticeSue from "components/drag/notice.vue";
	import openList from "components/drag/open.vue";
	import picLunboBy from "components/drag/picLunbo.vue";
	import pictures from "components/drag/pictures.vue";
	import productGroup from "components/drag/product.vue";
	import orderPrompt from "components/drag/remind.vue";
	import searchBox from "components/drag/search.vue";
	import storeMessage from "components/drag/storeMessage.vue";
	import susBtn from "components/drag/susBtn.vue";
	import titlesBar from "components/drag/titles.vue";
	import zxList from "components/drag/zx-list.vue";
	import tcyhq from "components/template/tcyhq.vue";
	import uniNavBar from "components/third/uni-nav-bar.vue";
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
    getOptions,
		getType
	} from 'common/util';
	export default {
		name: "index",
		data: function() {
			return {
				showloading: !0,
				shopinfo: {},
				opcity: 0,
				xkzxshow: !1,
				xkzxInfo: "",
				fqbshow: !1,
				fqbInfo: ""
			}
		},
		components: {
			searchBox,
			fixedSet,
			noticeSue,
			picLunboBy,
			btnGroup,
			pictures,
			titlesBar,
			blank,
			linesWire,
			storeMessage,
			bookText,
			cardTab,
			hotSpots,
			margicCube,
			listNav,
			discountCoupons,
			productGroup,
			susBtn,
			attenTion,
			orderPrompt,
			openList,
			uniNavBar,
			load,
			tcyhq,
			zxList,
			footc,
		},
		onLoad: function(n) {
			this.query = n, this.storeId = getOptions(n, {
				key: "storeId",
				q1: this.storeInfo.id
			}) || "", this.xlsx(n)
		},
		onShow: function() {
			this.shopinfo.id && this.storeId != this.storeInfo.id && this.changeStore(this.storeInfo)
		},
		computed: {
			...mapState(['latLng']),
			...mapState({
				layout: function(n) {
					return n.layout.custom.body || {}
				},
				storeInfo: function(n) {
					return n.config.storeInfo
				}
			}),
		},
		methods: {
			...mapActions(["getConfig"]),
			xlsx: function(n) {
				var e = this;
				e.getSystem(), n.next = 3, e.getLayout({
					page: "custom",
					id: "3",
					pageId: e.query.pid
				});
				e.shopinfo = e.storeInfo, e.getLoginInfo({
					inviteId: e.query.userId
				});
			},
			changeStore: function(n) {
				this.storeId = n.id, this.refreshInfo()
			},
			refreshInfo: function() {
				var n = this;
				this.$api.order_order__set({
					storeId: n.storeId,
					lat: n.latLng.lat,
					lng: n.latLng.lng
				}).then(res => {
					n.storeId = res.id, n.getConfig({
						key: "storeInfo",
						data: {
							id: res.id,
							name: res.name,
							distance: res.distance
						}
					}), n.shopinfo = res, setTimeout((function() {
						n.addFwjl({
							storeId: n.storeId,
							origin: "1"
						})
					}), 1e3);
				})
			},
			getXkzx: function() {
				var n = this;
				var t;
				this.$api.member_new().then(res => {
					getType(res) && (n.xkzxInfo = res, setTimeout((
						function() {
							n.xkzxshow = !0
						}), 400))
				})
				this.$api.member_window().then(res => {
					res.issueCoupons.couponArr && (n.fqbInfo = res.issueCoupons,
						setTimeout((function() {
							n.fqbshow = !0
						}), 400))
				})
			}
		},
		onPullDownRefresh: function() {
			var e = this;
			uni.setStorageSync("firstdwtime", 0), e.getSystem({
				get: 1
			}), e.$store.state.layout.index = {}, e.xlsx();
			n.stopPullDownRefresh();
		}
	}
</script>