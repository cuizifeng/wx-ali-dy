<template>
	<view :class="['',bgc]"
		:style="'background-color:'+co.colorBg+';'+'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'+'border-radius:'+co.circle+u+';'"
		v-if="ebg.btnList.length>0">
		<swiper :autoplay="ebg.autoplay" :circular="ebg.circular" class="" indicatorActiveColor="#ccc"
			indicatorColor="#f5f5f5" :indicatorDots="showdot" :interval="ebg.interval" :style="'height:'+ebg.height+'rpx'+';'">
			<swiper-item class="" v-for="(pv, pi) in ebg.btnList" :key="pi">
				<view class="f-row swiper-v ">
					<view @tap="goTo(pv,i)" v-for="(v, i) in pv" :key="i">
						<view class="swiper-imgv o-h "
							:style="'width:'+imgw+'rpx'+';'+'height:'+imgw+'rpx'+';'+'border-radius:'+co.circleBtn+'%'+';'">
							<mg-img  class="" :src="v.img" :vueId="'642ffdca-1-'+pi+'-'+i"></mg-img>
						</view>
						<view class="swiper-tv mt10 t-o-e "
							:style="'color:'+(ebg.active&&activeIndex==v.id?color:ebg.colorWord)+';'">{{v.word}}</view>
						<view class="p-a swiper-fbt br bs30 cf f-c " v-if="v.subheading">{{v.subheading}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<mg-modal v-model="show" ismr="true" vueId="642ffdca-2" :vueSlots="['default']" width="80%" :zIndex="2002">
			<view class="bf bs30 " v-if="sjxx.storeInfo">
				<view class="t-c p330 f30 ">温馨提示：本店无线网络已覆盖</view>
				<view class="p2 ">
					<mg-cell :btt="sjxx.storeInfo.wifiName" class="" ht="Wifi名称:" hw="80" last="1"
						:vueId="'642ffdca-3'+','+'642ffdca-2'"></mg-cell>
					<mg-cell class="" ht="Wifi密码:" hw="80" last="1" :vueId="'642ffdca-4'+','+'642ffdca-2'"
						:vueSlots="['bd']">
						<view class="f-y-c c6 " slot="bd">
							<text class="f-g-1 ">{{sjxx.storeInfo.wifiPassworwd}}</text>
							<view class="f-g-0 ">
								<bk-b @tab="fz(sjxx.storeInfo.wifiPassworwd)" cName="f24 ml20" class="" :color="tColor" t="复制"
									type="2" :vueId="'642ffdca-5'+','+'642ffdca-4'"></bk-b>
							</view>
						</view>
					</mg-cell>
				</view>
				<view class="f-row hlt dbbtnc ">
					<button @tap="show = !1" class="f-1 bf f30 h100 f-c " hoverClass="be">确定</button>
				</view>
			</view>
		</mg-modal>
		<mg-modal v-model="showsm" ismr="true" vueId="642ffdca-6" :vueSlots="['default']" width="76%" :zIndex="2002">
			<view class="bf bs20 smc f-col f-y-c ">
				<view class="smimg mb30 ">
					<mg-img class="" src="/static/dndc/sm.png" :vueId="'642ffdca-7'+','+'642ffdca-6'">
					</mg-img>
				</view>
				<view class="f40 wei m30 ">请扫描桌号二维码下单</view>
				<view class="f26 c6 mb50 ">扫描二维码手机下单</view>
				<view class="foot-btnc posi-r mt30 p0 ">
					<button @tap="smdc" class="foot-btn b-l-f0f0 ">扫桌号二维码</button>
				</view>
				<view class="foot-btnc posi-r mt20 p0 ">
					<button @tap="showsm = !1" class="foot-btn bf cf1 ">稍后下单</button>
				</view>
			</view>
		</mg-modal>
		<mg-share v-model="shareshow" vueId="642ffdca-8"></mg-share>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import mgModal from 'components/common/modal.vue';
	import bkB from 'components/common/block-b.vue';
	import MgCell from 'components/common/mg-cell.vue';
	import MgImg from 'components/common/mg-img.vue';
	import mgShare from 'components/template/share.vue';
	import {
		fz,
		message
	} from 'common/util';
	export default {
		name: "searchBox",
		components: {
			mgModal,
			bkB,
			MgCell,
			MgImg,
			mgShare,
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			iheight: {
				type: String,
				default: "170"
			},
			oheight: {
				type: Number,
				default: 0
			},
			u: {
				type: String,
				default: "px"
			},
			color: {
				type: String,
				default: ""
			},
			imgw: {
				type: String,
				default: ""
			},
			bgc: ""
		},
		data: function() {
			return {
				fz,
				ebg: {
					class: "",
					padding: 0,
					topMargin: 0,
					buttonNumberOfCol: 5,
					buttonNumberOfRow: 1,
					color: "#666",
					btnList: [],
					shape: 1,
					autoplay: !0,
					circular: !0,
					interval: "5000"
				},
				show: !1,
				showsm: !1,
				shareshow: !1,
				activeIndex: -1
			};
		},
		computed: {
			...mapState(['sjxx']),
			showdot: function() {
				return this.ebg.btnList.length > 1;
			}
		},
		watch: {
			co: {
				handler: function(t) {
					var e,
						n = Object.assign({}, t),
						o = t.num,
						r = t.line,
						i = [];

					if (n.btnList.length > 0) {
						for (var c = 0, a = n.btnList.length; c < a; c += o * r) i.push(n.btnList.slice(c, c + o * r));

						e = 2 == r && i[0].length > o ? i.length > 1 ? 2 * this.iheight + 20 : 2 * this.iheight : i.length > 1 ? +this
							.iheight + 20 : this.iheight;
					}

					n.width = 100 / o, n.btnList = i, n.height = +e + this.oheight, this.ebg = Object.assign({}, this.ebg, n);
				},
				immediate: !0
			}
		},
		methods: {
			goTo: function(t) {
				t.url ? "wifi" == t.url.param ? this.show = !0 : "inStore" == t.url.param ? this.showsm = !0 : "share" == t.url
					.param ? this.shareshow = !0 : "reserve" == t.url.param || "queuing" == t.url.param ? 1 == this.sjxx.storeInfo
					.isOpen ? this.goUrl(t.url, t) : message("商家休息中，无法使用此功能", 3) : this.goUrl(t.url, t) : (this
						.activeIndex = t.id == this.activeIndex ? -1 : t.id, this.$emit("tabitem", t.id == this.activeIndex ? t : {}));
			},
			smdc: function() {
				this.showsm = !1, (0, a.scanCode)(this);
			}
		}
	}
</script>
<style scoped>
	.swiper-v {
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.swiper-imgv {
		margin-top: 15rpx;
		width: 88rpx;
		height: 88rpx;
	}

	.swiper-tv {
		font-size: 24rpx;
		width: 100%;
		text-align: center;
	}

	.swiper-fbt {
		top: 5rpx;
		right: -5rpx;
		padding: 0rpx 10rpx;
		font-size: 18rpx;
	}

	.dbbtnc {
		height: 100rpx;
	}

	.smc {
		padding: 100rpx 40rpx 30rpx;
	}

	.smimg {
		width: 190rpx;
		height: 190rpx;
	}

	.foot-btn {
		height: 84rpx;
		line-height: 84rpx;
	}
</style>