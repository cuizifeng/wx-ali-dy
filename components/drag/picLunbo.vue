<template>
	<view :class="['',co.class]" :style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'"
		v-if="list.length">
		<swiper :autoplay="co.auto||true" circular="true" class="swiper " duration="500" indicatorActiveColor="#fff"
			indicatorColor="#ccc" :indicatorDots="list.length>1" :interval="5000"
			:style="'height:'+''+(u=='px'?getSjgd(co.height):co.height)+u+';'+'border-radius:'+''+co.circle+u+';'">
			<swiper-item class="" v-for="(v, i) in list" :key="i">
				<view @tap="goTo(i)" class="wh o-h ">
					<mg-img class="" :src="v.img||v.url" :vueId="'6fee648e-1-'+i"></mg-img>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "picLunbo",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			storeInfo: {
				type: Object,
				default: function() {
					return {};
				}
			},
			u: {
				type: String,
				default: "px"
			},
			color: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				StoreAd: []
			};
		},
		computed: {
			list: function() {
				return 1 != this.co.reverseThree ? this.co.imgUrl || [] : this.StoreAd;
			}
		},
		watch: {
			storeInfo: {
				handler: function(t) {
					var n = this;
					// return o(a.default.mark(function t() {
					// 	var e, r;
					// 	return a.default.wrap(function(t) {
					// 		for (;;) switch (t.prev = t.next) {
					// 			case 0:
					// 				if (!n.storeInfo.id || 1 != n.co.reverseThree) {
					// 					t.next = 6;
					// 					break;
					// 				}

					// 				return t.next = 3, n.util.request({
					// 					url: n.api.StoreAd,
					// 					data: {
					// 						type: 1,
					// 						storeId: n.storeInfo.id
					// 					}
					// 				});

					// 			case 3:
					// 				e = t.sent, r = e.data, n.StoreAd = r;

					// 			case 6:
					// 			case "end":
					// 				return t.stop();
					// 		}
					// 	}, t);
					// }))();
				},
				immediate: !0
			}
		},
		methods: {
			goTo: function(n) {
				var e = this.list[n];
				if (e.url) this.goUrl(e.url, e);
				else if (e.link) switch (e.link.type) {
					case "webUrl":
						this.go({
							t: 1,
							url: "/yb_o2o/other/web-view?src=" + encodeURIComponent(JSON.stringify(e.link.url))
						});
						break;

					case "miniUrl":
						t.navigateTo({
							url: e.link.url
						});
						break;

					case "mini":
						t.navigateToMiniProgram({
							appId: e.link.url,
							path: e.link.xcx_name
						});
				}
			}
		}
	}
</script>
<style scoped>
	.swiper {
		width: 100%;
		height: 350rpx;
		overflow: hidden;
		transform: translateY(0);
	}
</style>