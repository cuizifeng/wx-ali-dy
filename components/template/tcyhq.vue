<template>
	<mg-modal v-model="show" ismr="true" vueId="80c486e6-1" :vueSlots="['default']"
		:width="type==1?'632rpx':type==2?'632rpx':'562rpx'" :zIndex="3000">
		<view class="" v-if="type==1&&co.couponList">
			<view class="tctop posi-r ">
				<view class="tcimg ">
					<mg-img class="" :src="co.icon||onImgurl+'img/yhqbg.png'" :vueId="'80c486e6-2'+','+'80c486e6-1'">
					</mg-img>
				</view>
				<view class="posi-a tctopbd f-col ">
					<view class="f-g-0 tctopbdt t-c ">
						<view class="f34 wei cf f-c ">
							<view class="hx "></view>
							<view class="zfls4 ">{{co.name||'活动名称'}}</view>
							<view class="hx "></view>
						</view>
					</view>
					<scroll-view class="f-1 tctopbdb o-h " scroll-y="true">
						<view class="mb20 " v-for="(v, i) in co.couponList" :key="i">
							<mg-coupon class="" cname="mb20" :co="v" :color="color" ptype="2" :vueId="'80c486e6-3-'+i+','+'80c486e6-1'">
							</mg-coupon>
						</view>
					</scroll-view>
				</view>
				<view class="posi-a w100 tctopft f-c f22 ">
					<button @tap="ljlq" class="lqbtn bs10 cf f28 f-c zfls4 wei bt " :disabled="loading"
						:style="'background:'+(loading?'transparent':'')+';'">立即领取</button>
				</view>
			</view>
			<view @tap="show = !1" class="tcbtm f-c ">
				<text class="iconfont iconx2 cf " style="font-size:66rpx;"></text>
			</view>
		</view>
		<block v-else>
			<block v-if="type==2&&co.couponArr">
				<view class="tctop posi-r ">
					<view class="tcimg2 ">
						<mg-img class="" :src="co.bgImg||onImgurl+'img/yhqbg.png'" :vueId="'80c486e6-4'+','+'80c486e6-1'"></mg-img>
					</view>
					<view class="posi-a tctopbd2 f-col ">
						<view class="f-g-0 tctopbdt t-c ">
							<view class="f34 wei cf f-c ">
								<view class="hx "></view>
								<view class="zfls4 ">{{co.name||'活动名称'}}</view>
								<view class="hx "></view>
							</view>
						</view>
						<scroll-view class="f-1 tctopbd2b o-h " scroll-y="true">
							<view class="mb20 " v-for="(v, i) in co.couponArr" :key="i">
								<mg-coupon class="" cname="mb20" :co="v" :color="color" ptype="2" :vueId="'80c486e6-5-'+i+','+'80c486e6-1'">
								</mg-coupon>
							</view>
						</scroll-view>
					</view>
					<view class="posi-a w100 tctopft f-c f22 ">
						<button @tap="ljlq" class="lqbtn bs10 cf f28 f-c zfls4 wei bt " :disabled="loading"
							:style="'background:'+(loading?'transparent':'')+';'">立即领取</button>
					</view>
				</view>
				<view @tap="show = !1" class="tcbtm2 f-c ">
					<text class="iconfont iconx2 cf " style="font-size:66rpx;"></text>
				</view>
			</block>
			<block v-else>
				<block v-if="type==3">
					<view class="tctop posi-r ">
						<view class="tcimg3 ">
							<mg-img class="" :src="co.icon||onImgurl+'img/xrzxbg.png'" :vueId="'80c486e6-6'+','+'80c486e6-1'"></mg-img>
						</view>
						<view class="posi-a tctopbd3 f-col ">
							<scroll-view class="f-1 tctopbd3b o-h " scroll-y="true">
								<block v-if="co.couponArr.length">
									<view class="jlbt f-y-c ">
										<view class="xhx "></view>
										<view class="f-g-0 ">优惠券奖励</view>
										<view class="xhx "></view>
									</view>
									<view class="jlic ">
										<mg-coupon class="" cname="mb20" :co="v" :color="color" ptype="2" :vueId="'80c486e6-7-'+i+','+'80c486e6-1'"
											v-for="(v, i) in co.couponArr" :key="i"></mg-coupon>
									</view>
								</block>
								<block v-if="co.balance>0">
									<view class="jlbt f-y-c ">
										<view class="xhx "></view>
										<view class="f-g-0 ">{{system.custom.balance+'奖励'}}</view>
										<view class="xhx "></view>
									</view>
									<view class="jlic p-r ">
										<view class="bgimg ">
											<image class="wh " :src="yhqbg"></image>
										</view>
										<view class="p-a coubd wh f-row ">
											<view class="coubdl p20 f-c-c cf5 ">
												<view class="">
													<text class="">{{sl}}</text>
													<text class="f50 ml5 wei ">{{co.balance}}</text>
												</view>
											</view>
											<view class="p-10-30 f-1 f-y-c ">
												<view class="f-g-1 f26 ">{{'新人赠送'+system.custom.balance}}</view>
											</view>
										</view>
									</view>
								</block>
								<block v-if="co.integral>0">
									<view class="jlbt f-y-c ">
										<view class="xhx "></view>
										<view class="f-g-0 ">{{system.custom.integral+'奖励'}}</view>
										<view class="xhx "></view>
									</view>
									<view class="jlic p-r ">
										<view class="bgimg ">
											<image class="wh " :src="yhqbg"></image>
										</view>
										<view class="p-a coubd wh f-row ">
											<view class="coubdl p20 f-c-c cf5 ">
												<view class="f-y-c ">
													<text class="f50 wei ">{{co.integral}}</text>
													<text class="f22 ml5 ">{{system.custom.integral}}</text>
												</view>
											</view>
											<view class="p-10-30 f-1 f-y-c ">
												<view class="f-g-1 f26 ">{{'新人赠送'+system.custom.integral}}</view>
											</view>
										</view>
									</view>
								</block>
								<block v-if="co.growth>0">
									<view class="jlbt f-y-c ">
										<view class="xhx "></view>
										<view class="f-g-0 ">成长值奖励</view>
										<view class="xhx "></view>
									</view>
									<view class="jlic p-r ">
										<view class="bgimg ">
											<image class="wh " :src="yhqbg"></image>
										</view>
										<view class="p-a coubd wh f-row ">
											<view class="coubdl p20 f-c-c cf5 ">
												<view class="f-y-c ">
													<text class="f50 wei ">{{co.growth}}</text>
													<text class="f22 ml5 ">成长值</text>
												</view>
											</view>
											<view class="p-10-30 f-1 f-y-c ">
												<view class="f-g-1 f26 ">新人赠送成长值</view>
											</view>
										</view>
									</view>
								</block>
							</scroll-view>
						</view>
					</view>
					<view @tap="$emit('input',false)" class="tcbtm3 f-c ">
						<text class="iconfont iconx2 cf f60 "></text>
					</view>
				</block>
			</block>
		</block>
	</mg-modal>
</template>

<script>
	import mgModal from 'components/common/modal.vue';
	import mgCoupon from 'components/common/mg-coupon.vue';
	import {
		message,
		stfn
	} from 'common/util';
	export default {
		name: "searchBox",
		components: {
			mgModal,
			mgCoupon
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
			color: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "1"
			}
		},
		data: function() {
			return {
				list: [{
					name: "优惠券名称",
					type: 1,
					money: "8",
					fullMoney: "20",
					useExplain: "有效期至2020-11-85 12:56"
				}, {
					name: "优惠券名称",
					type: 2,
					discount: "8.9",
					fullMoney: "20",
					useExplain: "有效期至2020-11-85 12:56"
				}, {
					name: "优惠券名称",
					type: 1,
					money: "18",
					fullMoney: "",
					useExplain: "有效期至2020-11-85 12:56"
				}],
				yhqbg: "/static/static/yhq/xyhq.png",
				loading: !1
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
		methods: {
			ljck: function() {
				var n = this;
				setTimeout(function() {
					n.go({
						t: 1,
						url: "/yb_wm/my/coupon/my"
					});
				}, 100);
			},
			ljlq: function() {
				var n = this;
				n.checkLogin().then(res => {
					n.loading = !0, t.next = 7,
						this.$api[1 == n.type ? "shop_receive__window__coupon" : "member_receive__issue__coupons"]({
							id: n.co.id
						}).then(res => {
							message("领取成功", 1);
							stfn(() => {
								n.loading = n.show = !1;
							})
						})
				})
			}
		},
	}
</script>
<style scoped>
	.zfls4 {
		letter-spacing: 4rpx;
	}

	.tcimg {
		width: 100%;
		height: 845rpx;
	}

	.tctopbd {
		width: 572rpx;
		height: 540rpx;
		top: 168rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.tctopft {
		height: 83rpx;
		bottom: 36rpx;
		color: #fff;
	}

	.tctopft .lqbtn {
		height: 100%;
		width: 360rpx;
	}

	.tctopbdt {
		padding: 20rpx 30rpx;
	}

	.tctopbdt .hx {
		margin: 0 15rpx;
		width: 24rpx;
		height: 1.5px;
		background: #fff;
	}

	.tctopbdb {
		padding: 0rpx 20rpx;
	}

	.tcbtm {
		margin-top: 48rpx;
	}

	.tcimg2 {
		width: 100%;
		height: 845rpx;
	}

	.tctopbd2 {
		width: 572rpx;
		height: 540rpx;
		top: 168rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.tctopbd2b {
		padding: 0rpx 20rpx;
	}

	.tcbtm2 {
		margin-top: 30rpx;
	}

	.tcimg3 {
		height: 838rpx;
	}

	.tctopbd3 {
		width: 100%;
		height: 500rpx;
		top: 338rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.tctopbd3b {
		padding: 30rpx 40rpx 20rpx;
	}

	.tcbtm3 {
		margin-top: 30rpx;
	}

	.jlbt {
		color: #fce82c;
	}

	.jlbt .xhx {
		width: 100%;
		margin: 0 20rpx;
		height: 0;
		border-top: 2px dashed #fce82c;
	}

	.jlic {
		margin: 10rpx 0 20rpx;
	}

	.jlic .bgimg {
		height: 140rpx;
	}

	.jlic .coubd {
		top: 0;
		left: 0;
	}

	.jlic .coubdl {
		width: 205rpx;
	}
</style>