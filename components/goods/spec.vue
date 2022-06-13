<template>
	<view>
		<mg-popup v-model="showGg" vueId="6dccb2d2-1" :vueSlots="['default']" :zIndex="3000">
			<view class="bs15 bf ggjz " v-if="loading">
				<view class="dhtmd ">
					<view class="bf6 jzi1 "></view>
					<view class="bf6 jzi2 p3 "></view>
					<view class="bf6 jzi2 p3 "></view>
				</view>
			</view>
			<view class="ggc bs15 bf posi-r " v-else>
				<view @tap="showGg=false" class="ggx posi-a r0 ">
					<text class="iconfont iconyx f56 "></text>
				</view>
				<view class="ggtop f-row ">
					<view class="ggh mr30 f-g-0 bs20 ">
						<mg-img :src="goodsInfo.icon" :vueId="'6dccb2d2-2'+','+'6dccb2d2-1'"></mg-img>
					</view>
					<view>
						<view class="f36 wei ">{{goodsInfo.name}}</view>
						<view class="mt15 f24 c7 ">产品描述</view>
						<view class="mt15 f24 c9 t-o-e3 w100 ">{{goodsInfo.body}}</view>
					</view>
				</view>
				<scroll-view class="ggb p23 " scroll-y="true">
					<view class="m20 ">
						<block v-if="goodsInfo.isSpecs==1&&goodsInfo.specsData.length">
							<view class="p15 c6 ">规格</view>
							<view class="f-raw ">
								<view @tap="clickSpec(pi)" class="specv t-o-e f26 "
									:style="'background:'+(pv.a?tColor:'')+';'+'color:'+(pv.a?'#fff':'')+';'"
									v-for="(pv, pi) in goodsInfo.specsData" :key="pi">{{pv.specsName}}</view>
							</view>
						</block>
						<block v-if="goodsInfo.isAttr==1&&goodsInfo.attrData.length">
							<view v-for="(pv, pi) in goodsInfo.attrData" :key="pi">
								<view class="p15 c6 f28 ">{{pv.attrName}}</view>
								<view class="f-raw ">
									<block v-for="(cv, ci) in pv.attrStr" :key="ci">
										<view @tap="clickAttribute(pi,ci)" class="specv t-o-e f26 "
											:style="'background:'+(cv.a?tColor:'')+';'+'color:'+(cv.a?'#fff':'')+';'" v-if="cv.name">{{cv.name}}</view>
									</block>
								</view>
							</view>
						</block>
						<block v-if="goodsInfo.isMaterial==1&&goodsInfo.meterialData.length">
							<view class="p15 c6 ">加料</view>
							<view class="f-raw ">
								<view @tap="clickMaterial(ci)" class="specv t-o-e f26 "
									:style="'background:'+(cv.a?tColor:'')+';'+'color:'+(cv.a?'#fff':'')+';'"
									v-for="(cv, ci) in goodsInfo.meterialData" :key="ci">{{cv.materialName}}<text class="ml10 "
										:style="'color:'+(cv.a?'#fff':tColor)+';'">{{''+sl+cv.SalesPrice}}</text>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
				<view class="posi-r ggf bf f-col f-x-ad " v-if="goodsInfo.id">
					<view class="f-x-bt ">
						<view class="f-g-1 ">
							<view class="f-raw " :style="'color:'+tColor+';'">
								<view class="f-row mr10 " v-if="xzSpecInfo.vipPrice<xzSpecInfo.SalesPrice">
									<view class="vipl f-y-c " style="font-size:26rpx;">{{sl+co.vipPrice}}</view>
									<view class="vipr f-y-c " style="font-size:24rpx;">VIP</view>
								</view>
								<text class="f34 wei mr20 "
									v-if="goodsInfo.isSpecs==1&&goodsInfo.specsData.length">{{sl+xzSpecInfo.SalesPrice+''}}<text
										class="f24 nowei c9 ml10 ">{{'(库存'+(outin==1?xzSpecInfo.SalesStock:xzSpecInfo.SalesStock)+')'}}</text>
								</text>
								<text v-if="goodsInfo.isMaterial==1&&goodsInfo.meterialData.length">{{'加料+'+sl+xzJlInfo.money}}</text>
							</view>
							<view class="f22 c9 t-o-e3 ">
								{{(xzSpecInfo.id?xzSpecInfo.specsName+',':'')+(xzSxInfo.arr.length? xzSxInfo.arr.map((function(t) { return t.name })).toString() +',':'')+(xzJlInfo.arr.length? 
								xzJlInfo.arr.map((function(t) { return t.materialName })).toString():'')}}
							</view>
						</view>
						<view class="f-g-0 f-bt ml30 ">
							<view class="reducecon active f-y-c " v-if="goodsInfo.ggnum>0">
								<view @tap.stop="decSpec" class="cartc f-c ">
									<text class="iconfont iconjs f54 " :style="'color:'+tColor+';'"></text>
								</view>
								<text class="f34 ma c0 ">{{goodsInfo.ggnum}}</text>
							</view>
							<view @tap.stop="addSpec" class="cartc f-c ">
								<text class="iconfont iconzj f54 " :style="'color:'+tColor+';'"></text>
							</view>
						</view>
					</view>
					<button @tap="jrgwc" class="w100 cf ggbtn mt10 f34 f-c " :style="'background:'+tColor+';'">加入购物车</button>
				</view>
			</view>
		</mg-popup>
	</view>
</template>

<script>
	import mgPopup from 'components/common/popup.vue';
	import bkB from 'components/common/block-b.vue';
	import {
		message,
		throttle
	} from 'common/util';
	import {
		mapState
	} from 'vuex'
	export default {
		name: "popup",
		components: {
			mgPopup,
			bkB
		},
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			cname: {
				type: String,
				default: ""
			},
			value: {
				type: Boolean,
				default: !1
			},
			width: {
				type: String,
				default: "70%"
			},
			zindex: {
				type: Number,
				default: 999
			},
			outin: {
				type: String,
				default: "1"
			},
			storeid: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				loading: !0,
				goodsInfo: {}
			};
		},
		methods: {
			clickSpec: function(t) {
				var n = this.goodsInfo.specsData;

				for (var o in n) n[o].a = o == t ? 1 : 0;
			},
			clickAttribute: function(t, n) {
				var o = this.goodsInfo.attrData;

				for (var e in o[t].attrStr) o[t].attrStr[e].a = e == n ? 1 : 0;
			},
			clickMaterial: function(t) {
				this.goodsInfo.meterialData, this.$set(this.goodsInfo.meterialData[t], "a", 1 == this.goodsInfo.meterialData[t].a ?
					0 : 1);
			},
			addSpec: function() {
				this.xzSpecInfo.SalesStock && this.goodsInfo.ggnum == this.xzSpecInfo.SalesStock || (this.goodsInfo.ggnum += 1);
			},
			decSpec: function() {
				1 != this.goodsInfo.ggnum && (this.goodsInfo.ggnum -= 1);
			},
			jrgwc: throttle(function(t) {
				var n,
					o = this,
					e = Object.assign({}, this.xzSpecInfo),
					r = {
						jlmoney: this.xzJlInfo.money,
						material: this.xzJlInfo.arr.map(function(t) {
							return {
								materialId: t.id,
								num: 1
							};
						}),
						jldata: "",
						jlids: ""
					},
					a = {
						attribute: ""
					};

				if (e.groupId = e.id || "", delete e.id, a.attribute = this.xzSxInfo.arr.map(function(t) {
						return t.name;
					}).toString(), r.jldata = this.xzJlInfo.arr.map(function(t) {
						return t.materialName;
					}).toString(), r.jlids = this.xzJlInfo.arr.map(function(t) {
						return t.id;
					}).toString(), n = 1 != this.co.isSpecs && 1 != this.co.isMaterial && 1 != this.co.isAttr ? this.carList.find(
						function(t) {
							return t.goodsId == o.co.id;
						}) : this.carList.find(function(t) {
						return t.goodsId == o.co.id && t.groupId == e.groupId && t.materialIds == r.jlids && t.attribute == a
							.attribute;
					})) {
					if (this.co.maxNum > 0 && Number(n.num) + Number(this.goodsInfo.ggnum) > this.co.maxNum) return message("此商品限购"
						.concat(this.co.maxNum, "份"), 3);
				} else {
					if (this.co.minNum > 1 && this.co.minNum > this.goodsInfo.ggnum) return message("此商品".concat(this.co.minNum,
						"份起购"), 3);
					if (this.co.maxNum > 0 && this.goodsInfo.ggnum > this.co.maxNum) return message("此商品限购".concat(this.co
						.maxNum, "份"), 3);
				}

				var i = Object.assign({
					ggnum: this.goodsInfo.ggnum
				}, this.co, e, a, r);
				this.$emit("add", {
					g: i,
					addwz: 1
				}), this.showGg = !1;
			}, 300)
		},
		computed: {
			...mapState({
				carList: function(t) {
					return t.scarList.data || [];
				}
			}),
			showGg: {
				get: function() {
					return this.value;
				},
				set: function(t) {
					this.$emit("input", t);
				}
			},
			xzSpecInfo: function() {
				return 1 == this.goodsInfo.isSpecs && this.goodsInfo.specsData.length ? this.goodsInfo.specsData.find(function(
					t) {
					return t.a;
				}) : {};
			},
			xzSxInfo: function() {
				var t = {
					arr: []
				};

				if (1 == this.goodsInfo.isAttr && this.goodsInfo.attrData.length) {
					var n = this.goodsInfo.attrData,
						o = [];

					for (var e in n)
						for (var r in n[e].attrStr)
							if (n[e].attrStr[r].a) {
								o.push(n[e].attrStr[r]);
								break;
							}

					t.arr = o;
				}

				return t;
			},
			xzJlInfo: function() {
				var t = this,
					n = {
						money: 0,
						arr: []
					};

				if (1 == this.goodsInfo.isMaterial && this.goodsInfo.meterialData.length) {
					var o = [];
					this.goodsInfo.meterialData.forEach(function(e) {
						e.a && (n.money += (t.outin, +e.SalesPrice), o.push(e));
					}), n.money = +n.money.toFixed(2), n.arr = o;
				}

				return n;
			},
			xzspxx: function() {
				var t = [];
				this.xzSpecInfo.id && t.push(this.xzSpecInfo.specsName), this.xzSxInfo.arr.length && t.push();
			}
		},
		watch: {
			value: function(t) {
				var n = this;
				var e, r;
				this.$api.good_get__good__oper({
					id: n.co.id
				}).then(res => {
					r = res, 1 == n.co.isSpecs && r.specsData && r.specsData.forEach(function(t, n) {
						t.a = 0 == n ? 1 : 0;
					}), 1 == n.co.isAttr && r.attrData && r.attrData.forEach(function(t) {
						t.attrStr.forEach(function(t, n) {
							t.a = 0 == n ? 1 : 0;
						});
					}), n.goodsInfo = Object.assign({}, n.co, r, {
						ggnum: 1
					}), n.loading = !1;
				})
			}
		}
	}
</script>
<style scoped>
	.bs15 {
		border-radius: 30rpx 30rpx 0 0;
	}

	.f54 {
		font-size: 52rpx;
	}

	.ggjz {
		padding: 50rpx 50rpx 200rpx;
	}

	.jzi1 {
		height: 350rpx;
	}

	.jzi2 {
		margin-top: 50rpx;
	}

	.ggc .ggx {
		padding: 20rpx 20rpx 40rpx 40rpx;
		opacity: .7;
	}

	.ggc .ggtop {
		padding: 40rpx 30rpx 0;
	}

	.ggc .ggh {
		width: 240rpx;
		height: 240rpx;
	}

	.ggc .ggb {
		max-height: calc(86vh - 233rpx - 280rpx);
	}

	.ggc .ggb .specv {
		min-width: 185rpx;
		padding: 0 30rpx;
		height: 70rpx;
		border-radius: 8rpx;
		text-align: center;
		line-height: 70rpx;
		background: #f5f5f7;
		margin: 0 20rpx 20rpx 0;
	}

	.ggc .ggf {
		box-shadow: 0 -2rpx 9rpx 2rpx hsla(0, 0%, 86.7%, .6);
		padding: 20rpx 36rpx;
		min-height: 153rpx;
	}

	.ggc .ggbtn {
		border-radius: 80rpx;
		height: 90rpx;
	}

	@-webkit-keyframes backOpacity- {
		0% {
			opacity: .8;
		}

		50% {
			opacity: .6;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes backOpacity- {
		0% {
			opacity: .8;
		}

		50% {
			opacity: .6;
		}

		100% {
			opacity: 1;
		}
	}

	.dhtmd {
		animation: backOpacity- .7s ease-in-out infinite;
	}
</style>