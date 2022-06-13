<template>
	<view :class="['',co.class]"
		:style="'margin-top:'+''+(co.topMargin||'')+u+';'+'padding:'+(co.class?'':''+(co.upDownPadding||'0')+u+' '+(co.leftRightPadding||'0')+u)+';'"
		v-if="list.length">
		<swiper :autoplay="co.auto||true" circular="true" class="swiper " duration="500" indicatorActiveColor="#fff"
			indicatorColor="#ccc" :indicatorDots="list.length>1" :interval="co.interval*1000"
			:style="'height:'+''+(u=='px'?getSjgd(co.height):co.height)+u+';'+'border-radius:'+''+co.radius+u+';'">
			<swiper-item v-for="(v, i) in list" :key="i">
				<view @tap="goTo(i)" class="wh bf6 o-h ">
					<mg-img :src="v.icon||v.url" :vueId="'57129474-1-'+i"></mg-img>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "swiper",
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						class: "",
						topMargin: 0,
						leftRightPadding: 0,
						upDownPadding: 0,
						swiper: {
							children: []
						},
						duration: "",
						mode: "",
						height: "",
						radius: "",
						auto: !0,
						interval: 5
					};
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
				return 1 != this.co.reverseThree ? this.co.swiper || [] : this.StoreAd;
			}
		},
		watch: {
			storeInfo: {
				handler: function(n) {
					var t = this;
					// return o(i.default.mark(function n() {
					//   var e, r;
					//   return i.default.wrap(function (n) {
					//     for (;;) switch (n.prev = n.next) {
					//       case 0:
					//         if (!t.storeInfo.id || 1 != t.co.reverseThree) {
					//           n.next = 6;
					//           break;
					//         }

					//         return n.next = 3, t.util.request({
					//           url: t.api.StoreAd,
					//           data: {
					//             type: 1,
					//             storeId: t.storeInfo.id
					//           }
					//         });

					//       case 3:
					//         e = n.sent, r = e.data, t.StoreAd = r;

					//       case 6:
					//       case "end":
					//         return n.stop();
					//     }
					//   }, n);
					// }))();
				},
				immediate: !0
			}
		},
		methods: {
			goTo: function(t) {
				var e = this.list[t];
				if (e.entry) this.goUrl(e.entry, e);
				else if (e.link) switch (e.link.type) {
					case "webUrl":
						this.go({
							t: 1,
							url: "/yb_o2o/other/web-view?src=" + encodeURIComponent(JSON.stringify(e.link.url))
						});
						break;

					case "miniUrl":
						n.navigateTo({
							url: e.link.url
						});
						break;

					case "mini":
						uni.navigateToMiniProgram({
							appId: e.link.url,
							path: e.link.xcx_name
						});
				}
			}
		},
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