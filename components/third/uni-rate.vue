<template>
	<view class="uni-rate">
		<view @tap="_onClick(index)" class="uni-rate-icon" :style="'margin-left:'+(index==0?0:margin+'rpx')+';'"
			v-for="(star, index) in stars" :key="index">
			<text :class="['iconfont',icon]" :style="'color:'+color+';'+'font-size:'+size+'rpx'+';'"></text>
			<view class="uni-rate-icon-on" :style="'width:'+star.activeWitch+';'">
				<text :class="['iconfont',icon]" :style="'color:'+activeColor+';'+'font-size:'+size+'rpx'+';'"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "UniRate",
		components: {},
		props: {
			icon: {
				type: String,
				default: "iconxing"
			},
			color: {
				type: String,
				default: "#ececec"
			},
			activeColor: {
				type: String,
				default: "#ffca3e"
			},
			size: {
				type: [Number, String],
				default: 32
			},
			value: {
				type: [Number, String],
				default: 0
			},
			max: {
				type: [Number, String],
				default: 5
			},
			margin: {
				type: [Number, String],
				default: 0
			},
			disabled: {
				type: Boolean,
				default: !1
			}
		},
		data: function() {
			return {
				valueSync: ""
			};
		},
		computed: {
			stars: function() {
				for (var t = Number(this.valueSync) ? Number(this.valueSync) : 0, e = [], n = Math.floor(t), a = Math.ceil(t), u =
						0; u < this.max; u++) n > u ? e.push({
					activeWitch: "100%"
				}) : a - 1 === u ? e.push({
					activeWitch: 100 * (t - n) + "%"
				}) : e.push({
					activeWitch: "0"
				});

				return e;
			}
		},
		created: function() {
			this.valueSync = this.value;
		},
		methods: {
			_onClick: function(t) {
				this.disabled || (this.valueSync = t + 1, this.$emit("change", {
					value: this.valueSync
				}));
			}
		}
	}
</script>
<style scoped>
	.uni-rate {
		line-height: 0;
		font-size: 0;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
	}

	.uni-rate-icon {
		position: relative;
		line-height: 0;
		font-size: 0;
		display: inline-block;
	}

	.uni-rate-icon-on {
		line-height: 1;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
	}
</style>