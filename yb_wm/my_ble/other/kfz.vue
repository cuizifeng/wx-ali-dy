<template>
	<view class="bf ">
		<jzz mygd="true" nodata="true" vueId="71a8ce10-1"></jzz>
		<tab-bar vueId="71a8ce10-2"></tab-bar>
	</view>
</template>

<script>
	import jzz from 'components/common/jzz.vue'
import { setNT } from 'common/util'
	export default {
		name: "order-index",
		components: {
			jzz
		},
		data: function() {
			return {}
		},
		onLoad: function(n) {
			this.getSystem(), setNT("敬请期待")
		},
		computed: {},
		methods: {
			onClick: function() {
				this.$emit("click")
			}
		}
	}
</script>