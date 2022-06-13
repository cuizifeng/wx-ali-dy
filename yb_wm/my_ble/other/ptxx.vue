<template>
	<view class="mh100 ">
		<view class="gyhead posi-r ">
			<view class="wh " :style="'background:'+tColor+';'"></view>
			<view class="posi-a t270 wh ">
				<view class="m03 ">
					<view class="bf mb20 bs20 p3 minhe ">
						<view class="iconwidth bs10 ">
							<mg-img class="" :src="system.icon" vueId="7b39633e-1"></mg-img>
						</view>
						<view class="f-c c0 f32 mt90 f26 c3 ">{{system.name}}</view>
						<view class="f28 c6 mt30 ">
							<mg-rtext class="" :content="system.introduction" type="2" vueId="7b39633e-2"></mg-rtext>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import mgRtext from "components/common/functionCmp/rich-text.vue";

	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		setNT
	} from 'common/util';
	export default {
		name: "gywm",
		components: {
			mgRtext
		},
		data: function() {
			return {
				loading: !1,
				content: "",
				systemData: ""
			}
		},
		onLoad: function(t) {
			var e = this;
			e.getSystem(), setNT("关于我们")
		},
		computed: {
			...mapState(['vipConfig'])
		},
		methods: {}
	}
</script>
<style scoped>
	.gyhead {
		width: 100%;
		height: 300rpx;
	}

	.t270 {
		top: 100rpx;
	}

	.iconwidth {
		width: 120rpx;
		height: 120rpx;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
	}

	.minhe {
		min-height: 800rpx;
		margin-top: 60rpx;
	}
</style>