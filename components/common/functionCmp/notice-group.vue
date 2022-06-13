<template>
	<view @tap="goLink" class="bf "
		:style="'padding:'+(co.txtOrImg==0?'25rpx 30rpx 0rpx':''+co.upDownPadding+u+' '+co.leftRightPadding+u)+';'+'margin-top:'+''+co.topMargin+u+';'">
		<view class="p03 f-y-c " :style='[{
							backgroundColor: co.backgroundColor,
							borderRadius: 0 == co.txtOrImg ? "20rpx" : 0,
							paddingRight: 0 == co.txtOrImg ? "15rpx" : ""
						}, sname]'>
			<view class="f-g-0 ">
				<view class="limg mr20 " v-if="co.txtOrImg==1&&co.icon[0].url">
					<mg-img class="" m="aspectFit" :src="co.icon[0].url" vueId="3d3aba62-1"></mg-img>
				</view>
				<view class="mr20 ggbt wei " :style="'color:'+co.notice.color+';'+'font-size:'+co.notice.fontSize+';'" v-else>
					{{co.notice.title}}</view>
			</view>
			<view class="f-g-1 ngr b-s1 bs10 " :style="'height:'+(co.txtOrImg==0?'70rpx':'')+';'">
				<uni-notice-bar :backgroundColor="co.backgroundColor" class="" :color="co.txtOrImg==0?'#8B5C42':tColor"
					scrollable="true" single="true" :text="notice" vueId="3d3aba62-2" v-if="type==1&&notice"></uni-notice-bar>
				<swiper autoplay="true" circular="true" class="wh " interval="2000" vertical="true" v-else>
					<swiper-item @tap.stop="goDl(v)" class="f-c-xc " v-for="(v, i) in nlist" :key="i">
						<view class="c6 f24 t-o-e " :style="'color:'+(co.txtOrImg==0?'#8B5C42':'')+';'">{{v.title}}</view>
					</swiper-item>
				</swiper>
			</view>
			<text class="ml10 iconfont iconright " style="color:#8B5C42;" v-if="co.txtOrImg==0&&type!=1"></text>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from 'components/third/uni-notice-bar.vue';
	export default {
		name: "searchBox",
		components: {
			uniNoticeBar
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {
						icon: [],
						link: {},
						notice: {},
						txtOrImg: 1
					};
				}
			},
			sjxx: {
				type: Object,
				default: function() {
					return {};
				}
			},
			u: {
				type: String,
				default: "px"
			},
			ptype: {
				type: String,
				default: "1"
			},
			type: {
				type: String,
				default: "1"
			},
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			sname: Object,
			color: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				notice: "",
				nlist: []
			};
		},
		watch: {
			sjxx: {
				handler: function(t) {
					t.storeInfo && (this.notice = t.storeInfo.notice);
				},
				immediate: !0
			}
		},
		methods: {
			goLink: function() {
				this.goUrl(this.co.link);
			},
			goDl: function(n) {
				uni.setStorageSync("fwb", n.content), this.go({
					t: 1,
					url: "/yb_o2o/my/other/gywm?t=".concat(n.title, "&p=4")
				});
			}
		},
		created: function() {
			var t = this;
			// return r(c.default.mark(function n() {
			// 	var e, o;
			// 	return c.default.wrap(function(n) {
			// 		for (;;) switch (n.prev = n.next) {
			// 			case 0:
			// 				n.t0 = +t.ptype, n.next = 1 === n.t0 ? 3 : 2 === n.t0 ? 9 : 11;
			// 				break;

			// 			case 3:
			// 				return n.next = 5, t.util.request({
			// 					url: t.api.Notice
			// 				});

			// 			case 5:
			// 				return e = n.sent, o = e.data, t.nlist = o, n.abrupt("break", 12);

			// 			case 9:
			// 				return t.nlist = t.list, n.abrupt("break", 12);

			// 			case 11:
			// 				return n.abrupt("break", 12);

			// 			case 12:
			// 			case "end":
			// 				return n.stop();
			// 		}
			// 	}, n);
			// }))();
		}
	}
</script>
<style scoped>
	.ggbt {
		padding: 1rpx 12rpx 1rpx 0;
		font-size: 24rpx;
		border-radius: 7rpx;
	}

	.limg {
		width: 80rpx;
		height: 50rpx;
	}

	.ngr {
		padding: 10rpx 0rpx;
		height: 80rpx;
	}
</style>