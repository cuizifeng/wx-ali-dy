<template>
	<view class="p3 ">
		<mg-coupon @change="radioChange" cname="mb30" :co="v" :color="tColor" ptype="4" :vueId="'e1a8c33a-1-'+i"
			v-for="(v, i) in dataList" :key="i"></mg-coupon>
		<jzz bgcolor="transparent" imgn="zwhb" mygd="true" nodata="true" vueId="e1a8c33a-2" v-if="dataList.length==0"></jzz>
	</view>
</template>

<script>
	import navTab from 'components/common/functionCmp/nav-tab.vue';
	import mgCoupon from 'components/common/mg-coupon.vue';
	import jzz from 'components/common/jzz.vue';
	import {
		bus,
		setNT,
		showLoading,
    swnb
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
				dataList: []
			}
		},
		onLoad: function(e) {
			setNT("选择" + e.name);
			var t = uni.getStorageSync("kyhb").data;
			if (e.couponId)
				for (var o in t) e.couponId == t[o].id ? t[o].checked = !t[o].checked : t[o].checked = !1;
			this.dataList = t, this.query = e;
		},
		computed: {},
		methods: {
			radioChange: function(e) {
				showLoading();
				var t = this.dataList;
				for (var c in t) e == t[c].id ? t[c].checked = !t[c].checked : t[c].checked = e == t[c].id;
				var u = t.find((function(n) {
					return 1 == n.checked
				}));
				bus.$emit("payorder", {
					hbInfo: u,
					type: this.query.t
				}), swnb(200)
			}
		}
	}
</script>