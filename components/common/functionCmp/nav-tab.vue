<template>
	<view>
		<view :class="['navTabBox',cname]" :style="[sname]" v-if="type==1">
			<view class="shortTab" v-if="tabs.length<=5&&!isscroll">
				<view class="navTab" :style="'height:'+height+'rpx'+';'">
					<view @tap="navClick(index)" :class="['navTabItem',icname]" style="color:#000;width:100%;font-size:32rpx"
						:style="item.s1" v-for="(item, index) in tabs" :key="index">
						<text :class="['iconfont mr15 f36',item.icon]" :style="'color:'+(index==tabClick?item.color||color:'')+';'"
							v-if="item.icon"></text>
						<view class="p-r">
							{{item.name+''}}<text class="p-a c9 f24 onum" v-if="item.num">{{item.num}}</text>
							<view class="dot p-a r0 f20 cf nowei f-c bsf" v-if="item.dot>0">{{item.dot}}</view>
						</view>
					</view>
				</view>
				<view class="underlineBox" :style="'transform:'+'translateX('+isLeft+'px)'+';'+'width:'+isWidth+'px'+';'"
					v-if="isWidth>0">
					<view class="underline" :style="'background:'+(xhxjb||color||tColor)+';'"></view>
				</view>
			</view>
			<!-- 大于5滚动 -->
			<view class="longTab" v-if="tabs.length>5||isscroll">
				<scroll-view :scrollIntoView="toView" scrollWithAnimation="true" scroll-x="true"
					style="white-space:nowrap;display:flex;">
					<view @tap="longClick(index)" :class="['longItem',icname]" :data-index="index" :id="'id'+index" :style='[{
									color: index == tabClick ? color || "#000" : ncolor,
									fontSize: ifsize + "rpx",
									height: height + "rpx",
									width: itw
								}, index == tabClick ? isname : ""]' v-for="(item, index) in tabs" :key="index">
						{{item.name}}</view>
					<view class="underlineBox"
						:style="'transform:'+(isscroll?'translateX('+100*tabClick+'%)':'translateX('+isLeft+'px)')+';'+'width:'+itw+';'">
						<view class="underline" :style="'background:'+(xhxjb||color||tColor)+';'+'width:'+uw+'rpx'+';'"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view :class="['navTabBox',cname]" v-else>
			<scroll-view class="ws-n p20 longTab" :scrollIntoView="toView" scrollWithAnimation="true" scroll-x="true">
				<view @tap="longClick(index)" :class="['p-r longItem longItem2',icname]" :id="'id'+index"
					:style="'color:'+(index==tabClick?color||tColor:ncolor)+';'+'width:'+itw+';'" v-for="(item, index) in tabs"
					:key="index">
					<view class="f-c mt10">
						<view class="typeimg bf6 bsf">
							<mg-img :src="item.icon" :vueId="'1a90c7a5-1-'+index"></mg-img>
						</view>
					</view>
					<view :style="'height:'+height+'rpx'+';'+'line-height:'+height+'rpx'+';'">{{item.name}}</view>
					<view class="p-a underlineBox b0" :style="'width:'+'100%'+';'">
						<view class="underline" :style="'background:'+(index==tabClick?color||tColor:'')+';'+'width:'+uw+'rpx'+';'">
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navTab",
		props: {
			nid: "",
			value: "",
			cname: "",
			sname: "",
			isname: "",
			height: {
				type: String,
				default: "90"
			},
			ifsize: {
				type: String,
				default: "30"
			},
			icname: {
				type: String,
				default: "f26"
			},
			iwidth: {
				type: String,
				default: "100%"
			},
			color: "",
			ncolor: {
				type: String,
				default: "#000"
			},
			xhxjb: {
				type: String,
				default: ""
			},
			tabs: {
				type: Array,
				default: function() {
					return [];
				}
			},
			type: {
				type: String,
				default: "1"
			},
			itw: {
				type: String,
				default: "20%"
			},
			uw: {
				type: String,
				default: "84"
			},
			isscroll: {
				type: Boolean,
				default: !1
			}
		},
		data: function() {
			return {
				isLeft: 0,
				isWidth: 0,
				toView: "",
				isLongWidth: 0
			};
		},
		mounted: function() {
			var n = this;
			setTimeout(function() {
				uni.createSelectorQuery().in(n).select(".navTabBox").boundingClientRect(function(i) {
					i && (n.isWidth = "100%" == n.iwidth ? i.width / n.tabs.length : uni.upx2px(n.iwidth.substring(0, n.iwidth
						.length - 3)), n.isLongWidth = i.width / 5);
				}).exec(), n.toView = "id0";
			}, 10);
		},
		computed: {
			tabClick: {
				get: function() {
					if (this.tabs.length > 5 || this.isscroll ? this.isLeft = this.value * this.isLongWidth : this.isLeft = this
						.value * this.isWidth, 2 == this.type || this.tabs.length > 5) {
						var t = this.value - 2;
						t = t <= 0 ? 0 : t, this.toView = "id".concat(t);
					}

					return this.value;
				},
				set: function(t) {
					this.$emit("input", t);
				}
			}
		},
		methods: {
			navClick: function(t) {
				this.tabClick = t, this.$emit("changeTab", t);
			},
			longClick: function(t) {
				this.tabClick = t, this.$emit("changeTab", t);
			}
		}
	}
</script>
<style scoped>
	.navTabBox {
		width: 100%;
		color: hsla(0, 0%, 100%, .5);
		background: #fff;
	}

	.navTabBox .click {
		color: #333;
	}

	.navTabBox .longTab {
		width: 100%;
	}

	.navTabBox .longTab .longItem {
		width: 20%;
		height: 90rpx;
		display: inline-block;
		line-height: 90rpx;
		text-align: center;
	}

	.navTabBox .longTab .longItem2 {
		height: auto;
		line-height: normal;
	}

	.navTabBox .longTab .typeimg {
		width: 90rpx;
		height: 90rpx;
	}

	.navTabBox .longTab .underlineBox {
		height: 6rpx;
		width: 20%;
		display: flex;
		align-content: center;
		-webkit-box-pack: center;
		justify-content: center;
		transition: .2s;
	}

	.navTabBox .longTab .underlineBox .underline {
		width: 84rpx;
		height: 6rpx;
		background-color: #fff;
	}

	.navTabBox .shortTab {
		width: 100%;
	}

	.navTabBox .shortTab .navTab {
		display: flex;
		width: 100%;
		height: 90rpx;
		position: relative;
	}

	.navTabBox .shortTab .navTab .navTabItem {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
	}

	.navTabBox .shortTab .underlineBox {
		height: 6rpx;
		display: flex;
		align-content: center;
		-webkit-box-pack: center;
		justify-content: center;
		transition: .2s;
	}

	.navTabBox .shortTab .underlineBox .underline {
		width: 84rpx;
		height: 6rpx;
		background-color: #fff;
	}

	.navTabBox .onum {
		left: 110%;
		top: 50%;
		transform: translateY(-50%);
		font-weight: 400;
	}

	.navTabBox .dot {
		background: #ff5f58;
		width: 30rpx;
		height: 30rpx;
		top: -10rpx;
		right: -13rpx;
	}
</style>