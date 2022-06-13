<template>
	<view class="">
		<mg-modal v-model="showGg" ismr="true" vueId="2235ffaa-1" :vueSlots="['default']" width="90%" :zIndex="2000">
			<view class="ggc p20 bf posi-r bs20 ">
				<scroll-view class="ggb " scroll-y="true">
					<view class="p23 ">
						<view @tap="chooseAdd(v)" class="bf bs20 p23 mb20 f-row " v-for="(v, i) in co" :key="i">
							<view class="f-g-1 ">
								<view class="f-row ">
									<view class="f32 mr10 t-o-e " style="max-width:80%;">{{v.address}}</view>
								</view>
								<view class="f-row f24 c6 mt15 ">
									<text class="mr20 ">{{v.name}}</text>
									<text class="">{{'('+v.linkMan+')'}}</text>
									<text class="">{{v.tel}}</text>
								</view>
							</view>
							<view class="">{{v.id}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</mg-modal>
	</view>
</template>

<script>
	import mgModal from 'components/common/modal.vue'
	export default {
		name: "popup",
		components: {
			mgModal
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {}
				}
			},
			cname: {
				type: String,
				default: ""
			},
			value: {
				type: Boolean,
				default: !1
			},
			width: {
				type: String,
				default: "70%"
			},
			zindex: {
				type: Number,
				default: 999
			},
			outin: {
				type: String,
				default: "1"
			},
			storeid: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				loading: !1
			}
		},
		methods: {
			chooseAdd: function(t) {
				var n = this;
				n.showGg = !1, n.$emit("chooseAdd", t);
			}
		},
		computed: {
			showGg: {
				get: function() {
					return this.value
				},
				set: function(t) {
					this.$emit("input", t)
				}
			}
		}
	}
</script>
<style scoped>
	.ggc {
		height: 72vh;
	}

	.ggc .ggx {
		top: 20rpx;
		right: 20rpx;
	}

	.ggc .ggh {
		height: 10vh;
	}

	.ggc .ggb {
		height: 100%;
	}

	.ggc .ggb .specv {
		min-width: 185rpx;
		padding: 0 30rpx;
		height: 70rpx;
		border-radius: 8rpx;
		text-align: center;
		line-height: 70rpx;
		background: #eff3f6;
		margin: 0 20rpx 20rpx 0;
	}

	.ggc .ggf {
		height: 19vh;
	}
</style>