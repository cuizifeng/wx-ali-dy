<template>
	<view>
		<view class="p253 bf5 posi-f w100 l0 " :style="'top:'+ltop+';'" v-if="labelarr.length">
			<scroll-view class="ws-n ipolcs f-y-c " :scrollIntoView="siv" :scroll-x="true">
				<bk-b @tab="lTab(i)" :cName="'f-g-0 dis-in mr20 bs60 '+(i!=laidx&&'c3')" :color="i==laidx?tColor:'#F1F2F3'" :t="v"
					:vueId="'4e3fea00-1-'+i" v-for="(v, i) in labelarr" :key="i"></bk-b>
			</scroll-view>
		</view>
		<view :class="['',hasLabel?'ipomt':'']">
			<my-order @operation="operation" :co="v" :otype="otype" :vueId="'4e3fea00-2-'+i" v-for="(v, i) in datalist" :key="i">
			</my-order>
		</view>
	</view>
</template>

<script>
	import bkB from 'components/common/block-b.vue';
	import myOrder from './my-dnorder.vue';
	import {
		utilMixins
	} from 'common/utilMixins';
	import {
		makeTel,
		message,
		modal
	} from 'common/util';
	export default {
		name: "orderIndex",
		components: {
			myOrder,
			bkB
		},
		props: {
			datalist: Array,
			labelarr: Array,
			otype: [String, Number],
			ltop: String,
			value: {
				type: Number,
				default: 0
			}
		},
		data: function() {
			return {
				siv: ""
			};
		},
		mixins: [utilMixins],
		computed: {
			laidx: {
				get: function() {
					return this.value;
				},
				set: function(e) {
					this.$emit("input", e);
				}
			},
			hasLabel: function() {
				return this.labelarr.length > 0;
			}
		},
		methods: {
			operation: function(e) {
				var r = this;
				var n;
				r.orderInfo = e.co, n = {};

				switch (e.t) {
					// 7
					case 'sqtk':
						n = {
							title: "您确认申请退款吗？",
							url: "kcddcz",
							params: {
								orderId: e.co.id
							}
						}
						break;
						// 9
					case 'cd':
						n = {
							title: "您确认催单吗？",
							url: "Reminder",
							params: {
								userId: r.user.userId,
								orderId: e.co.id
							}
						}
						break;
						// 11
					case 'qrsh':
						n = {
							title: "您确认已收到货吗？",
							url: "Receiving",
							params: {
								orderId: e.co.id
							}
						}
						break;
						//13
					case 'scdd':
						n = {
							title: "您确认删除订单吗？",
							url: "OrderDel",
							params: {
								orderId: e.co.id
							}
						}
						break;
						//15
					case 'scpd':
						n = {
							title: "您确认删除吗？",
							url: "qxpd",
							params: {
								id: e.co.id,
								type: "delete"
							}
						}
						break;
						//17
					case 'lxsj':
						makeTel(e.co.storeTel)
						break;
						//18
					case 'pj':
						message("功能持续完善中,敬请期待", 3)
						break;
						//19
					case 'tsljzf':
						r.go({
							t: 1,
							url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
								orderId: r.orderInfo.id,
								orderType: 7,
								info: {
									money: r.orderInfo.money,
									type: "堂内订单支付",
									cancel: 1,
									go: {
										t: 4
									}
								}
							}))
						})
						break;
						//21
					case 'ljzf':
						r.go({
							t: 1,
							url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
								orderId: r.orderInfo.id,
								orderType: 6,
								info: {
									money: r.orderInfo.money,
									type: "下单支付",
									cancel: 1,
									go: {
										t: 4
									}
								}
							}))
						})
						break;
						//23
					default:
						break;
				}
				modal(n.title).then(() => {
					this.$api[n.url](n.params).then(res => {
						r.refresh()
					})
				})
			},
			qxdd: function(e) {
				var r = this;
				if (e) {
					return this.$api['in-store_refund__fast']({
						orderId: r.orderInfo.id
					}).then(res => {
						r.refresh()
					})
				}
			},
			refresh: function() {
				this.laidx = 0, this.$emit("refresh", {
					refresh: 1
				});
			},
			lTab: function(e) {
				this.laidx = e, this.siv = "l".concat(e < 1 ? e : e - 1);
				var r = "";

				if (1 == this.otype) {
					switch (e) {
						case 0:
							r = "";
							break;

						case 1:
							r = "1";
							break;

						case 2:
							r = "2";
							break;

						case 3:
							r = "3";
					}

					this.$emit("refresh", {
						state: r
					});
				} else if (4 == this.otype) {
					switch (e) {
						case 0:
							r = "";
							break;

						case 1:
							r = "1";
							break;

						case 2:
							r = "2";
							break;

						case 3:
							r = "3";
							break;

						case 4:
							r = "4";
							break;

						case 5:
							r = "5";
					}

					this.$emit("refresh", {
						state: r
					});
				}
			}
		}
	}
</script>
<style scoped>
	.payimg {
		width: 153rpx;
		height: 155rpx;
	}

	.pt60 {
		padding-top: 50rpx;
	}

	.btn {
		border-radius: 0;
	}

	.btn::after {
		transform-origin: 50% 50%;
		border-radius: 0;
	}

	.p25 {
		padding: 20rpx 50rpx;
	}

	.ipolcs {
		height: 65rpx;
	}

	.ipomt {
		margin-top: 95rpx;
	}
</style>