<template>
	<view class="wrap ">
		<swiper :autoplay="autoplay" @change="change" :circular="loop" class="swiper " :current="current" :duration="duration"
			:interval="interval" :nextMargin="nextMargin+'rpx'" :previousMargin="previousMargin+'rpx'"
			:style="'height:'+height*2+'rpx'+';'">
			<swiper-item @tap="$emit('clickItem',item)" class="" v-for="(item, index) in list" :key="index">
				<view :class="['item ',!crown?'':current==index?'crown-active':'crown']" v-if="list&&list.length>0">
					<image :class="['item-img ',imgShadow?'imgShadow':'']" mode="aspectFill" :src="item[imgKey]"
						:style="'border-radius:'+imgRadius+'px'+';'+'width:'+imgWidth+';'" v-if="!slots"></image>
					<block v-else>
						<slot>{{item.condition}}</slot>
						<scoped-slots-default class="scoped-ref" :data="item">{{item.name}}</scoped-slots-default>
					</block>
				</view>
			</swiper-item>
		</swiper>
		<view class="dots flex " :style="'bottom:'+bottom*2+'rpx'+';'" v-if="dots">
			<view :class="['dot ',current==i?'curr-dot':'']" v-for="(d, i) in list" :key="i"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			imgKey: {
				type: String,
				required: !0
			},
			height: {
				type: Number,
				default: 200
			},
			imgRadius: {
				type: Number,
				default: 0
			},
			imgShadow: {
				type: Boolean,
				default: !1
			},
			previousMargin: {
				type: Number,
				default: 0
			},
			nextMargin: {
				type: Number,
				default: 0
			},
			imgWidth: {
				type: String,
				default: "100%"
			},
			loop: {
				type: Boolean,
				default: !1
			},
			autoplay: {
				type: Boolean,
				default: !1
			},
			interval: {
				type: Number,
				default: 2e3
			},
			duration: {
				type: Number,
				default: 600
			},
			dots: {
				type: Boolean,
				default: !1
			},
			bottom: {
				type: Number,
				default: 10
			},
			crown: {
				type: Boolean,
				default: !1
			},
			slots: {
				type: Boolean,
				default: !1
			},
			swcurrent: {
				type: Number,
				default: 0
			}
		},
		data: function() {
			return {
				current: 0
			};
		},
		watch: {
			swcurrent: function(e) {
				this.current = e;
			}
		},
		methods: {
			change: function(e) {
				var t = e.detail.current;
				this.current = t, this.$emit("change", this.list[t]);
			}
		}
	}
</script>
<style scoped>
	.wrap {
		position: relative;
	}

	.wrap .crown {
		transform: scale(.93, .85);
	}

	.wrap .item {
		height: 100%;
		transition: 1.2s;
	}

	.wrap .item-img {
		width: 100%;
		height: 100%;
	}

	.wrap .imgShadow {
		height: calc(100% - 10px);
		margin-bottom: 10px;
		box-shadow: 0 6px 6px rgba(0, 0, 0, .15);
	}

	.wrap .crown-active {
		transform: scale(1);
	}

	.wrap .dots {
		display: flex;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.wrap .dots .dot {
		width: 6rpx;
		height: 6rpx;
		border-radius: 50%;
		background-color: #d6d6d6;
		margin-right: 8rpx;
	}

	.wrap .dots .curr-dot {
		height: 6rpx;
		width: 22rpx;
		border-radius: 6rpx;
		background-color: #fff;
	}
</style>