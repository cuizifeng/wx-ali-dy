<template>
	<view class="pb130 o-h "
		:style="'background:'+(layout.pageSetting?layout.pageSetting[0].styles.moduleTitle==1?layout.pageSetting[0].styles.colorIcon:'url('+layout.pageSetting[0].styles.img+')':'')+';'">
		<uni-nav-bar :bg="layout.pageSetting[0].styles.colorBg" :border="false"
			:color="layout.pageSetting[0].styles.colorWord" :fixed="true" id="uninavbar" :isleft="false" :ispr="true"
			:statusBar="true" :title="layout.pageSetting[0].styles.navTitle" uropcity="1" vueId="ac84abb2-1"
			v-if="layout.pageSetting[0].styles.modulePage==1"></uni-nav-bar>

		<uni-nav-bar :border="opcity>=1" :fixed="true" id="uninavbar" :isleft="false" :ispr="false" :statusBar="true"
			:title="layout.pageSetting[0].styles.navTitle" :uropcity="opcity" vueId="ac84abb2-2" v-else></uni-nav-bar>
		<block v-for="(v, i) in layout.attention" :key="i">
			<atten-tion :co="v.styles" :vueId="'ac84abb2-3-'+i" v-if="v.name=='attention'" />
		</block>
		<block v-for="(v, i) in layout.list" :key="i">
			<members-vip :showpr="layout.pageSetting[0].styles.modulePage" :styles="v.styles" :vueId="'ac84abb2-4-'+i"
				v-if="v.name=='vip'" />
			<tj-tools :co="v.styles" :vueId="'ac84abb2-5-'+i" v-if="v.name=='btn2'" />
			<search-box :co="v.styles" :vueId="'ac84abb2-6-'+i" v-if="v.name=='search'" />
			<notice-sue :co="v.styles" :vueId="'ac84abb2-7-'+i" v-if="v.name=='notice'" />
			<pic-lunbo-by :co="v.styles" :vueId="'ac84abb2-8-'+i" v-if="v.name=='picLunbo'" />
			<btn-group :co="v.styles" :oheight="20" :vueId="'ac84abb2-9-'+i" v-if="v.name=='btn'" />
			<pictures :co="v.styles" :vueId="'ac84abb2-10-'+i" v-if="v.name=='pictures'" />
			<titles-bar :co="v.styles" :vueId="'ac84abb2-11-'+i" v-if="v.name=='titles'" />
			<blank :co="v.styles" :vueId="'ac84abb2-12-'+i" v-if="v.name=='blank'" />
			<lines-wire :co="v.styles" :vueId="'ac84abb2-13-'+i" v-if="v.name=='lines'" />
			<book-text :co="v.styles" :vueId="'ac84abb2-14-'+i" v-if="v.name=='book'" />
			<hot-spots :co="v.styles" :vueId="'ac84abb2-15-'+i" v-if="v.name=='hot'" />
			<margic-cube :co="v.styles" :vueId="'ac84abb2-16-'+i" v-if="v.name=='margic'" />
			<list-nav :co="v.styles" :vueId="'ac84abb2-17-'+i" v-if="v.name=='listNav'" />
		</block>
		<sus-btn :co="layout.susBtn[0].styles" vueId="ac84abb2-18" v-if="layout.susBtn&&layout.susBtn[0]">
		</sus-btn>
		<order-prompt :co="layout.remind[0].styles" vueId="ac84abb2-19" v-if="layout.remind&&layout.remind[0]">
		</order-prompt>
		<footc vueId="ac84abb2-20"></footc>
		<tab-bar vueId="ac84abb2-21"></tab-bar>
		<load vueId="ac84abb2-22" v-if="showloading"></load>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import uniNavBar from "../../components/third/uni-nav-bar.vue";
	import searchBox from "../../components/drag/search.vue";
	import noticeSue from "../../components/drag/notice.vue";
	import picLunboBy from "../../components/drag/picLunbo.vue";
	import btnGroup from "../../components/drag/btn.vue";
	import pictures from "../../components/drag/pictures.vue";
	import titlesBar from "../../components/drag/titles.vue";
	import blank from "../../components/drag/blank.vue";
	import linesWire from "../../components/drag/lines.vue";
	import bookText from "../../components/common/functionCmp/rich-text.vue";
	import cardTab from "../../components/drag/card.vue";
	import hotSpots from "../../components/drag/hot.vue";
	import margicCube from "../../components/drag/margic.vue";
	import susBtn from "../../components/drag/susBtn.vue";
	import attenTion from "../../components/drag/attenTion.vue";
	import orderPrompt from "../../components/drag/remind.vue";
	import openList from "../../components/drag/open.vue";
	import membersVip from "../../components/drag/vip.vue";
	import listNav from "../../components/drag/listNav.vue";
	import tjTools from "../../components/drag/tj-tools.vue";
	import load from "../../components/common/load.vue";
	import footc from "../../components/common/footc.vue";
	export default {
		name: "mine",
		components: {
			uniNavBar,
			searchBox,
			noticeSue,
			picLunboBy,
			btnGroup,
			pictures,
			titlesBar,
			blank,
			linesWire,
			bookText,
			cardTab,
			hotSpots,
			margicCube,
			susBtn,
			attenTion,
			orderPrompt,
			openList,
			membersVip,
			listNav,
			tjTools,
			load,
			footc
		},
		data: function() {
			return {
				showloading: !0,
				opcity: 0
			};
		},
		onLoad: function(n) {
			var e = this;
			this.getSystem({nofc:true}), this.getLoginInfo({
				inviteId: n.userId
			}), this.getLayout({
				page: "personalcenter",
				id: "2"
			}).then(function() {
				e.showloading = !1;
			}), this.getConfig({
				key: "vipset",
				api: "config_config",
				params: {
					ident: "vipSet"
				}
			}), this.getLayout();
		},
		onShow: function() {
			this.uId && this.refreshUser({
				nomask: 1,
				get: 1,
				now: 1
			});
		},
		computed: {

			...mapState({
				layout: function(n) {
					return n.layout.personalcenter.body || {};
				}
			})
		},
		methods: {
			...mapActions(['getConfig']),
		},
		onPageScroll: function(n) {
			if (!(this.opcity >= 1 && n.scrollTop / 64 >= 1)) {
				var e = n.scrollTop / 64;
				this.opcity = e;
			}
		}
	}
</script>