<template>
	<view @tap="onClick" class="uni-noticebar " :style="'background:'+backgroundColor+';'" v-if="show">
		<view
			:class="['uni-noticebar__content-wrapper  vue-ref',scrollable?'uni-noticebar__content-wrapper--scrollable':'',!scrollable&&(single||moreText)?'uni-noticebar__content-wrapper--single':'']"
			ref="textBox">
			<view
				:class="['uni-noticebar__content ',scrollable?'uni-noticebar__content--scrollable':'',!scrollable&&(single||moreText)?'uni-noticebar__content--single':'']"
				:id="elIdBox">
				<text
					:class="['uni-noticebar__content-text  vue-ref',scrollable?'uni-noticebar__content-text--scrollable':'',!scrollable&&(single||moreText)?'uni-noticebar__content-text--single':'']"
					ref="animationEle" :id="elId"
					:style="'color:'+color+';'+'width:'+wrapWidth+'px'+';'+'animation-duration:'+animationDuration+';'+'-webkit-animation-duration:'+animationDuration+';'+'animation-play-state:'+(webviewHide?'paused':animationPlayState)+';'+'-webkit-animation-play-state:'+(webviewHide?'paused':animationPlayState)+';'+'animation-delay:'+animationDelay+';'+'-webkit-animation-delay:'+animationDelay+';'">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "UniNoticeBar",
		components: {},
		props: {
			text: {
				type: String,
				default: ""
			},
			moreText: {
				type: String,
				default: ""
			},
			backgroundColor: {
				type: String,
				default: "#fffbe8"
			},
			speed: {
				type: Number,
				default: 50
			},
			color: {
				type: String,
				default: "#de8c17"
			},
			moreColor: {
				type: String,
				default: "#999999"
			},
			single: {
				type: [Boolean, String],
				default: !1
			},
			scrollable: {
				type: [Boolean, String],
				default: !1
			},
			showIcon: {
				type: [Boolean, String],
				default: !1
			},
			showGetMore: {
				type: [Boolean, String],
				default: !1
			},
			showClose: {
				type: [Boolean, String],
				default: !1
			}
		},
		data: function() {
			return {
				textWidth: 0,
				boxWidth: 0,
				wrapWidth: "",
				webviewHide: !1,
				elId: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
				elIdBox: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
				show: !0,
				animationDuration: "none",
				animationPlayState: "paused",
				animationDelay: "0s"
			};
		},
		mounted: function() {
			var t = this;
			this.$nextTick(function() {
				t.initSize();
			});
		},
		methods: {
			initSize: function() {
				var n = this;
				if (this.scrollable) {
					var e = [],
						o = new Promise(function(e, o) {
							uni.createSelectorQuery().in(n).select("#".concat(n.elId)).boundingClientRect().exec(function(t) {
								n.textWidth = t[0].width, e();
							});
						}),
						i = new Promise(function(e, o) {
							uni.createSelectorQuery().in(n).select("#".concat(n.elIdBox)).boundingClientRect().exec(function(t) {
								n.boxWidth = t[0].width, e();
							});
						});
					e.push(o), e.push(i), Promise.all(e).then(function() {
						n.animationDuration = "".concat(n.textWidth / n.speed, "s"), n.animationDelay = "-".concat(n.boxWidth / n
							.speed, "s"), setTimeout(function() {
							n.animationPlayState = "running";
						}, 1e3);
					});
				}
			},
			loopAnimation: function() {},
			clickMore: function() {
				this.$emit("getmore");
			},
			close: function() {
				this.show = !1, this.$emit("close");
			},
			onClick: function() {
				this.$emit("click");
			}
		}
	}
</script>
<style scoped>
	.uni-noticebar {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-box-align: center;
		align-items: center;
		padding: 4px 12px;
	}

	.uni-noticebar-close {
		margin-right: 5px;
	}

	.uni-noticebar-icon {
		margin-right: 5px;
	}

	.uni-noticebar__content-wrapper {
		-webkit-box-flex: 1;
		flex: 1;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		overflow: hidden;
	}

	.uni-noticebar__content-wrapper--single {
		line-height: 36rpx;
	}

	.uni-noticebar__content-wrapper--single,
	.uni-noticebar__content-wrapper--scrollable {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
	}

	.uni-noticebar__content-wrapper--scrollable {
		position: relative;
		height: 36rpx;
	}

	.uni-noticebar__content--scrollable {
		-webkit-box-flex: 1;
		flex: 1;
		display: block;
		overflow: hidden;
	}

	.uni-noticebar__content--single {
		display: flex;
		-webkit-box-flex: 0;
		flex: none;
		width: 100%;
		-webkit-box-pack: center;
		justify-content: center;
	}

	.uni-noticebar__content-text {
		font-size: 28rpx;
		line-height: 36rpx;
		word-break: break-all;
	}

	.uni-noticebar__content-text--single {
		display: block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.uni-noticebar__content-text--scrollable {
		position: absolute;
		display: block;
		height: 36rpx;
		line-height: 36rpx;
		white-space: nowrap;
		padding-left: 100%;
		animation: notice 10s 0s linear infinite both;
		animation-play-state: paused;
	}

	.uni-noticebar__more {
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		flex-wrap: nowrap;
		-webkit-box-align: center;
		align-items: center;
		padding-left: 5px;
	}

	.uni-noticebar__more-text {
		font-size: 28rpx;
	}

	@-webkit-keyframes notice {
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}

	@keyframes notice {
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>