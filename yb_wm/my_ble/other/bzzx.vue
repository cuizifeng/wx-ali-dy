<template>
	<view class="bf m3 bs20 ">
		<view class="bf " v-for="(v, i) in arr" :key="i">
			<mg-cell arrow="1" @tab="goDl(v)" :btt="v.title" bttc="c3" cname="p23" isr="1" :last="i==arr.length-1"
				:vueId="'7fb8c00f-1-'+i"></mg-cell>
		</view>
	</view>
</template>

<script>
	import jzz from 'components/common/jzz.vue';
	import {
		setNT
	} from 'common/util';
	export default {
		name: "order-index",
		components: {
			jzz
		},
		data: function() {
			return {
				arr: []
			}
		},
		onLoad: function(t) {
			var n = this;
			n.getSystem(), setNT("帮助中心");
			this.$api['member_get__helps__list']().then(res => {
				n.arr = res;
			})
		},
		computed: {},
		methods: {
			goDl: function(t) {
				this.go({
					t: 1,
					url: "/yb_wm/my/other/gywm?t=".concat(t.title, "&p=2&id=").concat(t.id)
				})
			}
		}
	}
</script>