<template>
	<mg-cell :acolor="color" bgc="transparent" @tab="goChoose" last="1" vueId="ab08fe22-1" :vueSlots="['bd']">
		<view class="f34 " slot="bd" :style="'color:'+color+';'">
			<view class="f-y-c ">
				<view class="t-o-e " :style="'max-width:'+mw+'rpx'+';'">
					{{address&&address.address+address.details||'暂无地址'}}</view>
				<text class="iconfont iconright c6 "></text>
			</view>
			<view class="mt10 f24 ">{{desc}}</view>
		</view>
	</mg-cell>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "get-address",
		props: {
			cname: "",
			address: "",
			ptype: {
				type: String,
				default: "1"
			},
			color: {
				type: String,
				default: "#333"
			},
			mw: {
				type: String,
				default: "360"
			}
		},
		data: function() {
			return {};
		},
		computed: {
			...mapState(['sjxx']),
			desc: function() {
				if(!this.address.userName && !this.address .userTel ) return '请选择地址';
				return this.address ? "".concat(this.address.userName, "(").concat(this.address.sex, ") ").concat(this.address
					.userTel) : "请选择地址";
			}
		},
		methods: {
			goChoose: function() {
				"1" == this.ptype ? this.go({
					t: 1,
					url: "/yb_wm/my/address/index?from=1&storeId=".concat(this.sjxx.shopData.id)
				}) : "2" == this.ptype && this.go({
					t: 1,
					url: "/yb_wm/my/address/index?from=5"
				});
			}
		}
	}
</script>