<template>
	<mg-cell arrow="1" @tab="ztshow" :btt="address&&address.address||'暂无自提地址'" bttc="f34" last="1" vueId="6f3f7e63-1"
		:vueSlots="['bd']">
		<view class="mt10 f24 " slot="bd">{{desc}}</view>
	</mg-cell>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		name: "get-ztjf",
		props: {
			cname: "",
			address: ""
		},
		data: function() {
			return {};
		},
		computed: {
			...mapState(['sjxx']),

			desc: function() {
				return this.address ? "".concat(this.address.name, "(").concat(this.address.linkMan, ") ").concat(this.address
					.tel) : "请选择地址";
			}
		},
		methods: {
			ztshow: function(e) {
				this.$emit("ztshow", {
					g: this.co,
					e: e
				});
			}
		}
	}
</script>