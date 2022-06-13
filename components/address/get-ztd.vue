<template>
	<mg-cell bgc="transparent"  isr="1" vueId="513c60b9-1" :vueSlots="['bd']">
		<view class="f34 " slot="bd">
			<view @tap="ckwz" class="f-y-c " >
				<view class="t-o-e " style="max-width:360rpx;">{{sjxx.shopData.name||'商家名称'}}</view>
			</view>
			<view class="mt15 f24 f-y-c ">
				<text class="iconfont iconlocation mr10 f28 "></text>
				<view class="f24 c9 ">{{'您距离当前门店'+storeInfo.distance+'，请确认下单门店是否正确'}}</view>
			</view>
		</view>
	</mg-cell>
</template>

<script>
import { ckWz } from 'common/util';
	import {
		mapState
	} from 'vuex';
	export default {
		name: "get-ztd",
		props: {
			cname: "",
			address: "",
			sjxx: Object
		},
		data: function() {
			return {};
		},
		computed: {
			...mapState({
				storeInfo: function(e) {
					return e.config.storeInfo;
				}
			}),
			desc: function() {
				return this.address ? "".concat(this.address.userName, "(").concat(this.address.sex, ") ").concat(this.address
					.userTel) : "请选择地址";
			}
		},
		methods: {
			ckwz: function() {
				ckWz({
					lat: this.sjxx.moreSet.lat,
					lng: this.sjxx.moreSet.lng,
					name: this.sjxx.shopData.name,
					address: this.sjxx.moreSet.address
				});
			}
		}
	}
</script>