<template>
	<view>
		<view :class="['',last?'mb80':'']" v-if="type==1">
			<view class="conw2 f-row p2 " v-for="(co, i) in dList" :key="i">
				<view @tap="goodinfo" class="f-g-0 bf6 left bs5 p-r ">
					<mg-img class="" cname="wh" :src="co.icon" :vueId="'22e0cc58-1-'+i"></mg-img>
					<view class="p-a ysq f-c b0 cf w100 f26 " v-if="outin==1?co.outStock<=0:co.inStock<=0">已售罄</view>
				</view>
				<view class="f-g-1 right ml20 f24 c9 ">
					<view class="f30 t-o-e c0 ">{{co.name}}</view>
					<view class="mt10 ">
						<bk-b cName="f22 bf7 cb mr10 p-3-10" class="" t="含茶" :vueId="'22e0cc58-2-'+i"></bk-b>
						<bk-b cName="f22 bf7 cb mr10 p-3-10" class="" t="含乳制品" :vueId="'22e0cc58-3-'+i"></bk-b>
					</view>
					<view class="mt10 t-o-e2 f20 ">{{'防疫期间，为减少接触，如有不便请您谅解。'||co.body}}</view>
					<view class="mt10 f-raw " v-if="orderset.sales==1&&co.salesNum>0">
						<text class="mr30 ">{{'销量 '+co.salesNum}}</text>
					</view>
					<view class="mt10 f-row " v-if="vipPrice(co)">
						<view class="vipl f-y-c ">
							<view class="">{{sl+(vipPrice(co))}}</view>
						</view>
						<view class="vipr f-y-c ">VIP</view>
					</view>
					<add-goods @add="add(co)" @dec="dec(co)" class="" cname="mt10" :co="co" :isunit="co.m2" :isyprice="isyprice(co)"
						:outin="outin" pcname="f36 c3" :vueId="'22e0cc58-4-'+i"></add-goods>
					<view class="" v-if="co.maxNum>0||co.minNum>1">
						<text class="crb mr20 " v-if="co.minNum>1">{{co.minNum+'份起售'}}</text>
						<text class="crb " v-if="co.maxNum>0">{{'限'+co.maxNum+'份'}}</text>
					</view>
				</view>
			</view>
		</view>
		<block v-else>
			<scroll-view class="ws-n mb10 " scroll-x="true" v-if="type==2">
				<view class="dis-in conw mr20 bs15 " v-for="(co, i) in dList" :key="i">
					<view @tap="goodinfo(co)" class="goodsimg ">
						<mg-img class="" cname="wh" :src="co.icon" :vueId="'22e0cc58-5-'+i"></mg-img>
					</view>
					<view class="conwb ">
						<view class="t-o-e f26 ">{{co.name}}</view>
						<add-goods :addgb="addgb" @add="add(co)" @dec="dec(co)" class="" :co="co" :outin="outin" pcname="f26"
							:vueId="'22e0cc58-6-'+i"></add-goods>
					</view>
				</view>
			</scroll-view>
			<block v-else>
				<view class="p23 bf " v-if="type==3">
					<view class="f-x-bt ">
						<view class="c0 f-y-c f-1 " style="min-width:60%;">
							<text class="text-btnf f22 mr20 p-3-10 bs5 f-g-0 "
								:style="'background:'+'rgba('+cTR(co.labelColor)+',0.1)'+';'+'color:'+co.labelColor+';'"
								v-if="co.labelName">{{co.labelName}}</text>
							<text class="f34 wei ">{{co.name}}</text>
						</view>
						<view class="c9 f24 ml20 ">
							<text class="" v-if="system.switch.saleShow==1&&co.salesNum>0">{{'销量'+co.salesNum}}</text>
							<text class="ml20 " v-if="system.switch.stockShow==1">{{'库存'+co.stock}}</text>
						</view>
					</view>
					<view class="c9 f24 m10 ">{{co.body}}</view>
					<view class="mt10 f-row " v-if="vipPrice">
						<view class="vipl f-y-c ">
							<view class="">{{sl+vipPrice}}</view>
						</view>
						<view class="vipr f-y-c ">VIP</view>
					</view>
					<add-goods @add="add(co)" @dec="dec(co)" class="" cname="mt10" :co="co" :isunit="co.vipPrice"
						:isyprice="co.activityGoodData.activityMoney" nocheckgd="true" numc="f36" :outin="outin" pcname="f44"
						:showjj="co.isSpecs!=1&&co.isMaterial!=1&&co.isAttr!=1" showspec="false" vueId="22e0cc58-7"></add-goods>
					<view class="f24 " v-if="co.maxNum>0||co.minNum>1">
						<text class="cf5f mr20 " v-if="co.minNum>1">{{co.minNum+'份起售'}}</text>
						<text class="cf5f " v-if="co.maxNum>0">{{'限'+co.maxNum+'份'}}</text>
					</view>
				</view>
				<block v-else>
					<view class="" v-if="type==6">
						<mg-cell brs="5rpx" class="" cname="f-sh" h="160" hdc="f-s" :img="co.icon" :vueId="'22e0cc58-8-'+i"
							:vueSlots="['bd']" w="160" v-for="(co, i) in dList" :key="i">
							<view class="h100 f-y-bt " slot="bd">
								<view class="f-bt ">
									<view class="t-o-e f32 c0 ">{{co.name}}</view>
								</view>
								<view class="f-bt mt10 ">
									<view class="f-g-1 f24 c9 ">
										<text class="" v-if="co.groupName">{{co.groupName}}</text>
										<text class="" v-if="co.attribute">{{'('+co.attribute+')'}}</text>
										<text class="ml10 " v-if="co.materialName">{{'+'+co.materialName}}</text>
									</view>
								</view>
								<view class="f-x-bt mt10 ">
									<view class="f-g-0 " style="color:#ff560a;">{{sl}}<text class="f36 wei ">{{isunit(co)}}</text>
									</view>
									<add-goods addwz="2" @add="add(co)" @dec="dec(co)" class="" cname="f-g-0 mt10" :co="co" color="#ff560a"
										:isprice="0" numc="f36" showspec="false" :vueId="'22e0cc58-9-'+i+','+'22e0cc58-8-'+i"></add-goods>
								</view>
							</view>
						</mg-cell>
					</view>
				</block>
			</block>
		</block>
	</view>
</template>

<script>
	import bkB from 'components/common/block-b.vue';
	import addGoods from './add-goods.vue';
	import MgCell from 'components/common/mg-cell.vue';
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		colorToRGB
	} from 'common/util';
	export default {
		name: "goods",
		components: {
			addGoods,
			bkB,
			MgCell
		},
		props: {
			dList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			co: Object,
			type: {
				type: String,
				default: "1"
			},
			showbody: {
				type: Boolean,
				default: !0
			},
			showadd: {
				type: Boolean,
				default: !0
			},
			addtype: {
				type: String,
				default: "1"
			},
			outin: {
				type: String,
				default: "1"
			},
			color: {
				type: String,
				default: ""
			},
			last: {
				type: Boolean,
				default: !1
			},
			storeid: {
				type: String,
				default: ""
			},
			addgb: {
				type: Boolean,
				default: !0
			}
		},
		data: function() {
			return {};
		},
		computed: {
			orderset() {
				try {
					this.$store.state.config.orderset;
				} catch (error) {
					return {};
				}
			}
		},
		computed: {
			...mapState({
				orderset: function(t) {
					return t.config.orderset;
				}
			})
		},
		methods: {
			dec: function(t, e) {
				1 == this.addtype ? this.$emit("dec", e) : this.$emit("dec", {
					addwz: t.addwz,
					g: e
				});
			},
			add: function(t, e) {
				1 == this.addtype ? this.$emit("add", {
					g: e
				}) : this.$emit("add", {
					addwz: t.addwz,
					g: e
				});
			},
			goodinfo: function(t) {
				this.go({
					t: 1,
					url: "/yb_wm/shop/out/goods-dl?gid=".concat(t, "&storeId=").concat(this.storeid, "&page=shopGoods")
				});
			},
			itemTotal: function(t, e) {
				return (t * e).toFixed(2);
			},
			isunit: function(t) {
				return !!t.unit;
			},
			isyprice: function(t) {
				return !(1 != this.orderset.price || !t.outPrice);
			},
			vipPrice: function(t) {
				return 1 == this.outin ? t.outVipPrice > 0 ? t.outVipPrice : "" : t.inVipPrice > 0 ? t.inVipPrice : "";
			},
			cTR: function(t) {
				return colorToRGB(t);
			}
		},
	}
</script>
<style scoped>
	.conw {
		width: 210rpx;
	}

	.conw .goodsimg {
		width: 210rpx;
		height: 210rpx;
	}

	.conw .conwb {
		padding: 10rpx 6rpx 0 2rpx;
	}

	.conw2 .left {
		width: 138rpx;
		height: 138rpx;
	}

	.mb80 {
		padding-bottom: 100rpx;
	}

	.ysq {
		height: 50rpx;
		background: rgba(0, 0, 0, .5);
	}
</style>