<template>
	<view class="v-tabs " :id="elId" :style="'background:'+bgColor+';'+'padding:'+padding+';'">
		<scroll-view class="" :scrollLeft="scroll?scrollLeft:0" :scrollWithAnimation="scroll" scroll-x="scroll">
			<view class="v-tabs__container "
				:style="'display:'+(scroll?'inline-flex':'flex')+';'+'white-space:'+(scroll?'nowrap':'normal')+';'+'height:'+height+';'">
				<view @tap="change(i)" class="v-tabs__container-item "
					:style="'color:'+(current==i?activeColor:color)+';'+'font-size:'+(current==i?fontSize:fontSize)+';'+'font-weight:'+(bold&&current==i?'bold':'')+';'+'justify-content:'+(!scroll?'center':'')+';'"
					v-for="(v, i) in tabs" :key="i">{{''+(field?v[field]:v)+''}}</view>
				<view class="v-tabs__container-line "
					:style="'background:'+lineColor+';'+'width:'+lineWidth+'px'+';'+'height:'+lineHeight+';'+'border-radius:'+lineRadius+';'+'left:'+lineLeft+'px'+';'+'transform:'+'translateX(-'+lineWidth/2+'px)'+';'"
					v-if="!pills"></view>
				<view class="v-tabs__container-pills "
					:style="'background:'+pillsColor+';'+'border-radius:'+pillsBorderRadius+';'+'left:'+pillsLeft+'px'+';'+'width:'+currentWidth+'px'+';'+'height:'+height+';'"
					v-else></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 0
			},
			tabs: {
				type: Array,
				default: function() {
					return [];
				}
			},
			bgColor: {
				type: String,
				default: "#fff"
			},
			padding: {
				type: String,
				default: "0"
			},
			color: {
				type: String,
				default: "#333"
			},
			activeColor: {
				type: String,
				default: "#2979ff"
			},
			fontSize: {
				type: String,
				default: "28rpx"
			},
			activeFontSize: {
				type: String,
				default: "32rpx"
			},
			bold: {
				type: Boolean,
				default: !0
			},
			scroll: {
				type: Boolean,
				default: !0
			},
			height: {
				type: String,
				default: "70rpx"
			},
			lineColor: {
				type: String,
				default: "#2979ff"
			},
			lineHeight: {
				type: String,
				default: "10rpx"
			},
			lineScale: {
				type: Number,
				default: .5
			},
			lineRadius: {
				type: String,
				default: "10rpx"
			},
			pills: {
				type: Boolean,
				deafult: !1
			},
			pillsColor: {
				type: String,
				default: "#2979ff"
			},
			pillsBorderRadius: {
				type: String,
				default: "10rpx"
			},
			field: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				elId: "",
				lineWidth: 30,
				currentWidth: 0,
				lineLeft: 0,
				pillsLeft: 0,
				scrollLeft: 0,
				containerWidth: 0,
				current: 0
			};
		},
		watch: {
			value: function(t) {
				var e = this;
				this.current = t, this.$nextTick(function() {
					e.getTabItemWidth();
				});
			},
			current: function(t) {
				this.$emit("input", t);
			},
			tabs: function(t) {
				var e = this;
				this.$nextTick(function() {
					e.getTabItemWidth();
				});
			}
		},
		methods: {
			randomString: function(t) {
				t = t || 32;

				for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", n = e.length, i = "", a = 0; a < t; a++) i += e
					.charAt(Math.floor(Math.random() * n));

				return i;
			},
			change: function(t) {
				this.current !== t && (this.current = t, this.$emit("change", t));
			},
			getTabItemWidth: function() {
				var e = this,
					n = uni.createSelectorQuery().in(this);
				n.select("#".concat(this.elId)).boundingClientRect(function(t) {
					!e.containerWidth && t && (e.containerWidth = t.width);
				}).exec(), n.selectAll(".v-tabs__container-item").boundingClientRect(function(t) {
					if (t) {
						var n = 0,
							i = 0;
						if (t)
							for (var a = 0; a < t.length; a++)
								if (a < e.current) n += t[a].width;
								else {
									if (a != e.current) break;
									i = t[a].width;
								}
						e.currentWidth = i, e.lineWidth = i * e.lineScale * 1, e.lineLeft = n + i / 2, e.pillsLeft = n, e.scroll && (e
							.scrollLeft = e.lineLeft - e.containerWidth / 2);
					}
				}).exec();
			}
		},
		mounted: function() {
			var t = this;
			this.elId = "xfjpeter_" + this.randomString(), this.current = this.value, this.$nextTick(function() {
				t.getTabItemWidth();
			});
		}
	}
</script>
<style scoped>
	.v-tabs {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.v-tabs__container {
		position: relative;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		white-space: nowrap;
		overflow: hidden;
	}

	.v-tabs__container-item {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		height: 100%;
		position: relative;
		z-index: 10;
		-webkit-box-flex: 1;
		flex: 1;
		padding: 0 11px;
		transition: all .3s;
		white-space: nowrap;
	}

	.v-tabs__container-line {
		position: absolute;
		bottom: 0;
		transition: all .3s linear;
	}

	.v-tabs__container-pills {
		position: absolute;
		top: 0;
		transition: all .3s linear;
		z-index: 9;
	}
</style>