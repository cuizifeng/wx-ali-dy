<template>
	<view class="open " v-if="!hasKp&&co.status==1">
		<view class="posi-f wh t0 " style="z-index:9998;" v-if="co.type==1">
			<pic-lunbo-by class="" :co="swiper" :color="tColor" u="vh" vueId="d24481a8-1">
			</pic-lunbo-by>
			<view @tap="tg" class="posi-a f-c countC cf " v-if="co.pageCategory!=0">{{second+' 跳过'}}</view>
		</view>
		<mg-popup v-model="show" close="false" dhsj="0.8s" mask="true" :msname='{
							background: "rgba(" + cTR(co.colorBg) + "," + co.percent / 100 + ")"
						}' :value="show" vueId="d24481a8-2" :vueSlots="['default']" v-else>
			<view class="tcggc h100v f-c-c ">
				<view class="tcgg ">
					<pic-lunbo-by class="" :co="swiper2" :color="tColor" u="rpx" :vueId="'d24481a8-3'+','+'d24481a8-2'"></pic-lunbo-by>
					<view @tap="gbtc" class="tcbtm f-c ">
						<text class="iconfont iconx2 cf "></text>
					</view>
				</view>
			</view>
		</mg-popup>
	</view>
</template>

<script>
	import {
		utilMixins
	} from '@/common/utilMixins';
	import {
		mapActions
	} from 'vuex'
	import mgPopup from '../common/popup.vue';
	import picLunboBy from './picLunbo.vue';
	export default {
		name: "open",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},

		components: {
			mgPopup,
			picLunboBy
		},
		data: function() {
			return {
				swiper: {
					imgUrl: [],
					height: "100"
				},
				second: "",
				show: !1,
				swiper2: {
					imgUrl: [],
					height: "700",
					circle: "30"
				}
			};
		},
		mixins: [utilMixins],
		computed: {
			hasKp() {
				try {
					return this.$store.state.config.hasKp;
				} catch (error) {
					return '';
				}
			}
		},
		methods: {
			...mapActions(["getConfig"]),
			gbtc: function() {
				var t = this;
				this.show = !1, setTimeout(function() {
					t.tg();
				}, 800);
			},
			tg: function() {
				this.getConfig({
					key: "hasKp",
					data: !0
				}), clearInterval(this.dsq);
			}
		},
		created: function() {
			var t = this;
			1 != this.co.status || this.hasKp ? this.tg() : 1 == this.co.type ? (this.swiper.imgUrl = this.co.imgUrl, this
				.second = 5, this.dsq = setInterval(function() {
					t.second--, t.second <= 0 && t.tg();
				}, 1e3)) : (this.swiper2.imgUrl = this.co.imgUrl, setTimeout(function() {
				t.show = !0;
			}, 800));
		}
	}
</script>
<style scoped>
	.countC {
		width: 140rpx;
		height: 55rpx;
		top: 80rpx;
		left: 30rpx;
		border-radius: 55rpx;
		background-color: hsla(0, 0%, 57.6%, .6);
	}

	.tcgg {
		width: 70%;
	}

	.tcbtm {
		margin-top: 50rpx;
	}

	.iconx2 {
		font-size: 68rpx;
	}
</style>