<template>
	<view class="">
		<view class="pb130 " v-if="info.id">
			<view class="sltop cf " :style="'background:'+tColor+';'">
				<mg-cell bgc="transparent" class="" last="1" vueId="bbd0bc0a-1" :vueSlots="['bd']">
					<view class="f-row " slot="bd">
						<view class="f-1 f36 f-y-c ">
							<text class="t-o-e wei ">{{orderState.str1}}</text>
						</view>
						<view @tap="makeTel(info.storeTel)" class="f-y-c lxmd b-d p-13-20 bs60 " style="border-color:#FFFFFF;">
							<text class="iconfont icondh cf mr10 f28 "></text>
							<view class="">联系门店</view>
						</view>
					</view>
				</mg-cell>
			</view>
			<view class="p03 olbd ">
				<mg-cell brs="50%" class="" cname="mb30 bs20" h="60" img="/static/lb.png" vueId="bbd0bc0a-2" :vueSlots="['bd']"
					w="60" v-if="info.state==1&&orderset.instore.fastAutoClose==1">
					<view class="f26 " slot="bd">
						<view class="">{{'超过'+orderset.instore.fastCloseTime+'分钟未支付，订单将自动取消哦！'}}</view>
						<view class="mt10 " v-if="stime">剩余:<text class="ml20 "
								:style="'color:'+tColor+';'">{{stime[2]+':'+stime[3]}}</text>
						</view>
					</view>
				</mg-cell>
				<view class="bf mb30 bs20 ">
					<view class="p3 ">
						<view class="" v-if="orderState.str2">
							<view class="f30 wei ">{{orderState.str2}}</view>
							<view class="mt30 t-c " v-if="info.state>=2&&info.state<=4">
								<view class="f32 ">取单号</view>
								<view class="f56 wei p20 " style="letter-spacing:10rpx;">{{info.callNo}}</view>
								<view class="m30 f-y-c f24 c9 ">
									<view class="f-1 f-c-c ">
										<text :class="['iconfont iconxd f56 ',info.state==2?'c3':'']"></text>
										<view :class="['mt10 ',info.state==2?'c3':'']">已下单</view>
									</view>
									<view class="ydhx "></view>
									<view class="f-1 f-c-c ">
										<text :class="['iconfont icondjs f56 ',info.state==3?'c3':'']"></text>
										<view :class="['mt10 ',info.state==3?'c3':'']">制作中</view>
									</view>
									<view class="ydhx "></view>
									<view class="f-1 f-c-c ">
										<text :class="['iconfont iconwc f56 ',info.state==4?'c3':'']"></text>
										<view :class="['mt10 ',info.state==4?'c3':'']">已完成</view>
									</view>
								</view>
							</view>
							<view class="f24 mt10 " :style="'color:'+tColor+';'" v-if="orderState.str3">{{orderState.str3}}</view>
						</view>
					</view>
				</view>
				<view class="mb30 bs20 ">
					<mg-cell class="" isr="1" vueId="bbd0bc0a-3" :vueSlots="['bd']">
						<view class="" slot="bd">
							<view class="f30 f-y-c ">
								<text class="t-o-e wei ">{{info.storeName}}</text>
							</view>
						</view>
					</mg-cell>
					<mg-cell brs="5rpx" class="" :cname="i!=info.goodsArr.length-1?'la154':''" h="104" :img="v.icon" isr="1"
						:vueId="'bbd0bc0a-4-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in info.goodsArr" :key="i">
						<view class="" slot="bd">
							<view class="f-bt ">
								<view class="t-o-e ">{{v.name}}</view>
								<view class="f-g-0 f32 ">{{osl+itemTotal(v)}}</view>
							</view>
							<view class="f-bt mt10 f24 c9 ">
								<view class="f-g-1 f-raw ">
									<text class="ml10 " v-if="v.data">{{v.data}}</text>
									<text class="" v-if="v.attribute">{{'('+v.attribute+')'}}</text>
									<text class="ml10 " v-if="v.material">{{'+'+v.material}}</text>
								</view>
								<view class="">{{'x'+v.num}}</view>
							</view>
						</view>
					</mg-cell>
					<mg-cell btt="打包盒费" class="" :ft="''+osl+info.boxMoney" ftc="f32 c3" isr="1" vueId="bbd0bc0a-5" :vueSlots="['hd']"
						v-if="info.boxMoney>0">
						<view class="itemcon popsf mr20 " slot="hd">包装费</view>
					</mg-cell>
					<mg-cell btt="店铺满减优惠" class="" :color="tColor" :ft="'-'+sl+info.preferentialMoney" ftc="f32" isr="1"
						vueId="bbd0bc0a-6" v-if="info.preferentialMoney>0"></mg-cell>
					<mg-cell btt="门店新客立减" class="" :color="tColor" :ft="'-'+osl+info.newMoney" ftc="f32" isl="1" vueId="bbd0bc0a-7"
						:vueSlots="['hd']" v-if="info.newMoney>0">
						<view class="itemcon poxk mr20 " slot="hd">新客</view>
					</mg-cell>
					<mg-cell btt="商家优惠券抵扣" class="" :color="tColor" :ft="'-'+osl+info.couponPreferential" ftc="f32" isr="1"
						vueId="bbd0bc0a-8" v-if="info.couponPreferential>0"></mg-cell>
					<mg-cell btt="平台优惠券抵扣" class="" :color="tColor" :ft="'-'+sl+info.platformCouponPreferential" ftc="f32" isr="1"
						vueId="bbd0bc0a-9" v-if="info.platformCouponPreferential>0"></mg-cell>
					<mg-cell class="" isl="1" vueId="bbd0bc0a-10" :vueSlots="['bd','ft']" v-if="info.taxRatio>0">
						<view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+info.taxRatio+'%)'}}</text>
						</view>
						<view class="f32 c3 " slot="ft">{{'+'+osl+info.tax}}</view>
					</mg-cell>
					<mg-cell class="" isr="1" last="1" vueId="bbd0bc0a-11" :vueSlots="['bd','ft']">
						<view class="c9 f24 f-row " slot="bd">
							<view class="f-g-0 f-y-c ">优惠规则<text class="iconfont iconwen f26 c9 ml10 "></text>
							</view>
						</view>
						<view class="ml10 c3 " slot="ft">
							<text class="f24 ">{{'共'+info.goodsNum+'件商品'}}</text>
							<text class="m02 ">小计</text>
							<text class="f34 ">{{osl+info.money}}</text>
						</view>
					</mg-cell>
				</view>
				<view class="mb30 bf bs20 ">
					<mg-cell btt="订单信息" bttc="f30 wei" class="" isr="1" vueId="bbd0bc0a-12"></mg-cell>
					<view class="p20 ">
						<mg-cell btt="就餐方式" bttc="c9" class="" cname="p13" :ft="info.isOut==1?'店内就餐':'打包带走'" ftc="c3" last="1"
							vueId="bbd0bc0a-13"></mg-cell>
						<mg-cell btt="订单号码" bttc="c9" class="" cname="p13" last="1" vueId="bbd0bc0a-14" :vueSlots="['ft']">
							<view class="f-y-c " slot="ft">
								<text class="c3 ">{{info.outTradeNo}}</text>
								<bk-b @tab="fz(info.outTradeNo)" cName="f24 ml20" class="" t="复制" type="2"
									:vueId="'bbd0bc0a-15'+','+'bbd0bc0a-14'"></bk-b>
							</view>
						</mg-cell>
						<mg-cell btt="下单时间" bttc="c9" class="" cname="p13" :ft="timeToDate(info.createdAt)" ftc="c3" last="1" vueId="bbd0bc0a-16"></mg-cell>
						<mg-cell btt="支付方式" bttc="c9" class="" cname="p13" :ft="payName(info.payMode)" ftc="c3" last="1" vueId="bbd0bc0a-17"
							v-if="info.payMode"></mg-cell>
						<mg-cell bdmw="130rpx" btt="订单备注" bttc="c9" class="" cname="p13" :ft="info.userNote" ftc="c3 f-s-1" last="1"
							noc="1" vueId="bbd0bc0a-18" v-if="info.userNote"></mg-cell>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import bkB from "components/common/block-b.vue";
	import MgCell from "components/common/mg-cell.vue";
	import {
		countDownTime,
		fz,
		makeTel,
		setNT,
		swnb
	} from 'common/util';
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		utilMixins
	} from 'common/utilMixins';
	export default {
		name: "order-dl",
		components: {
			bkB,
			MgCell,
		},
		data: function() {
			return {
				makeTel,
				fz,
				info: {},
				stime: "",
				latitude: "",
				longitude: "",
				covers: [],
				line: [],
				sjxx: {},
				loading: !1
			}
		},
		onLoad: function(e) {
			var t = this;
			t.getSystem({
				setNB: 1
			}), setNT("订单详情"), t.orderId = e.id,  t.getConfig({
				key: "order_order__set",
				api: "ddsz"
			});
			t.getInfo();
		},
		mixins: [utilMixins],
		computed: {
			...mapState({
				orderset: function(e) {
					return e.config.orderset
				}
			}),
			orderState: function() {
				var e = "",
					t = "",
					n = "";
				switch (+this.info.state) {
					case 1:
						e = "待支付", t = "请尽快支付";
						break;
					case 2:
						e = "待接单", t = "请等待商家待接单";
						break;
					case 3:
						e = "订单制作中", t = "请耐心等待商家备餐";
						break;
					case 4:
						e = "订单已完成", t = "感谢您对我们的信任，期待再次光临";
						break;
					case 5:
						e = "已关闭", t = "订单已关闭";
						break
				}
				return {
					str1: e,
					str2: t,
					str3: n
				}
			},
			zqmArr: function() {
				return this.info.selfCode && this.info.selfCode.split("")
			},
			osl: function() {
				return this.info.symbol || this.sl
			}
		},
		methods: {
			...mapActions(["getConfig"]),
			getInfo: function() {
				var e = this;
				this.$api['in-store_fast__order__info']({
					id: e.orderId
				}).then(res => {
					res && (e.info = res, 1 == res.state && e.djs(res.createdAt));
				})
			},
			itemTotal: function(e) {
				var t = +(e.vipMoney > 0 && +e.vipMoney < +e.money && e.vipMoney || e.money);
				return +(t * e.num).toFixed(2)
			},
			getJldata: function(e) {
				if (e) {
					var t = "";
					return e.forEach((function(e) {
						t += e.name + ","
					})), t.substr(0, t.length - 1)
				}
			},
			djs: function(e) {
				var t = this;
				if (1 == this.info.state && 1 == this.orderset.instore.fastAutoClose) {
					var n = this.dateToTime(),
						o = +e + 60 * this.orderset.instore.fastCloseTime;
					o > n && (this.stime = countDownTime(o - n), this.dsq = setInterval(() => {
						o -= 1,
							o == n && (clearInterval(t.dsq),
								swnb(1e3),
								t.stime = countDownTime(o - n));
					}), 1e3)
				}
			}
		},
		onUnload: function() {
			this.dsq && clearInterval(this.dsq)
		}
	}
</script>
<style scoped>
	.sltop {
		height: 330rpx;
	}

	.olbd {
		margin-top: -200rpx;
	}

	.obtn {
		margin: 0 25rpx 0 0;
	}

	.ydhx {
		width: 60rpx;
		margin-bottom: 30rpx;
		border-top: 4rpx dotted #999;
	}
</style>