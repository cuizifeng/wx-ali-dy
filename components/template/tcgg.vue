<template>
	<mg-modal v-model="show" ismr="true" vueId="13b47966-1" :vueSlots="['default']" width="550rpx" :zIndex="3000">
		<mg-swiper class="" :co="swiper" :color="tColor" u="rpx" :vueId="'13b47966-2'+','+'13b47966-1'"></mg-swiper>
		<view @tap="show = !1" class="tcbtm f-c ">
			<text class="iconfont iconcuo cf f60 "></text>
		</view>
	</mg-modal>
</template>

<script>
	import mgModal from 'components/common/modal.vue';
	import MgSwiper from 'components/common/functionCmp/swiper.vue';
	export default {
		name: "searchBox",
		components: {
			mgModal,
			MgSwiper
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			value: {
				type: Boolean,
				default: !1
			},
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			color: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				swiper: {
					class: "bs20",
					swiper: {
						children: []
					},
					duration: "",
					mode: "",
					height: "733",
					radius: 20,
					auto: !0,
					interval: 5
				}
			};
		},
		computed: {
			show: {
				get: function() {
					return this.value;
				},
				set: function(n) {
					this.$emit("input", n);
				}
			}
		},
		watch: {
			list: {
				handler: function(n) {
					var t = this;
					this.$nextTick(() => {
						n.length && (t.swiper.swiper.children = n);
					})
				},
				immediate: !0
			}
		},
		methods: {}
	}
</script>
<style scoped>
	.tcbtm {
		margin-top: 50rpx;
	}
</style>