<template>
	<view class="uni-numbox">
		<view @tap="_calcValue('minus')" :class="['uni-numbox__minus',inputValue<=min||disabled?'uni-numbox--disabled':'']">-
		</view>
		<input @blur="_onBlur" v-model="inputValue" class="uni-numbox__value" :disabled="disabled" type="number"
			 />
		<view @tap="_calcValue('plus')" :class="['uni-numbox__plus',inputValue>=max||disabled?'uni-numbox--disabled':'']">+
		</view>
	</view>
</template>

<script>
	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: [Number, String],
				default: 1
			},
			max: {
				type: [Number, String],
				default: 1
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: !1
			}
		},
		data: function() {
			return {
				inputValue: 1
			};
		},
		watch: {
			value: function(t) {
				this.inputValue = +t;
			},
			inputValue: function(t, n) {
				+t != +n && this.$emit("change", t);
			}
		},
		created: function() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue: function(t) {
				if (!this.disabled) {
					var n = this._getDecimalScale(),
						e = this.inputValue * n,
						u = this.step * n;

					"minus" === t ? e -= u : "plus" === t && (e += u), e < this.min || e > this.max || (this.inputValue = e / n);
				}
			
			},
			_getDecimalScale: function() {
				var t = 1;
				return ~~this.step !== this.step && (t = Math.pow(10, (this.step + "").split(".")[1].length)), t;
			},
			_onBlur: function(t) {
				var n = t.detail.value;
				n ? ((n = +n) > this.max ? n = this.max : n < this.min && (n = this.min), this.inputValue = n) : this.inputValue =
					0;
			}
		}
	}
</script>
<style scoped>
	.uni-numbox {
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-box-pack: start;
		justify-content: flex-start;
		height: 70rpx;
		position: relative;
	}

	.uni-numbox:after {
		content: "";
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border: 1px solid #e5e5e5;
		border-radius: 12rpx;
		transform: scale(.5);
	}

	.uni-numbox__minus,
	.uni-numbox__plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 70rpx;
		font-size: 40rpx;
		height: 100%;
		line-height: 70rpx;
		text-align: center;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		color: #333;
		position: relative;
	}

	.uni-numbox__value {
		position: relative;
		background-color: #fff;
		width: 80rpx;
		height: 100%;
		text-align: center;
		padding: 0;
	}

	.uni-numbox__value:after {
		content: "";
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-style: solid;
		border-color: #e5e5e5;
		border-left-width: 1px;
		border-right-width: 1px;
		border-top-width: 0;
		border-bottom-width: 0;
		transform: scale(.5);
	}

	.uni-numbox--disabled {
		color: silver;
	}
</style>